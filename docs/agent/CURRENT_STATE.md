# Current State

## Estado atual
MVP v1.2.2 publicado no GitHub (`main`, commit `514c14d`). Ícone Lucide no cabeçalho substituído pelo novo logotipo (`favicon.svg`). Bloqueador da instalação PWA Android resolvido: `pwa-512x512.png` e `pwa-maskable-512x512.png` convertidos de JPEG para PNG reais usando `sharp`. Menu de navegação inferior otimizado para mobile (tamanho de fonte `8px` e padding `p-2` em telas pequenas). Deploy Vercel automático disparado.

## Última ação relevante
Commit `514c14d` — reduz fonte e padding dos botões de navegação inferior em mobile.

## Arquivos relevantes
- `src/App.tsx` — Otimização de CSS/classes do menu de navegação inferior
- `index.html` — Link do manifesto PWA explicitado

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
