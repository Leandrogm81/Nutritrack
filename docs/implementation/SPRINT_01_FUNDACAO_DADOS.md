# Sprint 1 - Fundacao de dados

## Objetivo

Alinhar os contratos de dominio e o nucleo de persistencia/rollover do brownfield com o PRD, preparando o app para receber ajustes de tela sem espalhar regra de negocio sensivel.

## Escopo da sprint

- Revisar entidades e tipos centrais do MVP.
- Centralizar constantes e utilitarios basicos do dominio.
- Isolar a regra de rollover diario e a migracao minima do estado local.
- Mapear e conter superficies brownfield claramente fora do MVP, se estiverem expostas.

## Fora do escopo

- Criar novas telas.
- Mudar formula de negocio sem amparo no PRD.
- Implementar backup versionado completo.
- Implementar proxy/server-side para IA.

## Dependencias da sprint

- Sprint 0 concluida.
- Comandos `npm run lint` e `npm run build` confirmados.
- Mapa real de `/src/App.tsx`, `/src/types.ts` e `/src/hooks/useLocalStorage.ts`.
- Confirmacao de onde Historico, exportacao e treino hoje dependem do shape de `DailyData`.

## Arquivos provaveis a criar/alterar

- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo confirmado na codebase: `/src/hooks/useLocalStorage.ts`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivo provavel a criar: `/src/utils/domain/*` ou equivalente, a confirmar na Sprint 0
- Arquivo provavel a criar: `/src/constants/*` ou equivalente, a confirmar na Sprint 0

## Tarefas em ordem

### Tarefa 1.1 - Revisar contratos centrais contra o PRD

Descricao:
Comparar `DailyData`, `Meal`, `PlannedMeal`, `Workout`, `CardioLog`, `DailyHistoryEntry` e `UserProfile` com o PRD para registrar campos obrigatorios, opcionais e lacunas reais.

Arquivos provaveis:
- `/src/types.ts`
- `/src/App.tsx`

Criterio de aceite:
- Campos obrigatorios, opcionais e pendencias ficam explicitamente alinhados ao PRD antes de mudar UI.

Validacao:
- `npm run lint`
- Revisao de diff

Riscos:
- Quebrar componentes que dependem do shape atual.

O que NAO alterar:
- Fluxos de tela alem do necessario para manter compatibilidade.

### Tarefa 1.2 - Centralizar constantes e utilitarios de dominio

Descricao:
Extrair para utilitarios testaveis os valores repetidos de dias da semana, tipos de refeicao, criacao de IDs, arredondamento basico e defaults de estado.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/types.ts`
- Arquivo provavel a criar: `/src/utils/domain.ts` ou equivalente

Criterio de aceite:
- Regras basicas reutilizaveis deixam de ficar espalhadas em multiplos componentes.

Validacao:
- `npm run lint`
- `npm run build`

Riscos:
- Introduzir regressao por extracao apressada de helper.

O que NAO alterar:
- Formulas de negocio ainda nao validadas nas sprints especificas.

### Tarefa 1.3 - Isolar rollover diario e migracao minima do estado

Descricao:
Mover a regra de arquivamento de mudanca de dia e a normalizacao minima do estado local para uma unidade clara e revisavel.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/hooks/useLocalStorage.ts`
- Arquivo provavel a criar: `/src/utils/rollover.ts` ou equivalente

Criterio de aceite:
- O app continua recarregando sem quebrar e a regra de rollover deixa de ficar difusa.

Validacao:
- `npm run lint`
- `npm run build`
- Reabrir o app no mesmo dia e simular mudanca de data conforme estrategia confirmada na Sprint 0

Riscos:
- Duplicar historico ou perder dados do dia atual.

O que NAO alterar:
- Exportacao final, backup/importacao e snapshot historico das metas.

### Tarefa 1.4 - Registrar guardrails para itens fora do MVP

Descricao:
Confirmar se superficies como analise de equipamento, componentes mortos ou fluxos nao aprovados aparecem ao usuario. Se aparecerem, esconder ou marcar para remocao segura dentro do escopo da sprint.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/services/geminiService.ts`
- `/src/components/WorkoutGenerator.tsx`
- `/src/components/CoachInsights.tsx`

Criterio de aceite:
- Nenhum item claramente fora do PRD fica promovido como requisito ativo para as proximas sprints.

Validacao:
- `npm run build`
- Validacao manual de navegacao

Riscos:
- Remover acidentalmente algo que o fluxo atual ainda usa.

O que NAO alterar:
- Funcionalidades confirmadas pelo PRD, mesmo que precisem de ajuste posterior.

## Comandos de validacao da sprint

- `npm run lint`
- `npm run build`
- `npm run dev`
- Testes automatizados: a confirmar na Sprint 0; se inexistentes, usar validacao manual controlada

## Testes necessarios

- Teste manual de recarregamento do app.
- Teste manual de persistencia local sem perder dados existentes.
- Teste de regressao do fluxo diario basico.
- Teste de regressao do fluxo de treino e planner para garantir que o shape de dados nao quebrou consumo.

## Fluxo manual de validacao

1. Abrir o app e confirmar carregamento sem erro.
2. Verificar se dados antigos continuam acessiveis.
3. Navegar entre Dashboard, Plano, Treino, Progresso, Perfil e Historico.
4. Recarregar a pagina e confirmar que o estado principal foi mantido.
5. Confirmar que nenhum item fora do MVP ficou mais exposto do que antes.

## Riscos da sprint

- Regressao estrutural em `/src/App.tsx`.
- Incompatibilidade com dados ja salvos no `localStorage`.
- Ajuste prematuro de tipos sem validar o impacto nos componentes.

## Criterios finais de aceite da sprint

- Contratos centrais alinhados ao PRD.
- Helpers basicos extraidos ou claramente delimitados.
- Rollover diario isolado e compreensivel.
- Superficies fora do MVP mapeadas e contidas.
- App continua compilando e navegando sem erro.

## O que NAO deve ser alterado nesta sprint

- Formula final de metas.
- Fluxos detalhados de IA.
- Exportacao/importacao final.
- Login, sync, backend ou nova arquitetura.

## Atualizacoes documentais recomendadas

- Atualizar `/docs/agent/CURRENT_STATE.md`
- Atualizar `/docs/evolution/DECISIONS.md` apenas se houver decisao estrutural nova
