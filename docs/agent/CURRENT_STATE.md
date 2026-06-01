# Current State

## Estado atual
MVP v1.2.1 publicado no GitHub (`main`, commit `ab72665`). Ícone Lucide no cabeçalho substituído pelo novo logotipo (`favicon.svg`). Bloqueador da instalação PWA Android resolvido: `pwa-512x512.png` e `pwa-maskable-512x512.png` convertidos de JPEG para PNG reais usando `sharp`. Deploy Vercel automático disparado.

## Última ação relevante
Commit `ab72665` — substitui ícone do cabeçalho pelo novo logotipo; corrige formato das imagens do manifest de JPEG para PNG.

## Arquivos relevantes
- `src/App.tsx` — Cabeçalho atualizado para renderizar `favicon.svg`
- `index.html` — Adicionado link explícito para `manifest.webmanifest`
- `public/pwa-512x512.png` — Convertido para PNG real de 512x512
- `public/pwa-maskable-512x512.png` — Convertido para PNG real de 512x512

## Pendências imediatas
- Limpar cache do Chrome Android e testar instalação "Adicionar à tela inicial"
- Aguardar deploy Vercel completar (~1-2 minutos)
- Confirmar variáveis de ambiente no dashboard Vercel (`OPENROUTER_API_KEY`)

## Riscos atuais
- Smoke-test de instalação física no Android ainda não finalizado

## Próxima ação recomendada
Limpar cache do Chrome Android → acessar URL → Menu (⋮) → Adicionar à tela inicial.

## Não fazer agora
- Não abrir novas sprints sem decisão humana
- Não remover `skipWaiting` ou headers `no-cache`
