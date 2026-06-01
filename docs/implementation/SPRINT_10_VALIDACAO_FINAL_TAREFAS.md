# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: Sprint 10 - Validacao final
- objetivo da sprint original: executar a regressao final do MVP, consolidar cobertura minima de testes e fechar apenas ajustes necessarios para entregar o escopo aprovado sem regressao
- arquivo de origem, se houver: `/docs/implementation/SPRINT_10_VALIDACAO_FINAL.md`
- resumo do escopo: confirmar scripts finais de validacao
- resumo do escopo: consolidar cobertura minima para utilitarios e fluxos criticos
- resumo do escopo: reexecutar fluxos manuais centrais do MVP em mobile e desktop
- resumo do escopo: corrigir inconsistencias residuais estritamente dentro do escopo aprovado
- resumo do escopo: atualizar documentacao operacional e de evolucao com base no que realmente mudou
- documentos consultados: `/docs/agent/agent-operating-rules.md`
- documentos consultados: `/docs/implementation/PLANO_IMPLEMENTACAO.md`
- documentos consultados: `/docs/implementation/SPRINT_10_VALIDACAO_FINAL.md`
- documentos consultados: `/docs/product/PRD.md`
- documentos consultados: `/docs/evolution/DECISIONS.md`
- documentos consultados: `/docs/design/UI_UX_GUIDE_SECTION_16.md`
- documentos consultados: `/docs/agent/CURRENT_STATE.md`
- documentos consultados: `/docs/product/acceptance-criteria.md` (nao encontrado no workspace)
- pontos assumidos: `package.json` ja confirma `npm run dev`, `npm run lint`, `npm run build`, `npm run test` e `npm run test:watch`
- pontos assumidos: o projeto ja usa `vitest`, `jsdom` e `@testing-library/jest-dom`, entao a estrategia minima de testes deve priorizar o stack existente
- pontos assumidos: a cobertura automatizada atual ainda e pequena e o unico teste confirmado na codebase e `src/hooks/useLocalStorage.test.ts`
- pontos assumidos: a Sprint 10 depende de Sprints 0 a 9 concluidas, mas `CURRENT_STATE.md` ainda so confirma explicitamente a Sprint 2; tratar isso como documentacao potencialmente defasada ate confirmacao
- pontos que precisam ser confirmados na codebase: se o estado real do projeto ja incorpora todas as entregas das Sprints 3 a 9 ou se a documentacao de continuidade esta atrasada (`PONTO DE DECISAO`)
- pontos que precisam ser confirmados na codebase: se a validacao final visa apenas release interna/local ou tambem prontidao para release publica com IA ativa (`PONTO DE DECISAO`)
- pontos que precisam ser confirmados na codebase: se a validacao de exportacao PDF deve permanecer manual ou se ha helper puro pequeno suficiente para cobertura automatizada
- pontos que precisam ser confirmados na codebase: se o gate de IA publica foi resolvido em outro ponto, porque `vite.config.ts` ainda expoe `process.env.GEMINI_API_KEY` no cliente
- pontos que precisam ser confirmados na codebase: se o PWA atual com icones remotos em `vite.config.ts` e aceitavel apenas para validacao interna ou bloqueia o fechamento da sprint para distribuicao

## Analise da Sprint

### Objetivo da sprint

Concluir a validacao do MVP com cobertura minima, regressao controlada, microcorrecoes aprovadas e documentacao final, sem reabrir escopo nem mascarar bloqueios reais de release.

### Escopo identificado

- confirmar os comandos oficiais de validacao e a superficie real da regressao final
- estabilizar a estrategia minima de testes com o stack ja presente (`vitest`)
- ampliar cobertura para utilitarios puros e fluxos locais criticos de persistencia, rollover, exportacao e importacao onde couber sem refatoracao ampla
- executar `lint`, `test`, `build` e smoke de `dev`
- validar manualmente os fluxos de nutricao, treino, historico, exportacao, backup, reset e offline em mobile e desktop
- registrar achados, separar o que e bug real do que e sugestao, e corrigir apenas o que estiver dentro do escopo aprovado
- atualizar `CURRENT_STATE`, `CHANGELOG`, `DECISIONS` e `out-of-scope-changes` apenas quando necessario

### Fora do escopo

- novas features
- refatoracao ampla de `src/App.tsx`
- trocar stack de testes ou introduzir ferramental grande no fim do ciclo
- endurecimento arquitetural amplo de IA publica, PWA, backup versionado ou seguranca alem do minimo aprovado
- reabrir `PONTO DE DECISAO` ja resolvido ou ainda pendente sem instrucao humana
- tratar sugestoes de UX, organizacao ou polish como requisito obrigatorio

### Dependencias entre partes

- o mapeamento final de superficie e comandos vem antes de qualquer cobertura adicional ou regressao
- a confirmacao da estrategia minima de testes vem antes da ampliacao de cobertura automatizada
- a cobertura automatizada deve anteceder a regressao manual sempre que ela reduzir risco de repeticao
- a regressao manual deve acontecer antes de qualquer correcao residual
- cada correcao residual aprovada deve ser seguida por revalidacao apenas das areas impactadas e, no fechamento, por nova rodada tecnica minima
- a documentacao final depende dos resultados reais das validacoes e das correcoes aprovadas

### Riscos principais

- `vite.config.ts` ainda define `process.env.GEMINI_API_KEY` no cliente, o que representa bloqueio serio para release publica com IA ativa
- o manifesto PWA confirmado em `vite.config.ts` usa icones remotos, o que pode invalidar parte do gate final de PWA dependendo do alvo de release
- `src/App.tsx` centraliza estado de refeicoes, agua, historico, treino, planner e backup, entao microcorrecoes descuidadas podem gerar regressao cruzada
- `src/components/HistoryCalendar.tsx` concentra exportacao CSV/PDF em logica de componente, o que aumenta o risco de transformar teste em refatoracao
- `src/components/UserProfileForm.tsx` concentra backup, importacao e reset com validacao local ainda sensivel a corrupcao de dados
- a regressao final pode virar sprint de polimento infinito se os achados nao forem triados por severidade e escopo
- a documentacao de continuidade atual pode nao refletir o estado das Sprints 3 a 9, criando falsa sensacao de prontidao

### Estrategia de quebra

A sprint sera quebrada em cinco blocos: mapeamento final e gates reais, consolidacao minima de testes, validacao tecnica, regressao manual por area do MVP, e fechamento controlado com triagem de achados, microcorrecoes aprovadas e documentacao. A ordem proposta reduz o risco de o modelo economico sair corrigindo sintomas sem antes confirmar comandos, dependencias, bloqueios de release e superficie real dos fluxos.

### Limites para modelo economico

- modelo economico e suficiente para mapeamento, confirmacao de scripts, testes de utilitarios puros, execucao de validacoes tecnicas, walkthrough manual documentado, ajustes locais de copy, labels, empty states e responsividade pontual
- modelo intermediario e recomendado quando a cobertura automatizada exigir pequena extracao de helper puro a partir de `HistoryCalendar.tsx`, `UserProfileForm.tsx` ou `ActivityTracker.tsx`
- modelo forte recomendado para qualquer correcao que toque seguranca de IA publica, service worker/PWA, backup/importacao com migracao mais forte, PDF com refatoracao ampla, `geminiService.ts` ou alteracoes estruturais em `src/App.tsx`

---

# Tarefas da Sprint

## Tarefa 1 - Mapear superficie final de validacao e dependencias reais

### Objetivo

Confirmar a superficie real da Sprint 10, os comandos oficiais, as areas do MVP que entram na regressao final e os bloqueios ja visiveis na codebase antes de qualquer alteracao.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- leitura de `/docs/agent/agent-operating-rules.md`
- leitura de `/docs/implementation/SPRINT_10_VALIDACAO_FINAL.md`
- leitura deste arquivo de tarefas

### Arquivos provaveis

- Arquivo confirmado na codebase: `package.json`
- Arquivo confirmado na codebase: `vite.config.ts`
- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo confirmado na codebase: `src/components/Dashboard.tsx`
- Arquivo confirmado na codebase: `src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `src/components/WaterTracker.tsx`
- Arquivo confirmado na codebase: `src/components/WeeklyPlanner.tsx`
- Arquivo confirmado na codebase: `src/components/WorkoutTracker.tsx`
- Arquivo confirmado na codebase: `src/components/WorkoutPlanner.tsx`
- Arquivo confirmado na codebase: `src/components/WorkoutGenerator.tsx`
- Arquivo confirmado na codebase: `src/components/ActivityTracker.tsx`
- Arquivo confirmado na codebase: `src/components/HistoryCalendar.tsx`
- Arquivo confirmado na codebase: `src/components/Analytics.tsx`
- Arquivo confirmado na codebase: `src/components/UserProfileForm.tsx`
- Arquivo confirmado na codebase: `src/services/geminiService.ts`
- Arquivo confirmado na codebase: `docs/agent/CURRENT_STATE.md`

### Passos

1. Confirmar no `package.json` os scripts oficiais de `dev`, `lint`, `build`, `test` e `test:watch`.
2. Confirmar na codebase quais componentes e utilitarios cobrem os fluxos citados na Sprint 10.
3. Registrar os pontos de bloqueio ja visiveis, como IA publica no cliente e PWA com manifesto provisorio, sem corrigi-los nesta tarefa.
4. Confirmar se `CURRENT_STATE.md` esta defasado em relacao a dependencia formal da Sprint 10.
5. Produzir uma matriz curta com area, arquivos provaveis, validacao minima e risco principal.

### Criterios de aceite

- a superficie real da validacao final foi mapeada
- os comandos oficiais foram confirmados no `package.json`
- os principais bloqueios ou `PONTO DE DECISAO` foram registrados sem inferencia
- nenhuma alteracao funcional foi feita nesta tarefa

### Como validar

- `rg --files src`
- `Get-Content -Raw package.json`
- `Get-Content -Raw vite.config.ts`
- leitura manual dos componentes e utilitarios listados

### Riscos

- mapear a superficie de forma incompleta e planejar correcoes no arquivo errado
- assumir que a sprint esta pronta para release publica sem confirmar os gates de IA e PWA

### O que NAO alterar

- nao alterar codigo de producao
- nao corrigir bugs nesta tarefa
- nao atualizar a arquitetura de IA, PWA ou backup

### Reversibilidade

Tarefa totalmente reversivel por nao exigir alteracao funcional.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 - Mapear superficie final de validacao e dependencias reais.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL.md`
- `package.json`
- `vite.config.ts`
- `src/App.tsx`

Objetivo:
Mapear a superficie real da validacao final, os comandos oficiais e os bloqueios ja visiveis.

Escopo:
Ler arquivos, confirmar scripts, mapear componentes/fluxos e registrar riscos e `PONTO DE DECISAO`.

Fora do escopo:
Qualquer implementacao, bugfix ou refatoracao.

Arquivos provaveis:
- `package.json`
- `vite.config.ts`
- `src/App.tsx`
- `src/components/*`
- `src/services/geminiService.ts`

Validacao:
- `rg --files src`
- leitura manual dos arquivos

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 2 - Confirmar estrategia minima de testes e setup real

### Objetivo

Confirmar que o setup atual de testes e suficiente para a cobertura minima da Sprint 10 e limitar a superficie de testes ao stack ja existente.

### Tipo da tarefa

- configuracao

### Pre-requisitos

- Tarefa 1 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `package.json`
- Arquivo confirmado na codebase: `vite.config.ts`
- Arquivo confirmado na codebase: `src/test/setup.ts`
- Arquivo confirmado na codebase: `src/hooks/useLocalStorage.test.ts`
- Arquivos provaveis a criar: `src/**/*.test.ts` ou `src/**/*.test.tsx`, a confirmar na codebase

### Passos

1. Confirmar que `vitest` ja e o runner oficial e que `src/test/setup.ts` cobre a base do ambiente de teste atual.
2. Verificar se o setup atual ja permite testes unitarios de utilitarios puros sem adicionar novo framework.
3. Definir a lista minima de modulos a cobrir na Sprint 10, priorizando persistencia local, rollover, migracao de estado, calculos locais e exportacao/importacao quando houver helper puro pequeno.
4. Se algum ajuste de setup for necessario, limitar a diff minima para suportar os testes planejados e registrar a razao.
5. Se a cobertura de uma area exigir refatoracao ampla, marcar como `modelo mais forte recomendado` em vez de forcar a cobertura.

### Criterios de aceite

- existe uma estrategia minima de testes explicitamente confirmada
- os comandos de teste e setup real foram confirmados sem trocar o ferramental
- a lista de modulos alvo da cobertura esta definida
- nenhum comportamento de producao foi alterado nesta tarefa sem necessidade tecnica estrita

### Como validar

- `npm run test`
- `npm run lint`

### Riscos

- introduzir ferramental desnecessario tarde no ciclo
- transformar ajuste de setup em mudanca estrutural

### O que NAO alterar

- nao trocar o runner de testes
- nao adicionar E2E ou framework grande sem autorizacao
- nao alterar fluxos funcionais para acomodar teste

### Reversibilidade

Reversivel por diff pequeno em configuracao e arquivos de teste.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 - Confirmar estrategia minima de testes e setup real.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL.md`
- `package.json`
- `vite.config.ts`
- `src/test/setup.ts`
- `src/hooks/useLocalStorage.test.ts`

Objetivo:
Confirmar o setup atual de testes e definir a superficie minima de cobertura da Sprint 10.

Escopo:
Validar runner, setup e modulos alvo. Ajustar setup apenas se for estritamente necessario.

Fora do escopo:
Trocar stack de testes, adicionar E2E ou alterar codigo de producao sem necessidade tecnica.

Arquivos provaveis:
- `package.json`
- `vite.config.ts`
- `src/test/setup.ts`
- `src/**/*.test.ts`

Validacao:
- `npm run test`
- `npm run lint`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 3 - Adicionar cobertura minima para utilitarios locais e persistencia

### Objetivo

Consolidar cobertura automatizada minima para utilitarios puros e pontos locais de persistencia que ja existem na codebase, reduzindo o risco da regressao final.

### Tipo da tarefa

- testes

### Pre-requisitos

- Tarefa 2 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/utils/rollover.ts`
- Arquivo confirmado na codebase: `src/utils/stateMigration.ts`
- Arquivo confirmado na codebase: `src/utils/domain.ts`
- Arquivo confirmado na codebase: `src/hooks/useLocalStorage.ts`
- Arquivo confirmado na codebase: `src/hooks/useLocalStorage.test.ts`
- Arquivos provaveis a criar: `src/utils/rollover.test.ts`, `src/utils/stateMigration.test.ts`, `src/utils/domain.test.ts`, a confirmar na codebase

### Passos

1. Priorizar testes para `applyDailyRollover`, `normalizeDailyData`, `isDailyDataMissingRequiredKeys` e helpers puros de dominio que nao exijam refatoracao ampla.
2. Reaproveitar o padrao de `src/hooks/useLocalStorage.test.ts` em vez de criar convencoes novas.
3. Cobrir cenarios de valor ausente, valor default, persistencia e rollover basico do dia.
4. Se algum helper nao for estavel para teste sem mock complexo, registrar a limitacao em vez de criar teste fragil.
5. Evitar alterar comportamento de producao; so ajustar testabilidade se a diff continuar pequena e revisavel.

### Criterios de aceite

- existe cobertura automatizada minima para rollover, migracao de estado e persistencia local
- os testes passam no runner confirmado
- nenhum contrato ou regra de negocio nova foi introduzido
- qualquer modulo deixado de fora esta explicitamente justificado

### Como validar

- `npm run test`
- `npm run lint`
- `npm run build`

### Riscos

- teste fragil dependente de data/hora local
- alterar regra de persistencia sem perceber para facilitar teste

### O que NAO alterar

- nao alterar formulas de negocio do PRD
- nao reestruturar `src/App.tsx`
- nao mexer em IA, exportacao PDF ou PWA nesta tarefa

### Reversibilidade

Reversivel por remover testes novos e qualquer ajuste pequeno de testabilidade.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 - Adicionar cobertura minima para utilitarios locais e persistencia.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- `src/utils/rollover.ts`
- `src/utils/stateMigration.ts`
- `src/utils/domain.ts`
- `src/hooks/useLocalStorage.ts`
- `src/hooks/useLocalStorage.test.ts`

Objetivo:
Adicionar testes unitarios minimos para utilitarios locais e persistencia ja existentes.

Escopo:
Cobrir rollover, migracao de estado, helpers puros e persistencia local sem mudar comportamento.

Fora do escopo:
Refatoracao ampla, novos contratos, IA, PWA, exportacao PDF ou mudanca de arquitetura.

Arquivos provaveis:
- `src/utils/rollover.ts`
- `src/utils/stateMigration.ts`
- `src/utils/domain.ts`
- `src/hooks/useLocalStorage.ts`
- `src/**/*.test.ts`

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

## Tarefa 4 - Adicionar cobertura minima para calculos locais e exportacao/importacao

### Objetivo

Cobrir com testes ou justificativa explicita os pontos criticos locais de calculo, exportacao e importacao que ainda nao tenham blindagem minima.

### Tipo da tarefa

- testes

### Pre-requisitos

- Tarefa 2 concluida
- Tarefa 3 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/ActivityTracker.tsx`
- Arquivo confirmado na codebase: `src/components/HistoryCalendar.tsx`
- Arquivo confirmado na codebase: `src/components/UserProfileForm.tsx`
- Arquivos provaveis a criar: `src/utils/exportHistory.ts`, `src/utils/exportHistory.test.ts`, `src/utils/backupValidation.ts`, `src/utils/backupValidation.test.ts`, a confirmar na codebase
- Arquivos provaveis a criar: `src/components/ActivityTracker.test.ts` ou helper equivalente, a confirmar na codebase

### Passos

1. Confirmar se `calculateStepCalories` pode ser coberto diretamente sem alterar o componente alem do minimo.
2. Confirmar se a exportacao CSV e a validacao local de backup precisam de helper puro pequeno para teste; extrair apenas se a diff continuar pequena.
3. Priorizar cobertura de formatacao/shape de dados e de rejeicao segura de importacao invalida.
4. Se PDF exigir refatoracao maior, registrar `PONTO DE DECISAO` ou limitacao e manter validacao manual para essa parte.
5. Interromper a tarefa e escalonar se a cobertura exigir refatoracao ampla de `HistoryCalendar.tsx` ou `UserProfileForm.tsx`.

### Criterios de aceite

- existe pelo menos uma cobertura automatizada para calculo local critico e uma para portabilidade local de dados
- qualquer area deixada apenas para validacao manual foi justificada
- nao houve refatoracao ampla para viabilizar teste
- nenhum formato de exportacao ou importacao foi alterado sem bug real comprovado

### Como validar

- `npm run test`
- `npm run lint`
- `npm run build`

### Riscos

- transformar a tarefa de testes em reescrita de componente
- alterar CSV, PDF ou importacao por conveniencia de teste

### O que NAO alterar

- nao redesenhar Historico, Perfil ou Analytics
- nao alterar schema de backup alem do necessario para validacao minima
- nao tocar service worker, `vite.config.ts` ou `geminiService.ts`

### Reversibilidade

Reversivel por remover helpers/testes pequenos criados e restaurar eventuais ajustes minimos de testabilidade.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 - Adicionar cobertura minima para calculos locais e exportacao/importacao.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- `src/components/ActivityTracker.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/components/UserProfileForm.tsx`

Objetivo:
Cobrir com testes os calculos locais e a portabilidade local de dados que ainda nao tenham blindagem minima.

Escopo:
Testar `calculateStepCalories`, validacao local de backup e exportacao CSV com extracao minima de helper puro apenas se necessario.

Fora do escopo:
Refatoracao ampla, reescrita de componente, mudanca de formato de PDF/CSV, IA, PWA ou arquitetura.

Arquivos provaveis:
- `src/components/ActivityTracker.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/components/UserProfileForm.tsx`
- `src/utils/*.ts`
- `src/**/*.test.ts`

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

## Tarefa 5 - Executar validacao tecnica consolidada

### Objetivo

Rodar a suite tecnica final confirmada e registrar falhas reais antes da regressao manual e antes de qualquer bugfix residual.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefas 2 a 4 concluidas conforme aplicavel

### Arquivos provaveis

- Arquivo confirmado na codebase: `package.json`
- Arquivo confirmado na codebase: `docs/agent/CURRENT_STATE.md`
- Arquivos provaveis relacionados: `src/**/*`, a confirmar na codebase apenas se algum comando falhar e apontar para modulo especifico

### Passos

1. Executar `npm run lint`.
2. Executar `npm run test`.
3. Executar `npm run build`.
4. Executar `npm run dev` e confirmar smoke de inicializacao do app.
5. Registrar falhas, warnings relevantes e limitacoes reais antes de partir para validacao manual.

### Criterios de aceite

- `lint`, `test` e `build` foram executados ou tiveram falha registrada com evidencia
- o app inicia em `dev` ou a falha de bootstrap foi registrada
- nenhum bugfix foi embutido sem primeiro registrar o resultado da validacao

### Como validar

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run dev`

### Riscos

- considerar a sprint pronta apenas por passar em comandos tecnicos
- corrigir falhas no impulso sem separar evidencias e escopo

### O que NAO alterar

- nao introduzir features
- nao misturar validacao tecnica com refatoracao ampla
- nao corrigir bugs ainda, salvo se a propria inicializacao do app impedir qualquer progresso e a correcao for trivial e aprovada

### Reversibilidade

Tarefa reversivel por nao exigir alteracao funcional obrigatoria.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 - Executar validacao tecnica consolidada.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- `package.json`

Objetivo:
Executar a suite tecnica final e registrar os resultados antes da regressao manual.

Escopo:
Rodar `lint`, `test`, `build` e smoke de `dev`, registrando falhas e limitacoes.

Fora do escopo:
Nova feature, refatoracao ampla ou bugfix nao aprovado.

Arquivos provaveis:
- `package.json`
- `src/**/*` se algum comando apontar modulo especifico

Validacao:
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run dev`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 6 - Reexecutar regressao manual de nutricao e planejamento alimentar

### Objetivo

Validar manualmente os fluxos centrais de perfil, dashboard, refeicoes, agua, IA alimentar e planejamento alimentar em mobile e desktop.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefa 5 concluida
- ambiente local apto para `npm run dev`

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/App.tsx`
- Arquivo confirmado na codebase: `src/components/UserProfileForm.tsx`
- Arquivo confirmado na codebase: `src/components/Dashboard.tsx`
- Arquivo confirmado na codebase: `src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `src/components/WaterTracker.tsx`
- Arquivo confirmado na codebase: `src/components/WeeklyPlanner.tsx`
- Arquivo confirmado na codebase: `src/components/DietGenerator.tsx`
- Arquivo confirmado na codebase: `src/services/geminiService.ts`

### Passos

1. Validar criacao e edicao de perfil com reload do app.
2. Validar dashboard do dia atual com e sem dados.
3. Validar adicao e remocao de refeicoes manuais.
4. Validar registro de agua e reflexo imediato no dashboard.
5. Validar ao menos um fluxo de IA alimentar com revisao antes do salvamento, se o ambiente local permitir.
6. Validar criacao ou revisao do plano alimentar semanal e aplicacao explicita de item ao dia, sem autolog.
7. Repetir os cenarios essenciais em largura mobile e desktop.

### Criterios de aceite

- os fluxos de perfil, dashboard, refeicoes e agua funcionam sem regressao perceptivel
- o fluxo de IA, quando habilitado no ambiente, continua exigindo revisao antes de salvar
- o planejamento alimentar nao vira consumo automatico
- qualquer falha encontrada foi descrita com passos de reproducao

### Como validar

- `npm run dev`
- validacao manual em mobile e desktop
- reload do app apos salvar perfil e registros

### Riscos

- depender de ambiente de IA nao configurado e confundir indisponibilidade de ambiente com bug de produto
- ignorar diferenca entre planner e consumo real

### O que NAO alterar

- nao corrigir bugs durante a validacao
- nao alterar copy legal ou comportamento de IA nesta tarefa
- nao redesenhar Dashboard, Planner ou MealForm

### Reversibilidade

Tarefa reversivel por ser apenas de validacao manual.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 - Reexecutar regressao manual de nutricao e planejamento alimentar.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- `src/App.tsx`
- `src/components/UserProfileForm.tsx`
- `src/components/Dashboard.tsx`
- `src/components/MealForm.tsx`
- `src/components/WeeklyPlanner.tsx`

Objetivo:
Validar manualmente os fluxos de nutricao e planejamento alimentar em mobile e desktop.

Escopo:
Executar walkthrough de perfil, dashboard, refeicoes, agua, IA alimentar e planner semanal, registrando achados.

Fora do escopo:
Corrigir bugs, mudar copy, redesenhar componentes ou ampliar escopo.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/UserProfileForm.tsx`
- `src/components/Dashboard.tsx`
- `src/components/MealForm.tsx`
- `src/components/WaterTracker.tsx`
- `src/components/WeeklyPlanner.tsx`
- `src/components/DietGenerator.tsx`

Validacao:
- `npm run dev`
- walkthrough manual em mobile e desktop

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 7 - Reexecutar regressao manual de treino, historico, exportacao e dados locais

### Objetivo

Validar manualmente os fluxos de treino, cardio, passos, progresso, historico, exportacao, backup/importacao/reset e offline/PWA, separando o que e bug real do que e bloqueio de release.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefa 5 concluida
- Tarefa 6 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `src/components/WorkoutTracker.tsx`
- Arquivo confirmado na codebase: `src/components/WorkoutPlanner.tsx`
- Arquivo confirmado na codebase: `src/components/WorkoutGenerator.tsx`
- Arquivo confirmado na codebase: `src/components/ActivityTracker.tsx`
- Arquivo confirmado na codebase: `src/components/Analytics.tsx`
- Arquivo confirmado na codebase: `src/components/HistoryCalendar.tsx`
- Arquivo confirmado na codebase: `src/components/UserProfileForm.tsx`
- Arquivo confirmado na codebase: `vite.config.ts`

### Passos

1. Validar registro de treino, cardio e passos e o reflexo no resumo do dia.
2. Validar planner de treino e separacao entre planejado e executado.
3. Validar tela de progresso/analytics e acesso ao historico.
4. Validar exportacao CSV e PDF com revisao manual do arquivo gerado.
5. Validar backup, importacao de backup valido, rejeicao de backup invalido e reset com confirmacao explicita.
6. Validar leitura de dados salvos em modo offline e smoke de PWA compativel com o estado atual do projeto.
7. Registrar separadamente bloqueios de release publica, como IA com segredo no cliente ou manifesto PWA provisorio.

### Criterios de aceite

- os fluxos de treino, historico e dados locais foram executados ao menos uma vez
- exportacao, backup, importacao e reset tiveram resultado registrado
- o comportamento offline com dados ja salvos foi validado
- bloqueios de release publica, se existirem, ficaram registrados como bloqueio e nao como detalhe cosmetico

### Como validar

- `npm run dev`
- validacao manual em mobile e desktop
- teste manual offline com dados ja persistidos
- revisao manual dos arquivos CSV/PDF e backup JSON gerados

### Riscos

- tratar bloqueio serio de release como simples bug de interface
- corromper dados locais ao testar importacao/reset sem backup previo

### O que NAO alterar

- nao corrigir bugs durante a validacao
- nao reconfigurar PWA, service worker, IA ou backup nesta tarefa
- nao transformar bloqueio de release em hotfix estrutural sem aprovacao

### Reversibilidade

Tarefa reversivel por ser apenas de validacao manual, desde que o backup original seja preservado antes dos testes destrutivos.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 7 - Reexecutar regressao manual de treino, historico, exportacao e dados locais.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- `src/components/WorkoutTracker.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/components/UserProfileForm.tsx`
- `vite.config.ts`

Objetivo:
Validar manualmente treino, historico, exportacao, backup/importacao/reset, offline/PWA e registrar bloqueios reais.

Escopo:
Executar walkthrough completo dessas areas, incluindo revisao dos artefatos gerados e dos gates de release publica.

Fora do escopo:
Bugfix, refatoracao, reconfiguracao de PWA/IA ou mudanca de arquitetura.

Arquivos provaveis:
- `src/components/WorkoutTracker.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutGenerator.tsx`
- `src/components/ActivityTracker.tsx`
- `src/components/Analytics.tsx`
- `src/components/HistoryCalendar.tsx`
- `src/components/UserProfileForm.tsx`
- `vite.config.ts`

Validacao:
- `npm run dev`
- walkthrough manual em mobile e desktop
- teste offline
- revisao manual de CSV/PDF/backup

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 8 - Catalogar achados e separar correcoes aprovadas

### Objetivo

Transformar os resultados da validacao tecnica e manual em uma lista pequena, objetiva e executavel de correcoes aprovadas, evitando sprint de polimento infinito.

### Tipo da tarefa

- documentacao

### Pre-requisitos

- Tarefa 5 concluida
- Tarefa 6 concluida
- Tarefa 7 concluida

### Arquivos provaveis

- Arquivo confirmado na codebase: `docs/agent/CURRENT_STATE.md`
- Arquivo provavel: `docs/evolution/out-of-scope-changes.md`, a confirmar na codebase
- Arquivos provaveis de codigo: `src/*`, a confirmar na codebase apenas apos classificar cada achado

### Passos

1. Reunir falhas de `lint`, `test`, `build`, smoke de `dev` e walkthrough manual.
2. Classificar cada achado como: bloqueador, bug funcional local, bug visual/copy, limitacao conhecida, fora do escopo ou bloqueio de release publica.
3. Eliminar duplicatas e separar sugestao de melhoria de bug real.
4. Marcar `RISCO DE ESCOPO` para qualquer achado que exija nova feature, refatoracao ampla ou mudanca arquitetural.
5. Definir a fila curta de correcoes aprovadas que realmente cabem na Sprint 10.

### Criterios de aceite

- todo achado relevante esta classificado
- a fila de correcoes aprovadas esta pequena, objetiva e dentro do escopo
- qualquer bloqueio estrutural foi escalonado em vez de escondido
- nenhuma correcao foi implementada ainda nesta tarefa

### Como validar

- revisao manual contra `/docs/implementation/SPRINT_10_VALIDACAO_FINAL.md`
- revisao manual contra `/docs/product/PRD.md`
- revisao manual contra `/docs/evolution/DECISIONS.md`

### Riscos

- tratar sugestao de UX como bug obrigatorio
- misturar bug de ambiente, bug real e bloqueio de release na mesma categoria

### O que NAO alterar

- nao alterar codigo de producao
- nao reabrir escopo do MVP
- nao aprovar correcao estrutural sem registrar necessidade de modelo mais forte

### Reversibilidade

Reversivel por editar ou remover registros/documentacao de triagem.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 8 - Catalogar achados e separar correcoes aprovadas.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL.md`
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`

Objetivo:
Classificar os achados da validacao final e definir apenas as correcoes aprovadas que cabem na sprint.

Escopo:
Triar falhas, classificar severidade/escopo e separar bugs reais de sugestoes e bloqueios estruturais.

Fora do escopo:
Implementar correcao, reabrir arquitetura ou transformar melhoria em requisito.

Arquivos provaveis:
- `docs/agent/CURRENT_STATE.md`
- `docs/evolution/out-of-scope-changes.md`
- `src/*` somente para referenciar os achados confirmados

Validacao:
- revisao manual contra a sprint, PRD e DECISIONS

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 9 - Corrigir inconsistencias aprovadas de copy, labels e responsividade local

### Objetivo

Resolver apenas inconsistencias aprovadas de baixo risco relacionadas a copy, labels, empty states e responsividade local, desde que nao alterem regra de negocio nem arquitetura.

### Tipo da tarefa

- limpeza/refino

### Pre-requisitos

- Tarefa 8 concluida
- fila de correcoes de baixo risco explicitamente aprovada

### Arquivos provaveis

- Arquivos provaveis: `src/components/*.tsx`, a confirmar na codebase conforme o achado aprovado
- Arquivo provavel: `src/index.css`, a confirmar na codebase
- Arquivo confirmado na codebase que NAO deve ser alterado sem nova aprovacao: `src/App.tsx`

### Passos

1. Escolher apenas os achados aprovados de copy, labels, empty states ou responsividade pontual.
2. Implementar correcoes pequenas e localizadas, preferindo um diff por area afetada.
3. Validar imediatamente o fluxo visual impactado em mobile e desktop.
4. Se qualquer ajuste pedir mudanca de layout estrutural, reclassificar como `RISCO DE ESCOPO` e parar.
5. Reexecutar `lint`, `build` e a validacao manual diretamente impactada.

### Criterios de aceite

- cada ajuste resolve um problema aprovado e comprovado
- o diff permanece pequeno e revisavel
- nenhuma regra funcional foi alterada
- nenhum arquivo fora da lista provavel foi alterado sem justificativa

### Como validar

- `npm run lint`
- `npm run build`
- `npm run dev`
- validacao manual do fluxo visual afetado

### Riscos

- acumular muitos ajustes nao relacionados no mesmo diff
- esconder mudanca funcional atras de ajuste visual

### O que NAO alterar

- nao alterar formulas, persistencia ou fluxo de dados
- nao refatorar `src/App.tsx`
- nao tocar `vite.config.ts`, `geminiService.ts` ou backup/importacao

### Reversibilidade

Reversivel por diff pequeno e localizado.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 9 - Corrigir inconsistencias aprovadas de copy, labels e responsividade local.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- os componentes diretamente afetados pelos achados aprovados

Objetivo:
Corrigir apenas problemas aprovados de copy, labels, empty states e responsividade local.

Escopo:
Aplicar correcoes pequenas e localizadas, validar visualmente e manter diff curto.

Fora do escopo:
Mudar regra funcional, refatorar `src/App.tsx`, tocar IA, PWA, backup/importacao ou arquitetura.

Arquivos provaveis:
- `src/components/*.tsx`
- `src/index.css`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run dev`
- walkthrough manual do fluxo afetado

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 10 - Corrigir inconsistencias funcionais locais aprovadas

### Objetivo

Resolver apenas bugs funcionais locais aprovados que caibam no escopo da Sprint 10 e nao exijam mudanca arquitetural, seguranca nova ou refatoracao ampla.

### Tipo da tarefa

- logica de negocio

### Pre-requisitos

- Tarefa 8 concluida
- fila de correcoes funcionais locais explicitamente aprovada

### Arquivos provaveis

- Arquivos provaveis: `src/components/*.tsx`, `src/utils/*.ts`, `src/hooks/*.ts`, a confirmar na codebase conforme o bug aprovado
- Arquivo confirmado na codebase que exige cuidado especial: `src/App.tsx`
- Arquivos confirmados na codebase que devem ser tratados como alto risco: `src/components/HistoryCalendar.tsx`, `src/components/UserProfileForm.tsx`, `src/services/geminiService.ts`, `vite.config.ts`

### Passos

1. Escolher apenas bugs funcionais locais aprovados e claramente reproduziveis.
2. Atacar um bug por vez, com diff pequeno e checkpoint apos validacao.
3. Reexecutar os testes e walkthroughs diretamente impactados por cada correcao.
4. Se o bug tocar IA publica, PWA, backup/importacao com schema, `geminiService.ts` ou refatoracao ampla de `App.tsx`, parar e reclassificar como `modelo mais forte recomendado`.
5. Registrar limitacoes e riscos residuais se a correcao ficar parcial por causa de gate estrutural.

### Criterios de aceite

- cada correcao ataca bug real e aprovado
- a validacao impactada passa apos a correcao
- nenhum bugfix virou feature nova
- qualquer problema estrutural foi escalonado em vez de ser empurrado para o diff

### Como validar

- `npm run lint`
- `npm run test`
- `npm run build`
- validacao manual do fluxo impactado

### Riscos

- abrir frente de implementacao nova mascarada de bugfix
- tocar area de alto risco e gerar regressao em cascata

### O que NAO alterar

- nao alterar arquitetura do MVP
- nao implementar hardening completo de release publica
- nao tocar seguranca de IA, service worker, proxy, backup versionado ou PDF estrutural sem nova aprovacao

### Reversibilidade

Reversivel por manter um bug por diff e checkpoint apos cada validacao.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 10 - Corrigir inconsistencias funcionais locais aprovadas.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- os arquivos diretamente ligados ao bug aprovado

Objetivo:
Corrigir apenas bugs funcionais locais aprovados, um por vez, com diff pequeno e validacao imediata.

Escopo:
Atacar bugs locais reproduziveis dentro do escopo do MVP e parar se surgir necessidade estrutural.

Fora do escopo:
Nova feature, refatoracao ampla, IA publica, service worker/PWA, backup versionado, mudanca arquitetural ou seguranca nova.

Arquivos provaveis:
- `src/components/*.tsx`
- `src/utils/*.ts`
- `src/hooks/*.ts`
- `src/App.tsx` com cautela

Validacao:
- `npm run lint`
- `npm run test`
- `npm run build`
- walkthrough manual do fluxo impactado

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 11 - Fechar documentacao de continuidade e gate final

### Objetivo

Encerrar a Sprint 10 com evidencias objetivas, documentacao atualizada, riscos residuais claros e bloqueios de release explicitados.

### Tipo da tarefa

- documentacao

### Pre-requisitos

- Tarefas 5 a 10 concluida(s) conforme aplicavel

### Arquivos provaveis

- Arquivo confirmado na codebase: `docs/agent/CURRENT_STATE.md`
- Arquivo confirmado na codebase: `docs/evolution/CHANGELOG.md`
- Arquivo confirmado na codebase: `docs/evolution/DECISIONS.md`
- Arquivo provavel: `docs/evolution/out-of-scope-changes.md`, a confirmar na codebase
- Arquivo confirmado na codebase: `vite.config.ts` (apenas como referencia de gate, sem alteracao obrigatoria)

### Passos

1. Registrar o que foi validado, o que foi corrigido, o que nao foi corrigido e por que.
2. Atualizar `CURRENT_STATE.md` com o novo estado da sprint e a proxima acao recomendada.
3. Atualizar `CHANGELOG.md` apenas com mudancas reais implementadas.
4. Atualizar `DECISIONS.md` apenas se houve decisao tecnica ou de produto de fato.
5. Atualizar `out-of-scope-changes.md` se alguma solicitacao tiver ficado explicitamente adiada ou bloqueada por escopo.
6. Declarar claramente se a sprint fecha apenas para uso interno/local ou se ha bloqueios para release publica.

### Criterios de aceite

- a documentacao final reflete o que realmente aconteceu
- os riscos residuais e bloqueios de release ficaram explicitos
- nenhuma mudanca fora do escopo foi mascarada
- o proximo agente consegue continuar o trabalho sem depender de memoria oral

### Como validar

- revisao manual dos documentos atualizados
- conferencia contra os resultados reais de `lint`, `test`, `build` e validacoes manuais

### Riscos

- declarar a sprint concluida sem evidencias
- omitir bloqueio serio de release por desconforto com o status real

### O que NAO alterar

- nao reescrever PRD
- nao inventar decisao que nao foi tomada
- nao esconder bloqueio estrutural em nota vaga

### Reversibilidade

Reversivel por edicao documental controlada.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 11 - Fechar documentacao de continuidade e gate final.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL_TAREFAS.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/evolution/DECISIONS.md`

Objetivo:
Fechar a Sprint 10 com evidencias, documentacao atualizada e bloqueios de release explicitados.

Escopo:
Atualizar apenas a documentacao necessaria com base nos resultados reais da sprint.

Fora do escopo:
Nova implementacao, reescrita de PRD ou decisao inventada.

Arquivos provaveis:
- `docs/agent/CURRENT_STATE.md`
- `docs/evolution/CHANGELOG.md`
- `docs/evolution/DECISIONS.md`
- `docs/evolution/out-of-scope-changes.md`

Validacao:
- revisao manual dos documentos
- confronto com os resultados reais das validacoes

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
| 1 | Tarefa 1 | Nenhuma | Sim | Apos matriz de superficie, comandos e bloqueios confirmados |
| 2 | Tarefa 2 | Tarefa 1 | Nao | Apos setup e estrategia minima de testes confirmados |
| 3 | Tarefa 3 | Tarefa 2 | Nao | Apos `npm run test`, `npm run lint` e `npm run build` |
| 4 | Tarefa 4 | Tarefas 2 e 3 | Nao | Apos cobertura minima de calculos/portabilidade ou limitacao registrada |
| 5 | Tarefa 5 | Tarefas 2 a 4 | Sim | Apos `lint`, `test`, `build` e smoke de `dev` |
| 6 | Tarefa 6 | Tarefa 5 | Sim | Apos regressao manual de nutricao em mobile e desktop |
| 7 | Tarefa 7 | Tarefas 5 e 6 | Sim | Apos regressao manual de treino, historico, exportacao e dados locais |
| 8 | Tarefa 8 | Tarefas 5 a 7 | Nao | Apos triagem dos achados e fila curta de correcoes aprovadas |
| 9 | Tarefa 9 | Tarefa 8 | Nao | Apos cada diff visual/local aprovado |
| 10 | Tarefa 10 | Tarefa 8 | Nao | Apos cada bug funcional local corrigido e revalidado |
| 11 | Tarefa 11 | Tarefas 5 a 10 | Nao | Apos documentacao final e gate de release registrado |

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
| Gate de release publica com IA ativa (`vite.config.ts` / segredo no cliente) | Envolve seguranca, arquitetura e risco de exposicao de chave | Alto | Modelo forte + validacao humana obrigatoria |
| Ajustes de service worker, manifesto PWA e offline alem do smoke atual | Pode afetar cache, instalacao, consistencia offline e regressao ampla | Alto | Modelo forte ou revisao especializada |
| Hardening de backup/importacao com schema versionado forte | Envolve integridade de dados e risco de corrupcao | Alto | Modelo forte + testes dedicados + validacao humana |
| Correcao estrutural em `src/App.tsx` que atravesse varias areas do MVP | Alto acoplamento entre refeicoes, agua, historico, treino e planner | Alto | Modelo forte ou dividir em tarefas ainda menores antes de executar |
| Refatoracao ampla de `HistoryCalendar.tsx` ou `UserProfileForm.tsx` para cobrir PDF/backup | Pode misturar UI, dados locais e exportacao em um diff grande | Medio/Alto | Modelo forte ou limite a helper puro pequeno |
| Bugs em `src/services/geminiService.ts` ou no gate publico de IA | Area sensivel de integracao externa, parsing e seguranca | Alto | Modelo forte + revisao humana |

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
/docs/implementation/SPRINT_10_*.md
```

Para esta quebra, a sprint de origem identificada foi:

- `/docs/implementation/SPRINT_10_VALIDACAO_FINAL.md`

Se encontrar apenas um arquivo compativel, use esse arquivo como fonte principal.

Se encontrar mais de um arquivo compativel, liste os arquivos encontrados e solicite confirmacao de qual sprint deve ser quebrada.

Se nenhum arquivo de sprint for encontrado, solicite que o usuario forneca o conteudo da sprint ou indique o arquivo correto.

Nao invente o conteudo da sprint.

Nao quebre tarefas sem sprint de origem.
