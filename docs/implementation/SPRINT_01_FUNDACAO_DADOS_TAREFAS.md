# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: Sprint 1 - Fundacao de dados
- objetivo da sprint original: alinhar contratos de dominio e o nucleo de persistencia/rollover do brownfield com o PRD, preparando o app para ajustes de tela sem espalhar regra de negocio sensivel.
- arquivo de origem: `/docs/implementation/SPRINT_01_FUNDACAO_DADOS.md`
- resumo do escopo: revisar contratos centrais, centralizar constantes/utilitarios de dominio, isolar rollover e migracao minima de estado local, e conter superficies fora do MVP que estiverem expostas.
- documentos consultados:
  - `/docs/agent/agent-operating-rules.md`
  - `/docs/implementation/PLANO_IMPLEMENTACAO.md`
  - `/docs/implementation/SPRINT_01_FUNDACAO_DADOS.md`
  - `/docs/product/PRD.md`
  - `/docs/evolution/DECISIONS.md`
  - `/docs/design/UI_UX_GUIDE.md` (nao encontrado)
  - `/docs/product/acceptance-criteria.md` (nao encontrado)
- pontos assumidos:
  - os comandos `npm run lint` e `npm run build` seguem validos; `npm run test` existe pela Sprint 00B.
  - os caminhos citados na sprint de origem sao provaveis e precisam ser reconfirmados durante execucao.
- pontos que precisam ser confirmados na codebase:
  - shape real atual de `DailyData`, `Meal`, `PlannedMeal`, `Workout`, `CardioLog`, `DailyHistoryEntry`, `UserProfile`.
  - pontos reais de consumo desses contratos em `App` e componentes.
  - implementacao real da regra de rollover e da normalizacao/migracao no carregamento do estado local.

## Analise da Sprint

### Objetivo da sprint

Estabilizar a base de dados e regras centrais do app para reduzir regressao antes de ajustes de UI e fluxos de sprints seguintes.

### Escopo identificado

- Revisao de contratos de dominio contra PRD.
- Extracao/centralizacao de constantes e utilitarios basicos.
- Isolamento da regra de rollover diario e migracao minima de estado local.
- Mapeamento e contencao de superficies fora do MVP quando expostas.

### Fora do escopo

- Criacao de novas telas.
- Mudanca de formula de negocio sem respaldo documental.
- Implementacao de backup versionado completo.
- Implementacao de proxy/server-side para IA.
- Expansao para E2E sem decisao explicita.

### Dependencias entre partes

- Revisao de contratos vem antes de extracao de utilitarios para evitar duplicar erro de modelagem.
- Isolamento de rollover depende de entendimento do contrato e da persistencia atual.
- Contencao de superficies fora do MVP depende de mapeamento de uso real para evitar remocao indevida.

### Riscos principais

- Regressao em `/src/App.tsx` por alto acoplamento.
- Incompatibilidade com dados existentes no `localStorage`.
- RISCO DE ESCOPO ao tocar componentes fora da lista principal sem justificativa.
- Regressao em historico/progresso ao ajustar shape de dados.

### Estrategia de quebra

Dividir em blocos curtos e sequenciais: mapeamento, contratos, utilitarios, rollover/migracao, guardrails fora do MVP, e validacao/documentacao final. Cada bloco gera diff pequeno, reversivel e com checkpoint.

### Limites para modelo economico

- Adequado para: mapeamento, ajustes pequenos de tipos, extracao pontual de helper, ajuste local de guardrail e documentacao operacional.
- Modelo mais forte recomendado: refatoracao ampla de `App`, migracao complexa de estado, ou qualquer mudanca que altere regra de negocio sensivel sem cobertura suficiente.

---

# Tarefas da Sprint

## Tarefa 1 — Mapear contratos e pontos de consumo

### Objetivo

Levantar o estado real dos contratos centrais e onde sao consumidos, antes de editar tipos ou regra de persistencia.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- Sprint 00B concluida.
- Leitura de `/docs/agent/agent-operating-rules.md` e deste arquivo de tarefas.

### Arquivos provaveis

- Arquivo provavel: `src/types.ts` — a confirmar na codebase.
- Arquivo provavel: `src/App.tsx` — a confirmar na codebase.
- Arquivo provavel: `src/hooks/useLocalStorage.ts` — a confirmar na codebase.
- Arquivos provaveis: `src/components/**` que usam `DailyData` e derivados — a confirmar na codebase.

### Passos

1. Ler `src/types.ts` e listar contratos centrais existentes.
2. Mapear no `App` e componentes os pontos de leitura/escrita desses contratos.
3. Comparar rapidamente com requisitos do PRD para identificar lacunas reais.
4. Registrar resultado em notas curtas na descricao da tarefa executada (sem alterar regra de negocio).

### Criterios de aceite

- Contratos centrais atuais foram listados com campos principais.
- Pontos de consumo criticos foram identificados.
- Lacunas confirmadas foram separadas de hipoteses.
- Nenhuma alteracao de codigo funcional foi feita sem necessidade.

### Como validar

- Revisao de diff para garantir alteracao nula ou minima.
- Se houver alteracao documental local, validar consistencia textual.
- Comandos do projeto: confirmar no `package.json` antes de executar qualquer comando.

### Riscos

- Mapeamento incompleto levar a alteracoes inseguras nas proximas tarefas.

### O que NAO alterar

- Nao alterar UI, logica de negocio ou persistencia nesta tarefa.

### Reversibilidade

- Reversivel por remover notas/documentacao local criada nesta etapa, sem impacto funcional.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 — Mapear contratos e pontos de consumo.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_01_FUNDACAO_DADOS_TAREFAS.md`
- `/docs/implementation/SPRINT_01_FUNDACAO_DADOS.md`
- `/src/types.ts`
- `/src/App.tsx`
- `/src/hooks/useLocalStorage.ts`

Objetivo:
Mapear contratos centrais e seus pontos de consumo para reduzir risco das proximas alteracoes.

Escopo:
Ler arquivos, listar contratos e mapear consumo sem alterar regra funcional.

Fora do escopo:
Qualquer mudanca de UI, logica de negocio, persistencia ou arquitetura.

Arquivos provaveis:
- `src/types.ts`
- `src/App.tsx`
- `src/hooks/useLocalStorage.ts`
- `src/components/**`

Validacao:
- Revisao de diff (esperado: nulo ou minimo)

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 2 — Alinhar contratos centrais em tipos

### Objetivo

Ajustar contratos centrais para refletir o PRD sem quebrar compatibilidade de consumo existente.

### Tipo da tarefa

- modelo/tipos

### Pre-requisitos

- Tarefa 1 concluida com mapa de contratos e consumo.

### Arquivos provaveis

- Arquivo provavel: `src/types.ts` — a confirmar na codebase.
- Arquivo provavel: `src/App.tsx` (ajustes de compatibilidade estritamente necessarios) — a confirmar na codebase.

### Passos

1. Aplicar ajustes minimos em tipos para refletir obrigatorio/opcional conforme PRD.
2. Corrigir apenas erros de compilacao diretamente relacionados aos ajustes.
3. Evitar refatoracao ampla de consumo nesta etapa.
4. Registrar campos que permaneceram pendentes por dependencia de decisao humana como `PONTO DE DECISAO`.

### Criterios de aceite

- Tipos centrais atualizados com diff pequeno.
- Nenhum erro de tipo introduzido pelas mudancas.
- Pendencias de decisao humana foram explicitadas sem inferencia.

### Como validar

- `npm run lint` (confirmar no `package.json`).
- `npm run build` (confirmar no `package.json`).

### Riscos

- Quebra indireta em componentes com tipagem implicita.
- RISCO DE ESCOPO se ajustes se espalharem por muitos arquivos.

### O que NAO alterar

- Nao alterar formulas de negocio.
- Nao criar novas funcionalidades.

### Reversibilidade

- Reversivel por rollback do diff de tipos e ajustes diretos de compatibilidade.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 — Alinhar contratos centrais em tipos.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_01_FUNDACAO_DADOS_TAREFAS.md`
- `/src/types.ts`
- `/src/App.tsx`

Objetivo:
Alinhar contratos centrais ao PRD com mudanca minima e segura.

Escopo:
Editar tipos e apenas ajustes de compilacao relacionados.

Fora do escopo:
Refatoracao ampla, mudanca de formula, nova feature, alteracao de UX.

Arquivos provaveis:
- `src/types.ts`
- `src/App.tsx`

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

## Tarefa 3 — Centralizar constantes de dominio

### Objetivo

Extrair constantes repetidas (ex.: dias da semana, tipos de refeicao, defaults simples) para um ponto unico reutilizavel.

### Tipo da tarefa

- limpeza/refino

### Pre-requisitos

- Tarefa 2 concluida.

### Arquivos provaveis

- Arquivo provavel: `src/constants/*` — a confirmar na codebase.
- Arquivo provavel: `src/utils/domain.ts` ou equivalente — a confirmar na codebase.
- Arquivo provavel: `src/App.tsx` — a confirmar na codebase.

### Passos

1. Identificar constantes repetidas de baixo risco.
2. Criar arquivo unico de constantes de dominio (ou reutilizar estrutura existente).
3. Substituir usos locais por importacoes, sem alterar comportamento.
4. Manter diff pequeno e focado.

### Criterios de aceite

- Constantes repetidas relevantes foram centralizadas.
- Comportamento do app permaneceu igual.
- Nenhuma mudanca de formula foi introduzida.

### Como validar

- `npm run lint`
- `npm run build`

### Riscos

- Import errado gerar regressao silenciosa.

### O que NAO alterar

- Nao alterar logica de calculo de metas, cardio ou historico.

### Reversibilidade

- Reversivel por restaurar constantes inline e remover arquivo central criado.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 — Centralizar constantes de dominio.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_01_FUNDACAO_DADOS_TAREFAS.md`
- `/src/App.tsx`
- `/src/types.ts`

Objetivo:
Centralizar constantes repetidas sem mudar comportamento.

Escopo:
Criar/reutilizar arquivo de constantes e atualizar usos diretos.

Fora do escopo:
Mudar formula, criar feature, alterar fluxo de tela.

Arquivos provaveis:
- `src/constants/*`
- `src/utils/domain.ts`
- `src/App.tsx`

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

## Tarefa 4 — Extrair utilitarios puros basicos

### Objetivo

Isolar utilitarios puros de baixo risco (ex.: criacao de ID, arredondamento simples, defaults puros) para reduzir duplicacao e facilitar teste.

### Tipo da tarefa

- logica de negocio

### Pre-requisitos

- Tarefa 3 concluida.

### Arquivos provaveis

- Arquivo provavel: `src/utils/domain.ts` ou `src/utils/domain/*` — a confirmar na codebase.
- Arquivo provavel: `src/App.tsx` — a confirmar na codebase.

### Passos

1. Identificar utilitarios puros repetidos e sem regra sensivel.
2. Extrair para modulo utilitario com nomes claros.
3. Substituir chamadas inline mantendo o mesmo comportamento.
4. Evitar mexer em utilitarios ligados a decisoes pendentes.

### Criterios de aceite

- Utilitarios selecionados foram extraidos com comportamento preservado.
- Nao houve ampliacao de escopo.
- Diff permanece pequeno e revisavel.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test` (confirmar no `package.json`).

### Riscos

- Extracao apressada alterar resultado em casos de borda.

### O que NAO alterar

- Nao alterar regras de rollover, snapshot historico de metas ou exportacao.

### Reversibilidade

- Reversivel por voltar funcoes para o local original e remover modulo extraido.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 — Extrair utilitarios puros basicos.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_01_FUNDACAO_DADOS_TAREFAS.md`
- `/src/App.tsx`

Objetivo:
Extrair utilitarios puros basicos sem alterar regra sensivel.

Escopo:
Extrair funcoes de baixo risco e atualizar chamadas.

Fora do escopo:
Mudar regras de negocio, snapshot, exportacao ou fluxo de UI.

Arquivos provaveis:
- `src/utils/domain.ts`
- `src/utils/domain/*`
- `src/App.tsx`

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

## Tarefa 5 — Isolar rollover diario em unidade dedicada

### Objetivo

Mover a regra de rollover diario para unidade clara, reduzindo acoplamento no `App`.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefas 2 a 4 concluidas.
- Fluxo atual de rollover mapeado na Tarefa 1.

### Arquivos provaveis

- Arquivo provavel: `src/utils/rollover.ts` ou equivalente — a confirmar na codebase.
- Arquivo provavel: `src/App.tsx` — a confirmar na codebase.
- Arquivo provavel: `src/hooks/useLocalStorage.ts` — a confirmar na codebase.

### Passos

1. Isolar a logica de rollover sem mudar regra de negocio existente.
2. Integrar unidade nova nos pontos de leitura/escrita de estado.
3. Garantir fallback seguro para dados antigos.
4. Marcar qualquer lacuna de regra como `PONTO DE DECISAO`.

### Criterios de aceite

- Rollover deixa de ficar difuso no codigo.
- App segue carregando sem erro.
- Nao houve perda de dados no fluxo basico de recarga.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- Validacao manual: recarregar app e simular mudanca de data conforme estrategia da sprint.

### Riscos

- Duplicar historico ou sobrescrever dados do dia atual.
- Introduzir regressao silenciosa em persistencia.

### O que NAO alterar

- Nao implementar exportacao/importacao final.
- Nao decidir snapshot historico sem aprovacao humana (`PONTO DE DECISAO`).

### Reversibilidade

- Reversivel por restaurar fluxo anterior de rollover e remover unidade dedicada.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 — Isolar rollover diario em unidade dedicada.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_01_FUNDACAO_DADOS_TAREFAS.md`
- `/src/App.tsx`
- `/src/hooks/useLocalStorage.ts`

Objetivo:
Isolar rollover diario mantendo comportamento atual.

Escopo:
Extrair e integrar regra de rollover com diff controlado.

Fora do escopo:
Definir regras novas de snapshot, exportacao, backup completo ou UI nova.

Arquivos provaveis:
- `src/utils/rollover.ts`
- `src/App.tsx`
- `src/hooks/useLocalStorage.ts`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- validacao manual de recarga e mudanca de data

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 6 — Isolar migracao minima de estado local

### Objetivo

Separar a normalizacao/migracao minima do estado persistido para proteger compatibilidade de dados existentes.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefa 5 concluida.

### Arquivos provaveis

- Arquivo provavel: `src/hooks/useLocalStorage.ts` — a confirmar na codebase.
- Arquivo provavel: `src/utils/stateMigration.ts` ou equivalente — a confirmar na codebase.
- Arquivo provavel: `src/types.ts` — a confirmar na codebase.

### Passos

1. Identificar normalizacao/migracao atualmente embutida na carga do estado.
2. Extrair migracao minima para funcao dedicada.
3. Manter comportamento atual para dados validos e fallback seguro para dados incompletos.
4. Evitar criar versao completa de schema (fora do escopo da sprint).

### Criterios de aceite

- Carga de estado local permanece funcional.
- Dados antigos continuam carregando no fluxo basico.
- Migracao minima fica localizada e revisavel.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- Validacao manual de recarga com dados ja existentes.

### Riscos

- Corrupcao de estado local por migracao incompleta.
- RISCO DE ESCOPO ao tentar implementar backup versionado completo.

### O que NAO alterar

- Nao implementar sistema final de backup/importacao.
- Nao alterar arquitetura de armazenamento para backend.

### Reversibilidade

- Reversivel por restaurar rotina anterior de carregamento e remover modulo de migracao.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 — Isolar migracao minima de estado local.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_01_FUNDACAO_DADOS_TAREFAS.md`
- `/src/hooks/useLocalStorage.ts`
- `/src/types.ts`

Objetivo:
Isolar migracao minima de estado local preservando compatibilidade.

Escopo:
Extrair normalizacao/migracao minima para unidade dedicada.

Fora do escopo:
Backup versionado completo, importador final, backend/sync.

Arquivos provaveis:
- `src/hooks/useLocalStorage.ts`
- `src/utils/stateMigration.ts`
- `src/types.ts`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- recarga manual com dados existentes

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 7 — Conter superficies fora do MVP expostas

### Objetivo

Mapear e conter itens fora do MVP que estejam visiveis/ativos no fluxo atual, sem remocoes arriscadas.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 1 concluida (mapeamento de consumo e fluxo).
- Revisao de escopo no PRD e DECISIONS.

### Arquivos provaveis

- Arquivo provavel: `src/App.tsx` — a confirmar na codebase.
- Arquivo provavel: `src/services/geminiService.ts` — a confirmar na codebase.
- Arquivo provavel: `src/components/WorkoutGenerator.tsx` — a confirmar na codebase.
- Arquivo provavel: `src/components/CoachInsights.tsx` — a confirmar na codebase.

### Passos

1. Identificar itens fora do escopo do MVP ainda expostos ao usuario.
2. Aplicar contencao segura (ocultar, despromover, ou proteger acesso) sem quebrar fluxo existente.
3. Registrar qualquer impacto de escopo como `RISCO DE ESCOPO`.
4. Evitar remocao definitiva de codigo sem confirmacao de nao uso.

### Criterios de aceite

- Nenhum item fora do MVP fica promovido no fluxo principal.
- Fluxos confirmados do MVP permanecem acessiveis.
- Diff restrito aos pontos de exposicao.

### Como validar

- `npm run build`
- `npm run lint`
- Validacao manual de navegacao em Dashboard, Plano, Treino, Progresso, Perfil e Historico.

### Riscos

- Ocultar algo ainda necessario para fluxo atual.
- Regressao de navegacao por condicional incorreta.

### O que NAO alterar

- Nao criar novas features para substituir itens removidos/ocultados.
- Nao alterar regras de negocio centrais.

### Reversibilidade

- Reversivel por restaurar exibicao anterior dos pontos de exposicao.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 7 — Conter superficies fora do MVP expostas.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_01_FUNDACAO_DADOS_TAREFAS.md`
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `/src/App.tsx`

Objetivo:
Conter exposicao de itens fora do MVP sem quebrar fluxos aprovados.

Escopo:
Mapear e aplicar contencao segura apenas nos pontos de exposicao.

Fora do escopo:
Remocao ampla de codigo, nova feature, refatoracao estrutural.

Arquivos provaveis:
- `src/App.tsx`
- `src/services/geminiService.ts`
- `src/components/WorkoutGenerator.tsx`
- `src/components/CoachInsights.tsx`

Validacao:
- `npm run build`
- `npm run lint`
- navegacao manual dos fluxos principais

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 8 — Validacao final da sprint e registro operacional

### Objetivo

Concluir a sprint com validacoes tecnicas e registro operacional de continuidade.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefas 2 a 7 concluidas conforme aplicavel.

### Arquivos provaveis

- Arquivo provavel: `/docs/agent/CURRENT_STATE.md` — a confirmar na codebase.
- Arquivo provavel: `/docs/evolution/CHANGELOG.md` — a confirmar na codebase.
- Arquivo provavel: `/docs/evolution/DECISIONS.md` — a confirmar na codebase.
- Arquivo provavel: `/docs/evolution/out-of-scope-changes.md` — a confirmar na codebase (pode nao existir).

### Passos

1. Rodar validacoes finais da sprint (lint/build/test e fluxo manual).
2. Revisar diff final e conferir aderencia ao escopo da Sprint 1.
3. Atualizar documentacao de continuidade conforme necessidade real.
4. Registrar pendencias, riscos residuais e `PONTO DE DECISAO` aberto.

### Criterios de aceite

- Validacoes executadas e registradas.
- Escopo conferido sem expansao indevida.
- Continuidade documentada para proxima sessao.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- Validacao manual de recarregamento/persistencia e navegacao basica.

### Riscos

- Declarar conclusao sem evidencias objetivas.

### O que NAO alterar

- Nao introduzir novas alteracoes de codigo nesta etapa alem de correcoes pontuais bloqueadoras identificadas nas validacoes.

### Reversibilidade

- Reversivel por remover/ajustar registros documentais incorretos.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 8 — Validacao final da sprint e registro operacional.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_01_FUNDACAO_DADOS_TAREFAS.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`

Objetivo:
Validar a Sprint 1 e registrar continuidade com evidencias.

Escopo:
Executar validacoes, revisar escopo e atualizar documentos necessarios.

Fora do escopo:
Criar novas features ou refatoracoes nao planejadas.

Arquivos provaveis:
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/evolution/out-of-scope-changes.md`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- validacao manual basica

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
| 1 | Tarefa 1 — Mapear contratos e pontos de consumo | Nenhuma | Sim | Apos mapeamento validado |
| 2 | Tarefa 2 — Alinhar contratos centrais em tipos | Tarefa 1 | Nao | Apos `lint` e `build` |
| 3 | Tarefa 3 — Centralizar constantes de dominio | Tarefa 2 | Nao | Apos `lint` e `build` |
| 4 | Tarefa 4 — Extrair utilitarios puros basicos | Tarefa 3 | Nao | Apos `lint`, `build` e `test` |
| 5 | Tarefa 5 — Isolar rollover diario em unidade dedicada | Tarefas 1 a 4 | Nao | Apos validacao manual de recarga |
| 6 | Tarefa 6 — Isolar migracao minima de estado local | Tarefa 5 | Nao | Apos validacao com dados existentes |
| 7 | Tarefa 7 — Conter superficies fora do MVP expostas | Tarefa 1 | Sim | Apos validacao manual de navegacao |
| 8 | Tarefa 8 — Validacao final da sprint e registro operacional | Tarefas 2 a 7 | Nao | Apos consolidar evidencias e docs |

---

# Checklist final da sprint

- [ ] lint executado;
- [ ] typecheck executado;
- [ ] build executado;
- [ ] testes executados;
- [ ] fluxo manual validado;
- [ ] responsividade validada, se houver UI;
- [ ] regressões verificadas;
- [ ] arquivos alterados revisados;
- [ ] escopo conferido contra a sprint original;
- [ ] nenhuma funcionalidade fora do escopo adicionada;
- [ ] nenhuma mudança arquitetural feita sem autorização;
- [ ] limitações registradas;
- [ ] riscos residuais registrados.

---

# Tarefas que NAO devem ir para modelo economico

| Tarefa ou area | Motivo | Risco | Recomendacao |
|---|---|---|---|
| Isolamento de rollover com comportamento legac¸y ambiguo (Tarefa 5) | Pode envolver regras sensiveis de transicao de dia e historico | Alto | Modelo forte ou revisao humana obrigatoria se surgir ambiguidade de regra |
| Migracao de estado local com dados heterogeneos (Tarefa 6) | Risco de corrupcao/perda de dados persistidos | Alto | Modelo forte recomendado quando houver multiplas versoes de estado real |
| Refatoracao ampla de `/src/App.tsx` (qualquer tarefa) | Alto acoplamento e risco de regressao cruzada | Alto | Quebrar em diffs pequenos; se estourar escopo, migrar para modelo forte |

---

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir tarefa relevante ou encontrar novo erro | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando houver decisao tecnica ou regra de negocio | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver mudanca fora do escopo | Sim, se houver mudanca fora do escopo |
