# Current State

## Estado atual
MVP v1.2.7 no `main`. A correção de código `66ef857` migrou os proxies de IA para Vercel Node runtime para sair do limite de Edge. Após deploy, o usuário reportou novo erro em produção: `/api/opencode-proxy` com `net::ERR_CONTENT_DECODING_FAILED`.

## Última ação relevante
Correção local preparada para o novo erro: `api/opencode-proxy.ts` e `api/openrouter-proxy.ts` deixaram de repassar headers brutos do upstream na resposta. O proxy agora retorna apenas `Content-Type` e `Cache-Control`, evitando repassar `content-encoding`/`content-length` incompatíveis quando o Node fetch já descompactou o corpo.

## Arquivos relevantes
- `api/opencode-proxy.ts` — proxy principal OpenCode Go em Node runtime, com timeout controlado e headers de resposta sanitizados
- `api/openrouter-proxy.ts` — proxy compatível/cache legado com mesma correção
- `vercel.json` — `maxDuration` de 60s para os proxies de IA
- `src/services/geminiService.ts` — cliente IA apontando para `/api/opencode-proxy`

## Validações executadas
- `npm run lint` passou
- `npm run test -- --run` passou (7 arquivos, 23 testes)
- `npm run build` passou (warning de chunk size permanece não bloqueante)

## Pendências imediatas
- Commitar/pushar a correção de `ERR_CONTENT_DECODING_FAILED`
- Aguardar deploy Vercel contendo a sanitização de headers
- Retestar chamada de IA em produção após deploy

## Riscos atuais
- Se a OpenCode Go demorar mais de 55s, o app receberá 504 controlado do proxy
- Se continuar falhando após sanitização de headers, será necessário consultar logs Vercel/Dashboard e confirmar política/credencial da OpenCode Go
- Smoke-test de instalação física no Android ainda não finalizado

## Não fazer agora
- Não voltar os proxies para Edge runtime para fluxos longos de IA
- Não repassar `content-encoding`/`content-length` brutos do upstream
- Não abrir novas sprints sem decisão humana
