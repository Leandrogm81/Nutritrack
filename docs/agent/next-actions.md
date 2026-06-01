# Próximas Ações

## Prioridade 1 — Confirmação de instalação Android (ação humana)

- [ ] Aguardar deploy Vercel completar após commit `13b45ea`
- [ ] Limpar cache do Chrome Android: Configurações → Privacidade → Limpar dados de navegação (cookies + cache)
- [ ] Acessar URL do app no Chrome Android
- [ ] Menu (⋮) → "Adicionar à tela inicial" → confirmar instalação
- [ ] Verificar: app abre sem barra de URL, ícone aparece na tela inicial, barra de status verde

## Prioridade 2 — Confirmar variáveis de ambiente na Vercel (ação humana)

- [ ] Acessar: vercel.com → Projeto NutriTrack → Settings → Environment Variables
- [ ] Confirmar que `OPENROUTER_API_KEY` existe como variável servidor (sem prefixo VITE_)
- [ ] Confirmar que NÃO existe `VITE_OPENROUTER_API_KEY` (removeria segurança do proxy)
- [ ] Se alteração feita: Deployments → Redeploy (variáveis só aplicam em novo deploy)

## Prioridade 3 — Substituir ícone gerado por IA pelo ícone real do usuário

- [ ] Usuário deve salvar o PNG do ícone criado em local acessível (ex: Downloads)
- [ ] Informar o caminho ao agente
- [ ] Agente copia para `public/pwa-512x512.png` e gera `pwa-192x192.png` via sharp
- [ ] Agente copia versão maskable para `public/pwa-maskable-512x512.png`
- [ ] Build + commit + push

## Prioridade 4 — Smoke-test visual completo (ação humana)

- [ ] Executar fluxo: perfil → refeição → água → treino → histórico → exportação → backup/importação → reset → offline
- [ ] Documentar resultado com texto ou screenshots em `/docs/audit/`

## Prioridade 5 — Avisos de IA e privacidade (depende de aprovação humana)

- [ ] Responsável pelo produto deve revisar e aprovar o texto dos avisos (PRD seção 20.8)
- [ ] Após aprovação: agente implementa avisos nos fluxos de IA da interface

## Prioridade 6 — Documental (não bloqueante)

- [ ] Corrigir encoding do `CHANGELOG.md` (Sprints 3–8 com null bytes UTF-16)

## Referência

- Commits desta sessão: `a46bd87` (MVP), `7db53ba` (README), `cbde6e9` (AI Studio cleanup), `a27922e` (PWA icons v1), `13b45ea` (PWA fix)
- Detalhes dos problemas corrigidos: `/docs/agent/HANDOFF.md` seções 6 e 7
- Validação de segurança: `/docs/audit/validation-report.md`
