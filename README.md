# 🏁 GridZone • Plataforma para Entusiastas & Garagens Virtuais

Uma plataforma web moderna, imersiva e de alta performance criada para entusiastas automotivos e donos de carros modificados gerenciarem suas **garagens virtuais**, **fichas técnicas**, **diários de bordo & manutenções**, **gestão financeira de custos** e interagirem no **feed da comunidade (Paddock Social)**.

---

## 🌟 Funcionalidades & Módulos Implementados

### 1. 📊 Dashboard / Visão Geral
- **Showcase da Garagem Ativa:** Visualização do carro principal com fotografia em alta definição, status de preparação (ex: *Pista & Rua - Stage 2*), ano, cor e detalhes de acabamento.
- **Métricas de Telemetria:** Painel rápido com potência estimada (**cv**), ganho sobre o original (**+100 cv**), torque (**Nm**), aceleração de **0 a 100 km/h** e odômetro atualizado.
- **Bento Grid de Indicadores:** Odômetro, total acumulado em modificações, quilometragem para a próxima manutenção preventiva e valor total de despesas operacionais.
- **Atalhos Rápidos:** Botões dedicados no topo e no dashboard para cadastrar novos mods, lançar despesas e postar no feed.

### 2. 🏎️ Garagem Virtual & Diário de Bordo
- **Ficha Técnica Detalhada:** Motorização, câmbio, tração, peso, relação peso/potência e comparativo dinâmico de curva de potência original vs. remapeado.
- **Rastreador de Modificações (Mods Tracker):**
  - Lista com peças instaladas, peças na caixa (a instalar) e lista de desejos futuros.
  - Filtros instantâneos por status.
  - Ganhos de potência estimados, marca, categoria (Escape, Admissão, Injeção, Suspensão, etc.) e custos.
  - **Modal interativo** para adicionar novas modificações à garagem em tempo real.
- **Linha do Tempo de Manutenções (Logbook):**
  - Registro cronológico das revisões com KM, data, oficina responsável e descrição das peças substituídas (óleo Motul 300V, pastilhas Ferodo Racing, fluido RBF 660, velas NGK Iridium).

### 3. 💸 Diário de Custos & Gestor Financeiro
- **Breakdown de Gastos por Categoria:** Barras de progresso com porcentagem dos gastos distribuídos entre *Combustível de Alta Octanagem (Podium/Octapro)*, *Peças & Mods*, *Manutenção Preventiva*, *Seguro & Documentação* e *Track Days*.
- **Extrato Financeiro Completo:** Tabela com histórico das despesas detalhadas.
- **Modal de Lançamento:** Formulário para registrar novos abastecimentos, trocas de peças e serviços com cálculo automático do novo montante.

### 4. 🏁 Feed da Comunidade (Paddock Social)
- **Mural Social para Gearheads:** Publicações com fotos dos carros, relatos de dias de pista (*Track Days* no Velocitta/Interlagos), passadas no dinamômetro (*Dyno Runs*) e encontros de fim de semana (*Cars & Coffee*).
- **Interações em Tempo Real:** Sistema de curtidas com contador dinâmico e seção de comentários onde você pode ler e enviar novas respostas.
- **Modal de Criação:** Compartilhe fotos, relatos e hashtags do seu projeto.

---

## 🛠️ Stack Tecnológica

- **Frontend:** React 18 com arquitetura modular, Componentes Reutilizáveis e Hooks (`useState`, `useEffect`, `useMemo`).
- **Estilização:** Tailwind CSS com Design System automotivo customizado (*Dark Carbon*, *Neon Lime*, *Racing Red*, *Nitrous Cyan* e *Glassmorphism*).
- **Tipografia:** Google Fonts (*Orbitron*, *Rajdhani* e *Plus Jakarta Sans*).
- **Compatibilidade:** 100% responsivo para visualização fluida em dispositivos móveis (com barra de navegação flutuante inferior) e telas ultra-wide de desktop.
- **Deploy:** Otimizado com `vercel.json` para **Vercel** e compatibilidade nativa com **GitHub Pages**.

---

## 🚀 Como Executar

### Opção 1: Direto no Navegador (Sem Instalação)
Basta abrir o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Brave, Safari).

### Opção 2: Servidor Local Python
```bash
python servidor.py
```
O navegador abrirá automaticamente em `http://localhost:8000`.

---

Desenvolvido para entusiastas da cultura automotiva, preparação e automobilismo! 🏁🔥
