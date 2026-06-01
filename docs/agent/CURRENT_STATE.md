# Current State

## Estado atual
MVP v1.2.7 no `main` remoto até o commit `13980d8`. Nesta sessão foi reproduzida por análise a causa provável do erro reportado em produção: `/api/opencode-proxy` ainda rodava como Vercel Edge Function e dependia de resposta inicial do provedor de IA antes do limite de Edge, gerando `FUNCTION_INVOCATION_TIMEOUT` quando a OpenCode Go demorava.

## Última ação relevante
Correção local preparada: `api/opencode-proxy.ts` e `api/openrouter-proxy.ts` migrados do runtime Edge para Vercel Node Web Handler (`export default { fetch }`), com `maxDuration: 60` em `vercel.json`, timeout interno de 55s, headers mínimos para o upstream e erro JSON controlado. `src/services/geminiService.ts` agora extrai a mensagem de erro JSON do proxy.

## Arquivos relevantes
- `api/opencode-proxy.ts` — proxy principal OpenCode Go em Node runtime, com timeout controlado
- `api/openrouter-proxy.ts` — proxy compatível/cache legado com mesma correção
- `vercel.json` — `maxDuration` de 60s para os proxies de IA
- `src/services/geminiService.ts` — cliente IA apontando para `/api/opencode-proxy`

## Validações executadas
- `npm run lint` passou
- `npm run test -- --run` passou (7 arquivos, 23 testes)
- `npm run build` passou (warning de chunk size permanece não bloqueante)

## Pendências imediatas
- Commitar e publicar a correção na Vercel
- Confirmar variáveis de ambiente no painel da Vercel (`OPENCODE_API_KEY` ou `OPENCODE_GO_API_KEY`)
- Retestar chamada de IA em produção após deploy

## Riscos atuais
- Se a OpenCode Go demorar mais de 55s, o app receberá 504 controlado do proxy; não deve mais aparecer `FUNCTION_INVOCATION_TIMEOUT` da Vercel
- Smoke-test de instalação física no Android ainda não finalizado

## Não fazer agora
- Não voltar os proxies para Edge runtime para fluxos longos de IA
- Não restaurar `content-length` ao reenviar body modificado
- Não abrir novas sprints sem decisão humana
