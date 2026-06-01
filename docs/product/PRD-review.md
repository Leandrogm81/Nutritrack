# arquivo: /docs/product/PRD-review.md

# Revisão Crítica do PRD

## 1. Resumo da avaliação

Foi analisado o arquivo `/docs/product/PRD.md`.

O documento está bem avançado em escopo e separa razoavelmente o MVP local-first da fase pública futura, mas ainda contém ambiguidades relevantes em contratos de entrada, critérios de aceite, operação dos avisos obrigatórios de IA e alguns pontos de modelagem de dados. O escopo geral está mais controlado do que inchado, porém ainda há vazamento de escopo em itens de IA que aparecem em integrações sem fechamento funcional completo. As regras de negócio centrais existem, mas algumas continuam incompletas ou contraditórias em seções operacionais. Os critérios de aceite estão parcialmente verificáveis: várias regras centrais estão cobertas, mas ainda há trechos genéricos demais para orientar um agente coder com segurança.

Classificação do estado geral:

- `Parcialmente pronto`

---

## 2. Achados críticos

### CRÍTICO 1 — Campos obrigatórios e validações mínimas dos fluxos centrais seguem indefinidos

- **Área afetada:** Requisitos/Fluxos/Dados/Critérios de aceite
- **Problema:** O PRD confirma os fluxos de perfil e de refeição manual, mas não fecha quais campos são obrigatórios no perfil nem quais campos mínimos, além de nome e macros, entram no registro manual. Também deixa em aberto a regra de arredondamento do ajuste proporcional.
- **Por que isso pode gerar erro:** Um agente coder pode escolher validações, estrutura de formulário e persistência incompatíveis com a expectativa do produto, gerando retrabalho em UI, dados e testes.
- **Trecho ou referência do PRD:** Seções `7.1. Perfil e metas`, `7.3. Registro manual de refeições`, `9. Fluxo 1`, `9. Fluxo 2`, `19. Pontos ainda pendentes`.
- **Correção recomendada:** Adicionar uma tabela curta no PRD com os campos obrigatórios, opcionais e regras mínimas de validação dos fluxos de perfil e refeição manual, incluindo a política de arredondamento ou a referência explícita à lógica existente que deve ser reaproveitada.
- **Precisa de decisão humana?** Sim
- **Impacto se não corrigir:** Alto

### CRÍTICO 2 — Há conflito interno sobre a regra oficial de gasto energético no fluxo de treino/cardio

- **Área afetada:** Regras de negócio/Fluxos/Dados
- **Problema:** O PRD já define em `7.7`, `12` e no resumo para implementação que cardio usa abordagem baseada em MET quando houver dados suficientes e que passos não exigem kcal automática no MVP. Mesmo assim, o `Fluxo 5` ainda trata a “fórmula oficial de gasto energético” como ponto de decisão pendente.
- **Por que isso pode gerar erro:** Um agente coder pode reabrir uma decisão já fechada, criar fórmula nova ou deixar o fluxo incompleto por interpretar que a regra ainda não foi aprovada.
- **Trecho ou referência do PRD:** Seções `7.7. Registro de treinos, cardio e passos`, `9. Fluxo 5`, `12. Regras de negócio`, `20.4. Regras críticas`.
- **Correção recomendada:** Remover do `Fluxo 5` a dúvida sobre a fórmula oficial e substituir por referência explícita à regra já aprovada: MET para cardio quando houver dados suficientes e nenhum cálculo novo para passos sem base confiável.
- **Precisa de decisão humana?** Não
- **Impacto se não corrigir:** Alto

### CRÍTICO 3 — Avisos obrigatórios de IA e privacidade estão mandatórios, mas sem contrato operacional mínimo

- **Área afetada:** Requisitos/Telas/Fluxos/Critérios de aceite
- **Problema:** O PRD diz que avisos de IA e privacidade são obrigatórios no MVP, mas ainda deixa o texto e o posicionamento pendentes e permite que a solução seja “tela, modal ou bloco contextual”, sem definir em quais fluxos o aviso deve aparecer obrigatoriamente.
- **Por que isso pode gerar erro:** Um agente coder pode implementar avisos escondidos, genéricos ou inconsistentes entre fluxos, e ainda considerar o requisito cumprido. Isso afeta compliance de UX e a interpretação segura do papel da IA.
- **Trecho ou referência do PRD:** Seções `7.4. Assistência de IA para alimentação`, `7.10. Operação local-first, PWA e privacidade local`, `10. Telas e componentes` linha `Avisos de IA e privacidade`, `19. Pontos ainda pendentes`, `20.5. Telas obrigatórias`.
- **Correção recomendada:** Registrar no PRD um contrato mínimo dos avisos: quais fluxos exigem aviso contextual, quando ele aparece, se exige confirmação explícita ou apenas exibição, e qual é o fallback quando IA estiver indisponível.
- **Precisa de decisão humana?** Sim
- **Impacto se não corrigir:** Alto

---

## 3. Achados importantes

### IMPORTANTE 1 — Escopo de exportação CSV/PDF está confirmado, mas o conteúdo exportado não está definido

- **Área afetada:** Dados/Integrações/Critérios de aceite
- **Problema:** O PRD confirma exportação em CSV/PDF, porém não define quais campos mínimos, agrupamentos, período exportável ou diferença esperada entre CSV e PDF.
- **Por que isso pode gerar retrabalho:** O coder pode entregar exportações tecnicamente funcionais, mas pouco úteis ou desalinhadas com o valor esperado do histórico.
- **Trecho ou referência do PRD:** Seções `7.9`, `10. Tela 6 — Histórico`, `14. Integrações`, `19. Pontos ainda pendentes`.
- **Correção recomendada:** Adicionar um quadro curto com escopo mínimo da exportação no MVP: dados obrigatórios, granularidade, filtros permitidos e diferença de objetivo entre CSV e PDF.
- **Precisa de decisão humana?** Sim
- **Impacto se não corrigir:** Médio

### IMPORTANTE 2 — Tela de progresso segue sem fechamento do conjunto mínimo de métricas e filtros

- **Área afetada:** Telas/Fluxos/Critérios de aceite
- **Problema:** A tela `Progresso` é obrigatória, mas o PRD ainda deixa em aberto quais métricas e períodos são mandatórios no MVP.
- **Por que isso pode gerar retrabalho:** O coder pode superimplementar gráficos e filtros desnecessários ou subimplementar a tela a ponto de não entregar o valor analítico esperado.
- **Trecho ou referência do PRD:** Seções `7.6. Registro corporal e progresso`, `10. Tela 2 — Progresso`, `19. Pontos ainda pendentes`, `20.8. Pontos que o coder não deve decidir sozinho`.
- **Correção recomendada:** Fechar um conjunto mínimo de métricas e filtros para o MVP, mesmo que o detalhamento visual fino fique para depois.
- **Precisa de decisão humana?** Sim
- **Impacto se não corrigir:** Médio

### IMPORTANTE 3 — Regras de arquivamento diário estão incompletas para casos de borda

- **Área afetada:** Regras de negócio/Dados/Riscos
- **Problema:** O PRD exige arquivamento na mudança de dia, mas não especifica comportamento para múltiplos dias sem abrir o app, mudança de fuso/data do dispositivo, reabertura repetida no mesmo dia ou prevenção de arquivamento duplicado.
- **Por que isso pode gerar retrabalho:** O coder pode implementar um rollover simples que parece atender o critério básico, mas produz inconsistência histórica em uso real.
- **Trecho ou referência do PRD:** Seções `7.9`, `12. Regras de negócio` item `Arquivamento por mudança de dia`, `15.6. Confiabilidade`, `16. Critérios de aceite gerais`.
- **Correção recomendada:** Acrescentar uma regra operacional mínima para rollover: quando ele dispara, como evita duplicidade e como se comporta quando o app fica dias sem ser aberto.
- **Precisa de decisão humana?** Não
- **Impacto se não corrigir:** Alto

### IMPORTANTE 4 — O modelo de dados não deixa claro como preservar metas e contexto histórico quando o perfil mudar

- **Área afetada:** Dados/Regras de negócio
- **Problema:** O PRD define perfil, metas diárias e histórico diário, mas não esclarece se o histórico deve guardar snapshot das metas vigentes do dia ou se comparações históricas podem ser recalculadas com o perfil atual.
- **Por que isso pode gerar retrabalho:** Um agente coder pode ligar histórico ao perfil atual e alterar retroativamente comparações antigas, quebrando confiança em progresso e exportação.
- **Trecho ou referência do PRD:** Seções `11. Dados e entidades` entidades `Metas diárias` e `Histórico diário`, seções `7.1`, `7.6`, `7.9`.
- **Correção recomendada:** Especificar se metas do dia são persistidas como snapshot histórico ou recalculadas, e qual comportamento é esperado após edição de perfil/metas.
- **Precisa de decisão humana?** Sim
- **Impacto se não corrigir:** Alto

### IMPORTANTE 5 — A importação facilitada aceita `.doc` e `.pdf`, mas a dependência técnica para isso não está delimitada

- **Área afetada:** Integrações/Dependências/Riscos
- **Problema:** O PRD aprova importação por texto colado e por arquivos `.doc`, `.md`, `.txt` e `.pdf`, mas não delimita se isso será parsing local simples, suporte apenas a texto extraível ou uso de biblioteca/serviço específico.
- **Por que isso pode gerar retrabalho:** O coder pode escolher dependências pesadas, fluxos incompatíveis com PWA/local-first ou prometer parsing robusto demais para o MVP.
- **Trecho ou referência do PRD:** Seções `7.4`, `9. Fluxo 4`, `14. Integrações`, `20.8. Pontos que o coder não deve decidir sozinho`.
- **Correção recomendada:** Registrar no PRD o limite do MVP para esses formatos, por exemplo: extração apenas de texto quando disponível, sem OCR dedicado nem suporte avançado a layout complexo.
- **Precisa de decisão humana?** Sim
- **Impacto se não corrigir:** Médio

### IMPORTANTE 6 — Há vazamento de escopo em “análise de equipamento” na integração Gemini

- **Área afetada:** Escopo/Integrações
- **Problema:** A tabela de integrações inclui Gemini para “analisar equipamento”, mas essa funcionalidade não aparece como item do MVP, fluxo, tela obrigatória, critério de aceite ou item secundário aprovado.
- **Por que isso pode gerar retrabalho:** Um agente coder pode entender que precisa manter ou evoluir esse fluxo mesmo sem respaldo funcional claro no PRD.
- **Trecho ou referência do PRD:** Seção `14. Integrações` linha `Gemini / Google GenAI`; ausência correspondente nas seções `5`, `7`, `9`, `10` e `20.2`.
- **Correção recomendada:** Remover “analisar equipamento” da integração ou registrar explicitamente se é funcionalidade existente fora do caminho crítico e fora do MVP.
- **Precisa de decisão humana?** Não
- **Impacto se não corrigir:** Médio

### IMPORTANTE 7 — O checklist final do PRD aprova prontidão maior do que o próprio documento sustenta

- **Área afetada:** Outro
- **Problema:** A seção `21` marca o PRD como pronto para virar plano de implementação, mas a seção `19` ainda reconhece pendências de alta e média prioridade, e outras seções mantêm pontos de decisão operacionais que impactam implementação.
- **Por que isso pode gerar retrabalho:** Um próximo agente pode usar o checklist como autorização para avançar sem resolver lacunas que o próprio documento ainda admite.
- **Trecho ou referência do PRD:** Seções `19. Pontos ainda pendentes` e `21. Checklist de qualidade do PRD`.
- **Correção recomendada:** Ajustar o checklist final para refletir prontidão condicional, deixando explícito o que ainda precisa ser fechado antes do plano.
- **Precisa de decisão humana?** Não
- **Impacto se não corrigir:** Médio

---

## 4. Achados opcionais

### OPCIONAL 1 — Distinção entre usuário comum e avançado pode ser simplificada no texto do MVP

- **Área afetada:** Requisitos/Outro
- **Observação:** O PRD mantém duas personas úteis, mas já registra que a diferença atual é mais de uso do que de permissão. Isso pode ser resumido com mais objetividade no escopo do MVP.
- **Benefício da melhoria:** Reduz leitura ambígua de que haverá experiência bifurcada já nesta fase.
- **Correção recomendada:** Acrescentar uma frase explícita de que, no MVP, a diferença entre as personas é comportamental e não cria fluxos ou permissões distintos.
- **Bloqueia implementação?** Não

### OPCIONAL 2 — Separação entre Histórico e Progresso pode ganhar uma definição de fronteira mais direta

- **Área afetada:** Telas/Fluxos
- **Observação:** As duas telas se complementam, mas o documento pode reforçar melhor que `Histórico` é consulta por data/dia e `Progresso` é leitura agregada e comparativa.
- **Benefício da melhoria:** Diminui risco de sobreposição de UI e facilita decisões de navegação.
- **Correção recomendada:** Adicionar uma linha comparativa entre as duas telas na seção `10`.
- **Bloqueia implementação?** Não

---

## 5. Correções recomendadas

| Prioridade | Correção | Tipo | Bloqueia plano de implementação? | Precisa de humano? |
|---|---|---|---|---|
| Alta | Definir campos obrigatórios, opcionais e validações mínimas de perfil e refeição manual, incluindo política de arredondamento | Requisito/Dado | Sim | Sim |
| Alta | Corrigir o conflito do `Fluxo 5` para refletir a regra já aprovada de gasto energético no cardio/passos | Regra/Fluxo | Sim | Não |
| Alta | Definir contrato mínimo dos avisos de IA e privacidade: gatilho, posicionamento e necessidade de confirmação | Requisito/Tela/Fluxo | Sim | Sim |
| Alta | Especificar como histórico preserva metas/contexto quando o perfil mudar | Dado/Regra | Sim | Sim |
| Média | Fechar o escopo mínimo de exportação CSV/PDF | Dado/Integração | Não | Sim |
| Média | Fechar métricas e filtros mínimos da tela de progresso | Tela/Critério | Não | Sim |
| Média | Completar a regra de arquivamento diário para casos de borda | Regra/Risco | Não | Não |
| Média | Delimitar o suporte real do MVP para importação de `.doc` e `.pdf` | Integração/Dependência | Não | Sim |
| Baixa | Remover ou reclassificar “análise de equipamento” na tabela de integrações | Escopo/Integração | Não | Não |
| Baixa | Ajustar o checklist final para refletir prontidão condicional | Outro | Não | Não |

---

## 6. Pontos de decisão pendentes

| Ponto de decisão | Por que importa | Impacto | Prioridade |
|---|---|---|---|
| Campos obrigatórios do perfil no MVP | Define validação, persistência e a experiência do primeiro uso | Alto | Alta |
| Campos mínimos e regra de arredondamento do registro manual de refeição | Define contrato de entrada, consistência de cálculos e testes | Alto | Alta |
| Contrato operacional dos avisos de IA e privacidade | Define conformidade de UX e reduz interpretação errada do papel da IA | Alto | Alta |
| Snapshot histórico de metas versus recálculo pelo perfil atual | Define consistência do histórico, progresso e exportação | Alto | Alta |
| Escopo mínimo da exportação CSV/PDF | Define utilidade real do recurso e evita retrabalho | Médio | Média |
| Métricas e filtros mínimos da tela de progresso | Controla escopo de UI e clareza analítica | Médio | Média |
| Limite real do suporte a `.doc` e `.pdf` na importação facilitada | Evita superescopo técnico e dependências inadequadas | Médio | Média |

---

## 7. Riscos para o agente de código

| Risco de interpretação | Possível erro do coder | Como corrigir no PRD |
|---|---|---|
| “Campos mínimos exigidos” sem lista fechada | Escolher validações arbitrárias para perfil/refeição | Adicionar tabela de campos obrigatórios e opcionais |
| `Fluxo 5` ainda trata a fórmula como pendente | Reabrir decisão ou criar fórmula nova para gasto energético | Atualizar o fluxo com referência à regra já aprovada |
| Avisos de IA podem ser “tela, modal ou bloco” | Implementar aviso escondido ou inconsistente e ainda marcar como concluído | Definir gatilho, posicionamento e requisito mínimo por fluxo |
| Histórico diário sem regra de snapshot de metas | Recalcular passado com metas atuais e distorcer progresso | Especificar persistência histórica de metas/contexto |
| Exportação “funciona” sem escopo mínimo | Entregar CSV/PDF tecnicamente válidos, mas pouco úteis | Definir campos, período e saída mínima esperada |
| Importação de `.doc`/`.pdf` sem limite claro | Introduzir parsing complexo, dependências pesadas ou promessas incompatíveis com MVP | Delimitar o suporte real do MVP a esses formatos |
| Integração Gemini menciona “analisar equipamento” sem fluxo | Manter ou priorizar funcionalidade fantasma | Remover da tabela ou classificar explicitamente como fora do MVP |
| Checklist final afirma prontidão total | Pular correções necessárias e ir direto para planejamento/implementação | Tornar a prontidão condicional no próprio checklist |

---

## 8. Veredito final

Classificação do PRD:

- `Parcialmente pronto`

O documento já tem boa base de escopo, separa corretamente o MVP da fase pública e documenta várias regras centrais. Ainda assim, há lacunas críticas em contratos de entrada, regra operacional dos avisos obrigatórios, preservação correta de histórico/metas e um conflito explícito sobre gasto energético no fluxo de treino/cardio. Esses pontos não exigem reescrever o PRD, mas exigem correções pontuais antes de tratá-lo como guia suficientemente seguro para um agente coder.

### Pode virar plano de implementação agora?

`Não`

### Condições para avançar

- corrigir os achados críticos;
- fechar os contratos mínimos de campos/validações dos fluxos centrais;
- alinhar o `Fluxo 5` com a regra já aprovada de gasto energético;
- definir o contrato operacional dos avisos de IA e privacidade;
- esclarecer como histórico preserva metas e contexto;
- ajustar o checklist final para não sinalizar prontidão acima do que o documento sustenta.

### Próxima ação recomendada

- corrigir achados críticos e importantes
