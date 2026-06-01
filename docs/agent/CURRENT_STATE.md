# Current State

## Estado atual
MVP v1.2.6 publicado no GitHub (`main`, commit `84ef02e`). Integração de IA migrada de OpenRouter para OpenCode Go (`https://opencode.ai/zen/go/v1/chat/completions`), mantendo o modelo `xiaomi/mimo-v2.5` no código do cliente. Os proxies de borda agora removem automaticamente prefixos de fornecedor (ex: transformando `xiaomi/mimo-v2.5` em `mimo-v2.5` para o request) garantindo total compatibilidade com o catálogo direto da OpenCode Go.

## Última ação relevante
Commit `84ef02e` — remove prefixo do fornecedor (ex: "xiaomi/") do nome do modelo nos proxies.

## Arquivos relevantes
- `src/services/geminiService.ts` — Serviços de IA apontando para o novo proxy `/api/opencode-proxy`
- `api/opencode-proxy.ts` — Proxy Edge integrado com auto-correção de endpoint e sanitização de modelo
- `api/openrouter-proxy.ts` — Proxy compatível integrado com a mesma lógica de auto-correção e sanitização
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
