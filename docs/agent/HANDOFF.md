# Handoff — Continuidade de Sessão

## 1. Objetivo atual

Tornar o NutriTrack MVP v1.2.0 instalável como app Android (PWA) e disponível via GitHub/Vercel, mantendo-o como web app.

## 2. Estado geral do projeto

MVP completo. Código commitado e publicado no GitHub (`main`, commit `13b45ea`). Vercel com deploy automático ativado — o último push (`13b45ea`) deve ter disparado um novo deploy. Os problemas de instalação PWA no Android foram diagnosticados e corrigidos nesta sessão: ícone redimensionado, `skipWaiting` adicionado, headers do `vercel.json` corrigidos. O smoke-test de instalação no Android ainda não foi executado pelo usuário — é a próxima ação humana pendente.

## 3. O que já foi feito

- **Commit e push do MVP completo** (`a46bd87`): 94 arquivos, Sprints 1–10, segurança, testes, documentação
- **README reescrito** (`7db53ba`): cobre produto, stack, setup, deploy, status atual
- **Boilerplate AI Studio removido** (`cbde6e9`): `index.html`, `package.json`, `vite.config.ts`, `package-lock.json`
- **Variáveis de ambiente Vercel documentadas**: `OPENROUTER_API_KEY` (servidor, sem `VITE_`); `VITE_OPENROUTER_MODEL` (opcional)
- **Auditoria pós-correção independente** executada: 23 testes passando, build limpo, bundle sem chave exposta. Relatório em `/docs/audit/validation-report.md`
- **PWA Android hardening** (`a27922e` + `13b45ea`):
  - `public/pwa-192x192.png` criado e **redimensionado para 192×192 real** via sharp (era 512×512 com nome errado — bloqueava instalação)
  - `public/pwa-512x512.png` criado
  - `public/pwa-maskable-512x512.png` criado (adaptive icon Android)
  - `public/favicon.svg` criado
  - `vite.config.ts`: manifest completo (`start_url`, `scope`, `orientation`, `lang pt-BR`, `background_color`, ícone maskable)
  - `vite.config.ts`: `skipWaiting: true` + `clientsClaim: true` no Workbox (sem isso, SW antigo nunca liberava controle)
  - `vercel.json`: `sw.js` e `manifest.webmanifest` com `no-cache`; `/api/*` excluído do rewrite SPA; `Content-Type` do manifest corrigido
  - `index.html`: `theme-color`, `mobile-web-app-capable`, `apple-touch-icon`, `favicon` links

## 4. Decisões tomadas

- **Ícones gerados por IA** (fundo verde, letra N, haltere, folha) — usuário mostrou design próprio mas o arquivo PNG não foi fornecido; ícones de fallback foram usados. Usuário deve substituir se quiser o ícone próprio.
- **sharp adicionado como devDependency** para redimensionamento de ícones (necessário para gerar 192×192 real).
- **`skipWaiting: true`** — decisão de ativar SW imediatamente em novo deploy (trade-off: pode causar reload inesperado em tabs abertas; aceitável para MVP).
- **`vercel.json` sem cache para SW/manifest** — evita que atualizações fiquem presas no cache do browser por até 1 ano.

## 5. Arquivos importantes

| Arquivo | Função | Observação |
|---|---|---|
| `public/pwa-192x192.png` | Ícone PWA 192×192 | Redimensionado via sharp; confirmar dimensão real |
| `public/pwa-512x512.png` | Ícone PWA 512×512 | Imagem gerada por IA |
| `public/pwa-maskable-512x512.png` | Adaptive icon Android | Necessário para launchers modernos |
| `public/favicon.svg` | Favicon tab browser | SVG baseado nas cores do app |
| `vite.config.ts` | Config Vite + PWA manifest | Workbox com skipWaiting; manifest completo |
| `vercel.json` | Roteamento e headers Vercel | SW/manifest sem cache; API excluída do rewrite |
| `index.html` | HTML raiz | Meta tags Android/iOS adicionadas |
| `src/services/geminiService.ts` | Serviço de IA | `getApiKey()` retorna `undefined`; proxy exclusivo |
| `api/openrouter-proxy.ts` | Proxy Vercel Edge | Canal exclusivo para OpenRouter |
| `docs/audit/validation-report.md` | Relatório de validação independente | Bloqueador de segurança confirmado resolvido |

## 6. Problemas encontrados

- **Ícone 192×192 com dimensão errada**: arquivo 512×512 copiado com nome 192×192. Chrome Android rejeita instalação quando dimensão real difere do manifest. Corrigido via sharp nesta sessão.
- **Service worker nunca atualizava**: `sw.js` estava sendo servido com `Cache-Control: immutable` (1 ano). Corrigido com `no-cache` no `vercel.json`.
- **SW antigo nunca liberava controle**: sem `skipWaiting`, o usuário precisaria fechar todas as abas para o novo SW ativar. Corrigido.
- **Rewrite SPA bloqueava `/api/`**: o rewrite global `(.*)→index.html` poderia interceptar chamadas à Edge Function. Corrigido com exclusão explícita de `/api/*`.
- **Ícone próprio do usuário não fornecido**: o usuário mostrou um design de ícone mas não forneceu o arquivo PNG. Os ícones no projeto são gerados por IA.
- **CHANGELOG.md com encoding corrompido** (Sprints 3–8): persiste; não tratado nesta sessão.
- **Smoke-test de instalação Android não executado**: confirmação real de funcionamento pendente.

## 7. Tentativas realizadas

| Tentativa | Resultado | Observação |
|---|---|---|
| Copiar 512×512 como 192×192 | Falhou | Chrome rejeita; corrigido com sharp |
| Gerar ícone com `generate_image` (design do usuário como referência) | Parcial | Ícone gerado mas não é o design exato do usuário |
| `vite.config.ts` via `replace_file_content` | Falhou (arquivo corrompido) | Arquivo reescrito do zero com `write_to_file` |
| Build com novo `vercel.json` e `skipWaiting` | Passou | `✓ built in 10.85s`, `workbox-66610c77.js` (novo hash) |

## 8. O que funcionou

- Redimensionamento com sharp: 192×192 real, 37KB (era 383KB)
- Build de produção: passou sem erros após todas as correções
- `skipWaiting` + `clientsClaim`: incorporados no Workbox (novo hash do workbox confirma)
- `vercel.json` com headers corretos: SW/manifest sem cache
- Commit e push de todas as correções: `13b45ea` publicado

## 9. O que não funcionou

- `replace_file_content` em `vite.config.ts`: corrompeu o arquivo (substituição aplicou apenas parte da mudança). Solução: `write_to_file` com conteúdo completo.
- Instalação no Android ainda não confirmada pelo usuário.

## 10. Pendências

| Pendência | Impacto | Prioridade |
|---|---|---|
| Smoke-test de instalação Android (Chrome → Adicionar à tela inicial) | Confirma se PWA está funcional | Alta |
| Limpar cache do browser no celular do usuário antes de testar | Sem isso, SW antigo pode persistir | Alta |
| Confirmar variáveis de ambiente na Vercel (dashboard) | Sem `OPENROUTER_API_KEY` servidor, IA falha | Alta |
| Substituir ícones gerados pelo ícone real do usuário | Ícone atual não é o design fornecido pelo usuário | Média |
| Avisos de IA e privacidade na interface (PRD seção 20.8) | Requisito PRD; pendência de aprovação de texto | Alta |
| Smoke-test visual completo do fluxo principal | Não executado | Alta |
| Corrigir encoding do CHANGELOG.md | Documental; não bloqueante | Baixa |

## 11. Riscos

| Risco | Área | Severidade | Observação |
|---|---|---|---|
| Vercel deploy ainda não concluído no momento do teste | Deploy | Alta | Aguardar 1–2 min após push antes de testar |
| Ícone gerado por IA ≠ ícone do usuário | UX | Média | Usuário deve fornecer PNG para substituição |
| Smoke-test não executado | QA | Alta | Instalação real não confirmada |
| Variáveis de ambiente na Vercel não verificadas | Segurança/Produto | Alta | IA pode falhar sem `OPENROUTER_API_KEY` |
| CHANGELOG.md com encoding corrompido | Documental | Baixa | Histórico das Sprints 3–8 ilegível por ferramentas |

## 12. Próxima ação recomendada

**Ação humana:** aguardar deploy Vercel completar (~1–2 min após push `13b45ea`), limpar cache do Chrome Android, acessar a URL do app e tentar "Adicionar à tela inicial". Documentar resultado (funcionou/não funcionou + screenshot se possível).

**Se não funcionar:** verificar no Chrome Android → `chrome://inspect` ou abrir DevTools e verificar a aba Application → Service Workers e Manifest.

**Após instalação confirmada:** fornecer o arquivo PNG do ícone para substituição definitiva dos ícones gerados por IA.

## 13. O que o próximo agente NÃO deve fazer

- Não refazer a correção de segurança — já corrigida e validada por contexto independente
- Não alterar `geminiService.ts` sem motivo — está correto (`getApiKey()` retorna `undefined`)
- Não remover `skipWaiting` ou `clientsClaim` do Workbox — foram adicionados por necessidade real
- Não reverter os headers do `vercel.json` — `no-cache` no SW é obrigatório para PWA
- Não alterar o rewrite do `vercel.json` sem excluir `/api/*` — corre risco de quebrar o proxy
- Não marcar instalação como confirmada sem evidência do usuário
- Não abrir novas sprints sem decisão humana
- Não implementar avisos de IA sem aprovação prévia do texto pelo usuário

## 14. Segurança para troca de sessão

- Seguro rodar `/new`? **Com ressalvas**
- Motivo: Todos os commits estão no GitHub. O estado está documentado. A ressalva é que a instalação Android ainda não foi confirmada pelo usuário, e o smoke-test geral ainda não foi executado.
- Nome sugerido para a nova sessão: `NutriTrack-PWA-Install-Validation`
