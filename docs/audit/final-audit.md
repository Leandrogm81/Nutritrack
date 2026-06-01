# arquivo: /docs/audit/final-audit.md

# Auditoria Final — NutriTrack

**Data da auditoria:** 2026-06-01  
**Auditor:** AI Agent (função: auditor independente, sem participação na implementação desta sessão)  
**Versão do produto auditada:** Release Candidate pós-Sprint 10

---

## 1. Veredito geral

**Aprovado apenas para teste interno**

O projeto apresenta maturidade técnica sólida na camada de lógica local: 23 testes unitários passando, build limpo do PWA, linter sem erros, rollover e migração de estado validados. A maioria dos requisitos funcionais do MVP está implementada com base nas evidências disponíveis.

No entanto, existem dois bloqueadores que impedem aprovação para produção pública:

1. **Risco crítico de segurança confirmado por código-fonte:** A função `getApiKey()` em `geminiService.ts` (linha 3) lê `VITE_OPENROUTER_API_KEY` via `import.meta.env`, que é uma variável exposta ao bundle do cliente em builds Vite. Isso viola a regra explícita do PRD: *"qualquer build público com IA deve usar camada server-side/proxy e manter o segredo fora do cliente"*. O proxy Vercel existe (`api/openrouter-proxy.ts`), mas o fallback direto com chave no cliente está ativo.
2. **Ausência total de validação visual humana:** Nenhuma evidência de smoke-test manual, screenshot, teste E2E ou teste de regressão de UI foi documentada. O fluxo principal não é verificável visualmente.

Para uso local estritamente privado (dispositivo do próprio usuário, sem deploy público), o projeto pode ser considerado funcional.

**Fonte principal do PRD analisado:** `/docs/product/PRD.md`  
**Fonte principal do plano analisado:** `/docs/implementation/PLANO_IMPLEMENTACAO.md`  
**Fontes de evidência usadas:** `AUDIT_EVIDENCE.md`, `HANDOFF.md`, `CURRENT_STATE.md`, `CHANGELOG.md`, `DECISIONS.md`, `src/services/geminiService.ts` (análise direta do código-fonte)  
**Limitações da auditoria:** Sem evidência visual ou E2E; sem acesso a logs da Vercel; sem testes de integração executados nesta sessão; CHANGELOG.md com encoding parcialmente corrompido em blocos das Sprints 3 em diante.

---

## 2. Fontes analisadas

| Fonte | Caminho ou origem | Acessada? | Impacto na auditoria |
|---|---|---|---|
| PRD | `/docs/product/PRD.md` | Sim | Base principal da auditoria; 1.166 linhas lidas na íntegra |
| Plano de implementação | `/docs/implementation/PLANO_IMPLEMENTACAO.md` | Sim | 113 linhas lidas; confirma estrutura das Sprints 0–10 |
| Evidências | `/docs/audit/AUDIT_EVIDENCE.md` | Sim | 143 linhas lidas; evidências de build e testes documentadas |
| Changelog | `/docs/evolution/CHANGELOG.md` | Sim (parcial) | Lido via PowerShell; encoding corrompido a partir da Sprint 3 impede leitura integral; Sprints 0–2 e Sprint 9 legíveis |
| Estado atual | `/docs/agent/CURRENT_STATE.md` | Sim | 37 linhas; confirma Sprint 10 concluída |
| Handoff | `/docs/agent/HANDOFF.md` | Sim | 79 linhas; documenta pendências de validação visual e deploy |
| Decisões | `/docs/evolution/DECISIONS.md` | Sim | Lido via PowerShell; confirmada decisão de substituição do Gemini pelo OpenRouter e regra de gasto energético |
| Código-fonte (IA) | `/src/services/geminiService.ts` | Sim | 442 linhas; análise direta revelou risco crítico de chave no cliente |
| Sprint 9 | `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA.md` | Sim (parcial) | 80 linhas lidas; confirma requisitos de gate de segurança |
| Evidências visuais | Screenshots, logs Vercel, E2E | Não | Impacto alto: impossibilita verificação de UX, layout e rotas de produção |
| `out-of-scope-changes.md` | `/docs/evolution/out-of-scope-changes.md` | Não | Arquivo não existe; mudanças fora de escopo não foram rastreadas formalmente |

---

## 3. Matriz PRD vs Implementação

| Requisito | Status de implementação | Evidência | Nível de evidência | Observação | Severidade |
|---|---|---|---|---|---|
| Perfil e metas (salvar, persistir, metas automáticas Mifflin-St Jeor) | Implementado | CHANGELOG Sprint 2; `UserProfileForm.tsx` alterado; testes passando | Parcial | Validação visual do formulário não confirmada | Não aplicável |
| Dashboard diário (metas, consumo, água, treino) | Implementado | CHANGELOG Sprint 3; `Dashboard.tsx` alterado | Parcial | Encoding corrompido impede leitura completa do Sprint 3; sem evidência visual | Baixa |
| Registro manual de refeições (campos, atualização dashboard) | Implementado | CHANGELOG Sprint 3; `MealForm.tsx`, `ManualMealForm.tsx` alterados | Parcial | Critério de arredondamento não documentado definitivamente | Baixa |
| Registro de água (cumulativo, atualização imediata) | Implementado | CHANGELOG Sprint 3 (encoding parcial) | Parcial | Sem evidência visual | Baixa |
| Assistência de IA — revisão antes de salvar | Parcial | `geminiService.ts` lido; fluxo de revisão não verificável sem UI | Insuficiente | Não há evidência de que o fluxo exige confirmação antes do salvamento no componente de UI | Alta |
| Avisos de IA e privacidade (obrigatórios no MVP) | Não verificado | Nenhum arquivo de avisos identificado; não consta em evidências | Não informado | O PRD exige tela/modal/bloco contextual com aviso de estimativa revisável | Alta |
| Texto final dos avisos legais aprovado por humano | Ausente | DECISIONS.md: ponto de decisão ainda aberto | Não informado | PRD seção 20.8 explicita que coder não decide esse texto | Alta |
| Planejamento alimentar semanal (plano ≠ consumo automático) | Implementado | `WeeklyPlanner.tsx` listado no CHANGELOG Sprint 9 | Parcial | Separação plano/diário não verificável sem UI | Baixa |
| Planejamento semanal de treinos (agenda ≠ execução) | Implementado | `WorkoutPlanner.tsx` e `WorkoutTracker.tsx` alterados | Parcial | Separação plano/execução não verificável sem UI | Baixa |
| Registro de treino executado, cardio e passos | Implementado | Commits `feat: add activity tracking`, `feat: Add workout tracking and planning`; testes `activity.test.ts` | Parcial | Regra oficial de gasto energético documentada no DECISIONS.md (sem conversão de passos para kcal) | Não aplicável |
| Histórico acessível por fluxo claro (tela de primeiro nível) | Não verificado | Nenhuma evidência visual ou de navegação | Não informado | PRD define histórico como tela principal de primeiro nível | Média |
| Exportação CSV/PDF | Não verificado | Commits mencionam exportação; sem teste ou log confirmando funcionamento | Insuficiente | Campos finais da exportação eram ponto de decisão em aberto | Média |
| Backup versionado e importação segura (inválido não corrompe) | Parcial | Sprint 9 documento lido; `validateBackup.test.ts` nos 23 testes | Parcial | Teste unitário existe; teste manual não evidenciado | Média |
| Reset com confirmação explícita | Parcial | HANDOFF Sprint 9 cita tarefa 9.2; sem evidência de teste ou screenshot | Insuficiente | Sem confirmação de UI | Média |
| Operação offline (dados locais acessíveis sem conexão) | Implementado | `npm run build` com PWA v1.2.0; `dist/sw.js` gerado | Parcial | Rotas offline não testadas em produção (Vercel); evidência limitada a build local | Média |
| Persistência local (dados após recarregar) | Implementado | `rollover.test.ts`, `stateMigration.test.ts` passando | Confirmado | Lógica de persistência com cobertura unitária confirmada | Não aplicável |
| Rollover diário (arquivamento sem apagar histórico) | Implementado | `rollover.test.ts` nos 23 testes unitários | Confirmado | Teste direto da função de rollover | Não aplicável |
| Bioimpedância opcional (não bloqueia outras áreas) | Implementado | PRD + DECISIONS.md; sem conflito identificado | Parcial | Sem teste direto da ausência de bioimpedância em gráficos | Baixa |
| Registro de peso | Implementado | Commits e `domain.test.ts` | Parcial | Sem evidência de UI | Baixa |
| IA não expõe segredo em build público | **Ausente / Violado** | `geminiService.ts` linha 3: `VITE_OPENROUTER_API_KEY` via `import.meta.env` | **Confirmado** | **Falha crítica identificada diretamente no código** | **Crítica** |
| Imagens de IA não persistidas localmente | Não verificado | Sem evidência de teste ou verificação | Não informado | PRD seção 7.4 e regra 12.7 — requisito obrigatório | Alta |
| Snapshot de metas no histórico diário | Implementado | DECISIONS.md 2026-05-30; `planner.test.ts` e `domain.test.ts` | Parcial | Implementação declarada; sem exportação testada com dados reais | Média |
| Avisos de indisponibilidade de IA (offline) | Parcial | CHANGELOG Sprint 9 menciona "modo offline adicionado através da interface" | Insuficiente | Encoding corrompido impede leitura completa; sem evidência visual | Média |

---

## 4. Requisitos aprovados

- **Persistência local e rollover diário** — aprovado.  
  Evidência: `rollover.test.ts` e `stateMigration.test.ts` nos 23 testes unitários com resultado confirmado `Tests 23 passed (23)`.  
  Nível de evidência: Confirmado.

- **Build limpo do PWA** — aprovado.  
  Evidência: Log confirmado `✓ 2979 modules transformed. ✓ built in 6.44s. PWA v1.2.0 files generated dist/sw.js`.  
  Nível de evidência: Confirmado.

- **Lógica de domínio (cálculo de metas, domínio nutricional)** — aprovado.  
  Evidência: `domain.test.ts` e `planner.test.ts` nos 23 testes passando via Vitest.  
  Nível de evidência: Confirmado.

- **Regra de gasto energético (sem conversão indevida de passos para kcal)** — aprovado.  
  Evidência: DECISIONS.md 2026-06-01 documenta decisão formal; alinhado ao PRD seção 7.7.  
  Nível de evidência: Confirmado.

- **Substituição da IA por proxy (camada server-side existe)** — aprovado parcialmente.  
  Evidência: `api/openrouter-proxy.ts` criado; CHANGELOG Sprint 9 confirma migração.  
  Nível de evidência: Parcial. (O proxy existe, mas o fallback com chave no cliente está ativo — ver Achados Críticos.)

---

## 5. Achados críticos

### Chave da API de IA exposta ao bundle do cliente

- **Severidade:** Crítica
- **Status de implementação:** Implementado com defeito de segurança
- **Nível de evidência:** Confirmado
- **Requisito relacionado:** PRD seção 7.4 (regras), seção 12.7, seção 14 (integrações), seção 15.3 (segurança), seção 16 (critério de aceite: "IA em cenário público não expõe segredo no cliente"); DECISIONS.md 2026-05-28
- **Problema:** A função `getApiKey()` em `/src/services/geminiService.ts` linha 3 lê `VITE_OPENROUTER_API_KEY` via `import.meta.env`. Em builds Vite, qualquer variável com prefixo `VITE_` é injetada estaticamente no bundle JavaScript e fica visível no código-fonte público do cliente. O proxy Vercel (`/api/openrouter-proxy.ts`) existe e é usado quando `apiKey` é `undefined`, mas a lógica atual prioriza a chave no cliente se ela existir no `.env`. Isso significa que em qualquer ambiente onde `VITE_OPENROUTER_API_KEY` esteja definida (local com `.env` ou Vercel com variável prefixada em `VITE_`), a chave vai para o bundle público.
- **Evidência:** `/src/services/geminiService.ts` linha 3: `const getApiKey = () => (import.meta as any).env?.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;` — lido diretamente no código-fonte. `vite.config.ts` linha 38 também injeta `OPENROUTER_API_KEY` como string no bundle em modo desenvolvimento.
- **Impacto:** Qualquer deploy público com a variável `VITE_OPENROUTER_API_KEY` configurada expõe a chave da API do OpenRouter a qualquer usuário que abra o DevTools do navegador. Viola o gate de release obrigatório do PRD. Invalida a afirmação de que o produto está pronto para deploy público com IA ativa.
- **Correção mínima recomendada:** Remover `VITE_OPENROUTER_API_KEY` de toda a lógica do cliente. A função `getApiKey()` deve retornar `undefined` sempre, forçando o uso exclusivo do proxy `/api/openrouter-proxy.ts` para qualquer chamada à API. A variável de segredo deve existir apenas como `OPENROUTER_API_KEY` sem prefixo `VITE_` nas variáveis de ambiente da Vercel (lado servidor), nunca no cliente.

---

## 6. Achados importantes

### Ausência de validação visual do fluxo principal (smoke-test manual)

- **Severidade:** Alta
- **Status de implementação:** Não verificado
- **Nível de evidência:** Não informado
- **Requisito relacionado:** Plano de implementação seção 5 (checklist de validação geral — "Fluxo manual: Executar o fluxo principal da sprint e o fluxo central do dia atual — Sim"); PRD seção 16 (critérios gerais de aceite)
- **Problema:** Nenhuma evidência de smoke-test visual, screenshot, gravação de tela, teste E2E ou navegação manual foi documentada. Os 23 testes unitários cobrem funções puras isoladas, mas não validam renderização de componentes, navegação entre telas, estados vazios na UI, comportamento offline no browser ou fluxo de adicionar/remover refeição na interface real.
- **Evidência:** `HANDOFF.md` seção 9: "Executar tarefas manuais de UI/UX visual e navegação nativa do PWA via agente não é possível, requerendo repasse para teste humano". `AUDIT_EVIDENCE.md` seção 8: "Nenhuma evidência visual ou funcional foi informada ou acessível".
- **Impacto:** Bugs visuais, quebras de layout em mobile, estados vazios incorretos, mensagens de erro ilegíveis ou fluxo de registro quebrado podem existir e não ser detectados antes do deploy.
- **Correção mínima recomendada:** Executar smoke-test manual humano cobrindo os fluxos principais: configurar perfil, registrar refeição, registrar água, registrar treino, consultar histórico, exportar dados, fazer backup e testar comportamento offline. Documentar resultado com screenshots em `/docs/audit/`.

### Avisos obrigatórios de IA e privacidade não verificados

- **Severidade:** Alta
- **Status de implementação:** Não verificado
- **Nível de evidência:** Não informado
- **Requisito relacionado:** PRD seção 7.4 (regras de negócio da IA), seção 10 (tela de avisos obrigatória no MVP), seção 20.5 (telas obrigatórias: "Avisos contextuais de IA e privacidade"); DECISIONS.md sobre texto dos avisos
- **Problema:** O PRD exige explicitamente avisos de que a saída da IA é estimativa revisável, não substitui profissional, e que dados ficam locais por padrão. Esse conteúdo deve aparecer em tela, modal ou bloco contextual. Não há evidência de que esses avisos existem na interface, nem de que o texto foi aprovado por humano (ponto de decisão ainda aberto no PRD seção 19 e seção 20.8).
- **Evidência:** PRD seção 20.8: "Texto final dos avisos legais, de privacidade local e de revisão obrigatória" listado como item que "o coder não deve decidir sozinho". Nenhuma evidência em AUDIT_EVIDENCE.md, HANDOFF.md ou CHANGELOG de que esses textos foram aprovados ou implementados.
- **Impacto:** Sem avisos, o usuário pode interpretar sugestões de IA como prescrição profissional. Risco legal e de produto documentado no PRD seção 17.
- **Correção mínima recomendada:** O responsável pelo produto deve aprovar o texto final dos avisos. Após aprovação, implementar o conteúdo nos locais exigidos pelo PRD antes de qualquer release público.

### Imagens usadas em IA potencialmente persistidas

- **Severidade:** Alta
- **Status de implementação:** Não verificado
- **Nível de evidência:** Não informado
- **Requisito relacionado:** PRD seção 7.4 (regras): "Imagens enviadas para IA não devem ser persistidas localmente por padrão"; PRD seção 12.7 (regra de negócio obrigatória); PRD seção 16 (critério de aceite: "Imagens de IA não ficam salvas localmente")
- **Problema:** O serviço de IA em `geminiService.ts` converte imagens para `base64` e envia para a API, mas não há evidência de verificação de que a imagem não fica salva no estado local após a análise. Esta é uma regra de negócio obrigatória do PRD.
- **Evidência:** `geminiService.ts` linha 82: imagem é passada como `data:${mimeType};base64,${base64Image}` na chamada da API. Não há verificação do estado local após o uso. Nenhuma evidência de teste ou verificação desse comportamento.
- **Impacto:** Violação de privacidade do usuário. Dado pessoal (imagem de refeição ou de corpo) pode persistir localmente sem intenção do usuário.
- **Correção mínima recomendada:** Verificar nos componentes que usam `analyzeImage` e `analyzeGymEquipment` se o `base64` da imagem é descartado após o retorno da IA, sem ser armazenado no estado persistido. Adicionar teste ou verificação documentada desse comportamento.

---

## 7. Achados médios e menores

| Achado | Severidade | Nível de evidência | Impacto | Correção recomendada |
|---|---|---|---|---|
| Histórico não verificado como tela de primeiro nível na navegação | Média | Não informado | Usuário pode não encontrar histórico facilmente; risco de UX ruim em primeiro uso | Verificar durante smoke-test se histórico é acessível diretamente na navegação principal |
| Exportação CSV/PDF sem evidência de funcionamento | Média | Insuficiente | Funcionalidade pode existir, mas estar quebrada ou com formato incorreto | Executar exportação manual e verificar conteúdo do arquivo gerado |
| Reset sem evidência de confirmação forte na UI | Média | Insuficiente | Usuário pode perder dados acidentalmente | Verificar no smoke-test se o dialog de confirmação está presente e deliberado |
| Campos finais e layout de exportação não decididos | Média | Não informado | Ponto de decisão do PRD (seção 19) ainda aberto pode gerar entrega inconsistente | Responsável pelo produto deve fechar os campos antes do próximo ciclo |
| Tipos de refeição padrão do plano alimentar não definidos formalmente | Média | Não informado | Ponto de decisão do PRD (seção 19) ainda aberto; `cafe`, `almoco`, `lanche`, `jantar` visíveis no código, mas não aprovados formalmente | Registrar decisão em DECISIONS.md |
| CHANGELOG.md com encoding corrompido (Sprints 3 a 8) | Média | Confirmado | Dificulta auditoria de mudanças entre as Sprints 3 e 8 | Recriar entradas com encoding correto ou fazer dump textual das sprints afetadas |
| `planner.test.ts` não foi identificado no último arquivo de testes | Baixa | Parcial | Possível divergência na nomenclatura de arquivos entre HANDOFF e AUDIT_EVIDENCE | Confirmar nome real dos arquivos de teste durante smoke-test |
| Warning de chunk size no build (registrado no CHANGELOG) | Baixa | Confirmado | Bundle grande pode degradar tempo de carregamento em mobile; não bloqueante no MVP | Considerar lazy loading ou code splitting em ciclo futuro |
| `out-of-scope-changes.md` inexistente | Baixa | Confirmado | Mudanças fora de escopo não rastreadas formalmente | Criar o arquivo e registrar mudança de Gemini para OpenRouter |

---

## 8. Funcionalidades fora de escopo

| Funcionalidade fora de escopo | Tipo | Risco | Recomendação | Observação |
|---|---|---|---|---|
| Migração da IA do Gemini (SDK Google) para OpenRouter (`xiaomi/mimo-v2.5`) | Útil, mas não documentada no PRD | Médio: modelo terceiro sem validação de qualidade documentada para este produto; integração com modelo não previsto no PRD original | Manter e documentar formalmente em `/docs/evolution/DECISIONS.md` e `/docs/evolution/out-of-scope-changes.md` | DECISIONS.md tem a decisão, mas sem registro no `out-of-scope-changes.md` (arquivo não existe) |
| Análise de equipamento de academia por imagem (`analyzeGymEquipment`) | Útil, mas não documentada como requisito do MVP | Baixo | Manter e documentar; verificar se os avisos de IA se aplicam também a esse fluxo | Função existe em `geminiService.ts` linhas 97–123; não consta no PRD como requisito |
| Sugestão de receitas via IA (`suggestRecipes`) | Útil, mas não documentada como MVP | Baixo | Funcionalidade secundária listada no PRD como explicitamente fora do MVP (seção 8) | PRD seção 8 lista receitas como fora do MVP; função está ativa no serviço |

---

## 9. Riscos técnicos restantes

| Risco | Área | Severidade | Nível de evidência | Mitigação recomendada |
|---|---|---|---|---|
| Chave da API exposta ao bundle via `VITE_OPENROUTER_API_KEY` | Segurança | Crítica | Confirmado | Remover variável prefixada `VITE_` do cliente; usar exclusivamente o proxy Vercel |
| Encoding corrompido no CHANGELOG (UTF-16 misturado com ANSI) | Manutenibilidade | Média | Confirmado | Converter arquivo para UTF-8 puro; revisar processo de escrita dos agentes |
| `geminiService.ts` mantém nome do Gemini mas opera com OpenRouter | Manutenibilidade | Baixa | Confirmado | Manter como decisão documentada; adicionar comentário no topo do arquivo explicando a nomeação |
| Ausência de testes de integração e E2E | Qualidade | Alta | Confirmado | Criar testes E2E mínimos com Playwright para os fluxos principais antes de release público |
| Service worker e cache de rotas offline não testados em produção | Confiabilidade | Média | Insuficiente | Validar comportamento offline após deploy na Vercel com teste manual documentado |
| Variáveis de ambiente da Vercel não atualizadas (citado no CHANGELOG Sprint 9) | Deploy | Alta | Confirmado | Atualizar variáveis no dashboard da Vercel antes do próximo deploy; remover `VITE_OPENROUTER_API_KEY` de qualquer variável de ambiente Vercel do lado cliente |
| Parsing de resposta da IA sem schema de validação robusto | Confiabilidade | Média | Parcial | Respostas da IA são tratadas com `JSON.parse` simples e `try/catch` genérico; considerar validação de schema (Zod ou similar) para garantir integridade dos dados antes de salvar |

---

## 10. Riscos de produto

| Risco de produto | Severidade | Evidência | Correção recomendada |
|---|---|---|---|
| Fluxo de revisão obrigatória da IA pode não estar implementado nos componentes de UI | Alta | `geminiService.ts` retorna dados, mas não há evidência de que os componentes exigem confirmação antes de salvar | Verificar no smoke-test se todos os fluxos de IA (análise de refeição, geração de dieta, geração de treino) exigem confirmação explícita antes do salvamento |
| Texto dos avisos de IA e privacidade ainda não aprovado | Alta | PRD seção 19 e 20.8 listam como ponto de decisão aberto | Decisão humana obrigatória antes do release |
| Histórico pode estar inacessível ou pouco visível na navegação | Média | Não verificado | Verificar durante smoke-test |
| Estados vazios das telas principais podem não estar implementados | Média | PRD exige estado vazio em todas as 6 telas principais; sem evidência de verificação | Verificar durante smoke-test |
| Modelo `xiaomi/mimo-v2.5` não validado para qualidade nutricional | Média | Mudança de modelo não evidenciada com testes de qualidade de resposta | Validar respostas do modelo para os tipos de prompt usados no produto antes do release público |

---

## 11. Segurança

| Problema de segurança | Status | Severidade | Evidência | Correção recomendada |
|---|---|---|---|---|
| Chave de API (`VITE_OPENROUTER_API_KEY`) exposta ao bundle do cliente | Confirmado | Crítica | `geminiService.ts` linha 3; `vite.config.ts` linha 38 | Remover variável `VITE_` do cliente; usar exclusivamente proxy Vercel sem fallback no cliente |
| Importação de backup inválido — validação não confirmada na UI | Não verificado | Alta | `validateBackup.test.ts` existe, mas teste manual não documentado | Executar teste manual com arquivo inválido e documentar resultado |
| Reset de dados sem confirmação forte confirmada na UI | Não verificado | Média | Tarefa 9.2 da Sprint 9 documentada; sem evidência de UI | Verificar no smoke-test |
| Imagens de IA sem verificação de não-persistência | Não verificado | Alta | PRD requisito explícito; sem evidência de verificação | Auditar componentes que usam `analyzeImage` para garantir que a imagem não vai para o estado persistido |
| Dados sensíveis em dispositivo compartilhado | Risco documentado no PRD | Média | PRD seção 17 | Aviso de privacidade local obrigatório (ainda não verificado) |

---

## 12. Performance

| Risco de performance | Severidade | Evidência | Correção recomendada |
|---|---|---|---|
| Bundle grande (warning de chunk size) | Baixa | Registrado no CHANGELOG desde Sprint 00B | Implementar code splitting/lazy loading em ciclo futuro; não bloqueante para MVP |
| Carregamento inicial do PWA em mobile não testado | Média | Sem evidência de Lighthouse ou teste de performance | Executar Lighthouse audit após deploy na Vercel |
| Chamadas à IA sem timeout explícito | Baixa | `geminiService.ts` usa `fetch` sem `AbortController` | Adicionar timeout para evitar UI congelada em caso de lentidão da API |

---

## 13. Lacunas de teste

| Área | Teste necessário | Status | Prioridade |
|---|---|---|---|
| Fluxo de revisão obrigatória da IA (componentes de UI) | Verificação de que IA não salva sem confirmação explícita | Ausente | Crítica |
| Não-persistência de imagens após análise por IA | Verificação de estado local após `analyzeImage` | Ausente | Crítica |
| Importação de backup inválido (teste manual documentado) | Arquivo corrompido, versão inválida, JSON malformado | Parcial (unitário existe, manual não) | Alta |
| Reset com confirmação — comportamento na UI | Verificação de dialog/confirmação antes da ação destrutiva | Ausente | Alta |
| Fluxo principal (refeição → dashboard atualizado) | Smoke-test manual ou E2E do fluxo de registro | Ausente | Alta |
| Histórico acessível (navegação) | Verificação de acesso direto ao histórico na navegação principal | Ausente | Alta |
| Exportação CSV/PDF com dados reais | Geração e verificação do conteúdo do arquivo | Ausente | Alta |
| Comportamento offline (service worker em browser real) | Desconectar e verificar acesso aos dados locais | Ausente | Alta |
| Avisos de IA na interface | Verificação de exibição dos avisos contextuais | Ausente | Alta |
| Responsividade em mobile (layout) | Verificação em largura mínima de smartphone | Ausente | Média |
| Estados vazios das telas principais | Verificação de mensagens e CTAs em estado sem dados | Ausente | Média |
| Testes unitários de componentes de UI | Renderização correta dos componentes principais | Ausente | Média |
| Testes de regressão pós-migração para OpenRouter | Qualidade e formato das respostas do modelo `xiaomi/mimo-v2.5` | Ausente | Média |

---

## 14. Pendências documentais

| Documento | Atualizar? | Motivo |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Não (aguardar próxima ação) | Estado atual reflete corretamente o término da Sprint 10; atualizar após smoke-test e deploy |
| `/docs/evolution/CHANGELOG.md` | Sim | Encoding corrompido nas Sprints 3–8; Sprint 9 registrada, mas com encoding quebrado em partes |
| `/docs/evolution/DECISIONS.md` | Sim | Adicionar decisão sobre tipos de refeição padrão e campos de exportação, quando aprovados |
| `/docs/evolution/out-of-scope-changes.md` | Sim (criar) | Arquivo não existe; mudança de Gemini para OpenRouter e presença de `analyzeGymEquipment` e `suggestRecipes` devem ser registradas |
| `/docs/audit/AUDIT_EVIDENCE.md` | Sim | Atualizar após smoke-test com evidências visuais e resultado do teste de importação/reset |

---

## 15. Plano mínimo de correção

| Prioridade | Correção | Severidade relacionada | Resultado esperado |
|---|---|---|---|
| 1 | Remover `VITE_OPENROUTER_API_KEY` do cliente; garantir que `getApiKey()` retorne sempre `undefined` no browser e que toda chamada use exclusivamente o proxy Vercel | Crítica | Chave não exposível em build público; gate de segurança do PRD atendido |
| 2 | Executar smoke-test manual humano dos fluxos principais (perfil, refeição, água, treino, histórico, exportação, backup/importação, reset, offline) com documentação de resultado | Alta | Verificação do fluxo principal; identificação de bugs visuais antes do deploy |
| 3 | Obter aprovação humana do texto dos avisos de IA e privacidade; implementar no produto | Alta | Requisito obrigatório do PRD atendido; risco legal mitigado |
| 4 | Verificar não-persistência de imagens após análise de IA nos componentes de UI | Alta | Conformidade com regra de negócio obrigatória do PRD |
| 5 | Atualizar variáveis de ambiente na Vercel (remover `VITE_OPENROUTER_API_KEY`; garantir `OPENROUTER_API_KEY` apenas no servidor) | Alta | Deploy seguro sem exposição de chave |
| 6 | Criar `/docs/evolution/out-of-scope-changes.md` registrando migração Gemini→OpenRouter e funcionalidades extras | Baixa | Rastreabilidade documental completa |
| 7 | Corrigir encoding do `CHANGELOG.md` (Sprints 3–8) | Média | Auditoria futura e continuidade sem perda de histórico |

---

## 16. Checklist antes do próximo deploy

- [ ] Variável `VITE_OPENROUTER_API_KEY` removida de todo o código do cliente e do ambiente Vercel como variável client-side
- [ ] `getApiKey()` em `geminiService.ts` alterada para não ler variáveis `VITE_*`
- [ ] Proxy Vercel (`/api/openrouter-proxy.ts`) configurado com `OPENROUTER_API_KEY` exclusivamente no lado servidor
- [ ] Smoke-test manual do fluxo principal executado e resultado documentado com evidências (screenshots ou texto)
- [ ] Teste manual de importação de backup inválido executado sem corrupção de dados
- [ ] Teste manual de reset com confirmação explícita executado
- [ ] Comportamento offline verificado no browser após deploy (service worker ativado, dados locais acessíveis)
- [ ] Texto dos avisos de IA e privacidade aprovado por humano responsável
- [ ] Avisos de IA implementados e visíveis nos fluxos de IA do produto
- [ ] Comportamento de não-persistência de imagens verificado nos componentes que usam `analyzeImage`
- [ ] Histórico verificado como acessível por navegação principal (tela de primeiro nível)
- [ ] Variáveis de ambiente atualizadas no dashboard da Vercel antes do deploy

---

## 17. Veredito final

O NutriTrack pós-Sprint 10 apresenta base técnica sólida para um MVP local-first: testes unitários passando, build limpo, lógica de domínio coberta e arquitetura preparada para evolução. No entanto, dois impedimentos claros bloqueam o deploy público:

1. A chave da API de IA está acessível ao bundle do cliente via `VITE_OPENROUTER_API_KEY`, em violação direta ao gate de segurança obrigatório do PRD. Isso não é uma hipótese — é um achado confirmado por leitura direta do código-fonte.
2. O fluxo principal do produto não foi validado visualmente por nenhum agente humano ou automatizado. Bugs de UI, layout e comportamento offline não podem ser descartados sem essa validação.

Para deploy público com IA ativa, o projeto não está aprovado. Para uso interno/privado em dispositivo próprio sem IA ativa, a base funcional existe.

**Veredito final: Aprovado apenas para teste interno**
