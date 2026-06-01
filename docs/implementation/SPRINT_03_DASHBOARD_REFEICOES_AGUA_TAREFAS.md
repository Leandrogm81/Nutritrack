# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: Sprint 3 - Dashboard, refeicoes e agua
- objetivo da sprint original: fechar o fluxo principal do dia atual com foco em dashboard diario, refeicao manual e hidratacao cumulativa
- arquivo de origem, se houver: `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`
- resumo do escopo: alinhar o Dashboard ao papel de tela inicial do dia atual
- resumo do escopo: garantir guidance quando nao houver perfil salvo
- resumo do escopo: ajustar o fluxo manual de refeicao com campos obrigatorios e opcionais corretos
- resumo do escopo: garantir registro de agua cumulativo com atualizacao imediata
- documento consultado: `/docs/agent/agent-operating-rules.md`
- documento consultado: `/docs/implementation/PLANO_IMPLEMENTACAO.md`
- documento consultado: `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`
- documento consultado: `/docs/product/PRD.md`
- documento consultado: `/docs/evolution/DECISIONS.md`
- documento consultado: `/docs/design/UI_UX_GUIDE_SECTION_16.md`
- documento consultado: `/docs/agent/CURRENT_STATE.md`
- documento consultado: `/docs/product/acceptance-criteria.md` (nao encontrado no workspace)
- ponto assumido: `CURRENT_STATE.md` indica Sprint 2 implementada e validada tecnicamente
- ponto assumido: a validacao manual completa da Sprint 2 ainda e recomendada antes de acumular mudancas no fluxo diario
- ponto assumido: `npm run lint`, `npm run build` e `npm run test` existem no `package.json`
- ponto assumido: `npm run lint` hoje cobre o typecheck via `tsc --noEmit`
- ponto a confirmar na codebase: se o guidance sem perfil deve apenas instruir ou tambem navegar para a area de Perfil
- ponto a confirmar na codebase: se o fluxo manual de refeicao deve continuar IA-first com acesso manual explicito ou mudar para manual-first (`PONTO DE DECISAO`)
- ponto a confirmar na codebase: se a regra de porcao proporcional precisa permanecer local em `MealForm.tsx` ou ser isolada em helper proprio
- ponto a confirmar na codebase: se ha padrao de testes de componente alem de `src/hooks/useLocalStorage.test.ts`

## Analise da Sprint

### Objetivo da sprint

Garantir que o usuario consiga entender o estado do dia atual, registrar refeicao manual e agua sem friccao e ver o resumo atualizado imediatamente.

### Escopo identificado

- dashboard como tela inicial do dia atual
- guidance claro quando o perfil ainda nao existe
- estados vazios compreensiveis quando o dia ainda nao tem dados
- acesso explicito ao registro manual de refeicao sem depender de IA
- validacao de nome e calorias como campos obrigatorios
- macros opcionais persistidas como `0` quando vazias
- bloqueio de valores negativos no registro manual
- remocao de refeicao com reflexo imediato no resumo do dia
- regra de porcao proporcional quando esse fluxo estiver exposto
- agua cumulativa com atualizacao imediata no dashboard

### Fora do escopo

- fluxos de IA e alteracoes em `src/services/geminiService.ts`
- planejamento alimentar semanal e aplicacao de refeicoes planejadas
- historico, exportacao e progresso final
- ajustes de treino, cardio, passos ou formulas de gasto
- criacao de edicao de refeicao se esse fluxo nao estiver exposto
- refatoracao ampla de `src/App.tsx`
- refatoracao do acoplamento entre `Dashboard.tsx` e `ActivityTracker.tsx`

### Dependencias entre partes

- a leitura/mapeamento inicial vem antes de qualquer edicao
- o guidance do dashboard precisa ser fechado antes da validacao final do fluxo diario
- o acesso ao fluxo manual de refeicao deve ser confirmado antes de endurecer validacoes de campos
- a regra de porcao proporcional depende de confirmar se o fluxo esta realmente exposto ao usuario
- a tarefa de agua pode ser executada depois do mapeamento, mas a validacao final deve cobrir dashboard, refeicao e agua juntos
- a validacao manual pendente da Sprint 2 deve ser considerada antes de seguir para tarefas que tocam `App.tsx`

### Riscos principais

- regressao no fluxo principal ao tocar `src/App.tsx`, que concentra estado, callbacks e navegacao
- `Dashboard.tsx` importa `calculateStepCalories` de `ActivityTracker.tsx`, o que cria `RISCO DE ESCOPO` ao mexer no resumo diario
- `MealForm.tsx` mistura fluxo manual e IA no mesmo componente, com risco de regressao indireta
- persistencia local mascarar erros de estado se os testes manuais nao incluirem reload
- `PONTO DE DECISAO`: trocar o modo inicial da modal de refeicao de IA para manual altera UX alem da validacao de campos
- `RISCO DE ESCOPO`: esconder ou reordenar cards de treino/cardio sem autorizacao, contrariando a diretriz de dieta e treino com peso equivalente

### Estrategia de quebra

A sprint sera dividida em mapeamento, ajuste minimo do dashboard para primeiro uso, clarificacao do acesso manual de refeicao, endurecimento das validacoes do formulario, confirmacao da regra de porcao somente se o fluxo existir, alinhamento da agua cumulativa e fechamento com validacao tecnica e manual. Cada tarefa deve produzir diff pequeno, reversivel e revisavel.

### Limites para modelo economico

- modelo economico e suficiente para mapeamento, ajustes de empty state, validacoes locais de formulario e fluxo cumulativo de agua
- modelo intermediario e recomendado quando a tarefa exigir passar callbacks novos por `App.tsx` ou isolar helper de porcao com cobertura automatizada
- qualquer tentativa de refatorar a relacao entre `Dashboard.tsx` e `ActivityTracker.tsx`, reescrever `MealForm.tsx` em varios componentes ou tocar `geminiService.ts` deve parar e ser escalada

---

# Tarefas da Sprint

## Tarefa 1 - Mapear fluxo diario atual e comandos confirmados

### Objetivo

Mapear o fluxo atual de dashboard, refeicao manual e agua para que as proximas tarefas editem apenas os pontos realmente envolvidos na Sprint 3.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- leitura de `/docs/agent/agent-operating-rules.md`
- leitura de `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`
- leitura deste arquivo de tarefas

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo confirmado na codebase: `src/components/Dashboard.tsx`
- Arquivo confirmado na codebase: `src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `src/components/WaterTracker.tsx`
- Arquivo confirmado na codebase: `src/types.ts`
- Arquivo confirmado na codebase: `package.json`
- Arquivo confirmado na codebase: `docs/agent/CURRENT_STATE.md`

### Passos

1. Ler `src/App.tsx` e identificar como o dashboard, a modal de refeicao e o tracker de agua se conectam ao estado principal.
2. Ler `src/components/Dashboard.tsx`, `src/components/MealForm.tsx` e `src/components/WaterTracker.tsx` para mapear empty states, validacoes atuais e callbacks usados.
3. Confirmar no `package.json` os comandos oficiais de `lint`, `build`, `test` e `dev`.
4. Registrar com evidencia se hoje o fluxo manual esta atras de uma entrada IA-first e se a regra de porcao aparece apenas apos preenchimento assistido.
5. Registrar riscos de acoplamento encontrados antes de qualquer edicao.

### Criterios de aceite

- os arquivos reais da Sprint 3 foram localizados e confirmados
- o caminho atual de adicionar/refeicao/remover/refeicao e adicionar agua esta descrito
- os comandos de validacao foram confirmados no `package.json`
- nenhuma alteracao funcional foi feita nesta tarefa

### Como validar

- `rg --files src`
- `Get-Content -Raw src/App.tsx`
- `Get-Content -Raw src/components/Dashboard.tsx`
- `Get-Content -Raw src/components/MealForm.tsx`
- `Get-Content -Raw src/components/WaterTracker.tsx`
- `Get-Content -Raw package.json`

### Riscos

- mapear o fluxo de forma incompleta e editar o arquivo errado nas tarefas seguintes
- ignorar o acoplamento do dashboard com treino/cardio e abrir `RISCO DE ESCOPO`

### O que NAO alterar

- nao alterar codigo de producao
- nao alterar copy de IA
- nao alterar regras de treino, cardio, passos ou historico

### Reversibilidade

Tarefa totalmente reversivel por nao exigir alteracao de codigo.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 - Mapear fluxo diario atual e comandos confirmados.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA_TAREFAS.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`
- `src/App.tsx`
- `src/components/Dashboard.tsx`
- `src/components/MealForm.tsx`
- `src/components/WaterTracker.tsx`
- `package.json`

Objetivo:
Mapear o fluxo atual do dia, os arquivos reais envolvidos e os comandos oficiais antes de qualquer edicao.

Escopo:
Ler arquivos, registrar callbacks, empty states, validacoes atuais e comandos confirmados.

Fora do escopo:
Qualquer implementacao, refatoracao ou alteracao de copy.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/Dashboard.tsx`
- `src/components/MealForm.tsx`
- `src/components/WaterTracker.tsx`
- `src/types.ts`
- `package.json`

Validacao:
- `rg --files src`
- leitura manual dos arquivos
- confirmacao dos scripts no `package.json`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 2 - Fechar guidance do Dashboard sem perfil e sem dados do dia

### Objetivo

Garantir que a tela inicial do dia atual oriente o primeiro uso quando nao houver perfil salvo e explique o proximo passo quando ainda nao existirem dados do dia.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 1 concluida
- recomendacao de validar manualmente os cenarios basicos da Sprint 2 antes de editar `src/App.tsx`

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/Dashboard.tsx`
- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo provavel: `src/types.ts` (a confirmar na codebase, apenas se novos props/tipos forem necessarios)

### Passos

1. Confirmar no dashboard atual como o app se comporta quando `data.profile` esta ausente.
2. Adicionar guidance minimo e explicito para primeiro uso sem auto-redirecionar o usuario.
3. Se o guidance precisar levar o usuario para Perfil, passar o menor callback possivel por `App.tsx`, sem alterar a navegacao inferior.
4. Ajustar o estado vazio do dia para deixar claro que refeicoes e agua ainda nao foram registradas.
5. Preservar os cards de treino/cardio ja expostos, sem reequilibrar a arquitetura visual da tela.

### Criterios de aceite

- com perfil ausente, o dashboard mostra mensagem clara e proximo passo compreensivel
- com perfil presente e nenhum dado do dia, o dashboard mostra empty state claro
- a tela continua priorizando o dia atual
- nenhum fluxo de historico, progresso, treino ou plano foi alterado sem justificativa

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- validacao manual com `localStorage` limpo e com perfil salvo

### Riscos

- `RISCO DE ESCOPO`: ao passar callback novo por `App.tsx`, tocar navegacao ou cards fora da sprint
- esconder ou rebaixar informacoes de treino/cardio alem do necessario

### O que NAO alterar

- nao alterar a barra de navegacao inferior
- nao alterar `ActivityTracker.tsx` ou formulas de gasto
- nao alterar Historico, Progresso, Plano, Treino ou IA

### Reversibilidade

Reversivel por diff pequeno concentrado em `Dashboard.tsx` e, se necessario, `App.tsx`.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 - Fechar guidance do Dashboard sem perfil e sem dados do dia.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA_TAREFAS.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`
- `/docs/product/PRD.md`
- `src/App.tsx`
- `src/components/Dashboard.tsx`

Objetivo:
Melhorar o primeiro uso do dashboard e os estados vazios do dia sem expandir a tela para fora do escopo da sprint.

Escopo:
Ajustar guidance sem perfil salvo e empty state do dia atual. Passar callback minimo via `App.tsx` apenas se necessario.

Fora do escopo:
Refatorar navegacao, mexer em treino/cardio, alterar IA, historico, plano ou progresso.

Arquivos provaveis:
- `src/components/Dashboard.tsx`
- `src/App.tsx`
- `src/types.ts` (se necessario)

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- walkthrough manual com e sem perfil salvo

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 3 - Tornar o acesso ao registro manual de refeicao explicito

### Objetivo

Garantir que o usuario consiga chegar ao formulario manual de refeicao de forma clara no fluxo diario, sem depender de uma reescrita dos fluxos de IA.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 1 concluida
- Tarefa 2 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo provavel: `src/components/Dashboard.tsx` (a confirmar na codebase, apenas se precisar reforcar CTA visual)
- Arquivo confirmado na codebase que NAO deve ser alterado nesta tarefa: `src/services/geminiService.ts`

### Passos

1. Confirmar como a modal de refeicao abre hoje e em qual modo ela inicia.
2. Tornar o caminho para o formulario manual explicito em no maximo um passo a partir do fluxo principal do dia.
3. Se a unica alternativa for trocar o modo inicial de IA para manual, registrar isso como `PONTO DE DECISAO` e preferir a menor mudanca que preserve o comportamento atual de IA.
4. Garantir que abrir e fechar a modal nao deixe o fluxo manual escondido ou confuso.
5. Preservar o acesso ao fluxo de IA como caminho secundario, sem reescrever sua logica.

### Criterios de aceite

- o usuario encontra o formulario manual de refeicao de forma clara
- o fluxo manual nao depende de alteracao em `geminiService.ts`
- o fluxo de IA continua acessivel, sem ser reescrito nesta sprint
- nenhum arquivo fora da lista provavel foi alterado sem justificativa

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- validacao manual de abrir a modal, entrar no modo manual e voltar para IA sem erro

### Riscos

- alterar a experiencia IA-first sem decisao documentada
- espalhar mudanca de UX pelo app inteiro em vez de limitar a modal de refeicao

### O que NAO alterar

- nao alterar `src/services/geminiService.ts`
- nao alterar copy legal ou avisos de IA
- nao alterar scanner, planejador semanal ou importacao de dieta

### Reversibilidade

Reversivel por diff pequeno em `MealForm.tsx` e, no maximo, `App.tsx` ou `Dashboard.tsx`.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 - Tornar o acesso ao registro manual de refeicao explicito.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA_TAREFAS.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`
- `src/App.tsx`
- `src/components/MealForm.tsx`

Objetivo:
Deixar o caminho para o registro manual de refeicao claro no fluxo diario sem reescrever a area de IA.

Escopo:
Ajustar o acesso ao modo manual da modal de refeicao e manter IA como caminho secundario.

Fora do escopo:
Mudar `geminiService.ts`, reescrever fluxos de IA, alterar scanner ou planejador semanal.

Arquivos provaveis:
- `src/components/MealForm.tsx`
- `src/App.tsx`
- `src/components/Dashboard.tsx` (se necessario)

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- walkthrough manual da modal em modo manual e IA

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 4 - Validar campos do registro manual e reset local do formulario

### Objetivo

Fechar as validacoes do formulario manual de refeicao para respeitar campos obrigatorios, opcionais e limites numericos sem criar regras novas.

### Tipo da tarefa

- logica de negocio

### Pre-requisitos

- Tarefa 3 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo provavel: `src/types.ts` (a confirmar na codebase, apenas se algum tipo local precisar ajuste minimo)

### Passos

1. Garantir que `name` e `calories` sejam obrigatorios no salvamento manual.
2. Garantir que `protein`, `carbs` e `fats` continuem opcionais e persistam como `0` quando vazios.
3. Bloquear valores negativos, `NaN` ou entradas inconsistentes antes de chamar `onAddMeal`.
4. Garantir que o estado local da modal seja resetado por completo apos salvar ou cancelar, incluindo `baseNutrients`, `portionAmount` e mensagens de erro.
5. Confirmar que a remocao de refeicao continua refletindo imediatamente no resumo diario por meio do estado ja existente, sem inventar fluxo de edicao.

### Criterios de aceite

- refeicao manual nao salva com nome vazio ou calorias invalidas
- macros vazias sao persistidas como `0`
- valores negativos nao entram no estado salvo
- abrir a modal novamente apos salvar mostra formulario limpo
- adicionar e remover refeicao continua atualizando o resumo do dia imediatamente

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- fluxo manual de adicionar refeicao valida, refeicao com macros vazias e tentativa com valores negativos

### Riscos

- quebrar o preenchimento vindo de IA por compartilhar o mesmo formulario
- deixar estado residual da porcao ou erro entre uma refeicao e outra

### O que NAO alterar

- nao criar fluxo de editar refeicao
- nao alterar a logica de parser da IA
- nao alterar planejador semanal, treino, cardio ou historico

### Reversibilidade

Reversivel por diff pequeno focado em `MealForm.tsx` e eventuais ajustes minimos de tipagem.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 - Validar campos do registro manual e reset local do formulario.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA_TAREFAS.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`
- `src/components/MealForm.tsx`
- `src/App.tsx`

Objetivo:
Fechar validacoes do formulario manual de refeicao e garantir reset limpo do estado local.

Escopo:
Validar obrigatorios, opcionais e numeros. Preservar o callback atual de adicionar/remover refeicao.

Fora do escopo:
Criar edicao de refeicao, alterar parser de IA, mexer em planejador semanal, historico ou treino.

Arquivos provaveis:
- `src/components/MealForm.tsx`
- `src/App.tsx`
- `src/types.ts` (se necessario)

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- walkthrough manual de adicionar/remover refeicao

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 5 - Confirmar regra de porcao proporcional quando o fluxo existir

### Objetivo

Confirmar e, se necessario, alinhar a regra de porcao proporcional apenas no fluxo em que ela ja estiver exposta, sem transformar isso em motor nutricional compartilhado.

### Tipo da tarefa

- logica de negocio

### Pre-requisitos

- Tarefa 1 concluida
- Tarefa 4 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/MealForm.tsx`
- Arquivo provavel a criar: `src/utils/nutrition.ts` (a confirmar na codebase; criar apenas se a extracao reduzir risco)
- Arquivo provavel a criar: `src/utils/nutrition.test.ts` (a confirmar na codebase; criar apenas se houver helper puro novo)
- Arquivo confirmado na codebase como referencia de padrao de teste: `src/hooks/useLocalStorage.test.ts`

### Passos

1. Confirmar em qual ponto a porcao proporcional aparece hoje e se ela fica exposta ao usuario final da Sprint 3.
2. Verificar se a formula atual segue `valor_base * (porcao_consumida / 100)` com arredondamento matematico padrao.
3. Ajustar a formula apenas se houver divergencia comprovada com a sprint original ou com o PRD.
4. Extrair helper puro apenas se isso reduzir risco e nao abrir refatoracao ampla.
5. Se helper puro novo for criado, adicionar cobertura automatizada minima usando o padrao existente de `vitest`.

### Criterios de aceite

- quando o fluxo de porcao estiver exposto, calorias e macros seguem a formula proporcional aprovada
- nenhuma regra nova de arredondamento foi inventada
- se nao houver helper novo, a logica permanece local e revisavel
- nenhum fluxo de biblioteca ampla de alimentos ou scanner foi introduzido

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- teste manual com porcoes `50`, `100` e `150`, se o fluxo estiver visivel

### Riscos

- `RISCO DE ESCOPO`: transformar ajuste local de porcao em refatoracao ampla de calculo nutricional
- mudar arredondamento percebido pelo usuario sem base documental

### O que NAO alterar

- nao criar biblioteca de alimentos
- nao alterar barcode scanner
- nao alterar `geminiService.ts`
- nao mover regra para varios componentes sem necessidade clara

### Reversibilidade

Reversivel por diff localizado em `MealForm.tsx` e, se houver, helper/teste novos pequenos.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 - Confirmar regra de porcao proporcional quando o fluxo existir.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA_TAREFAS.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`
- `/docs/product/PRD.md`
- `src/components/MealForm.tsx`
- `src/hooks/useLocalStorage.test.ts`

Objetivo:
Confirmar a regra de porcao proporcional e ajusta-la apenas se houver divergencia comprovada.

Escopo:
Trabalhar somente no fluxo atual de porcao. Extrair helper puro apenas se isso reduzir risco e permitir teste focado.

Fora do escopo:
Criar motor nutricional novo, mexer em IA, barcode scanner, biblioteca de alimentos ou refatoracao ampla.

Arquivos provaveis:
- `src/components/MealForm.tsx`
- `src/utils/nutrition.ts` (se necessario)
- `src/utils/nutrition.test.ts` (se necessario)

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- walkthrough manual com porcoes diferentes

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 6 - Alinhar hidratacao cumulativa e feedback imediato

### Objetivo

Garantir que o registro de agua continue cumulativo no dia, com feedback claro quando zerado e atualizacao imediata no dashboard.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefa 1 concluida
- Tarefa 2 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/WaterTracker.tsx`
- Arquivo confirmado na codebase: `src/components/Dashboard.tsx`
- Arquivo confirmado na codebase: `src/App.tsx`

### Passos

1. Confirmar o caminho atual de soma de agua em `App.tsx` e como ele aparece em `Dashboard.tsx`.
2. Ajustar o feedback visual do zero para deixar claro que a hidratacao do dia ainda nao comecou.
3. Confirmar que os incrementos rapidos continuam apenas somando no dia, sem criar decremento, historico novo ou meta secundaria.
4. Garantir que a atualizacao apareca no dashboard imediatamente apos cada toque.
5. Validar reload para confirmar que o total do dia continua persistido pelo mecanismo atual.

### Criterios de aceite

- adicionar `250 ml` e `500 ml` continua acumulando no total do dia
- o dashboard reflete o novo total imediatamente
- quando `waterMl` estiver em `0`, o usuario entende o proximo passo
- reload do app preserva o total salvo do dia

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- validacao manual com varios incrementos e reload

### Riscos

- contagem duplicada em cliques consecutivos
- tocar no estado central e gerar regressao fora de agua

### O que NAO alterar

- nao alterar historico, backup, importacao ou rollover
- nao alterar meta de agua calculada na Sprint 2
- nao criar decremento ou reset automatico nesta sprint

### Reversibilidade

Reversivel por diff pequeno em `WaterTracker.tsx`, `Dashboard.tsx` e, no maximo, `App.tsx`.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 - Alinhar hidratacao cumulativa e feedback imediato.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA_TAREFAS.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`
- `src/App.tsx`
- `src/components/Dashboard.tsx`
- `src/components/WaterTracker.tsx`

Objetivo:
Manter o fluxo de agua cumulativo, claro e com atualizacao imediata no dashboard.

Escopo:
Ajustar feedback visual e confirmar a soma cumulativa usando o estado atual.

Fora do escopo:
Historico, backup, importacao, rollover, metas novas ou decremento de agua.

Arquivos provaveis:
- `src/components/WaterTracker.tsx`
- `src/components/Dashboard.tsx`
- `src/App.tsx`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run dev`
- walkthrough manual com varios incrementos e reload

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 7 - Validacao final, regressao minima e fechamento da sprint

### Objetivo

Concluir a Sprint 3 com evidencias tecnicas e manuais, registrando o que foi validado, o que nao foi validado e qualquer decisao pendente.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefas 1 a 6 concluidas

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo confirmado na codebase: `src/components/Dashboard.tsx`
- Arquivo confirmado na codebase: `src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `src/components/WaterTracker.tsx`
- Arquivo confirmado na codebase: `docs/agent/CURRENT_STATE.md`
- Arquivo confirmado na codebase: `docs/evolution/CHANGELOG.md`

### Passos

1. Executar `npm run lint`, `npm run test` e `npm run build`.
2. Executar o fluxo manual definido na sprint original: abrir sem perfil, salvar perfil valido, adicionar agua, adicionar refeicao manual com calorias apenas, remover refeicao e confirmar retorno dos totais.
3. Validar responsividade minima em largura mobile e desktop, sem reescrever layout.
4. Revisar o diff e garantir que nenhum arquivo fora da lista provavel foi alterado sem justificativa.
5. Atualizar `CURRENT_STATE.md` e `CHANGELOG.md` apenas se houve implementacao real nesta sprint.
6. Registrar `PONTO DE DECISAO` aberto, limitacoes e riscos residuais.

### Criterios de aceite

- `lint`, `test` e `build` executaram, ou a falha/ausencia foi registrada com motivo
- o walkthrough manual principal passou sem regressao evidente
- o dashboard continua priorizando o dia atual
- o escopo ficou restrito a dashboard, refeicao manual e agua
- a documentacao de continuidade foi atualizada quando aplicavel

### Como validar

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run dev`
- validacao manual do fluxo principal do dia

### Riscos

- declarar a sprint concluida sem walkthrough manual com estado vazio e estado salvo
- deixar regressao em `App.tsx` passar por depender apenas de build

### O que NAO alterar

- nao abrir escopo para IA, treino, historico, exportacao ou arquitetura
- nao usar esta etapa para refatoracao ampla

### Reversibilidade

Reversivel por checkpoints por tarefa e, no fechamento, por rollback pontual das alteracoes documentais ou funcionais bloqueadoras.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 7 - Validacao final, regressao minima e fechamento da sprint.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA_TAREFAS.md`
- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`
- `src/App.tsx`
- `src/components/Dashboard.tsx`
- `src/components/MealForm.tsx`
- `src/components/WaterTracker.tsx`

Objetivo:
Validar a Sprint 3 completa, revisar escopo e registrar continuidade com evidencias.

Escopo:
Executar validacoes tecnicas, walkthrough manual, revisao de diff e atualizacao documental quando houver implementacao real.

Fora do escopo:
Nova funcionalidade fora da sprint, refatoracao ampla, mudanca de arquitetura, IA, treino, historico ou exportacao.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/Dashboard.tsx`
- `src/components/MealForm.tsx`
- `src/components/WaterTracker.tsx`
- `docs/agent/CURRENT_STATE.md`
- `docs/evolution/CHANGELOG.md`

Validacao:
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run dev`
- walkthrough manual do fluxo principal do dia

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
| 1 | Tarefa 1 | Nenhuma | Sim | Apos mapeamento e comandos confirmados |
| 2 | Tarefa 2 | Tarefa 1 | Nao | Apos `npm run lint` e `npm run build` |
| 3 | Tarefa 3 | Tarefas 1 e 2 | Nao | Apos walkthrough da modal em modo manual e IA |
| 4 | Tarefa 4 | Tarefa 3 | Nao | Apos validacao manual de campos obrigatorios/opcionais |
| 5 | Tarefa 5 | Tarefas 1 e 4 | Nao | Apos validar porcoes e `npm run test` |
| 6 | Tarefa 6 | Tarefas 1 e 2 | Sim | Apos validar soma cumulativa e reload |
| 7 | Tarefa 7 | Tarefas 1 a 6 | Nao | Apos validacoes finais e revisao de escopo |

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
| Refatorar o acoplamento entre `Dashboard.tsx` e `ActivityTracker.tsx` | Mistura resumo do dia com calculos de treino/cardio fora da sprint | Alto | Modelo forte + autorizacao humana |
| Reescrever `MealForm.tsx` em varios componentes para separar IA e manual | Fluxo sensivel com muitas responsabilidades e risco de regressao em IA | Medio/Alto | Modelo forte ou revisao humana obrigatoria |
| Alterar `src/services/geminiService.ts` para viabilizar o fluxo manual | IA esta fora do escopo desta sprint | Alto | Nao executar nesta sprint |

---

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir tarefa relevante ou encontrar novo erro | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando houver decisao tecnica ou regra de negocio | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver mudanca fora do escopo | Sim, se houver mudanca fora do escopo |

---

# Sprint original

O agente deve procurar automaticamente a sprint de origem em:

```text
/docs/implementation/SPRINT_*.md
```

Se o numero da sprint for conhecido, procure primeiro pelo padrao especifico:

```text
/docs/implementation/SPRINT_03_*.md
```

Para esta quebra, a sprint de origem identificada foi:

- `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md`

Se encontrar apenas um arquivo compativel, use esse arquivo como fonte principal.

Se encontrar mais de um arquivo compativel, liste os arquivos encontrados e solicite confirmacao de qual sprint deve ser quebrada.

Se nenhum arquivo de sprint for encontrado, solicite que o usuario forneca o conteudo da sprint ou indique o arquivo correto.

Nao invente o conteudo da sprint.

Nao quebre tarefas sem sprint de origem.
