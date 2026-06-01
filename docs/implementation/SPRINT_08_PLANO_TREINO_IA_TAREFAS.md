# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: Sprint 8 - Plano de treino e IA
- objetivo da sprint original: fechar a agenda semanal de treinos e os fluxos de IA do pilar fisico, com revisao humana obrigatoria e sem promover funcionalidades fora do MVP
- arquivo de origem, se houver: `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
- resumo do escopo:
  - alinhar a agenda semanal de treinos;
  - permitir salvar, editar, remover e reutilizar treinos no planner;
  - integrar importacao e geracao de treino por IA com revisao antes de salvar;
  - conter superficies de IA fora do MVP na area de treino.
- documentos consultados:
  - `/docs/agent/agent-operating-rules.md`
  - `/docs/implementation/PLANO_IMPLEMENTACAO.md`
  - `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
  - `/docs/product/PRD.md`
  - `/docs/product/PRD_v1.1.md`
  - `/docs/evolution/DECISIONS.md`
  - `/docs/design/UI_UX_GUIDE_SECTION_16.md` (referencia complementar)
  - `/package.json`
- documentos ausentes na leitura atual:
  - `/docs/product/acceptance-criteria.md` nao encontrado no workspace
  - `/docs/design/UI_UX_GUIDE.md` nao encontrado no workspace
- pontos assumidos:
  - Sprint 0 a Sprint 7 ja foram tratadas antes desta sprint, conforme plano geral.
  - `PRD_v1.1.md` e a versao versionada mais recente do PRD, conforme `/docs/implementation/PLANO_IMPLEMENTACAO.md`.
  - `npm run lint`, `npm run build`, `npm run test` e `npm run dev` existem no `package.json`.
  - Nao foram encontrados testes dedicados para `WorkoutPlanner`, `WorkoutGenerator` ou `WorkoutTracker`; hoje existe apenas `src/hooks/useLocalStorage.test.ts`.
- pontos que precisam ser confirmados na codebase:
  - se o CTA "Treinar" do planner deve iniciar um treino especifico ou apenas navegar para a subarea de execucao (`PONTO DE DECISAO`);
  - se o salvamento de um plano gerado/importado por IA deve anexar ao catalogo/agenda atuais ou substituir parte do planejamento existente (`PONTO DE DECISAO`);
  - se existe alguma superficie ativa de IA de treino fora das abas visiveis atuais, alem dos componentes ja lidos;
  - se uma extracao pequena para `src/utils/workout-planner/*` e suficiente ou se o acoplamento atual exige outra estrategia local.

## Analise da Sprint

### Objetivo da sprint

Garantir que o usuario planeje a semana de treino e use IA de treino apenas como assistencia revisavel, sem confundir agenda com execucao real.

### Escopo identificado

- Agenda semanal de treinos por dia.
- Reuso de treinos existentes no catalogo.
- Edicao e remocao de itens planejados.
- Importacao de treino por texto com IA.
- Geracao semanal de treino por IA.
- Revisao obrigatoria antes de qualquer salvamento vindo da IA.
- Integridade entre catalogo de treinos, agenda semanal e execucao manual.
- Contencao de superficies de IA fora do MVP na area de treino.

### Fora do escopo

- Novas formulas de performance, gasto energetico ou periodizacao.
- Modo profissional de treino.
- Mudanca de arquitetura para proxy/backend de IA.
- Refatoracao ampla de `/src/App.tsx` fora do fluxo minimo desta sprint.
- Mudancas em dieta, refeicoes, historico principal, exportacao, backup ou privacidade fora do necessario para nao quebrar integracao.
- Reativar ou expandir analise de equipamento por IA.

### Dependencias entre partes

- A separacao entre planejamento e execucao deve ser resolvida antes de expandir importacao/geracao por IA.
- O fluxo de revisao obrigatoria depende de um contrato temporario de rascunho nao persistido.
- O salvamento final de planos revisados depende da integridade entre `workouts` e `plannedWorkouts`.
- A validacao final depende de confirmar que nenhuma acao do planner cria `WorkoutLog` sem acao explicita do usuario.
- Se houver divergencia entre sprint, PRD e estado atual da codebase sobre superficies de IA, prevalece o PRD versionado mais recente e a instrucao explicita do usuario nesta sessao; quando a regra final nao estiver clara, registrar `PONTO DE DECISAO`.

### Riscos principais

- Misturar treino planejado com treino executado por manter logs diretos dentro do planner.
- Salvar saidas de IA sem revisao explicita.
- Criar `workoutId` invalido ou referencia quebrada ao mesclar catalogo e agenda.
- Duplicar treinos no catalogo sem criterio claro de reaproveitamento.
- Tocar `App.tsx` e espalhar mudancas fora da area de treino (`RISCO DE ESCOPO`).
- Reexpor superficie de IA fora do MVP por leitura incompleta da navegacao.
- Tentar resolver nesta sprint o risco arquitetural da chave de IA no cliente, que pertence a outro gate.

### Estrategia de quebra

Dividir a sprint em nove blocos pequenos: mapeamento inicial, separacao entre agenda e execucao, CRUD manual do planner, definicao do contrato de revisao de IA, integracao da importacao por texto, integracao da geracao semanal, consolidacao do salvamento seguro, contencao de superficies fora do MVP e validacao final com checkpoints tecnicos e manuais.

### Limites para modelo economico

- Modelo economico e suficiente para leitura/mapeamento, ajustes locais de UI, introducao de estado de revisao, wiring controlado entre componentes e validacoes manuais guiadas.
- Mudancas de merge/persistencia em `App.tsx` pedem mais cuidado; se o diff deixar de ser pequeno ou exigir reestruturacao ampla do estado central, subir para modelo intermediario.
- Nenhuma tarefa desta sprint deve virar mudanca arquitetural de IA, seguranca ou backend; se isso aparecer como necessario, parar e registrar como fora de escopo.

---

# Tarefas da Sprint

## Tarefa 1 - Mapear fronteiras reais entre agenda, catalogo, execucao e IA

### Objetivo

Mapear com evidencia os pontos atuais em que o fluxo de treino mistura agenda, catalogo, execucao real e salvamento por IA antes de qualquer alteracao.

### Tipo da tarefa

- leitura/mapeamento.

### Pre-requisitos

- Leitura de `/docs/agent/agent-operating-rules.md`.
- Leitura de `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`.

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/App.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutPlanner.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutGenerator.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutTracker.tsx`.
- Arquivo confirmado na codebase: `src/services/geminiService.ts`.
- Arquivo confirmado na codebase: `src/types.ts`.

### Passos

1. Identificar onde o planner adiciona, remove ou limpa itens de `plannedWorkouts`.
2. Identificar onde o planner cria `WorkoutLog` diretamente.
3. Identificar onde a importacao por texto e a geracao por IA persistem dados sem revisao.
4. Identificar onde `App.tsx` concatena ou sobrescreve `workouts` e `plannedWorkouts`.
5. Registrar o comportamento atual do CTA "Treinar" vindo do planner e o TODO existente em `App.tsx`.

### Criterios de aceite

- Os pontos atuais de acoplamento entre agenda, execucao e IA foram listados com caminho de arquivo.
- O fluxo atual que salva diretamente o resultado da IA foi identificado.
- O comportamento atual do CTA vindo do planner foi documentado.
- Nenhum arquivo foi alterado nesta tarefa.

### Como validar

- `rg -n "plannedWorkouts|onLogWorkout|onImportWorkouts|onSaveWeeklyPlan|generateWeeklyWorkoutPlan|parseWorkoutText" src`
- Validacao manual de leitura dos arquivos mapeados.

### Riscos

- Deixar passar uma segunda entrada de importacao por texto.
- Supor comportamento de execucao sem ler `App.tsx` e `WorkoutTracker.tsx` juntos.

### O que NAO alterar

- Nao alterar codigo de producao.
- Nao alterar textos ou comportamento da UI.

### Reversibilidade

Tarefa totalmente reversivel por nao gerar alteracoes de codigo.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 - Mapear fronteiras reais entre agenda, catalogo, execucao e IA.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA_TAREFAS.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
- `src/App.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutGenerator.tsx`
- `src/components/WorkoutTracker.tsx`
- `src/services/geminiService.ts`

Objetivo:
Mapear onde o fluxo de treino hoje mistura agenda, execucao real e salvamento por IA.

Escopo:
Ler os arquivos e registrar os pontos de acoplamento reais.

Fora do escopo:
Qualquer implementacao, refatoracao ou alteracao de comportamento.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutGenerator.tsx`
- `src/components/WorkoutTracker.tsx`
- `src/services/geminiService.ts`

Validacao:
- `rg -n "plannedWorkouts|onLogWorkout|onImportWorkouts|onSaveWeeklyPlan|generateWeeklyWorkoutPlan|parseWorkoutText" src`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 2 - Separar agenda semanal do registro de execucao real

### Objetivo

Garantir que a area de planner nao registre treino executado diretamente e nao prometa um fluxo de execucao que a aplicacao ainda nao suporta de forma explicita.

### Tipo da tarefa

- estado/integracao.

### Pre-requisitos

- Tarefa 1 concluida.

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/WorkoutPlanner.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutTracker.tsx`.
- Arquivo confirmado na codebase: `src/App.tsx`.
- Arquivo confirmado na codebase: `src/types.ts`.

### Passos

1. Remover ou neutralizar o caminho em que o planner cria `WorkoutLog` diretamente.
2. Ajustar o CTA vindo da agenda para refletir apenas navegacao ou inicio real suportado.
3. Se o inicio direto a partir do planner nao estiver claramente suportado, preferir um comportamento conservador que nao simule execucao.
4. Garantir que nenhuma acao de agenda altere `workoutLogs` sem acao explicita na subarea de execucao.

### Criterios de aceite

- Nenhuma acao dentro do planner cria `WorkoutLog` automaticamente.
- A agenda continua salvando e removendo itens planejados sem efeito colateral de execucao.
- O texto e o comportamento do CTA da agenda ficam coerentes com o fluxo real.
- Nenhum arquivo fora da lista provavel foi alterado sem justificativa.

### Como validar

- `npm run lint`
- `npm run build`
- Teste manual: agendar treino, sair e voltar, abrir o fluxo de treino a partir da agenda e confirmar que nenhum log foi criado sem finalizar treino na area correta.

### Riscos

- Tocar `App.tsx` e causar regressao em outras subareas de treino.
- `PONTO DE DECISAO`: decidir sozinho se o CTA deve iniciar imediatamente um treino selecionado ou apenas navegar para a aba correta.

### O que NAO alterar

- Nao alterar cardio, passos ou historico principal.
- Nao alterar regras de gasto calorico.
- Nao abrir refatoracao ampla de `WorkoutTracker`.

### Reversibilidade

Reversivel por diff pequeno concentrado em planner, tracker e wiring minimo de `App.tsx`.

### Modelo recomendado

- modelo intermediario recomendado.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 - Separar agenda semanal do registro de execucao real.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA_TAREFAS.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
- `src/App.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutTracker.tsx`

Objetivo:
Remover do planner qualquer registro direto de treino executado e deixar o CTA coerente com o fluxo real.

Escopo:
Ajustar apenas a fronteira entre agenda e execucao.

Fora do escopo:
Refatoracao ampla de `App.tsx`, mudancas em cardio/passos, formulas, dieta ou arquitetura de IA.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutTracker.tsx`
- `src/types.ts`

Validacao:
- `npm run lint`
- `npm run build`
- teste manual de agenda sem criar `WorkoutLog`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 3 - Fechar CRUD manual do planner semanal e reuso de treinos existentes

### Objetivo

Permitir salvar, editar, remover e reutilizar treinos existentes na agenda semanal com comportamento claro por dia da semana e persistencia local confiavel.

### Tipo da tarefa

- UI/componente.

### Pre-requisitos

- Tarefa 2 concluida.

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/WorkoutPlanner.tsx`.
- Arquivo confirmado na codebase: `src/App.tsx`.
- Arquivo confirmado na codebase: `src/types.ts`.
- Arquivo confirmado na codebase: `src/constants/domain.ts`.
- Arquivo confirmado na codebase: `src/utils/domain.ts`.

### Passos

1. Confirmar o fluxo atual de adicionar treino existente a um dia da semana.
2. Implementar um caminho pequeno para editar o item planejado ja salvo, sem recriar logs.
3. Garantir remocao e limpeza da agenda sem apagar o catalogo de `workouts`.
4. Revisar textos de estado vazio e labels por dia para nao induzir erro de contexto.
5. Validar recarga da aplicacao com a agenda persistida.

### Criterios de aceite

- O usuario consegue adicionar um treino existente a um dia.
- O usuario consegue alterar dia e/ou treino associado de um item planejado sem precisar recriar a agenda inteira.
- O usuario consegue remover itens planejados e limpar a agenda sem apagar o catalogo de treinos.
- A agenda permanece salva apos fechar e reabrir o app.

### Como validar

- `npm run lint`
- `npm run dev`
- Teste manual: adicionar, editar, remover, limpar e recarregar a agenda semanal.

### Riscos

- Alterar a UX do planner e aumentar o diff alem do necessario.
- Perder a referencia de `workoutId` ao editar um item planejado.

### O que NAO alterar

- Nao criar um novo sistema de templates de treino.
- Nao alterar o fluxo de execucao real em `WorkoutTracker` alem do necessario para manter integracao.
- Nao alterar importacao/geracao por IA nesta tarefa.

### Reversibilidade

Reversivel por diff pequeno concentrado no planner e no estado de agenda.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 - Fechar CRUD manual do planner semanal e reuso de treinos existentes.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA_TAREFAS.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
- `src/components/WorkoutPlanner.tsx`
- `src/App.tsx`
- `src/types.ts`

Objetivo:
Fechar o CRUD manual da agenda semanal de treino com reuso do catalogo existente.

Escopo:
Ajustar add/edit/remove/clear da agenda e a persistencia local desse fluxo.

Fora do escopo:
IA, refatoracao ampla, novos modelos de treino, mudancas em dieta/cardio/passos.

Arquivos provaveis:
- `src/components/WorkoutPlanner.tsx`
- `src/App.tsx`
- `src/types.ts`
- `src/constants/domain.ts`

Validacao:
- `npm run lint`
- `npm run dev`
- teste manual de adicionar/editar/remover/recarregar

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 4 - Definir contrato de revisao para treino importado ou gerado por IA

### Objetivo

Criar um estado temporario e revisavel para resultados de IA de treino, de modo que nenhum plano seja persistido antes de confirmacao explicita.

### Tipo da tarefa

- modelo/tipos.

### Pre-requisitos

- Tarefa 1 concluida.
- Tarefa 2 concluida.
- Tarefa 3 concluida.

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/types.ts`.
- Arquivo confirmado na codebase: `src/App.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutPlanner.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutGenerator.tsx`.
- Arquivo provavel: `src/utils/workout-planner/*` (a confirmar na codebase; criar apenas se reduzir acoplamento com diff pequeno).

### Passos

1. Definir o shape minimo do rascunho revisavel com `workouts` e `plannedWorkouts`.
2. Garantir que esse rascunho exista fora do estado persistido ate a confirmacao final.
3. Definir o fluxo de cancelar/descartar sem alterar catalogo ou agenda salvos.
4. Preparar um ponto unico de confirmacao para ser reutilizado pelas entradas de importacao e geracao.
5. Registrar como `PONTO DE DECISAO` qualquer comportamento de substituir versus anexar que nao esteja claro na UX atual.

### Criterios de aceite

- Existe um contrato claro para revisar resultado de IA sem persisti-lo imediatamente.
- Cancelar a revisao nao altera `workouts`, `plannedWorkouts` nem `workoutLogs`.
- O contrato pode ser reutilizado pelas duas entradas de IA desta sprint.
- Nenhum arquivo fora da lista provavel foi alterado sem justificativa.

### Como validar

- `npm run lint`
- Revisao manual do fluxo de estado para confirmar que o rascunho nao vai para persistencia antes do confirm.

### Riscos

- Superdimensionar o contrato e abrir refatoracao desnecessaria.
- Mover estado demais para `App.tsx` sem necessidade real.

### O que NAO alterar

- Nao alterar prompts do Gemini alem do necessario para manter compatibilidade.
- Nao mudar estrategia de persistencia local fora da area de treino.
- Nao decidir sozinho sem evidencia se o fluxo final substitui ou anexa agenda existente.

### Reversibilidade

Reversivel por manter o estado de revisao local e isolado, com diff pequeno e revisavel.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 - Definir contrato de revisao para treino importado ou gerado por IA.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA_TAREFAS.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
- `src/types.ts`
- `src/App.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutGenerator.tsx`

Objetivo:
Criar um estado/contrato temporario para revisar saidas de IA antes de qualquer persistencia.

Escopo:
Definir o shape do rascunho e o caminho de confirmar/cancelar sem salvar automaticamente.

Fora do escopo:
Arquitetura nova, proxy de IA, refatoracao ampla de estado global, mudancas em dieta.

Arquivos provaveis:
- `src/types.ts`
- `src/App.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutGenerator.tsx`
- `src/utils/workout-planner/*` (se necessario)

Validacao:
- `npm run lint`
- revisao manual do fluxo de estado

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 5 - Conectar importacao por texto do planner ao fluxo de revisao obrigatoria

### Objetivo

Fazer a importacao por texto disparada a partir do planner produzir um rascunho revisavel antes de qualquer salvamento na agenda ou no catalogo.

### Tipo da tarefa

- estado/integracao.

### Pre-requisitos

- Tarefa 4 concluida.

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/WorkoutPlanner.tsx`.
- Arquivo confirmado na codebase: `src/services/geminiService.ts`.
- Arquivo confirmado na codebase: `src/App.tsx`.
- Arquivo provavel: `src/utils/workout-planner/*` (a confirmar na codebase).

### Passos

1. Reaproveitar o contrato de revisao definido na Tarefa 4 para a importacao textual do planner.
2. Trocar o salvamento direto apos `parseWorkoutText` por exibicao de rascunho revisavel.
3. Garantir botoes claros de confirmar e cancelar.
4. Preservar tratamento de erro, loading e limpeza do modal apos confirmacao ou cancelamento.
5. Validar que o cancelamento nao altera agenda nem catalogo.

### Criterios de aceite

- O texto importado por IA nao salva nada automaticamente.
- O usuario visualiza treinos e agenda planejada antes de confirmar.
- Cancelar a importacao deixa o estado persistido intacto.
- Confirmar segue o caminho unico de salvamento aprovado para a sprint.

### Como validar

- `npm run lint`
- `npm run build`
- Teste manual: colar texto de treino, revisar, cancelar e repetir confirmando.

### Riscos

- Duplicar UI de revisao em vez de reaproveitar o contrato definido.
- Limpar estado parcialmente e deixar rascunho preso na interface.

### O que NAO alterar

- Nao alterar a geracao semanal por IA nesta tarefa.
- Nao alterar o catalogo manual de treinos fora do fluxo de confirmacao.
- Nao tocar superficies de refeicao.

### Reversibilidade

Reversivel por estar concentrada no fluxo de importacao do planner e no contrato de revisao.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 - Conectar importacao por texto do planner ao fluxo de revisao obrigatoria.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA_TAREFAS.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
- `src/components/WorkoutPlanner.tsx`
- `src/services/geminiService.ts`
- `src/App.tsx`

Objetivo:
Fazer a importacao de treino por texto, a partir do planner, passar por revisao antes de salvar.

Escopo:
Ajustar apenas o fluxo de importacao textual do planner e seu uso do contrato de revisao.

Fora do escopo:
Geracao semanal, dieta, refatoracao ampla de IA, mudancas arquiteturais.

Arquivos provaveis:
- `src/components/WorkoutPlanner.tsx`
- `src/services/geminiService.ts`
- `src/App.tsx`
- `src/utils/workout-planner/*` (se necessario)

Validacao:
- `npm run lint`
- `npm run build`
- teste manual de importar, cancelar e confirmar

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 6 - Conectar geracao semanal e importacao textual da aba IA ao fluxo de revisao obrigatoria

### Objetivo

Aplicar o mesmo padrao de revisao obrigatoria aos fluxos da aba IA de treino, tanto para geracao semanal quanto para a segunda entrada de importacao textual.

### Tipo da tarefa

- UI/componente.

### Pre-requisitos

- Tarefa 4 concluida.
- Tarefa 5 concluida.

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/WorkoutGenerator.tsx`.
- Arquivo confirmado na codebase: `src/services/geminiService.ts`.
- Arquivo confirmado na codebase: `src/App.tsx`.
- Arquivo provavel: `src/utils/workout-planner/*` (a confirmar na codebase).

### Passos

1. Trocar o salvamento direto de `generateWeeklyWorkoutPlan` por apresentacao de rascunho revisavel.
2. Aplicar o mesmo caminho de revisao para a importacao textual interna de `WorkoutGenerator`.
3. Garantir que confirmar e cancelar usem o mesmo comportamento do planner.
4. Preservar estados de loading, erro e limpeza de prompt/modal sem salvar parcialmente.
5. Validar que a aba IA nao persiste nada antes da confirmacao final.

### Criterios de aceite

- Nenhum plano gerado pela aba IA entra em `workouts` ou `plannedWorkouts` sem confirmacao explicita.
- A segunda entrada de importacao textual da aba IA segue a mesma regra.
- Cancelar descarta o rascunho e mantem o estado salvo intacto.
- O comportamento entre planner e aba IA fica consistente para o usuario.

### Como validar

- `npm run lint`
- `npm run build`
- Teste manual: gerar plano, cancelar, gerar de novo e confirmar; repetir com a importacao textual da aba IA.

### Riscos

- Manter dois comportamentos diferentes para duas entradas de IA.
- Ajustar UI demais e escapar do diff pequeno.
- Resposta malformada da IA continuar quebrando a tela se nao houver fallback suficiente.

### O que NAO alterar

- Nao mudar a estrategia de prompts do Gemini alem do minimo para manter shape compativel.
- Nao reestruturar a navegacao principal de treino.
- Nao tocar dieta, refeicoes ou historico.

### Reversibilidade

Reversivel por diff focado em `WorkoutGenerator.tsx` e no contrato de revisao ja criado.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 - Conectar geracao semanal e importacao textual da aba IA ao fluxo de revisao obrigatoria.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA_TAREFAS.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
- `src/components/WorkoutGenerator.tsx`
- `src/services/geminiService.ts`
- `src/App.tsx`

Objetivo:
Fazer a aba IA de treino exigir revisao antes de salvar qualquer plano gerado ou importado.

Escopo:
Ajustar apenas os fluxos da aba IA para usar o contrato de revisao ja definido.

Fora do escopo:
Arquitetura de IA, dieta, refatoracao ampla de `App.tsx`, mudancas em planner manual fora da integracao minima.

Arquivos provaveis:
- `src/components/WorkoutGenerator.tsx`
- `src/services/geminiService.ts`
- `src/App.tsx`
- `src/utils/workout-planner/*` (se necessario)

Validacao:
- `npm run lint`
- `npm run build`
- teste manual de gerar/importar, cancelar e confirmar

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 7 - Consolidar salvamento seguro entre catalogo, agenda e execucao

### Objetivo

Garantir que o salvamento final de treinos manuais, importados ou gerados mantenha `workouts`, `plannedWorkouts` e a area de execucao coerentes, sem referencias quebradas ou duplicacao indevida.

### Tipo da tarefa

- logica de negocio.

### Pre-requisitos

- Tarefa 3 concluida.
- Tarefa 4 concluida.
- Tarefa 5 concluida.
- Tarefa 6 concluida.

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/App.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutPlanner.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutGenerator.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutTracker.tsx`.
- Arquivo confirmado na codebase: `src/types.ts`.
- Arquivo provavel: `src/utils/workout-planner/*` (a confirmar na codebase; preferir utilitario puro se reduzir risco).
- Arquivo provavel: `src/test/*` (a confirmar na codebase; apenas se houver utilitario puro extraido).

### Passos

1. Centralizar o caminho de confirmacao que persiste o resultado revisado.
2. Garantir que cada item de `plannedWorkouts` salve apenas com `workoutId` valido.
3. Evitar inserir itens planejados orfaos ou com referencia vazia.
4. Preservar o catalogo para reuso no planner e na execucao real.
5. Se houver extracao de utilitario puro para normalizacao/merge, adicionar teste unitario pequeno e focado.
6. Manter como `PONTO DE DECISAO` qualquer regra de substituir versus anexar que nao esteja confirmada; na ausencia de confirmacao, preservar o comportamento ja confirmado e apenas impedir inconsistencias.

### Criterios de aceite

- Depois de confirmar um plano revisado, todo item planejado referencia um treino existente.
- O catalogo continua utilizavel na aba de execucao e na agenda.
- Nao ha criacao automatica de `WorkoutLog` durante o salvamento do plano.
- Nenhum arquivo fora da lista provavel foi alterado sem justificativa.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test` (se houver novo utilitario/teste relacionado)
- Teste manual: salvar plano revisado, editar agenda, voltar para execucao e confirmar integridade das referencias.

### Riscos

- Duplicar treinos por merge ingenuo.
- Perder itens da agenda ao confirmar um segundo rascunho.
- Tocar estado central em `App.tsx` e espalhar efeito colateral (`RISCO DE ESCOPO`).

### O que NAO alterar

- Nao mudar schema global de persistencia fora da area de treino.
- Nao alterar `history`, exportacao ou backup.
- Nao implementar deduplicacao "inteligente" por nome se ela nao estiver claramente aprovada.

### Reversibilidade

Reversivel por checkpoint previo e diff pequeno focado no caminho unico de salvamento.

### Modelo recomendado

- modelo intermediario recomendado.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 7 - Consolidar salvamento seguro entre catalogo, agenda e execucao.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA_TAREFAS.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
- `src/App.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutGenerator.tsx`
- `src/components/WorkoutTracker.tsx`
- `src/types.ts`

Objetivo:
Garantir integridade entre catalogo, agenda e execucao ao confirmar planos revisados.

Escopo:
Centralizar o salvamento final, validar referencias e impedir itens planejados orfaos.

Fora do escopo:
Refatoracao ampla de estado, nova estrategia de persistencia, deduplicacao sofisticada nao aprovada, mudancas em dieta/historico/backup.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutGenerator.tsx`
- `src/components/WorkoutTracker.tsx`
- `src/types.ts`
- `src/utils/workout-planner/*` (se necessario)

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test` (se houver utilitario/teste novo)
- teste manual de salvar e reutilizar o plano

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 8 - Conter superficies de IA fora do MVP na area de treino

### Objetivo

Garantir que analise de equipamento ou qualquer outra superficie de IA de treino fora do MVP documentado nao esteja ativa ou promovida ao usuario.

### Tipo da tarefa

- limpeza/refino.

### Pre-requisitos

- Tarefa 1 concluida.
- Tarefa 6 concluida.
- Tarefa 7 concluida.

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/WorkoutTracker.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutGenerator.tsx`.
- Arquivo confirmado na codebase: `src/App.tsx`.
- Arquivo confirmado na codebase: `src/services/geminiService.ts`.
- Arquivo confirmado na documentacao: `/docs/product/PRD_v1.1.md`.
- Arquivo confirmado na documentacao: `/docs/implementation/SPRINT_01_TAREFA_01_MAPEAMENTO.md`.

### Passos

1. Confirmar por busca textual e navegacao manual se existe botao, aba, CTA ou fluxo ativo para analise de equipamento.
2. Se a superficie estiver ativa, ocultar, remover da navegacao ou marcar explicitamente como fora do ciclo atual sem expandir a feature.
3. Se a superficie nao estiver ativa, manter apenas o registro do risco e nao abrir remocao ampla do servico.
4. Revisar textos da area IA de treino para nao sugerir recursos fora do MVP.

### Criterios de aceite

- Nenhuma funcionalidade de IA de treino fora do MVP fica ativa ou promovida ao usuario na navegacao atual.
- O diff nao vira limpeza ampla de servico sem confirmacao de uso real.
- A area de treino continua funcional apos a contencao.

### Como validar

- `rg -n "equipamento|analyzeGymEquipment|WorkoutTracker|WorkoutGenerator" src docs`
- `npm run build`
- Validacao manual de navegacao das abas `Treinar`, `Plano`, `Cardio` e `IA`.

### Riscos

- Remover codigo compartilhado que ainda e usado por outra superficie nao lida.
- `RISCO DE ESCOPO`: transformar contencao de UI em reescrita do `geminiService`.

### O que NAO alterar

- Nao reescrever o servico de IA por completo.
- Nao transformar esta tarefa em gate de seguranca arquitetural.
- Nao mexer em superficies de dieta fora da area de treino.

### Reversibilidade

Reversivel por diff pequeno focado em UI/navegacao e sem remocoes profundas de servico.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 8 - Conter superficies de IA fora do MVP na area de treino.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA_TAREFAS.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
- `/docs/product/PRD_v1.1.md`
- `src/App.tsx`
- `src/components/WorkoutTracker.tsx`
- `src/components/WorkoutGenerator.tsx`
- `src/services/geminiService.ts`

Objetivo:
Garantir que IA de treino fora do MVP, como analise de equipamento, nao esteja ativa ou promovida ao usuario.

Escopo:
Auditar a superficie atual e conter apenas o que estiver realmente exposto.

Fora do escopo:
Reescrever `geminiService`, mudar arquitetura de IA, mexer em dieta, abrir refatoracao ampla.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/WorkoutTracker.tsx`
- `src/components/WorkoutGenerator.tsx`
- `src/services/geminiService.ts`

Validacao:
- `rg -n "equipamento|analyzeGymEquipment|WorkoutTracker|WorkoutGenerator" src docs`
- `npm run build`
- validacao manual da navegacao de treino

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 9 - Validacao final, regressao minima e fechamento documental da sprint

### Objetivo

Executar as validacoes tecnicas e manuais da sprint inteira, revisar o diff final e atualizar a documentacao de continuidade quando houver implementacao real.

### Tipo da tarefa

- validacao.

### Pre-requisitos

- Tarefas 1 a 8 concluidas.

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/App.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutPlanner.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutGenerator.tsx`.
- Arquivo confirmado na codebase: `src/components/WorkoutTracker.tsx`.
- Arquivo confirmado na codebase: `src/services/geminiService.ts`.
- Arquivo confirmado na codebase: `src/types.ts`.
- Arquivo confirmado na codebase: `docs/agent/CURRENT_STATE.md`.
- Arquivo confirmado na codebase: `docs/evolution/CHANGELOG.md`.

### Passos

1. Executar `lint`, `build` e `test` do projeto.
2. Validar manualmente os fluxos de agenda semanal, importacao por texto, geracao por IA com revisao, cancelamento, confirmacao e uso posterior na execucao.
3. Revisar o diff final e confirmar que nenhuma area fora de treino foi alterada sem justificativa.
4. Registrar limitacoes, validacoes nao executadas e riscos residuais.
5. Atualizar `CURRENT_STATE.md` e `CHANGELOG.md` se houve implementacao real; atualizar `DECISIONS.md` apenas se uma decisao humana foi tomada.

### Criterios de aceite

- `npm run lint` executado sem falha bloqueante.
- `npm run build` executado sem falha bloqueante.
- `npm run test` executado; se houver falha nao relacionada, registrar com evidencia.
- O fluxo manual confirma que agenda e execucao continuam separadas.
- O diff final permanece dentro do escopo da Sprint 8.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- Validacao manual do fluxo descrito na sprint original.

### Riscos

- Falso positivo por validar apenas um dos dois pontos de entrada de IA.
- Ignorar regressao no reuso do catalogo apos confirmar um segundo plano.

### O que NAO alterar

- Nao adicionar novas funcionalidades ao encontrar ideias extras durante a validacao.
- Nao alterar arquitetura ou abrir nova sprint dentro desta tarefa.

### Reversibilidade

Reversivel por checkpoints por tarefa e rollback pontual apenas do bloco que falhar na validacao.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 9 - Validacao final, regressao minima e fechamento documental da sprint.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA_TAREFAS.md`
- `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md`
- os arquivos alterados nas Tarefas 2 a 8

Objetivo:
Validar a Sprint 8 de ponta a ponta e fechar com evidencias tecnicas, manuais e documentais.

Escopo:
Executar validacoes, revisar regressao minima e atualizar continuidade se houve implementacao real.

Fora do escopo:
Nova implementacao fora de treino, reabertura de escopo, mudanca arquitetural ou nova rodada de features.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutGenerator.tsx`
- `src/components/WorkoutTracker.tsx`
- `src/services/geminiService.ts`
- `src/types.ts`
- `docs/agent/CURRENT_STATE.md`
- `docs/evolution/CHANGELOG.md`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- fluxo manual completo da area de treino

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
| 1 | Tarefa 1 - Mapear fronteiras reais entre agenda, catalogo, execucao e IA | Nenhuma | Sim | Apos o mapeamento com evidencia |
| 2 | Tarefa 2 - Separar agenda semanal do registro de execucao real | Tarefa 1 | Nao | Apos `npm run lint` + `npm run build` |
| 3 | Tarefa 3 - Fechar CRUD manual do planner semanal e reuso de treinos existentes | Tarefa 2 | Nao | Apos validar add/edit/remove/reload |
| 4 | Tarefa 4 - Definir contrato de revisao para treino importado ou gerado por IA | Tarefas 1, 2 e 3 | Nao | Apos confirmar que o rascunho nao persiste sozinho |
| 5 | Tarefa 5 - Conectar importacao por texto do planner ao fluxo de revisao obrigatoria | Tarefa 4 | Nao | Apos validar cancelar/confirmar no planner |
| 6 | Tarefa 6 - Conectar geracao semanal e importacao textual da aba IA ao fluxo de revisao obrigatoria | Tarefas 4 e 5 | Nao | Apos validar cancelar/confirmar na aba IA |
| 7 | Tarefa 7 - Consolidar salvamento seguro entre catalogo, agenda e execucao | Tarefas 3, 4, 5 e 6 | Nao | Apos `npm run lint` + `npm run build` + reuso validado |
| 8 | Tarefa 8 - Conter superficies de IA fora do MVP na area de treino | Tarefas 1, 6 e 7 | Sim | Apos validacao manual da navegacao de treino |
| 9 | Tarefa 9 - Validacao final, regressao minima e fechamento documental da sprint | Tarefas 1 a 8 | Nao | Apos validacoes tecnicas, manuais e revisao do diff |

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
| Tarefa 2 - Separar agenda semanal do registro de execucao real | Toca a fronteira entre planner, tracker e estado central em `App.tsx` | Medio | Modelo intermediario recomendado |
| Tarefa 7 - Consolidar salvamento seguro entre catalogo, agenda e execucao | Envolve merge/persistencia de dados e integridade de referencias entre multiplos arquivos | Medio | Modelo intermediario recomendado + revisao humana obrigatoria do diff |
| Qualquer tentativa de mover IA de treino para proxy/backend | Mudanca arquitetural e de seguranca fora do escopo desta sprint | Alto | Fora desta sprint; modelo forte + decisao humana |

---

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir tarefa relevante ou encontrar novo erro na area de treino | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando houver decisao tecnica ou regra de negocio confirmada por humano, como comportamento final de merge/substituicao | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver mudanca fora do escopo ou contencao excepcional nao prevista | Sim, se houver mudanca fora do escopo |
