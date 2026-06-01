# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: `Sprint 7 - Treino, execucao, cardio e passos`
- objetivo da sprint original: alinhar o pilar fisico do MVP para que treino executado, cardio e passos reflitam corretamente no dia atual e no historico, sem inventar formula energetica nova.
- arquivo de origem: `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS.md`
- resumo do escopo: fechar o fluxo de treino salvo versus treino executado, validar passos e cardio com campos minimos obrigatorios, refletir atividade fisica no Dashboard e no Historico, e manter persistencia local coerente apos reload e rollover diario.
- documentos consultados: `/docs/agent/agent-operating-rules.md`; `/docs/implementation/PLANO_IMPLEMENTACAO.md`; `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS.md`; `/docs/product/PRD_v1.1.md`; `/docs/product/PRD.md`; `/docs/evolution/DECISIONS.md`; `/docs/design/UI_UX_GUIDE_SECTION_16.md`.
- documentos ausentes na leitura atual: `/docs/product/acceptance-criteria.md` nao encontrado no workspace; `/docs/design/UI_UX_GUIDE.md` nao encontrado no workspace.
- ponto assumido: `PRD_v1.1.md` continua sendo a referencia principal mais atual para a sprint.
- ponto assumido: `npm run lint`, `npm run build` e `npm run test` estao confirmados no `package.json`.
- ponto assumido: a codebase ja possui separacao conceitual entre `plannedWorkouts` e `workoutLogs`, mas ainda ha acoplamentos de UI e persistencia a revisar.
- ponto assumido: a codebase atual calcula kcal de passos em `ActivityTracker` e `Dashboard`, e calcula kcal de cardio com regra local por intensidade, o que precisa ser confrontado com o PRD antes de qualquer ajuste funcional.
- ponto assumido: nao foi encontrada, na leitura atual, uma tabela MET ou utilitario dedicado que comprove regra oficial de estimativa automatica de cardio.
- ponto assumido: o fluxo de criacao de treino salvo fora da IA/manual import nao foi confirmado na leitura atual; o unico ponto de salvamento lido foi `WorkoutGenerator`, o que deve ser tratado com cuidado para nao inventar um cadastro novo.
- ponto que precisa ser confirmado na codebase: se a exclusao de um treino salvo deve limpar referencias em `plannedWorkouts` ou apenas impedir uso futuro sem apagar historico ja executado.
- ponto que precisa ser confirmado na codebase: se existe alguma base MET aprovada fora dos arquivos lidos que permita estimativa automatica de cardio sem inventar regra nova.
- ponto que precisa ser confirmado na codebase: se ha algum fluxo manual de cadastro de treino fora de `WorkoutGenerator` que nao apareceu na leitura atual.
- ponto que precisa ser confirmado na codebase: como o export atual deve se comportar quando cardio nao tiver kcal automatica e passos permanecerem apenas como indicador de volume.

## Analise da Sprint

### Objetivo da sprint

Fechar o fluxo de atividade fisica do MVP sem confundir plano com execucao real e sem manter formulas locais que conflitam com o PRD.

### Escopo identificado

- Confirmar os pontos reais do codigo que salvam, executam, exibem e persistem treino, cardio e passos.
- Garantir separacao clara entre treino salvo, treino planejado e treino executado.
- Validar passos como inteiro maior ou igual a zero.
- Validar cardio com tipo, duracao maior que zero e intensidade, mantendo velocidade como opcional.
- Centralizar a regra oficial de exibicao/estimativa de atividade fisica para nao duplicar formula em componente.
- Refletir atividade fisica no Dashboard, no Historico e na exportacao minima sem inventar kcal.
- Garantir persistencia local apos reload e rollover diario.

### Fora do escopo

- Geracao ou importacao de treino por IA.
- Criacao de uma agenda semanal nova ou refatoracao ampla do `WorkoutPlanner`.
- Inventar formula nova para kcal de passos, cardio ou treino de forca.
- Criar backend, sync, autenticacao ou refatoracao arquitetural ampla.
- Reescrever exportacao, PWA, backup ou importacao fora do necessario para nao quebrar a leitura de atividade fisica.
- Criar um cadastro manual novo de treino se esse fluxo nao existir hoje e nao estiver confirmado por documentacao ou codebase.

### Dependencias entre partes

- A leitura do fluxo real vem antes de qualquer alteracao, porque a sprint encosta em `App.tsx`, `Dashboard.tsx`, `ActivityTracker.tsx`, `WorkoutTracker.tsx` e `HistoryCalendar.tsx`.
- A confirmacao da regra oficial de gasto energetico vem antes de mexer em utilitarios ou resumo diario.
- A centralizacao da regra de atividade fisica vem antes dos ajustes de UI para evitar formula duplicada em componentes.
- O ajuste dos handlers centrais em `App.tsx` vem antes da validacao final de persistencia e historico.
- O Dashboard e o Historico devem ser ajustados somente depois de passos, cardio e execucao de treino estarem persistindo de forma consistente.
- `PONTO DE DECISAO`: se nao existir base MET aprovada ou criterio humano para estimativa automatica de cardio, a implementacao deve seguir o caminho seguro de nao inventar kcal automatica e registrar explicitamente a limitacao.
- `PONTO DE DECISAO`: se o produto exigir cadastro manual de treino nesta sprint, essa expectativa precisa ser confirmada antes da execucao, porque a leitura atual nao mostrou esse fluxo fora da IA.

### Riscos principais

- Regressao em `App.tsx`, que concentra estado, persistencia e navegacao.
- Manter formulas locais de kcal para passos e cardio em desacordo com o PRD e `DECISIONS.md`.
- Quebrar historico/exportacao ao alterar o shape ou a interpretacao dos registros fisicos.
- Deixar referencias orfas no plano semanal ao excluir treinos salvos.
- `RISCO DE ESCOPO`: transformar a sprint em refatoracao ampla do pilar de treino ou em criacao de cadastro manual novo sem confirmacao.
- `RISCO DE ESCOPO`: tocar `WorkoutGenerator`, `WorkoutPlanner`, exportacao completa ou metas caloricas alem do necessario para alinhar atividade fisica.

### Estrategia de quebra

A sprint foi dividida em investigacao guiada, decisao segura sobre regra energetica, centralizacao de logica, ajuste de estado/persistencia, ajustes separados de treino, passos e cardio, alinhamento de leitura no Dashboard e no Historico, e uma etapa final de testes e documentacao. O objetivo e manter cada diff pequeno, reversivel e revisavel por um modelo economico, escalando apenas quando surgir ambiguidade de regra ou necessidade de mexer amplamente em `App.tsx`.

### Limites para modelo economico

- Cabem em modelo economico: mapeamento do fluxo atual, validacoes de formulario, ajustes locais de `WorkoutTracker`, `ActivityTracker`, `Dashboard`, `HistoryCalendar` e documentacao operacional.
- Modelo intermediario recomendado: centralizacao da regra de atividade fisica, ajuste de handlers em `App.tsx`, limpeza segura de referencias orfas e validacao de persistencia apos reload/rollover.
- Modelo forte recomendado: qualquer tentativa de definir tabela MET do zero, reestruturar amplamente `App.tsx`, alterar schema de exportacao de forma abrangente ou implementar cadastro manual novo de treino sem base ja existente.

---

# Tarefas da Sprint

## Tarefa 1 - Mapear o fluxo atual de treino, cardio, passos e historico

### Objetivo

Confirmar como treino salvo, treino executado, passos, cardio, Dashboard, Historico e exportacao se conectam hoje, antes de editar qualquer regra.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- Leitura obrigatoria de `/docs/agent/agent-operating-rules.md`.
- Leitura de `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS.md`.

### Arquivos provaveis

- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/App.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/WorkoutTracker.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/ActivityTracker.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/Dashboard.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/HistoryCalendar.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/WorkoutPlanner.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/types.ts`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/utils/rollover.ts`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/utils/stateMigration.ts`

### Passos

1. Ler os componentes e utilitarios centrais da sprint e registrar onde cada tipo de dado fisico entra, e salvo, e lido.
2. Confirmar onde existe diferenca real entre `workouts`, `plannedWorkouts` e `workoutLogs`.
3. Confirmar onde o app ainda calcula kcal de passos e cardio.
4. Registrar o impacto atual da exclusao de treino salvo sobre plano semanal, logs executados e leitura historica.
5. Registrar qualquer lacuna encontrada como hipoteses ou `PONTO DE DECISAO`, sem implementar nada nesta tarefa.

### Criterios de aceite

- O mapa do fluxo atual de treino, cardio, passos e historico foi registrado.
- Foi identificado onde a formula de kcal esta duplicada ou descentralizada.
- Foi identificado se a exclusao de treino gera ou nao referencia orfa.
- Nenhum arquivo de codigo foi alterado sem justificativa direta desta tarefa.

### Como validar

- `rg -n "workoutLogs|plannedWorkouts|cardioLogs|steps|calculateStepCalories|estimateCardioCalories" src`
- `Get-Content -Raw src/App.tsx`
- `Get-Content -Raw src/components/WorkoutTracker.tsx`
- `Get-Content -Raw src/components/ActivityTracker.tsx`
- Validacao manual do mapa produzido

### Riscos

- Deixar de mapear um ponto de leitura importante no Historico ou no export.
- Assumir comportamento de exclusao sem conferir o planner.

### O que NAO alterar

- Nao mudar regra de negocio.
- Nao alterar UI.
- Nao alterar persistencia local.

### Reversibilidade

Totalmente reversivel, pois deve gerar apenas anotacoes operacionais ou documentacao curta.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 - Mapear o fluxo atual de treino, cardio, passos e historico.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS_TAREFAS.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS.md`
- `/src/App.tsx`
- `/src/components/WorkoutTracker.tsx`
- `/src/components/ActivityTracker.tsx`
- `/src/components/Dashboard.tsx`
- `/src/components/HistoryCalendar.tsx`

Objetivo:
Mapear os pontos reais de leitura, escrita e exibicao de treino, cardio, passos e historico.

Escopo:
Ler os arquivos, registrar o fluxo atual e apontar lacunas ou referencias orfas sem alterar comportamento.

Fora do escopo:
Nao implementar nada, nao refatorar componentes, nao mudar formulas.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/components/WorkoutTracker.tsx`
- `/src/components/ActivityTracker.tsx`
- `/src/components/Dashboard.tsx`
- `/src/components/HistoryCalendar.tsx`
- `/src/components/WorkoutPlanner.tsx`

Validacao:
- `rg -n "workoutLogs|plannedWorkouts|cardioLogs|steps" src`
- revisao manual do mapa registrado

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 2 - Confirmar a regra oficial de gasto energetico e abrir os pontos de decisao

### Objetivo

Fechar, antes da implementacao, o caminho seguro para passos e cardio: passos sem kcal obrigatoria no MVP e cardio com kcal automatica apenas se houver base MET documentada suficiente.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- Tarefa 1 concluida.
- Leitura de `/docs/product/PRD_v1.1.md` e `/docs/evolution/DECISIONS.md`.

### Arquivos provaveis

- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/docs/product/PRD_v1.1.md`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/docs/evolution/DECISIONS.md`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/ActivityTracker.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/Dashboard.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/HistoryCalendar.tsx`
- Arquivo provavel: `/src/utils/activity.ts` - a confirmar na codebase

### Passos

1. Reunir os trechos do PRD e de `DECISIONS.md` que falam de passos, cardio, MET e proibicao de formula nova.
2. Confirmar na codebase onde a regra atual conflita com a documentacao.
3. Registrar explicitamente o caminho de implementacao permitido para a sprint.
4. Se nao houver base MET aprovada, marcar `PONTO DE DECISAO` e travar qualquer tentativa de criar tabela nova por inferencia.
5. Registrar como o Dashboard e o Historico devem continuar visiveis mesmo sem kcal automatica para passos.

### Criterios de aceite

- O caminho permitido para passos e cardio ficou claro antes da implementacao.
- Existe registro explicito do conflito entre regra documental e calculos locais atuais, se ele existir.
- Foi aberto `PONTO DE DECISAO` caso a base MET nao esteja documentada o suficiente.

### Como validar

- `rg -n "MET|passos|cardio|kcal automatica|gasto energetico" docs/product/PRD_v1.1.md docs/evolution/DECISIONS.md`
- `rg -n "calculateStepCalories|estimateCardioCalories|cardio.*calories|steps.*kcal" src`
- Revisao manual do resumo de decisao

### Riscos

- Um modelo economico tentar "completar" a regra MET por conta propria.
- Manter a UI dependente de kcal de passos quando o PRD so exige visibilidade de volume.

### O que NAO alterar

- Nao inventar tabela MET.
- Nao criar nova formula de passos.
- Nao alterar metas caloricas de perfil.

### Reversibilidade

Totalmente reversivel, pois o resultado principal e registrar o caminho aprovado ou o bloqueio de decisao.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 - Confirmar a regra oficial de gasto energetico e abrir os pontos de decisao.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS_TAREFAS.md`
- `/docs/product/PRD_v1.1.md`
- `/docs/evolution/DECISIONS.md`
- `/src/components/ActivityTracker.tsx`
- `/src/components/Dashboard.tsx`

Objetivo:
Definir o caminho seguro para passos e cardio sem inventar regra energetica.

Escopo:
Cruzar documentacao e codebase, registrar o que pode ser implementado e abrir `PONTO DE DECISAO` se faltar base MET aprovada.

Fora do escopo:
Nao criar tabela nova, nao alterar codigo funcional alem do estritamente necessario para registrar ou preparar a decisao.

Arquivos provaveis:
- `/docs/product/PRD_v1.1.md`
- `/docs/evolution/DECISIONS.md`
- `/src/components/ActivityTracker.tsx`
- `/src/components/Dashboard.tsx`

Validacao:
- `rg -n "MET|passos|cardio|kcal automatica" docs/product/PRD_v1.1.md docs/evolution/DECISIONS.md`
- `rg -n "calculateStepCalories|estimateCardioCalories" src`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 3 - Centralizar a regra de atividade fisica em utilitario dedicado

### Objetivo

Remover formula e interpretacao de atividade fisica de dentro dos componentes, centralizando a regra aprovada em um utilitario unico e pequeno.

### Tipo da tarefa

- logica de negocio

### Pre-requisitos

- Tarefa 2 concluida.
- Regra permitida para passos e cardio definida ou bloqueada por `PONTO DE DECISAO`.

### Arquivos provaveis

- Arquivo provavel: `/src/utils/activity.ts` - a confirmar na codebase
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/ActivityTracker.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/Dashboard.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/HistoryCalendar.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/types.ts`

### Passos

1. Criar ou reutilizar um modulo utilitario para regras de atividade fisica.
2. Mover para esse modulo qualquer helper de calculo, normalizacao ou apresentacao que hoje esteja embutido em componente.
3. Garantir que o utilitario nao gere kcal para passos no MVP se isso nao estiver documentado.
4. Garantir que cardio so receba estimativa automatica quando a regra aprovada permitir; caso contrario, o utilitario deve devolver estado seguro sem inventar numero.
5. Atualizar imports dos componentes afetados sem ampliar escopo para outras areas.

### Criterios de aceite

- `ActivityTracker` e `Dashboard` deixam de depender de formula inline duplicada.
- Existe um unico ponto claro para a regra de atividade fisica.
- O utilitario nao inventa kcal fora da regra aprovada.
- O diff fica restrito a atividade fisica e arquivos diretamente consumidores.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- `rg -n "calculateStepCalories|estimateCardioCalories" src`

### Riscos

- Alterar simultaneamente comportamento e apresentacao sem perceber.
- Introduzir dependencia circular entre componente e utilitario.
- `PONTO DE DECISAO`: se a implementacao exigir desenhar uma tabela MET do zero, parar e escalar.

### O que NAO alterar

- Nao reestruturar `App.tsx` alem do necessario para integrar o utilitario.
- Nao alterar regras de refeicao, agua, metas ou exportacao ampla.

### Reversibilidade

Reversivel por remover o utilitario novo e recolocar a logica anterior, desde que o diff fique pequeno e localizado.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 - Centralizar a regra de atividade fisica em utilitario dedicado.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS_TAREFAS.md`
- `/src/components/ActivityTracker.tsx`
- `/src/components/Dashboard.tsx`
- `/src/types.ts`

Objetivo:
Centralizar a regra de passos e cardio em um utilitario unico, sem manter formulas inline em componentes.

Escopo:
Criar/reutilizar utilitario, mover helpers e atualizar imports locais.

Fora do escopo:
Nao inventar MET, nao refatorar o app inteiro, nao tocar refeicoes, agua ou IA.

Arquivos provaveis:
- `/src/utils/activity.ts`
- `/src/components/ActivityTracker.tsx`
- `/src/components/Dashboard.tsx`
- `/src/types.ts`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 4 - Ajustar handlers centrais de treino salvo, execucao e exclusao

### Objetivo

Garantir que `workouts`, `plannedWorkouts` e `workoutLogs` continuem separados, persistentes e coerentes quando o usuario executa ou exclui um treino salvo.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefas 1 a 3 concluidas.
- Fluxo atual de exclusao e execucao mapeado.

### Arquivos provaveis

- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/App.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/types.ts`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/WorkoutPlanner.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/utils/rollover.ts`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/utils/stateMigration.ts`

### Passos

1. Revisar os handlers centrais de salvar treino, logar execucao e excluir treino salvo.
2. Garantir que log executado continue existindo como entidade propria, mesmo que o treino salvo seja removido depois.
3. Tratar o minimo necessario para referencias orfas em `plannedWorkouts`, se a exclusao de treino salvo hoje deixar o plano inconsistente.
4. Confirmar que o rollover diario e a migracao local nao descartam os dados fisicos apos reload.
5. Evitar qualquer refatoracao ampla de `App.tsx`; se o diff crescer demais, quebrar em subtarefa e escalar.

### Criterios de aceite

- Treino salvo, treino planejado e treino executado continuam entidades separadas.
- Excluir um treino salvo nao apaga log historico executado.
- Qualquer limpeza de referencia orfa ficou limitada ao necessario e nao alterou a agenda semanal alem do impacto direto da exclusao.
- O app continua carregando e persistindo sem erro apos reload.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- Fluxo manual: cadastrar/importar um treino existente, registrar execucao, excluir treino salvo, recarregar app e conferir Historico/Plano

### Riscos

- Apagar mais dados do que o necessario na exclusao.
- Quebrar o plano semanal ao limpar referencias.
- Regressao silenciosa por mexer no ponto central de estado.

### O que NAO alterar

- Nao refatorar toda a navegacao.
- Nao criar cadastro manual novo.
- Nao alterar `WorkoutGenerator` alem do estritamente necessario para compatibilidade, se houver.

### Reversibilidade

Reversivel por rollback localizado dos handlers e da limpeza de referencias, desde que o diff permaneca pequeno.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 - Ajustar handlers centrais de treino salvo, execucao e exclusao.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS_TAREFAS.md`
- `/src/App.tsx`
- `/src/types.ts`
- `/src/components/WorkoutPlanner.tsx`
- `/src/utils/rollover.ts`

Objetivo:
Manter treino salvo, treino planejado e treino executado separados e coerentes ao executar e excluir treinos.

Escopo:
Ajustar handlers centrais, persistencia minima relacionada e limpeza segura de referencias orfas.

Fora do escopo:
Nao refatorar o app inteiro, nao criar nova agenda semanal, nao inventar cadastro manual.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/types.ts`
- `/src/components/WorkoutPlanner.tsx`
- `/src/utils/rollover.ts`
- `/src/utils/stateMigration.ts`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- validacao manual de execucao, exclusao, reload e historico

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 5 - Ajustar o fluxo de execucao e exclusao em `WorkoutTracker`

### Objetivo

Fechar a experiencia local de iniciar, finalizar, cancelar e excluir treino salvo sem confundir execucao real com planejamento ou cadastro.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 4 concluida.
- Contrato de log e exclusao ja estabilizado.

### Arquivos provaveis

- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/WorkoutTracker.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/App.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/types.ts`

### Passos

1. Revisar os estados locais de treino ativo, log em andamento e cancelamento.
2. Garantir que cancelar nao gere log parcial e que finalizar gere um log unico e consultavel.
3. Garantir que excluir treino salvo afete apenas o cadastro salvo e o minimo necessario para consistencia, sem apagar historico real.
4. Revisar textos e estados vazios que hoje sugerem IA como unico caminho, mantendo linguagem segura e sem prometer funcionalidade nova.
5. Validar que a tela continue funcional com zero, um ou varios treinos salvos.

### Criterios de aceite

- O usuario consegue iniciar, finalizar e cancelar treino sem efeitos colaterais indevidos.
- Excluir treino salvo nao apaga logs executados.
- O estado vazio nao induz uma dependencia obrigatoria de IA se isso nao estiver confirmado.
- Nenhum arquivo fora da lista provavel foi alterado sem justificativa.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Fluxo manual: abrir Treino > Treinar, iniciar treino, cancelar, iniciar de novo, finalizar e depois excluir treino salvo

### Riscos

- Gravar log duplicado ao finalizar duas vezes.
- Ajustar copy e acabar sugerindo funcionalidade nao confirmada.

### O que NAO alterar

- Nao criar novo formulario de cadastro manual de treino.
- Nao alterar `WorkoutPlanner` ou `WorkoutGenerator`, salvo compatibilidade direta.

### Reversibilidade

Reversivel por rollback do componente e de eventuais ajustes pequenos de props.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 - Ajustar o fluxo de execucao e exclusao em `WorkoutTracker`.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS_TAREFAS.md`
- `/src/components/WorkoutTracker.tsx`
- `/src/App.tsx`

Objetivo:
Fechar a UX de iniciar, cancelar, finalizar e excluir treino salvo sem confundir plano com execucao real.

Escopo:
Ajustar apenas o componente e as props estritamente necessarias.

Fora do escopo:
Nao criar cadastro manual novo, nao mexer no planner semanal, nao alterar IA.

Arquivos provaveis:
- `/src/components/WorkoutTracker.tsx`
- `/src/App.tsx`
- `/src/types.ts`

Validacao:
- `npm run lint`
- `npm run build`
- validacao manual do fluxo de treino

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 6 - Ajustar validacao minima de passos

### Objetivo

Garantir que passos aceitem apenas inteiro maior ou igual a zero, persistam corretamente e continuem visiveis sem depender de kcal automatica.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefa 3 concluida.
- Tarefa 4 concluida para sanitizacao central.

### Arquivos provaveis

- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/ActivityTracker.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/App.tsx`
- Arquivo provavel: `/src/utils/activity.ts` - a confirmar na codebase

### Passos

1. Revisar o fluxo de input, atalhos e submit de passos.
2. Garantir bloqueio ou normalizacao clara para numero negativo, decimal invalido ou input vazio.
3. Alinhar a tela para nao depender de kcal de passos como criterio de sucesso da interacao.
4. Confirmar que o valor salvo aparece no dia atual, sobrevive a reload e segue visivel no Historico.
5. Manter o diff restrito a passos e pontos consumidores diretos.

### Criterios de aceite

- Passos sao salvos apenas como inteiro maior ou igual a zero.
- O usuario recebe comportamento previsivel para entradas invalidas.
- Passos continuam visiveis no resumo diario e no historico mesmo sem kcal automatica.
- Nenhuma formula nova foi adicionada.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Fluxo manual com entradas validas e invalidas de passos

### Riscos

- Rounding silencioso mascarar erro de entrada.
- Remover indicacao visual importante ao retirar dependencia de kcal.

### O que NAO alterar

- Nao criar conversao automatica nova de passos para kcal.
- Nao alterar cardio nesta tarefa.

### Reversibilidade

Reversivel por rollback do tratamento de input e da integracao local de passos.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 - Ajustar validacao minima de passos.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS_TAREFAS.md`
- `/src/components/ActivityTracker.tsx`
- `/src/App.tsx`

Objetivo:
Validar e persistir passos como inteiro maior ou igual a zero, sem depender de kcal automatica.

Escopo:
Ajustar input, submit, sanitizacao e exibicao direta de passos.

Fora do escopo:
Nao inventar formula de passos, nao mexer no fluxo de cardio alem do necessario para nao quebrar a tela.

Arquivos provaveis:
- `/src/components/ActivityTracker.tsx`
- `/src/App.tsx`
- `/src/utils/activity.ts`

Validacao:
- `npm run lint`
- `npm run build`
- validacao manual com valores validos e invalidos

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 7 - Ajustar validacao minima e registro de cardio

### Objetivo

Garantir que cardio exija tipo, duracao maior que zero e intensidade, mantendo velocidade opcional e respeitando a regra oficial para kcal.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefas 2, 3 e 4 concluidas.
- Caminho seguro para kcal de cardio definido.

### Arquivos provaveis

- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/ActivityTracker.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/App.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/types.ts`
- Arquivo provavel: `/src/utils/activity.ts` - a confirmar na codebase

### Passos

1. Revisar validacao de `type`, `duration`, `intensity` e `speed` no formulario de cardio.
2. Bloquear ou corrigir entradas invalidas antes de salvar.
3. Alinhar o campo de kcal manual/automatica ao que foi decidido na Tarefa 2.
4. Garantir que o log salvo tenha shape consistente para dia atual, Historico e exportacao.
5. Limpar o formulario apos sucesso sem deixar estado antigo reaparecer em novo submit.

### Criterios de aceite

- Nao e possivel salvar cardio sem tipo, duracao valida e intensidade.
- Velocidade permanece opcional.
- A tela nao inventa kcal automatica quando a base aprovada nao existir.
- O cardio salvo aparece corretamente na lista do dia e continua consultavel depois.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Fluxo manual com cardio valido, invalido, com e sem velocidade, com e sem kcal manual conforme regra definida

### Riscos

- Permitir gravacao de kcal incoerente com o PRD.
- Endurecer demais a validacao e bloquear um caso legitimo.

### O que NAO alterar

- Nao criar catalogo novo de tipos de cardio.
- Nao alterar metas, refeicoes, agua ou IA.

### Reversibilidade

Reversivel por rollback do formulario e do tratamento do log de cardio.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 7 - Ajustar validacao minima e registro de cardio.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS_TAREFAS.md`
- `/src/components/ActivityTracker.tsx`
- `/src/App.tsx`
- `/src/types.ts`

Objetivo:
Validar e salvar cardio com tipo, duracao e intensidade obrigatorios, respeitando a regra oficial para kcal.

Escopo:
Ajustar apenas formulario, shape salvo e integracao local de cardio.

Fora do escopo:
Nao inventar MET, nao criar catalogo de atividades, nao alterar outras areas do app.

Arquivos provaveis:
- `/src/components/ActivityTracker.tsx`
- `/src/App.tsx`
- `/src/types.ts`
- `/src/utils/activity.ts`

Validacao:
- `npm run lint`
- `npm run build`
- validacao manual com cenarios validos e invalidos

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 8 - Alinhar o Dashboard ao resumo fisico oficial da sprint

### Objetivo

Fazer o Dashboard refletir treino executado, cardio e passos de forma coerente com a regra aprovada, sem depender de formulas locais antigas.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefas 3, 4, 6 e 7 concluidas.
- Dados fisicos persistindo corretamente no dia atual.

### Arquivos provaveis

- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/Dashboard.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/ActivityTracker.tsx`
- Arquivo provavel: `/src/utils/activity.ts` - a confirmar na codebase

### Passos

1. Revisar quais indicadores do Dashboard dependem hoje de kcal de passos e cardio.
2. Ajustar tiles, labels e balances para refletir apenas o que esta aprovado pela regra oficial.
3. Garantir que passos permanecam visiveis mesmo quando nao houver kcal automatica.
4. Garantir que treino executado continue visivel como registro real do dia.
5. Validar o estado com e sem atividade fisica registrada.

### Criterios de aceite

- O Dashboard mostra treino executado, passos e cardio sem inventar numeros fora da regra aprovada.
- O resumo do dia continua coerente com os dados persistidos.
- O estado vazio permanece claro quando nao houver atividade fisica registrada.
- Nenhum indicador de refeicao, agua ou metas foi alterado sem necessidade.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Fluxo manual no Dashboard com cenarios: sem atividade, so passos, so cardio, treino executado com e sem cardio

### Riscos

- Mudar o significado do balanco calorico sem ajustar copy visual.
- Esconder passos ao retirar kcal automatica.

### O que NAO alterar

- Nao mexer nas regras de refeicao, agua, macros ou perfil.
- Nao alterar exportacao nesta tarefa.

### Reversibilidade

Reversivel por rollback localizado do componente e do utilitario de apoio.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 8 - Alinhar o Dashboard ao resumo fisico oficial da sprint.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS_TAREFAS.md`
- `/src/components/Dashboard.tsx`
- `/src/utils/activity.ts`

Objetivo:
Refletir treino executado, cardio e passos no Dashboard sem formulas locais nao aprovadas.

Escopo:
Ajustar exibicao, labels e pequenos calculos derivados apenas do Dashboard e de utilitario direto.

Fora do escopo:
Nao alterar refeicoes, agua, perfil, exportacao ou navegacao.

Arquivos provaveis:
- `/src/components/Dashboard.tsx`
- `/src/utils/activity.ts`
- `/src/components/ActivityTracker.tsx`

Validacao:
- `npm run lint`
- `npm run build`
- validacao manual do Dashboard

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 9 - Alinhar Historico, exportacao minima e leitura apos reload

### Objetivo

Garantir que treino executado, cardio e passos continuem consultaveis no Historico e aparecam na exportacao minima depois de salvar, recarregar e virar o dia.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefas 4, 6, 7 e 8 concluidas.
- Dados fisicos coerentes no dia atual.

### Arquivos provaveis

- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/components/HistoryCalendar.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/App.tsx`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/utils/rollover.ts`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/utils/stateMigration.ts`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/types.ts`

### Passos

1. Revisar a leitura de `todayData` e `history` no Historico.
2. Garantir que rollover e reload preservem `workoutLogs`, `cardioLogs` e `steps`.
3. Ajustar o Historico para mostrar passos e cardio sem depender de formula nao aprovada.
4. Ajustar a exportacao minima apenas no ponto necessario para refletir os dados persistidos de cardio e passos sem inventar kcal.
5. Validar a consulta do dia atual, de um dia anterior e a exportacao dos ultimos 7 dias.

### Criterios de aceite

- Os registros fisicos continuam acessiveis apos reload.
- O Historico mostra treino executado, cardio e passos do dia selecionado sem erro.
- CSV e PDF continuam exportando passos e cardio dentro do escopo do MVP.
- Nenhum arquivo fora da lista provavel foi alterado sem justificativa.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- Fluxo manual: salvar atividade, recarregar app, consultar Historico, exportar CSV e PDF

### Riscos

- Regressao em exportacao dos ultimos 7 dias.
- Quebra silenciosa do rollover ao salvar dados fisicos.
- `RISCO DE ESCOPO`: transformar a tarefa em refatoracao ampla de exportacao ou schema.

### O que NAO alterar

- Nao mudar o formato geral de backup/importacao.
- Nao reescrever a tela de Historico alem do necessario para a sprint.

### Reversibilidade

Reversivel por rollback localizado do Historico, exportacao minima e ajustes de rollover diretamente envolvidos.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 9 - Alinhar Historico, exportacao minima e leitura apos reload.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS_TAREFAS.md`
- `/src/components/HistoryCalendar.tsx`
- `/src/App.tsx`
- `/src/utils/rollover.ts`
- `/src/utils/stateMigration.ts`

Objetivo:
Manter treino executado, cardio e passos consultaveis no Historico e na exportacao minima apos reload e rollover.

Escopo:
Ajustar apenas leitura historica, exportacao minima e persistencia diretamente relacionadas a atividade fisica.

Fora do escopo:
Nao refatorar backup/importacao, nao reescrever o Historico inteiro, nao mexer em PWA.

Arquivos provaveis:
- `/src/components/HistoryCalendar.tsx`
- `/src/App.tsx`
- `/src/utils/rollover.ts`
- `/src/utils/stateMigration.ts`
- `/src/types.ts`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- validacao manual com reload, Historico e exportacoes

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 10 - Executar testes focados, regressao da sprint e atualizacao documental

### Objetivo

Fechar a sprint com validacoes tecnicas e manuais, registrando evidencias e pendencias sem mascarar o que nao foi validado.

### Tipo da tarefa

- testes

### Pre-requisitos

- Tarefas 1 a 9 concluidas conforme aplicavel.
- Diff final revisado.

### Arquivos provaveis

- Arquivo provavel: `/src/utils/activity.test.ts` - a confirmar na codebase
- Arquivo provavel: `/src/utils/rollover.test.ts` - a confirmar na codebase
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/src/hooks/useLocalStorage.test.ts`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/docs/agent/CURRENT_STATE.md`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/docs/evolution/CHANGELOG.md`
- Arquivo confirmado na leitura atual; reconfirmar na execucao: `/docs/evolution/DECISIONS.md`
- Arquivo provavel: `/docs/evolution/out-of-scope-changes.md` - a confirmar na codebase

### Passos

1. Adicionar testes unitarios focados apenas em utilitarios puros ou comportamentos pequenos introduzidos pela sprint, se houver utilitarios novos ou alterados.
2. Rodar `lint`, `build` e `test`.
3. Executar o fluxo manual completo da sprint: treino salvo/executado, passos validos/invalidos, cardio valido/invalido, reload, Historico e exportacao minima.
4. Atualizar `CURRENT_STATE.md` e `CHANGELOG.md` se houver alteracao real no projeto.
5. Atualizar `DECISIONS.md` somente se uma decisao humana nova tiver sido tomada durante a execucao.
6. Registrar qualquer desvio fora do escopo em `/docs/evolution/out-of-scope-changes.md`, se esse arquivo existir ou precisar ser criado por decisao explicita.

### Criterios de aceite

- Validacoes tecnicas executadas e registradas.
- Fluxo manual da sprint executado com evidencias objetivas.
- Limitacoes e validacoes nao executadas ficaram explicitas.
- Documentacao de continuidade atualizada apenas quando realmente necessario.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- Revisao manual do diff final
- Fluxo manual completo da sprint

### Riscos

- Declarar sprint concluida sem evidencias.
- Criar testes excessivos e fragis para componentes altamente acoplados.

### O que NAO alterar

- Nao criar novas features nesta etapa.
- Nao usar a etapa de validacao para refatoracao ampla.

### Reversibilidade

Reversivel por rollback localizado de testes e documentacao final, sem impacto funcional se as tarefas anteriores estiverem corretas.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 10 - Executar testes focados, regressao da sprint e atualizacao documental.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS_TAREFAS.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`

Objetivo:
Validar a sprint, registrar evidencias e atualizar a documentacao necessaria.

Escopo:
Rodar testes e validacoes manuais, revisar diff e atualizar docs de continuidade quando houver alteracao real.

Fora do escopo:
Nao criar funcionalidade nova, nao usar esta etapa para grandes refatoracoes.

Arquivos provaveis:
- `/src/utils/activity.test.ts`
- `/src/utils/rollover.test.ts`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/evolution/DECISIONS.md`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- fluxo manual completo da sprint

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

# Ordem recomendada de execucao

| Ordem | Tarefa | Depende de | Pode executar isolada? | Checkpoint recomendado |
|---|---|---|---|---|
| 1 | Tarefa 1 - Mapear o fluxo atual de treino, cardio, passos e historico | Nenhuma | Sim | Apos registrar o mapa e as lacunas |
| 2 | Tarefa 2 - Confirmar a regra oficial de gasto energetico e abrir os pontos de decisao | Tarefa 1 | Sim | Apos fechar o caminho permitido ou o bloqueio de decisao |
| 3 | Tarefa 3 - Centralizar a regra de atividade fisica em utilitario dedicado | Tarefa 2 | Nao | Apos `lint`, `build` e `test` |
| 4 | Tarefa 4 - Ajustar handlers centrais de treino salvo, execucao e exclusao | Tarefas 1 a 3 | Nao | Apos validar exclusao, execucao e reload |
| 5 | Tarefa 5 - Ajustar o fluxo de execucao e exclusao em `WorkoutTracker` | Tarefa 4 | Nao | Apos fluxo manual de treino validado |
| 6 | Tarefa 6 - Ajustar validacao minima de passos | Tarefas 3 e 4 | Sim | Apos fluxo manual de passos validado |
| 7 | Tarefa 7 - Ajustar validacao minima e registro de cardio | Tarefas 2, 3 e 4 | Sim | Apos fluxo manual de cardio validado |
| 8 | Tarefa 8 - Alinhar o Dashboard ao resumo fisico oficial da sprint | Tarefas 3, 4, 6 e 7 | Nao | Apos validacao manual do resumo diario |
| 9 | Tarefa 9 - Alinhar Historico, exportacao minima e leitura apos reload | Tarefas 4, 6, 7 e 8 | Nao | Apos reload, Historico e exportacoes validados |
| 10 | Tarefa 10 - Executar testes focados, regressao da sprint e atualizacao documental | Tarefas 1 a 9 | Nao | Apos todas as evidencias registradas |

---

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

---

# Tarefas que NAO devem ir para modelo economico

| Tarefa ou area | Motivo | Risco | Recomendacao |
|---|---|---|---|
| Regra automatica de kcal de cardio se nao houver base MET aprovada | Envolve regra de negocio sensivel e risco de inventar formula | Alto | Modelo forte ou validacao humana obrigatoria |
| Ajustes amplos em `/src/App.tsx` para estado/persistencia | Arquivo central do brownfield com alto risco de regressao cruzada | Alto | Modelo forte ou quebrar em diffs menores com revisao obrigatoria |
| Limpeza de referencias do plano semanal ao excluir treino salvo, se afetar varios fluxos | Pode tocar treino salvo, plano semanal e historico ao mesmo tempo | Medio/Alto | Modelo intermediario com revisao humana |
| Mudanca ampla na exportacao minima ou no schema historico | Pode quebrar CSV, PDF, reload e compatibilidade de dados existentes | Alto | Modelo forte ou validacao humana obrigatoria |
| Criacao de cadastro manual novo de treino sem fluxo existente confirmado | Amplia escopo funcional alem do que a leitura atual comprovou | Alto | Nao executar sem decisao humana previa |

---

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir tarefa relevante ou encontrar novo erro/risco durante a execucao da sprint | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando houver decisao tecnica ou regra de negocio tomada por humano | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver mudanca fora do escopo ou contorno excepcional registrado | Sim, se houver mudanca fora do escopo |

---

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

- `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS.md`

Se encontrar apenas um arquivo compativel, use esse arquivo como fonte principal.

Se encontrar mais de um arquivo compativel, liste os arquivos encontrados e solicite confirmacao de qual sprint deve ser quebrada.

Se esse arquivo deixar de existir, o agente deve parar e solicitar o arquivo correto ou o conteudo original da sprint.
