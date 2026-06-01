# Current State

## Estado atual
MVP v1.2.7 no `main`. A integração de IA voltou para OpenRouter no commit `f699875`; OpenCode Go não deve ser usado sem nova decisão humana. Nesta sessão foi ajustado o layout dos cards do Planejador para manter nomes longos dentro do card.

## Última ação relevante
`src/components/WeeklyPlanner.tsx` — cards de refeições trocaram `flex` por grid responsivo, com `min-w-0`, `break-words`, `overflow-wrap:anywhere` e ações em linha própria no mobile.

## Arquivos relevantes
- `src/services/geminiService.ts` — cliente IA apontando para `/api/openrouter-proxy`
- `api/openrouter-proxy.ts` — proxy principal OpenRouter em Node runtime, com timeout e headers sanitizados
- `api/opencode-proxy.ts` — endpoint compatível/cache legado, roteando para OpenRouter
- `vite.config.ts` — expõe apenas `VITE_OPENROUTER_MODEL`
- `.env.example` — atualizado para `OPENROUTER_API_KEY`
- `src/components/WeeklyPlanner.tsx` — cards do Planejador com texto contido

## Validações executadas
- `npm run lint` passou
- `npm run test -- --run` passou (7 arquivos, 23 testes)
- `npm run build` passou (warning de chunk size permanece não bloqueante)

## Pendências imediatas
- Confirmar que a Vercel possui `OPENROUTER_API_KEY`
- Remover/ignorar `OPENCODE_API_KEY`, `OPENCODE_GO_API_KEY` e `OPENCODE_API_URL` na Vercel
- Aguardar deploy do ajuste visual dos cards
- Conferir cards do Planejador em produção/mobile
- Retestar Gerador de Dieta em produção após deploy

## Riscos atuais
- Se `VITE_OPENCODE_MODEL` ainda existir em cache/build antigo, pode haver confusão; o novo build não usa essa variável
- Se o PWA Android estiver com service worker antigo, pode continuar chamando `/api/opencode-proxy`; essa rota foi mantida compatível e aponta para OpenRouter
- Teste visual local por navegador não foi executado por falta de ferramenta Browser exposta nesta sessão; build validou CSS/TS

## Não fazer agora
- Não voltar para OpenCode Go sem decisão humana
- Não adicionar guardrails de custo por enquanto, a pedido do usuário
- Não usar `VITE_OPENROUTER_API_KEY`
