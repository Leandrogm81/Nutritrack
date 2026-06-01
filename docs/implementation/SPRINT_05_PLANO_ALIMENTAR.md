# Sprint 5 - Plano alimentar

## Objetivo

Alinhar o planejamento alimentar semanal para que funcione como recomendacao reutilizavel, com aplicacao manual ao dia e suporte revisavel a importacao/geracao por IA.

## Escopo da sprint

- Fechar o planner semanal por dia e tipo de refeicao.
- Permitir salvar, editar, remover e aplicar manualmente itens planejados ao dia.
- Integrar importacao de dieta por texto e geracao de dieta semanal ao planner, sempre com revisao.
- Garantir que plano alimentar nao vire consumo automatico.

## Fora do escopo

- Historico/exportacao.
- Treinos e planner de treino.
- OCR dedicado e parsing avancado de layout.
- Biblioteca ampla de alimentos.

## Dependencias da sprint

- Sprints 0 a 4 concluidas.
- Avisos/contexto de IA alimentar ja alinhados.
- Confirmacao dos tipos padrao de refeicao do MVP.
- Confirmacao se ha parser real para arquivos `.doc` e `.pdf` alem de texto extraivel.

## Arquivos provaveis a criar/alterar

- Arquivo confirmado na codebase: `/src/components/WeeklyPlanner.tsx`
- Arquivo confirmado na codebase: `/src/components/DietGenerator.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivo provavel a criar: `/src/utils/planner/*` ou equivalente, a confirmar na Sprint 0

## Tarefas em ordem

### Tarefa 5.1 - Alinhar o modelo do planner semanal

Descricao:
Garantir que o planner use dias da semana e tipos de refeicao aprovados, mantendo o plano como recomendacao separada do consumo real.

Arquivos provaveis:
- `/src/components/WeeklyPlanner.tsx`
- `/src/types.ts`
- `/src/App.tsx`

Criterio de aceite:
- O plano e salvo por dia/tipo sem gerar refeicoes consumidas automaticamente.

Validacao:
- `npm run lint`
- Teste manual de salvar e reabrir planner

Riscos:
- Misturar item planejado com refeicao consumida.

O que NAO alterar:
- Resumo final do historico/exportacao.

### Tarefa 5.2 - Implementar aplicacao manual do plano ao dia

Descricao:
Permitir que o usuario escolha explicitamente adicionar um item planejado ao dia atual, reaproveitando o fluxo manual sem preenchimento silencioso.

Arquivos provaveis:
- `/src/components/WeeklyPlanner.tsx`
- `/src/components/MealForm.tsx`
- `/src/App.tsx`

Criterio de aceite:
- O usuario consegue aplicar um item ao dia apenas apos acao explicita.

Validacao:
- `npm run build`
- Teste manual de aplicar item ao dia

Riscos:
- Auto-preenchimento indevido ou duplicacao acidental.

O que NAO alterar:
- Fluxo manual basico de refeicao fora do planner.

### Tarefa 5.3 - Integrar importacao por texto e geracao semanal com revisao

Descricao:
Conectar os fluxos de IA do planner para que texto colado e geracao semanal produzam um rascunho editavel antes de salvar no plano.

Arquivos provaveis:
- `/src/components/DietGenerator.tsx`
- `/src/services/geminiService.ts`
- `/src/components/WeeklyPlanner.tsx`

Criterio de aceite:
- Nenhum plano gerado/importado entra no planner sem revisao e confirmacao.

Validacao:
- `npm run dev`
- Teste manual de importar texto e gerar plano

Riscos:
- Parser de IA criar itens fora do formato aprovado.

O que NAO alterar:
- OCR dedicado, OCR de imagem ou parsing complexo fora do texto extraivel.

### Tarefa 5.4 - Proteger a liberdade de registro fora do plano

Descricao:
Garantir que o usuario continue registrando refeicoes manuais livremente, mesmo com planner salvo.

Arquivos provaveis:
- `/src/components/WeeklyPlanner.tsx`
- `/src/components/MealForm.tsx`
- `/src/App.tsx`

Criterio de aceite:
- O app permite usar planner e registro manual sem acoplamento forzado.

Validacao:
- `npm run build`
- Teste manual misturando refeicao planejada e manual

Riscos:
- UI sugerir que o plano e obrigatorio.

O que NAO alterar:
- Metas, progresso e historico final.

## Comandos de validacao da sprint

- `npm run lint`
- `npm run build`
- `npm run dev`
- Testes automatizados: a confirmar na Sprint 0

## Testes necessarios

- Teste manual de salvar/editar/remover item planejado.
- Teste manual de aplicar item planejado ao dia.
- Teste manual de importacao por texto.
- Teste manual de geracao semanal por IA.
- Teste de regressao do fluxo manual de refeicao.

## Fluxo manual de validacao

1. Abrir a area Plano.
2. Criar um plano semanal manual.
3. Aplicar um item ao dia atual e confirmar que ele entra no fluxo do dia apenas apos o clique.
4. Importar um texto de dieta e revisar antes de salvar.
5. Gerar plano semanal por IA e confirmar a revisao.

## Riscos da sprint

- Confundir planejado com consumido.
- Parser de IA gerar dias/tipos invalidos.
- Regressao no fluxo manual do Dashboard.

## Criterios finais de aceite da sprint

- Planner semanal salvo e persistido.
- Aplicacao ao dia sempre manual.
- Importacao/geracao por IA revisavel.
- Registro manual fora do plano preservado.

## O que NAO deve ser alterado nesta sprint

- Historico/exportacao.
- Treino e cardio.
- Backup/importacao de dados locais.

## Atualizacoes documentais recomendadas

- Atualizar `/docs/agent/CURRENT_STATE.md`
- Atualizar `/docs/evolution/CHANGELOG.md`
