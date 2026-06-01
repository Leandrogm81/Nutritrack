# Próximas Ações

## Prioridade 1 — Confirmação de instalação Android (ação humana)
- [ ] Aguardar deploy Vercel completar após commit `ab72665` (~1-2 minutos)
- [ ] Limpar cache do Chrome Android: Configurações → Privacidade → Limpar dados de navegação (cookies + cache)
- [ ] Acessar URL do app no Chrome Android
- [ ] Menu (⋮) → "Adicionar à tela inicial" ou "Instalar aplicativo"
- [ ] Confirmar: app abre sem barra de URL, exibe o novo logotipo no cabeçalho e na tela inicial, e a barra de status fica verde.

## Prioridade 2 — Substituir ícone gerado por IA pelo ícone real do usuário (se desejado)
- [ ] Salvar o PNG do ícone desejado em local acessível (ex: Downloads)
- [ ] Informar o caminho ao agente
- [ ] Agente copia para `public/pwa-512x512.png` e gera `pwa-192x192.png` via sharp
- [ ] Agente copia versão maskable para `public/pwa-maskable-512x512.png`
- [ ] Build + commit + push

## Prioridade 3 — Avisos de IA e privacidade (depende de aprovação humana)
- [ ] Responsável pelo produto deve revisar e aprovar o texto dos avisos (PRD seção 20.8)
- [ ] Após aprovação: agente implementa avisos nos fluxos de IA da interface

## Prioridade 4 — Corrigir encoding do CHANGELOG.md (não bloqueante)
- [ ] Corrigir encoding do `CHANGELOG.md` (Sprints 3–8 com null bytes UTF-16)
