# Sprint 8 - Plano de treino e IA

## Objetivo

Fechar o planejamento semanal de treinos e os fluxos de IA relacionados ao pilar fisico, mantendo revisao obrigatoria e sem promover funcionalidades fora do MVP.

## Escopo da sprint

- Alinhar a agenda semanal de treinos.
- Permitir salvar, editar, remover e reutilizar treinos no planner.
- Integrar importacao/geracao de treino por IA com revisao antes de salvar.
- Isolar ou remover da superficie ativa qualquer item de IA fora do PRD, como analise de equipamento, se estiver exposto.

## Fora do escopo

- Novas formulas de performance.
- Modo profissional de treino.
- Analise de equipamento como feature ativa do MVP.
- Backend/proxy publico para IA.

## Dependencias da sprint

- Sprints 0 a 7 concluidas.
- Fluxo de treino executado estavel.
- Regras de aviso/revisao de IA ja alinhadas.
- Confirmacao de onde o brownfield expoe ou nao analise de equipamento.

## Arquivos provaveis a criar/alterar

- Arquivo confirmado na codebase: `/src/components/WorkoutPlanner.tsx`
- Arquivo confirmado na codebase: `/src/components/WorkoutGenerator.tsx`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo provavel a criar: `/src/utils/workout-planner/*` ou equivalente, a confirmar na Sprint 0

## Tarefas em ordem

### Tarefa 8.1 - Alinhar o planner semanal de treinos

Descricao:
Garantir que o usuario associe treinos existentes aos dias da semana sem transformar a agenda em execucao real.

Arquivos provaveis:
- `/src/components/WorkoutPlanner.tsx`
- `/src/App.tsx`
- `/src/types.ts`

Criterio de aceite:
- O usuario salva agenda semanal de treinos sem gerar log de execucao automatico.

Validacao:
- `npm run lint`
- Teste manual de salvar e reabrir a agenda

Riscos:
- Misturar treino planejado com treino executado.

O que NAO alterar:
- Logs reais de treino alem do necessario para leitura da agenda.

### Tarefa 8.2 - Integrar importacao/geracao de treino com revisao

Descricao:
Conectar texto livre e geracao semanal por IA para produzir treinos e agenda em formato revisavel antes de salvar.

Arquivos provaveis:
- `/src/components/WorkoutGenerator.tsx`
- `/src/services/geminiService.ts`
- `/src/components/WorkoutPlanner.tsx`

Criterio de aceite:
- Nenhum treino gerado/importado entra na agenda sem revisao e confirmacao explicita.

Validacao:
- `npm run build`
- Teste manual de importar texto e gerar treino

Riscos:
- A IA criar `workoutId` inconsistente ou agenda sem treino correspondente.

O que NAO alterar:
- Superficies de dieta e refeicao.

### Tarefa 8.3 - Garantir reaproveitamento seguro entre catalogo e agenda

Descricao:
Permitir que treinos gerados, importados ou manuais sejam reaproveitados na agenda sem duplicacao indevida ou perda do catalogo.

Arquivos provaveis:
- `/src/components/WorkoutPlanner.tsx`
- `/src/components/WorkoutTracker.tsx`
- `/src/App.tsx`

Criterio de aceite:
- O catalogo de treinos e a agenda semanal continuam coerentes depois de varias edicoes.

Validacao:
- `npm run dev`
- Teste manual de editar agenda e depois executar treino

Riscos:
- Duplicar treinos ou quebrar referencias.

O que NAO alterar:
- Historico/exportacao alem do necessario para leitura posterior.

### Tarefa 8.4 - Conter itens fora do MVP na area de treino por IA

Descricao:
Se a analise de equipamento ou outro fluxo fora do PRD estiver visivel ao usuario, ocultar, remover da navegacao ou marcar explicitamente como fora do ciclo atual sem expandi-lo.

Arquivos provaveis:
- `/src/components/WorkoutGenerator.tsx`
- `/src/services/geminiService.ts`
- `/src/App.tsx`

Criterio de aceite:
- Nenhuma funcionalidade de IA fora do PRD fica ativa como parte do MVP.

Validacao:
- `npm run build`
- Validacao manual de navegacao da area Treino

Riscos:
- Cortar uma dependencia real por falta de leitura suficiente.

O que NAO alterar:
- O servico de IA alem do necessario para conter o escopo.

## Comandos de validacao da sprint

- `npm run lint`
- `npm run build`
- `npm run dev`
- Testes automatizados: a confirmar na Sprint 0

## Testes necessarios

- Teste manual de criar agenda semanal.
- Teste manual de importar treino por texto.
- Teste manual de gerar treino semanal por IA.
- Teste manual de executar treino planejado depois.
- Regressao da area Treino completa.

## Fluxo manual de validacao

1. Abrir Treino > Plano.
2. Associar treinos existentes a dias da semana.
3. Importar um treino por texto e revisar antes de salvar.
4. Gerar um treino semanal por IA e revisar a agenda.
5. Confirmar que nada foi registrado como treino executado automaticamente.

## Riscos da sprint

- Relacao inconsistente entre agenda e catalogo.
- Superficie fora do PRD permanecer visivel.
- Resposta de IA quebrar o shape de treinos/agenda.

## Criterios finais de aceite da sprint

- Agenda semanal de treinos funcional.
- IA de treino revisavel antes de salvar.
- Separacao clara entre planejado e executado.
- Analise de equipamento nao promovida como parte do MVP.

## O que NAO deve ser alterado nesta sprint

- Historico/exportacao principal.
- Backup/importacao local.
- Regras de dieta e refeicao fora do necessario para manter integracao.

## Atualizacoes documentais recomendadas

- Atualizar `/docs/agent/CURRENT_STATE.md`
- Atualizar `/docs/evolution/CHANGELOG.md`
