# Sprint quebrada em tarefas menores

## Sprint de origem

- Nome da sprint original: `Sprint 0 - Preparacao e leitura do projeto`.
- Objetivo da sprint original: confirmar arquitetura real, comandos oficiais, arquivos sensiveis, riscos tecnicos e pontos de decisao pendentes antes de qualquer implementacao.
- Arquivo de origem: `/docs/implementation/SPRINT_00_PREPARACAO.md`.
- Resumo do escopo: ler documentacao e codebase para mapear stack, scripts, arquivos centrais, contratos, persistencia local, navegacao exposta, superficies fora do MVP, fluxo de IA, exportacao, importacao, PWA, riscos de seguranca e saida documental para continuidade.
- Documentos consultados: `/docs/agent/agent-operating-rules.md`; `/docs/implementation/PLANO_IMPLEMENTACAO.md`; `/docs/implementation/SPRINT_00_PREPARACAO.md`; `/docs/product/PRD_v1.1.md`; `/docs/product/PRD.md`; `/docs/evolution/DECISIONS.md`; `/docs/design/UI_UX_GUIDE_SECTION_16.md`.
- Documentos ausentes na leitura atual: `/docs/product/acceptance-criteria.md` nao encontrado; `/docs/design/UI_UX_GUIDE.md` nao encontrado.
- Pontos assumidos: `PRD_v1.1.md` aparenta ser a versao mais recente do PRD; `PRD.md` continua util como apoio; nao foi identificado conflito bloqueante para a Sprint 0 nos trechos lidos; `npm run lint` hoje executa `tsc --noEmit`; nao existe script de testes confirmado no `package.json`.
- Pontos que precisam ser confirmados na codebase: uso real de `GEMINI_API_KEY` no cliente; local exato das rotinas de exportacao/importacao/reset; estrategia efetiva de PWA/offline; existencia de componentes mortos fora do MVP; relacao entre `PRD.md` e `PRD_v1.1.md` caso apareca divergencia durante a execucao.

## Analise da Sprint

### Objetivo da sprint

Confirmar o terreno real do brownfield antes de qualquer alteracao funcional.

### Escopo identificado

- Ler documentos-base e registrar ausencias relevantes.
- Confirmar scripts, stack, dependencias e variaveis de ambiente.
- Mapear estrutura de `src/`, arquivos centrais e componentes principais.
- Mapear contratos de dominio, estado central e persistencia local.
- Confirmar navegacao real e superficies expostas ao usuario.
- Mapear IA, exportacao, importacao, reset local, PWA e riscos operacionais.
- Consolidar achados em artefato de continuidade para a Sprint 1.

### Fora do escopo

- Implementar funcionalidades novas.
- Refatorar `src/App.tsx` ou qualquer componente.
- Alterar dependencias, scripts, build, service worker ou variaveis de ambiente.
- Corrigir bugs encontrados durante o mapeamento.
- Tomar decisoes permanentes de arquitetura, seguranca ou negocio sem aprovacao humana.

### Dependencias entre partes

- A leitura documental vem antes da leitura da codebase.
- A confirmacao de scripts e stack vem antes das validacoes de `lint` e `build`.
- O mapeamento de estrutura vem antes do mapeamento de dominio e persistencia.
- O mapeamento de navegacao depende da identificacao dos componentes principais.
- O resumo operacional final depende de todas as leituras anteriores.
- `PONTO DE DECISAO`: se `PRD.md` e `PRD_v1.1.md` divergirem em regra de negocio, criterio de aceite, arquitetura ou seguranca, parar e aplicar a precedencia definida em `/docs/agent/agent-operating-rules.md`.

### Riscos principais

- Concluir a Sprint 0 com comandos nao confirmados.
- Registrar arquivos errados e orientar as sprints seguintes para caminhos falsos.
- Tratar superficie brownfield fora do MVP como requisito automatico.
- Subestimar risco de `GEMINI_API_KEY` no cliente.
- Ignorar rotinas de importacao/exportacao que possam afetar dados locais.
- `RISCO DE ESCOPO`: converter achados de investigacao em backlog obrigatorio sem respaldo do PRD ou de `DECISIONS.md`.

### Estrategia de quebra

A sprint foi dividida em leitura documental, confirmacao de ambiente, mapeamento estrutural, mapeamento de dados/persistencia, mapeamento de navegacao, mapeamento de IA e riscos operacionais, e consolidacao final. Cada tarefa gera um diff pequeno, reversivel e util de forma isolada.

### Limites para modelo economico

- Leitura documental, confirmacao de scripts, mapeamento estrutural e consolidacao documental cabem em modelo economico.
- A leitura sobre seguranca da IA tambem cabe em modelo economico se permanecer apenas em identificacao e registro de risco, sem propor arquitetura nova.
- Se surgir necessidade de decidir mitigacao definitiva para segredo da IA, snapshot historico ou estrategia de backup versionado, parar e escalar para decisao humana ou modelo mais forte.

# Tarefas da Sprint

## Tarefa 1 - Validar fontes documentais da Sprint 0

### Objetivo

Confirmar quais documentos orientam a Sprint 0, registrar ausencias e alinhar a hierarquia de referencia antes da leitura da codebase.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- Acesso ao repositorio local.
- Leitura obrigatoria de `/docs/agent/agent-operating-rules.md`.

### Arquivos provaveis

- Confirmado na leitura atual; reconfirmar na execucao: `/docs/agent/agent-operating-rules.md`.
- Confirmado na leitura atual; reconfirmar na execucao: `/docs/implementation/PLANO_IMPLEMENTACAO.md`.
- Confirmado na leitura atual; reconfirmar na execucao: `/docs/implementation/SPRINT_00_PREPARACAO.md`.
- Confirmado na leitura atual; reconfirmar na execucao: `/docs/product/PRD_v1.1.md`.
- Confirmado na leitura atual; reconfirmar na execucao: `/docs/product/PRD.md`.
- Confirmado na leitura atual; reconfirmar na execucao: `/docs/evolution/DECISIONS.md`.
- Confirmado na leitura atual; reconfirmar na execucao: `/docs/design/UI_UX_GUIDE_SECTION_16.md`.
- Provavel, a confirmar na codebase: `/docs/product/acceptance-criteria.md`.
- Provavel, a confirmar na codebase: `/docs/design/UI_UX_GUIDE.md`.

### Passos

1. Ler `/docs/agent/agent-operating-rules.md` e anotar a hierarquia de documentos e o protocolo de conflito.
2. Ler `/docs/implementation/PLANO_IMPLEMENTACAO.md` e `/docs/implementation/SPRINT_00_PREPARACAO.md`.
3. Ler o PRD mais recente e usar `PRD.md` apenas como apoio, registrando a ausencia de conflito bloqueante ou qualquer divergencia encontrada.
4. Registrar quais documentos auxiliares existem e quais nao existem no workspace.
5. Registrar quais regras ja estao fechadas em `DECISIONS.md` para evitar reabrir escopo na execucao da Sprint 0.

### Criterios de aceite

- A lista de documentos obrigatorios e auxiliares esta registrada.
- Ausencias documentais relevantes estao registradas sem inventar substitutos.
- A precedencia entre documentos esta clara para o proximo agente.
- Nenhuma decisao foi tomada por inferencia quando o documento correto estava disponivel.

### Como validar

- `rg --files docs`
- `Get-Content -Raw docs/agent/agent-operating-rules.md`
- `Get-Content -Raw docs/implementation/SPRINT_00_PREPARACAO.md`
- `Get-Content -Raw docs/implementation/PLANO_IMPLEMENTACAO.md`
- Validacao manual do registro documental gerado.

### Riscos

- Usar documento desatualizado como fonte principal.
- Nao registrar um conflito real entre PRDs.
- `RISCO DE ESCOPO`: transformar documento auxiliar em fonte principal sem justificativa.

### O que NAO alterar

- Nao editar PRD, plano, sprint original ou `DECISIONS.md`.
- Nao criar novos requisitos a partir da leitura documental.

### Reversibilidade

Se a tarefa gerar apenas notas operacionais, basta remover ou reverter o documento de resumo criado nesta tarefa.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 - Validar fontes documentais da Sprint 0.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00_PREPARACAO_TAREFAS.md`
- `/docs/implementation/SPRINT_00_PREPARACAO.md`
- `/docs/implementation/PLANO_IMPLEMENTACAO.md`
- `/docs/product/PRD_v1.1.md`
- `/docs/evolution/DECISIONS.md`

Objetivo:
Confirmar os documentos que governam a Sprint 0, registrar ausencias e apontar qualquer conflito relevante.

Escopo:
Ler a documentacao, registrar presencas e ausencias, e anotar a hierarquia de referencia para a sprint.

Fora do escopo:
Nao editar documentos-fonte, nao implementar nada, nao criar requisitos novos.

Arquivos provaveis:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/PLANO_IMPLEMENTACAO.md`
- `/docs/implementation/SPRINT_00_PREPARACAO.md`
- `/docs/product/PRD_v1.1.md`
- `/docs/evolution/DECISIONS.md`

Validacao:
- `rg --files docs`
- Revisao manual do resumo documental

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 2 - Confirmar stack, scripts e variaveis de ambiente

### Objetivo

Mapear stack, scripts oficiais e variaveis de ambiente usadas pelo projeto sem alterar configuracao.

### Tipo da tarefa

- configuracao

### Pre-requisitos

- Tarefa 1 concluida.
- Acesso aos arquivos-raiz do projeto.

### Arquivos provaveis

- Confirmado na leitura atual; reconfirmar na execucao: `/package.json`.
- Confirmado na leitura atual; reconfirmar na execucao: `/.env.example`.
- Confirmado na leitura atual; reconfirmar na execucao: `/tsconfig.json`.
- Confirmado na leitura atual; reconfirmar na execucao: `/vite.config.ts`.
- Confirmado na leitura atual; reconfirmar na execucao: `/vercel.json`.
- Confirmado na leitura atual; reconfirmar na execucao: `/index.html`.

### Passos

1. Ler `package.json` e listar scripts confirmados para `dev`, `build`, `preview`, `clean` e `lint`.
2. Confirmar que `npm run lint` hoje executa `tsc --noEmit`.
3. Ler `.env.example` e registrar as variaveis `GEMINI_API_KEY` e `APP_URL`.
4. Ler `vite.config.ts`, `tsconfig.json`, `vercel.json` e `index.html` para registrar stack e pontos operacionais sensiveis.
5. Registrar se existe ou nao script oficial de testes no `package.json`.

### Criterios de aceite

- Stack principal e scripts oficiais ficaram registrados sem ambiguidade.
- Variaveis de ambiente conhecidas ficaram documentadas com seu uso aparente.
- A ausencia de script de testes, se persistir, ficou registrada como fato e nao como erro corrigido.
- Nenhum arquivo de configuracao foi alterado.

### Como validar

- `Get-Content -Raw package.json`
- `Get-Content -Raw .env.example`
- `Get-Content -Raw vite.config.ts`
- `npm run lint`
- `npm run build`

### Riscos

- Assumir que existe teste automatizado sem confirmacao.
- Interpretar `GEMINI_API_KEY` como segura no cliente sem investigacao posterior.
- Declarar comando oficial sem conferir `package.json`.

### O que NAO alterar

- Dependencias.
- Scripts do `package.json`.
- Conteudo de `.env.example`.
- Configuracao de build, Vite, TypeScript, PWA ou deploy.

### Reversibilidade

Como a tarefa e apenas de leitura e registro, a reversao deve exigir no maximo remover notas documentais criadas nesta etapa.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 - Confirmar stack, scripts e variaveis de ambiente.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00_PREPARACAO_TAREFAS.md`
- `/package.json`
- `/.env.example`
- `/vite.config.ts`

Objetivo:
Confirmar a stack real do projeto, os scripts oficiais e as variaveis de ambiente relevantes.

Escopo:
Ler arquivos-raiz, registrar scripts confirmados, variaveis conhecidas e ausencia de script de testes se aplicavel.

Fora do escopo:
Nao alterar configuracao, nao instalar dependencias, nao criar scripts.

Arquivos provaveis:
- `/package.json`
- `/.env.example`
- `/tsconfig.json`
- `/vite.config.ts`
- `/vercel.json`

Validacao:
- `npm run lint`
- `npm run build`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 3 - Mapear estrutura de codigo e arquivos centrais

### Objetivo

Identificar a estrutura real de `src/` e os pontos centrais do brownfield que serao tocados pelas sprints seguintes.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- Tarefa 2 concluida.
- Scripts e stack ja confirmados.

### Arquivos provaveis

- Confirmado na leitura atual; reconfirmar na execucao: `/src/App.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/types.ts`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/hooks/useLocalStorage.ts`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/services/geminiService.ts`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/Dashboard.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/HistoryCalendar.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/Analytics.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/UserProfileForm.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/WaterTracker.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/ActivityTracker.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/WeeklyPlanner.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/WorkoutPlanner.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/WorkoutTracker.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/DietGenerator.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/WorkoutGenerator.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/CoachInsights.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/BarcodeScanner.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/RecipeSuggestions.tsx`.

### Passos

1. Executar listagem de arquivos em `src/` e registrar os caminhos existentes.
2. Identificar o arquivo de entrada, o arquivo de composicao principal e os componentes de primeiro nivel.
3. Classificar componentes centrais do MVP e componentes potencialmente fora do MVP.
4. Registrar componentes ligados a IA, historico, plano, treino, agua e perfil.
5. Anotar quais arquivos parecem concentrar maior risco de regressao para as sprints seguintes.

### Criterios de aceite

- A estrutura real de `src/` esta registrada com caminhos concretos.
- Os arquivos centrais do fluxo principal estao identificados.
- Componentes potencialmente fora do MVP ficaram destacados como risco de escopo, sem serem removidos.
- Nenhum arquivo de codigo foi alterado.

### Como validar

- `rg --files src`
- `Get-Content -Raw src/App.tsx`
- `Get-Content -Raw src/types.ts`
- Validacao manual da lista de arquivos mapeados.

### Riscos

- Esquecer componente relevante para Historico, Progresso ou IA.
- Marcar componente como fora do MVP sem cruzar com PRD e `DECISIONS.md`.
- `RISCO DE ESCOPO`: tratar um componente experimental como demanda de implementacao imediata.

### O que NAO alterar

- Nenhum arquivo em `src/`.
- Nenhum import, export, rota, layout ou estado.

### Reversibilidade

Como a tarefa e somente de mapeamento, a reversao se limita a remover o resumo gerado se ele estiver incorreto.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 - Mapear estrutura de codigo e arquivos centrais.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00_PREPARACAO_TAREFAS.md`
- `/src/App.tsx`
- `/src/types.ts`
- `/src/hooks/useLocalStorage.ts`

Objetivo:
Mapear a estrutura real de `src/` e identificar arquivos centrais e superficies potencialmente fora do MVP.

Escopo:
Listar arquivos, classificar componentes principais e registrar pontos de maior risco de regressao.

Fora do escopo:
Nao editar arquivos de codigo, nao remover componentes, nao mudar imports.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/types.ts`
- `/src/hooks/useLocalStorage.ts`
- `/src/components/*.tsx`

Validacao:
- `rg --files src`
- Revisao manual do mapa de arquivos

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 4 - Mapear dominio, estado e persistencia local

### Objetivo

Entender como os dados do produto sao modelados, armazenados e atualizados no brownfield atual.

### Tipo da tarefa

- modelo/tipos

### Pre-requisitos

- Tarefa 3 concluida.
- Arquivos centrais ja localizados.

### Arquivos provaveis

- Confirmado na leitura atual; reconfirmar na execucao: `/src/types.ts`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/App.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/hooks/useLocalStorage.ts`.
- Provavel, a confirmar na codebase: arquivos auxiliares de dominio dentro de `/src/components/*.tsx`.

### Passos

1. Ler `src/types.ts` e registrar entidades, tipos principais e contratos aparentes.
2. Ler `src/App.tsx` para identificar estado principal, fluxo do dia atual e pontos de rollover diario.
3. Ler `src/hooks/useLocalStorage.ts` para entender como a persistencia local e feita.
4. Registrar onde perfil, metas, refeicoes, agua, treino, historico e plano parecem ser salvos e recuperados.
5. Registrar hipoteses explicitamente quando a regra depender de leitura adicional durante a execucao.

### Criterios de aceite

- Entidades principais do dominio estao listadas.
- O ponto central de estado esta identificado.
- O mecanismo de persistencia local esta descrito com base em leitura real.
- Hipoteses nao confirmadas ficaram marcadas como `a confirmar na codebase`.

### Como validar

- `Get-Content -Raw src/types.ts`
- `Get-Content -Raw src/App.tsx`
- `Get-Content -Raw src/hooks/useLocalStorage.ts`
- Validacao manual do mapa de dados produzido.

### Riscos

- Confundir estado de UI com estado de dominio.
- Inferir schema de backup sem encontrar a implementacao real.
- Nao registrar incertezas sobre rollover ou historico.

### O que NAO alterar

- Tipos, contratos, hooks de persistencia ou estado central.
- Calculos de negocio.

### Reversibilidade

A reversao exige apenas remover o registro documental da analise caso ele precise ser refeito.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 - Mapear dominio, estado e persistencia local.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00_PREPARACAO_TAREFAS.md`
- `/src/types.ts`
- `/src/App.tsx`
- `/src/hooks/useLocalStorage.ts`

Objetivo:
Mapear entidades, estado principal e persistencia local sem alterar comportamento.

Escopo:
Documentar contratos de dados, pontos de armazenamento local e hipoteses que ainda precisem de confirmacao.

Fora do escopo:
Nao editar tipos, nao mudar schema, nao mexer em `localStorage`.

Arquivos provaveis:
- `/src/types.ts`
- `/src/App.tsx`
- `/src/hooks/useLocalStorage.ts`

Validacao:
- Revisao manual dos contratos lidos
- Confirmacao de que nenhuma regra foi inferida sem evidencia

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 5 - Mapear navegacao real e superficies expostas ao usuario

### Objetivo

Confirmar como o usuario navega hoje pelo app, quais telas sao de primeiro nivel e quais superficies do brownfield podem estar fora do MVP.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- Tarefas 3 e 4 concluidas.
- `npm run dev` confirmado como comando oficial.

### Arquivos provaveis

- Confirmado na leitura atual; reconfirmar na execucao: `/src/App.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/Dashboard.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/HistoryCalendar.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/Analytics.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/WeeklyPlanner.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/WorkoutPlanner.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/CoachInsights.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/RecipeSuggestions.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/BarcodeScanner.tsx`.

### Passos

1. Ler `src/App.tsx` e identificar a navegacao principal e as subtelas controladas ali.
2. Confirmar se Historico, Progresso, Perfil, Plano e Treino estao expostos de forma clara.
3. Registrar superficies presentes no brownfield que nao aparecem no MVP ou ja sairam do escopo, como `CoachInsights`.
4. Executar o app localmente apenas para navegacao manual, sem corrigir nada encontrado.
5. Registrar evidencias do que esta visivel, escondido ou acoplado ao fluxo principal.

### Criterios de aceite

- A navegacao principal esta descrita de forma objetiva.
- Telas de primeiro nivel e subtelas sensiveis ficaram identificadas.
- Superficies possivelmente fora do MVP estao destacadas sem serem removidas.
- O comportamento observado nao foi alterado.

### Como validar

- `npm run dev`
- Navegacao manual pelo app em largura mobile e desktop
- `Get-Content -Raw src/App.tsx`

### Riscos

- Validar navegacao apenas por leitura e perder comportamento condicional.
- Confundir componente importado com tela realmente exposta.
- `RISCO DE ESCOPO`: tentar ocultar telas fora do MVP nesta sprint de investigacao.

### O que NAO alterar

- Navegacao.
- Layout.
- Rotas internas.
- Componentes visuais.

### Reversibilidade

Se houver somente registro documental, a reversao consiste em corrigir ou remover as anotacoes feitas.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 - Mapear navegacao real e superficies expostas ao usuario.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00_PREPARACAO_TAREFAS.md`
- `/src/App.tsx`
- `/src/components/Dashboard.tsx`
- `/src/components/HistoryCalendar.tsx`

Objetivo:
Confirmar a navegacao real do app e registrar quais superficies estao expostas, escondidas ou fora do MVP.

Escopo:
Ler a composicao principal, navegar manualmente no app e documentar o que esta visivel ao usuario.

Fora do escopo:
Nao alterar UI, nao esconder telas, nao refatorar navegacao.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/components/Dashboard.tsx`
- `/src/components/HistoryCalendar.tsx`
- `/src/components/Analytics.tsx`

Validacao:
- `npm run dev`
- Validacao manual da navegacao

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 6 - Mapear IA, exportacao, importacao, reset e PWA

### Objetivo

Localizar os pontos tecnicos mais sensiveis da Sprint 0 e registrar riscos sem implementar mitigacoes.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefas 2, 3, 4 e 5 concluidas.
- Comandos de `build` e `dev` confirmados.

### Arquivos provaveis

- Confirmado na leitura atual; reconfirmar na execucao: `/src/services/geminiService.ts`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/UserProfileForm.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/HistoryCalendar.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/DietGenerator.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/src/components/WorkoutGenerator.tsx`.
- Confirmado na leitura atual; reconfirmar na execucao: `/vite.config.ts`.
- Confirmado na leitura atual; reconfirmar na execucao: `/index.html`.
- Confirmado na leitura atual; reconfirmar na execucao: `/.env.example`.
- Provavel, a confirmar na codebase: outros pontos de importacao/exportacao em `/src/components/*.tsx`.

### Passos

1. Ler `src/services/geminiService.ts` e registrar como a IA e chamada hoje.
2. Localizar referencias de importacao, exportacao, backup, reset e arquivos aceitos para importacao.
3. Confirmar onde `GEMINI_API_KEY` e `APP_URL` aparecem na aplicacao e documentar o risco operacional observado.
4. Ler `vite.config.ts` e `index.html` para registrar o contorno atual de PWA/offline.
5. Se houver risco de seguranca, registrar como risco e `PONTO DE DECISAO`, sem propor implementacao fora do escopo da Sprint 0.

### Criterios de aceite

- Os pontos de entrada da IA estao localizados.
- Os fluxos de exportacao/importacao/reset estao localizados ou registrados como `a confirmar na codebase`.
- O risco de segredo no cliente esta documentado de forma objetiva.
- O estado atual de PWA/offline esta resumido sem alterar build ou cache.

### Como validar

- `Get-Content -Raw src/services/geminiService.ts`
- `rg -n "GEMINI_API_KEY|APP_URL|export|import|reset|backup|service worker|pwa" src vite.config.ts index.html`
- `npm run build`
- Validacao manual do resumo de riscos

### Riscos

- Interpretar um uso de IA como seguro sem revisar o caminho completo.
- Nao localizar fluxo de importacao por ele estar distribuido em componentes.
- `PONTO DE DECISAO`: qualquer proposta de proxy, backend, snapshot historico ou backup versionado nao deve ser executada nesta sprint.
- `RISCO DE ESCOPO`: transformar mapeamento de risco em refatoracao imediata.

### O que NAO alterar

- `src/services/geminiService.ts`.
- Configuracao de PWA, build ou deploy.
- Fluxos de importacao/exportacao/reset.
- Variaveis de ambiente.

### Reversibilidade

A tarefa e totalmente reversivel porque deve gerar apenas documentacao de risco e localizacao tecnica.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 - Mapear IA, exportacao, importacao, reset e PWA.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00_PREPARACAO_TAREFAS.md`
- `/src/services/geminiService.ts`
- `/vite.config.ts`
- `/.env.example`

Objetivo:
Localizar os pontos de IA, importacao/exportacao, reset e PWA, registrando riscos sem implementar mitigacoes.

Escopo:
Ler arquivos sensiveis, localizar referencias cruzadas e documentar riscos e pontos de decisao.

Fora do escopo:
Nao alterar seguranca, nao criar proxy, nao mudar service worker, nao refatorar fluxo de dados.

Arquivos provaveis:
- `/src/services/geminiService.ts`
- `/src/components/*.tsx`
- `/vite.config.ts`
- `/index.html`
- `/.env.example`

Validacao:
- `npm run build`
- `rg -n "GEMINI_API_KEY|APP_URL|export|import|reset|backup" src vite.config.ts index.html`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 7 - Consolidar resumo operacional para continuidade

### Objetivo

Transformar os achados das tarefas anteriores em documentacao curta, reutilizavel e segura para iniciar a Sprint 1.

### Tipo da tarefa

- documentacao

### Pre-requisitos

- Tarefas 1 a 6 concluidas.
- Todos os riscos e hipoteses relevantes ja registrados.

### Arquivos provaveis

- Confirmado na leitura atual; reconfirmar na execucao: `/docs/agent/CURRENT_STATE.md`.
- Confirmado na leitura atual; reconfirmar na execucao: `/docs/implementation/SPRINT_00_PREPARACAO_TAREFAS.md`.
- Provavel, a confirmar na codebase: `/docs/agent/HANDOFF.md`.
- Provavel, a confirmar na codebase: `/docs/implementation/sprint-breakdown.md`.
- Provavel, a confirmar na codebase: `/docs/evolution/CHANGELOG.md`.

### Passos

1. Consolidar comandos confirmados, arquivos centrais, riscos e pontos de decisao da Sprint 0.
2. Atualizar `/docs/agent/CURRENT_STATE.md` com o estado real encontrado, se o arquivo estiver em uso pelo projeto.
3. Registrar limitacoes e validacoes nao executadas com motivo.
4. Se houver troca de sessao ou modelo antes da Sprint 1, atualizar `/docs/agent/HANDOFF.md` conforme as regras operacionais.
5. Revisar o diff final para garantir que nenhuma alteracao saiu do escopo documental.

### Criterios de aceite

- Existe um resumo operacional suficiente para iniciar a Sprint 1 sem redescobrir a codebase.
- `CURRENT_STATE.md` reflete os achados relevantes da Sprint 0, se aplicavel.
- Limitacoes, riscos e pontos de decisao pendentes estao explicitados.
- Nenhum arquivo de codigo foi alterado nesta etapa.

### Como validar

- Revisao manual do resumo final
- `git diff -- docs/agent docs/implementation`
- Conferencia manual de que o diff ficou restrito a documentacao

### Riscos

- Resumo incompleto gerar retrabalho nas proximas sprints.
- Omitir validacoes nao executadas e induzir falsa confianca.
- Atualizar `CHANGELOG` como se houvesse implementacao funcional quando houve apenas documentacao.

### O que NAO alterar

- Arquivos de codigo.
- PRD, plano e sprint original.
- `DECISIONS.md`, a menos que haja decisao humana nova.

### Reversibilidade

Se o resumo estiver incorreto, a reversao se limita aos arquivos documentais alterados nesta etapa.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 7 - Consolidar resumo operacional para continuidade.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00_PREPARACAO_TAREFAS.md`
- `/docs/agent/CURRENT_STATE.md`
- os registros produzidos nas Tarefas 1 a 6

Objetivo:
Consolidar os achados da Sprint 0 em um resumo operacional curto e reutilizavel para a Sprint 1.

Escopo:
Atualizar a documentacao de continuidade com comandos confirmados, arquivos centrais, riscos, validacoes e pendencias.

Fora do escopo:
Nao alterar codigo, nao fingir validacao nao executada, nao registrar implementacao que nao existiu.

Arquivos provaveis:
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`
- `/docs/evolution/CHANGELOG.md`

Validacao:
- `git diff -- docs/agent docs/implementation`
- Revisao manual do resumo final

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

# Ordem recomendada de execucao

| Ordem | Tarefa | Depende de | Pode executar isolada? | Checkpoint recomendado |
|---|---|---|---|---|
| 1 | Tarefa 1 - Validar fontes documentais da Sprint 0 | Nenhuma | Sim | Apos registrar documentos e ausencias |
| 2 | Tarefa 2 - Confirmar stack, scripts e variaveis de ambiente | Tarefa 1 | Sim | Apos `npm run lint` e `npm run build` |
| 3 | Tarefa 3 - Mapear estrutura de codigo e arquivos centrais | Tarefa 2 | Sim | Apos fechar o mapa de `src/` |
| 4 | Tarefa 4 - Mapear dominio, estado e persistencia local | Tarefa 3 | Nao | Apos fechar o mapa de entidades e persistencia |
| 5 | Tarefa 5 - Mapear navegacao real e superficies expostas ao usuario | Tarefas 3 e 4 | Nao | Apos navegacao manual validada |
| 6 | Tarefa 6 - Mapear IA, exportacao, importacao, reset e PWA | Tarefas 2, 3, 4 e 5 | Nao | Apos build e registro de riscos |
| 7 | Tarefa 7 - Consolidar resumo operacional para continuidade | Tarefas 1 a 6 | Nao | Apos revisao final do diff documental |

# Checklist final da sprint

- [ ] lint executado;
- [ ] typecheck executado;
- [ ] build executado;
- [ ] testes executados;
- [ ] fluxo manual validado;
- [ ] responsividade validada, se houver UI;
- [ ] regressoes verificadas;
- [ ] arquivos alterados revisados;
- [ ] escopo conferido contra a sprint original;
- [ ] nenhuma funcionalidade fora do escopo adicionada;
- [ ] nenhuma mudanca arquitetural feita sem autorizacao;
- [ ] limitacoes registradas;
- [ ] riscos residuais registrados.

# Tarefas que NAO devem ir para modelo economico

`Nenhuma tarefa identificada como obrigatoria para modelo mais forte, desde que a Sprint 0 e a leitura da codebase estejam concluidas.`

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir a Tarefa 7 ou ao encontrar risco novo que altere o entendimento do projeto | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto alem do registro operacional desta sprint | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando houver decisao tecnica ou de negocio tomada por humano durante a investigacao | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver qualquer alteracao fora do escopo ou descoberta que precise ser registrada como excecao | Sim, se houver mudanca fora do escopo |

# Sprint original

O agente deve procurar automaticamente a sprint de origem em:

```text
/docs/implementation/SPRINT_*.md
```

Se o numero da sprint for conhecido, procure primeiro pelo padrao especifico:

```text
/docs/implementation/SPRINT_XX_*.md
```

Para esta quebra, a sprint de origem ja esta definida como:

- `/docs/implementation/SPRINT_00_PREPARACAO.md`

Se encontrar apenas um arquivo compativel, use esse arquivo como fonte principal.

Se encontrar mais de um arquivo compativel, liste os arquivos encontrados e solicite confirmacao de qual sprint deve ser quebrada.

Se esse arquivo deixar de existir, o agente deve parar e solicitar o arquivo correto ou o conteudo original da sprint.
