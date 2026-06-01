# NutriTrack

**Assistente pessoal de nutrição e treino — local-first, offline-ready, com IA via proxy seguro.**

NutriTrack é um PWA (Progressive Web App) que permite registrar refeições, água, treinos e acompanhar o progresso nutricional e físico. A IA sugere dietas, treinos e insights — sempre com revisão humana antes de salvar. Os dados ficam no dispositivo por padrão. A chave da API nunca chega ao browser.

---

## Funcionalidades

### Dieta e nutrição
- Registro manual de refeições com cálculo automático de macros
- Análise de refeição por imagem ou texto via IA
- Geração de plano alimentar semanal personalizado via IA
- Planejador semanal de refeições (plano ≠ consumo diário)
- Importação de dieta própria (texto colado, `.txt`, `.md`, `.pdf`, `.doc`)
- Registro de consumo de água com meta diária

### Treino
- Registro de treino executado com séries, repetições e carga
- Registro de cardio e passos (volume — sem conversão automática para kcal)
- Planejador semanal de treinos (agenda ≠ execução)
- Geração de plano de treino semanal via IA (splits personalizados)
- Análise de equipamento de academia por imagem via IA

### Perfil e metas
- Perfil completo: peso, altura, idade, gênero, nível de atividade, objetivo
- Cálculo automático de metas calóricas via Mifflin-St Jeor
- Metas editáveis manualmente
- Bioimpedância opcional (não bloqueia outras áreas)

### Histórico e progresso
- Histórico diário com snapshot de metas do dia (alterações futuras de meta não distorcem o passado)
- Rollover diário automático (arquiva sem apagar)
- Gráficos: tendência de calorias, frequência de treinos, evolução de peso, distribuição de macros, bioimpedância
- Exportação de histórico em CSV e PDF

### Backup e privacidade
- Backup versionado com schema validado
- Importação segura (arquivo inválido não corrompe dados)
- Reset com confirmação explícita
- Dados armazenados exclusivamente no dispositivo (localStorage)
- Imagens enviadas à IA não são persistidas localmente

### Offline e PWA
- Funciona offline: dados locais acessíveis sem conexão
- Instalável como app (PWA v1.2.0)
- Service worker com cache de assets

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React + TypeScript + Vite |
| Estilo | Tailwind CSS v4 |
| PWA | vite-plugin-pwa (Workbox) |
| IA | OpenRouter API (`xiaomi/mimo-v2.5`) via proxy Vercel |
| Proxy | `/api/openrouter-proxy.ts` (Vercel Node Function) |
| Persistência | localStorage (local-first) |
| Testes | Vitest (23 testes unitários) |
| Deploy | Vercel |

---

## Rodando localmente

### Pré-requisitos

- Node.js 18+
- Conta no [OpenRouter](https://openrouter.ai) com chave de API

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz:

```env
# Chave da API do OpenRouter — usada apenas pelo proxy servidor
# NÃO use o prefixo VITE_ aqui. Com VITE_ a chave ficaria exposta no bundle do browser.
OPENROUTER_API_KEY=sk-or-...

# Modelo opcional (padrão: xiaomi/mimo-v2.5)
VITE_OPENROUTER_MODEL=xiaomi/mimo-v2.5
```

> **Segurança:** A variável `OPENROUTER_API_KEY` (sem prefixo `VITE_`) nunca é injetada no bundle do browser pelo Vite. Todas as chamadas de IA passam exclusivamente pelo proxy em `/api/openrouter-proxy.ts`.

### Rodando em desenvolvimento

```bash
npm run dev
```

O proxy Vercel (`/api/`) não está disponível em `npm run dev` por padrão. Para testar as funções de IA localmente, use a [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm install -g vercel
vercel dev
```

### Testes

```bash
npm run test -- --run
```

Resultado esperado: `Test Files 7 passed (7), Tests 23 passed (23)`

### Build de produção

```bash
npm run build
```

---

## Deploy na Vercel

### 1. Conectar o repositório

```
vercel.com → Add New Project → Import Git Repository → Leandrogm81/Nutritrack
```

### 2. Configurar variáveis de ambiente

```
Projeto → Settings → Environment Variables
```

| Nome | Valor | Tipo | Ambientes |
|---|---|---|---|
| `OPENROUTER_API_KEY` | `sk-or-...` | **Secret (sensitive)** | Production, Preview, Development |
| `VITE_OPENROUTER_MODEL` | `xiaomi/mimo-v2.5` | Plain text | Production, Preview |

> ⚠️ **Nunca** adicione uma variável chamada `VITE_OPENROUTER_API_KEY`. Com esse nome o Vite injeta o valor no bundle público do browser.

### 3. Deploy

O deploy é automático a cada push na branch `main`.

---

## Estrutura do projeto

```
/
├── api/
│   └── openrouter-proxy.ts     # Proxy Vercel Node — único canal para IA
├── src/
│   ├── components/             # Componentes React (Dashboard, MealForm, WorkoutTracker, ...)
│   ├── services/
│   │   └── geminiService.ts    # Serviço de IA (opera via OpenRouter; nome mantido por convenção)
│   ├── utils/                  # Lógica de domínio e utilitários com testes unitários
│   │   ├── domain.ts / .test.ts
│   │   ├── rollover.ts / .test.ts
│   │   ├── planner.ts / .test.ts
│   │   ├── activity.ts / .test.ts
│   │   ├── stateMigration.ts / .test.ts
│   │   └── backup/
│   │       ├── validateBackup.ts / .test.ts
│   │       └── schema.ts
│   ├── hooks/                  # Custom hooks (useLocalStorage, useOnlineStatus)
│   ├── constants/              # Estado inicial e constantes de domínio
│   └── types.ts                # Tipos TypeScript do domínio
├── docs/
│   ├── product/PRD.md          # Product Requirements Document
│   ├── implementation/         # Plano e tarefas por sprint (Sprints 0–10)
│   ├── audit/                  # Auditoria final, correções e relatório de validação
│   ├── evolution/              # Decisões técnicas, changelog, mudanças fora de escopo
│   └── agent/                  # Arquivos de continuidade entre sessões de agente
└── vite.config.ts
```

---

## Status do projeto

**v1.2.0 — Aprovado para teste interno**

| Item | Status |
|---|---|
| 23 testes unitários | ✅ Passando |
| Build de produção | ✅ Limpo |
| Lint / TypeScript | ✅ Sem erros |
| Chave de API no bundle | ✅ Ausente (0 ocorrências verificadas) |
| Smoke-test visual humano | ⏳ Pendente |
| Variáveis de ambiente na Vercel | ⏳ Confirmar manualmente |
| Avisos de IA e privacidade na UI | ⏳ Aguardando aprovação do texto |

---

## Decisões técnicas relevantes

- **IA via proxy exclusivo:** `getApiKey()` retorna `undefined` no browser; toda chamada usa `/api/openrouter-proxy.ts`
- **Passos sem conversão para kcal:** Passos registram apenas volume; calorias de cardio dependem de entrada manual (alinhado ao PRD)
- **Snapshot de metas no histórico:** `DailyHistoryEntry.goals` guarda a meta vigente no dia, evitando distorção retrospectiva
- **`geminiService.ts`:** Nome mantido para evitar breaking change nas importações; a integração real é com OpenRouter

Decisões completas em [`/docs/evolution/DECISIONS.md`](docs/evolution/DECISIONS.md).

---

## Licença

Uso privado. Repositório público para fins de portfólio e colaboração.
