# Current State

## Estado atual

MVP v1.2.0 completo e publicado no GitHub (`main`, commit `13b45ea`). PWA Android hardening aplicado nesta sessão: ícone 192×192 redimensionado corretamente, `skipWaiting` ativado, `vercel.json` corrigido com `no-cache` para SW/manifest. Deploy Vercel automático disparado pelo último push. Instalação real no Android **ainda não confirmada pelo usuário** — é a próxima ação.

## Última ação relevante

Commit `13b45ea` — corrige 3 bloqueadores de instalação PWA: dimensão real do ícone 192×192, `skipWaiting` no Workbox, headers `no-cache` para `sw.js` e `manifest.webmanifest` no Vercel.

## Arquivos relevantes

- `public/pwa-192x192.png` — 192×192 real (37KB); redimensionado via sharp
- `public/pwa-512x512.png` — ícone principal PWA
- `public/pwa-maskable-512x512.png` — adaptive icon Android
- `vite.config.ts` — manifest completo + Workbox skipWaiting
- `vercel.json` — headers corrigidos; SW sem cache; API excluída do rewrite
- `index.html` — meta tags Android/iOS
- `src/services/geminiService.ts` — getApiKey() retorna undefined (seguro)
- `api/openrouter-proxy.ts` — canal exclusivo OpenRouter
- `docs/audit/validation-report.md` — validação independente de segurança

## Pendências imediatas

- Limpar cache do Chrome Android e testar instalação "Adicionar à tela inicial"
- Aguardar deploy Vercel completar (~1–2 min após push 13b45ea)
- Confirmar variáveis de ambiente no dashboard Vercel (OPENROUTER_API_KEY sem VITE_)
- Usuário deve fornecer PNG do ícone próprio para substituição

## Riscos atuais

- Instalação Android não confirmada — smoke-test humano pendente
- Variáveis Vercel não verificadas — IA pode falhar em produção
- Avisos de IA ausentes da interface (PRD seção 20.8) — aguardando aprovação de texto

## Próxima ação recomendada

Limpar cache do Chrome Android → acessar URL do app → Menu (⋮) → Adicionar à tela inicial. Documentar resultado.

## Não fazer agora

- Não abrir novas sprints sem decisão humana
- Não implementar avisos de IA sem aprovação do texto
- Não reverter skipWaiting ou headers no-cache do vercel.json
- Não marcar instalação como confirmada sem evidência

## Seguro rodar `/new`?

Com ressalvas — estado documentado e commits no GitHub. Ressalva: instalação Android e smoke-test ainda pendentes.
