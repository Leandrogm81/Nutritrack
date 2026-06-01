# Current State

## Estado atual
MVP v1.2.3 publicado no GitHub (`main`, commit `93ccddb`). Integração de IA migrada de OpenRouter para OpenCode Go (`https://opencode.ai/zen/go/v1/chat/completions`), mantendo o modelo `xiaomi/mimo-v2.5`. O proxy de borda `/api/opencode-proxy.ts` substituiu o proxy do OpenRouter. Deploy Vercel automático disparado.

## Última ação relevante
Commit `93ccddb` — migra proxy de borda e serviços de IA de OpenRouter para OpenCode Go.

## Arquivos relevantes
- `src/services/geminiService.ts` — Serviços de IA apontando para o novo proxy `/api/opencode-proxy`
- `api/opencode-proxy.ts` — Novo proxy Vercel Edge integrado ao OpenCode Go
- `vite.config.ts` — Definições de ambiente do Vite atualizadas para OpenCode

## Pendências imediatas
- Configurar variáveis de ambiente no painel da Vercel (`OPENCODE_API_KEY` ou `OPENCODE_GO_API_KEY`)
- Testar chamada de IA no app para garantir o funcionamento correto com o novo endpoint
- Limpar cache do Chrome Android e testar instalação PWA v1.2.2/v1.2.3

## Riscos atuais
- Smoke-test de instalação física no Android ainda não finalizado

## Próxima ação recomendada
Limpar cache do Chrome Android → acessar URL → Menu (⋮) → Adicionar à tela inicial.

## Não fazer agora
- Não abrir novas sprints sem decisão humana
- Não remover `skipWaiting` ou headers `no-cache`
