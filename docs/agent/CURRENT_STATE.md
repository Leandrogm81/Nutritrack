# Current State

## Estado atual
MVP v1.2.7 no `main`. Após falhas reais com OpenCode Go em produção (`FUNCTION_INVOCATION_TIMEOUT`, `ERR_CONTENT_DECODING_FAILED`) e consumo de tokens na OpenCode sem retorno útil ao app, a integração de IA foi revertida para OpenRouter.

## Última ação relevante
Configuração OpenRouter restaurada localmente: `src/services/geminiService.ts` volta a chamar `/api/openrouter-proxy`; `api/openrouter-proxy.ts` aponta para `https://openrouter.ai/api/v1/chat/completions`; `api/opencode-proxy.ts` fica apenas como rota compatível para clientes PWA antigos, mas também roteia para OpenRouter e não lê `OPENCODE_*`.

## Arquivos relevantes
- `src/services/geminiService.ts` — cliente IA apontando para `/api/openrouter-proxy`
- `api/openrouter-proxy.ts` — proxy principal OpenRouter em Node runtime, com timeout e headers sanitizados
- `api/opencode-proxy.ts` — endpoint compatível/cache legado, roteando para OpenRouter
- `vite.config.ts` — expõe apenas `VITE_OPENROUTER_MODEL`
- `.env.example` — atualizado para `OPENROUTER_API_KEY`

## Validações executadas
- `npm run lint` passou
- `npm run test -- --run` passou (7 arquivos, 23 testes)
- `npm run build` passou (warning de chunk size permanece não bloqueante)

## Pendências imediatas
- Confirmar que a Vercel possui `OPENROUTER_API_KEY`
- Remover/ignorar `OPENCODE_API_KEY`, `OPENCODE_GO_API_KEY` e `OPENCODE_API_URL` na Vercel
- Commitar/pushar a volta para OpenRouter
- Retestar Gerador de Dieta em produção após deploy

## Riscos atuais
- Se `VITE_OPENCODE_MODEL` ainda existir em cache/build antigo, pode haver confusão; o novo build não usa essa variável
- Se o PWA Android estiver com service worker antigo, pode continuar chamando `/api/opencode-proxy`; essa rota foi mantida compatível e aponta para OpenRouter

## Não fazer agora
- Não voltar para OpenCode Go sem decisão humana
- Não adicionar guardrails de custo por enquanto, a pedido do usuário
- Não usar `VITE_OPENROUTER_API_KEY`
