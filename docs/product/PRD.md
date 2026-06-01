# PRD — NutriTrack

## 1. Resumo executivo

NutriTrack é um produto brownfield já existente, concebido como um app mobile-first para uso pessoal no acompanhamento de alimentação, hidratação, treino, cardio, passos, peso e bioimpedância, com apoio opcional de IA para reduzir esforço de cadastro e planejamento.

O produto é voltado, no estado atual do escopo, para usuário individual comum e usuário individual avançado. Ele resolve a fragmentação entre registros manuais, planilhas e apps separados, centralizando acompanhamento diário, histórico e planejamento semanal em um único fluxo.

O escopo geral confirmado do MVP é local-first, sem conta obrigatória, com persistência local, funcionamento offline para dados já salvos, backup/importação/exportação e equilíbrio entre dieta e treino como pilares equivalentes do produto. A estrutura já deve ser preparada para evolução futura com Supabase, autenticação, sincronização e fase pública, mas isso não é dependência do MVP.

O estágio de maturidade do escopo é `Escopo definido para MVP com hardening pendente para fase pública futura`. O produto já possui direção funcional relevante e as decisões centrais do MVP foram fechadas, mas ainda existem requisitos claros para qualquer distribuição pública posterior.

Pontos críticos para fase pública futura:
- Mover toda integração de IA para camada server-side/proxy com segredo fora do cliente e validação de payload.
- Implementar no produto os avisos legais e de UX obrigatórios para sugestões de dieta e treino.
- Consolidar backup com schema versionado, validação forte e testes de integridade.
- Productizar segurança, privacidade local, textos e confiabilidade antes de qualquer release aberto.

---

## 2. Objetivo do produto

### Objetivo principal

Permitir que um usuário individual acompanhe e planeje sua rotina de alimentação e treino em um app mobile-first local-first, com registros diários, histórico, metas e apoio opcional de IA como recomendação revisável, sem substituir orientação profissional.

### Objetivos secundários

- Centralizar em um único produto os registros de refeição, água, peso, bioimpedância, treino, cardio e passos.
- Reduzir a fricção de cadastro manual com recursos assistidos por IA, mantidos no MVP sob revisão humana obrigatória.
- Permitir planejamento semanal de dieta e treino com aplicação rápida ao uso diário.
- Preservar dados localmente com backup, exportação e importação.
- Apoiar acompanhamento de progresso físico ao longo do tempo.
- Manter o MVP preparado para futura evolução estrutural com Supabase, sem exigir backend agora.

### Objetivos fora do MVP

- Conta obrigatória.
- Sincronização multi-dispositivo.
- Modo profissional para nutricionista, personal trainer, clínica ou atendimento de terceiros.
- Monetização.
- Biblioteca ampla de alimentos ou exercícios.
- Gamificação.
- Estratégia completa de distribuição pública multiusuário com backend obrigatório nesta fase do MVP.

---

## 3. Problema a resolver

O problema principal é a dispersão dos dados de saúde e fitness do usuário entre anotações, memória, planilhas e apps diferentes, combinada com a fricção de registrar manualmente refeições, hidratação, treinos e progresso corporal.

Impacto do problema:
- baixa consistência no acompanhamento diário;
- dificuldade de comparar consumo e gasto com metas;
- perda de contexto histórico;
- maior chance de abandono do hábito por excesso de trabalho manual;
- risco de decisões ruins quando o usuário não consegue visualizar progresso com clareza.

Como o problema parece ser resolvido hoje:
- não foi informado diretamente no Pré-PRD;
- pela análise do produto existente, a resolução atual provavelmente ocorre com apps separados, anotações manuais, planilhas ou memória.

Por que o produto é necessário:
- já existe um protótipo funcional com valor claro em centralização;
- há recursos de IA que podem reduzir esforço operacional do usuário;
- o produto cobre tanto rotina alimentar quanto rotina física, o que foi mantido como decisão confirmada.

Riscos caso o problema não seja bem resolvido:
- o produto pode virar apenas mais um local de registro manual;
- o usuário pode perder confiança se cálculos, histórico ou IA falharem;
- o escopo pode crescer sem consolidar o valor principal;
- recomendações de IA podem ser interpretadas como orientação profissional sem os devidos limites.

---

## 4. Público-alvo e personas

### Persona 1 — Usuário individual comum

- Perfil: pessoa que quer acompanhar alimentação, água, peso e atividade física sem usar múltiplos apps.
- Necessidade principal: registrar e consultar progresso diário com rapidez.
- Dor principal: entrada manual trabalhosa e dados espalhados.
- O que precisa realizar no produto: registrar refeições, água, peso, treino, cardio e passos; consultar metas e histórico; exportar backup.
- Nível técnico esperado: baixo a médio.
- Observações: sensível a fluxos longos e a excesso de detalhe; pode precisar de mais orientação visual.

### Persona 2 — Usuário individual avançado

- Perfil: pessoa que quer maior controle sobre macros, planejamento semanal e organização de treinos.
- Necessidade principal: planejar e reaproveitar rotina alimentar e física com mais precisão.
- Dor principal: estruturar dieta e treino com baixo atrito.
- O que precisa realizar no produto: planejar semana, registrar execução, revisar sugestões de IA, acompanhar progresso corporal e histórico.
- Nível técnico esperado: médio.
- Observações: espera flexibilidade maior de edição e pode tolerar mais detalhe na interface.

### Ponto de decisão

- Ainda não está definido se haverá distinção real de experiência entre usuário comum e avançado ou se ambos usarão exatamente os mesmos fluxos e permissões.

---

## 5. Escopo do MVP

| Item do MVP | Descrição | Justificativa | Critério de aceite |
|---|---|---|---|
| Perfil e metas | Cadastro de perfil pessoal e metas diárias de nutrição e água, com base em dados corporais e objetivo | Necessário para personalizar o restante do produto | O usuário consegue salvar perfil, recarregar o app e ver metas persistidas |
| Dashboard diário | Visão consolidada do dia com metas, consumo, progresso e próximos passos | É a tela de referência do uso diário | O usuário visualiza claramente o progresso do dia sem precisar abrir múltiplas telas |
| Registro manual de refeições | Cadastro manual de refeição com calorias e macros, incluindo ajuste proporcional de porção | É o fluxo mínimo para dieta funcionar sem depender de IA | O usuário consegue adicionar, visualizar e remover uma refeição com atualização imediata do dashboard |
| Registro de água | Registro rápido de hidratação com atualização da meta diária | É um hábito recorrente e simples do problema central | O usuário consegue registrar água e ver o progresso diário atualizado |
| Registro corporal | Registro de peso e bioimpedância opcional para acompanhamento de evolução | O produto precisa apoiar progresso físico, e bioimpedância foi mantida como opcional | O usuário consegue salvar peso e, se quiser, bioimpedância, sem tornar esses campos obrigatórios |
| Treino, cardio e passos | Cadastro de treinos, registro de execução, cardio e passos com impacto diário visível | Treino e dieta têm o mesmo peso no produto | O usuário consegue registrar treino, cardio e passos e ver reflexo no resumo diário |
| Planejamento alimentar semanal | Plano alimentar semanal tratado como recomendação, com adição facilitada ao diário | O produto precisa planejar, não apenas registrar | O usuário consegue criar ou revisar um plano semanal e aplicar itens ao dia sem preenchimento automático |
| Planejamento semanal de treinos | Agenda semanal de treinos com organização por dia | Complementa o pilar de treino com o mesmo peso da dieta | O usuário consegue associar treinos aos dias da semana e consultar o planejamento salvo |
| Histórico, progresso e exportação | Consulta de dias anteriores, indicadores de progresso e exportação em CSV/PDF | Histórico e visibilidade de evolução são parte do valor central | O usuário consegue acessar histórico por um fluxo claro e exportar os dados disponíveis |
| Backup, importação e reset local | Exportar backup, importar backup válido e resetar dados com confirmação | É essencial em um MVP local-first sem conta | O usuário consegue importar backup válido sem corromper dados e resetar apenas após confirmação explícita |
| Operação local-first e PWA | Uso em dispositivo móvel com dados locais persistidos e acesso offline aos dados já salvos | É a direção confirmada do MVP | Após recarregar ou ficar offline, os dados locais permanecem acessíveis |
| Assistência por IA existente | Recursos atuais de IA para análise, geração e importação permanecem ativos no MVP como assistência revisável | IA é diferencial relevante já existente, mas exige limites claros de segurança e responsabilidade | Toda saída de IA exige revisão antes do salvamento e qualquer build público com IA depende de camada server-side sem chave exposta |

---

## 6. Fora de escopo

| Fora de escopo | Motivo | Pode voltar no futuro? |
|---|---|---|
| Login obrigatório | Muda arquitetura, privacidade, dados e suporte do MVP | Sim |
| Sincronização multi-dispositivo | Exige autenticação, backend e governança de dados | Sim |
| Modo profissional para nutricionista/personal | Muda público, permissões, responsabilidade e fluxos | Sim |
| Monetização e cobrança | Não há decisão de negócio aprovada | Sim |
| Scanner de código de barras dedicado com base de alimentos | O MVP não precisa de fluxo dedicado; reconhecimento futuro pode ser tratado por IA de imagem sem catálogo amplo nesta fase | Sim |
| Biblioteca ampla de alimentos | Não foi confirmada como necessidade do MVP | Sim |
| Biblioteca ampla de exercícios | Não foi confirmada como necessidade do MVP | Sim |
| Gamificação, conquistas e hábitos | Pode distrair do valor central e inflar o escopo | Sim |
| Marketplace, comunidade ou recursos sociais | Não fazem parte do objetivo atual | Sim |
| Sincronização em nuvem via Supabase | Supabase é apenas direção futura, não requisito atual | Sim |
| `CoachInsights` como funcionalidade ativa | Removido do escopo do MVP por não ser essencial ao fluxo central nem estar integrado ao produto principal | Só volta com caso de uso claro |
| Tela dedicada de receitas por IA | É funcionalidade útil, mas secundária ao problema central do MVP | Sim |
| Relatórios semanais e mensais avançados | Agregam valor, mas não são necessários para a primeira entrega funcional | Sim |

---

## 7. Funcionalidades principais

### 7.1. Perfil e metas

#### Objetivo

Permitir que o usuário informe dados pessoais e objetivo para que o produto personalize metas diárias e contexto de uso.

#### Comportamento esperado

O usuário consegue salvar nome, idade, peso, altura, sexo, nível de atividade, objetivo, preferência alimentar, restrições e, opcionalmente, dados corporais. O sistema deve persistir esses dados localmente e usá-los para metas e personalização.

#### Regras de negócio relacionadas

- O produto deve funcionar sem login.
- O perfil é a base para metas e personalização.
- Bioimpedância é opcional.
- Metas automáticas devem continuar manualmente editáveis pelo usuário.
- A meta calórica automática do MVP deve usar a lógica já implementada no brownfield com equação de Mifflin-St Jeor, multiplicador de atividade e ajuste por objetivo.
- Macros automáticos podem ser derivados do perfil alimentar escolhido ou de macros customizados, mas devem continuar editáveis e não devem ser apresentados como prescrição clínica.
- A meta de água pode usar o default operacional atual do produto e deve permanecer editável manualmente.

#### Critérios de aceite

- [ ] O usuário consegue salvar perfil e reencontrar os dados após recarregar o app.
- [ ] O sistema exibe metas diárias associadas ao perfil salvo.
- [ ] Campos opcionais de bioimpedância não bloqueiam o salvamento do perfil.

#### Definições aprovadas

- Metas serão tanto calculadas automaticamente quanto editáveis manualmente.
- A fórmula oficial para meta calórica automática do MVP será Mifflin-St Jeor como base, combinada com multiplicador de atividade e ajuste por objetivo.

#### Riscos

- Fórmulas mal documentadas podem gerar metas incoerentes.
- Campos excessivos no perfil podem aumentar abandono inicial.

---

### 7.2. Dashboard diário e hidratação

#### Objetivo

Oferecer uma visão consolidada do dia e um fluxo rápido para acompanhar progresso alimentar, hídrico e físico.

#### Comportamento esperado

Ao abrir o app, o usuário deve ver resumo do consumo do dia, metas, progresso de água, indicadores de treino/cardio/passos e um estado claro para quando ainda não houver dados registrados.

#### Regras de negócio relacionadas

- A tela inicial deve priorizar o dia atual.
- O registro de água é cumulativo no dia.
- O app deve continuar acessível offline para dados já salvos.
- Dieta e treino devem ter peso equivalente na estrutura principal do produto.

#### Critérios de aceite

- [ ] A tela inicial mostra metas e progresso do dia atual sem exigir navegação extra.
- [ ] O usuário consegue adicionar água e ver o total diário atualizado imediatamente.
- [ ] Quando não houver dados do dia, a interface exibe estado vazio claro e orienta a próxima ação.

#### Pontos de decisão

- Quais cards são indispensáveis no dashboard do MVP?
- Como a tela deve se comportar quando o perfil ainda não foi configurado?

#### Riscos

- Excesso de indicadores pode reduzir clareza.
- Falta de estado vazio bem resolvido pode travar o primeiro uso.

---

### 7.3. Registro manual de refeições

#### Objetivo

Permitir o registro alimentar sem dependência de IA, garantindo um fluxo confiável e direto.

#### Comportamento esperado

O usuário adiciona uma refeição com nome, calorias, proteína, carboidratos e gorduras. O sistema salva a refeição no dia atual, atualiza o resumo diário e permite remoção. Ajustes de porção devem recalcular macros proporcionalmente.

#### Regras de negócio relacionadas

- O fluxo manual deve existir mesmo que IA esteja desativada.
- O recálculo de porção deve ser proporcional aos valores originais.
- O sistema deve atualizar o dashboard imediatamente após salvar ou remover.
- O agente de implementação não deve inventar regras de arredondamento sem decisão humana ou sem reaproveitar a lógica já aprovada.

#### Critérios de aceite

- [ ] O usuário consegue adicionar uma refeição manual com os campos mínimos exigidos.
- [ ] Ao salvar, calorias e macros do dia são recalculados e exibidos no dashboard.
- [ ] O usuário consegue remover a refeição e ver o resumo diário corrigido.

#### Pontos de decisão

- Quais campos são obrigatórios além de nome e macros?
- Quais regras de arredondamento devem ser aplicadas?

#### Riscos

- Cálculo incorreto de porção compromete confiança.
- Exclusão sem feedback claro pode parecer perda de dados.

---

### 7.4. Assistência de IA para alimentação

#### Objetivo

Reduzir a fricção de cadastro e planejamento alimentar com análise e geração assistidas, sempre como recomendação revisável.

#### Comportamento esperado

Como a IA permanece ativa no MVP, o usuário pode enviar texto ou imagem de refeição, importar texto de dieta e receber uma estrutura revisável antes de salvar. O produto também pode gerar dieta semanal e sugestões relacionadas, desde que o usuário revise o resultado.

#### Regras de negócio relacionadas

- Toda saída de IA deve passar por revisão humana antes do salvamento.
- Imagens enviadas para IA não devem ser persistidas localmente por padrão.
- O produto não deve apresentar IA como orientação profissional.
- IA ativa em qualquer build público depende de camada server-side/proxy com proteção de segredo e validação de payload.
- O produto deve deixar explícito que o resultado é estimativa assistiva e revisável.

#### Critérios de aceite

- [ ] No fluxo de IA ativo, o usuário visualiza o resultado antes de confirmar o salvamento.
- [ ] O sistema trata erro de resposta malformada sem quebrar o fluxo principal.
- [ ] Imagens usadas para análise não permanecem salvas localmente por padrão.

#### Definições aprovadas

- A IA permanece ativa no MVP.
- Os avisos mínimos obrigatórios devem informar que a saída é estimativa revisável, não substitui nutricionista, médico ou treinador, e não deve ser tratada como prescrição.
- O produto deve orientar busca de suporte profissional em casos de condição clínica, gestação, amamentação, transtorno alimentar, menoridade ou restrição médica relevante.
- A importação facilitada de dieta própria deve aceitar texto simples colado e arquivos `.doc`, `.md`, `.txt` e `.pdf`.

#### Riscos

- Respostas incorretas ou malformadas podem gerar perda de confiança.
- O usuário pode interpretar a saída como prescrição nutricional.
- Chave de IA exposta em distribuição pública cria risco crítico.

---

### 7.5. Planejamento alimentar semanal

#### Objetivo

Permitir que o usuário organize refeições por dia e tipo como recomendação reutilizável, sem preencher automaticamente o diário.

#### Comportamento esperado

O usuário cria, edita, importa ou gera um plano alimentar semanal por dia da semana e tipo de refeição. Itens do plano podem ser aplicados ao dia atual com poucos toques, mas nunca devem entrar automaticamente como consumo realizado.

#### Regras de negócio relacionadas

- Plano alimentar é recomendação, não registro consumido.
- O usuário mantém liberdade total para registrar manualmente.
- A aplicação do plano ao diário deve ser explícita.
- O plano semanal deve permanecer salvo localmente.
- Itens importados ou gerados devem poder ser editados antes do salvamento.

#### Critérios de aceite

- [ ] O usuário consegue criar ou revisar refeições planejadas por dia e tipo.
- [ ] Itens planejados só entram no diário após ação explícita do usuário.
- [ ] O plano semanal permanece disponível após fechar e reabrir o app.

#### Pontos de decisão

- Quais tipos de refeição devem ser padrão no MVP?

#### Riscos

- Confusão entre planejamento e consumo real.
- Fluxo excessivamente rígido pode frustrar o usuário avançado.

---

### 7.6. Registro corporal e progresso

#### Objetivo

Acompanhar evolução física do usuário ao longo do tempo com foco em peso e, opcionalmente, bioimpedância.

#### Comportamento esperado

O usuário consegue registrar peso atual e dados de composição corporal opcionais. A área de progresso deve permitir consulta visual dos dados históricos relevantes.

#### Regras de negócio relacionadas

- Peso é parte do acompanhamento corporal.
- Bioimpedância é opcional.
- O histórico corporal deve permanecer acessível por fluxo claro.
- O produto não deve exigir bioimpedância para habilitar outras áreas.

#### Critérios de aceite

- [ ] O usuário consegue salvar peso com ou sem dados de bioimpedância.
- [ ] O histórico corporal fica disponível para consulta posterior.
- [ ] A ausência de bioimpedância não causa erro em gráficos ou resumos.

#### Pontos de decisão

- Quais métricas e períodos são obrigatórios na tela de progresso?
- Qual nível de detalhamento gráfico entra no MVP?

#### Riscos

- Visualizações confusas podem reduzir valor do histórico.
- Falhas em dados opcionais podem quebrar a tela de progresso.

---

### 7.7. Registro de treinos, cardio e passos

#### Objetivo

Permitir acompanhamento diário da rotina física com reflexo no progresso e nas metas do dia.

#### Comportamento esperado

O usuário cadastra treinos, registra execução, informa passos e registra cardio com duração, intensidade e, quando houver base suficiente, gasto estimado. O sistema atualiza o dia atual e exibe o impacto no resumo diário.

#### Regras de negócio relacionadas

- Treino e dieta têm o mesmo peso no produto.
- Passos e cardio podem ser registrados manualmente no MVP.
- O impacto em metas e calorias deve seguir regra documentada.
- Cardio só deve gerar gasto energético automático quando houver dados suficientes para uma estimativa documentada.
- Passos devem permanecer visíveis no resumo diário mesmo quando não houver base suficiente para inferir calorias com segurança.
- O produto não deve inventar fórmula clínica nova para gasto energético em treino de força, cardio ou passos.

#### Critérios de aceite

- [ ] O usuário consegue registrar um treino executado no dia atual.
- [ ] O usuário consegue salvar passos e cardio e ver os dados refletidos no resumo do dia.
- [ ] O sistema mantém consistência entre registro físico diário e consulta posterior no histórico.

#### Definições aprovadas

- A fórmula oficial para meta calórica automática do produto será Mifflin-St Jeor, combinada com multiplicador de atividade e ajuste por objetivo.
- A estimativa de gasto energético de cardio deve seguir abordagem documentada baseada em MET e tipo de atividade quando houver dados suficientes.
- Passos não devem obrigatoriamente virar calorias no MVP quando o produto não tiver cadência, distância ou outro dado confiável; nesse caso, permanecem como indicador de volume de atividade.
- Treino de força deve registrar execução, duração e histórico, sem exigir cálculo calórico automático no MVP.
- Humor ou percepção do treino pode permanecer apenas como dado opcional existente, sem virar requisito central do MVP.

#### Riscos

- Estimativas inconsistentes podem minar confiança no produto.
- Treinos sem separação clara entre plano e execução podem causar confusão.

---

### 7.8. Planejamento e geração de treinos

#### Objetivo

Organizar a rotina semanal de treino e usar IA para importar ou gerar planos de treino dentro das regras aprovadas do MVP.

#### Comportamento esperado

O usuário monta uma agenda semanal de treinos por dia, pode importar ou gerar treinos com IA e depois registrar execução manual quando realmente treinar.

#### Regras de negócio relacionadas

- Plano de treino não equivale a treino executado.
- O usuário precisa revisar toda sugestão de IA antes de salvar.
- A agenda semanal deve ser persistida localmente.
- O sistema deve preservar a separação entre rotina planejada e rotina realizada.

#### Critérios de aceite

- [ ] O usuário consegue associar treinos existentes aos dias da semana.
- [ ] O usuário consegue consultar a agenda semanal salva.
- [ ] O resultado de IA de treino é revisável antes de entrar no plano ou no cadastro de treinos.

#### Definições aprovadas

- A IA para treino permanece no MVP nas mesmas condições de segurança, revisão humana e proteção exigidas para IA alimentar.
- Recomendações físicas devem ser apresentadas como sugestão revisável e não como prescrição profissional.

#### Riscos

- Sugestões inadequadas podem ser interpretadas como prescrição.
- Misturar geração, agenda e execução no mesmo fluxo pode prejudicar usabilidade.

---

### 7.9. Histórico, exportação, backup, importação e reset

#### Objetivo

Dar ao usuário controle sobre continuidade, portabilidade e consulta de seus dados locais.

#### Comportamento esperado

O produto arquiva dados diários, permite consultar histórico, exportar informações em formatos disponíveis, importar backup válido e resetar dados locais com confirmação explícita.

#### Regras de negócio relacionadas

- Mudança de dia deve arquivar o dia anterior sem apagar histórico.
- Importação inválida não pode sobrescrever dados existentes.
- Reset deve exigir confirmação forte.
- Histórico e exportação devem ser acessíveis por fluxo claro no MVP.

#### Critérios de aceite

- [ ] O usuário consegue acessar dias anteriores por um fluxo explícito e previsível.
- [ ] Um backup inválido é rejeitado com mensagem clara e sem corromper os dados atuais.
- [ ] O reset só ocorre após confirmação explícita e o resultado é visível ao usuário.

#### Definições aprovadas

- O backup terá schema versionado e validação forte antes de sobrescrever o estado local.
- O histórico será uma tela principal de primeiro nível na navegação do produto.
- A exportação do MVP continuará contemplando CSV e PDF para os dados históricos disponíveis.

#### Riscos

- Importação frágil pode corromper todo o estado local.
- Histórico pouco visível reduz o valor do produto.
- Reset sem fricção adequada pode causar perda irreversível.

---

### 7.10. Operação local-first, PWA e privacidade local

#### Objetivo

Garantir que o produto funcione como app pessoal mobile-first com persistência local confiável.

#### Comportamento esperado

Os dados do usuário devem continuar acessíveis offline depois de salvos. O produto deve se comportar como PWA instalável e preservar o estado local entre sessões.

#### Regras de negócio relacionadas

- O MVP é local-first.
- Dados locais devem ser persistidos no dispositivo.
- IA depende de conexão quando estiver ativa.
- A estrutura deve facilitar evolução futura com Supabase sem exigir essa migração agora.

#### Critérios de aceite

- [ ] O usuário consegue reabrir o app e reencontrar os dados locais anteriores.
- [ ] Em modo offline, o usuário ainda consegue consultar os dados já persistidos.
- [ ] O produto diferencia claramente o que funciona offline do que depende de conexão.

#### Definições aprovadas

- O MVP permanece local-first para uso individual, mas a direção do produto é evoluir para fase pública futura após hardening de segurança, privacidade e operação.
- O produto deve avisar com clareza que dados ficam locais por padrão no dispositivo e que IA depende de conexão.

#### Riscos

- Dados sensíveis em dispositivo compartilhado podem expor privacidade.
- Se a fronteira entre offline e online não for clara, o usuário pode interpretar falhas de IA como erro geral do app.

---

## 8. Funcionalidades secundárias

| Funcionalidade | Valor esperado | Prioridade | Entra no MVP? | Observação |
|---|---|---|---|---|
| Tela dedicada de receitas por IA | Apoiar o usuário com ideias de preparo a partir do contexto nutricional | Média | Não | Recurso útil, mas secundário em relação a registro e planejamento |
| Templates de refeições | Reaproveitar refeições frequentes com menos esforço | Média | Não | Candidata forte para V1 |
| Templates de treino | Reaproveitar rotinas frequentes | Média | Não | Candidata forte para V1 |
| Relatório semanal simples | Melhorar leitura de progresso recorrente | Média | Não | Candidato para V1 |
| Relatório mensal | Aprofundar análise histórica | Baixa | Não | Melhoria futura |
| Reconhecimento de rótulos ou códigos por IA | Facilitar cadastro de alimentos industrializados via imagem, sem scanner dedicado no MVP | Média | Não | Candidato futuro usando Gemini, sem depender de catálogo amplo nesta fase |
| Biblioteca de alimentos | Reduzir cadastro manual | Baixa | Não | Exige curadoria de dados |
| Biblioteca de exercícios | Padronizar treinos | Baixa | Não | Exige escopo de catálogo |
| Onboarding dedicado | Melhorar primeira configuração do produto | Média | Não | Pode voltar em V1 se o fluxo inicial atual não for suficiente |
| Internacionalização | Suportar mais de um idioma | Baixa | Não | O MVP pode ser tratado como português único, salvo decisão humana |

---

## 9. Fluxos de usuário

### Fluxo 1 — Configurar perfil e metas

- Usuário: usuário individual comum ou avançado.
- Objetivo: habilitar metas e personalização inicial.
- Pré-condições: app aberto pela primeira vez ou perfil ainda não configurado.
- Passos:
  1. O usuário acessa a área de perfil/configurações.
  2. Informa dados pessoais, objetivo e preferências.
  3. Salva o perfil.
  4. Retorna ao dashboard e visualiza metas ativas.
- Resultado esperado: perfil e metas ficam persistidos localmente.
- Estados de erro: campos obrigatórios ausentes; valores inválidos; falha de persistência local.
- Critérios de aceite: o perfil é salvo, reaberto sem perda e passa a influenciar metas exibidas.
- Pontos de decisão: quais campos são obrigatórios e se metas são manualmente editáveis.

### Fluxo 2 — Registrar refeição manualmente

- Usuário: usuário individual.
- Objetivo: registrar alimentação do dia atual sem depender de IA.
- Pré-condições: app aberto no dia atual.
- Passos:
  1. O usuário abre a tela inicial.
  2. Aciona o fluxo de adicionar refeição.
  3. Informa nome, calorias e macros.
  4. Salva a refeição.
  5. Visualiza o impacto no resumo diário.
- Resultado esperado: a refeição aparece no dia atual e altera os totais do dashboard.
- Estados de erro: envio com campos obrigatórios vazios; macros inválidos; falha de persistência.
- Critérios de aceite: o usuário consegue salvar, visualizar e remover a refeição com atualização imediata.
- Pontos de decisão: regras de arredondamento e campos mínimos exatos.

### Fluxo 3 — Analisar refeição com IA

- Usuário: usuário que quer reduzir atrito de cadastro.
- Objetivo: transformar texto ou imagem em registro revisável.
- Pré-condições: IA aprovada para o MVP e conexão disponível.
- Passos:
  1. O usuário escolhe análise por texto ou imagem.
  2. Envia a descrição ou imagem.
  3. O sistema retorna uma proposta estruturada.
  4. O usuário revisa e ajusta o resultado.
  5. Confirma o salvamento.
- Resultado esperado: os dados só entram no diário após revisão e confirmação.
- Estados de erro: indisponibilidade de conexão; resposta malformada; análise inconclusiva; permissão de câmera negada.
- Critérios de aceite: o fluxo nunca salva automaticamente sem revisão; falhas de IA não quebram o restante do app.
- Definições aprovadas: IA ativa no MVP, proteção obrigatória por camada server-side em cenário público e avisos contextuais obrigatórios.

### Fluxo 4 — Planejar dieta semanal e aplicar ao diário

- Usuário: usuário individual.
- Objetivo: montar ou importar uma rotina alimentar e reaproveitá-la no uso diário.
- Pré-condições: plano alimentar disponível ou fluxo de criação aberto.
- Passos:
  1. O usuário acessa a área de plano alimentar.
  2. Cria, importa ou gera um plano.
  3. Revisa os itens por dia e tipo de refeição.
  4. Salva o plano semanal.
  5. Em um dia específico, aplica manualmente um item ao diário.
- Resultado esperado: o plano fica salvo como recomendação e não como consumo automático.
- Estados de erro: importação inválida; falha de IA; tipos de refeição não mapeados.
- Critérios de aceite: o usuário consegue salvar o plano e aplicar itens ao dia sem preenchimento automático.
- Definições aprovadas: importação facilitada por texto colado e arquivos `.doc`, `.md`, `.txt` e `.pdf`; itens importados podem ser editados antes de salvar.
- Ponto de decisão restante: tipos de refeição padrão do MVP.

### Fluxo 5 — Registrar treino, cardio e passos

- Usuário: usuário individual.
- Objetivo: registrar atividade física realizada no dia.
- Pré-condições: app aberto; treino existente ou registro manual disponível.
- Passos:
  1. O usuário acessa a área de treino.
  2. Escolhe registrar treino executado, cardio ou passos.
  3. Informa dados necessários.
  4. Salva o registro.
  5. Consulta o impacto no dia atual.
- Resultado esperado: o dado físico fica salvo e refletido no progresso do dia.
- Estados de erro: dados inconsistentes; treino inexistente; falha no cálculo do gasto estimado.
- Critérios de aceite: registro salvo, visível no dia atual e consultável depois.
- Pontos de decisão: fórmula oficial de gasto energético e detalhamento mínimo dos campos.

### Fluxo 6 — Consultar histórico e progresso

- Usuário: usuário individual.
- Objetivo: revisar dias anteriores e evolução corporal/diária.
- Pré-condições: existência de dados anteriores.
- Passos:
  1. O usuário acessa o fluxo de histórico ou progresso.
  2. Seleciona um período ou uma data anterior.
  3. Consulta refeições, água, treino, cardio, passos e evolução corporal.
  4. Opcionalmente exporta os dados.
- Resultado esperado: o usuário consegue revisar o passado sem perder contexto.
- Estados de erro: histórico inacessível; dados ausentes; exportação falha.
- Critérios de aceite: existe um caminho claro para histórico e exportação que funcione com dados reais.
- Definição aprovada: histórico como tela principal de primeiro nível na navegação.

### Fluxo 7 — Exportar, importar ou resetar dados locais

- Usuário: usuário individual.
- Objetivo: preservar, restaurar ou apagar dados do dispositivo.
- Pré-condições: dados locais existentes ou arquivo de backup disponível.
- Passos:
  1. O usuário acessa a área de backup/exportação.
  2. Escolhe exportar, importar ou resetar.
  3. No caso de importação, seleciona um arquivo.
  4. O sistema valida e aplica a ação permitida.
  5. O usuário recebe confirmação ou erro claro.
- Resultado esperado: a ação concluída preserva integridade dos dados.
- Estados de erro: arquivo inválido; falha de leitura; confirmação não realizada; incompatibilidade de versão.
- Critérios de aceite: arquivo inválido não sobrescreve estado existente; reset exige confirmação explícita.
- Definições aprovadas: backup com schema versionado e validação forte; formato de backup local em JSON; mensagens de validação explícitas.

---

## 10. Telas e componentes

| Tela | Finalidade | Elementos principais | Obrigatória no MVP? | Observações |
|---|---|---|---|---|
| Início | Consolidar o dia atual | Cards de metas, resumo diário, lista de refeições, registro de água, ação para adicionar refeição | Sim | É a tela central do uso diário |
| Progresso | Consultar evolução corporal e indicadores históricos | Gráficos, comparativos, filtros de período, histórico corporal | Sim | Períodos exatos são ponto de decisão |
| Plano | Organizar alimentação semanal | Grade semanal, itens por dia/tipo, importação, geração por IA, ação de aplicar ao diário | Sim | Plano é recomendação, não consumo automático |
| Treino | Concentrar cadastro, execução e planejamento físico | Subáreas de treinar, agenda, cardio/passos, IA de treino | Sim | Treino tem mesmo peso de dieta |
| Perfil | Configurar usuário e gerir dados locais | Formulário de perfil, metas, preferências, backup, importação, reset | Sim | Ponto de entrada para configuração e segurança local |
| Histórico | Consultar dias anteriores e exportar | Calendário ou lista por data, resumo do dia, exportação CSV/PDF | Sim | Tela principal de primeiro nível na navegação |
| Avisos de IA e privacidade | Explicar limites de IA, uso de imagem e dependência de conexão | Textos de aviso, confirmação contextual, mensagens de indisponibilidade | Sim | Pode ser tela, modal ou bloco contextual; obrigatório no MVP |
| Receitas | Sugerir receitas por IA | Sugestões, filtros ou ações relacionadas | Não | Funcionalidade secundária |
| Onboarding dedicado | Acelerar primeira configuração | Passos guiados, perfil inicial, metas | Não | Fora do MVP; usar estados vazios e CTA para perfil no primeiro uso |

### Tela 1 — Início

#### Finalidade

Permitir que o usuário veja rapidamente o estado do dia e execute as ações de registro mais frequentes.

#### Elementos principais

- resumo de calorias e macros;
- progresso de água;
- lista de refeições do dia;
- acesso para adicionar refeição;
- indicadores resumidos de treino/cardio/passos.

#### Ações do usuário

- adicionar refeição;
- remover refeição;
- registrar água;
- consultar o progresso do dia.

#### Estados necessários

- estado vazio;
- estado de carregamento;
- estado de erro;
- estado de sucesso;
- estado com dados.

#### Critérios de aceite da tela

- [ ] A tela inicial permite registrar pelo menos refeição e água sem sair do fluxo principal.
- [ ] O usuário entende o estado do dia atual sem navegar para outras áreas.

### Tela 2 — Progresso

#### Finalidade

Apresentar evolução do usuário ao longo do tempo.

#### Elementos principais

- gráficos de calorias e macros;
- histórico de peso;
- histórico de bioimpedância;
- indicadores de treino e frequência;
- filtros de período.

#### Ações do usuário

- consultar evolução corporal;
- alternar período de visualização;
- revisar histórico agregado.

#### Estados necessários

- estado vazio;
- estado de carregamento;
- estado de erro;
- estado de sucesso;
- estado com dados.

#### Critérios de aceite da tela

- [ ] O usuário consegue consultar a evolução corporal sem erro quando houver registros.
- [ ] A ausência de bioimpedância não impede a visualização da tela.

### Tela 3 — Plano

#### Finalidade

Criar e revisar o planejamento alimentar semanal.

#### Elementos principais

- grade semanal;
- tipos de refeição;
- ações de adicionar, editar e remover;
- importação facilitada;
- geração por IA, se ativa;
- ação de aplicar item planejado ao diário.

#### Ações do usuário

- editar o plano semanal;
- importar ou gerar plano;
- aplicar item planejado ao dia atual.

#### Estados necessários

- estado vazio;
- estado de carregamento;
- estado de erro;
- estado de sucesso;
- estado com dados.

#### Critérios de aceite da tela

- [ ] O usuário consegue salvar um plano semanal por dia e tipo de refeição.
- [ ] Itens planejados não entram no diário sem confirmação explícita.

### Tela 4 — Treino

#### Finalidade

Concentrar cadastro, execução e planejamento físico.

#### Elementos principais

- lista de treinos cadastrados;
- agenda semanal;
- área de cardio e passos;
- IA de treino, se ativa;
- ações de registrar execução.

#### Ações do usuário

- cadastrar treino;
- registrar treino executado;
- salvar cardio e passos;
- planejar semana de treino.

#### Estados necessários

- estado vazio;
- estado de carregamento;
- estado de erro;
- estado de sucesso;
- estado com dados.

#### Critérios de aceite da tela

- [ ] O usuário consegue registrar atividade física do dia sem depender de outro módulo.
- [ ] A agenda semanal de treinos permanece separada do registro de execução.

### Tela 5 — Perfil

#### Finalidade

Permitir configuração do usuário e controle dos dados locais.

#### Elementos principais

- formulário de perfil;
- metas e preferências;
- ações de backup, importação e reset;
- atalho claro para a tela principal de histórico.

#### Ações do usuário

- salvar perfil;
- importar backup;
- exportar dados;
- resetar dados locais.

#### Estados necessários

- estado vazio;
- estado de carregamento;
- estado de erro;
- estado de sucesso;
- estado com dados.

#### Critérios de aceite da tela

- [ ] O usuário consegue salvar perfil e gerenciar seus dados locais no mesmo fluxo.
- [ ] O reset exige confirmação explícita antes da execução.

### Tela 6 — Histórico

#### Finalidade

Permitir consulta de dias anteriores e exportação do histórico.

#### Elementos principais

- seletor de data ou calendário;
- resumo do dia selecionado;
- exportação CSV/PDF;
- indicadores de refeição, água, treino, cardio e passos.

#### Ações do usuário

- selecionar data;
- consultar dados anteriores;
- exportar histórico.

#### Estados necessários

- estado vazio;
- estado de carregamento;
- estado de erro;
- estado de sucesso;
- estado com dados.

#### Critérios de aceite da tela

- [ ] Existe um caminho claro para acessar o histórico do produto.
- [ ] A exportação funciona apenas com dados válidos e retorna feedback ao usuário.

---

## 11. Dados e entidades

| Entidade | Finalidade | Campos prováveis | Relações | Observações |
|---|---|---|---|---|
| Perfil do usuário | Personalizar metas e contexto | nome, idade, peso, altura, sexo, nível de atividade, objetivo, tipo de dieta, restrições, dados corporais opcionais | Relaciona-se com metas, histórico corporal e personalização por IA | Metas são calculadas automaticamente e permanecem editáveis manualmente |
| Metas diárias | Comparar o dia com o objetivo | calorias, proteína, carboidratos, gorduras, água | Derivadas do perfil e usadas pelo dashboard | Fórmula oficial precisa ser documentada |
| Refeição | Registrar consumo alimentar | identificador, nome, calorias, proteína, carboidratos, gorduras, data/hora | Pertence ao dia atual ou ao histórico diário | Fluxo manual é obrigatório mesmo sem IA |
| Item planejado de refeição | Planejar alimentação semanal | identificador, dia da semana, tipo de refeição, nome, calorias, proteína, carboidratos, gorduras | Pertence ao plano alimentar semanal | É recomendação, não consumo automático |
| Consumo de água diário | Acompanhar hidratação | data, total em ml | Pertence ao dia atual e ao histórico diário | O modelo atual é agregado por dia |
| Registro de peso | Acompanhar evolução corporal | identificador, peso, data/hora | Relaciona-se ao perfil e ao progresso corporal | Pode coexistir com bioimpedância |
| Registro de bioimpedância | Acompanhar composição corporal | percentual de massa muscular, percentual de gordura, gordura visceral, data/hora | Associado ao registro corporal | Opcional |
| Treino | Cadastrar rotinas | identificador, nome, descrição, tipo, duração estimada | Relaciona-se a exercícios, agenda semanal e execução | Funciona como modelo reutilizável |
| Exercício | Detalhar um treino | identificador, nome, séries, repetições, carga opcional, descanso, observações | Pertence a um treino ou a uma execução | Campo exato de detalhes pode variar sem mudar a regra conceitual |
| Registro de treino executado | Registrar execução real | identificador, referência do treino, data, exercícios executados, duração, humor opcional | Pertence ao dia atual e ao histórico diário | Deve permanecer separado do treino planejado |
| Cardio | Registrar atividade aeróbica | identificador, data, tipo, duração, intensidade, calorias estimadas, velocidade opcional | Pertence ao dia atual e ao histórico diário | Gasto estimado deve seguir abordagem documentada baseada em MET quando houver dados suficientes |
| Passos diários | Registrar movimentação diária | data, total de passos | Pertence ao dia atual e ao histórico diário | MVP assume registro manual e não exige conversão obrigatória para calorias |
| Plano semanal de treino | Organizar a semana física | identificador, treino de referência, dia da semana | Relaciona-se aos treinos cadastrados | Não equivale a treino executado |
| Histórico diário | Consolidar dias anteriores | data, refeições, água, treino executado, cardio, passos | Agrega os registros diários | Deve continuar acessível e exportável |
| Backup local | Preservar e restaurar estado | snapshot dos dados locais, data de geração, versão de schema | Agrupa perfil, metas, histórico e dados atuais | Backup confirmado com schema versionado e validação forte |
| Imagem temporária para IA | Permitir análise de refeição ou equipamento | imagem temporária, contexto da análise, status de processamento | Relaciona-se apenas ao fluxo de IA | Não deve ser persistida localmente por padrão |

---

## 12. Regras de negócio

| Regra | Descrição | Obrigatória? | Critério de aceite |
|---|---|---|---|
| Persistência local | Os dados do MVP devem ser salvos localmente no dispositivo do usuário | Sim | Após recarregar o app, os dados locais permanecem disponíveis |
| Operação sem login | O MVP não depende de conta para uso básico | Sim | O usuário completa os fluxos centrais sem autenticação |
| Offline para dados já salvos | Dados locais devem continuar acessíveis offline; IA depende de conexão | Sim | Em modo offline, o usuário consulta dados salvos; IA exibe indisponibilidade sem quebrar o app |
| Arquivamento por mudança de dia | O dia anterior deve ser arquivado no histórico quando a data mudar | Sim | Dados do dia anterior ficam consultáveis e não são apagados silenciosamente |
| Planos não são execução | Plano alimentar e plano de treino não preenchem o diário automaticamente | Sim | Nenhum item planejado aparece como consumo ou treino executado sem ação explícita |
| Revisão obrigatória da IA | Toda sugestão de IA precisa ser revisada antes de ser salva | Sim | O fluxo de IA sempre exige confirmação explícita do usuário |
| Imagem não persistida | Imagens usadas em IA não devem ser armazenadas localmente por padrão | Sim | Após a análise, a imagem não fica disponível como dado persistido |
| Bioimpedância opcional | O sistema deve aceitar uso sem bioimpedância | Sim | O usuário salva perfil e progresso sem preencher bioimpedância |
| Dieta e treino com mesmo peso | A navegação principal e o escopo do MVP devem tratar dieta e treino como pilares equivalentes | Sim | Há acesso de primeiro nível tanto para dieta quanto para treino |
| Histórico acessível | O produto deve ter um fluxo claro para consulta de histórico e exportação | Sim | Um usuário novo encontra histórico sem depender de caminho oculto |
| Importação segura | Backup inválido não pode sobrescrever estado válido | Sim | Arquivo inválido é rejeitado e os dados atuais permanecem intactos |
| Reset com confirmação | Reset local só pode acontecer após confirmação explícita | Sim | O reset não é executado por toque acidental |
| Fórmulas não podem ser inventadas | O produto deve usar Mifflin-St Jeor para meta calórica automática; cardio só pode gerar gasto com abordagem documentada baseada em MET quando houver dados suficientes; sem base suficiente, o app não deve inventar kcal | Sim | Não há cálculo novo sem regra documentada |
| Preparação futura sem dependência atual | A modelagem pode ser preparada para evolução com Supabase, autenticação e sync sem exigir backend no MVP | Sim | O MVP funciona integralmente sem autenticação, sync ou nuvem |
| IA em build público exige proteção | Como a IA permanece ativa no MVP, qualquer build público com IA deve usar camada server-side/proxy e manter o segredo fora do cliente | Sim | Não existe uso público de IA com segredo exposto no front-end |

---

## 13. Permissões e papéis de usuário

| Papel | Permissões | Restrições | Observações |
|---|---|---|---|
| Usuário individual comum | Registrar refeições, água, peso, bioimpedância opcional, treino, cardio, passos, consultar progresso, usar plano semanal, exportar/importar backup, usar IA se ativa | Não acessa dados de terceiros; não possui sync automático; não depende de conta | Papel confirmado para o MVP |
| Usuário individual avançado | Mesmas permissões do usuário comum, com uso mais frequente de planejamento e personalização | Mesmas restrições do usuário comum | Papel confirmado para o MVP; diferença atual é de uso, não de permissão |

`Ponto de decisão`: não há papel administrador, profissional, cliente ou colaborador confirmado para o MVP. Se o produto evoluir para multiusuário, a matriz de permissões precisará ser redesenhada.

---

## 14. Integrações

| Integração | Finalidade | Status | Risco | Observação |
|---|---|---|---|---|
| Gemini / Google GenAI | Analisar refeições, gerar/importar dietas e treinos, sugerir conteúdos relacionados, analisar equipamento | Confirmada | Alto | Ativa no MVP como assistência revisável; fase pública exige proxy/camada server-side |
| Câmera do dispositivo | Capturar imagem para fluxos de IA | Confirmada | Médio | Requer permissão do usuário |
| PWA / service worker | Instalação e experiência app-like | Confirmada | Médio | Deve coexistir com funcionamento local-first |
| Exportação PDF | Gerar arquivo exportável do histórico | Confirmada | Médio | Formato final e escopo de dados ainda precisam de consolidação |
| Exportação CSV | Gerar arquivo exportável do histórico | Confirmada | Baixo | Faz parte do controle local de dados |
| Proxy ou camada server-side para IA | Proteger chave e validar payloads em cenário público | Obrigatória para fase pública | Alto | Gate obrigatório antes de qualquer release público com IA |
| Autenticação | Permitir conta e possível sync | Futuro | Alto | Fora do MVP atual |
| Armazenamento em nuvem | Permitir sincronização multi-dispositivo | Futuro | Alto | Fora do MVP atual |
| Supabase | Possível caminho futuro para auth, sync e armazenamento | Hipótese | Médio | Direção futura, não requisito do MVP |

---

## 15. Requisitos não funcionais

### 15.1. Desempenho

- A atualização visual de ações locais simples, como adicionar refeição, água, passos ou treino, deve ocorrer sem atraso perceptível ao usuário.
- O app não deve travar nem congelar ao lidar com estados vazios, dados salvos ou falhas de IA.
- O orçamento exato de bundle e tempo de carregamento ainda é `Ponto de decisão`, mas o MVP deve priorizar boa experiência em uso mobile comum.

### 15.2. Responsividade

- O produto deve funcionar prioritariamente em telas mobile, sem quebrar em desktop.
- Os principais fluxos do MVP devem permanecer utilizáveis em largura mínima típica de smartphone.
- Navegação, botões e áreas de toque devem continuar acessíveis em light e dark mode.

### 15.3. Segurança

- Dados pessoais e corporais devem permanecer locais por padrão no MVP.
- O sistema deve validar importações antes de sobrescrever estado local.
- Ações destrutivas devem exigir confirmação explícita.
- Se a IA ficar ativa em ambiente público, o segredo de acesso não pode ficar exposto no cliente.
- O produto deve deixar claro que IA é assistiva e não substitui orientação profissional.

### 15.4. Manutenibilidade

- Regras de cálculo relevantes devem estar documentadas antes de qualquer alteração.
- A estrutura conceitual de dados deve suportar versionamento futuro de backup e evolução para sync.
- Funcionalidades ou componentes não confirmados para o MVP não devem ser promovidos a requisito sem decisão humana.
- Fluxos críticos de cálculo, persistência e importação devem ser verificáveis antes de novas expansões de escopo.

### 15.5. Acessibilidade

- Textos, botões e indicadores devem manter contraste legível em tema claro e escuro.
- A interface deve ter estados vazios e mensagens de erro compreensíveis.
- Ícones essenciais devem ter apoio textual ou contexto suficiente para uso sem ambiguidade.

### 15.6. Confiabilidade

- Reabrir o app não deve apagar dados do usuário.
- Dados de um dia anterior não devem sumir na mudança de data.
- Falhas de IA não devem comprometer os fluxos manuais.
- Importação inválida não deve corromper dados válidos existentes.

### 15.7. Compatibilidade

- O MVP deve funcionar como PWA em navegadores modernos compatíveis com instalação e armazenamento local.
- O produto deve suportar uso em português com textos consistentes e sem strings de protótipo ou encoding quebrado.
- Internacionalização fica fora do MVP, salvo decisão humana posterior.

---

## 16. Critérios de aceite gerais

| Critério | Como verificar | Obrigatório para MVP? |
|---|---|---|
| Perfil pode ser salvo e reaberto | Salvar perfil, recarregar o app e conferir persistência | Sim |
| Refeição manual atualiza o dia | Adicionar refeição e verificar atualização imediata dos totais | Sim |
| Água atualiza a meta do dia | Registrar água e conferir o progresso exibido | Sim |
| Peso e bioimpedância opcional funcionam | Salvar peso com e sem bioimpedância e consultar depois | Sim |
| Treino, cardio e passos entram no dia atual | Registrar atividade física e verificar reflexo no resumo diário | Sim |
| Plano alimentar não vira consumo automático | Criar plano semanal e confirmar que nada entra no diário sem ação explícita | Sim |
| Plano de treino não vira treino executado | Associar treino à semana e confirmar separação entre agenda e execução | Sim |
| Histórico é acessível por fluxo claro | Um usuário consegue encontrar dias anteriores sem caminho escondido | Sim |
| Exportação de histórico funciona | Exportar dados válidos e receber feedback de sucesso | Sim |
| Importação inválida é bloqueada com segurança | Tentar importar arquivo inválido e confirmar que dados atuais permanecem intactos | Sim |
| Reset exige confirmação explícita | Tentar resetar e confirmar necessidade de ação deliberada | Sim |
| Offline preserva leitura dos dados locais | Desconectar após salvar dados e consultar o conteúdo já persistido | Sim |
| IA exige revisão antes de salvar | Executar um fluxo de IA e verificar confirmação manual antes do salvamento | Sim |
| Imagens de IA não ficam salvas localmente | Fazer uma análise por imagem e verificar ausência de persistência local da imagem | Sim |
| IA em cenário público não expõe segredo no cliente | Validar proxy/camada server-side antes de release público | Sim |

---

## 17. Riscos e mitigação

| Risco | Tipo | Impacto | Probabilidade | Mitigação |
|---|---|---|---|---|
| Chave de IA exposta em build público | Segurança | Alto | Alta | Não permitir IA pública sem proteção aprovada; tratar como bloqueio de release |
| Dados sensíveis armazenados localmente em dispositivo compartilhado | Segurança | Alto | Média | Exibir limites de privacidade local e evitar promessas de proteção inexistentes |
| Sugestões de IA interpretadas como orientação profissional | Produto | Alto | Alta | Exigir revisão humana, linguagem cautelosa e avisos claros |
| Importação de backup inválido corromper estado | Técnico | Alto | Alta | Validar estrutura antes de importar e bloquear arquivos inválidos |
| Falta de testes em cálculos e persistência | Técnico | Alto | Alta | Tratar fluxos críticos como verificações obrigatórias antes de novas expansões |
| Fórmulas de metas e gasto calórico ficarem ambíguas | Produto | Alto | Média | Documentar a regra aprovada e proibir nova fórmula sem decisão humana |
| Histórico ficar escondido ou difícil de acessar | UX | Médio | Média | Tornar o fluxo de histórico explícito e verificável no MVP |
| Escopo crescer para login, sync e backend cedo demais | Escopo | Alto | Alta | Manter esses itens fora do MVP e marcados como futura evolução |
| Dependências frágeis afetarem exportação ou estabilidade | Técnico | Médio | Média | Revisar uso das integrações atuais antes de ampliar escopo funcional |
| Excesso de funcionalidades reduzir clareza do produto | Produto | Médio | Média | Priorizar o problema central de registro, planejamento e progresso |
| Componentes não integrados gerarem escopo fantasma | Manutenção | Médio | Média | Remover componentes mortos do caminho crítico e evitar promover experimentos sem caso de uso claro |
| Uso de IA depender de conexão sem comunicação clara | UX | Médio | Alta | Exibir indisponibilidade contextual sem comprometer fluxos locais |
| Preparação prematura para Supabase influenciar a arquitetura do MVP | Escopo | Médio | Média | Limitar a preparação a compatibilidade conceitual, sem dependência de nuvem |
| Produto parecer protótipo e reduzir confiança | Produto | Médio | Média | Garantir textos consistentes, títulos corretos e estados de erro confiáveis |

---

## 18. Métricas de sucesso

As métricas abaixo combinam um sinal confirmado e hipóteses recomendadas para avaliação. Como o MVP atual é local-first e sem backend obrigatório, a coleta exata dessas métricas ainda depende de decisão de instrumentação.

### Métricas de uso

- Confirmada: percepção de progresso físico ao longo do tempo.
- Hipótese: frequência semanal de uso com pelo menos um registro diário.
- Hipótese: taxa de usuários que completam perfil e continuam usando o dashboard.
- Hipótese: taxa de uso de planejamento semanal em relação ao registro diário.

### Métricas de eficiência

- Hipótese: tempo médio para registrar uma refeição manual.
- Hipótese: tempo médio para registrar uma refeição com IA.
- Hipótese: número de interações necessárias para exportar ou importar backup.
- Hipótese: taxa de aplicação de itens planejados ao diário sem retrabalho.

### Métricas de qualidade

- Hipótese: taxa de conclusão sem erro dos fluxos de refeição, água, treino e backup.
- Hipótese: taxa de rejeição segura de backups inválidos.
- Hipótese: taxa de revisão manual de sugestões de IA antes do salvamento.
- Hipótese: incidência de inconsistências percebidas em metas, macros e gasto estimado.

### Métricas de negócio

- Hipótese: retenção de uso recorrente como app pessoal de rotina.
- Hipótese: percepção de centralização do processo que antes era espalhado em múltiplas ferramentas.
- Hipótese: confiança do usuário no acompanhamento diário e histórico.
- Hipótese: decisão futura sobre publicação pública só deve avançar se os riscos de segurança e responsabilidade estiverem reduzidos.

---

## 19. Pontos ainda pendentes

| Ponto pendente | Por que importa | Impacto se não decidir | Prioridade |
|---|---|---|---|
| Texto final e posicionamento dos avisos legais e de privacidade local | Define clareza, responsabilidade e percepção de confiança no uso real | O produto pode ficar certo em regra, mas fraco em comunicação | Alta |
| Campos finais e layout da exportação em CSV/PDF | Afeta utilidade prática do histórico exportado | O fluxo pode existir, mas entregar pouco valor | Média |
| Tipos de refeição padrão do planejamento alimentar | Afeta consistência da experiência de plano semanal | O fluxo pode sair funcional, mas inconsistente entre usuários | Média |
| Nível final de detalhamento gráfico e filtros da tela de progresso | Afeta clareza analítica e custo de implementação | Pode haver excesso ou falta de informação | Média |
| Necessidade de onboarding dedicado após validação do primeiro uso | Afeta primeira experiência sem inflar o MVP agora | Pode haver retrabalho de UX em V1 | Baixa |

---

## 20. Resumo para o agente de implementação

### 20.1. Objetivo da implementação

Entregar o MVP local-first do NutriTrack para uso individual, com foco em registro diário, planejamento semanal, progresso corporal e controle local de dados, mantendo IA ativa como assistência revisável e deixando explícitos os gates da fase pública futura.

### 20.2. O que implementar no MVP

- Perfil do usuário e metas diárias.
- Dashboard diário com água, refeições e resumo.
- Registro manual de refeições.
- Registro de peso e bioimpedância opcional.
- Registro de treinos, cardio e passos.
- Planejamento alimentar semanal com aplicação manual ao diário.
- Planejamento semanal de treinos.
- Histórico, progresso e exportação.
- Backup, importação segura e reset local.
- Operação local-first e uso offline para dados salvos.
- IA existente mantida ativa no MVP sob revisão humana obrigatória.

### 20.3. O que não implementar

- Login obrigatório.
- Sync multi-dispositivo.
- Modo profissional.
- Monetização.
- Scanner dedicado de código de barras com base de alimentos.
- Biblioteca ampla de alimentos ou exercícios.
- Gamificação.
- Comunidade, marketplace ou recursos sociais.
- Qualquer backend obrigatório para o MVP, salvo decisão humana nova.

### 20.4. Regras críticas

- Planos de dieta e treino são recomendações, não registros automáticos.
- Toda saída de IA exige revisão humana antes do salvamento.
- Imagens de IA não devem ser persistidas localmente por padrão.
- Bioimpedância é opcional.
- Dados locais devem permanecer acessíveis offline.
- O cálculo automático de calorias deve seguir Mifflin-St Jeor com multiplicador de atividade e ajuste por objetivo.
- O produto não pode inventar fórmulas novas para gasto energético; cardio só estima kcal com regra documentada e passos não exigem kcal automática no MVP.

### 20.5. Telas obrigatórias

- Início.
- Progresso.
- Plano.
- Treino.
- Perfil.
- Histórico.
- Avisos contextuais de IA e privacidade.

### 20.6. Entidades principais

- Perfil do usuário.
- Metas diárias.
- Refeição.
- Plano alimentar semanal.
- Registro de peso e bioimpedância.
- Treino e exercício.
- Registro de treino executado.
- Cardio.
- Passos diários.
- Histórico diário.
- Backup local.

### 20.7. Critérios de aceite essenciais

- Usuário registra refeição manual e vê o dia atualizado.
- Usuário registra água e vê o progresso diário.
- Usuário registra treino/cardio/passos e consulta o impacto no dia.
- Usuário salva e consulta plano alimentar e plano de treino sem preenchimento automático.
- Histórico é acessível por fluxo claro.
- Backup inválido não corrompe o estado local.
- Offline mantém leitura dos dados já salvos.
- IA só salva após revisão humana.

### 20.8. Pontos que o coder não deve decidir sozinho

- Texto final dos avisos legais, de privacidade local e de revisão obrigatória.
- Campos finais e layout de exportação CSV/PDF.
- Tipos de refeição padrão do plano semanal.
- Nível final de detalhamento gráfico da tela de progresso.

---

## 21. Checklist de qualidade do PRD

| Item | Status | Observação |
|---|---|---|
| Escopo claro | OK | O MVP local-first está definido e a fase pública futura ficou tratada como etapa posterior com gates explícitos |
| Regras claras | OK | As regras centrais do MVP e os limites de IA já estão documentados em nível suficiente para implementação |
| Critérios de aceite claros | OK | Há critérios verificáveis por funcionalidade, tela e produto |
| Telas definidas | OK | O conjunto principal está definido e o histórico foi fixado como tela principal de primeiro nível |
| Dados definidos | Parcial | Entidades conceituais estão mapeadas; ainda faltam fechar detalhes finais de exportação e apresentação |
| Riscos mapeados | OK | Riscos técnicos, de produto, escopo, UX, segurança e manutenção estão registrados com mitigação |
| Fora de escopo definido | OK | Itens que não entram agora estão explicitamente listados |
| MVP separado de V1 e futuras melhorias | OK | O MVP foi isolado e os itens secundários/futuros foram segregados |
| Pontos de decisão identificados | OK | As ambiguidades relevantes foram consolidadas em seção própria |
| Pronto para virar plano de implementação | OK | Pronto para planejar e implementar o MVP local-first; a fase pública futura já ficou condicionada a hardening adicional |
