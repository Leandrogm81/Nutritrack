# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: Sprint 2 - Perfil e metas
- objetivo da sprint original: fechar formulario de perfil e comportamento de metas diarias conforme PRD, com calculo automatico revisavel, validacoes minimas e persistencia local confiavel
- arquivo de origem, se houver: `/docs/implementation/SPRINT_02_PERFIL_METAS.md`
- resumo do escopo:
  - alinhar campos obrigatorios e opcionais de perfil;
  - validar entradas numericas e macros customizados;
  - aplicar formula aprovada para metas automaticas e manter editabilidade manual;
  - persistir peso e bioimpedancia opcional sem bloquear uso.
- documentos consultados:
  - `/docs/agent/agent-operating-rules.md`
  - `/docs/implementation/PLANO_IMPLEMENTACAO.md`
  - `/docs/implementation/SPRINT_02_PERFIL_METAS.md`
  - `/docs/product/PRD.md`
  - `/docs/evolution/DECISIONS.md`
  - `/docs/design/UI_UX_GUIDE_SECTION_16.md` (referencia complementar)
- pontos assumidos:
  - Sprint 0 e Sprint 1 estao concluidas, conforme documentos de continuidade.
  - `npm run lint` e `npm run build` existem e devem ser usados como validacao base.
  - `npm run test` existe no projeto, mas deve ser confirmado no `package.json` durante execucao.
- pontos que precisam ser confirmados na codebase:
  - local exato do calculo atual de metas diarias;
  - contrato atual de `UserProfile` e relacao com metas;
  - estrategia atual de persistencia de peso inicial e historico de peso;
  - comportamento atual de metas editadas manualmente apos recarregar o app.

## Analise da Sprint

### Objetivo da sprint

Concluir o ciclo de perfil e metas sem regressao, mantendo calculo automatico coerente com PRD e liberdade de edicao manual pelo usuario.

### Escopo identificado

- Campos obrigatorios e opcionais do formulario de perfil.
- Validacoes numericas e fluxos de macros customizados.
- Calculo automatico de metas com formula aprovada.
- Preservacao da editabilidade manual das metas.
- Persistencia local de perfil, metas, peso e bioimpedancia opcional.
- Reabertura do app sem perda de dados.

### Fora do escopo

- Dashboard completo fora dos pontos tocados por metas.
- Exportacao, historico final e progresso final.
- Decisao de snapshot historico de metas (`PONTO DE DECISAO`).
- Login, sync, backend e compartilhamento.
- Ajustes de fluxos de IA.

### Dependencias entre partes

- Tarefas de validacao de formulario dependem do mapeamento inicial de contratos.
- Fechamento de calculo de metas depende da confirmacao do ponto atual de calculo.
- Persistencia de peso/bioimpedancia depende do contrato de tipos e do salvamento de perfil.
- Reabertura sem perda depende da consistencia das tarefas anteriores.

### Riscos principais

- Regressao de regra de calculo calorico por divergencia com PRD.
- Sobrescrever metas manuais em salvamentos subsequentes.
- Tornar campos opcionais obrigatorios por validacao acoplada.
- Alterar comportamento fora de perfil/metas por tocar `App.tsx` (`RISCO DE ESCOPO`).

### Estrategia de quebra

Quebrar em blocos pequenos, iniciando por leitura/mapeamento e seguindo para: validacao de formulario, validacao de macros customizados, calculo/editabilidade de metas, persistencia de peso/bioimpedancia e verificacao final de persistencia/reabertura com regressao minima.

### Limites para modelo economico

- Modelo economico e suficiente para leitura/mapeamento, validacoes de formulario, ajustes localizados de tipo/componente e validacoes manuais guiadas.
- Ajuste de calculo de metas pode exigir modelo intermediario se houver logica espalhada em muitos arquivos.
- Nao ha tarefa obrigatoria de modelo forte nesta sprint, desde que nao haja refatoracao ampla.

---

# Tarefas da Sprint

## Tarefa 1 — Mapear contratos e pontos de calculo/persistencia

### Objetivo

Mapear com evidencia os contratos de `UserProfile` e `goals`, o fluxo de salvamento e o local real do calculo de metas antes de qualquer alteracao.

### Tipo da tarefa

- leitura/mapeamento.

### Pre-requisitos

- Leitura de `/docs/agent/agent-operating-rules.md`.
- Leitura de `/docs/implementation/SPRINT_02_PERFIL_METAS.md`.

### Arquivos provaveis

- Arquivo provavel: `src/types.ts` (a confirmar na codebase).
- Arquivo provavel: `src/components/UserProfileForm.tsx` (a confirmar na codebase).
- Arquivo provavel: `src/App.tsx` (a confirmar na codebase).
- Arquivo provavel: `src/hooks/useLocalStorage.ts` (a confirmar na codebase).

### Passos

1. Localizar interfaces/tipos de perfil, metas e campos opcionais/obrigatorios.
2. Localizar o ponto de calculo automatico de metas e listar dependencias.
3. Localizar ponto de salvamento de perfil, metas e registros corporais.
4. Documentar em comentario de PR/relatorio curto os arquivos e trechos mapeados.

### Criterios de aceite

- O local do calculo de metas foi identificado com caminho de arquivo.
- O contrato atual de perfil e metas foi listado.
- O ponto de persistencia foi identificado e relacionado aos tipos.
- Nenhum arquivo foi alterado nesta tarefa.

### Como validar

- Validacao manual de leitura dos arquivos mapeados.
- Se necessario, confirmar comandos no `package.json` para etapas futuras.

### Riscos

- Mapeamento incompleto gerar alteracoes em local incorreto.

### O que NAO alterar

- Nao alterar codigo de producao.
- Nao alterar comportamento funcional.

### Reversibilidade

- Tarefa totalmente reversivel por nao gerar alteracao de codigo.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 — Mapear contratos e pontos de calculo/persistencia.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS_TAREFAS.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS.md`
- `src/types.ts`
- `src/components/UserProfileForm.tsx`
- `src/App.tsx`
- `src/hooks/useLocalStorage.ts`

Objetivo:
Mapear contrato de perfil/metas, local de calculo e pontos de persistencia sem alterar codigo.

Escopo:
Ler e documentar caminhos reais e dependencias.

Fora do escopo:
Qualquer implementacao ou refatoracao.

Arquivos provaveis:
- `src/types.ts`
- `src/components/UserProfileForm.tsx`
- `src/App.tsx`
- `src/hooks/useLocalStorage.ts`

Validacao:
- Evidenciar os caminhos e fluxos mapeados.

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 2 — Fechar campos obrigatorios/opcionais e validacoes basicas de perfil

### Objetivo

Garantir que campos obrigatorios e opcionais do perfil estejam alinhados ao PRD e que o formulario bloqueie salvamento invalido sem bloquear opcionais.

### Tipo da tarefa

- UI/componente.

### Pre-requisitos

- Tarefa 1 concluida.

### Arquivos provaveis

- Arquivo provavel: `src/components/UserProfileForm.tsx` (a confirmar na codebase).
- Arquivo provavel: `src/types.ts` (a confirmar na codebase).

### Passos

1. Confirmar campos obrigatorios: nome, idade, peso atual e altura.
2. Confirmar defaults para genero biologico, nivel de atividade, objetivo e tipo de dieta.
3. Confirmar campos opcionais: bioimpedancia e restricoes alimentares.
4. Ajustar mensagens/estados de erro para impedir salvamento invalido.
5. Revisar compatibilidade entre tipo e formulario.

### Criterios de aceite

- Formulario nao salva quando campos obrigatorios estao ausentes.
- Formulario salva com campos opcionais vazios.
- Tipagem e formulario estao consistentes para os campos desta tarefa.
- Nenhum arquivo fora da lista provavel foi alterado sem justificativa.

### Como validar

- `npm run lint`.
- Validacao manual: tentar salvar com campos faltando e com preenchimento valido.

### Riscos

- Validacao duplicada/contraditoria entre estado e tipo.
- Regressao de UX no formulario.

### O que NAO alterar

- Nao alterar formula de metas.
- Nao alterar fluxos de IA.
- Nao alterar telas fora de perfil.

### Reversibilidade

- Reversivel por diff pequeno concentrado no formulario/tipos.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 — Fechar campos obrigatorios/opcionais e validacoes basicas de perfil.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS_TAREFAS.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS.md`
- `src/components/UserProfileForm.tsx`
- `src/types.ts`

Objetivo:
Alinhar obrigatorios/opcionais e validacoes basicas do formulario de perfil.

Escopo:
Ajustar validacoes e defaults apenas no fluxo de perfil.

Fora do escopo:
Calculo de metas, persistencia avancada, IA, Dashboard completo.

Arquivos provaveis:
- `src/components/UserProfileForm.tsx`
- `src/types.ts`

Validacao:
- `npm run lint`
- teste manual de erro/sucesso no formulario

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 3 — Validar entradas numericas e macros customizados

### Objetivo

Fechar validacoes de entradas numericas e do fluxo de macros customizados sem alterar regras de negocio fora da sprint.

### Tipo da tarefa

- logica de negocio.

### Pre-requisitos

- Tarefa 2 concluida.

### Arquivos provaveis

- Arquivo provavel: `src/components/UserProfileForm.tsx` (a confirmar na codebase).
- Arquivo provavel: `src/types.ts` (a confirmar na codebase).

### Passos

1. Confirmar limites minimos/coerencia para idade, altura, peso e agua/meta.
2. Confirmar regra de habilitacao de macros customizados quando dieta = `custom`.
3. Bloquear salvamento em caso de valores invalidos ou incompletos no modo custom.
4. Garantir que campos nao customizados nao exijam macros manuais.

### Criterios de aceite

- Valores numericos invalidos nao sao aceitos no salvamento.
- Fluxo `custom` exige macros validos.
- Fluxos nao customizados mantem comportamento esperado.

### Como validar

- `npm run lint`.
- Validacao manual de cenarios: dieta `custom` e dieta nao `custom`.

### Riscos

- Quebra de retrocompatibilidade de perfis salvos antigos.

### O que NAO alterar

- Nao alterar formula de calculo calorico aprovada.
- Nao alterar persistencia global fora do perfil.

### Reversibilidade

- Reversivel por alteracoes locais no formulario e tipos.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 — Validar entradas numericas e macros customizados.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS_TAREFAS.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS.md`
- `src/components/UserProfileForm.tsx`
- `src/types.ts`

Objetivo:
Fechar validacoes numericas e regras de macros customizados.

Escopo:
Ajustar validacoes e bloqueios de salvamento apenas para perfil/metas.

Fora do escopo:
Mudancas de arquitetura, Dashboard geral, IA, exportacao/historico.

Arquivos provaveis:
- `src/components/UserProfileForm.tsx`
- `src/types.ts`

Validacao:
- `npm run lint`
- teste manual com dieta `custom` e nao `custom`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 4 — Fechar calculo automatico de metas e preservar editabilidade manual

### Objetivo

Aplicar/confirmar calculo automatico de metas conforme PRD (Mifflin-St Jeor + atividade + objetivo) sem remover edicao manual posterior.

### Tipo da tarefa

- estado/integracao.

### Pre-requisitos

- Tarefa 1 concluida.
- Tarefa 2 concluida.
- Tarefa 3 concluida.

### Arquivos provaveis

- Arquivo provavel: `src/components/UserProfileForm.tsx` (a confirmar na codebase).
- Arquivo provavel: `src/App.tsx` (a confirmar na codebase).
- Arquivo provavel: `src/types.ts` (a confirmar na codebase).
- Arquivo provavel: `src/utils/goals.ts` (a confirmar na codebase; criar apenas se necessario e com diff pequeno).

### Passos

1. Confirmar a implementacao atual da formula e comparar com PRD/DECISIONS.
2. Ajustar discrepancias sem mudar contratos fora da sprint.
3. Garantir que metas calculadas possam ser editadas manualmente e nao sejam sobrescritas indevidamente.
4. Garantir que meta de agua continue editavel.

### Criterios de aceite

- Perfil salvo gera metas automaticas coerentes com a formula aprovada.
- Usuario consegue editar metas manualmente apos calculo automatico.
- Reabrir perfil nao desfaz metas manuais sem acao explicita do usuario.

### Como validar

- `npm run lint`.
- `npm run build`.
- Teste manual com perfis diferentes e ajuste manual de metas.

### Riscos

- Divergir da formula aprovada.
- Sobrescrever metas manuais.
- Tocar `App.tsx` com impacto colateral (`RISCO DE ESCOPO`).

### O que NAO alterar

- Nao implementar snapshot historico de metas (`PONTO DE DECISAO`).
- Nao alterar fluxo de refeicoes, treino, IA ou exportacao.

### Reversibilidade

- Reversivel por checkpoint antes/depois da tarefa; manter diff pequeno e focado.

### Modelo recomendado

- modelo intermediario recomendado.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 — Fechar calculo automatico de metas e preservar editabilidade manual.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS_TAREFAS.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS.md`
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `src/components/UserProfileForm.tsx`
- `src/App.tsx`
- `src/types.ts`

Objetivo:
Garantir calculo automatico conforme PRD e manter edicao manual sem sobrescrita indevida.

Escopo:
Ajustar apenas o fluxo de metas do perfil.

Fora do escopo:
Snapshot historico, exportacao, IA, login/sync/backend, refatoracao ampla de `App.tsx`.

Arquivos provaveis:
- `src/components/UserProfileForm.tsx`
- `src/App.tsx`
- `src/types.ts`
- `src/utils/goals.ts` (se necessario)

Validacao:
- `npm run lint`
- `npm run build`
- teste manual de calculo + edicao manual de metas

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 5 — Persistir peso e bioimpedancia opcional no fluxo de perfil

### Objetivo

Garantir persistencia de peso e bioimpedancia opcional sem bloquear salvamento e sem duplicacao indevida de dados.

### Tipo da tarefa

- estado/integracao.

### Pre-requisitos

- Tarefa 4 concluida.

### Arquivos provaveis

- Arquivo provavel: `src/components/UserProfileForm.tsx` (a confirmar na codebase).
- Arquivo provavel: `src/App.tsx` (a confirmar na codebase).
- Arquivo provavel: `src/types.ts` (a confirmar na codebase).
- Arquivo provavel: `src/hooks/useLocalStorage.ts` (a confirmar na codebase).

### Passos

1. Confirmar estrategia atual de salvar peso inicial e registros subsequentes.
2. Ajustar persistencia para aceitar bioimpedancia em branco sem bloquear fluxo.
3. Evitar duplicidade evidente de registros corporais no salvamento de perfil.
4. Validar leitura correta apos reload.

### Criterios de aceite

- Usuario salva perfil com e sem bioimpedancia.
- Peso fica disponivel para uso posterior no app.
- Nao ha erro de persistencia ao reabrir o app.

### Como validar

- `npm run lint`.
- `npm run build`.
- Validacao manual: salvar perfil, recarregar app, conferir campos persistidos.

### Riscos

- Duplicar entradas de peso.
- Regressao em dados ja existentes.

### O que NAO alterar

- Nao alterar graficos finais de progresso.
- Nao alterar exportacao/historico/backup final.

### Reversibilidade

- Reversivel por diff pequeno e checkpoint de validacao antes do merge.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 — Persistir peso e bioimpedancia opcional no fluxo de perfil.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS_TAREFAS.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS.md`
- `src/components/UserProfileForm.tsx`
- `src/App.tsx`
- `src/types.ts`
- `src/hooks/useLocalStorage.ts`

Objetivo:
Persistir peso e bioimpedancia opcional sem travar o fluxo.

Escopo:
Ajustar apenas o salvamento/leitura do perfil e dados corporais relacionados.

Fora do escopo:
Progresso final, exportacao, backup completo, IA, login/sync.

Arquivos provaveis:
- `src/components/UserProfileForm.tsx`
- `src/App.tsx`
- `src/types.ts`
- `src/hooks/useLocalStorage.ts`

Validacao:
- `npm run lint`
- `npm run build`
- teste manual de salvar/recarregar com e sem bioimpedancia

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

## Tarefa 6 — Validacao final de persistencia, regressao minima e fechamento da sprint

### Objetivo

Executar validacao final da sprint para confirmar persistencia/reabertura sem perda e ausencia de regressao funcional evidente nas areas tocadas.

### Tipo da tarefa

- validacao.

### Pre-requisitos

- Tarefas 1 a 5 concluidas.

### Arquivos provaveis

- Arquivo provavel: `src/App.tsx` (a confirmar na codebase).
- Arquivo provavel: `src/components/UserProfileForm.tsx` (a confirmar na codebase).
- Arquivo provavel: `src/hooks/useLocalStorage.ts` (a confirmar na codebase).
- Arquivo provavel: `docs/agent/CURRENT_STATE.md` (a confirmar na codebase).
- Arquivo provavel: `docs/evolution/CHANGELOG.md` (a confirmar na codebase).

### Passos

1. Executar validacoes tecnicas da sprint.
2. Executar fluxo manual definido na sprint original (erro/sucesso, salvamento, edicao de metas, reload).
3. Revisar diff e confirmar que nenhuma area fora de escopo foi alterada.
4. Registrar limitacoes/riscos residuais.
5. Atualizar documentos de continuidade apenas se houve implementacao real.

### Criterios de aceite

- Validacoes tecnicas executadas sem falha bloqueante.
- Fluxo manual de perfil/metas passou sem perda apos reload.
- Escopo permanece restrito a perfil/metas.
- Documentacao de continuidade atualizada quando aplicavel.

### Como validar

- `npm run lint`.
- `npm run build`.
- `npm run test` (confirmar no `package.json`; se ausente, registrar como nao executado).
- `npm run dev` para validacao manual de reabertura.

### Riscos

- Falso positivo por validacao manual incompleta.
- Regressao silenciosa fora da area testada.

### O que NAO alterar

- Nao abrir escopo para novas funcionalidades.
- Nao alterar arquitetura.

### Reversibilidade

- Reversivel por checkpoints de commit por tarefa e rollback pontual do bloco final.

### Modelo recomendado

- modelo economico suficiente.

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 — Validacao final de persistencia, regressao minima e fechamento da sprint.

Antes de editar, leia:

- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS_TAREFAS.md`
- `/docs/implementation/SPRINT_02_PERFIL_METAS.md`
- `src/App.tsx`
- `src/components/UserProfileForm.tsx`
- `src/hooks/useLocalStorage.ts`

Objetivo:
Validar a sprint completa e fechar com evidencias tecnicas e manuais.

Escopo:
Executar validacoes, revisar regressao minima e atualizar continuidade quando houver implementacao real.

Fora do escopo:
Nova implementacao fora de perfil/metas, alteracao arquitetural, expansao de sprint.

Arquivos provaveis:
- `src/App.tsx`
- `src/components/UserProfileForm.tsx`
- `src/hooks/useLocalStorage.ts`
- `docs/agent/CURRENT_STATE.md`
- `docs/evolution/CHANGELOG.md`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test` (se existir)
- validacao manual de reload e persistencia

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
| 1 | Tarefa 1 | Nenhuma | Sim | Apos mapeamento validado |
| 2 | Tarefa 2 | Tarefa 1 | Nao | Apos `npm run lint` |
| 3 | Tarefa 3 | Tarefa 2 | Nao | Apos validacao manual de macros |
| 4 | Tarefa 4 | Tarefas 1, 2 e 3 | Nao | Apos `npm run lint` + `npm run build` |
| 5 | Tarefa 5 | Tarefa 4 | Nao | Apos reload validado |
| 6 | Tarefa 6 | Tarefas 1 a 5 | Nao | Apos validacoes finais e revisao de escopo |

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
| Tarefa 4 (somente se a logica de metas estiver muito espalhada) | Pode envolver integracao em multiplos pontos de estado e risco de regressao de regra de negocio | Medio | Modelo intermediario recomendado + revisao humana obrigatoria |

---

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir tarefa relevante ou encontrar novo erro | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando houver decisao tecnica ou regra de negocio | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver mudanca fora do escopo | Sim, se houver mudanca fora do escopo |
