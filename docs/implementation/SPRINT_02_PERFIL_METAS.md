# Sprint 2 - Perfil e metas

## Objetivo

Fechar o formulario de perfil e o comportamento das metas diarias conforme o PRD, com calculo automatico revisavel, validacoes minimas e persistencia local confiavel.

## Escopo da sprint

- Alinhar campos obrigatorios e opcionais do perfil.
- Validar entradas numericas e macros customizados.
- Aplicar a formula aprovada de metas automaticas e manter editabilidade manual.
- Persistir peso e bioimpedancia opcional sem bloquear o uso.

## Fora do escopo

- Ajustar a tela inteira do Dashboard.
- Implementar exportacao, historico ou progresso final.
- Resolver o `PONTO DE DECISAO` do snapshot historico.
- Adicionar login, sync ou compartilhamento.

## Dependencias da sprint

- Sprints 0 e 1 concluidas.
- Regras de dominio basicas estabilizadas.
- Confirmacao do local exato do calculo atual de metas.
- Confirmacao da estrategia para armazenar peso inicial e peso historico.

## Arquivos provaveis a criar/alterar

- Arquivo confirmado na codebase: `/src/components/UserProfileForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo provavel a criar: `/src/utils/goals.ts` ou equivalente, a confirmar na Sprint 0

## Tarefas em ordem

### Tarefa 2.1 - Alinhar campos obrigatorios e opcionais do perfil

Descricao:
Garantir que nome, idade, peso atual e altura sejam obrigatorios; genero biologico, nivel de atividade, objetivo e tipo de dieta tenham selecao padrao; bioimpedancia e restricoes alimentares permaneçam opcionais.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/types.ts`

Criterio de aceite:
- O formulario nao salva sem os campos obrigatorios e aceita os campos opcionais em branco.

Validacao:
- `npm run lint`
- Fluxo manual de erro/sucesso no formulario

Riscos:
- Validacao inconsistente entre tipo e formulario.

O que NAO alterar:
- Fluxos de IA e telas fora do Perfil.

### Tarefa 2.2 - Fechar calculo automatico e editabilidade das metas

Descricao:
Aplicar a logica aprovada de Mifflin-St Jeor, multiplicador de atividade, ajuste por objetivo e meta de agua editavel, sem remover a edicao manual das metas.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/App.tsx`
- Arquivo provavel a criar: `/src/utils/goals.ts`

Criterio de aceite:
- O usuario salva o perfil, recebe metas automaticas coerentes e pode ajusta-las manualmente depois.

Validacao:
- `npm run lint`
- `npm run build`
- Teste manual com perfis diferentes

Riscos:
- Divergir da formula aprovada no PRD ou sobrescrever metas editadas pelo usuario.

O que NAO alterar:
- Snapshot historico das metas do dia.

### Tarefa 2.3 - Persistir peso e bioimpedancia inicial sem travar o fluxo

Descricao:
Garantir que o salvamento do perfil tambem registre peso atual e bioimpedancia quando houver, sem tornar esses campos bloqueantes.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/App.tsx`
- `/src/types.ts`

Criterio de aceite:
- O usuario consegue salvar perfil com ou sem bioimpedancia, e o peso inicial fica disponivel para progresso posterior.

Validacao:
- `npm run build`
- Reabrir o app apos salvar o perfil

Riscos:
- Duplicar entradas de peso ou registrar valores invalidos.

O que NAO alterar:
- Graficos finais de progresso e exportacao.

### Tarefa 2.4 - Garantir persistencia e reabertura sem perda

Descricao:
Verificar que perfil e metas reaparecem apos reload e que o app nao interpreta ausencia de perfil como dado corrompido.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/hooks/useLocalStorage.ts`

Criterio de aceite:
- Perfil salvo e reencontrado apos recarregar o app.

Validacao:
- `npm run dev`
- Recarregar a pagina apos salvar

Riscos:
- Persistencia parcial ou regressao em dados existentes.

O que NAO alterar:
- Estrategia de backup/importacao completa.

## Comandos de validacao da sprint

- `npm run lint`
- `npm run build`
- `npm run dev`
- Testes automatizados: a confirmar na Sprint 0

## Testes necessarios

- Teste manual de campos obrigatorios.
- Teste manual de macros customizados com tipo de dieta `custom`.
- Teste manual de persistencia apos reload.
- Regressao basica do Dashboard para garantir que consome as metas sem erro.

## Fluxo manual de validacao

1. Abrir Perfil.
2. Tentar salvar com campos faltando e confirmar mensagens/impedimento.
3. Salvar um perfil valido sem bioimpedancia.
4. Editar metas manualmente e salvar novamente.
5. Recarregar o app e confirmar que perfil e metas persistiram.

## Riscos da sprint

- Formula divergente do PRD.
- Estado salvo sobrescrever ajustes manuais do usuario.
- Campos opcionais virarem obrigatorios por erro de UI.

## Criterios finais de aceite da sprint

- Perfil alinhado ao PRD.
- Metas automaticas calculadas e editaveis.
- Peso salvo e bioimpedancia opcional.
- Persistencia local funcionando sem perda.

## O que NAO deve ser alterado nesta sprint

- Fluxo manual de refeicoes.
- Fluxos de IA.
- Historico, exportacao e backup final.

## Atualizacoes documentais recomendadas

- Atualizar `/docs/agent/CURRENT_STATE.md`
- Atualizar `/docs/evolution/CHANGELOG.md` apos implementacao real
