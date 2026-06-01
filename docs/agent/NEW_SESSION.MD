# Prompt — Assumir Nova Sessão com Contexto de Continuidade

Você está assumindo uma nova sessão com base nos arquivos de continuidade do projeto.

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

Assumir uma nova sessão de trabalho sem recomeçar do zero.

Sua tarefa é ler os arquivos de continuidade disponíveis, entender exatamente onde o projeto parou, identificar a próxima ação segura e preparar um plano curto antes de qualquer alteração.

Este prompt deve ser usado quando:

- uma nova sessão foi aberta;
- o contexto anterior foi encerrado;
- houve troca de modelo;
- houve troca de agente;
- houve uso de `/new`;
- houve uso de `/compress`;
- o projeto precisa continuar com base em arquivos persistentes.

---

# Arquivos obrigatórios de leitura

Leia primeiro, se existirem:

```text
/docs/agent/agent-operating-rules.md
/docs/agent/HANDOFF.md
/docs/agent/CURRENT_STATE.md
/docs/evolution/DECISIONS.md
```

Se existirem, consulte também:

```text
/docs/evolution/CHANGELOG.md
/docs/evolution/out-of-scope-changes.md
/docs/agent/next-actions.md
/docs/product/PRD.md
/docs/product/PRD_v1.1.md
/docs/implementation/PLANO_IMPLEMENTACAO.md
/docs/audit/final-audit.md
/docs/audit/audit-fixes.md
/docs/audit/validation-report.md
/docs/audit/AUDIT_EVIDENCE.md
/docs/design/UI_UX_GUIDE.md
```

Se o projeto usar outro caminho, leia o arquivo indicado abaixo:

```text
[COLE AQUI O CAMINHO OU USE @ARQUIVO]
```

Exemplos:

```text
docs/handoff/CONTEXTO_TRANSFERENCIA_ATUAL.md
```

ou:

```text
@docs/handoff/CONTEXTO_TRANSFERENCIA_ATUAL.md
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

# Prioridade de leitura

Use esta prioridade:

1. `/docs/agent/CURRENT_STATE.md` para o estado imediato.
2. `/docs/evolution/DECISIONS.md` para decisões permanentes.
3. `/docs/agent/HANDOFF.md` para continuidade geral.
4. `/docs/evolution/CHANGELOG.md` para mudanças realmente implementadas.
5. `/docs/agent/next-actions.md` para próximas ações recomendadas.
6. PRD, plano, auditorias e evidências apenas quando forem necessários para confirmar contexto, escopo ou próxima ação.

---

# Regra sobre leitura de arquivos

Se os documentos forem fornecidos por caminho, referência ou `@arquivo`, leia os arquivos antes de responder.

Se você não conseguir acessar algum arquivo, informe claramente:

- qual arquivo não foi acessado;
- qual impacto isso causa na continuidade;
- quais partes ficarão como `não verificadas`.

Não presuma o conteúdo de arquivos que não foram lidos.

Não use memória vaga da conversa como substituto dos arquivos oficiais quando os arquivos existirem.

Se o arquivo apontar outros arquivos relevantes, leia-os também quando forem necessários para entender o estado atual.

Se houver conflito entre arquivos, informe o conflito antes de agir.

---

# Tarefa inicial obrigatória

Depois de ler os arquivos disponíveis, faça o seguinte:

1. Resuma em poucas linhas onde o trabalho parou.
2. Identifique a próxima ação recomendada.
3. Liste restrições importantes.
4. Liste decisões já tomadas que devem ser respeitadas.
5. Liste o que NÃO deve ser feito.
6. Liste arquivos que precisam ser lidos antes de agir.
7. Separe claramente:
   - fatos confirmados;
   - hipóteses;
   - dúvidas abertas;
   - riscos.
8. Antes de executar qualquer alteração, explique um plano curto de continuidade.

---

# Regras obrigatórias

- Não recomece do zero.
- Não invente informações ausentes.
- Não ignore decisões já tomadas.
- Não repita tentativas que já falharam.
- Não altere escopo.
- Não transforme hipóteses em fatos.
- Não trate sugestões como decisões aprovadas.
- Não trate plano como mudança concluída.
- Não registre implementação sem evidência.
- Não copie logs completos.
- Não omita problemas conhecidos.
- Não esconda tentativas falhas.
- Não faça alterações antes de entender o estado atual.
- Não corrija código antes de confirmar a próxima ação.
- Não execute tarefas fora da próxima ação recomendada.
- Se houver dúvida relevante, registre antes de agir.
- Se houver conflito entre arquivos, pare e explique o conflito.
- Se a próxima ação exigir confirmação humana, indique isso claramente.

---

# Separação obrigatória entre fato, hipótese, dúvida e risco

Ao assumir a nova sessão, organize o entendimento assim:

## Fatos confirmados

Liste apenas o que foi confirmado diretamente nos arquivos lidos.

## Hipóteses

Liste interpretações prováveis, mas ainda não confirmadas.

## Dúvidas abertas

Liste pontos que precisam de confirmação.

## Riscos

Liste riscos técnicos, de produto, escopo, auditoria, UI/UX, deploy ou continuidade.

---

# Plano curto antes de agir

Antes de executar qualquer alteração, entregue um plano curto contendo:

1. Próxima ação recomendada.
2. Arquivos que precisam ser lidos ou confirmados.
3. Arquivos que provavelmente serão alterados.
4. Riscos.
5. Validações necessárias.
6. Limites do que não será feito.

Se a próxima ação envolver implementação, correção ou alteração de arquivos, siga também as regras específicas de execução do projeto e o arquivo:

```text
/docs/agent/agent-operating-rules.md
```

---

# Atualização dos arquivos de continuidade ao final

Ao final da execução da tarefa desta nova sessão, atualize os arquivos de continuidade conforme necessário.

Atualize obrigatoriamente, se houve avanço real de contexto:

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

## Quando atualizar cada arquivo

### `/docs/agent/HANDOFF.md`

Atualize quando houver:

- avanço relevante;
- conclusão de etapa;
- novo problema;
- nova limitação;
- troca de direção;
- necessidade de nova sessão futura.

### `/docs/agent/CURRENT_STATE.md`

Atualize sempre que o estado imediato mudar.

Mantenha com no máximo 40 linhas.

### `/docs/evolution/DECISIONS.md`

Atualize apenas se houver decisão nova real.

Não registre sugestão, hipótese ou plano como decisão.

### `/docs/evolution/CHANGELOG.md`

Atualize apenas se houve mudança real no projeto.

Não registre plano, intenção ou promessa de correção como mudança concluída.

### `/docs/agent/next-actions.md`

Atualize se houver sequência clara de próximas ações.

---

# Estrutura da resposta inicial obrigatória

A primeira resposta após ler os arquivos deve seguir este formato:

```markdown
# Continuidade da Nova Sessão

## 1. Onde o trabalho parou

[resumo curto]

## 2. Próxima ação recomendada

[ação]

## 3. Restrições importantes

- [restrição]

## 4. Decisões já tomadas que devem ser respeitadas

- [decisão]

## 5. O que NÃO deve ser feito

- [limite]

## 6. Arquivos que precisam ser lidos antes de agir

- `[arquivo]`

## 7. Fatos confirmados

- [fato]

## 8. Hipóteses

- [hipótese]

## 9. Dúvidas abertas

- [dúvida]

## 10. Riscos

- [risco]

## 11. Plano curto de continuidade

1. [passo]
2. [passo]
3. [passo]

## 12. Segurança para continuar

- É seguro continuar? Sim/Não/Com ressalvas
- Motivo:
```

---

# Formato da resposta final após concluir a ação da sessão

Ao final da execução da ação principal da sessão, responda com:

```markdown
# Encerramento da Sessão

## 1. Arquivos atualizados

- `/docs/agent/HANDOFF.md` — atualizado/não atualizado, com motivo
- `/docs/agent/CURRENT_STATE.md` — atualizado/não atualizado, com motivo
- `/docs/evolution/DECISIONS.md` — atualizado/não atualizado, com motivo
- `/docs/evolution/CHANGELOG.md` — atualizado/não atualizado, com motivo
- `/docs/agent/next-actions.md` — atualizado/não atualizado, com motivo

## 2. O que foi feito nesta sessão

[resumo]

## 3. Próxima ação recomendada

[ação]

## 4. O que o próximo agente NÃO deve fazer

- [limite]

## 5. É seguro rodar `/new`?

Sim/Não/Com ressalvas — [motivo]

## 6. Nome sugerido para a próxima sessão

[nome curto e descritivo]
```

---

# Arquivo de contexto principal

Use como arquivo de contexto principal, se informado:

```text
[CAMINHO_DO_ARQUIVO]
```

Se esse campo estiver vazio, use primeiro:

```text
/docs/agent/CURRENT_STATE.md
```

e depois:

```text
/docs/agent/HANDOFF.md
```

---

# Instrução final

Assuma a nova sessão com base nos arquivos de continuidade.

Não recomece do zero.

Não invente informações ausentes.

Não ignore decisões já tomadas.

Não repita tentativas falhas.

Não altere escopo.

Não transforme hipótese em fato.

Não trate sugestão como decisão aprovada.

Se não conseguir acessar algum arquivo, informe claramente.

Se houver conflito entre arquivos, informe o conflito antes de agir.

Antes de executar qualquer alteração, entregue o plano curto de continuidade.

Ao final da ação executada nesta sessão, atualize os arquivos de continuidade necessários.