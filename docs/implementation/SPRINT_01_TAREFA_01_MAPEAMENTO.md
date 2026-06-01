# Sprint 1 - Tarefa 1 (Mapeamento de Contratos e Consumo)

## Resumo

Mapeamento concluido dos contratos centrais e dos pontos de consumo antes das alteracoes funcionais da Sprint 1.

## Contratos confirmados em `src/types.ts`

- `Meal`, `PlannedMeal`, `WeightEntry`, `UserProfile`.
- `Exercise`, `Workout`, `WorkoutLog`, `CardioLog`, `PlannedWorkout`.
- `DailyHistoryEntry`, `DailyData`.

## Pontos de consumo criticos

- `src/App.tsx`: estado raiz (`DailyData`), persistencia (`useLocalStorage`), migracao/normalizacao, rollover diario, handlers de refeicao/agua/perfil/plano/treino/cardio.
- `src/hooks/useLocalStorage.ts`: serializacao e persistencia local do estado raiz.
- `src/components/*`: consumo do contrato por dominio:
  - alimentacao: `MealForm`, `WeeklyPlanner`, `DietGenerator`, `RecipeSuggestions`, `Dashboard`.
  - treino: `WorkoutPlanner`, `WorkoutTracker`, `WorkoutGenerator`, `ActivityTracker`.
  - historico/progresso/perfil: `HistoryCalendar`, `Analytics`, `UserProfileForm`.
- `src/services/geminiService.ts`: entrada/saida da IA para refeicao e treino, com retorno tipado sobre contratos de dominio.

## Lacunas confirmadas antes da implementacao

- Constantes de dominio repetidas em componentes (`dias da semana`, `tipos de refeicao`).
- Geracao de IDs e data de hoje repetidas em multiplos pontos.
- Rollover diario e migracao minima acoplados no `useEffect` de `App.tsx`.
- Superficie de analise de equipamento estava exposta em `WorkoutTracker` (fora do MVP aprovado).

## Limites aplicados na execucao

- Nenhuma mudanca de formula de negocio de metas/cardio.
- Nenhuma mudanca de arquitetura (backend/sync/login).
- Foco em diffs pequenos e reversiveis.
