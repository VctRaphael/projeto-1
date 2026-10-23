/**
 * Base de Conhecimento Especializada sobre a Estância Turística de Tupã - SP
 * Contém história, pontos turísticos, distritos, cultura, economia, educação e dados gerais.
 */

const TUPA_DATA = {
  info: {
    nome: "Estância Turística de Tupã",
    estado: "São Paulo (SP)",
    regiao: "Alta Paulista (Centro-Oeste Paulista)",
    fundacao: "12 de outubro de 1929",
    fundador: "Luiz de Souza Leão",
    significado_nome: "Tupã significa 'Deus do Trovão' ou 'Espírito Supremo' na mitologia tupi-guarani.",
    populacao: "Aproximadamente 63.928 habitantes (Censo IBGE)",
    area: "627,98 km²",
    altitude: "508 metros",
    gentilico: "Tupaense",
    padroeiro: "São Pedro (comemorado em 29 de junho)",
    distritos: ["Varpa", "Parnaso", "Universo"],
    clima: "Tropical de altitude com invernos secos e verões quentes e chuvosos.",
    cidades_vizinhas: ["Bastos", "Iacri", "Arco-Íris", "Herculândia", "Quintana", "Quatá", "Rancharia", "Rinópolis"]
  },

  categorias: [
    {
      id: "historia",
      titulo: "História & Origem",
      icone: "fa-landmark",
      resumo: "Fundada em 12 de outubro de 1929 pelo desbravador Luiz de Souza Leão no coração da Alta Paulista."
    },
    {
      id: "museu",
      titulo: "Museu Índia Vanuíre",
      icone: "fa-feather-pointed",
      resumo: "Um dos maiores museus de história e cultura indígena do Brasil, mantido pelo Governo de SP e ACAM Portinari."
    },
    {
      id: "varpa",
      titulo: "Distrito de Varpa",
      icone: "fa-tree",
      resumo: "Colônia fundada por imigrantes letões em 1922, famosa pela arquitetura, queijos artesanais, artesanato e ecoturismo."
    },
    {
      id: "turismo",
      titulo: "Turismo & Lazer",
      icone: "fa-camera",
      resumo: "Solar Luiz de Souza Leão, Praça da Bandeira, Igreja Matriz de São Pedro e rotas gastronômicas."
    },
    {
      id: "educacao",
      titulo: "Educação & Faculdades",
      icone: "fa-graduation-cap",
      resumo: "Polo universitário da região com a FADAP/FAP, UNESP (Engenharia e Administração), ETEC e FATEC."
    },
    {
      id: "economia",
      titulo: "Economia & Amendoim",
      icone: "fa-seedling",
      resumo: "Capital Nacional do Amendoim, polo de energia solar, agropecuária forte e polo calçadista."
    }
  ],

  pontos_turisticos: [
    {
      nome: "Museu Histórico e Pedagógico Índia Vanuíre",
      categoria: "Cultura & História",
      descricao: "Referência nacional em museologia indígena. Conta a convivência histórica entre colonizadores e os povos indígenas Kaingang e Krenak da Alta Paulista. Possui mais de 38 mil peças catalogadas.",
      endereco: "Rua Coroados, 521 - Centro",
      dica: "Aberto de terça a domingo. Entrada gratuita!"
    },
    {
      nome: "Distrito Histórico de Varpa",
      categoria: "Ecoturismo & Tradição",
      descricao: "Fundado em 1922 por letões batistas que fugiram da perseguição religiosa na Europa. Mantém casas de madeira no estilo europeu, o Rancho dos Defumados, o Museu dos Pioneiros de Varpa e belíssimas cachoeiras como a Cachoeira da Palma.",
      distancia: "Aproximadamente 25 km do centro de Tupã",
      destaques: ["Queijo Suíço Artesanal", "Pão Letão", "Cachoeiras", "Rancho dos Defumados"]
    },
    {
      nome: "Solar Luiz de Souza Leão",
      categoria: "Patrimônio Histórico",
      descricao: "Antiga residência do fundador da cidade. Rodeado por um belíssimo bosque nativo com árvores centenárias. É hoje tombado pelo patrimônio histórico e recebe eventos culturais.",
      endereco: "Rua Caingangs, 600 - Centro",
      dica: "Excelente local para passeios fotográficos e contemplação da natureza."
    },
    {
      nome: "Praça da Bandeira & Fonte Luminosa",
      categoria: "Lazer & Convivência",
      descricao: "O coração social de Tupã. Abriga o Espaço Cultural José Anselmo Filho, um anfiteatro ao ar livre, ampla arborização e a famosa Feira da Lua (com gastronomia de rua e artesanato local).",
      endereco: "Centro de Tupã"
    },
    {
      nome: "Igreja Matriz de São Pedro",
      categoria: "Religioso & Arquitetura",
      descricao: "Templo majestoso no centro da cidade dedicado ao padroeiro São Pedro. Conta com vitrais deslumbrantes e arquitetura tradicional imponente.",
      endereco: "Em frente à Praça da Bandeira"
    }
  ],

  educacao_instituicoes: [
    {
      sigla: "FADAP / FAP",
      nome: "Faculdade da Alta Paulista",
      destaque: "Uma das instituições de ensino superior mais tradicionais e renomadas da Alta Paulista, formando gerações de profissionais em Direito, Odontologia, Enfermagem, Psicologia, Agronomia e outras áreas essenciais."
    },
    {
      sigla: "UNESP Tupã",
      nome: "Universidade Estadual Paulista - Câmpus Experimental de Tupã",
      destaque: "Campus público estadual de excelência fundado em 2003, pioneiro com o curso de Engenharia de Biossistemas e tradicional em Administração, com ampla produção científica e pós-graduação."
    },
    {
      sigla: "ETEC Prof. Massuyuki Kawano",
      nome: "Escola Técnica Estadual de Tupã (Centro Paula Souza)",
      destaque: "Referência no ensino médio integrado e cursos técnicos profissionalizantes de alto nível."
    },
    {
      sigla: "FATEC Tupã",
      nome: "Faculdade de Tecnologia de Tupã",
      destaque: "Cursos superiores tecnológicos com foco em inovação, gestão e agronegócio."
    }
  ],

  curiosidades: [
    "Tupã foi totalmente planejada antes de sua fundação em 1929, inspirando-se em traçados modernos com ruas e avenidas largas.",
    "O fundador Luiz de Souza Leão determinou que as ruas levassem nomes de etnias indígenas (Caingangs, Coroados, Guaranis, Marabás, Potiguaras, etc.).",
    "A região de Tupã é a maior produtora e processadora de amendoim do Brasil, abrigando indústrias conceituadas de doces e derivados.",
    "Varpa é uma das poucas colônias de imigração letã do mundo que ainda preserva tradições religiosas e gastronômicas ancestrais.",
    "A cidade tem o título oficial de Estância Turística do Estado de São Paulo, o que garante investimentos especiais em preservação e acolhimento."
  ],

  faqs: [
    {
      pergunta: "Quem fundou Tupã e quando?",
      resposta: "Tupã foi fundada no dia 12 de outubro de 1929 pelo visionário Luiz de Souza Leão. A fundação ocorreu em plena mata virgem da Alta Paulista, onde foi erguido um cruzeiro inicial no local onde hoje é a Praça da Bandeira."
    },
    {
      pergunta: "O que significa o nome Tupã?",
      resposta: "O nome Tupã tem origem na língua tupi-guarani e representa a manifestação de Deus através do trovão e do relâmpago, o Grande Espírito Supremo adorado pelos povos indígenas originários do Brasil."
    },
    {
      pergunta: "Quais são os principais pontos turísticos de Tupã?",
      resposta: "Os principais pontos turísticos são:\n1. **Museu Índia Vanuíre** (um dos maiores acervos indígenas da América Latina)\n2. **Distrito Histórico de Varpa** (colônia letã com queijos artesanais, cachoeiras e arquitetura rústica)\n3. **Solar Luiz de Souza Leão** (casarão do fundador com bosque nativo preservado)\n4. **Praça da Bandeira** (fonte luminosa, feira da lua e anfiteatro)\n5. **Igreja Matriz de São Pedro** (arquitetura histórica e vitrais)."
    },
    {
      pergunta: "O que tem para fazer no distrito de Varpa?",
      resposta: "Em Varpa você encontra turismo histórico, cultural e gastronômico:\n• Visita ao Museu dos Pioneiros de Varpa (Jānis Erdbergs)\n• Rancho dos Defumados e produção de queijo suíço artesanal\n• Trilhas e banho na Cachoeira da Palma\n• Arquitetura original dos imigrantes letões de 1922\n• Compra de doces, geleias, mel e artesanato típico."
    },
    {
      pergunta: "Quais faculdades existem em Tupã?",
      resposta: "Tupã é um forte polo educacional universitário regional com:\n• **FADAP / FAP** (Faculdade da Alta Paulista - com cursos tradicionais como Direito, Odonto, Enfermagem, etc.)\n• **UNESP Tupã** (Universidade Estadual Paulista - Engenharia de Biossistemas e Administração)\n• **FATEC Tupã** (Gestão da Tecnologia e Agronegócio)\n• **ETEC Prof. Massuyuki Kawano** (Cursos técnicos e ensino médio)."
    },
    {
      pergunta: "Por que Tupã é a Capital do Amendoim?",
      resposta: "Tupã e as cidades vizinhas na Alta Paulista concentram a maior área plantada e a maior capacidade industrial de secagem, beneficiamento e industrialização de amendoim do Brasil, abastecendo o mercado nacional e exportando para dezenas de países."
    },
    {
      pergunta: "Quais são as principais festas e eventos de Tupã?",
      resposta: "Os eventos mais tradicionais de Tupã incluem:\n• **EXAPIT** (Grande Exposição Agropecuária e Industrial de Tupã, com shows e rodeio)\n• **Tupã Folia** (Um dos carnavais de rua mais animados e seguros do interior paulista)\n• **Festa da Cerejeira e Undokai** (Celebrações da colônia nipo-brasileira)\n• **Feira da Lua** (Gastronomia regional semanal na Praça da Bandeira)\n• **Festa de São Pedro** (Quermesse e festa do padroeiro em junho)."
    }
  ]
};
