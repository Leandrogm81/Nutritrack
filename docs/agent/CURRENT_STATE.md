# Current State

## Estado atual
MVP v1.2.7 publicado no GitHub (`main`, commit `d31c324`). Integração de IA migrada de OpenRouter para OpenCode Go (`https://opencode.ai/zen/go/v1/chat/completions`), mantendo o modelo `xiaomi/mimo-v2.5` no cliente. Removida a propriedade `duplex: 'half'` nos proxies Edge ao tratar corpos de requisição baseados em string, mitigando de forma definitiva travamentos de conexão e erros de Timeout (HTTP 504).

## Última ação relevante
Commit `d31c324` — remove propriedade duplex de fetch para evitar travamentos e timeouts HTTP 504.

## Arquivos relevantes
- `src/services/geminiService.ts` — Serviços de IA apontando para o novo proxy `/api/opencode-proxy`
- `api/opencode-proxy.ts` — Proxy Edge integrado sem duplex e com auto-correção e sanitização
- `api/openrouter-proxy.ts` — Proxy compatível sem duplex e com a mesma lógica de auto-correção e sanitização
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
