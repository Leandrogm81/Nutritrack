# CHANGELOG

## 2026-06-01 - Ajuste de contenção de texto nos cards do Planejador

### Resumo
- Os cards de refeições do Planejador passaram de layout `flex` para grid responsivo.
- Nomes longos de refeições agora usam `min-w-0`, `break-words`, `overflow-wrap:anywhere` e `hyphens-auto`.
- As ações do card ficam em linha própria no mobile, evitando que o texto seja espremido ou empurre ícones para fora.

### Arquivos afetados
- `src/components/WeeklyPlanner.tsx`

### Evidência
- `npm run lint` passou.
- `npm run test -- --run` passou (7 arquivos, 23 testes).
- `npm run build` passou.

## 2026-06-01 - Retorno da IA para OpenRouter

### Resumo
- Restaurada a rota principal de IA para `/api/openrouter-proxy`.
- `api/openrouter-proxy.ts` voltou a apontar para `https://openrouter.ai/api/v1/chat/completions`.
- `api/opencode-proxy.ts` foi mantido apenas como compatibilidade para caches/PWA antigos, mas roteando para OpenRouter e sem uso de variáveis `OPENCODE_*`.
- Removido uso de `VITE_OPENCODE_MODEL` no build.
- Atualizados `.env.example`, README e arquivos de continuidade.

### Motivo
Encerrar a tentativa com OpenCode Go após erros em produção e consumo de tokens sem retorno útil ao app.

### Evidência
- `npm run lint` passou.
- `npm run test -- --run` passou (7 arquivos, 23 testes).
- `npm run build` passou; warning de chunk size permanece não bloqueante.

## 2026-06-01 - PWA Android Hardening & Logo Header Update (v1.2.1)

### Resumo
- Substituído o ícone genérico do cabeçalho pelo novo logotipo oficial do NutriTrack (`favicon.svg`).
- Corrigido o formato dos ícones PWA `pwa-512x512.png` e `pwa-maskable-512x512.png` convertendo-os de JPEG para PNG nativos de verdade via `sharp`, resolvendo o bloqueador de instalação PWA no Chrome Android.
- Adicionado o link de manifesto explicitamente em `index.html`.

### Arquivos afetados
- `src/App.tsx`
- `index.html`
- `public/pwa-512x512.png`
- `public/pwa-maskable-512x512.png`

### Motivo
Garantir a instalação completa e robusta do PWA no Android Chrome, assegurando compatibilidade de tipos MIME de imagens com as especificações do manifesto de PWA, e integrando a identidade visual definitiva do logotipo no cabeçalho do aplicativo.


## 2026-06-01 - Execução completa da Sprint 08 (Plano de Treino e IA)

### Resumo

Foi implementado o fluxo de Rascunho para treinos gerados via IA ou importados, separando rigidamente o catálogo da agenda semanal e a agenda da execução real. Com essas mudanças, novos treinos aguardam aprovação em `draftWorkouts` no `App.tsx` e as colisões de ID são gerenciadas preventivamente.

### Arquivos afetados

- `src/types.ts`
- `src/App.tsx`
- `src/components/WorkoutPlanner.tsx`
- `src/components/WorkoutGenerator.tsx`

### Motivo

Necessidade de garantir que o usuário revise treinos criados ou sugeridos antes que se misturem à sua agenda oficial ou, pior, sobrescrevam dados no histórico ou no catálogo.

### Evidência

A lógica foi adicionada aos componentes espelhando a funcionalidade equivalente em dieta e refatorada com `console.log([Validation]...)` em `App.tsx` para assegurar fluxo sem colisões.

### Pendências

Nenhuma pendência para a Sprint 08. Segue para a próxima Sprint.

## 2026-05-30 - Execução completa da Sprint 5 (Plano Alimentar)

### Resumo

Sprint 5 executada de ponta a ponta com a implementação do planejamento alimentar semanal funcionando como recomendação reutilizável. Foi introduzido o conceito de `draftMeals` no estado global da aplicação para garantir que entradas de IA e importações de dieta não poluam os dados consumidos no dia sem a explícita confirmação do usuário (Revisão). 

### Arquivos afetados

- `/src/App.tsx`
- `/src/components/WeeklyPlanner.tsx`
- `/src/components/DietGenerator.tsx`
- `/src/utils/planner.ts`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`

### Motivo

Atender aos requisitos de planejamento semanal sem misturar recomendação de refeição com registro real de consumo.

### Evidência

- Validação do TypeScript ocorreu sem erros (`npx tsc --noEmit`).
- Os componentes comportam visualmente o estado de rascunho de forma limpa.

### Pendências

- Nenhuma pendência da Sprint 5. O projeto segue para a próxima Sprint.

## 2026-06-01 - Execução completa da Sprint 07 (Treinos, Execução, Cardio e Passos)

### Resumo

Foram removidas as lógicas matemáticas sem fundamentos oficiais baseadas em inferências de calorias sobre os passos dos usuários ou sobre treinamentos aeróbicos. O fluxo de UX para não amedrontar o usuário em exclusões de templates passados foi melhorado.

### Arquivos afetados

- `src/App.tsx`
- `src/utils/activity.ts`
- `src/components/ActivityTracker.tsx`
- `src/components/Dashboard.tsx`
- `src/components/WorkoutTracker.tsx`

### Motivo

Necessidade de coerência entre o que o app aponta de "saída calórica" baseando-se apenas em fatos/registros manuais e não em algoritmos desvinculados do PRD 1.1.

### Evidência

- Validação TS rodou 100% OK e UI renderiza os contadores puramente volumétricos sem inferir calorias de passos.

### Pendências

- Nenhuma pendência para a Sprint 07. Segue para a próxima Sprint.

## 2026-05-30 - Execução completa da Sprint 4 (IA Refeição, Avisos e Tarefas)

### Resumo

Sprint 4 executada de ponta a ponta com padronização de tratamento de erros da IA em `geminiService`, adição de aviso (disclaimer) contextual visível antes do envio das refeições com IA e limpeza nativa de estados transientes (incluindo input ref para arquivos) ao fechar os modais no `MealForm`.

### Arquivos afetados

- `/src/services/geminiService.ts`
- `/src/components/MealForm.tsx`

### Motivo

Atender aos requisitos formais de responsabilidade de UX e segurança nas respostas geradas por IA (Sprint 4).

### Evidência

- `npm run lint` passou sem erros no código editado. A UI renderiza o erro de IA adequadamente.

### Pendências

- Nenhuma pendência da Sprint 4. O projeto segue para a Sprint 5 (Sincronização / Performance).

## 2026-05-28 - Framework v1.1 inicial

### Adicionado

- Triagem inicial e roteamento.
- Protocolo de rollback.
- Guardrails do coder economico.
- Regra de conflito entre documentos.
- Retrospectiva pos-ciclo.
- Analise Brownfield.
- Registro de componentes aprovados para UI/UX.
- Sprint 00B de fundacao de testes.
- Templates de `HANDOFF` e `CURRENT_STATE`.

### Decisao operacional

- Planilha continua como referencia principal.
- Prompts completos ficam em Markdown.

## 2026-05-28 - Revisao do PRE_PRD_ESCOPO do NutriTrack

### Alterado

- Revisado `docs/product/PRE_PRD_ESCOPO.md` com as decisoes do usuario sobre publico-alvo, peso equivalente entre dieta e treino, papel recomendativo da IA, bioimpedancia opcional, uso de historico e caminho futuro para Supabase.
- Reduzidas duvidas em aberto no pre-PRD, mantendo apenas os pontos ainda realmente indefinidos.

### Registrado

- Adicionada em `docs/evolution/DECISIONS.md` a direcao atual do MVP do NutriTrack para continuidade futura.

## 2026-05-28 - PRD consolidado e continuidade de sessao preparada

### Resumo

Foi consolidado o `PRD.md` do NutriTrack com os fechamentos do usuario sobre escopo, IA, formulas, historico, backup e fase publica futura. Tambem foram criados os arquivos de continuidade para permitir troca de sessao sem depender da conversa original.

### Arquivos afetados

- `/docs/product/PRD.md`
- `/docs/agent/HANDOFF.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/next-actions.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/evolution/CHANGELOG.md`

### Motivo

Transformar o PRD em base operacional para o proximo ciclo e registrar o contexto minimo necessario para continuidade entre sessoes, agentes ou modelos.

### Evidencia

`/docs/product/PRD.md` passou a registrar os fechamentos do usuario e reduziu a lista de pontos realmente pendentes. Os arquivos de continuidade agora existem no workspace. `git status --short` retornou `?? docs/`, indicando mudancas documentais presentes no workspace.

### Pendencias

Faltam `/docs/implementation/PLANO_IMPLEMENTACAO.md`, artefatos de auditoria e alguns fechamentos finais de copy e exportacao.

## 2026-05-28 - PRD_v1.1 consolidado a partir da revisao critica

### Resumo

Foi criado `docs/product/PRD_v1.1.md` como versao revisada do PRD do NutriTrack, preservando `PRD.md` e incorporando as correcoes sustentadas pela revisao critica e pelo brownfield atual.

### Alterado

- Fechados os campos minimos e validacoes de perfil e refeicao manual no PRD revisado.
- Corrigido o conflito documental sobre a regra de gasto energetico de cardio e passos.
- Definido o contrato minimo dos avisos de IA e privacidade em nivel operacional, sem fixar a copy final.
- Definidos o escopo minimo de exportacao CSV/PDF, o conjunto minimo da tela de progresso e a regra operacional de rollover diario.
- Removido do escopo do MVP documentado o vazamento de "analise de equipamento" como funcionalidade obrigatoria.

### Arquivos afetados

- `/docs/product/PRD_v1.1.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`

### Pendencias

- Confirmar o comportamento oficial de snapshot historico das metas do dia.
- Aprovar o texto final dos avisos de IA.
- Aprovar o texto final do aviso de privacidade local.

## 2026-05-29 â€” Preparacao de continuidade apos Sprint 0

### Resumo

Foram atualizados os artefatos de continuidade para troca de sessao apos o fechamento da Sprint 0, com consolidacao de estado, pendencias, riscos e proxima acao segura.

### Arquivos afetados

- `/docs/agent/HANDOFF.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/next-actions.md`

### Motivo

Garantir handoff operacional entre sessoes/agentes sem dependencia da conversa completa.

### Evidência

Arquivos de continuidade atualizados no workspace com estado atual, limites, pendencias e sequencia recomendada para iniciar a Sprint 1.

### PendÃªncias

- Persistem pendencias humanas sobre snapshot historico e textos finais de avisos.
- `docs/` segue nao rastreado (`?? docs/`) neste workspace.

## 2026-05-29 - Quebra da Sprint 00B e preparo de troca de sessão

### Resumo

Foi criada a versão quebrada da Sprint 00B em tarefas menores e foi atualizada a documentação de continuidade para permitir troca de sessão sem perda de contexto operacional.

### Arquivos afetados

- `/docs/implementation/SPRINT_00B_FUNDACAO_TESTES_TAREFAS.md`
- `/docs/agent/HANDOFF.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/next-actions.md`

### Motivo

Preparar execução sequencial da fundação de testes (Sprint 00B) por próximo agente/modelo com limites claros de escopo e checkpoints verificáveis.

### Evidência

Arquivos listados acima foram criados/atualizados nesta sessão e refletem foco em Sprint 00B antes da Sprint 1.

### Pendências

- Execução técnica da Sprint 00B ainda não iniciada (configuração, smoke test e validações).
- Persistem ausências em `/docs/audit/*`, `/docs/evolution/out-of-scope-changes.md` e `/docs/implementation/sprint-breakdown.md`.

## 2026-05-29 - Execucao completa da Sprint 00B (Fundacao de Testes)

### Resumo

A Sprint 00B foi executada de ponta a ponta: decisao formal de estrategia, configuracao tecnica minima de testes, smoke test real, documentacao do plano de testes e validacao final.

### Arquivos afetados

- `/package.json`
- `/package-lock.json`
- `/vitest.config.ts`
- `/src/test/setup.ts`
- `/src/hooks/useLocalStorage.test.ts`
- `/docs/implementation/SPRINT_00B_TESTES.md`
- `/docs/implementation/test-plan.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`
- `/docs/agent/next-actions.md`

### Evidencia

- `npm run test` passou (1 arquivo de teste, 1 teste passando).
- `npm run lint` passou.
- `npm run build` passou.
- Nenhuma logica de negocio foi alterada.

### Pendencias

- Ausencias em `/docs/audit/*` e `/docs/evolution/out-of-scope-changes.md` permanecem.
- Warning de chunk size no build permanece para tratamento futuro.

## 2026-05-29 - Quebra operacional da Sprint 1 (Fundacao de Dados)

### Resumo

Foi criada a versao quebrada da Sprint 1 em tarefas menores, sequenciais, reversiveis e executaveis por modelo economico, com prompts por tarefa e checkpoints de validacao.

### Arquivos afetados

- `/docs/implementation/SPRINT_01_FUNDACAO_DADOS_TAREFAS.md`
- `/docs/agent/HANDOFF.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/next-actions.md`

### Motivo

Permitir execucao segura e incremental da Sprint 1 sem reabrir escopo e sem depender da conversa completa.

### Evidência

Arquivo de tarefas criado no workspace e artefatos de continuidade atualizados com proxima acao objetiva (Tarefa 1 da Sprint 1).

### Pendências

- Execucao tecnica da Sprint 1 ainda nao iniciada.
- Persistem ausencias em `/docs/audit/*` e `/docs/evolution/out-of-scope-changes.md`.

## 2026-05-29 - Execucao completa da Sprint 1 (Fundacao de Dados)

### Resumo

Sprint 1 executada de ponta a ponta com mapeamento de contratos, alinhamento de tipos, centralizacao de utilitarios, isolamento de migracao/rollover e contencao de superficie fora do MVP no fluxo de treino.

### Arquivos afetados

- `/src/App.tsx`
- `/src/types.ts`
- `/src/constants/state.ts`
- `/src/constants/domain.ts`
- `/src/utils/domain.ts`
- `/src/utils/stateMigration.ts`
- `/src/utils/rollover.ts`
- `/src/components/WeeklyPlanner.tsx`
- `/src/components/WorkoutPlanner.tsx`
- `/src/components/WorkoutTracker.tsx`
- `/src/components/MealForm.tsx`
- `/src/services/geminiService.ts`
- `/docs/implementation/SPRINT_01_TAREFA_01_MAPEAMENTO.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`
- `/docs/agent/next-actions.md`
- `/docs/evolution/CHANGELOG.md`

### Evidencia

- `npm run test` passou.
- `npm run lint` passou.
- `npm run build` passou.

### Pendencias

- Warning de chunk size no build permanece (nao bloqueante).
- Sprint 2 (Perfil e Metas) ainda nao iniciada.
- Ausencias historicas em `/docs/audit/*` e `/docs/evolution/out-of-scope-changes.md` permanecem.

## 2026-05-29 - Quebra operacional da Sprint 2 (Perfil e Metas)

### Resumo

Foi criada a versao quebrada da Sprint 2 em tarefas menores, sequenciais, reversiveis e executaveis por modelo economico, com prompts por tarefa e checkpoints de validacao.

### Arquivos afetados

- `/docs/implementation/SPRINT_02_PERFIL_METAS_TAREFAS.md`
- `/docs/agent/HANDOFF.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/next-actions.md`
- `/docs/evolution/CHANGELOG.md`

### Motivo

Permitir execucao segura e incremental da Sprint 2 sem reabrir escopo e sem depender da conversa completa.

### Evidencia

Arquivo de tarefas da Sprint 2 criado no workspace e artefatos de continuidade atualizados com proxima acao objetiva (Tarefa 1 da Sprint 2).

### Pendencias

- Execucao tecnica da Sprint 2 ainda nao iniciada.
- Persistem ausencias em `/docs/audit/*` e `/docs/evolution/out-of-scope-changes.md`.

## 2026-05-29 - Execucao completa da Sprint 2 (Perfil e Metas)

### Resumo

Sprint 2 executada de ponta a ponta com mapeamento inicial, validacoes de perfil, macros customizados, metas editaveis manualmente e ajuste de persistencia para evitar duplicacao imediata de peso.

### Arquivos afetados

- `/src/components/UserProfileForm.tsx`
- `/src/App.tsx`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`
- `/docs/agent/next-actions.md`
- `/docs/evolution/CHANGELOG.md`

### Evidencia

- `npm run test` passou.
- `npm run lint` passou.
- `npm run build` passou.

### Pendencias

- Validacao manual completa de UX do fluxo de perfil/metas ainda nao executada nesta sessao.
- Warning de chunk size no build permanece (nao bloqueante).
- Persistem ausencias historicas em `/docs/audit/*` e `/docs/evolution/out-of-scope-changes.md`.

 # #   2 0 2 6 - 0 5 - 3 0   -   E x e c u c a o   c o m p l e t a   d a   S p r i n t   3   ( D a s h b o a r d ,   R e f e i c o e s   M a n u a i s   e   A g u a ) 
 
 # # #   R e s u m o 
 
 S p r i n t   3   e x e c u t a d a   d e   p o n t a   a   p o n t a   c o m   i m p l e m e n t a c a o   d e   f o r m u l á r i o   i s o l a d o   p a r a   r e f e i ç ã o   m a n u a l ,   v a l i d a ç õ e s   r o b u s t a s   ( s e m   v a l o r e s   n e g a t i v o s ,   v a z i o s   o u   n ã o   n u m é r i c o s ) ,   c l e a r   t o t a l   d o   m o d a l   n o   f e c h a m e n t o ,   e   f e e d b a c k   i n t e r a t i v o   n a   a u s ê n c i a   d e   p e r f i l   a t i v o   o u   c o m   a   m e t a   d e   h i d r a t a ç ã o   z e r a d a . 
 
 # # #   A r q u i v o s   a f e t a d o s 
 
 -   \ / s r c / A p p . t s x \ 
 -   \ / s r c / c o m p o n e n t s / D a s h b o a r d . t s x \ 
 -   \ / s r c / c o m p o n e n t s / M e a l F o r m . t s x \ 
 -   \ / s r c / c o m p o n e n t s / M a n u a l M e a l F o r m . t s x \ 
 -   \ / d o c s / a g e n t / C U R R E N T _ S T A T E . m d \ 
 -   \ / d o c s / a g e n t / H A N D O F F . m d \ 
 -   \ / d o c s / e v o l u t i o n / C H A N G E L O G . m d \ 
 
 # # #   E v i d e n c i a 
 
 -   \ 
 p m   r u n   t e s t \   p a s s o u . 
 -   \ 
 p m   r u n   l i n t \   p a s s o u . 
 -   \ 
 p m   r u n   b u i l d \   p a s s o u . 
 
 # # #   P e n d e n c i a s 
 
 -   N e n h u m a   p a r a   o   e s c o p o   d e s t a   s p r i n t .   O   p r o j e t o   s e g u e   p a r a   a   S p r i n t   4 . 
  
 
## 2026-06-01 - Migra��o de Intelig�ncia Artificial para OpenRouter e Finaliza��o da Sprint 09

### Resumo
Migra��o das integra��es de IA, que antes utilizavam a API Gemini do Google diretamente, para o uso da API do OpenRouter configurada para servir o modelo \xiaomi/mimo-v2.5\. Conclus�o das bordas de desconex�o (modo offline) das IAs de dieta, treino e an�lise.

### Arquivos afetados
- \src/services/geminiService.ts\
- \pi/openrouter-proxy.ts\ (novo)
- \pi/gemini-proxy.ts\ (removido)
- \ite.config.ts\
- \src/components/WeeklyPlanner.tsx\
- \src/components/WorkoutPlanner.tsx\
- \src/components/WorkoutTracker.tsx\

### Motivo
Atender a exig�ncia do usu�rio por utilizar o modelo \xiaomi/mimo-v2.5\ na plataforma do OpenRouter, mantendo o padr�o PWA offline e a prote��o das chaves via proxy.

### Evid�ncia
Servi�o \geminiService.ts\ completamente reescrito para utilizar \etch\ padronizado pela OpenAI em vez do SDK nativo do \@google/genai\. Modo offline adicionado atrav�s da interface.

### Pend�ncias
Atualizar vari�veis de ambiente no dashboard da Vercel.

