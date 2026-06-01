# Próximas Ações

## Prioridade 1 — Validar correção do timeout 504 da IA
- [ ] Aguardar deploy Vercel do commit `66ef857` completar
- [ ] Repetir o fluxo que gerou `FUNCTION_INVOCATION_TIMEOUT` em `/api/opencode-proxy`
- [ ] Confirmar se o erro de plataforma da Vercel sumiu; se houver 504 controlado, investigar latência/instabilidade da OpenCode Go

## Prioridade 2 — Confirmação de instalação Android (ação humana)
- [ ] Aguardar deploy Vercel completar após o próximo commit (~1-2 minutos)
- [ ] Limpar cache do Chrome Android: Configurações → Privacidade → Limpar dados de navegação (cookies + cache)
- [ ] Acessar URL do app no Chrome Android
- [ ] Menu (⋮) → "Adicionar à tela inicial" ou "Instalar aplicativo"
- [ ] Confirmar: app abre sem barra de URL, exibe o novo logotipo no cabeçalho e na tela inicial, e a barra de status fica verde.

## Prioridade 3 — Substituir ícone gerado por IA pelo ícone real do usuário (se desejado)
- [ ] Salvar o PNG do ícone desejado em local acessível (ex: Downloads)
- [ ] Informar o caminho ao agente
- [ ] Agente copia para `public/pwa-512x512.png` e gera `pwa-192x192.png` via sharp
- [ ] Agente copia versão maskable para `public/pwa-maskable-512x512.png`
- [ ] Build + commit + push

## Prioridade 4 — Avisos de IA e privacidade (depende de aprovação humana)
- [ ] Responsável pelo produto deve revisar e aprovar o texto dos avisos (PRD seção 20.8)
- [ ] Após aprovação: agente implementa avisos nos fluxos de IA da interface

## Prioridade 5 — Corrigir encoding do CHANGELOG.md (não bloqueante)
- [ ] Corrigir encoding do `CHANGELOG.md` (Sprints 3–8 com null bytes UTF-16)
