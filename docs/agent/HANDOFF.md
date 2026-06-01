# Handoff — Continuidade de Sessão

## 1. Objetivo atual
Restaurar a integração de IA do NutriTrack para OpenRouter (`xiaomi/mimo-v2.5`) via proxy Vercel seguro, encerrando a tentativa operacional com OpenCode Go.

## 2. Estado geral do projeto
O usuário confirmou que a configuração OpenCode Go não funcionou no app e mostrou que as tentativas estavam consumindo tokens na OpenCode. A decisão operacional atual é voltar para OpenRouter.

## 3. O que foi feito nesta sessão
- `src/services/geminiService.ts` voltou a usar `/api/openrouter-proxy`.
- `getModel()` voltou a considerar apenas `VITE_OPENROUTER_MODEL`, com fallback `xiaomi/mimo-v2.5`.
- `api/openrouter-proxy.ts` foi reconfigurado para `https://openrouter.ai/api/v1/chat/completions`.
- `api/opencode-proxy.ts` foi mantido como endpoint compatível para PWA/cache antigo, mas também roteia para OpenRouter e não lê `OPENCODE_*`.
- `vite.config.ts` removeu `VITE_OPENCODE_MODEL`.
- `.env.example` foi atualizado para `OPENROUTER_API_KEY`, `VITE_OPENROUTER_MODEL` e `OPENROUTER_PROXY_TIMEOUT_MS`.
- `README.md` foi alinhado para proxy Vercel Node em OpenRouter.

## 4. Validações executadas
| Comando | Status |
|---|---|
| `npm run lint` | passou |
| `npm run test -- --run` | passou: 7 arquivos, 23 testes |
| `npm run build` | passou; warning de chunk size permanece |

## 5. Arquivos importantes
| Arquivo | Função | Observação |
|---|---|---|
| `/api/openrouter-proxy.ts` | Proxy IA principal | OpenRouter, Node runtime, timeout e headers sanitizados |
| `/api/opencode-proxy.ts` | Compatibilidade/cache antigo | Roteia para OpenRouter; não usa OpenCode |
| `/src/services/geminiService.ts` | Cliente IA | Chama `/api/openrouter-proxy` |
| `/vite.config.ts` | Build env | Apenas modelo OpenRouter não sensível |

## 6. Problemas encontrados
- OpenCode Go consumiu tokens mesmo quando o app falhou no retorno ao navegador.
- O erro `ERR_CONTENT_DECODING_FAILED` indicava problema de retorno/headers, mas o custo consumido torna a rota OpenCode indesejada no momento.
- A Vercel CLI não está instalada localmente; validação de deploy/logs precisa ser pelo Dashboard ou após push.

## 7. Pendências
| Pendência | Impacto | Prioridade |
|---|---|---|
| Rodar validações locais | Garantir que a reversão não quebrou build/testes | Alta |
| Commitar/pushar volta para OpenRouter | Necessário para deploy Vercel | Alta |
| Confirmar `OPENROUTER_API_KEY` na Vercel | IA não funciona sem segredo server-side | Alta |
| Remover/ignorar variáveis `OPENCODE_*` na Vercel | Evitar novas cobranças na OpenCode | Alta |
| Retestar Gerador de Dieta em produção | Confirma funcionamento OpenRouter | Alta |

## 8. Próxima ação recomendada
Commitar/pushar a volta para OpenRouter. Após o deploy, testar apenas uma chamada simples no Gerador de Dieta e conferir se o histórico da OpenCode para de aumentar.

## 9. O que o próximo agente NÃO deve fazer
- Não voltar para OpenCode Go sem decisão humana.
- Não adicionar guardrails de custo por enquanto; o usuário pediu para aguardar.
- Não expor chave com `VITE_OPENROUTER_API_KEY`.
- Não apagar `/api/opencode-proxy.ts` ainda, para não quebrar PWA/cache antigo.

## 10. Segurança para troca de sessão
- Seguro rodar `/new`? Com ressalvas.
- Motivo: a reversão local está preparada, mas ainda precisa validação, commit/push e teste de produção.
- Nome sugerido para a próxima sessão: Validar_OpenRouter_Proxy_Prod
