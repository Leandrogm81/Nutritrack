# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: L8 - Sprint 00B: Fundacao de Testes
- objetivo da sprint original: configurar infraestrutura minima de testes antes de implementar funcionalidades
- arquivo de origem: `/docs/implementation/SPRINT_00B_TESTES.md`
- resumo do escopo: configurar framework de testes, criar smoke test real, criar script de teste e documentar estrategia em `test-plan.md`, sem alterar logica de negocio
- documentos consultados:
  - `/docs/agent/agent-operating-rules.md`
  - `/docs/implementation/PLANO_IMPLEMENTACAO.md`
  - `/docs/implementation/SPRINT_00B_TESTES.md`
  - `/docs/evolution/DECISIONS.md`
  - `/docs/product/PRD.md`
- pontos assumidos:
  - projeto usa Node + npm com stack React + Vite + TypeScript
  - `package.json` atual nao possui script de teste
- pontos que precisam ser confirmados na codebase:
  - local exato dos testes (`src/`, `tests/`, `__tests__/`) a confirmar na codebase
  - comandos finais de validacao de testes e cobertura a confirmar no `package.json` apos configuracao

## Analise da Sprint

### Objetivo da sprint

Criar uma base minima, executavel e segura para testes automatizados sem mexer em regra de negocio.

### Escopo identificado

- definir estrategia de testes via `PONTO DE DECISAO`
- instalar e configurar framework de testes
- criar smoke test real que passe com o codigo atual
- adicionar script de teste
- documentar plano de testes em `/docs/implementation/test-plan.md`
- validar que build continua funcionando

### Fora do escopo

- implementar funcionalidades novas
- refatorar arquitetura
- alterar regras de negocio
- expandir para E2E completo nesta sprint

### Dependencias entre partes

- decisao de framework e tipos de teste deve ocorrer antes da instalacao
- configuracao deve ocorrer antes da criacao do smoke test
- smoke test deve existir antes da documentacao final de comandos

### Riscos principais

- regressao por configuracao incorreta de ambiente de teste
- conflito de config TypeScript/Vite
- introducao acidental de mudanca em codigo de negocio
- `RISCO DE ESCOPO`: tentativa de incluir E2E complexo sem decisao explicita

### Estrategia de quebra

Dividir em tarefas curtas: decisao, configuracao minima, smoke test real, documentacao e validacao final. Cada tarefa com diff pequeno e checkpoint.

### Limites para modelo economico

- adequado para modelo economico: decisao guiada, setup basico, smoke test simples, documentacao e validacao
- modelo mais forte recomendado apenas se houver conflito de toolchain, falhas persistentes de ambiente ou necessidade de refatoracao estrutural

---

# Tarefas da Sprint

## Tarefa 1 — Confirmar estrategia e limites de teste

### Objetivo

Registrar decisao formal do framework e dos tipos de teste que serao configurados na sprint.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- leitura de `/docs/agent/agent-operating-rules.md`
- leitura de `/docs/implementation/SPRINT_00B_TESTES.md`

### Arquivos provaveis

- `docs/implementation/SPRINT_00B_TESTES.md` (confirmado)
- `docs/agent/CURRENT_STATE.md` (a confirmar na codebase)
- `docs/agent/HANDOFF.md` (a confirmar na codebase)

### Passos

1. Confirmar stack detectada no `package.json`.
2. Apresentar `PONTO DE DECISAO` com frameworks recomendados e tipos de teste.
3. Registrar escolha aprovada pelo usuario.
4. Registrar limites de escopo (sem logica de negocio, sem refatoracao ampla).

### Criterios de aceite

- decisao de framework registrada
- tipos de teste desta sprint definidos
- limites de escopo documentados

### Como validar

- validacao textual no historico da sessao
- conferir consistencia com `SPRINT_00B_TESTES.md`

### Riscos

- ambiguidade sobre incluir E2E nesta sprint

### O que NAO alterar

- codigo de produto
- configs nao relacionadas a teste

### Reversibilidade

- reversao trivial: remover apenas registro de decisao e reabrir `PONTO DE DECISAO`

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 — Confirmar estrategia e limites de teste.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00B_TESTES.md`
- `/package.json`

Objetivo:
registrar a decisao do framework e dos tipos de teste da Sprint 00B.

Escopo:
confirmar stack, emitir PONTO DE DECISAO, registrar escolha do usuario e limites da sprint.

Fora do escopo:
nao instalar dependencias, nao editar codigo de produto, nao configurar E2E completo.

Arquivos provaveis:
- `/package.json`
- `/docs/implementation/SPRINT_00B_TESTES.md`

Validacao:
- confirmacao explicita da decisao no retorno.

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 2 — Configurar infraestrutura minima de testes

### Objetivo

Instalar e configurar o framework aprovado para executar testes sem erro de configuracao.

### Tipo da tarefa

- configuracao

### Pre-requisitos

- Tarefa 1 concluida com decisao aprovada

### Arquivos provaveis

- `package.json` (confirmado)
- `package-lock.json` (a confirmar na codebase)
- `vitest.config.ts` ou equivalente (a confirmar na codebase)
- `tsconfig.json` e/ou `tsconfig.*.json` (a confirmar na codebase)
- `vite.config.ts` (a confirmar na codebase)

### Passos

1. Instalar dependencias de teste conforme decisao.
2. Criar config minima do framework.
3. Ajustar integracao TS/Vite somente no necessario para testes.
4. Adicionar script de teste no `package.json`.
5. Executar comando de teste para validar setup (mesmo sem smoke test final).

### Criterios de aceite

- comando de teste executa sem erro de configuracao
- script de teste presente no `package.json`
- nenhuma logica de negocio alterada

### Como validar

- `npm run test` (ou script equivalente confirmado no `package.json`)
- `npm run lint`

### Riscos

- conflito entre ambiente ESM/TS e framework de teste
- alteracao indevida em configuracao de build

### O que NAO alterar

- componentes de UI e regras de negocio
- fluxo funcional do app

### Reversibilidade

- remover arquivos de config de testes e dependencias adicionadas
- restaurar scripts originais do `package.json`

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 — Configurar infraestrutura minima de testes.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00B_TESTES.md`
- `/package.json`
- arquivos de config existentes (`vite.config.ts`, `tsconfig*.json`) a confirmar na codebase

Objetivo:
configurar framework de testes aprovado com script executavel.

Escopo:
instalar dependencias de teste, criar config minima, ajustar somente o necessario para rodar testes e adicionar script no `package.json`.

Fora do escopo:
nao alterar logica de negocio, nao refatorar arquitetura, nao incluir E2E completo.

Arquivos provaveis:
- `/package.json`
- `/package-lock.json` (provavel, a confirmar na codebase)
- `/vitest.config.ts` ou equivalente (provavel, a confirmar na codebase)
- `/tsconfig*.json` (provavel, a confirmar na codebase)

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

---

## Tarefa 3 — Criar smoke test real e estavel

### Objetivo

Adicionar um teste simples, real e relevante ao projeto que passe com o codigo existente.

### Tipo da tarefa

- testes

### Pre-requisitos

- Tarefa 2 concluida
- framework executando sem erro de configuracao

### Arquivos provaveis

- `src/**/*.test.ts` ou `src/**/*.test.tsx` (a confirmar na codebase)
- `tests/**/*.test.ts` ou `tests/**/*.test.tsx` (a confirmar na codebase)
- componente/utilitario real do projeto para smoke test (a confirmar na codebase)

### Passos

1. Escolher alvo real de baixo risco (componente ou utilitario existente).
2. Criar smoke test cobrindo comportamento observavel real.
3. Evitar mocks complexos desnecessarios.
4. Executar testes e confirmar aprovacao.

### Criterios de aceite

- existe pelo menos 1 smoke test real
- teste passa no comando oficial
- teste nao depende de gambiarra manual

### Como validar

- `npm run test`
- se houver: `npm run test -- --run`

### Riscos

- escolher alvo instavel e gerar flakiness
- depender de ambiente externo

### O que NAO alterar

- regras de negocio para “fazer o teste passar”
- comportamento funcional de telas

### Reversibilidade

- remover apenas arquivo(s) de teste criados e manter infraestrutura

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 — Criar smoke test real e estavel.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00B_TESTES.md`
- configuracao de testes criada na tarefa anterior
- arquivo alvo do teste (a confirmar na codebase)

Objetivo:
criar 1 smoke test real, simples e executavel em CI.

Escopo:
adicionar arquivo de teste para comportamento real existente e garantir que passe sem alterar logica de negocio.

Fora do escopo:
nao criar bateria extensa, nao refatorar codigo de produto, nao incluir E2E.

Arquivos provaveis:
- `/src/**/*.test.ts(x)` ou `/tests/**/*.test.ts(x)` (a confirmar na codebase)
- arquivo de componente/utilitario real alvo (a confirmar na codebase)

Validacao:
- `npm run test`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 4 — Documentar estrategia em test-plan

### Objetivo

Criar documento operacional de testes conforme template da sprint.

### Tipo da tarefa

- documentacao

### Pre-requisitos

- Tarefas 1, 2 e 3 concluidas
- comandos e padrao de localizacao dos testes confirmados

### Arquivos provaveis

- `docs/implementation/test-plan.md` (novo arquivo)
- `package.json` (referencia, a confirmar na codebase)

### Passos

1. Criar `test-plan.md` com framework e versao.
2. Documentar tipos de teste configurados.
3. Documentar localizacao e nomenclatura dos testes.
4. Documentar comandos de execucao confirmados.
5. Registrar decisoes tomadas e cobertura esperada.

### Criterios de aceite

- `test-plan.md` existe com todas as secoes exigidas
- comandos documentados batem com `package.json`
- sem registrar como concluido o que nao foi executado

### Como validar

- revisao manual do arquivo
- comparacao com scripts do `package.json`

### Riscos

- documentacao divergente da configuracao real

### O que NAO alterar

- codigo de aplicacao
- escopo do plano para alem da Sprint 00B

### Reversibilidade

- remocao ou edicao isolada do arquivo de documentacao

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 — Documentar estrategia em test-plan.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00B_TESTES.md`
- `/package.json`
- arquivos de configuracao de teste criados

Objetivo:
criar `/docs/implementation/test-plan.md` completo e consistente com a configuracao real.

Escopo:
documentar framework, tipos, localizacao, nomenclatura, comandos, cobertura esperada e decisoes.

Fora do escopo:
nao alterar codigo de produto e nao inventar comandos.

Arquivos provaveis:
- `/docs/implementation/test-plan.md`
- `/package.json`

Validacao:
- revisao manual de consistencia entre documento e scripts reais.

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 5 — Validacao final da sprint e continuidade

### Objetivo

Executar validacoes finais, conferir escopo e atualizar continuidade sem declarar falso positivo.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefas 1 a 4 concluidas

### Arquivos provaveis

- `package.json` (confirmado)
- `docs/agent/CURRENT_STATE.md` (a confirmar na codebase)
- `docs/agent/HANDOFF.md` (a confirmar na codebase)
- `docs/evolution/CHANGELOG.md` (a confirmar na codebase)
- `docs/evolution/DECISIONS.md` (a confirmar na codebase)

### Passos

1. Rodar validacoes finais da sprint.
2. Conferir que nenhuma logica de negocio foi alterada.
3. Registrar evidencias e limitacoes reais.
4. Atualizar `CURRENT_STATE.md` e `HANDOFF.md` com estado pos-sprint.
5. Atualizar `CHANGELOG.md` somente se houve mudanca real.
6. Atualizar `DECISIONS.md` apenas se surgiu decisao nova permanente.

### Criterios de aceite

- framework configurado
- smoke test existe e passa
- script de teste existe
- `test-plan.md` criado
- build continua funcionando
- sem alteracao de logica de negocio

### Como validar

- `npm run test`
- `npm run lint`
- `npm run build`
- revisao de diff final

### Riscos

- declarar sucesso sem evidencias completas
- atualizar documentos com informacao nao verificada

### O que NAO alterar

- regras de negocio
- escopo de funcionalidades

### Reversibilidade

- rollback por commits por tarefa/checkpoint
- remocao isolada de configuracao de testes se necessario

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 — Validacao final da sprint e continuidade.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_00B_TESTES.md`
- arquivos alterados nas tarefas 1 a 4

Objetivo:
validar a sprint, confirmar limites de escopo e atualizar documentacao de continuidade.

Escopo:
executar validacoes (`test`, `lint`, `build`), revisar diff e atualizar `CURRENT_STATE`/`HANDOFF` e, se aplicavel, `CHANGELOG`/`DECISIONS`.

Fora do escopo:
nao implementar novas funcionalidades, nao refatorar arquitetura.

Arquivos provaveis:
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/evolution/DECISIONS.md`

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

---

# Ordem recomendada de execucao

| Ordem | Tarefa | Depende de | Pode executar isolada? | Checkpoint recomendado |
|---|---|---|---|---|
| 1 | Tarefa 1 — Confirmar estrategia e limites de teste | Nenhuma | Sim | Apos decisao aprovada |
| 2 | Tarefa 2 — Configurar infraestrutura minima de testes | Tarefa 1 | Nao | Apos `npm run test` sem erro de setup |
| 3 | Tarefa 3 — Criar smoke test real e estavel | Tarefa 2 | Nao | Apos smoke test passando |
| 4 | Tarefa 4 — Documentar estrategia em test-plan | Tarefas 1-3 | Sim | Apos revisao de consistencia documental |
| 5 | Tarefa 5 — Validacao final da sprint e continuidade | Tarefas 1-4 | Nao | Apos `test + lint + build` e diff final |

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

Nenhuma tarefa identificada como obrigatoria para modelo mais forte, desde que a Sprint 0 e a leitura da codebase estejam concluidas.

---

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir tarefa relevante ou encontrar novo erro | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando houver decisao tecnica ou regra de negocio | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver mudanca fora do escopo | Sim, se houver mudanca fora do escopo |
