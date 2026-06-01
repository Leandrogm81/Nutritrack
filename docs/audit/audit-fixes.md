# arquivo: /docs/audit/audit-fixes.md

# Relatório de Correção Pós-Auditoria

**Data:** 2026-06-01  
**Baseado em:** `/docs/audit/final-audit.md` (2026-06-01)  
**Executor:** AI Agent (engenheiro sênior, sessão de correção pós-auditoria)

---

## 1. Resumo geral

Esta sessão corrigiu o bloqueador crítico de segurança identificado na auditoria final: a exposição da chave de API da IA (`OPENROUTER_API_KEY`) ao bundle público do cliente via variável Vite.

**Acesso real ao código:** Sim — todos os arquivos foram lidos e editados diretamente.  
**Correção executada:** Sim — dois arquivos alterados, build e lint validados, nenhuma regressão nos 23 testes unitários.  
**Documentos usados:** `final-audit.md`, `CURRENT_STATE.md`, `HANDOFF.md`, `DECISIONS.md`, código-fonte (`geminiService.ts`, `vite.config.ts`, `openrouter-proxy.ts`, `MealForm.tsx`, `WorkoutTracker.tsx`).  
**Limitações:** Smoke-test visual humano não executável por agente. Avisos de IA dependem de aprovação humana. Testes E2E ausentes.

---

## 2. Fontes consultadas

| Fonte | Caminho ou origem | Acessada? | Impacto |
|---|---|---|---|
| Auditoria final | `/docs/audit/final-audit.md` | Sim | Base principal — 302 linhas lidas na íntegra |
| Estado atual | `/docs/agent/CURRENT_STATE.md` | Sim | Confirmou bloqueador crítico e próxima ação |
| Handoff | `/docs/agent/HANDOFF.md` | Sim | Confirmou pendências e histórico de tentativas |
| Decisões | `/docs/evolution/DECISIONS.md` | Sim (via PowerShell) | Confirmou decisão de migração para OpenRouter |
| Regras operacionais | `/docs/agent/agent-operating-rules.md` | Sim | Aplicadas durante toda a execução |
| Código-fonte | `geminiService.ts`, `vite.config.ts`, `openrouter-proxy.ts` | Sim | Leitura direta antes de qualquer edição |
| Componentes de UI | `MealForm.tsx`, `WorkoutTracker.tsx` | Sim | Verificação de não-persistência de imagens |
| PRD | `/docs/product/PRD.md` | Não (esta sessão) | Impacto baixo — base já analisada na auditoria anterior |
| Plano de implementação | `/docs/implementation/PLANO_IMPLEMENTACAO.md` | Não (esta sessão) | Impacto baixo — contexto já estabelecido via auditoria |

---

## 3. Itens corrigidos

| Item da auditoria | Severidade | Status após correção | Arquivos alterados | Observação |
|---|---|---|---|---|
| Chave de API exposta ao bundle via `VITE_OPENROUTER_API_KEY` | Crítica | **Corrigido** | `geminiService.ts`, `vite.config.ts` | `getApiKey()` retorna `undefined`; bundle verificado sem a chave |
| `vite.config.ts` linha 38 — injeção de segredo em modo dev | Crítica | **Corrigido** | `vite.config.ts` | `OPENROUTER_API_KEY` removido do `define`; apenas modelo não-sensível permanece |
| `out-of-scope-changes.md` inexistente | Baixa | **Corrigido** | `/docs/evolution/out-of-scope-changes.md` (criado) | Documenta migração Gemini→OpenRouter, `analyzeGymEquipment`, `suggestRecipes` |
| Imagens usadas em IA potencialmente persistidas | Alta | **Não verificável → Confirmado seguro** | Nenhum | Leitura de `MealForm.tsx` e `WorkoutTracker.tsx` confirma que `base64Data` é variável local transitória; apenas resultados de texto (macros, nome) são armazenados; `fileInputRef.current.value = ''` limpa o input |

---

## 4. Itens não corrigidos

| Item não corrigido | Severidade | Motivo | Próxima ação recomendada |
|---|---|---|---|
| Smoke-test visual humano do fluxo principal | Alta | Requer execução humana — não pode ser simulado por agente | Executar manualmente e documentar com screenshots em `/docs/audit/` |
| Avisos de IA e privacidade (implementação) | Alta | Texto final aguarda aprovação humana (PRD seção 20.8) | Responsável pelo produto deve aprovar o texto; após aprovação, implementar nos componentes |
| Atualização de variáveis de ambiente na Vercel | Alta | Requer acesso ao dashboard da Vercel — ação humana | Garantir que `OPENROUTER_API_KEY` existe sem prefixo `VITE_` no servidor; remover qualquer variável `VITE_OPENROUTER_API_KEY` do ambiente Vercel |
| Verificação de reset com confirmação na UI | Média | Requer smoke-test visual | Verificar durante o smoke-test se o dialog de confirmação está presente |
| Exportação CSV/PDF — teste com dados reais | Média | Requer execução manual | Executar exportação e verificar conteúdo do arquivo gerado |
| CHANGELOG.md com encoding corrompido (Sprints 3–8) | Média | Arquivo com encoding UTF-16 — requer tratamento separado e cuidadoso | Converter para UTF-8 em sessão dedicada; não misturar com correções de código |
| Parsing de resposta da IA sem schema de validação | Média | Melhoria (Zod/similar) fora do escopo desta correção pontual | Considerar em ciclo futuro |
| Testes E2E do fluxo principal | Alta | Fora do escopo desta correção pós-auditoria | Criar com Playwright em sessão dedicada antes do release público |
| Histórico como tela de primeiro nível — verificação visual | Média | Requer smoke-test | Verificar durante smoke-test se histórico está acessível na navegação principal |

---

## 5. Riscos restantes

| Risco restante | Área | Severidade | Motivo |
|---|---|---|---|
| Variáveis de ambiente da Vercel não atualizadas | Deploy | Alta | `VITE_OPENROUTER_API_KEY` pode ainda existir nas variáveis de ambiente da Vercel lado-cliente — ação humana necessária |
| Bugs visuais não detectados | UI/UX | Média | Nenhum smoke-test visual executado |
| Avisos de IA ausentes na interface | Produto/Legal | Alta | Texto não aprovado, implementação pendente |
| Modelo `xiaomi/mimo-v2.5` sem validação de qualidade | Produto/IA | Média | Respostas do modelo não testadas em contexto real do produto |
| Service worker offline não testado em produção | Confiabilidade | Média | Testado apenas localmente |
| Encoding corrompido no CHANGELOG (Sprints 3–8) | Manutenibilidade | Média | Dificulta auditorias futuras |
| Bundle grande (warning de chunk size) | Performance | Baixa | Pré-existente; não bloqueante para MVP |

---

## 6. Testes executados

| Teste ou validação | Resultado | Evidência | Observação |
|---|---|---|---|
| `npm run lint` (TypeScript typecheck) | **Passou** | `tsc --noEmit` sem erros | Executado após ambas as correções |
| `npm run build` (PWA v1.2.0) | **Passou** | `✓ 2979 modules transformed. ✓ built in 6.82s. dist/sw.js gerado` | Build limpo sem erros |
| Testes unitários (`npm run test -- --run`) | **Passou** | `Tests 23 passed (23)` — 7 arquivos, 23 testes | Nenhuma regressão introduzida |
| Busca de `OPENROUTER_API_KEY` no bundle gerado | **Passou (ausente)** | `Select-String` nos arquivos `.js` de `dist/assets/` — sem ocorrências | Confirma que a chave não está no bundle público |
| Verificação de código — não-persistência de imagens | **Passou (confirmado)** | Leitura de `MealForm.tsx` e `WorkoutTracker.tsx` | `base64Data` é variável local; apenas resultado textual (macros) é armazenado |
| Smoke-test visual do fluxo principal | Não executado | — | Requer execução humana |

---

## 7. Arquivos alterados

| Arquivo | Alteração feita | Achado relacionado |
|---|---|---|
| `src/services/geminiService.ts` | `getApiKey()` alterada para retornar `undefined`; remoção de `import.meta.env.VITE_OPENROUTER_API_KEY`; `openRouterCompletion()` sempre usa `/api/openrouter-proxy`; removida lógica condicional de URL e header de `Authorization` | Achado crítico — seção 5 da auditoria |
| `vite.config.ts` | Removida linha `'process.env.OPENROUTER_API_KEY': mode === 'development' ? JSON.stringify(env.OPENROUTER_API_KEY) : '""'` do bloco `define`; mantido apenas modelo não-sensível | Achado crítico — seção 11 da auditoria |
| `docs/evolution/out-of-scope-changes.md` | Arquivo criado com registro das 3 mudanças fora de escopo identificadas pela auditoria | Achado baixo — seção 7 e 14 da auditoria |

---

## 8. Diff lógico das correções

| Problema original | Alteração feita | Por que resolve | Como foi validado |
|---|---|---|---|
| `getApiKey()` lia `VITE_OPENROUTER_API_KEY` via `import.meta.env`, que é injetada no bundle pelo Vite | `getApiKey()` agora retorna `undefined` explicitamente; `openRouterCompletion()` sempre usa `/api/openrouter-proxy` sem fallback direto | A variável nunca mais é lida no cliente; sem chave no cliente, a IA só funciona via proxy | `Select-String` no bundle `dist/assets/*.js` sem ocorrências de `OPENROUTER_API_KEY` |
| `vite.config.ts` injetava `process.env.OPENROUTER_API_KEY` como string estática no bundle em modo dev | Entrada removida do bloco `define` | A chave não é mais injetada estáticamente no código transformado pelo Vite | Build limpo + busca no bundle sem ocorrências |
| `out-of-scope-changes.md` não existia; mudanças fora de escopo não rastreadas | Arquivo criado com 3 entradas documentadas | Rastreabilidade documental completa conforme exigido pela auditoria | Arquivo lido após criação |

---

## 9. Alterações fora de escopo

| Alteração | Motivo | Risco | Precisa registrar em `/docs/evolution/out-of-scope-changes.md`? |
|---|---|---|---|
| Nenhuma alteração fora do escopo foi realizada. | — | — | — |

As correções foram restritas ao mínimo necessário para resolver os achados da auditoria sem expansão de escopo.

---

## 10. Atualizações documentais recomendadas

| Documento | Atualizar? | Motivo |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | **Sim** | Bloqueador crítico resolvido; estado do projeto mudou |
| `/docs/evolution/CHANGELOG.md` | **Sim** | Duas alterações reais implementadas (`geminiService.ts`, `vite.config.ts`) |
| `/docs/evolution/DECISIONS.md` | Não | Nenhuma decisão técnica nova; a arquitetura de proxy já era decisão existente |
| `/docs/evolution/out-of-scope-changes.md` | **Já atualizado** | Arquivo criado nesta sessão |
| `/docs/audit/AUDIT_EVIDENCE.md` | **Sim** | Adicionar evidências desta correção: lint, build, testes, busca no bundle |
| `/docs/agent/HANDOFF.md` | **Sim** | Atualizar com novo estado: bloqueador crítico resolvido; próxima ação é smoke-test humano |

---

## 11. Próximo passo recomendado

**Pronto para teste interno — com ações humanas pendentes antes do deploy público.**

O bloqueador crítico de segurança foi corrigido. O projeto agora está em condição de:

1. **Ser testado internamente** por humano com smoke-test visual dos fluxos principais
2. **Ter variáveis de ambiente atualizadas na Vercel** (remover `VITE_OPENROUTER_API_KEY` se existir; garantir `OPENROUTER_API_KEY` apenas no servidor)
3. **Ter o texto dos avisos de IA aprovado** pelo responsável pelo produto antes de qualquer release público

Não está pronto para nova auditoria formal ainda — faltam evidências visuais e o smoke-test humano.

---

## 12. Observação final

A implementação está significativamente mais próxima do PRD após esta correção. A violação do gate de segurança obrigatório (seção 15.3 e 16 do PRD) foi eliminada. O proxy Vercel (`/api/openrouter-proxy.ts`) agora é o único caminho para chamadas de IA — conforme a arquitetura originalmente definida.

A verificação do bundle confirmou que nenhuma chave sensível está acessível ao usuário final. Os 23 testes unitários continuam passando, confirmando ausência de regressão.

O único bloqueador restante para deploy público são as validações que exigem ação humana: smoke-test visual, aprovação do texto dos avisos de IA e atualização das variáveis de ambiente na Vercel.

**Status final: Pronto para teste interno — aguardando ações humanas antes do deploy público.**
