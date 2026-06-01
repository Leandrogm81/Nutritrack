# Mudanças Fora de Escopo — NutriTrack

Registro de funcionalidades implementadas que não constavam explicitamente no PRD original.

---

## 2026-06-01 — Migração da IA: Gemini SDK Google → OpenRouter (`xiaomi/mimo-v2.5`)

**Tipo:** Mudança de integração externa  
**Impacto:** Médio — modelo terceiro sem validação de qualidade documentada para este produto  
**Arquivo afetado:** `src/services/geminiService.ts`, `api/openrouter-proxy.ts`  
**Decisão registrada em:** `/docs/evolution/DECISIONS.md` (2026-06-01)  
**Status:** Mantida — proxy Vercel criado para garantir segurança do segredo  
**Observação:** O nome do arquivo (`geminiService.ts`) mantém referência ao Gemini por convenção; a integração real é com OpenRouter. Nomeação pode ser corrigida em ciclo futuro.

---

## 2026-06-01 — Análise de equipamento de academia por imagem (`analyzeGymEquipment`)

**Tipo:** Funcionalidade extra não documentada como requisito do MVP  
**Impacto:** Baixo — funcionalidade auxiliar no fluxo de treino  
**Arquivo afetado:** `src/services/geminiService.ts` (linhas 97–123), `src/components/WorkoutTracker.tsx`  
**Status:** Mantida — avisos de IA devem se aplicar também a este fluxo quando implementados  
**PRD:** Não menciona como requisito; não conflita com regras de negócio existentes

---

## 2026-06-01 — Sugestão de receitas via IA (`suggestRecipes`)

**Tipo:** Funcionalidade explicitamente listada como fora do MVP no PRD  
**Impacto:** Baixo — função existe no serviço, mas pode não estar exposta na UI principal  
**Arquivo afetado:** `src/services/geminiService.ts` (linhas 190–221)  
**Status:** Mantida no código, mas não promovida — PRD seção 8 lista receitas como fora do MVP  
**Observação:** Verificar se a UI expõe este fluxo. Remover ou ocultar se necessário em ciclo futuro.
