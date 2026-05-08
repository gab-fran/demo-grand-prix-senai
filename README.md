# I.R.O.N. (Integrated Route Optimization Network) - Protótipo de Gestão de Frota e Transporte

Um protótipo de aplicação web para simulação e gestão de mobilidade interna em ambientes corporativos ou industriais. Desenvolvido com **React**, **Vite** e **TailwindCSS**, o projeto oferece uma interface visual interativa com mapa em tempo real para monitoramento de veículos, ônibus, equipes e tráfego.

## 📋 Visão Geral

Este projeto simula um sistema completo de mobilidade interna com múltiplos painéis especializados para diferentes tipos de usuários:

- **Solicitantes**: Usuários que precisam de transporte interno
- **Motoristas**: Condutores que atendem às solicitações de viagem
- **Gestores/Controladores**: Responsáveis pelo monitoramento operacional da frota
- **Passageiros de Ônibus**: Visualização de linhas e horários de transporte coletivo

## ✨ Funcionalidades Principais

### 🗺️ Mapa Interativo
- Visualização em SVG de vias internas com status de tráfego em tempo real (verde, amarelo, vermelho, bloqueado)
- Localização de pontos de interesse: Armazém 📦, Oficina 🛠️, Portaria 🚪
- Monitoramento de veículos, ônibus e equipes em movimento
- Sistema de alertas operacionais

### 🚗 Painel do Solicitante
- Traçar rotas entre origem e destino
- Cálculo simulado de ETA (Tempo Estimado de Chegada)
- Solicitação de veículo particular
- Acompanhamento em tempo real da chegada do motorista
- Recálculo automático de rotas considerando bloqueios

### 👨‍💼 Painel do Motorista
- Visualização de corridas disponíveis
- Aceite/recusa de solicitações
- Alternância de status (Disponível/Pausa)
- Visualização de rota com métricas de distância e tempo
- Reporte de incidentes à central
- Recálculo automático de rotas desviando de vias bloqueadas

### 🎛️ Central de Controle
- Visão operacional completa em tempo real
- Monitoramento de todas as solicitações com prioridades
- KPIs operacionais:
  - Tempo médio de atendimento
  - Veículos livres
  - Incidentes ativos
- Modo de bloqueio de vias (clique no mapa para bloquear/desbloquear)
- Alertas inteligentes gerados automaticamente
- Visualização de equipes em campo

### 🚌 Módulo de Ônibus
- Visualização de 3 linhas de ônibus (Alpha, Bravo, Charlie)
- Horários programados por linha
- Simulação de deslocamento contínuo dos ônibus
- Cores distintas para identificação das linhas

## 🏗️ Arquitetura Técnica

### Tecnologias Utilizadas
- **React 18.3** - Biblioteca UI
- **Vite 5.4** - Build tool e dev server
- **React Router DOM 6.30** - Roteamento
- **TailwindCSS 3.4** - Estilização
- **SVG** - Renderização do mapa interativo

### Estrutura do Projeto
```
src/
├── components/
│   ├── InfoCard.jsx        # Componente de informações
│   ├── Map.jsx             # Componente principal do mapa SVG
│   └── QuickAccessButton.jsx # Botões de acesso rápido
├── context/
│   └── SimulationContext.jsx # Contexto para estado global da simulação
├── layouts/
│   └── AppLayout.jsx       # Layout base das páginas
├── pages/
│   ├── BusPage.jsx         # Página de ônibus
│   ├── ControlPage.jsx     # Central de controle
│   ├── DriverPage.jsx      # Painel do motorista
│   ├── LoginPage.jsx       # Tela de login/acesso
│   └── RequesterPage.jsx   # Painel do solicitante
├── App.jsx                 # Componente raiz com rotas
├── main.jsx                # Ponto de entrada
└── styles.css              # Estilos globais
```

### Simulação em Tempo Real
O `SimulationContext` gerencia:
- **Tráfego dinâmico**: Status das ruas muda aleatoriamente a cada 4.5 segundos
- **Movimento de veículos**: Carros e ônibus se movem continuamente em rotas pré-definidas
- **Alertas automáticos**: Novos alertas são gerados a cada 7 segundos
- **Bloqueio de vias**: Usuários podem bloquear/desbloquear ruas manualmente

## 🚀 Como Usar

### Pré-requisitos
- Node.js (versão recomendada: 18+)
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Acessando os Módulos

Após iniciar o servidor de desenvolvimento, acesse `http://localhost:5173` (ou porta indicada no terminal):

1. **Login**: Digite qualquer matrícula fake ou use os botões de acesso rápido
2. **Solicitante**: `/app` - Trace rotas e solicite veículos
3. **Motorista**: `/driver` - Gerencie corridas e rotas
4. **Controle**: `/control` - Monitore toda a operação
5. **Ônibus**: `/bus` - Visualize linhas e horários

## 🎮 Recursos Interativos

### Modo Bloqueio
- Disponível nas páginas de **Controle** e **Motorista**
- Ative o modo e clique em qualquer rua no mapa para bloquear/desbloquear
- Rotas são automaticamente recalculadas para evitar vias bloqueadas
- KPIs e alertas são atualizados em tempo real

### Sistema de Alertas
- Alertas automáticos sobre tráfego, acidentes e operações
- Motoristas podem reportar incidentes manualmente
- Central de controle exibe alertas críticos em destaque

### Animações
- Veículos se movem suavemente pelo mapa
- Status de tráfego muda dinamicamente
- Barra de progresso visual para solicitações de veículo

## 📊 Dados Simulados

O projeto utiliza dados mockados para demonstração:
- **Veículos particulares**: 3 carros (CAR-21, CAR-19, CAR-31)
- **Ônibus**: 2 ônibus (BUS A, BUS B)
- **Equipes**: 2 equipes de campo (Delta, Echo)
- **Localizações**: Armazém, Oficina, Portaria
- **Vias**: 6 ruas com nomes fictícios (Via Norte, Corredor A/B, etc.)

## 🛠️ Personalização

### Adicionar Novas Rotas
Edite o arquivo `SimulationContext.jsx`:
```javascript
const fleetPaths = {
  v4: [[x1, y1], [x2, y2], ...], // Nova rota para veículo
};
```

### Adicionar Localizações
Edite o arquivo `Map.jsx`:
```javascript
const locations = [
  // ... existentes
  { id: 'loc-new', name: 'Nova Localização', x: 100, y: 200, icon: '🏢' },
];
```

### Configurar Linhas de Ônibus
Edite o arquivo `BusPage.jsx`:
```javascript
const busLines = [
  {
    id: 'line-new',
    name: 'Nova Linha',
    color: '#hexcolor',
    path: [[x1, y1], [x2, y2], ...],
    schedules: ['06:00', '07:00', ...],
  },
];
```

## 📝 Considerações

Este é um **protótipo de demonstração** com as seguintes características:
- ✅ Foco na experiência visual e interação
- ✅ Simulação de comportamentos em tempo real
- ✅ Demonstra conceitos de UX/UI para sistemas de mobilidade
- ⚠️ Dados fictícios e hardcoded
- ⚠️ Sem integração com backend ou APIs reais
- ⚠️ Algoritmos de rota simplificados para demonstração

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com hot-reload |
| `npm run build` | Gera build otimizado para produção |
| `npm run preview` | Visualiza build de produção localmente |

## 📄 Licença

Projeto desenvolvido para fins de demonstração e aprendizado.
