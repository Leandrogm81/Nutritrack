# Próximas Ações

## Prioridade 1 — Bloqueador crítico de segurança (executar antes do deploy)

- [ ] Corrigir `src/services/geminiService.ts` linha 3: remover leitura de `VITE_OPENROUTER_API_KEY` via `import.meta.env`; a função `getApiKey()` deve retornar `undefined` no browser, forçando uso exclusivo de `/api/openrouter-proxy.ts`.
- [ ] Verificar `vite.config.ts` linha 38 e remover injeção de `OPENROUTER_API_KEY` no bundle.
- [ ] Atualizar variáveis de ambiente no dashboard da Vercel: garantir que `OPENROUTER_API_KEY` existe apenas como variável de servidor, sem prefixo `VITE_`.

## Prioridade 2 — Validação humana obrigatória antes do deploy

- [ ] Executar smoke-test manual do fluxo principal: perfil → refeição → água → treino → histórico → exportação → backup/importação → reset → offline.
- [ ] Documentar resultado do smoke-test com screenshots em `/docs/audit/`.
- [ ] Verificar que imagens de IA não persistem no estado local após análise (nos componentes que usam `analyzeImage` e `analyzeGymEquipment`).
- [ ] Verificar que fluxos de IA exigem confirmação explícita antes do salvamento.

## Prioridade 3 — Decisão humana pendente (não pode ser resolvida por agente)

- [ ] Aprovação do texto final dos avisos de IA e privacidade (PRD seção 20.8).
- [ ] Após aprovação: implementar avisos nos locais exigidos pelo PRD (tela, modal ou bloco contextual).
- [ ] Fechamento dos campos finais de exportação CSV/PDF (ponto de decisão do PRD seção 19).

## Prioridade 4 — Documental (não bloqueante para deploy)

- [ ] Criar `/docs/evolution/out-of-scope-changes.md` registrando: migração Gemini→OpenRouter; presença de `analyzeGymEquipment`; presença de `suggestRecipes` (fora do MVP conforme PRD seção 8).
- [ ] Corrigir encoding do `CHANGELOG.md` (Sprints 3–8 com null bytes UTF-16).

## Referência

Todas as ações acima estão detalhadas em `/docs/audit/final-audit.md` seções 5, 6, 11 e 16.
