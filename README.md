# 🏁 GridZone • O Waze dos Gearheads & Radar de Encontros Automotivos

<p align="center">
  <img src="logo.jpg" alt="GridZone Official Logo" width="340" style="border-radius: 20px; box-shadow: 0 0 35px rgba(0, 245, 155, 0.35);" />
</p>

Uma plataforma web de alta performance estilo **Waze** desenvolvida sob medida para a cultura automotiva, preparação e entusiastas. Permite que pilotos se localizem no mapa em **tempo real via GPS**, combinem comboios, marquem pontos de encontro e retas de teste seguras, alertem sobre radares/fiscalizações e gerenciem suas garagens e telemetria.

---

## 🗺️ Funcionalidades do Radar Live (Waze Automotivo)

- 📡 **Geolocalização Real (GPS Tracking):**
  - Rastreamento em tempo real da sua posição (`HTML5 Geolocation API`) em mapa escuro noturno tático (CartoDB Dark Matter / Leaflet.js).
  - Marcador pulsante estilo sonar com telemetria e velocidade atual.
- 🏎️ **Pilotos no Radar em Tempo Real:**
  - Visualize outros pilotos e carros modificados que estão rodando na sua região (BMW M2 Stage 2, Audi RS3 DaZa, Golf R, Civic Si Turbo).
  - Popups informativos com modelo do carro, potência em cv, velocidade atual e status de deslocamento.
- 🏁 **Mapeamento de Pontos de Encontro & Spots:**
  - Botão **"+ Marcar Ponto / Encontro"** para criar e transmitir instantaneamente pontos de concentração, retas de teste e postos de combustível com gasolina Podium.
  - Informações de quantidade de carros no local em tempo real.
- 🚨 **Sistema de Alertas Colaborativos (Estilo Waze):**
  - Botão **"🚨 Alertar Radar / Blitz"** com efeitos sonoros de sirene sintéticos (Web Audio API).
  - Notificações de radares móveis, comandos e perigos na pista (óleo, buracos).
- 📻 **Rádio PTT & Canal de Voz do Comboio:**
  - Painel de mensagens rápidas em frequência dedicada (27.185 MHz) para comunicação entre os pilotos.
- 📟 **HUD & Velocímetro Digital:**
  - Velocímetro em tempo real, proa/bússola em graus (heading) e precisão de satélite 3D.
  - Efeitos sonoros de radar ping e alertas sonoros integrados.

---

## 🏎️ Outros Módulos Integrados

- **Garagem Virtual & Telemetria:** Ficha técnica detalhada (560 cv, 680 Nm, 0-100 em 3.4s, 1.8 bar de turbo), lista de mods instalados (Downpipe, Intake Carbono, Coilovers KW V3, Remap Bootmod3).
- **Mural do Paddock (Feed Social):** Publicações de fotos, relatos de Track Day e encontros noturnos.

---

## 🚀 Como Acessar e Rodar

### 🌐 Acesso Online
O projeto conta com deploy contínuo ativo:
👉 [**https://vctraphael.github.io/projeto-1/**](https://vctraphael.github.io/projeto-1/)

### 💻 Executar Localmente
```bash
python servidor.py
```
Acesse `http://localhost:8000` no seu navegador com suporte nativo a GPS!

---

Desenvolvido para apaixonados pela cultura do automobilismo, alta velocidade e telemetria! 🏁🔥
