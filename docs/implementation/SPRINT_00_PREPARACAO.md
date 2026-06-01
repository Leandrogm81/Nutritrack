# Sprint 0 - Preparacao e leitura do projeto

## Objetivo

Confirmar a arquitetura real do brownfield, os comandos oficiais, os arquivos sensiveis, os riscos tecnicos e os pontos de decisao pendentes antes de qualquer implementacao. Esta sprint existe para evitar que o agente trabalhe com suposicoes falsas.

A Sprint 0 nao deve implementar funcionalidades.

## Arquivos a inspecionar

- Arquivo confirmado na codebase: `/package.json`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo confirmado na codebase: `/src/hooks/useLocalStorage.ts`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivos confirmados na codebase: `/src/components/*.tsx`
- Arquivo confirmado na codebase: `/.env.example`
- Arquivo confirmado na codebase: `/vite.config.ts`
- Arquivo confirmado na codebase: `/tsconfig.json`
- Arquivo confirmado na codebase: `/index.html`
- Arquivo confirmado na codebase: `/vercel.json`
- Pasta confirmada na codebase: `/docs/`
- Arquivo de apoio confirmado: `/docs/product/BROWNFIELD_ANALYSIS.md`

## Documentacao a consultar

- `/docs/agent/agent-operating-rules.md`
- `/docs/product/PRD.md`
- `/docs/product/acceptance-criteria.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/design/UI_UX_GUIDE.md`

Se algum arquivo nao existir, registrar a ausencia e continuar com os documentos disponiveis.

## Estrutura a mapear

- navegacao principal e subtelas;
- contratos de dados em `/src/types.ts`;
- estado global e rollover diario em `/src/App.tsx`;
- formularios principais de perfil, refeicao, treino e planejamento;
- servico de IA e pontos de chamada Gemini;
- historico, exportacao, importacao e reset;
- gestao de `localStorage` e schema atual;
- assets e configuracao PWA;
- variaveis de ambiente e risco de segredo em cliente;
- ausencia ou presenca de testes automatizados.

## Dependencias a verificar

- Versoes de React, Vite, TypeScript, `@google/genai`, `vite-plugin-pwa`, `jspdf`, `recharts` e `html5-qrcode`.
- Uso real de `GEMINI_API_KEY` e `APP_URL`.
- Existencia de dependencias e componentes mortos.
- Existencia de script de testes ou necessidade de introduzi-lo depois.
- Necessidade de assets PWA locais em vez de referencias externas.

## Comandos iniciais

- Instalacao de dependencias: confirmar se o projeto usa `npm install` ou `npm ci`.
- Desenvolvimento local: `npm run dev`
- Lint/typecheck atual: `npm run lint`
- Build: `npm run build`
- Testes: confirmar no `package.json`; hoje nao ha script dedicado confirmado.
- Inspecao de estrutura: `rg --files src` ou equivalente.
- Verificacao de variaveis de ambiente: revisar `.env.example`, `vite.config.ts` e documentacao do projeto.

## Tarefas em ordem

### Tarefa 0.1 - Confirmar stack, scripts e ambiente

Descricao:
Ler `package.json`, `vite.config.ts`, `tsconfig.json`, `.env.example` e documentacao operacional para registrar stack, scripts e riscos de ambiente.

Arquivos provaveis:
- `/package.json`
- `/vite.config.ts`
- `/.env.example`
- `/tsconfig.json`

Criterio de aceite:
- Stack, scripts e variaveis de ambiente relevantes ficam listados sem ambiguidade.

Validacao:
- `npm run lint`
- `npm run build`

Riscos:
- Assumir script inexistente ou sem confirmar o papel de `GEMINI_API_KEY`.

O que NAO alterar:
- Dependencias, scripts e configuracoes nesta sprint.

### Tarefa 0.2 - Mapear o dominio e o estado atual

Descricao:
Revisar `App.tsx`, `types.ts`, `useLocalStorage.ts` e os componentes principais para mapear entidades, fluxo do dia, historico, treino, planner e pontos de persistencia.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/types.ts`
- `/src/hooks/useLocalStorage.ts`
- `/src/components/*.tsx`

Criterio de aceite:
- Entidades principais, entradas/saidas e pontos sensiveis ficam registrados para orientar as sprints seguintes.

Validacao:
- Revisao estatica da codebase
- Registro resumido em artefato de continuidade

Riscos:
- Ignorar dependencias escondidas em componentes ou subfluxos de IA.

O que NAO alterar:
- Contratos de dados e componentes.

### Tarefa 0.3 - Mapear navegacao real e fluxos expostos ao usuario

Descricao:
Confirmar telas acessiveis, subtelas, Historico, Progresso, Perfil e qualquer funcionalidade brownfield que esteja fora do MVP documentado.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/components/Dashboard.tsx`
- `/src/components/HistoryCalendar.tsx`
- `/src/components/Analytics.tsx`
- `/src/components/WorkoutGenerator.tsx`

Criterio de aceite:
- Fica claro o que hoje esta visivel ao usuario, o que esta escondido e o que esta fora do PRD.

Validacao:
- `npm run dev`
- Navegacao manual no app

Riscos:
- Deixar passar uma superficie fora de escopo ainda visivel.

O que NAO alterar:
- Navegacao e layout nesta sprint.

### Tarefa 0.4 - Confirmar exportacao, importacao, PWA e seguranca basica

Descricao:
Localizar onde estao as rotinas de exportacao/importacao/reset, como o app se comporta offline e como o segredo da IA entra no bundle.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/components/HistoryCalendar.tsx`
- `/src/services/geminiService.ts`
- `/vite.config.ts`
- `/index.html`

Criterio de aceite:
- Os riscos de dados locais, PWA e IA ficam registrados com localizacao tecnica clara.

Validacao:
- `npm run build`
- Revisao do bundle/configuracao

Riscos:
- Subestimar impacto do segredo no cliente ou da importacao sem validacao forte.

O que NAO alterar:
- Fluxo de release, build ou service worker nesta sprint.

### Tarefa 0.5 - Consolidar resumo operacional para a execucao

Descricao:
Transformar o levantamento em resumo curto para continuidade, incluindo comandos confirmados, arquivos principais, riscos e pontos de decisao.

Arquivos provaveis:
- `/docs/agent/CURRENT_STATE.md`
- `/docs/implementation/sprint-breakdown.md`

Criterio de aceite:
- O proximo agente consegue iniciar a Sprint 1 sem voltar a redescobrir o projeto.

Validacao:
- Revisao manual do resumo

Riscos:
- Resumo incompleto gerar retrabalho nas sprints seguintes.

O que NAO alterar:
- PRD, codigo do app e escopo do MVP.

## Criterios de aceite

- Arquitetura real mapeada.
- Comandos confirmados.
- Arquivos principais identificados.
- Dependencias e integracoes verificadas.
- Riscos iniciais registrados.
- Nenhuma funcionalidade implementada.
- Proximos passos confirmados.

## Riscos

- Concluir comandos sem executar o basico (`lint` e `build`).
- Nao localizar a superficie atual do Historico e das exportacoes.
- Ignorar dependencias mortas ou features brownfield fora do PRD.
- Nao registrar o risco do segredo de IA no cliente.

## O que NAO deve ser alterado

- Nenhuma funcionalidade do app.
- Nenhuma decisao de negocio do PRD.
- Nenhum contrato de dado em producao.
- Nenhuma dependencia sem necessidade de leitura confirmada.

A Sprint 0 nao deve implementar funcionalidades.

## Saida esperada da Sprint 0

Resumo operacional compativel com:

- `/docs/agent/CURRENT_STATE.md`
- `/docs/implementation/sprint-breakdown.md`
