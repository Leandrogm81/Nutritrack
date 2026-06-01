# Sprint 7 - Treino, execucao, cardio e passos

## Objetivo

Alinhar o pilar fisico do MVP para que treino executado, cardio e passos reflitam corretamente no dia atual e no historico, sem inventar formula energetica nova.

## Escopo da sprint

- Fechar cadastro e exclusao de treinos.
- Alinhar registro de treino executado como evento separado do plano semanal.
- Validar passos diarios e cardio com campos minimos obrigatorios.
- Refletir os registros fisicos no resumo do dia e no historico.

## Fora do escopo

- Geracao/importacao de treino por IA.
- Agenda semanal de treinos.
- Novas formulas de gasto para treino de forca ou passos.
- Relatorios avancados de performance.

## Dependencias da sprint

- Sprints 0 a 6 concluidas.
- Historico diario funcional.
- Regras de cardio baseadas em MET documentadas ou confirmadas.
- Confirmacao do que hoje e calculado em `/src/components/ActivityTracker.tsx` e consumido em `/src/components/Dashboard.tsx`.

## Arquivos provaveis a criar/alterar

- Arquivo confirmado na codebase: `/src/components/WorkoutTracker.tsx`
- Arquivo confirmado na codebase: `/src/components/ActivityTracker.tsx`
- Arquivo confirmado na codebase: `/src/components/Dashboard.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo provavel a criar: `/src/utils/activity.ts` ou equivalente, a confirmar na Sprint 0

## Tarefas em ordem

### Tarefa 7.1 - Alinhar cadastro e execucao de treinos

Descricao:
Garantir que o usuario consiga cadastrar treino, registrar execucao e excluir treino salvo sem confundir plano com execucao real.

Arquivos provaveis:
- `/src/components/WorkoutTracker.tsx`
- `/src/App.tsx`
- `/src/types.ts`

Criterio de aceite:
- Treino salvo e treino executado permanecem entidades separadas e consultaveis.

Validacao:
- `npm run lint`
- Teste manual de cadastrar, executar e excluir treino

Riscos:
- Misturar treino salvo com treino realizado no historico.

O que NAO alterar:
- Agenda semanal de treino.

### Tarefa 7.2 - Fechar passos diarios e cardio com validacoes minimas

Descricao:
Garantir que passos aceitem apenas totais validos e que cardio exija tipo, duracao maior que zero e intensidade.

Arquivos provaveis:
- `/src/components/ActivityTracker.tsx`
- `/src/types.ts`
- `/src/App.tsx`

Criterio de aceite:
- O usuario salva passos e cardio validos e recebe bloqueio claro para entradas invalidas.

Validacao:
- `npm run build`
- Teste manual com valores validos e invalidos

Riscos:
- Validacao frouxa permitir dados absurdos ou negativos.

O que NAO alterar:
- Formula nova para passos em kcal.

### Tarefa 7.3 - Alinhar impacto fisico no resumo diario

Descricao:
Refletir treino executado, cardio e passos no Dashboard e no Historico sem inventar gasto energetico fora da regra documentada.

Arquivos provaveis:
- `/src/components/Dashboard.tsx`
- `/src/components/ActivityTracker.tsx`
- `/src/App.tsx`

Criterio de aceite:
- O resumo do dia mostra os registros fisicos corretamente e passos continuam visiveis mesmo sem kcal automatica obrigatoria.

Validacao:
- `npm run dev`
- Teste manual do resumo do dia

Riscos:
- Recalculo errado de gasto ou indicadores duplicados.

O que NAO alterar:
- Metas caloricas de perfil e exportacao minima alem do necessario.

### Tarefa 7.4 - Garantir persistencia e leitura posterior

Descricao:
Confirmar que treino, cardio e passos continuam consultaveis depois no Historico e nao desaparecem apos reload.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/components/HistoryCalendar.tsx`
- `/src/hooks/useLocalStorage.ts`

Criterio de aceite:
- Os registros fisicos permanecem acessiveis no dia atual e no historico diario.

Validacao:
- `npm run build`
- Recarregar o app e consultar Historico

Riscos:
- Persistencia parcial ou perda de logs no rollover.

O que NAO alterar:
- Agenda semanal de treinos e IA de treino.

## Comandos de validacao da sprint

- `npm run lint`
- `npm run build`
- `npm run dev`
- Testes automatizados: a confirmar na Sprint 0

## Testes necessarios

- Teste manual de cadastro/exclusao de treino.
- Teste manual de execucao de treino.
- Teste manual de passos validos/invalidos.
- Teste manual de cardio valido/invalido.
- Teste de regressao do Historico apos salvar atividade fisica.

## Fluxo manual de validacao

1. Abrir Treino > Registro.
2. Cadastrar um treino e marcar uma execucao.
3. Abrir Treino > Cardio e salvar passos.
4. Registrar um cardio com tipo, duracao e intensidade.
5. Voltar ao Dashboard e ao Historico para conferir reflexo dos dados.

## Riscos da sprint

- Formula energetica nao alinhada ao PRD.
- Regressao em historico diario.
- Confusao entre treino planejado e executado.

## Criterios finais de aceite da sprint

- Treino executado separado do treino planejado.
- Passos e cardio validados e persistidos.
- Resumo diario e Historico refletem a atividade fisica.
- Nenhuma formula nova fora da regra documentada.

## O que NAO deve ser alterado nesta sprint

- Geracao/importacao por IA.
- Planejador semanal de treino.
- Backup/importacao local.

## Atualizacoes documentais recomendadas

- Atualizar `/docs/agent/CURRENT_STATE.md`
- Atualizar `/docs/evolution/CHANGELOG.md`
