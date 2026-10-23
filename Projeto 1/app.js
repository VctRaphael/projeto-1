/**
 * TUPÃ IA - Motor Inteligente & Interações da Aplicação
 */

// Estado Global
const App = {
  chatHistory: [],
  isVoiceActive: true,
  isListening: false,
  recognition: null,
  synth: window.speechSynthesis || null,
  typingInterval: null
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initPlaces();
  initFacts();
  initChatForm();
  initSpeechFeatures();
});

// 1. NAVEGAÇÃO DE ABAS
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `view-${tab.dataset.tab}`;
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Toggle de Voz
  const voiceBtn = document.getElementById('toggle-voice-btn');
  const voiceStatus = document.getElementById('voice-status');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      App.isVoiceActive = !App.isVoiceActive;
      voiceBtn.classList.toggle('active', App.isVoiceActive);
      voiceStatus.textContent = App.isVoiceActive ? 'Ligada' : 'Muda';
      showToast(App.isVoiceActive ? 'Leitura de voz ativada!' : 'Leitura de voz silenciada.');
      if (!App.isVoiceActive && App.synth) App.synth.cancel();
    });
  }
}

// 2. RENDERIZAR GUIA TURÍSTICO
function initPlaces() {
  const grid = document.getElementById('places-grid-container');
  if (!grid || typeof TUPA_DATA === 'undefined') return;

  grid.innerHTML = TUPA_DATA.pontos_turisticos.map(p => `
    <article class="place-card-v2">
      <span class="place-category-badge">${p.categoria}</span>
      <h3 class="place-title-v2">${p.nome}</h3>
      <p class="place-desc-v2">${p.descricao}</p>
      
      ${p.endereco ? `<div class="place-meta-v2">📍 ${p.endereco}</div>` : ''}
      ${p.distancia ? `<div class="place-meta-v2">🚗 ${p.distancia}</div>` : ''}
      ${p.dica ? `<div class="place-dica-v2">💡 <strong>Dica:</strong> ${p.dica}</div>` : ''}
      
      <button class="place-ask-btn" onclick="sendPrompt('Conte mais detalhes turísticos e curiosidades sobre o ${p.nome}')">
        Perguntar sobre este local à IA →
      </button>
    </article>
  `).join('');
}

// 3. RENDERIZAR FATOS E CURIOSIDADES
function initFacts() {
  const container = document.getElementById('facts-container');
  if (!container || typeof TUPA_DATA === 'undefined') return;

  container.innerHTML = TUPA_DATA.curiosidades.map((fact, index) => `
    <div class="fact-card-v2">
      <span class="fact-badge-v2">Fato Histórico #${index + 1}</span>
      <p>${fact}</p>
    </div>
  `).join('');
}

// 4. CHAT E FORMULÁRIO DE PERGUNTAS
function initChatForm() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const clearBtn = document.getElementById('clear-btn');

  // Envio de mensagem
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    processUserMessage(query);
    input.value = '';
    input.style.height = '24px';
  });

  // Ajuste de altura do textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  // Enter para enviar
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event('submit'));
    }
  });

  // Botão Limpar / Nova conversa
  clearBtn.addEventListener('click', () => {
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
    const hero = document.getElementById('chat-hero');
    if (hero) hero.classList.remove('hidden');
    App.chatHistory = [];
    if (App.synth) App.synth.cancel();
    showToast('Conversa reiniciada.');
  });
}

// Gatilho rápido de pergunta
function sendPrompt(text) {
  // Ir para a aba de chat
  const chatTab = document.querySelector('.nav-btn[data-tab="chat"]');
  if (chatTab) chatTab.click();

  processUserMessage(text);
}

function askTopic(topic) {
  sendPrompt(`Conte-me detalhes e a importância de ${topic} em Tupã`);
}

// Processar a mensagem do usuário
function processUserMessage(text) {
  // Esconder Hero inicial na primeira mensagem
  const hero = document.getElementById('chat-hero');
  if (hero) hero.classList.add('hidden');

  // Adicionar bolha do usuário
  appendMessageRow('user', text);

  // Adicionar indicador de carregamento
  const loadingId = appendTypingIndicator();

  // Gerar resposta da IA com efeito de digitação suave
  setTimeout(() => {
    removeTypingIndicator(loadingId);
    const botAnswer = generateTupaResponse(text);
    appendStreamingBotMessage(botAnswer);
  }, 450);
}

// Renderizar linha de mensagem
function appendMessageRow(sender, content) {
  const container = document.getElementById('messages-container');
  const row = document.createElement('div');
  row.className = `message-row ${sender}-row`;

  const avatar = sender === 'bot'
    ? `<div class="msg-avatar-icon">🏛️</div>`
    : `<div class="msg-avatar-icon">👤</div>`;

  row.innerHTML = `
    ${avatar}
    <div class="msg-bubble-box">
      <div class="msg-text-content">${formatMarkdownText(content)}</div>
    </div>
  `;

  container.appendChild(row);
  scrollToBottom();
}

// Efeito de digitação suave (Typewriter) para o Bot
function appendStreamingBotMessage(fullText) {
  const container = document.getElementById('messages-container');
  const row = document.createElement('div');
  row.className = 'message-row bot-row';

  row.innerHTML = `
    <div class="msg-avatar-icon">🏛️</div>
    <div class="msg-bubble-box">
      <div class="msg-text-content"></div>
      <div class="msg-actions-bar" style="display:none;">
        <button class="msg-mini-btn" onclick="copyText(this)">
          📋 Copiar
        </button>
        <button class="msg-mini-btn" onclick="readAloud(this)">
          🔊 Ouvir
        </button>
      </div>
    </div>
  `;

  container.appendChild(row);
  const textContainer = row.querySelector('.msg-text-content');
  const actionsBar = row.querySelector('.msg-actions-bar');

  // Streaming de palavras
  const words = fullText.split(' ');
  let i = 0;
  
  if (App.typingInterval) clearInterval(App.typingInterval);

  App.typingInterval = setInterval(() => {
    if (i < words.length) {
      const currentChunk = words.slice(0, i + 1).join(' ');
      textContainer.innerHTML = formatMarkdownText(currentChunk);
      i += 2; // Avanço ágil e agradável
      scrollToBottom();
    } else {
      clearInterval(App.typingInterval);
      textContainer.innerHTML = formatMarkdownText(fullText);
      actionsBar.style.display = 'flex';
      scrollToBottom();

      // Fala em áudio se ativada
      if (App.isVoiceActive) {
        speakAloud(cleanTextForVoice(fullText));
      }
    }
  }, 25);
}

// Indicador de digitação
function appendTypingIndicator() {
  const container = document.getElementById('messages-container');
  const id = 'typing-' + Date.now();
  const row = document.createElement('div');
  row.id = id;
  row.className = 'message-row bot-row';
  row.innerHTML = `
    <div class="msg-avatar-icon">🏛️</div>
    <div class="msg-bubble-box">
      <div class="typing-pulse">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  container.appendChild(row);
  scrollToBottom();
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// Conversor simples de Markdown para HTML
function formatMarkdownText(str) {
  let text = str;
  // Negrito **texto**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Itálico *texto*
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Listas •
  text = text.replace(/• (.*?)(?=\n|$)/g, '<li>$1</li>');
  // Parágrafos
  text = text.replace(/\n\n/g, '<p style="margin-top:8px;"></p>');
  text = text.replace(/\n/g, '<br>');
  return text;
}

// Limpar formatação para voz
function cleanTextForVoice(text) {
  return text.replace(/[*#•\-_]/g, '').trim();
}

// Falar texto (TTS)
function speakAloud(text) {
  if (!App.synth) return;
  App.synth.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'pt-BR';
  utter.rate = 1.05;

  const voices = App.synth.getVoices();
  const ptVoice = voices.find(v => v.lang.includes('pt')) || null;
  if (ptVoice) utter.voice = ptVoice;

  App.synth.speak(utter);
}

function readAloud(btn) {
  const bubble = btn.closest('.msg-bubble-box');
  const textEl = bubble.querySelector('.msg-text-content');
  if (textEl) {
    speakAloud(cleanTextForVoice(textEl.innerText));
    showToast('Reproduzindo áudio...');
  }
}

function copyText(btn) {
  const bubble = btn.closest('.msg-bubble-box');
  const textEl = bubble.querySelector('.msg-text-content');
  if (textEl) {
    navigator.clipboard.writeText(textEl.innerText).then(() => {
      showToast('Texto copiado!');
    });
  }
}

// 5. RECONHECIMENTO DE FALA (VOZ DO USUÁRIO)
function initSpeechFeatures() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById('mic-btn');

  if (!SpeechRec) {
    if (micBtn) micBtn.style.display = 'none';
    return;
  }

  App.recognition = new SpeechRec();
  App.recognition.lang = 'pt-BR';
  App.recognition.continuous = false;

  App.recognition.onresult = (e) => {
    const speechResult = e.results[0][0].transcript;
    document.getElementById('chat-input').value = speechResult;
    processUserMessage(speechResult);
  };

  App.recognition.onend = () => {
    App.isListening = false;
    micBtn.classList.remove('listening');
  };

  App.recognition.onerror = () => {
    App.isListening = false;
    micBtn.classList.remove('listening');
    showToast('Não foi possível captar a voz.');
  };

  micBtn.addEventListener('click', () => {
    if (App.isListening) {
      App.recognition.stop();
      App.isListening = false;
      micBtn.classList.remove('listening');
    } else {
      try {
        App.recognition.start();
        App.isListening = true;
        micBtn.classList.add('listening');
        showToast('Ouvindo... pode falar!');
      } catch (err) {
        console.error(err);
      }
    }
  });
}

// Scroll automático
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

// ==========================================================================
// 6. MOTOR DE RESPOSTAS ESPECIALIZADO DE TUPÃ (NLP)
// ==========================================================================
function generateTupaResponse(query) {
  const q = query.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // História e Fundação
  if (hasAny(q, ['fundador', 'fundou', 'fundacao', 'criacao', 'luiz de souza', 'souza leao', '1929', 'historia'])) {
    return `🏛️ **História e Fundação de Tupã (SP)**\n\n` +
      `• **Data:** 12 de outubro de 1929.\n` +
      `• **Fundador:** O desbravador **Luiz de Souza Leão**, homem visionário que planejou o traçado urbano com ruas amplas antes mesmo do desmatamento da selva original.\n` +
      `• **Origem do Nome:** *Tupã* homenageia o Deus do Trovão na mitologia tupi-guarani. Todas as ruas originais receberam nomes de nações indígenas (Caingangs, Coroados, Guaranis, Marabás, Potiguaras, etc.).\n` +
      `• **Evolução:** Em 1938 foi elevada a município e hoje ostenta o cobiçado título de **Estância Turística do Estado de São Paulo**.`;
  }

  // Museu Índia Vanuíre
  if (hasAny(q, ['museu', 'vanuire', 'india', 'indigena', 'indio', 'kaingang', 'krenak', 'etnografico'])) {
    return `🪶 **Museu Histórico e Pedagógico Índia Vanuíre**\n\n` +
      `Considerado um dos museus etnográficos e indígenas mais importantes da América Latina!\n\n` +
      `• **A Pacificadora Vanuíre:** Homenageia a indígena Kaingang que mediou a paz entre colonizadores e povos originários na Alta Paulista no início do século XX.\n` +
      `• **Acervo Excepcional:** Mais de **38.000 peças catalogadas**, incluindo plumárias raras, cerâmicas, armas e indumentárias dos povos Kaingang, Krenak e Terena.\n` +
      `• **Localização:** Rua Coroados, 521 (Centro).\n` +
      `• **Visitação:** Aberto de terça a domingo, com entrada **gratuita** e visitas guiadas interativas.`;
  }

  // Distrito de Varpa
  if (hasAny(q, ['varpa', 'leta', 'letoes', 'letao', 'queijo', 'defumado', 'palma', 'cachoeira', 'imigrante'])) {
    return `🌲 **Distrito Histórico de Varpa: Tradição Letã na Alta Paulista**\n\n` +
      `Fundado em **1922** por famílias de imigrantes letões que fugiram da opressão política e religiosa na Europa.\n\n` +
      `**O que você não pode deixar de conhecer em Varpa:**\n` +
      `1. **Gastronomia Típica:** O renomado **Queijo Suíço Artesanal** maturado em câmaras tradicionais, os lanches do **Rancho dos Defumados** e pães caseiros.\n` +
      `2. **Cachoeira da Palma:** Paraíso ecológico para banho, trilhas na mata nativa e contemplação.\n` +
      `3. **Museu dos Pioneiros (Jānis Erdbergs):** Preserva fotos, maquinários rústicos e a história dos pioneiros europeus.\n\n` +
      `📍 *Distância:* Apenas 25 km do centro de Tupã por rodovia pavimentada.`;
  }

  // Faculdades / Universidades
  if (hasAny(q, ['faculdade', 'universidade', 'fadap', 'fap', 'unesp', 'etec', 'fatec', 'curso', 'estudar', 'biossistemas', 'direito'])) {
    return `🎓 **Polo Universitário e Educacional de Tupã**\n\n` +
      `Tupã é um centro de referência regional para estudantes do Brasil inteiro:\n\n` +
      `• **FADAP / FAP (Faculdade da Alta Paulista):** Instituição renomada e tradicional na formação de excelência em **Direito, Odontologia, Enfermagem, Psicologia, Agronomia** e saúde.\n` +
      `• **UNESP Tupã:** Câmpus público estadual de alto nível, pioneiro no país na graduação em **Engenharia de Biossistemas** e conceituado em **Administração**, com mestrado e doutorado.\n` +
      `• **FATEC Tupã:** Faculdade tecnológica pública focada no agronegócio e sistemas de gestão.\n` +
      `• **ETEC Prof. Massuyuki Kawano:** Cursos técnicos profissionalizantes de alto desempenho.`;
  }

  // Economia e Amendoim
  if (hasAny(q, ['amendoim', 'economia', 'solar', 'industria', 'fabrica', 'trabalho', 'agricultura'])) {
    return `🥜 **Economia & Vocação Produtiva de Tupã**\n\n` +
      `• **Capital Nacional do Amendoim:** A microrregião de Tupã concentra a maior área de plantio, secagem e processamento industrial de amendoim do Brasil, abrigando indústrias como a **Amendupã** e abastecendo os mercados nacional e europeu.\n` +
      `• **Polo de Energia Solar:** Reconhecida pela atração pioneira de grandes usinas solares fotovoltaicas e empresas do ramo de sustentabilidade energética.\n` +
      `• **Indústria Calçadista & Agro:** Polo tradicional na fabricação de calçados infantis, confecções e forte pecuária.`;
  }

  // Pontos Turísticos em Geral
  if (hasAny(q, ['turismo', 'ponto turistico', 'pontos turisticos', 'o que fazer', 'onde ir', 'passear', 'solar', 'praca'])) {
    return `📸 **Principais Cartões-Postais e Atrações de Tupã**\n\n` +
      `1. **Museu Índia Vanuíre:** O maior polo cultural indígena do Estado de SP.\n` +
      `2. **Distrito de Varpa:** Colônia letã, cachoeiras e queijos artesanais.\n` +
      `3. **Solar Luiz de Souza Leão:** O casarão do fundador com bosque preservado de mata nativa.\n` +
      `4. **Praça da Bandeira & Fonte:** O coração social da cidade, palco da famosa **Feira da Lua**.\n` +
      `5. **Igreja Matriz de São Pedro:** Majestosa arquitetura no centro com vitrais históricos.`;
  }

  // Eventos / Festas
  if (hasAny(q, ['festa', 'evento', 'carnaval', 'tupa folia', 'exapit', 'rodeio', 'feira da lua', 'cerejeira'])) {
    return `🎉 **Eventos e Festas Tradicionais de Tupã**\n\n` +
      `• **EXAPIT:** Grandiosa Exposição Agropecuária e Industrial de Tupã, com shows com artistas consagrados do Brasil, rodeio e gastronomia regional.\n` +
      `• **Tupã Folia:** Um dos maiores, mais organizados e animados carnavais de rua gratuitos do interior paulista.\n` +
      `• **Feira da Lua:** Encontro semanal na Praça da Bandeira com barracas de pastéis, yakisoba, comidas típicas e artesanato.\n` +
      `• **Festa da Cerejeira e Undokai:** Belíssima celebração da cultura e da união nipo-brasileira na colônia japonesa local.`;
  }

  // Dados Gerais / População
  if (hasAny(q, ['populacao', 'quantos habitantes', 'onde fica', 'altitude', 'distrito', 'mapa', 'tamanho'])) {
    return `🗺️ **Dados Gerais sobre Tupã (SP)**\n\n` +
      `• **População:** Aproximadamente **64.000 habitantes** (IBGE).\n` +
      `• **Localização:** Região Alta Paulista, a 514 km da capital São Paulo.\n` +
      `• **Altitude:** 508 metros de altitude com clima tropical de verões quentes.\n` +
      `• **Distritos Oficiais:** Varpa, Parnaso e Universo.\n` +
      `• **Cidades Vizinhas:** Bastos, Iacri, Quintana, Herculândia, Quatá, Rancharia, Arco-Íris.`;
  }

  // Onde Comer / Culinária
  if (hasAny(q, ['comer', 'comida', 'culinaria', 'restaurante', 'almoco', 'lanche', 'prato'])) {
    return `🍽️ **Gastronomia Típica em Tupã**\n\n` +
      `• **Doces de Amendoim:** Paçocas puras, amendoim doce crocante e derivados artesanais da terra do amendoim.\n` +
      `• **Delícias de Varpa:** O autêntico Queijo Suíço curado, lombo defumado e pães caseiros do Rancho dos Defumados.\n` +
      `• **Comida de Rua:** Na **Feira da Lua** (Praça da Bandeira), com pastéis quentinhos e pratos orientais da comunidade japonesa.\n` +
      `• **Restaurantes:** Excelentes churrascarias, pizzarias e cafeterias tradicionais ao longo da Avenida Tamoios e centro.`;
  }

  // Resposta Padrão Acolhedora
  return `Entendi sua dúvida sobre Tupã! 🌟\n\n` +
    `A Estância Turística de Tupã reúne mais de 90 anos de história rica desde Luiz de Souza Leão, passando pelo valor cultural do **Museu Índia Vanuíre**, a imigração letã em **Varpa**, as faculdades renomadas (**FADAP/FAP e UNESP**) e a força nacional do **amendoim**.\n\n` +
    `💡 *Sugestão:* Experimente me perguntar especificamente sobre *Varpa*, *Museu Vanuíre*, *História da Fundação*, *Faculdades* ou *Pontos Turísticos* para detalhes completos!`;
}

function hasAny(text, words) {
  return words.some(w => text.includes(w.toLowerCase()));
}
