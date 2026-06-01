# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: Sprint 6 - Progresso, historico e exportacao
- objetivo da sprint original: separar com clareza Historico e Progresso, fechar o conjunto minimo de metricas corporais e concluir a exportacao minima de 7 dias sem ambiguidade nos dados
- arquivo de origem, se houver: `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- resumo do escopo: alinhar a tela de Progresso ao minimo aprovado; tornar Historico uma tela de primeiro nivel; fechar o contrato do historico diario e do rollover; ajustar exportacao CSV/PDF do recorte minimo do MVP
- documentos consultados: `/docs/agent/agent-operating-rules.md`; `/docs/implementation/PLANO_IMPLEMENTACAO.md`; `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`; `/docs/product/PRD.md`; `/docs/product/acceptance-criteria.md` (nao encontrado no workspace); `/docs/evolution/DECISIONS.md`; `/docs/design/UI_UX_GUIDE.md` (nao encontrado; usada referencia complementar `/docs/design/UI_UX_GUIDE_SECTION_16.md`)
- pontos assumidos: Sprint 0 a Sprint 5 estao concluidas; `npm run lint`, `npm run build` e `npm run test` existem no `package.json`; a exportacao CSV/PDF atual esta em `src/components/HistoryCalendar.tsx`; o rollover atual salva apenas refeicoes, agua, treino, cardio e passos em `data.history`
- pontos que precisam ser confirmados na codebase: impacto real de mudancas em `DailyHistoryEntry` sobre `src/services/geminiService.ts`; existencia de qualquer consumer adicional de `data.history`; padrao visual desejado para feedback de exportacao; estrategia final para a navegacao inferior com Historico como item de primeiro nivel

## Analise da Sprint

### Objetivo da sprint

Entregar separacao clara entre Historico e Progresso e fechar o historico/exportacao minima sem recalcular o passado por inferencia.

### Escopo identificado

- Historico precisa deixar de ficar escondido sob Perfil e passar a ter caminho proprio.
- Progresso precisa refletir o conjunto minimo aprovado para peso, bioimpedancia opcional e metricas comparativas.
- O contrato de `DailyHistoryEntry` precisa ser revisado antes de exportacao final.
- O rollover diario precisa seguir exatamente o contrato aprovado para o historico.
- CSV e PDF precisam usar o mesmo recorte minimo de 7 dias.
- A validacao da sprint precisa cobrir navegacao, historico, progresso, exportacao e regressao do rollover.

### Fora do escopo

- Relatorios avancados semanais ou mensais.
- Filtros analiticos sofisticados.
- Sync em nuvem, login, backend ou mudanca arquitetural ampla.
- Regras novas de cardio, treino, planner alimentar ou IA.
- Alterar o escopo do snapshot historico sem decisao humana.
- Backup, importacao e reset alem de nao quebrar o que ja existe.

### Dependencias entre partes

- O mapeamento inicial precisa acontecer antes de qualquer alteracao em `App.tsx`, `Analytics.tsx` ou `HistoryCalendar.tsx`.
- `PONTO DE DECISAO`: o contrato final de Progresso e o snapshot historico precisam ser aprovados antes das tarefas de contrato, rollover e exportacao.
- A separacao de navegacao precisa estar funcional antes da validacao manual de Historico versus Progresso.
- A exportacao minima depende de um contrato diario fechado e de um dataset unificado de 7 dias.
- Se o contrato do historico mudar, os consumers de `data.history` precisam ser revisados antes de concluir a sprint.

### Riscos principais

- `RISCO DE ESCOPO`: tocar `src/App.tsx` pode espalhar alteracoes pela navegacao principal.
- Mudar `DailyHistoryEntry` sem migracao segura pode distorcer historico ja salvo.
- Reaproveitar metas atuais para dias passados pode produzir exportacao aparentemente correta, mas errada.
- Adicionar Historico na navegacao inferior pode quebrar responsividade mobile se a distribuicao de botoes nao for revista.
- CSV e PDF podem divergir entre si se cada formato continuar montando dados por conta propria.
- O rollover pode duplicar ou sobrescrever dias se a logica for alterada sem simulacao de mudanca de data.

### Estrategia de quebra

Quebrar a sprint em blocos pequenos e revisaveis: primeiro mapear a codebase real, depois fechar os bloqueios de decisao humana, em seguida expor Historico de forma segura na navegacao, ajustar a superficie de Progresso, fechar contrato e rollover do historico, unificar a montagem do recorte de 7 dias para exportacao e finalizar com regressao/documentacao.

### Limites para modelo economico

- Modelo economico e suficiente para mapeamento, ajustes localizados de navegacao, copy, estados vazios, extracao de dataset de exportacao e ajuste de CSV/PDF depois do contrato fechado.
- Modelo intermediario e recomendado para mudancas visuais da navegacao inferior e para consolidar a tela de Progresso sem remover valor acidental.
- Modelo forte e recomendado para decidir/implementar snapshot historico, migracao de contrato e rollover, porque isso toca regra de negocio, integridade de dados e varios consumers.

---

# Tarefas da Sprint

## Tarefa 1 - Mapear superficies reais de Progresso, Historico, rollover e exportacao

### Objetivo

Mapear com evidencia os arquivos, contratos e fluxos reais envolvidos na Sprint 6 antes de qualquer alteracao.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- Leitura de `/docs/agent/agent-operating-rules.md`
- Leitura de `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- Leitura de `/docs/implementation/PLANO_IMPLEMENTACAO.md`

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo confirmado na codebase: `src/components/Analytics.tsx`
- Arquivo confirmado na codebase: `src/components/HistoryCalendar.tsx`
- Arquivo confirmado na codebase: `src/types.ts`
- Arquivo confirmado na codebase: `src/utils/rollover.ts`
- Arquivo confirmado na codebase: `src/utils/stateMigration.ts`
- Arquivo confirmado na codebase: `src/services/geminiService.ts` (confirmar impacto real na execucao antes de editar)
- Arquivo confirmado na codebase: `package.json`

### Passos

1. Confirmar onde Progresso e Historico sao renderizados hoje e como a navegacao chega a cada area.
2. Confirmar o shape atual de `DailyHistoryEntry`, `DailyData.history` e `todayData`.
3. Confirmar onde o rollover escreve o historico e quais campos ficam de fora.
4. Confirmar onde CSV e PDF sao montados hoje e se existe utilitario reutilizavel.
5. Registrar os caminhos confirmados e os bloqueios reais para as tarefas seguintes.

### Criterios de aceite

- O ponto real de navegacao de Progresso e Historico foi identificado.
- O contrato atual do historico diario foi listado com os campos presentes e ausentes.
- O local real do rollover e da exportacao foi confirmado.
- Os comandos oficiais de validacao foram confirmados no `package.json`.
- Nenhum arquivo de codigo foi alterado nesta tarefa.

### Como validar

- Validacao manual por leitura da codebase.
- Confirmacao dos scripts em `package.json`.

### Riscos

- Mapeamento incompleto levar a alteracao no arquivo errado.
- Ignorar consumer secundario de `data.history` e gerar regressao depois.

### O que NAO alterar

- Nao alterar codigo de producao.
- Nao registrar decisao de negocio por inferencia.

### Reversibilidade

Tarefa totalmente reversivel porque nao deve gerar alteracao funcional.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 - Mapear superficies reais de Progresso, Historico, rollover e exportacao.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO_TAREFAS.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- `/docs/implementation/PLANO_IMPLEMENTACAO.md`
- `src/App.tsx`
- `src/components/Analytics.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/types.ts`
- `src/utils/rollover.ts`
- `src/utils/stateMigration.ts`
- `package.json`

Objetivo:
Mapear os pontos reais de navegacao, historico, rollover e exportacao da Sprint 6.

Escopo:
Ler a codebase, confirmar caminhos e listar riscos/dependencias sem alterar comportamento.

Fora do escopo:
Qualquer implementacao, refatoracao ou decisao de negocio.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/Analytics.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/types.ts`
- `src/utils/rollover.ts`
- `src/utils/stateMigration.ts`
- `src/services/geminiService.ts`
- `package.json`

Validacao:
- Evidenciar os caminhos confirmados e os bloqueios encontrados.

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 2 - Fechar decisoes abertas da Sprint 6

### Objetivo

Transformar os bloqueios da sprint em `PONTO DE DECISAO` explicito, sem deixar que o coder deduza o contrato final de Progresso ou do snapshot historico.

### Tipo da tarefa

- documentacao

### Pre-requisitos

- Tarefa 1 concluida
- Leitura de `/docs/product/PRD.md`
- Leitura de `/docs/evolution/DECISIONS.md`

### Arquivos provaveis

- Arquivo confirmado na codebase: `docs/product/PRD.md`
- Arquivo confirmado na codebase: `docs/evolution/DECISIONS.md`
- Arquivo confirmado na codebase: `docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- Arquivo confirmado na codebase: `src/components/Analytics.tsx`
- Arquivo confirmado na codebase: `src/components/HistoryCalendar.tsx`
- Arquivo confirmado na codebase: `src/types.ts`
- Arquivo confirmado na codebase: `src/utils/rollover.ts`

### Passos

1. Comparar os cards atuais de `Analytics.tsx` com o minimo descrito no PRD e na sprint.
2. Comparar o shape atual de `DailyHistoryEntry` com a necessidade de snapshot das metas do dia.
3. Apresentar apenas as decisoes necessarias: conjunto minimo de Progresso; se historico guarda snapshot de metas; como CSV/PDF devem refletir essa decisao.
4. Solicitar aprovacao humana explicita antes de qualquer tarefa de contrato, rollover ou exportacao final.
5. Se houver aprovacao, registrar a decisao em `/docs/evolution/DECISIONS.md`; se nao houver, marcar bloqueio e parar as tarefas dependentes.

### Criterios de aceite

- Existe decisao humana explicita ou bloqueio explicitamente registrado.
- Nenhuma tarefa de contrato, rollover ou exportacao foi executada sem decisao.
- Se a decisao foi tomada, ela foi registrada em `/docs/evolution/DECISIONS.md`.

### Como validar

- Revisao textual da decisao registrada.
- Revisao de diff em `/docs/evolution/DECISIONS.md`, se houver alteracao.

### Riscos

- `RISCO DE ESCOPO`: transformar preferencia visual em requisito obrigatorio.
- Definir snapshot por inferencia e contaminar historico/exportacao.

### O que NAO alterar

- Nao alterar `src/types.ts`, `src/utils/rollover.ts` ou `src/components/HistoryCalendar.tsx` antes da decisao.
- Nao criar novos requisitos fora do PRD e da sprint original.

### Reversibilidade

Reversivel por ser tarefa documental e de checkpoint; se a decisao mudar, o registro pode ser substituido com nova evidencia.

### Modelo recomendado

- modelo forte recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 - Fechar decisoes abertas da Sprint 6.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO_TAREFAS.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `src/components/Analytics.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/types.ts`
- `src/utils/rollover.ts`

Objetivo:
Fechar os `PONTO DE DECISAO` da sprint sem deduzir regra de negocio.

Escopo:
Comparar documentacao com a codebase, montar as opcoes minimas e parar para decisao humana quando necessario.

Fora do escopo:
Implementar codigo de producao, mudar contrato de dados, inventar escopo ou seguir sem aprovacao.

Arquivos provaveis:
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `src/components/Analytics.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/types.ts`
- `src/utils/rollover.ts`

Validacao:
- Registrar decisao humana explicita ou retornar bloqueio claro.

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 3 - Expor Historico em secao propria de primeiro nivel

### Objetivo

Tirar Historico do caminho escondido sob Perfil e renderiza-lo em secao propria, reaproveitando o componente existente com diff pequeno.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefa 1 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo confirmado na codebase: `src/components/HistoryCalendar.tsx`
- Arquivo confirmado na codebase: `src/types.ts`

### Passos

1. Confirmar como `activeSection` e o tipo `Section` ja representam `history`.
2. Criar o bloco de renderizacao da secao `history` em `App.tsx` usando `HistoryCalendar`.
3. Reaproveitar a montagem de `todayData` sem duplicar logica desnecessaria.
4. Garantir que Perfil deixe de ser o unico caminho para abrir Historico.
5. Validar que o componente continua recebendo os dados esperados.

### Criterios de aceite

- A secao `history` existe e renderiza `HistoryCalendar`.
- Historico deixa de depender exclusivamente da secao Perfil.
- Nenhum arquivo fora da lista provavel foi alterado sem justificativa.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev` para abrir a secao `history` manualmente

### Riscos

- Duplicar o uso de `HistoryCalendar` em mais de um ponto e gerar manutencao confusa.
- Alterar `App.tsx` alem do necessario e abrir `RISCO DE ESCOPO`.

### O que NAO alterar

- Nao refatorar a arquitetura de navegacao para router formal.
- Nao alterar contrato de exportacao ou historico nesta tarefa.

### Reversibilidade

Reversivel por diff concentrado em `src/App.tsx` e, no maximo, pequenos ajustes de props.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 - Expor Historico em secao propria de primeiro nivel.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO_TAREFAS.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- `src/App.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/types.ts`

Objetivo:
Renderizar Historico em secao propria de primeiro nivel com o menor diff possivel.

Escopo:
Alterar apenas o fluxo de secao em `App.tsx` e o necessario para reutilizar `HistoryCalendar`.

Fora do escopo:
Router novo, nova arquitetura, mudanca de contrato do historico, exportacao e backup.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/types.ts`

Validacao:
- `npm run lint`
- `npm run build`
- validacao manual da secao `history`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 4 - Ajustar navegacao e copy para separar Historico de Progresso

### Objetivo

Dar caminho claro e linguagem distinta para Historico por data e Progresso agregado, sem redesenhar o app inteiro.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 3 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo confirmado na codebase: `src/components/Analytics.tsx`
- Arquivo confirmado na codebase: `src/components/HistoryCalendar.tsx`
- Arquivo provavel: `src/index.css` (a confirmar na codebase, apenas se a navegacao inferior exigir ajuste de layout)

### Passos

1. Adicionar Historico na navegacao principal de forma legivel em mobile.
2. Revisar ordem, rotulo e microcopy para diferenciar Historico de Progresso.
3. Ajustar apenas o necessario para que a navegacao inferior continue utilizavel em telas pequenas.
4. Revisar titulos, descricoes curtas e estados vazios das duas superficies para evitar sobreposicao conceitual.
5. Validar visualmente em largura mobile e desktop.

### Criterios de aceite

- O usuario encontra Historico e Progresso por caminhos separados.
- A navegacao inferior continua utilizavel em mobile.
- A diferenca entre consulta por data e progresso agregado fica clara nos textos.

### Como validar

- `npm run build`
- `npm run dev`
- Validacao manual em largura mobile e desktop

### Riscos

- `RISCO DE ESCOPO`: tentar redesenhar toda a navegacao inferior.
- Adicionar um item novo e degradar toque/legibilidade em mobile.

### O que NAO alterar

- Nao criar pagina nova fora da estrutura atual.
- Nao mexer em treino, planner, IA ou backup.

### Reversibilidade

Reversivel por diff pequeno de navegacao e copy, idealmente separado em checkpoint proprio.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 - Ajustar navegacao e copy para separar Historico de Progresso.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO_TAREFAS.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- `src/App.tsx`
- `src/components/Analytics.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/index.css` (se necessario)

Objetivo:
Deixar Historico e Progresso acessiveis e semanticamente distintos.

Escopo:
Ajustar apenas navegacao, labels e microcopy necessarios para a separacao clara das duas areas.

Fora do escopo:
Redesign amplo, nova arquitetura de rotas, mudanca de dados ou exportacao.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/Analytics.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/index.css` (se necessario)

Validacao:
- `npm run build`
- validacao manual mobile/desktop da navegacao e dos textos

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 5 - Alinhar a tela Progresso ao conjunto minimo aprovado

### Objetivo

Reduzir a tela Progresso ao conjunto minimo aprovado, priorizando peso, bioimpedancia opcional e metricas comparativas sem filtros avancados.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 1 concluida
- Tarefa 2 concluida com decisao explicita sobre o minimo da tela Progresso

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/Analytics.tsx`
- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo confirmado na codebase: `src/types.ts`

### Passos

1. Confirmar quais cards atuais ficam, saem ou mudam de prioridade apos a decisao humana.
2. Ajustar `Analytics.tsx` para exibir apenas o minimo aprovado no MVP.
3. Garantir que a ausencia de bioimpedancia nao cause erro em graficos, resumos ou empty states.
4. Manter metricas comparativas simples, sem introduzir filtros analiticos novos.
5. Validar comportamento com usuario que tem apenas peso e com usuario que possui bioimpedancia.

### Criterios de aceite

- A tela Progresso exibe apenas o conjunto minimo aprovado.
- Peso funciona como dado central de acompanhamento corporal.
- A ausencia de bioimpedancia nao quebra graficos ou resumos.
- Nenhum filtro analitico novo foi introduzido.

### Como validar

- `npm run lint`
- `npm run build`
- Teste manual com e sem dados de bioimpedancia

### Riscos

- Remover valor util por interpretar errado o minimo aprovado.
- Manter card fora do MVP por falta de decisao explicita.

### O que NAO alterar

- Nao alterar o contrato do historico diario nesta tarefa.
- Nao alterar formulas de treino, cardio ou metas.

### Reversibilidade

Reversivel por diff concentrado em `Analytics.tsx` e possiveis ajustes pequenos de props.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 - Alinhar a tela Progresso ao conjunto minimo aprovado.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO_TAREFAS.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `src/components/Analytics.tsx`
- `src/App.tsx`
- `src/types.ts`

Objetivo:
Alinhar `Analytics.tsx` ao minimo aprovado para Progresso.

Escopo:
Ajustar apenas a superficie de Progresso, mantendo peso central, bioimpedancia opcional e metricas comparativas simples.

Fora do escopo:
Historico, exportacao, backup, filtros avancados, treino/planner/IA.

Arquivos provaveis:
- `src/components/Analytics.tsx`
- `src/App.tsx`
- `src/types.ts`

Validacao:
- `npm run lint`
- `npm run build`
- teste manual com e sem bioimpedancia

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 6 - Formalizar o contrato do historico diario com compatibilidade retroativa

### Objetivo

Atualizar tipos e normalizacao para que o historico diario reflita exatamente o contrato aprovado, sem perder legibilidade dos dados ja salvos.

### Tipo da tarefa

- modelo/tipos

### Pre-requisitos

- Tarefa 1 concluida
- Tarefa 2 concluida com decisao explicita sobre snapshot historico

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/types.ts`
- Arquivo confirmado na codebase: `src/utils/stateMigration.ts`
- Arquivo confirmado na codebase: `src/constants/state.ts`
- Arquivo confirmado na codebase: `src/components/Analytics.tsx` (confirmar consumo na execucao)
- Arquivo confirmado na codebase: `src/components/HistoryCalendar.tsx` (confirmar consumo na execucao)
- Arquivo confirmado na codebase: `src/services/geminiService.ts` (confirmar consumo na execucao)

### Passos

1. Traduzir a decisao humana em um contrato explicito para `DailyHistoryEntry`.
2. Ajustar `src/types.ts` com campos obrigatorios/opcionais e shape aprovado.
3. Ajustar normalizacao/migracao para que estados antigos continuem legiveis sem corromper dados.
4. Revisar consumers diretos de `data.history` para compatibilidade de leitura.
5. Compilar o projeto antes de avancar para o rollover.

### Criterios de aceite

- O contrato aprovado esta refletido em `src/types.ts`.
- Estados legados continuam legiveis apos a normalizacao.
- Os consumers diretos de `data.history` compilam sem erro.
- Nenhum campo novo fora da decisao aprovada foi introduzido.

### Como validar

- `npm run lint`
- `npm run test`
- `npm run build`

### Riscos

- Alto risco de regressao em dados locais ja persistidos.
- `RISCO DE ESCOPO`: espalhar mudanca de tipos para areas nao planejadas.

### O que NAO alterar

- Nao alterar regras de negocio alem do contrato aprovado na Tarefa 2.
- Nao mexer em backup/importacao geral desta sprint.

### Reversibilidade

Reversivel por checkpoint proprio antes da mudanca de tipos e por manter os novos campos opcionais sempre que possivel.

### Modelo recomendado

- modelo forte recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 - Formalizar o contrato do historico diario com compatibilidade retroativa.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO_TAREFAS.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- `/docs/evolution/DECISIONS.md`
- `src/types.ts`
- `src/utils/stateMigration.ts`
- `src/constants/state.ts`
- `src/components/Analytics.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/services/geminiService.ts`

Objetivo:
Refletir o contrato aprovado do historico diario sem perder compatibilidade com dados ja salvos.

Escopo:
Ajustar tipos e migracao somente no necessario para o contrato aprovado.

Fora do escopo:
Inventar campos, refatoracao ampla, backup/importacao geral ou mudancas de UI nao relacionadas.

Arquivos provaveis:
- `src/types.ts`
- `src/utils/stateMigration.ts`
- `src/constants/state.ts`
- `src/components/Analytics.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/services/geminiService.ts`

Validacao:
- `npm run lint`
- `npm run test`
- `npm run build`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 7 - Ajustar o rollover diario para o contrato aprovado

### Objetivo

Fazer o arquivamento diario escrever exatamente o shape aprovado, sem duplicar dias e sem recalcular o passado silenciosamente.

### Tipo da tarefa

- logica de negocio

### Pre-requisitos

- Tarefa 6 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/utils/rollover.ts`
- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo confirmado na codebase: `src/types.ts`
- Arquivo provavel: `src/utils/domain.ts` (a confirmar na codebase, apenas se a simulacao de data exigir apoio)

### Passos

1. Atualizar `applyDailyRollover` para persistir o contrato aprovado do historico.
2. Garantir que a troca de dia grave apenas um registro por data.
3. Garantir que reabrir o app no mesmo dia nao gere duplicacao de historico.
4. Manter reset dos dados do dia atual apenas nos campos previstos.
5. Simular mudanca de dia e reabertura no mesmo dia antes de concluir.

### Criterios de aceite

- O rollover grava o dia anterior com o contrato aprovado.
- Nao ha duplicacao de dias ao reabrir o app.
- O historico nao e recalculado com metas atuais por inferencia fora da decisao humana.
- O comportamento do dia atual continua consistente apos a virada.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- Validacao manual com simulacao de mesma data e de mudanca de data

### Riscos

- Perda de confianca nos dados se um dia for salvo com valores errados.
- Duplicacao de historico por condicao de borda em `lastActiveDate`.

### O que NAO alterar

- Nao alterar backup/importacao.
- Nao alterar fluxo de refeicoes, treino, cardio ou IA alem do necessario para o rollover.

### Reversibilidade

Reversivel por checkpoint focado em `rollover.ts` e por validacao imediata apos a alteracao.

### Modelo recomendado

- modelo forte recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 7 - Ajustar o rollover diario para o contrato aprovado.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO_TAREFAS.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- `/docs/evolution/DECISIONS.md`
- `src/utils/rollover.ts`
- `src/App.tsx`
- `src/types.ts`

Objetivo:
Fazer o rollover gravar exatamente o historico aprovado, sem duplicar dias.

Escopo:
Ajustar apenas a logica de rollover e o necessario para integra-la ao estado atual.

Fora do escopo:
Backup/importacao, exportacao final, redesign de estado global, regras novas de negocio.

Arquivos provaveis:
- `src/utils/rollover.ts`
- `src/App.tsx`
- `src/types.ts`
- `src/utils/domain.ts` (se necessario)

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- simulacao manual de mesma data e de virada de dia

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 8 - Unificar o dataset de 7 dias e ajustar exportacao CSV/PDF minima

### Objetivo

Fazer CSV e PDF consumirem a mesma montagem de dados de 7 dias, com recorte minimo coerente e feedback claro ao usuario.

### Tipo da tarefa

- logica de negocio

### Pre-requisitos

- Tarefa 2 concluida com decisao explicita sobre exportacao e snapshot
- Tarefa 6 concluida
- Tarefa 7 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/HistoryCalendar.tsx`
- Arquivo confirmado na codebase: `src/types.ts`
- Arquivo provavel a criar: `src/utils/export.ts` ou `src/utils/export/*` (a confirmar na codebase)

### Passos

1. Extrair de `HistoryCalendar.tsx` a montagem do recorte de 7 dias para um utilitario compartilhado.
2. Fazer CSV e PDF consumirem o mesmo dataset, incluindo o dia atual e os dias historicos disponiveis.
3. Ajustar o CSV para manter linhas por refeicao e repetir dados diarios apenas na primeira linha do dia, conforme a sprint original.
4. Ajustar o PDF para manter resumo diario simples, sem virar relatorio avancado.
5. Garantir feedback claro de exportacao e revisar manualmente os arquivos gerados.

### Criterios de aceite

- CSV e PDF usam a mesma base de dados de 7 dias.
- O CSV segue o formato minimo aprovado para refeicoes e dados diarios.
- O PDF segue o resumo diario minimo aprovado.
- Nenhum relatorio adicional fora do escopo foi criado.

### Como validar

- `npm run build`
- `npm run dev`
- Exportar CSV/PDF e revisar manualmente os arquivos gerados

### Riscos

- Dataset unico mal montado contaminar ambos os formatos ao mesmo tempo.
- `RISCO DE ESCOPO`: tentar enriquecer a exportacao com campos nao aprovados.

### O que NAO alterar

- Nao alterar exportacao de backup em `UserProfileForm.tsx`.
- Nao criar relatorios semanais, mensais ou filtros extras.

### Reversibilidade

Reversivel por checkpoint antes da extracao do utilitario e por manter a mudanca concentrada em exportacao.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 8 - Unificar o dataset de 7 dias e ajustar exportacao CSV/PDF minima.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO_TAREFAS.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- `/docs/evolution/DECISIONS.md`
- `src/components/HistoryCalendar.tsx`
- `src/types.ts`

Objetivo:
Fazer CSV e PDF usarem o mesmo dataset de 7 dias e respeitarem o recorte minimo aprovado.

Escopo:
Extrair montagem de dataset, alinhar os dois formatos e validar a exportacao manualmente.

Fora do escopo:
Backup JSON, relatorios avancados, filtros novos, redesign do calendario.

Arquivos provaveis:
- `src/components/HistoryCalendar.tsx`
- `src/types.ts`
- `src/utils/export.ts` ou `src/utils/export/*`

Validacao:
- `npm run build`
- exportacao manual de CSV e PDF com revisao dos arquivos

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 9 - Validacao final da sprint, regressao e continuidade

### Objetivo

Fechar a Sprint 6 com evidencias tecnicas e manuais, registrando limites, riscos residuais e documentos de continuidade.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefas 1 a 8 concluidas, ou bloqueios documentados

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo confirmado na codebase: `src/components/Analytics.tsx`
- Arquivo confirmado na codebase: `src/components/HistoryCalendar.tsx`
- Arquivo confirmado na codebase: `src/utils/rollover.ts`
- Arquivo confirmado na codebase: `docs/agent/CURRENT_STATE.md`
- Arquivo confirmado na codebase: `docs/evolution/CHANGELOG.md`
- Arquivo confirmado na codebase: `docs/evolution/DECISIONS.md`
- Arquivo provavel: `docs/evolution/out-of-scope-changes.md` (a confirmar na codebase)

### Passos

1. Executar `lint`, `test` e `build`.
2. Validar manualmente o fluxo: salvar peso com e sem bioimpedancia; abrir Progresso; abrir Historico; exportar CSV/PDF; simular reabertura e virada de dia.
3. Revisar o diff e confirmar que Historico, Progresso, rollover e exportacao ficaram dentro do escopo aprovado.
4. Registrar limitacoes, validacoes nao executadas e riscos residuais.
5. Atualizar `CURRENT_STATE.md`, `CHANGELOG.md` e `DECISIONS.md` quando aplicavel.

### Criterios de aceite

- Validacoes tecnicas foram executadas ou justificadas.
- O fluxo manual da sprint foi validado com evidencia suficiente.
- O diff final nao adicionou funcionalidade fora do escopo.
- Documentos de continuidade foram atualizados quando houve implementacao ou decisao real.

### Como validar

- `npm run lint`
- `npm run test`
- `npm run build`
- Validacao manual completa da sprint

### Riscos

- Declarar a sprint concluida sem testar virada de dia e exportacao real.
- Esquecer de registrar limitacoes e deixar falso positivo para a proxima sessao.

### O que NAO alterar

- Nao iniciar funcionalidades da Sprint 7 ou Sprint 9.
- Nao promover mudanca arquitetural sem autorizacao.

### Reversibilidade

Reversivel por checkpoints por tarefa e por correcoes localizadas antes do fechamento final.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 9 - Validacao final da sprint, regressao e continuidade.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO_TAREFAS.md`
- `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md`
- arquivos alterados nas tarefas anteriores

Objetivo:
Fechar a Sprint 6 com validacoes tecnicas, validacao manual e documentacao de continuidade.

Escopo:
Executar validacoes, revisar diff, registrar limitacoes e atualizar docs quando aplicavel.

Fora do escopo:
Novas funcionalidades, mudanca arquitetural, expansao para Sprint 7 ou Sprint 9.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/Analytics.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/utils/rollover.ts`
- `docs/agent/CURRENT_STATE.md`
- `docs/evolution/CHANGELOG.md`
- `docs/evolution/DECISIONS.md`
- `docs/evolution/out-of-scope-changes.md`

Validacao:
- `npm run lint`
- `npm run test`
- `npm run build`
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
| 1 | Tarefa 1 | Nenhuma | Sim | Apos o mapeamento confirmado |
| 2 | Tarefa 2 | Tarefa 1 | Nao | Apos decisao humana registrada ou bloqueio documentado |
| 3 | Tarefa 3 | Tarefa 1 | Sim | Apos `npm run lint` e renderizacao da secao `history` |
| 4 | Tarefa 4 | Tarefa 3 | Nao | Apos validacao manual mobile/desktop da navegacao |
| 5 | Tarefa 5 | Tarefas 1 e 2 | Nao | Apos `npm run lint` + `npm run build` com teste manual de bioimpedancia |
| 6 | Tarefa 6 | Tarefas 1 e 2 | Nao | Apos `lint + test + build` sem quebra de contrato |
| 7 | Tarefa 7 | Tarefa 6 | Nao | Apos simulacao de mesma data e virada de dia |
| 8 | Tarefa 8 | Tarefas 2, 6 e 7 | Nao | Apos exportacao manual de CSV e PDF revisada |
| 9 | Tarefa 9 | Tarefas 1 a 8 | Nao | Apos validacoes finais e atualizacao documental |

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
| Tarefa 2 - decisoes abertas da sprint | Envolve regra de negocio, criterio de aceite e impacto direto em historico/exportacao | Alto | Modelo forte + decisao humana obrigatoria |
| Tarefa 6 - contrato do historico diario | Afeta tipos, compatibilidade retroativa e multiplos consumers de `data.history` | Alto | Modelo forte + revisao obrigatoria |
| Tarefa 7 - rollover diario | Afeta integridade do historico, duplicacao de dias e confianca dos dados | Alto | Modelo forte + validacao manual obrigatoria |

---

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir tarefa relevante ou encontrar novo erro/bloqueio na Sprint 6 | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando a Tarefa 2 fechar decisao tecnica ou regra de negocio | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver mudanca fora do escopo da sprint | Sim, se houver mudanca fora do escopo |
