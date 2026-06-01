# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: Sprint 5 - Plano alimentar
- objetivo da sprint original: alinhar o planejamento alimentar semanal para funcionar como recomendacao reutilizavel, com aplicacao manual ao dia e suporte revisavel a importacao/geracao por IA.
- arquivo de origem: `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR.md`
- resumo do escopo: fechar o planner semanal por dia e tipo de refeicao, permitir salvar/editar/remover/aplicar itens planejados ao dia, integrar importacao por texto e geracao semanal por IA com revisao obrigatoria, e preservar a liberdade de registro manual fora do plano.
- documento consultado: `/docs/agent/agent-operating-rules.md`
- documento consultado: `/docs/implementation/PLANO_IMPLEMENTACAO.md`
- documento consultado: `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR.md`
- documento consultado: `/docs/product/PRD.md`
- documento consultado: `/docs/evolution/DECISIONS.md`
- documento consultado: `/docs/design/UI_UX_GUIDE.md` (nao encontrado no workspace)
- documento consultado: `/docs/design/UI_UX_GUIDE_SECTION_16.md`
- documento consultado: `/docs/product/acceptance-criteria.md` (nao encontrado no workspace)
- ponto assumido: `npm run lint`, `npm run build`, `npm run dev` e `npm run test` estao confirmados no `package.json`.
- ponto assumido: os arquivos `/src/components/WeeklyPlanner.tsx`, `/src/components/DietGenerator.tsx`, `/src/components/MealForm.tsx`, `/src/App.tsx`, `/src/types.ts`, `/src/constants/domain.ts` e `/src/services/geminiService.ts` existem na codebase atual e participam do fluxo do planner alimentar.
- ponto assumido: na ausencia de decisao humana contraria, o MVP continua com os 4 tipos atuais (`cafe`, `almoco`, `lanche`, `jantar`) e com comportamento implicito de um slot principal por `dia + tipo`, porque a UI atual renderiza um card por tipo e usa apenas o primeiro item encontrado por slot.
- ponto assumido: na ausencia de decisao humana contraria, importacao por texto e geracao semanal podem continuar com semantica de substituicao total do plano apenas no momento da confirmacao explicita do usuario; qualquer merge parcial deve virar `PONTO DE DECISAO`.
- ponto assumido: suporte novo a upload binario de `.doc`, `.md`, `.txt` e `.pdf` nao deve ser inventado nesta sprint sem extrator real confirmado na codebase; caso apareca como necessidade, registrar `RISCO DE ESCOPO`.
- ponto que precisa ser confirmado na codebase: se existem dados persistidos com multiplos `plannedMeals` para o mesmo `dia + tipo`.
- ponto que precisa ser confirmado na codebase: se existe algum entrypoint adicional fora de `WeeklyPlanner` e `DietGenerator` que ainda escreve em `plannedMeals` sem revisao.
- ponto que precisa ser confirmado na codebase: se ha infraestrutura real para extrair texto de `.doc`, `.md`, `.txt` e `.pdf` antes da IA, ou se hoje o app aceita apenas texto colado.
- ponto que precisa ser confirmado na codebase: se existem testes automatizados cobrindo planner alimentar e IA alem de `useLocalStorage`.

## Analise da Sprint

### Objetivo da sprint

Transformar o planner alimentar em uma recomendacao semanal persistida, revisavel e separada do consumo diario real.

### Escopo identificado

- Persistencia local do plano semanal em `plannedMeals`.
- Organizacao do plano por dia da semana e tipo de refeicao.
- CRUD manual de item planejado sem gerar consumo automatico.
- Aplicacao explicita do item planejado ao dia atual.
- Importacao de dieta por texto com revisao antes de salvar.
- Geracao semanal por IA com revisao antes de salvar.
- Preservacao do fluxo manual de refeicao no dashboard, independentemente do planner.

### Fora do escopo

- Historico, exportacao e consolidacao de progresso.
- Treino, cardio, passos e planner fisico.
- OCR dedicado, parsing avancado de layout e upload binario novo sem extrator confirmado.
- Biblioteca ampla de alimentos.
- Proxy/server-side publico para IA.
- Prescricao clinica, automacao de consumo real ou bloqueio do fluxo manual.

### Dependencias entre partes

- O mapeamento do fluxo atual precisa vir antes de qualquer ajuste de regra do planner.
- A regra de slot do planner precisa estar clara antes de implementar edicao manual ou revisao de IA.
- A infraestrutura de rascunho revisavel precisa existir antes de ligar importacao por texto e geracao semanal.
- A validacao final depende de regressao do fluxo manual de refeicao e da persistencia local do planner.

### Riscos principais

- Confundir item planejado com refeicao consumida e poluir o diario real.
- Deixar duplicidades ambiguas no mesmo `dia + tipo`, enquanto a UI exibe apenas um item por slot.
- Sobrescrever o plano salvo com resposta de IA malformada ou nao revisada.
- Espalhar mudancas por `/src/App.tsx` e `/src/services/geminiService.ts` alem do minimo necessario.
- `RISCO DE ESCOPO`: transformar o requisito de texto colado em um projeto maior de importacao de arquivos sem confirmacao tecnica.
- Regressao no fluxo manual de refeicao do dashboard por acoplamento indevido com o planner.

### Estrategia de quebra

Dividir a sprint em oito blocos pequenos: mapeamento, regra de slot, CRUD manual, aplicacao explicita ao dia, infraestrutura de rascunho revisavel, integracao da importacao por texto, integracao da geracao semanal por IA e validacao/documentacao final. Cada bloco deve gerar diff pequeno, reversivel e validado antes da proxima etapa.

### Limites para modelo economico

- Adequado para modelo economico: mapeamento, ajuste local de tipos/constantes, CRUD manual do planner, copy de UI e validacoes finais.
- Modelo intermediario recomendado: regras de slot do planner, handlers de aplicacao explicita ao diario e compartilhamento de estado de rascunho entre componentes.
- Modelo forte recomendado: qualquer decisao de merge parcial de plano, hardening de normalizacao da IA, suporte novo a importacao de arquivos, ou refatoracao ampla de `/src/App.tsx` e `/src/services/geminiService.ts`.

---

# Tarefas da Sprint

## Tarefa 1 - Mapear o fluxo atual do planner alimentar e as decisoes abertas

### Objetivo

Levantar o comportamento real atual do planner alimentar, identificar pontos de escrita em `plannedMeals` e separar lacunas confirmadas de hipoteses.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- Leitura de `/docs/agent/agent-operating-rules.md`.
- Leitura desta sprint quebrada e da sprint original.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/WeeklyPlanner.tsx`
- Arquivo confirmado na codebase: `/src/components/DietGenerator.tsx`
- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo confirmado na codebase: `/src/constants/domain.ts`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`

### Passos

1. Ler os arquivos do fluxo alimentar semanal e localizar todos os pontos que leem ou escrevem `plannedMeals`.
2. Confirmar quais fluxos hoje salvam direto no planner sem revisao e quais apenas registram consumo diario.
3. Confirmar se existe suporte real a edicao de item planejado, a revisao de rascunho e a importacao de arquivos alem de texto colado.
4. Registrar as decisoes abertas encontradas como `PONTO DE DECISAO` ou `RISCO DE ESCOPO`, sem alterar comportamento funcional.

### Criterios de aceite

- Todos os entrypoints atuais que escrevem `plannedMeals` foram listados.
- Ficou claro se o fluxo atual usa substituicao integral, merge parcial ou comportamento ambiguo.
- Lacunas confirmadas foram separadas de hipoteses.
- Nenhuma alteracao funcional foi feita nesta etapa.

### Como validar

- `rg -n "plannedMeals|parseDietText|generateWeeklyDiet|onUpdatePlanner|onLogMeal" src`
- Revisao de diff com expectativa de diff nulo ou apenas anotacoes/documentacao local estritamente necessarias.

### Riscos

- Mapeamento incompleto levar a mudancas inseguras nas tarefas seguintes.

### O que NAO alterar

- Nao alterar UI, persistencia, tipos ou servicos nesta tarefa.

### Reversibilidade

Reversivel por descartar qualquer anotacao auxiliar produzida nesta etapa, sem impacto funcional.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 - Mapear o fluxo atual do planner alimentar e as decisoes abertas.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR_TAREFAS.md`
- `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR.md`
- `/src/components/WeeklyPlanner.tsx`
- `/src/components/DietGenerator.tsx`
- `/src/App.tsx`
- `/src/services/geminiService.ts`

Objetivo:
Mapear o comportamento atual do planner alimentar e identificar pontos de risco antes de editar.

Escopo:
Ler arquivos, localizar escritas em `plannedMeals`, confirmar lacunas e registrar `PONTO DE DECISAO` ou `RISCO DE ESCOPO` quando necessario.

Fora do escopo:
Qualquer mudanca funcional de UI, estado, IA, persistencia ou arquitetura.

Arquivos provaveis:
- `/src/components/WeeklyPlanner.tsx`
- `/src/components/DietGenerator.tsx`
- `/src/components/MealForm.tsx`
- `/src/App.tsx`
- `/src/types.ts`
- `/src/constants/domain.ts`
- `/src/services/geminiService.ts`

Validacao:
- `rg -n "plannedMeals|parseDietText|generateWeeklyDiet|onUpdatePlanner|onLogMeal" src`
- revisao de diff nulo ou minimo

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 2 - Alinhar a regra do planner por dia e tipo de refeicao

### Objetivo

Garantir que o estado do planner represente recomendacoes por `dia + tipo`, sem acionar consumo real e sem deixar ambiguidade nao tratada no slot semanal.

### Tipo da tarefa

- modelo/tipos

### Pre-requisitos

- Tarefa 1 concluida.
- Confirmacao de como a UI atual trata duplicidades por `dia + tipo`.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo confirmado na codebase: `/src/constants/domain.ts`
- Arquivo confirmado na codebase: `/src/components/WeeklyPlanner.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo provavel: `/src/utils/planner/*` - a confirmar na codebase

### Passos

1. Confirmar a regra minima do slot semanal em cima do comportamento atual da UI e do PRD.
2. Aplicar ajuste minimo em tipos, constantes ou helper para manter o planner separado do diario real.
3. Se houver duplicidade existente no mesmo `dia + tipo`, tratar a ambiguidade sem apagar dados silenciosamente; se a estrategia nao estiver clara, registrar `PONTO DE DECISAO`.
4. Corrigir apenas o necessario para compilar e manter o planner persistido em `plannedMeals`.

### Criterios de aceite

- A representacao do planner continua separada de `meals`.
- A regra de slot semanal ficou explicita no codigo ou em helper dedicado.
- Nao houve criacao automatica de refeicao consumida como efeito colateral.
- Qualquer ambiguidade de merge ou multiplos itens no mesmo slot foi registrada como `PONTO DE DECISAO`.

### Como validar

- `npm run lint`
- `npm run build`
- Validacao manual: abrir um plano salvo, recarregar o app e confirmar que apenas `plannedMeals` foi afetado.

### Riscos

- Normalizacao apressada apagar ou sobrescrever dados planejados existentes.
- `RISCO DE ESCOPO` se a tarefa evoluir para suportar multiplos itens por slot sem decisao humana.

### O que NAO alterar

- Nao alterar o historico diario, analytics, treino ou fluxo manual do dashboard.
- Nao mudar os tipos padrao de refeicao sem aprovacao humana.

### Reversibilidade

Reversivel por restaurar o contrato anterior e remover helper/ajuste de normalizacao criado nesta etapa.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 - Alinhar a regra do planner por dia e tipo de refeicao.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR_TAREFAS.md`
- `/src/types.ts`
- `/src/constants/domain.ts`
- `/src/components/WeeklyPlanner.tsx`
- `/src/App.tsx`

Objetivo:
Explicitar a regra de slot do planner semanal sem misturar planejamento com consumo real.

Escopo:
Ajustar tipos, constantes e helper minimo ligado ao planner, tratando ambiguidade de slot de forma segura.

Fora do escopo:
Criar multiplos itens por slot sem decisao humana, alterar diario real, refatorar o app inteiro ou mexer em treino.

Arquivos provaveis:
- `/src/types.ts`
- `/src/constants/domain.ts`
- `/src/components/WeeklyPlanner.tsx`
- `/src/App.tsx`
- `/src/utils/planner/*`

Validacao:
- `npm run lint`
- `npm run build`
- recarga manual do app com planner salvo

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 3 - Fechar o CRUD manual do planner semanal

### Objetivo

Permitir criar, editar e remover item planejado por dia e tipo de refeicao sem gerar consumo automatico.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 2 concluida.
- Regra de slot semanal minimamente definida.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/WeeklyPlanner.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo provavel: `/src/utils/planner/*` - a confirmar na codebase

### Passos

1. Reaproveitar o modal existente ou criar um modo de edicao minimo para item planejado.
2. Garantir que editar um slot atualize o item planejado correto em vez de criar consumo diario.
3. Manter remocao individual e limpeza total apenas dentro do planner semanal.
4. Preservar os estados de vazio, sucesso e erro sem alterar a navegacao principal do app.

### Criterios de aceite

- O usuario consegue adicionar um item planejado novo por dia e tipo.
- O usuario consegue editar um item planejado existente sem duplicar o slot principal.
- O usuario consegue remover um item planejado e limpar o plano semanal sem tocar o diario real.
- O plano editado continua disponivel apos fechar e reabrir o app.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Validacao manual: criar, editar, remover e reabrir o planner.

### Riscos

- Editar o slot errado e sobrescrever planejamento existente.
- Alteracao de UI maior que o necessario para um modelo economico.

### O que NAO alterar

- Nao alterar o `MealForm` do dashboard alem do estritamente necessario para compatibilidade.
- Nao criar consumo automatico ou regras nutricionais novas.

### Reversibilidade

Reversivel por restaurar o modal e os handlers anteriores do planner semanal.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 - Fechar o CRUD manual do planner semanal.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR_TAREFAS.md`
- `/src/components/WeeklyPlanner.tsx`
- `/src/App.tsx`
- `/src/types.ts`

Objetivo:
Permitir criar, editar e remover itens planejados sem gerar refeicoes consumidas automaticamente.

Escopo:
Ajustar apenas a UI e os handlers do planner semanal para CRUD manual seguro.

Fora do escopo:
Refatoracao ampla do app, mudanca de historico, treino ou novas regras de negocio fora do planner.

Arquivos provaveis:
- `/src/components/WeeklyPlanner.tsx`
- `/src/App.tsx`
- `/src/types.ts`
- `/src/utils/planner/*`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- teste manual de criar, editar, remover e recarregar

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 4 - Garantir aplicacao manual explicita do plano ao dia

### Objetivo

Reforcar que o item planejado so entra no diario de hoje apos acao explicita do usuario, preservando o fluxo manual independente.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefas 2 e 3 concluidas.
- Fluxo manual de refeicao no dashboard conhecido.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/WeeklyPlanner.tsx`
- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo provavel: `/src/utils/planner/*` - a confirmar na codebase

### Passos

1. Revisar o handler atual de `Registrar` do planner e garantir que ele seja o unico ponto de aplicacao do item planejado ao dia.
2. Confirmar que salvar, editar, importar ou gerar plano nao dispara `handleAddMeal` nem preenche o dashboard silenciosamente.
3. Manter o fluxo manual do `MealForm` utilizavel com ou sem plano salvo.
4. Adicionar feedback minimo de sucesso ou erro apenas se isso for necessario para deixar a acao explicita e revisavel.

### Criterios de aceite

- Nenhum item planejado entra em `meals` apenas por salvar, editar, importar, gerar ou abrir o planner.
- Um clique explicito em `Registrar` adiciona exatamente um item ao diario do dia atual.
- O `MealForm` continua permitindo registro manual mesmo sem qualquer item planejado.
- O dashboard continua exibindo o consumo real separado do plano semanal.

### Como validar

- `npm run build`
- `npm run dev`
- Validacao manual: salvar plano, recarregar, confirmar ausencia de consumo automatico, depois clicar em `Registrar` e verificar o dashboard.

### Riscos

- Acoplamento indevido entre planner e dashboard criar duplicacao acidental.
- Ajuste no `App.tsx` espalhar efeitos para outras areas.

### O que NAO alterar

- Nao alterar a estrutura do historico diario.
- Nao bloquear o fluxo manual de refeicao com base na existencia de plano.

### Reversibilidade

Reversivel por restaurar os handlers anteriores e remover feedbacks/adaptacoes pontuais desta etapa.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 - Garantir aplicacao manual explicita do plano ao dia.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR_TAREFAS.md`
- `/src/components/WeeklyPlanner.tsx`
- `/src/components/MealForm.tsx`
- `/src/App.tsx`

Objetivo:
Garantir que o plano alimentar so vire consumo diario por acao explicita do usuario.

Escopo:
Revisar e ajustar apenas os handlers e sinais de UI ligados a registrar item planejado no dia.

Fora do escopo:
Mudar historico, analytics, treino ou travar o fluxo manual por causa do planner.

Arquivos provaveis:
- `/src/components/WeeklyPlanner.tsx`
- `/src/components/MealForm.tsx`
- `/src/App.tsx`
- `/src/utils/planner/*`

Validacao:
- `npm run build`
- `npm run dev`
- teste manual de salvar plano, recarregar e depois registrar no dia

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 5 - Preparar um rascunho revisavel compartilhado para entradas de IA

### Objetivo

Criar uma camada de rascunho temporario para importacao e geracao por IA, de modo que o plano so seja persistido apos revisao e confirmacao explicita.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefas 2 a 4 concluidas.
- Estrategia minima de slot semanal definida.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/WeeklyPlanner.tsx`
- Arquivo confirmado na codebase: `/src/components/DietGenerator.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo provavel: `/src/utils/planner/*` - a confirmar na codebase
- Arquivo provavel: `/src/components/shared/*` - a confirmar na codebase

### Passos

1. Definir onde o rascunho revisavel vai viver temporariamente sem entrar em `DailyData` antes da confirmacao.
2. Preparar uma superficie minima para revisar, editar, confirmar ou cancelar o rascunho.
3. Manter a semantica padrao de confirmacao o mais simples possivel; se surgir necessidade de merge parcial, registrar `PONTO DE DECISAO` em vez de inventar regra.
4. Garantir que cancelar o rascunho descarte apenas o draft e preserve o plano salvo anteriormente.

### Criterios de aceite

- Existe um estado de rascunho separado de `plannedMeals`.
- O usuario consegue revisar e editar o rascunho antes de salvar.
- Cancelar o rascunho nao altera o plano ja salvo.
- Confirmar o rascunho dispara apenas uma atualizacao controlada do planner.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Validacao manual: abrir rascunho, editar um item, cancelar e confirmar em ciclos separados.

### Riscos

- Persistir rascunho cedo demais e perder a separacao entre recomendacao e dado salvo.
- `RISCO DE ESCOPO` ao tentar resolver merge parcial, historico de versoes ou comparacao complexa de planos.

### O que NAO alterar

- Nao persistir o rascunho dentro de `DailyData` antes da confirmacao.
- Nao criar sistema novo de upload de arquivos ou historico de revisoes.

### Reversibilidade

Reversivel por remover o estado de rascunho e a superficie temporaria de revisao, voltando ao fluxo anterior.

### Modelo recomendado

- modelo forte recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 - Preparar um rascunho revisavel compartilhado para entradas de IA.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR_TAREFAS.md`
- `/src/components/WeeklyPlanner.tsx`
- `/src/components/DietGenerator.tsx`
- `/src/App.tsx`

Objetivo:
Criar um rascunho temporario para IA que so vire plano salvo depois de revisao e confirmacao.

Escopo:
Adicionar estado de draft e UI minima de revisar, editar, cancelar e confirmar.

Fora do escopo:
Merge parcial complexo, upload de arquivos novo, historico de revisoes, refatoracao ampla da aplicacao.

Arquivos provaveis:
- `/src/components/WeeklyPlanner.tsx`
- `/src/components/DietGenerator.tsx`
- `/src/App.tsx`
- `/src/utils/planner/*`
- `/src/components/shared/*`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- teste manual de abrir, editar, cancelar e confirmar rascunho

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 6 - Integrar a importacao de dieta por texto ao rascunho revisavel

### Objetivo

Fazer com que o texto colado gere um rascunho editavel de plano semanal, sem sobrescrever o planner salvo antes da confirmacao.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefa 5 concluida.
- `parseDietText` mapeado e contrato esperado conhecido.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/WeeklyPlanner.tsx`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivo provavel: `/src/utils/planner/*` - a confirmar na codebase

### Passos

1. Manter o fluxo de texto colado na `WeeklyPlanner`, mas redirecionar o resultado para o rascunho em vez de salvar direto.
2. Normalizar ou validar o retorno da IA para dias e tipos aprovados antes de exibir o rascunho.
3. Exibir erro claro quando a IA nao retornar itens validos e manter o plano salvo intacto.
4. Se a codebase nao tiver extrator real de arquivos, registrar explicitamente que esta tarefa cobre apenas texto colado para evitar `RISCO DE ESCOPO`.

### Criterios de aceite

- Texto colado nao sobrescreve mais o plano salvo imediatamente.
- O usuario consegue revisar, editar, cancelar ou confirmar o rascunho vindo do texto.
- Erro de parse nao apaga o plano semanal ja salvo.
- O escopo da tarefa permanece restrito a texto colado, salvo se extrator real ja existir e estiver confirmado na codebase.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Validacao manual: importar texto valido, cancelar; importar texto valido, confirmar; importar texto invalido e verificar erro sem perda do plano salvo.

### Riscos

- Retorno malformado da IA quebrar o rascunho ou gerar dias/tipos invalidos.
- `RISCO DE ESCOPO` se a tarefa crescer para upload binario ou parsing complexo sem base pronta.

### O que NAO alterar

- Nao implementar OCR dedicado.
- Nao inventar upload novo de `.doc`, `.md`, `.txt` ou `.pdf` sem suporte confirmado na codebase.

### Reversibilidade

Reversivel por restaurar o fluxo anterior de texto colado e remover a ponte com o estado de rascunho.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 - Integrar a importacao de dieta por texto ao rascunho revisavel.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR_TAREFAS.md`
- `/src/components/WeeklyPlanner.tsx`
- `/src/services/geminiService.ts`

Objetivo:
Fazer o texto colado gerar um rascunho revisavel em vez de salvar direto no planner.

Escopo:
Ligar `parseDietText` ao estado de rascunho, validar o retorno e manter erro claro sem perder o plano salvo.

Fora do escopo:
Upload binario novo, OCR, parsing avancado de layout, refatoracao ampla de IA.

Arquivos provaveis:
- `/src/components/WeeklyPlanner.tsx`
- `/src/services/geminiService.ts`
- `/src/utils/planner/*`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- teste manual com texto valido e invalido

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 7 - Integrar a geracao semanal por IA ao rascunho revisavel

### Objetivo

Fazer com que a geracao semanal de dieta entregue um rascunho revisavel antes de atualizar o planner, mantendo o bloqueio por perfil e corrigindo a copy que hoje promete atualizacao automatica.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefa 5 concluida.
- Fluxo de perfil e geracao semanal mapeados na Tarefa 1.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/DietGenerator.tsx`
- Arquivo confirmado na codebase: `/src/components/WeeklyPlanner.tsx`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo provavel: `/src/utils/planner/*` - a confirmar na codebase

### Passos

1. Manter a validacao de perfil obrigatoria antes de gerar a dieta semanal.
2. Redirecionar o retorno de `generateWeeklyDiet` para o rascunho compartilhado, sem atualizar `plannedMeals` automaticamente.
3. Ajustar mensagens de sucesso, loading e explicacao para refletir revisao obrigatoria antes de salvar.
4. Evitar tocar em funcoes de chat nutricional nao usadas na superficie atual, a menos que a codebase confirme dependencia direta.

### Criterios de aceite

- Sem perfil preenchido, a geracao continua bloqueada com erro claro.
- Com perfil valido, a IA gera rascunho revisavel e o plano salvo permanece intacto ate a confirmacao.
- A copy nao afirma mais que o planner foi atualizado automaticamente.
- Cancelar a revisao nao apaga o plano salvo anteriormente.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- Validacao manual: tentar gerar sem perfil; gerar com perfil; cancelar o rascunho; confirmar o rascunho.

### Riscos

- Resposta da IA vir fora do shape esperado e quebrar a revisao.
- Alteracao indevida em `geminiService` afetar outras superficies de IA alimentar.

### O que NAO alterar

- Nao alterar `chatWithNutritionist` ou outras superficies de IA que nao estejam confirmadas na navegacao atual.
- Nao transformar a geracao semanal em prescricao ou automacao de consumo.

### Reversibilidade

Reversivel por restaurar o fluxo anterior do `DietGenerator` e remover a integracao com o estado de rascunho.

### Modelo recomendado

- modelo forte recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 7 - Integrar a geracao semanal por IA ao rascunho revisavel.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR_TAREFAS.md`
- `/src/components/DietGenerator.tsx`
- `/src/components/WeeklyPlanner.tsx`
- `/src/services/geminiService.ts`
- `/src/App.tsx`

Objetivo:
Fazer a geracao semanal por IA passar por revisao obrigatoria antes de atualizar o planner.

Escopo:
Manter bloqueio por perfil, enviar o resultado para rascunho e ajustar as mensagens para refletir revisao antes de salvar.

Fora do escopo:
Refatorar chats de IA nao usados, criar backend/proxy, alterar regra de consumo diario ou mexer em treino.

Arquivos provaveis:
- `/src/components/DietGenerator.tsx`
- `/src/components/WeeklyPlanner.tsx`
- `/src/services/geminiService.ts`
- `/src/App.tsx`
- `/src/utils/planner/*`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- teste manual com e sem perfil, incluindo cancelamento e confirmacao do rascunho

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 8 - Validar regressao da sprint e registrar continuidade

### Objetivo

Fechar a sprint com validacoes tecnicas, revisao de escopo e atualizacao dos documentos operacionais necessarios.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefas 2 a 7 concluidas conforme aplicavel.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/docs/agent/CURRENT_STATE.md`
- Arquivo confirmado na codebase: `/docs/evolution/CHANGELOG.md`
- Arquivo confirmado na codebase: `/docs/evolution/DECISIONS.md`
- Arquivo provavel: `/docs/evolution/out-of-scope-changes.md` - a confirmar na codebase

### Passos

1. Executar as validacoes tecnicas finais da sprint.
2. Reexecutar o fluxo manual principal do planner e o fluxo manual de refeicao do dashboard.
3. Revisar o diff final contra a sprint original e registrar qualquer `PONTO DE DECISAO`, `RISCO DE ESCOPO` ou limitacao residual.
4. Atualizar `CURRENT_STATE`, `CHANGELOG`, `DECISIONS` e `out-of-scope-changes` apenas quando houver gatilho real.

### Criterios de aceite

- `lint`, `build` e a validacao manual principal foram executados e registrados.
- O fluxo manual de refeicao continua funcionando com e sem plano salvo.
- O escopo final foi conferido contra a Sprint 5 original e o PRD.
- Pendencias e riscos residuais ficaram documentados.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- Validacao manual: criar plano, editar, aplicar ao dia, importar texto com revisao, gerar plano com revisao e recarregar o app.

### Riscos

- Declarar conclusao sem evidencia suficiente.
- Corrigir regressao de ultima hora e acabar ampliando escopo sem perceber.

### O que NAO alterar

- Nao introduzir novas features nesta etapa.
- Nao fazer refatoracao ampla fora do que for estritamente bloqueador para aprovar a sprint.

### Reversibilidade

Reversivel por ajustar ou remover registros documentais incorretos e descartar correcoes de ultima hora nao aprovadas.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 8 - Validar regressao da sprint e registrar continuidade.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR_TAREFAS.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/evolution/DECISIONS.md`

Objetivo:
Validar a Sprint 5 e registrar evidencias e continuidade.

Escopo:
Executar validacoes, revisar escopo final e atualizar documentos operacionais quando houver gatilho real.

Fora do escopo:
Criar novas funcionalidades ou refatoracoes nao planejadas.

Arquivos provaveis:
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/evolution/out-of-scope-changes.md`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- validacao manual completa do fluxo da sprint

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
| 1 | Tarefa 1 - Mapear o fluxo atual do planner alimentar e as decisoes abertas | Nenhuma | Sim | Apos mapeamento validado |
| 2 | Tarefa 2 - Alinhar a regra do planner por dia e tipo de refeicao | Tarefa 1 | Nao | Apos `npm run lint` e `npm run build` |
| 3 | Tarefa 3 - Fechar o CRUD manual do planner semanal | Tarefa 2 | Nao | Apos validacao manual de criar/editar/remover |
| 4 | Tarefa 4 - Garantir aplicacao manual explicita do plano ao dia | Tarefas 2 e 3 | Nao | Apos validacao manual no dashboard |
| 5 | Tarefa 5 - Preparar um rascunho revisavel compartilhado para entradas de IA | Tarefas 2 a 4 | Nao | Apos ciclo de editar/cancelar/confirmar draft |
| 6 | Tarefa 6 - Integrar a importacao de dieta por texto ao rascunho revisavel | Tarefa 5 | Nao | Apos teste manual com texto valido e invalido |
| 7 | Tarefa 7 - Integrar a geracao semanal por IA ao rascunho revisavel | Tarefa 5 | Nao | Apos teste manual com e sem perfil |
| 8 | Tarefa 8 - Validar regressao da sprint e registrar continuidade | Tarefas 2 a 7 | Nao | Apos consolidar evidencias e docs |

- Fazer checkpoint de commit ao fim das Tarefas 2, 4, 5, 6 e 7.
- Validar manualmente a Tarefa 4 antes de iniciar a Tarefa 5; a separacao entre planejado e consumido e o principal guardrail da sprint.
- As Tarefas 6 e 7 podem compartilhar a mesma infraestrutura de rascunho, mas cada uma deve ser validada isoladamente antes da proxima.
- As Tarefas 5 e 7 nao devem seguir com modelo economico se exigirem merge parcial de plano, refatoracao ampla de `App.tsx` ou hardening pesado de resposta de IA.

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
| Tarefa 5 - rascunho revisavel compartilhado | Envolve estrategia de confirmacao do plano e risco de persistencia indevida ou perda de dados | Alto | Modelo forte ou revisao humana obrigatoria |
| Tarefa 7 - geracao semanal por IA com revisao | Envolve integracao com IA, normalizacao de resposta e copy sensivel sobre autoatualizacao | Alto | Modelo forte |
| Merge parcial do plano atual com rascunho importado/gerado | Regra de negocio nao confirmada na sprint original e com alto risco de sobrescrita incorreta | Alto | `PONTO DE DECISAO` + validacao humana |
| Suporte novo a `.doc`, `.md`, `.txt` e `.pdf` sem extrator real confirmado | Envolve parsing, dependencias adicionais e alto risco de ampliar escopo | Medio/Alto | Validacao humana antes de implementar |
| Refatoracao ampla de `/src/App.tsx` ou `/src/services/geminiService.ts` | Sao pontos centrais do brownfield com impacto transversal | Alto | Quebrar em diffs pequenos ou migrar para modelo forte |

---

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir tarefa relevante ou encontrar novo erro | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando houver decisao tecnica ou regra de negocio | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver mudanca fora do escopo | Sim, se houver mudanca fora do escopo |
