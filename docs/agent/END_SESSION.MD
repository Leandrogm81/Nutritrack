# Prompt — Preparação para Troca de Sessão no Hermes Agent

Prepare este projeto para troca de sessão no Hermes Agent.

## Regras operacionais de continuidade

Antes de executar esta tarefa, siga obrigatoriamente as regras operacionais definidas em:

`/docs/agent/agent-operating-rules.md`

A saída deve priorizar continuidade entre sessões, agentes ou modelos.

O resultado deve permitir que outro agente continue o trabalho sem precisar reler toda a conversa original.

Sempre que aplicável, use ou atualize:

- `/docs/agent/HANDOFF.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/agent/next-actions.md`

Não inclua pensamento interno desnecessário.

Registre apenas informações úteis, verificáveis e operacionais.

---

# Objetivo

Preparar o projeto para troca de sessão, `/new`, `/compress`, troca de modelo ou continuidade por outro agente.

A tarefa é atualizar os arquivos de continuidade do projeto sem recomeçar do zero, sem inventar informações e sem transformar plano, hipótese ou sugestão em fato concluído.

---

# Arquivos obrigatórios a atualizar

Atualize obrigatoriamente:

```text
/docs/agent/HANDOFF.md
/docs/agent/CURRENT_STATE.md
```

Atualize somente se houver motivo real:

```text
/docs/evolution/DECISIONS.md
/docs/evolution/CHANGELOG.md
/docs/agent/next-actions.md
```

---

# Padronização de caminhos

Use os caminhos oficiais abaixo:

```text
/docs/agent/HANDOFF.md
/docs/agent/CURRENT_STATE.md
/docs/evolution/DECISIONS.md
/docs/evolution/CHANGELOG.md
/docs/agent/next-actions.md
```

Não use os caminhos antigos:

```text
docs/agent/DECISIONS.md
docs/agent/CHANGELOG.md
```

Se encontrar arquivos antigos nesses caminhos, não apague automaticamente.

Apenas registre que há divergência de localização e recomende padronização futura, se necessário.

---

# Quando atualizar cada arquivo

## `/docs/agent/HANDOFF.md`

Atualize sempre nesta tarefa.

Deve conter:

- objetivo atual do projeto;
- estado geral;
- o que já foi feito;
- decisões tomadas;
- arquivos importantes;
- problemas encontrados;
- tentativas realizadas;
- o que funcionou;
- o que não funcionou;
- pendências;
- riscos;
- próxima ação recomendada;
- o que o próximo agente NÃO deve fazer.

---

## `/docs/agent/CURRENT_STATE.md`

Atualize sempre nesta tarefa.

Deve conter no máximo 40 linhas.

Deve ser objetivo, curto e operacional.

Deve responder:

- em que ponto o projeto está agora;
- qual foi a última ação relevante;
- qual é o próximo passo seguro;
- quais bloqueios existem;
- quais arquivos são relevantes;
- se é seguro rodar `/new`.

---

## `/docs/evolution/DECISIONS.md`

Atualize somente se houver decisão nova.

Registre apenas decisões reais.

Não registre:

- sugestão;
- hipótese;
- plano;
- opinião;
- ideia futura;
- intenção ainda não confirmada.

Uma decisão válida deve ter:

- contexto;
- decisão tomada;
- motivo;
- impacto;
- data;
- fonte ou evidência.

---

## `/docs/evolution/CHANGELOG.md`

Atualize somente se houve mudança real no projeto.

Registre apenas alterações implementadas ou arquivos realmente modificados.

Não registre:

- plano;
- intenção;
- tarefa futura;
- promessa de correção;
- hipótese de implementação;
- mudança sem evidência.

Uma entrada válida deve ter:

- data;
- resumo da mudança;
- arquivos afetados;
- motivo;
- evidência;
- pendências, se houver.

---

## `/docs/agent/next-actions.md`

Atualize se houver sequência clara de próximas ações.

Use este arquivo para listar ações recomendadas que o próximo agente deve executar.

Não misture com changelog.

Não registre como concluído.

---

# Regras obrigatórias

- Não invente nada.
- Não recomece do zero.
- Não omita problemas.
- Não esconda tentativas falhas.
- Não transforme hipótese em fato.
- Não registre sugestão como decisão.
- Não registre plano como mudança concluída.
- Não copie logs completos.
- Não apague histórico útil.
- Não remova decisões anteriores.
- Não altere escopo.
- Não corrija código nesta tarefa.
- Não implemente nada nesta tarefa.
- Não registre como testado algo que não foi testado.
- Não registre como implementado algo sem evidência.
- Mantenha `/docs/agent/CURRENT_STATE.md` com no máximo 40 linhas.
- Preserve decisões já tomadas.
- Registre claramente a próxima ação recomendada.
- Registre claramente o que o próximo agente NÃO deve fazer.
- Separe observado, inferido e desconhecido.
- Se alguma informação não puder ser confirmada, marque como `Não verificado`.

---

# Fontes a consultar

Antes de atualizar os arquivos, consulte o que existir:

```text
/docs/agent/agent-operating-rules.md
/docs/agent/HANDOFF.md
/docs/agent/CURRENT_STATE.md
/docs/agent/next-actions.md
/docs/evolution/DECISIONS.md
/docs/evolution/CHANGELOG.md
/docs/evolution/out-of-scope-changes.md
/docs/product/PRD.md
/docs/product/PRD_v1.1.md
/docs/implementation/PLANO_IMPLEMENTACAO.md
/docs/implementation/sprint-breakdown.md
/docs/audit/final-audit.md
/docs/audit/audit-fixes.md
/docs/audit/validation-report.md
/docs/audit/AUDIT_EVIDENCE.md
```

Se algum arquivo não existir, registre apenas quando isso impactar a continuidade.

Não crie dependência desnecessária de arquivos ausentes.

---

# Estrutura obrigatória de `/docs/agent/HANDOFF.md`

Atualize ou crie este arquivo com a estrutura abaixo:

```markdown
# Handoff — Continuidade de Sessão

## 1. Objetivo atual

[Descreva o objetivo atual do projeto ou da etapa.]

## 2. Estado geral do projeto

[Descreva o estado atual com base em evidências.]

## 3. O que já foi feito

- [item feito com evidência ou contexto]

## 4. Decisões tomadas

- [decisão real já tomada]

Se não houver decisão nova, escreva:

`Nenhuma decisão nova registrada nesta preparação de handoff.`

## 5. Arquivos importantes

| Arquivo | Função | Observação |
|---|---|---|
| `[arquivo]` | [função] | [observação] |

## 6. Problemas encontrados

- [problema conhecido]

Se não houver problema conhecido, escreva:

`Nenhum problema conhecido registrado.`

## 7. Tentativas realizadas

| Tentativa | Resultado | Observação |
|---|---|---|
| [tentativa] | Funcionou/Falhou/Parcial/Não verificado | [observação] |

## 8. O que funcionou

- [item]

## 9. O que não funcionou

- [item]

## 10. Pendências

| Pendência | Impacto | Prioridade |
|---|---|---|
| [pendência] | [impacto] | Alta/Média/Baixa |

## 11. Riscos

| Risco | Área | Severidade | Observação |
|---|---|---|---|
| [risco] | Produto/Engenharia/UI/UX/Auditoria/Deploy/Outro | Alta/Média/Baixa | [observação] |

## 12. Próxima ação recomendada

[Descreva a próxima ação mais segura.]

## 13. O que o próximo agente NÃO deve fazer

- [limite]
- [limite]
- [limite]

## 14. Segurança para troca de sessão

- Seguro rodar `/new`? Sim/Não/Com ressalvas
- Motivo:
- Nome sugerido para a nova sessão:
```

---

# Estrutura obrigatória de `/docs/agent/CURRENT_STATE.md`

Atualize ou crie este arquivo com no máximo 40 linhas.

Use a estrutura abaixo:

```markdown
# Current State

## Estado atual

[Resumo curto do estado real do projeto.]

## Última ação relevante

[Última ação concluída ou analisada.]

## Arquivos relevantes

- `[arquivo]`
- `[arquivo]`

## Pendências imediatas

- [pendência]

## Riscos atuais

- [risco]

## Próxima ação recomendada

[ação]

## Não fazer agora

- [limite]

## Seguro rodar `/new`?

Sim/Não/Com ressalvas — [motivo]
```

---

# Estrutura de entrada para `/docs/evolution/DECISIONS.md`, se houver decisão nova

Se houver decisão nova, adicione entrada no formato:

```markdown
## YYYY-MM-DD — [Título da decisão]

### Contexto

[Explique o contexto.]

### Decisão

[Explique a decisão real.]

### Motivo

[Explique por que foi decidido.]

### Impacto

[Explique o que muda.]

### Riscos

[Liste riscos.]

### Fonte

[Arquivo, conversa, auditoria ou evidência.]
```

Se não houver decisão nova, não atualize o arquivo apenas para dizer que não houve decisão.

---

# Estrutura de entrada para `/docs/evolution/CHANGELOG.md`, se houve mudança real

Se houve mudança real, adicione entrada no formato:

```markdown
## YYYY-MM-DD — [Título da mudança]

### Resumo

[Descrição curta da mudança real.]

### Arquivos afetados

- `[arquivo]`

### Motivo

[Por que a mudança foi feita.]

### Evidência

[Como se sabe que a mudança ocorreu.]

### Pendências

[Se houver.]
```

Se não houve mudança real, não atualize o changelog.

---

# Critério para responder se é seguro rodar `/new`

Classifique como:

## Sim

Use quando:

- o handoff foi atualizado;
- o estado atual está claro;
- a próxima ação está registrada;
- não há informação crítica apenas na conversa atual;
- os arquivos de continuidade existem ou foram atualizados.

## Com ressalvas

Use quando:

- há pendências ou incertezas;
- algum arquivo importante não foi encontrado;
- parte do contexto depende da conversa atual;
- há risco de o próximo agente precisar confirmar algo.

## Não

Use quando:

- não foi possível atualizar handoff;
- não foi possível registrar estado atual;
- há decisão crítica não documentada;
- há risco alto de perda de contexto;
- a próxima ação não está clara.

---

# Formato obrigatório da resposta final

Depois de atualizar os arquivos, responda apenas:

```markdown
## 1. Arquivos atualizados

- `/docs/agent/HANDOFF.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/DECISIONS.md` — atualizado/não atualizado, com motivo
- `/docs/evolution/CHANGELOG.md` — atualizado/não atualizado, com motivo
- `/docs/agent/next-actions.md` — atualizado/não atualizado, com motivo

## 2. Próxima ação recomendada

[ação recomendada]

## 3. É seguro rodar `/new`?

Sim/Não/Com ressalvas — [motivo]

## 4. Nome sugerido para a nova sessão

[nome curto e descritivo]
```

---

# Instrução final

Atualize os arquivos de continuidade necessários.

Não implemente nada.

Não corrija código.

Não altere escopo.

Não invente informações.

Não registre hipótese como fato.

Não registre plano como mudança concluída.

Não registre sugestão como decisão.

Não omita problemas conhecidos.

Não esconda tentativas falhas.

Não copie logs completos.

Mantenha `/docs/agent/CURRENT_STATE.md` com no máximo 40 linhas.

A resposta final deve conter apenas os quatro itens solicitados no formato obrigatório.


