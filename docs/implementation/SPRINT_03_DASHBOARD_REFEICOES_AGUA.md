# Sprint 3 - Dashboard, refeicoes e agua

## Objetivo

Fechar o fluxo principal do dia atual: leitura do estado do dia, registro manual de refeicao, hidratacao cumulativa e estados vazios claros.

## Escopo da sprint

- Alinhar o Dashboard ao papel de tela inicial do dia atual.
- Garantir guidance quando nao houver perfil salvo.
- Ajustar fluxo manual de refeicao com campos obrigatorios e opcionais corretos.
- Garantir registro de agua cumulativo com atualizacao imediata.

## Fora do escopo

- Fluxos de IA.
- Planejamento semanal alimentar.
- Historico/exportacao final.
- Ajustes de treino ou cardio.

## Dependencias da sprint

- Sprints 0, 1 e 2 concluidas.
- Metas e perfil funcionando.
- Contratos de refeicao e goals estabilizados.

## Arquivos provaveis a criar/alterar

- Arquivo confirmado na codebase: `/src/components/Dashboard.tsx`
- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `/src/components/WaterTracker.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo provavel a criar: `/src/utils/nutrition.ts` ou equivalente, a confirmar na Sprint 0

## Tarefas em ordem

### Tarefa 3.1 - Alinhar a leitura do Dashboard do dia atual

Descricao:
Garantir que o Dashboard priorize o dia atual, mostre metas/progresso corretos e oriente o usuario quando o perfil ainda nao estiver salvo.

Arquivos provaveis:
- `/src/components/Dashboard.tsx`
- `/src/App.tsx`

Criterio de aceite:
- A tela inicial deixa claro o estado do dia e o proximo passo quando nao ha dados.

Validacao:
- `npm run lint`
- `npm run dev`

Riscos:
- Excesso de indicadores reduzir clareza ou mascarar ausencia de perfil.

O que NAO alterar:
- Navegacao de Historico e Progresso alem do necessario para nao quebrar a tela inicial.

### Tarefa 3.2 - Fechar o registro manual de refeicao

Descricao:
Garantir que nome e calorias sejam obrigatorios, que macros sejam opcionais com persistencia em `0`, que valores negativos sejam bloqueados e que remocao/edicao reflitam imediatamente no resumo do dia.

Arquivos provaveis:
- `/src/components/MealForm.tsx`
- `/src/App.tsx`
- `/src/types.ts`

Criterio de aceite:
- O usuario consegue salvar e remover refeicoes manuais com atualizacao imediata do dia.

Validacao:
- `npm run lint`
- Fluxo manual completo de adicionar/remover refeicao

Riscos:
- Regressao em calculo diario ou tratamento inconsistente de macros vazias.

O que NAO alterar:
- Analise por IA e planejador semanal.

### Tarefa 3.3 - Confirmar regra de porcao proporcional quando o fluxo existir

Descricao:
Se o fluxo de reaproveitar base nutricional com porcao ajustavel estiver exposto, alinhar o recalculo para `valor_base * (porcao_consumida / 100)` com arredondamento matematico padrao.

Arquivos provaveis:
- `/src/components/MealForm.tsx`
- Arquivo provavel a criar: `/src/utils/nutrition.ts`

Criterio de aceite:
- Quando houver ajuste de porcao, calorias e macros sao recalculados de forma consistente com o PRD.

Validacao:
- `npm run build`
- Teste manual com porcoes diferentes

Riscos:
- Aplicar a regra onde o fluxo ainda nao existe ou quebrar entradas manuais simples.

O que NAO alterar:
- Qualquer fluxo de biblioteca ampla de alimentos ou scanner dedicado.

### Tarefa 3.4 - Garantir hidratacao cumulativa e feedback imediato

Descricao:
Alinhar o fluxo de agua para soma cumulativa no dia, atualizacao imediata do Dashboard e estado vazio compreensivel.

Arquivos provaveis:
- `/src/components/WaterTracker.tsx`
- `/src/components/Dashboard.tsx`
- `/src/App.tsx`

Criterio de aceite:
- O usuario registra agua no fluxo principal e ve o total diario atualizado na hora.

Validacao:
- `npm run dev`
- Registro manual de agua com varios incrementos

Riscos:
- Contagem duplicada ou inconsistente apos reload.

O que NAO alterar:
- Backup/importacao e progresso historico.

## Comandos de validacao da sprint

- `npm run lint`
- `npm run build`
- `npm run dev`
- Testes automatizados: a confirmar na Sprint 0

## Testes necessarios

- Teste manual de estado vazio sem perfil e sem refeicoes.
- Teste manual de refeicao com macros vazias.
- Teste manual de refeicao com remocao.
- Teste manual de agua cumulativa.
- Teste de responsividade em largura mobile e desktop.

## Fluxo manual de validacao

1. Abrir o app sem perfil salvo e confirmar guidance.
2. Salvar um perfil valido.
3. Adicionar agua e confirmar atualizacao no Dashboard.
4. Adicionar refeicao manual com nome e calorias apenas.
5. Remover a refeicao e confirmar retorno dos totais.

## Riscos da sprint

- Quebra do fluxo principal do app.
- Estado vazio confuso para primeiro uso.
- Regressao no resumo diario apos remocao de refeicao.

## Criterios finais de aceite da sprint

- Dashboard prioriza o dia atual.
- Guidance sem perfil salvo esta claro.
- Refeicao manual segue o contrato do PRD.
- Agua e resumo diario atualizam imediatamente.

## O que NAO deve ser alterado nesta sprint

- Fluxos de IA.
- Planejadores semanais.
- Treino, cardio, passos.
- Exportacao e backup.

## Atualizacoes documentais recomendadas

- Atualizar `/docs/agent/CURRENT_STATE.md`
- Atualizar `/docs/evolution/CHANGELOG.md`
