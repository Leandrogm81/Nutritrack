# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: `Sprint 4 - IA de refeicao e avisos`
- objetivo da sprint original: fechar os fluxos de analise alimentar por IA com revisao humana obrigatoria, mensagens de limite claras e fallback manual sem bloquear o app.
- arquivo de origem: `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS.md`
- resumo do escopo: alinhar o fluxo de analise de refeicao por texto e imagem ao papel de recomendacao revisavel, inserir avisos contextuais minimos, impedir salvamento automatico, tratar falhas de IA sem bloquear o cadastro manual e garantir que a imagem usada na analise nao seja persistida localmente por padrao.
- documentos consultados:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/PLANO_IMPLEMENTACAO.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS.md`
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/design/UI_UX_GUIDE_SECTION_16.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`
- `/package.json`
- documentos ausentes na leitura atual:
- `/docs/product/acceptance-criteria.md` nao encontrado no workspace
- `/docs/design/UI_UX_GUIDE.md` nao encontrado no workspace
- pontos assumidos:
- `npm run dev`, `npm run lint`, `npm run build` e `npm run test` existem no `package.json`.
- A leitura atual da codebase indica que o fluxo de IA alimentar do dashboard esta concentrado em `/src/components/MealForm.tsx` e nas chamadas de refeicao de `/src/services/geminiService.ts`.
- Nao foi encontrado componente compartilhado de aviso/contexto em `/src/components` nem registro de componente aprovado para reaproveitamento em `/docs/design/UI_UX_GUIDE_SECTION_16.md`.
- O estado persistido em `localStorage` continua centralizado em `/src/App.tsx` via `/src/hooks/useLocalStorage.ts`; na leitura atual, a imagem de analise nao entra no schema persistido.
- `CURRENT_STATE.md` e `HANDOFF.md` ainda apontam a Sprint 3 como proxima acao operacional; antes da execucao da Sprint 4, confirmar que a branch local ja contem as dependencias reais da Sprint 3.
- pontos que precisam ser confirmados na codebase:
- `PONTO DE DECISAO`: texto final aprovado dos avisos de IA e de revisao obrigatoria.
- Confirmar se existe algum outro ponto de entrada de analise alimentar fora de `MealForm.tsx` que nao apareceu na busca atual.
- Confirmar se a revisao antes do salvamento ficara no proprio formulario editavel ou em bloco/estado visual separado.
- Confirmar se a execucao local da Sprint 3 deixou o fluxo manual de refeicao estabilizado na branch atual.

## Analise da Sprint

### Objetivo da sprint

Transformar a IA alimentar em um assistente revisavel e falhar com seguranca, sem salvar nada automaticamente e sem comprometer o fluxo manual.

### Escopo identificado

- Mapear o fluxo atual de IA alimentar por texto e imagem.
- Confirmar o texto aprovado e os pontos de exibicao do aviso contextual.
- Exibir aviso minimo antes do envio para IA e novamente antes do salvamento de um rascunho vindo da IA.
- Garantir que o resultado de IA vire apenas um rascunho editavel ate a confirmacao explicita do usuario.
- Tratar resposta invalida, indisponibilidade ou offline com mensagem clara e retorno ao fluxo manual.
- Garantir descarte de imagem, rascunho e estados transientes relacionados a IA.
- Validar com testes focados e walkthrough manual do fluxo afetado.

### Fora do escopo

- Geracao ou importacao do plano alimentar semanal completo.
- Ajustes em `DietGenerator`, `WeeklyPlanner`, `RecipeSuggestions`, `WorkoutGenerator`, `WorkoutPlanner`, `WorkoutTracker` ou fluxos de treino, salvo se a leitura da codebase provar dependencia direta desta sprint.
- Criacao de proxy/server-side, troca da estrategia de segredo da IA ou qualquer gate de release publico.
- Decidir sozinho o texto final dos avisos legais.
- Promover novas superficies de IA alimentar fora do dashboard e do fluxo de refeicao do dia.

### Dependencias entre partes

- A validacao do fluxo real e das dependencias da Sprint 3 deve acontecer antes de qualquer edicao.
- O texto aprovado do aviso deve existir antes da tarefa de UI do aviso contextual.
- O estado de rascunho revisavel precisa estar claro antes do fallback manual final.
- A normalizacao de erro/resposta da IA deve preceder a mensagem final de erro no `MealForm`.
- Os testes focados devem acontecer depois das alteracoes de UI, estado e servico.
- `PONTO DE DECISAO`: se o texto aprovado do aviso nao existir, a tarefa de aviso deve parar sem inventar copy final.

### Riscos principais

- Regressao no `MealForm` por acoplamento entre modal, IA, formulario manual e reset de estado.
- Regressao cruzada em `/src/services/geminiService.ts`, que tambem atende outros fluxos de IA do produto.
- Usuario interpretar IA como prescricao se o aviso aparecer no lugar errado ou com copy nao aprovada.
- Persistencia acidental de rascunho ou imagem em memoria local ou `localStorage`.
- `RISCO DE ESCOPO`: tocar fluxos semanais, receitas ou treino por compartilhar o mesmo servico de IA.
- Chave de IA exposta em build publico continua sendo risco relevante, mas permanece fora do escopo desta sprint e segue como gate de release posterior.

### Estrategia de quebra

Dividir a Sprint 4 em leitura/mapeamento, decisao operacional sobre copy aprovada, implementacao do aviso contextual, isolamento do rascunho revisavel, normalizacao do contrato de resposta/erro da analise alimentar, fallback manual claro, descarte de imagem/estado transiente, testes focados e consolidacao documental final. Cada tarefa deve gerar diff pequeno, reversivel e revisavel.

### Limites para modelo economico

- Cabem em modelo economico: leitura/mapeamento, confirmacao de copy aprovada, aviso contextual em UI local, controle explicito de rascunho no `MealForm`, descarte de estados transientes, testes focados e documentacao final.
- Modelo intermediario recomendado: ajustes localizados em `/src/services/geminiService.ts` quando houver validacao minima de resposta e erro apenas para `parseMealDescription` e `analyzeImage`.
- Modelo forte recomendado: qualquer alteracao que exija refatorar o servico compartilhado de IA alem dos metodos de refeicao, mexer em persistencia global em `/src/App.tsx` ou rediscutir arquitetura de seguranca da IA.

---

# Tarefas da Sprint

## Tarefa 1 - Mapear o fluxo real de IA alimentar e pre-condicoes

### Objetivo

Confirmar o fluxo atual de analise por texto/imagem, os pontos de salvamento, os estados transientes e as dependencias operacionais antes de editar qualquer arquivo.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- Leitura de `/docs/agent/agent-operating-rules.md`.
- Leitura da sprint original e deste arquivo de tarefas.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo confirmado na codebase: `/src/hooks/useLocalStorage.ts`
- Arquivo confirmado na codebase: `/docs/agent/CURRENT_STATE.md`
- Arquivo confirmado na codebase: `/docs/agent/HANDOFF.md`

### Passos

1. Ler `MealForm.tsx`, `geminiService.ts`, `App.tsx`, `types.ts` e `useLocalStorage.ts`.
2. Mapear onde o fluxo de IA entra, onde o formulario vira rascunho editavel e onde o salvamento final acontece.
3. Confirmar se a busca por `parseMealDescription` e `analyzeImage` aponta apenas para o fluxo alimentar do dashboard.
4. Registrar dependencias operacionais abertas: copy aprovada do aviso, conclusao real da Sprint 3 e qualquer estado transiente nao limpo ao fechar o modal.
5. Se surgir integracao fora do fluxo alimentar diario, registrar como `RISCO DE ESCOPO` antes de continuar.

### Criterios de aceite

- O ponto de entrada da IA alimentar foi identificado.
- O ponto de persistencia final da refeicao foi identificado.
- Os estados locais que podem reter rascunho, erro ou imagem foram identificados.
- As dependencias abertas da sprint ficaram registradas como fato, sem inferencia.

### Como validar

- `rg -n "parseMealDescription|analyzeImage|MealForm" src`
- `rg -n "localStorage|plannedMeals|meals" src/App.tsx src/hooks/useLocalStorage.ts src/types.ts`
- Revisao manual das leituras realizadas

### Riscos

- Ignorar um ponto de entrada oculto da IA alimentar.
- Supor que a Sprint 3 esta concluida sem confirmar o estado real da branch.

### O que NAO alterar

- Nao editar codigo nesta tarefa.
- Nao tocar fluxos semanais, treino, receitas ou arquitetura de IA.

### Reversibilidade

Totalmente reversivel, pois a tarefa deve produzir apenas mapeamento e anotacoes operacionais.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 - Mapear o fluxo real de IA alimentar e pre-condicoes.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS_TAREFAS.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS.md`
- `/src/components/MealForm.tsx`
- `/src/services/geminiService.ts`
- `/src/App.tsx`

Objetivo:
Mapear o fluxo atual de IA alimentar, salvamento e estados transientes antes de qualquer mudanca.

Escopo:
Ler arquivos, localizar pontos de entrada/saida do fluxo e registrar dependencias abertas.

Fora do escopo:
Nao editar codigo, nao mudar UI, nao tocar treino/plano/receitas.

Arquivos provaveis:
- `/src/components/MealForm.tsx`
- `/src/services/geminiService.ts`
- `/src/App.tsx`
- `/src/types.ts`
- `/src/hooks/useLocalStorage.ts`

Validacao:
- `rg -n "parseMealDescription|analyzeImage|MealForm" src`
- revisao manual do mapa gerado

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 2 - Confirmar copy aprovada e estrategia de insercao do aviso

### Objetivo

Localizar o texto humano aprovado dos avisos de IA e confirmar os dois pontos exatos de exibicao antes de qualquer alteracao visual.

### Tipo da tarefa

- documentacao

### Pre-requisitos

- Tarefa 1 concluida.
- Leitura de `PRD.md`, `DECISIONS.md` e da sprint original.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/docs/product/PRD.md`
- Arquivo confirmado na codebase: `/docs/evolution/DECISIONS.md`
- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo provavel: `/src/components/shared/ContextWarning.tsx` - a confirmar na codebase
- Arquivo provavel: `/src/constants/aiWarnings.ts` ou equivalente - a confirmar na codebase

### Passos

1. Buscar nos documentos se o texto aprovado do aviso ja foi registrado.
2. Se o texto final nao estiver aprovado, registrar `PONTO DE DECISAO` e pausar a tarefa seguinte de UI.
3. Confirmar no fluxo atual onde o aviso deve aparecer: antes do envio para IA e antes do salvamento do rascunho vindo da IA.
4. Definir a estrategia mais simples de insercao do texto aprovado sem criar dependencia desnecessaria: inline local, constante simples ou componente leve.

### Criterios de aceite

- O texto aprovado foi localizado ou a ausencia dele foi registrada como `PONTO DE DECISAO`.
- Os dois pontos de exibicao ficaram documentados.
- Nao houve invencao de copy final pelo agente.

### Como validar

- `rg -n "aviso|IA|estimativa|prescricao|nutricionista|medico|treinador" docs`
- Revisao manual dos trechos encontrados

### Riscos

- Transformar sugestao de texto em requisito aprovado.
- Escolher um ponto de exibicao que conflite com o fluxo real do formulario.

### O que NAO alterar

- Nao escrever texto final por conta propria.
- Nao implementar UI nesta tarefa.

### Reversibilidade

Totalmente reversivel, pois a tarefa deve apenas registrar decisao ou pendencia.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 - Confirmar copy aprovada e estrategia de insercao do aviso.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS_TAREFAS.md`
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `/src/components/MealForm.tsx`

Objetivo:
Localizar a copy aprovada do aviso de IA e confirmar onde ela deve aparecer no fluxo.

Escopo:
Pesquisar documentos, registrar `PONTO DE DECISAO` se a copy nao existir e mapear os pontos de insercao.

Fora do escopo:
Nao inventar texto final, nao editar UI, nao alterar logica de negocio.

Arquivos provaveis:
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `/src/components/MealForm.tsx`
- `/src/components/shared/ContextWarning.tsx`

Validacao:
- `rg -n "aviso|IA|estimativa|prescricao" docs`
- revisao manual dos achados

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 3 - Aplicar o aviso contextual minimo no fluxo alimentar

### Objetivo

Exibir o aviso contextual minimo aprovado antes do envio para IA e novamente antes do salvamento do rascunho vindo da IA, sem interferir no fluxo manual puro.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 1 concluida.
- Tarefa 2 concluida com copy aprovada.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo provavel: `/src/components/shared/ContextWarning.tsx` - a confirmar na codebase
- Arquivo provavel: `/src/constants/aiWarnings.ts` ou equivalente - a confirmar na codebase

### Passos

1. Reaproveitar um padrao visual existente; se nao houver, criar o menor bloco visual possivel para o aviso.
2. Exibir o aviso na area de entrada de IA antes do envio de texto ou imagem.
3. Exibir o aviso novamente na etapa de revisao imediatamente antes da acao de salvamento do rascunho vindo da IA.
4. Garantir que o fluxo manual aberto diretamente pelo usuario nao receba aviso duplicado fora do contexto da IA.

### Criterios de aceite

- O aviso aparece antes do envio para IA.
- O aviso reaparece antes do salvamento de um rascunho vindo da IA.
- O fluxo manual puro continua utilizavel sem ruido indevido.
- Nenhum texto nao aprovado foi introduzido.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Validacao manual do fluxo de texto, imagem e revisao em largura mobile e desktop

### Riscos

- Mostrar o aviso no momento errado.
- Duplicar mensagem e degradar a UX do formulario.

### O que NAO alterar

- Nao alterar a copy aprovada sem decisao humana.
- Nao tocar `DietGenerator`, `WeeklyPlanner`, `RecipeSuggestions` ou fluxos de treino.

### Reversibilidade

Reversivel por remover o bloco visual e quaisquer imports locais introduzidos para o aviso.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 - Aplicar o aviso contextual minimo no fluxo alimentar.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS_TAREFAS.md`
- `/src/components/MealForm.tsx`
- os arquivos que contem a copy aprovada do aviso

Objetivo:
Mostrar o aviso de IA antes do envio e antes do salvamento do rascunho vindo da IA.

Escopo:
Editar apenas o fluxo visual do `MealForm` e, se necessario, criar um bloco leve de aviso reutilizavel.

Fora do escopo:
Nao inventar copy, nao mudar fluxos semanais, nao refatorar arquitetura.

Arquivos provaveis:
- `/src/components/MealForm.tsx`
- `/src/components/shared/ContextWarning.tsx`
- `/src/constants/aiWarnings.ts`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- walkthrough manual do fluxo de IA alimentar

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 4 - Garantir rascunho revisavel e salvamento somente por confirmacao explicita

### Objetivo

Garantir que toda saida de IA alimentar vire apenas um rascunho editavel e que o salvamento no dia aconteca somente por acao explicita do usuario.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefa 1 concluida.
- Tarefa 3 concluida ou planejada, com os pontos de revisao ja mapeados.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`

### Passos

1. Tornar explicito no `MealForm` quando os campos em edicao vieram da IA e ainda nao foram confirmados.
2. Garantir que `onAddMeal` continue sendo chamado apenas no clique final de salvamento.
3. Garantir que cancelar, voltar para IA, fechar o modal ou limpar o formulario descarte o rascunho vindo da IA.
4. Confirmar que o fluxo manual sem IA continua com o comportamento anterior.

### Criterios de aceite

- Nenhum resultado de IA entra em `data.meals` sem clique explicito em salvar.
- Fechar o modal ou cancelar a revisao nao altera o dia atual.
- Voltar para IA ou resetar o formulario remove o rascunho pendente.
- O cadastro manual continua funcionando como antes.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Teste manual de envio, revisao, cancelamento, fechamento do modal e reabertura

### Riscos

- Misturar rascunho de IA com refeicao persistida.
- Manter estado stale ao reabrir o modal.

### O que NAO alterar

- Nao mover a persistencia principal de `/src/App.tsx` para outra arquitetura.
- Nao alterar regras de plano semanal ou qualquer outra entidade do `DailyData`.

### Reversibilidade

Reversivel por remover o estado explicito de rascunho e restaurar o fluxo anterior do formulario.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 - Garantir rascunho revisavel e salvamento somente por confirmacao explicita.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS_TAREFAS.md`
- `/src/components/MealForm.tsx`
- `/src/App.tsx`

Objetivo:
Separar rascunho de IA de dado persistido e manter o salvamento apenas sob confirmacao do usuario.

Escopo:
Editar o estado local e o fluxo do `MealForm` para deixar clara a etapa de revisao.

Fora do escopo:
Nao refatorar a persistencia global, nao mudar plano semanal, nao tocar treino.

Arquivos provaveis:
- `/src/components/MealForm.tsx`
- `/src/App.tsx`
- `/src/types.ts`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- walkthrough manual de revisao/cancelamento

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 5 - Normalizar o contrato de resposta e erro da analise alimentar

### Objetivo

Fazer com que a analise de refeicao por texto e imagem retorne apenas um rascunho valido ou um erro explicito, sem respostas parcialmente quebradas passarem como sucesso.

### Tipo da tarefa

- logica de negocio

### Pre-requisitos

- Tarefa 1 concluida.
- Escopo restrito apenas a `parseMealDescription` e `analyzeImage`.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo provavel: `/src/utils/ai/mealAnalysis.ts` ou equivalente - a confirmar na codebase

### Passos

1. Isolar ou criar uma validacao minima para o payload esperado da analise alimentar.
2. Aplicar a validacao apenas aos metodos `parseMealDescription` e `analyzeImage`.
3. Garantir que JSON invalido, campos ausentes, resposta vazia, falta de chave ou indisponibilidade retornem erro explicito.
4. Revisar o diff para garantir que nenhum outro fluxo de IA foi alterado sem justificativa.

### Criterios de aceite

- `parseMealDescription` e `analyzeImage` nao tratam mais resposta malformada como sucesso silencioso.
- O erro devolvido fica distinguivel do caso de sucesso.
- Nenhum metodo de dieta, receita ou treino foi alterado sem necessidade.

### Como validar

- `npm run lint`
- `npm run build`
- Revisao manual do diff para garantir foco apenas nos metodos de refeicao

### Riscos

- Regressao cruzada em `geminiService.ts`.
- `RISCO DE ESCOPO`: expandir a tarefa para todos os fluxos de IA do projeto.

### O que NAO alterar

- Nao alterar `parseDietText`, `generateWeeklyDiet`, `chatWithNutritionist`, `WorkoutGenerator` ou outros metodos nao ligados a refeicao.
- Nao rediscutir seguranca publica da chave da IA nesta tarefa.

### Reversibilidade

Reversivel por restaurar a implementacao anterior dos dois metodos de refeicao ou remover helper local criado para validacao.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 - Normalizar o contrato de resposta e erro da analise alimentar.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS_TAREFAS.md`
- `/src/services/geminiService.ts`
- `/src/types.ts`

Objetivo:
Fazer a analise alimentar retornar apenas sucesso valido ou erro explicito, sem tocar outros fluxos de IA.

Escopo:
Editar somente `parseMealDescription` e `analyzeImage`, com validacao minima de payload e erro.

Fora do escopo:
Nao tocar dieta semanal, treino, receitas, chat ou arquitetura de seguranca da IA.

Arquivos provaveis:
- `/src/services/geminiService.ts`
- `/src/types.ts`
- `/src/utils/ai/mealAnalysis.ts`

Validacao:
- `npm run lint`
- `npm run build`
- revisao manual do diff para garantir foco local

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 6 - Implementar fallback manual e mensagem de erro clara no MealForm

### Objetivo

Garantir que falhas de IA, offline ou resposta invalida exibam uma mensagem compreensivel e deixem o usuario continuar pelo fluxo manual sem travar a tela.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 4 concluida.
- Tarefa 5 concluida ou com contrato de erro definido.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`

### Passos

1. Exibir erro visivel ao usuario quando a analise por texto ou imagem falhar.
2. Garantir que o estado de loading sempre seja encerrado e que o botao/manual continue acessivel.
3. Oferecer retorno claro ao fluxo manual sem obrigar o usuario a fechar o app ou recarregar a pagina.
4. Garantir que erro e fallback nao escondam o aviso contextual quando o fluxo voltar a IA.

### Criterios de aceite

- Falha de IA nao derruba a tela nem fecha o modal de forma inesperada.
- O usuario entende que a IA falhou e consegue prosseguir manualmente.
- O fallback manual funciona tanto para texto quanto para imagem.
- O fluxo manual segue funcional depois da falha.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Simulacao manual de falha/offline em ambiente local controlado

### Riscos

- Mensagem generica demais e pouco acionavel.
- Estado de erro prender o usuario em loading ou em modo IA sem saida clara.

### O que NAO alterar

- Nao tocar fluxos de plano semanal, receitas ou treino.
- Nao transformar o fallback em novo fluxo arquitetural amplo.

### Reversibilidade

Reversivel por remover o bloco de erro e restaurar o comportamento anterior do formulario.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 - Implementar fallback manual e mensagem de erro clara no MealForm.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS_TAREFAS.md`
- `/src/components/MealForm.tsx`
- `/src/services/geminiService.ts`

Objetivo:
Exibir erro claro e permitir retorno imediato ao fluxo manual quando a IA alimentar falhar.

Escopo:
Editar apenas o comportamento visual e de estado do `MealForm` diante de erro.

Fora do escopo:
Nao tocar outras areas de IA, nao mudar arquitetura de rede, nao mexer em treino/plano.

Arquivos provaveis:
- `/src/components/MealForm.tsx`
- `/src/services/geminiService.ts`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- simulacao manual de falha/offline

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 7 - Garantir descarte da imagem e limpeza de estados transientes

### Objetivo

Confirmar e reforcar que imagem, base64, rascunho e erros da analise alimentar nao ficam persistidos ao fechar o modal, salvar ou recarregar o app.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefa 1 concluida.
- Tarefas 4 e 6 concluidas ou com estados locais ja estabilizados.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/hooks/useLocalStorage.ts`
- Arquivo confirmado na codebase: `/src/types.ts`

### Passos

1. Confirmar que nenhum campo de imagem ou base64 entra no schema persistido do `DailyData`.
2. Limpar explicitamente `fileInputRef`, rascunho de IA, `baseNutrients`, mensagens de erro e demais estados transientes ao salvar, cancelar ou fechar o modal.
3. Validar que reabrir o modal ou recarregar o app nao reapresenta imagem nem rascunho da analise anterior.
4. Se surgir necessidade de preview persistente da imagem, registrar `PONTO DE DECISAO` por conflito com o PRD.

### Criterios de aceite

- Nenhuma imagem ou base64 fica disponivel apos reload.
- O modal reabre limpo apos salvar, cancelar ou fechar.
- O `localStorage` do app nao passa a carregar imagem ou rascunho da IA.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Validacao manual com analise por imagem, fechamento do modal e reload
- Inspecao manual do `localStorage` do app no navegador

### Riscos

- Esquecer estado local secundario e deixar rascunho reaparecer.
- Introduzir limpeza agressiva demais e perder o fluxo manual nao relacionado.

### O que NAO alterar

- Nao alterar o schema global de persistencia alem do estritamente necessario para impedir retencao indevida.
- Nao tocar backup, importacao ou exportacao nesta tarefa.

### Reversibilidade

Reversivel por restaurar o reset anterior do formulario e remover qualquer limpeza adicional introduzida.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 7 - Garantir descarte da imagem e limpeza de estados transientes.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS_TAREFAS.md`
- `/src/components/MealForm.tsx`
- `/src/App.tsx`
- `/src/hooks/useLocalStorage.ts`

Objetivo:
Assegurar que imagem, rascunho e erro da analise alimentar nao persistam ao fechar o modal ou recarregar o app.

Escopo:
Editar apenas resets e estados transientes ligados ao fluxo de IA alimentar.

Fora do escopo:
Nao mudar backup/importacao/exportacao, nao refatorar o armazenamento global sem necessidade.

Arquivos provaveis:
- `/src/components/MealForm.tsx`
- `/src/App.tsx`
- `/src/hooks/useLocalStorage.ts`
- `/src/types.ts`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- walkthrough manual com imagem, fechamento e reload

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 8 - Adicionar testes focados do fluxo de IA alimentar

### Objetivo

Cobrir com testes automatizados os pontos mais sensiveis do fluxo de IA alimentar apos a quebra em rascunho, aviso e fallback manual.

### Tipo da tarefa

- testes

### Pre-requisitos

- Tarefas 3 a 7 concluidas conforme aplicavel.
- Confirmacao de que `npm run test` continua valido no projeto.

### Arquivos provaveis

- Arquivo provavel: `/src/components/MealForm.test.tsx` - a confirmar na codebase
- Arquivo provavel: `/src/services/geminiService.test.ts` - a confirmar na codebase
- Arquivo confirmado na codebase: `/src/test/setup.ts`
- Arquivo confirmado na codebase: `/vitest.config.ts`

### Passos

1. Reutilizar Vitest + Testing Library ja existentes no projeto.
2. Adicionar testes focados para: nenhum salvamento automatico apos retorno da IA; cancelamento/fechamento nao persiste refeicao; fallback manual continua disponivel apos erro.
3. Se houver helper local de validacao da resposta da IA, cobrir os cenarios basicos de sucesso e erro.
4. Evitar snapshots amplos, mocks desnecessarios ou infraestrutura nova.

### Criterios de aceite

- Existe cobertura automatizada para os pontos criticos do fluxo de IA alimentar.
- `npm run test` passa sem depender de infraestrutura nova.
- Os testes permanecem focados na Sprint 4.

### Como validar

- `npm run test`
- `npm run lint`
- `npm run build`

### Riscos

- Testes frageis por causa de animacoes, loading ou detalhes visuais nao essenciais.
- Expandir a tarefa para cobertura de todos os fluxos de IA do produto.

### O que NAO alterar

- Nao introduzir framework de teste novo.
- Nao escrever E2E amplo ou snapshot massivo nesta sprint.

### Reversibilidade

Reversivel por remover os testes adicionados, sem afetar comportamento de producao.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 8 - Adicionar testes focados do fluxo de IA alimentar.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS_TAREFAS.md`
- `/src/components/MealForm.tsx`
- `/src/test/setup.ts`
- `/vitest.config.ts`

Objetivo:
Criar testes focados para o fluxo de IA alimentar sem ampliar a infraestrutura de testes.

Escopo:
Adicionar testes unitarios/componentes para salvamento explicito, cancelamento e fallback manual.

Fora do escopo:
Nao criar E2E amplo, nao adicionar novo framework, nao cobrir todas as IAs do produto.

Arquivos provaveis:
- `/src/components/MealForm.test.tsx`
- `/src/services/geminiService.test.ts`
- `/src/test/setup.ts`
- `/vitest.config.ts`

Validacao:
- `npm run test`
- `npm run lint`
- `npm run build`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 9 - Executar validacao final da sprint e registrar continuidade

### Objetivo

Fechar a Sprint 4 com evidencias de validacao tecnica e manual, revisar escopo do diff e atualizar a documentacao operacional necessaria.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefas 1 a 8 concluidas conforme aplicavel.
- Qualquer `PONTO DE DECISAO` resolvido ou explicitamente registrado.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/docs/agent/CURRENT_STATE.md`
- Arquivo confirmado na codebase: `/docs/agent/HANDOFF.md`
- Arquivo confirmado na codebase: `/docs/evolution/CHANGELOG.md`
- Arquivo confirmado na codebase: `/docs/evolution/DECISIONS.md`
- Arquivo provavel: `/docs/evolution/out-of-scope-changes.md` - a confirmar na codebase

### Passos

1. Executar `test`, `lint` e `build`.
2. Validar manualmente o fluxo de texto, imagem, revisao, cancelamento, falha/offline, reabertura do modal e reload.
3. Revisar o diff para garantir que as alteracoes ficaram restritas ao escopo da Sprint 4.
4. Atualizar `CURRENT_STATE.md` e `HANDOFF.md` para continuidade.
5. Atualizar `CHANGELOG.md` se houve alteracao real no projeto e `DECISIONS.md` apenas se houve decisao humana nova.

### Criterios de aceite

- Validacoes tecnicas e manuais foram executadas e registradas.
- O diff final nao promove funcionalidades fora do escopo.
- A continuidade operacional ficou atualizada para a proxima sessao.

### Como validar

- `npm run test`
- `npm run lint`
- `npm run build`
- Revisao manual do diff final
- Walkthrough manual do fluxo de IA alimentar

### Riscos

- Declarar sprint concluida sem walkthrough manual.
- Atualizar `DECISIONS.md` sem decisao humana real.

### O que NAO alterar

- Nao criar novas funcionalidades nesta etapa.
- Nao registrar como validado algo que nao foi executado.

### Reversibilidade

Reversivel por ajustar ou remover apenas os registros documentais incorretos, sem alterar o codigo funcional validado.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 9 - Executar validacao final da sprint e registrar continuidade.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS_TAREFAS.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`
- `/docs/evolution/CHANGELOG.md`

Objetivo:
Fechar a Sprint 4 com validacoes tecnicas/manuais e documentacao de continuidade.

Escopo:
Executar validacoes, revisar escopo do diff e atualizar apenas a documentacao necessaria.

Fora do escopo:
Nao implementar funcionalidades novas, nao registrar validacao inexistente, nao reabrir arquitetura.

Arquivos provaveis:
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/evolution/out-of-scope-changes.md`

Validacao:
- `npm run test`
- `npm run lint`
- `npm run build`
- walkthrough manual completo do fluxo afetado

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
| 1 | Tarefa 1 - Mapear o fluxo real de IA alimentar e pre-condicoes | Nenhuma | Sim | Apos confirmar pontos de entrada, persistencia e pendencias |
| 2 | Tarefa 2 - Confirmar copy aprovada e estrategia de insercao do aviso | Tarefa 1 | Sim | Apos localizar a copy ou registrar `PONTO DE DECISAO` |
| 3 | Tarefa 3 - Aplicar o aviso contextual minimo no fluxo alimentar | Tarefas 1 e 2 | Nao | Apos `lint`, `build` e walkthrough visual |
| 4 | Tarefa 4 - Garantir rascunho revisavel e salvamento somente por confirmacao explicita | Tarefas 1 e 3 | Nao | Apos walkthrough de revisao/cancelamento |
| 5 | Tarefa 5 - Normalizar o contrato de resposta e erro da analise alimentar | Tarefa 1 | Sim | Apos `lint`, `build` e revisao de diff focado |
| 6 | Tarefa 6 - Implementar fallback manual e mensagem de erro clara no MealForm | Tarefas 4 e 5 | Nao | Apos simulacao de falha/offline |
| 7 | Tarefa 7 - Garantir descarte da imagem e limpeza de estados transientes | Tarefas 1, 4 e 6 | Nao | Apos validacao de reabertura e reload |
| 8 | Tarefa 8 - Adicionar testes focados do fluxo de IA alimentar | Tarefas 3 a 7 | Nao | Apos `npm run test`, `lint` e `build` |
| 9 | Tarefa 9 - Executar validacao final da sprint e registrar continuidade | Tarefas 1 a 8 | Nao | Apos walkthrough final, revisao de diff e docs atualizadas |

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
| Alteracoes amplas em `/src/services/geminiService.ts` alem de `parseMealDescription` e `analyzeImage` | O servico de IA e compartilhado com dieta, receitas e treino | Alto | Modelo forte ou revisao humana obrigatoria |
| Qualquer ajuste que exija mexer em persistencia global em `/src/App.tsx` ou `/src/hooks/useLocalStorage.ts` para suportar o fluxo de IA alimentar | Pode causar regressao em refeicoes, agua, historico e demais dados locais | Alto | Modelo forte ou checkpoint humano antes de continuar |

---

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir tarefa relevante ou ao confirmar novo risco no fluxo de IA alimentar | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando houver decisao tecnica ou regra de negocio, como aprovacao humana da copy final dos avisos | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver mudanca fora do escopo | Sim, se houver mudanca fora do escopo |

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

- `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS.md`

Se encontrar apenas um arquivo compativel, use esse arquivo como fonte principal.

Se encontrar mais de um arquivo compativel, liste os arquivos encontrados e solicite confirmacao de qual sprint deve ser quebrada.

Se esse arquivo deixar de existir, o agente deve parar e solicitar o arquivo correto ou o conteudo original da sprint.
