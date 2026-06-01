# Handoff — Continuidade de Sessão

## 1. Objetivo atual
Estabilizar a integração de IA do NutriTrack em produção na Vercel via OpenCode Go (`mimo-v2.5`), eliminando timeouts de função em `/api/opencode-proxy`.

## 2. Estado geral do projeto
O app está no `main` remoto com a correção de código `66ef857`, após correção anterior `13980d8` para `content-length`. O usuário reportou novo erro real de produção:

```text
API error: 504 - FUNCTION_INVOCATION_TIMEOUT
/api/opencode-proxy: Failed to load resource: 504
```

A análise local confirmou que os proxies ainda usavam Vercel Edge Function. Para chamadas de IA longas, Edge precisa começar a responder rapidamente; se a OpenCode Go demora antes de devolver headers, a Vercel encerra a função com 504.

Após a migração para Node runtime, o usuário reportou:

```text
/api/opencode-proxy: Failed to load resource: net::ERR_CONTENT_DECODING_FAILED
```

Esse erro indica alta probabilidade de headers de compressão inconsistentes: o `fetch` do runtime Node pode entregar o corpo já descompactado, enquanto o proxy repassava `content-encoding`/`content-length` originais do upstream para o navegador.

## 3. O que foi feito nesta sessão
- Commit `66ef857` publicado em `main`.
- `api/opencode-proxy.ts` migrado de Edge runtime para Vercel Node Web Handler (`export default { fetch }`).
- `api/openrouter-proxy.ts` recebeu a mesma correção para manter compatibilidade com clientes antigos/cache.
- `vercel.json` passou a definir `maxDuration: 60` para os dois proxies.
- Adicionado timeout interno de 55s (`OPENCODE_PROXY_TIMEOUT_MS` opcional) para retornar erro JSON controlado antes de estouro da plataforma.
- Headers enviados ao upstream foram reduzidos ao mínimo (`Authorization`, `Content-Type`, `Accept`), evitando repasse de headers de navegador/desnecessários.
- `src/services/geminiService.ts` passou a extrair mensagem de erro JSON do proxy antes de lançar erro.
- Correção local adicional: os proxies não repassam mais headers brutos da resposta da OpenCode; retornam apenas `Content-Type` e `Cache-Control` para evitar `ERR_CONTENT_DECODING_FAILED`.

## 4. Validações executadas
| Comando | Resultado |
|---|---|
| `npm run lint` | passou |
| `npm run test -- --run` | passou: 7 arquivos, 23 testes |
| `npm run build` | passou; warning de chunk size permanece |

## 5. Arquivos importantes
| Arquivo | Função | Observação |
|---|---|---|
| `/api/opencode-proxy.ts` | Proxy IA principal | Agora Node runtime, timeout controlado |
| `/api/openrouter-proxy.ts` | Proxy legado/compatível | Mesmo comportamento do proxy principal |
| `/vercel.json` | Configuração Vercel | `maxDuration` dos proxies em 60s |
| `/src/services/geminiService.ts` | Cliente IA | Mensagem de erro do proxy mais legível |

## 6. Problemas encontrados
- O erro `FUNCTION_INVOCATION_TIMEOUT` não era mais causado por `content-length`; era compatível com limite operacional do Edge runtime aguardando resposta inicial do upstream.
- O erro `ERR_CONTENT_DECODING_FAILED` não prova bloqueio da OpenCode; é compatível com proxy repassando `content-encoding` incompatível após descompactação feita pelo runtime.
- A Vercel CLI não está instalada localmente, então logs remotos não foram consultados por CLI.
- Os erros `message channel closed before a response was received` continuam classificados como ruído provável de extensão do navegador, não como falha do app.

## 7. Pendências
| Pendência | Impacto | Prioridade |
|---|---|---|
| Commitar/pushar sanitização de headers do proxy | Necessário para validar o novo erro de decodificação | Alta |
| Aguardar deploy Vercel contendo a sanitização de headers | Necessário para validar produção | Alta |
| Retestar chamada de IA em produção | Confirma se a migração para Node resolveu o 504 | Alta |
| Confirmar `OPENCODE_API_KEY` ou `OPENCODE_GO_API_KEY` na Vercel | IA não funciona sem segredo server-side | Alta |
| Testar App em Prod via PWA Android | Validação UX final do MVP | Alta |
| Avisos de IA e privacidade | Compliance/LGPD | Alta |

## 8. Próxima ação recomendada
Publicar a sanitização de headers do proxy. Após o deploy, repetir exatamente o fluxo que gerou `ERR_CONTENT_DECODING_FAILED`. Se ainda falhar, consultar logs Vercel/Dashboard para verificar status upstream, corpo retornado pela OpenCode e possíveis restrições de uso/credencial.

## 9. O que o próximo agente NÃO deve fazer
- Não voltar os proxies para Edge runtime para fluxos longos de IA.
- Não restaurar `content-length` ao modificar o body.
- Não repassar `content-encoding`, `content-length` ou headers de hop-by-hop brutos do upstream para o navegador.
- Não usar SDK `@google/genai`.
- Não iniciar backend/login/sync antes de validar o PWA e a IA em produção.

## 10. Segurança para troca de sessão
- Seguro rodar `/new`? Com ressalvas.
- Motivo: correção está commitada e enviada ao GitHub, mas ainda precisa confirmar o deploy e retestar em produção.
- Nome sugerido para a próxima sessão: Validar_Proxy_Node_Vercel_Prod
