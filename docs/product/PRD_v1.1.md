# PRD — NutriTrack

## 1. Resumo executivo

NutriTrack é um produto brownfield mobile-first para uso pessoal no acompanhamento de alimentação, hidratação, treino, cardio, passos, peso e bioimpedância, com apoio opcional de IA para reduzir esforço de cadastro e planejamento.

O produto é voltado para usuário individual comum e usuário individual avançado. No MVP atual, a diferença entre essas personas é comportamental e de profundidade de uso, não de permissões ou fluxos separados.

O problema central que o produto resolve é a fragmentação entre registros manuais, planilhas e apps separados. O MVP consolida acompanhamento diário, planejamento semanal, progresso corporal, histórico e controle local dos dados em um único fluxo local-first, sem conta obrigatória.

O escopo geral confirmado do MVP é:

- persistência local no dispositivo;
- uso sem login;
- funcionamento offline para dados locais;
- registro manual de alimentação e treino;
- planejamento semanal de dieta e treino;
- histórico, exportação, backup, importação e reset local;
- IA ativa como assistência revisável, nunca como salvamento automático nem como prescrição profissional.

Após a revisão crítica, este PRD consolidou:

- campos obrigatórios, opcionais e validações mínimas de perfil e refeição manual;
- regra operacional mínima de arquivamento por mudança de dia;
- escopo mínimo de exportação CSV/PDF;
- conjunto mínimo da tela de progresso;
- contrato operacional mínimo dos avisos de IA e privacidade;
- fronteira entre Histórico e Progresso;
- remoção de vazamento de escopo de “análise de equipamento” do MVP documentado.

Pontos críticos ainda pendentes de decisão humana:

- confirmação do comportamento oficial de snapshot histórico das metas do dia;
- aprovação do texto final dos avisos de IA e privacidade local.

---

## 2. Objetivo do produto

### Objetivo principal

Permitir que um usuário individual acompanhe e planeje sua rotina de alimentação e treino em um app mobile-first local-first, com registros diários, histórico, metas e apoio opcional de IA como recomendação revisável, sem substituir orientação profissional.

### Objetivos secundários

- Centralizar em um único produto os registros de refeição, água, peso, bioimpedância, treino, cardio e passos.
- Reduzir a fricção de cadastro manual com recursos assistidos por IA, mantidos sob revisão humana obrigatória.
- Permitir planejamento semanal de dieta e treino com aplicação manual ao dia.
- Preservar dados localmente com backup, exportação e importação.
- Apoiar acompanhamento de progresso físico ao longo do tempo.
- Manter o MVP preparado para futura evolução estrutural com autenticação, sincronização e possível uso de Supabase, sem exigir isso agora.

### Objetivos fora do MVP

- Conta obrigatória.
- Sincronização multi-dispositivo.
- Modo profissional para nutricionista, personal trainer, clínica ou atendimento de terceiros.
- Monetização.
- Biblioteca ampla de alimentos ou exercícios.
- Gamificação.
- Estratégia pública multiusuário com backend obrigatório nesta fase.

---

## 3. Problema a resolver

O problema principal é a dispersão dos dados de saúde e fitness do usuário entre anotações, memória, planilhas e apps diferentes, combinada com a fricção de registrar manualmente refeições, hidratação, treinos e progresso corporal.

Impacto do problema:

- baixa consistência no acompanhamento diário;
- dificuldade de comparar consumo e atividade com metas;
- perda de contexto histórico;
- maior chance de abandono do hábito por excesso de trabalho manual;
- risco de decisões ruins quando o usuário não consegue visualizar progresso com clareza.

Como o problema parece ser resolvido hoje:

- não foi informado diretamente no pré-PRD;
- pela análise do produto existente, a resolução atual provavelmente ocorre com apps separados, anotações manuais, planilhas ou memória.

Por que o produto é necessário:

- já existe um brownfield funcional com valor claro de centralização;
- há recursos de IA que podem reduzir esforço operacional do usuário;
- o produto cobre tanto rotina alimentar quanto rotina física, e esses pilares têm o mesmo peso no MVP.

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
- Observações: sensível a fluxos longos e a excesso de detalhe; no MVP usa os mesmos fluxos e permissões da persona avançada.

### Persona 2 — Usuário individual avançado

- Perfil: pessoa que quer maior controle sobre macros, planejamento semanal e organização de treinos.
- Necessidade principal: planejar e reaproveitar rotina alimentar e física com mais precisão.
- Dor principal: estruturar dieta e treino com baixo atrito.
- O que precisa realizar no produto: planejar semana, registrar execução, revisar sugestões de IA, acompanhar progresso corporal e histórico.
- Nível técnico esperado: médio.
- Observações: espera mais flexibilidade de edição e tolera mais detalhe na interface; no MVP não recebe permissões especiais.

---

## 5. Escopo do MVP

| Item do MVP | Descrição | Justificativa | Critério de aceite |
|---|---|---|---|
| Perfil e metas | Cadastro de perfil pessoal com cálculo automático de metas e edição manual das metas | Necessário para personalização do restante do produto | O usuário salva perfil, recarrega o app e reencontra perfil e metas persistidos |
| Dashboard diário e hidratação | Visão consolidada do dia atual com metas, consumo, água e indicadores físicos | É a tela central do uso recorrente | O usuário entende o estado do dia atual sem precisar abrir múltiplas telas e consegue registrar água no fluxo principal |
| Registro manual de refeições | Cadastro manual de refeição com nome, calorias e macros opcionais | Garante funcionamento da dieta mesmo sem IA | O usuário salva, visualiza e remove refeição com atualização imediata do dia |
| Assistência de IA para alimentação | Análise por texto/imagem e geração/importação de dieta como recomendação revisável | Reduz atrito sem substituir o fluxo manual | Nenhum resultado de IA é salvo sem revisão e confirmação explícita |
| Planejamento alimentar semanal | Organização de refeições por dia e tipo, com aplicação manual ao dia | O produto precisa planejar, não apenas registrar | O usuário salva plano semanal e adiciona itens ao dia somente após ação explícita |
| Registro corporal e progresso | Registro de peso e bioimpedância opcional com visualização agregada de progresso | O produto precisa apoiar evolução física | O usuário consegue registrar peso com ou sem bioimpedância e consultar progresso sem erro |
| Registro de treinos, cardio e passos | Cadastro de treinos executados, cardio e passos com reflexo no dia | Treino e dieta têm o mesmo peso no produto | O usuário registra atividade física e consulta o reflexo no dia atual e no histórico |
| Planejamento semanal de treinos | Agenda semanal de treinos separada da execução real | Complementa o pilar de treino | O usuário salva agenda semanal e ela não vira treino executado automaticamente |
| Histórico e exportação | Consulta de dias anteriores e exportação do recorte mínimo do MVP | Histórico e portabilidade são parte do valor central | O usuário acessa dias anteriores e exporta os últimos 7 dias em CSV/PDF com feedback claro |
| Backup, importação e reset local | Backup local, restauração segura e reset com confirmação forte | Essencial em um MVP local-first sem conta | Backup inválido é rejeitado sem corromper dados; reset só ocorre após confirmação explícita |
| Operação local-first e PWA | Persistência local confiável, leitura offline e experiência instalável | É a direção confirmada do MVP | Dados locais continuam acessíveis após recarregar o app e em modo offline |

---

## 6. Fora de escopo

| Fora de escopo | Motivo | Pode voltar no futuro? |
|---|---|---|
| Login obrigatório | Muda arquitetura, privacidade e suporte do MVP | Sim |
| Sincronização multi-dispositivo | Exige autenticação, backend e governança de dados | Sim |
| Modo profissional para nutricionista, personal ou clínica | Muda público, permissões e responsabilidade | Sim |
| Monetização e cobrança | Não há decisão de negócio aprovada | Sim |
| Scanner dedicado de código de barras com base própria de alimentos | Aumenta escopo e dependências do MVP | Sim |
| Biblioteca ampla de alimentos | Não foi confirmada como necessidade do MVP | Sim |
| Biblioteca ampla de exercícios | Não foi confirmada como necessidade do MVP | Sim |
| Gamificação, comunidade e recursos sociais | Distraem do valor central e incham o escopo | Sim |
| Sincronização em nuvem via Supabase | Supabase é direção futura, não requisito atual | Sim |
| `CoachInsights` como funcionalidade ativa | Saiu do escopo atual do MVP | Só volta com caso de uso claro |
| Tela dedicada de receitas por IA | É útil, mas secundária em relação a registro e planejamento | Sim |
| Relatórios semanais e mensais avançados além do recorte mínimo | Não são necessários para a primeira entrega funcional | Sim |
| OCR dedicado e parsing avançado de layout para `.doc` e `.pdf` | Aumenta complexidade técnica e foge do MVP local-first | Sim |
| Análise de equipamento por IA | Existe no brownfield, mas não está aprovada como fluxo obrigatório do MVP documentado | Requer decisão |
| Fase pública com IA sem proxy/camada server-side | Viola regra de segurança já decidida | Não |

---

## 7. Funcionalidades principais

### 7.1. Perfil e metas

#### Objetivo

Permitir que o usuário informe dados pessoais e objetivo para que o produto personalize metas diárias e contexto de uso.

#### Comportamento esperado

O usuário salva um perfil local com dados pessoais e preferências. O sistema calcula metas diárias automáticas, exibe essas metas no produto e permite edição manual posterior sem exigir login.

#### Regras de negócio relacionadas

- Campos obrigatórios do perfil no MVP: nome, idade, peso atual e altura.
- Campos obrigatórios com seleção padrão no MVP: gênero biológico, nível de atividade física, objetivo principal e tipo de dieta.
- Campos opcionais: restrições ou sugestões alimentares, percentual de massa muscular, percentual de gordura corporal, gordura visceral e macros customizados quando o tipo de dieta for `custom`.
- Idade, peso e altura devem ser números válidos maiores que zero.
- Se o tipo de dieta for `custom`, os campos de macros customizados devem aceitar apenas números maiores ou iguais a zero.
- A meta calórica automática do MVP deve usar a lógica já aprovada com equação de Mifflin-St Jeor, multiplicador de atividade e ajuste por objetivo.
- A meta de água deve seguir a lógica operacional atual baseada no peso e continuar editável manualmente.
- Metas automáticas devem continuar editáveis manualmente pelo usuário.
- Bioimpedância é opcional e não pode bloquear o salvamento do perfil.

#### Critérios de aceite

- [ ] O usuário consegue salvar o perfil com os campos obrigatórios e reencontrá-lo após recarregar o app.
- [ ] O sistema calcula metas automáticas após o salvamento e permite edição manual posterior.
- [ ] Campos opcionais de bioimpedância podem ficar vazios sem impedir o uso do produto.

#### Pontos de decisão

- O histórico do dia deverá guardar snapshot das metas vigentes do dia ou poderá consultar a meta atual do perfil para comparações históricas.

#### Riscos

- Fórmulas mal documentadas podem gerar metas incoerentes.
- Campos excessivos no perfil podem aumentar abandono inicial.

---

### 7.2. Dashboard diário e hidratação

#### Objetivo

Oferecer uma visão consolidada do dia e um fluxo rápido para acompanhar progresso alimentar, hídrico e físico.

#### Comportamento esperado

Ao abrir o app, o usuário vê o estado do dia atual, com metas, consumo, progresso de água e indicadores resumidos de treino, cardio e passos. Quando ainda não houver perfil salvo, o dashboard deve orientar o usuário a configurar o perfil antes de interpretar metas como definitivas.

#### Regras de negócio relacionadas

- A tela inicial deve priorizar o dia atual.
- O registro de água é cumulativo no dia.
- O dashboard deve ter estado vazio claro quando ainda não houver dados.
- O dashboard deve continuar acessível offline para os dados locais.
- Dieta e treino devem aparecer como pilares equivalentes da navegação principal.

#### Critérios de aceite

- [ ] A tela inicial mostra metas e progresso do dia atual sem exigir navegação extra.
- [ ] O usuário consegue registrar água e ver o total diário atualizado imediatamente.
- [ ] Quando não houver dados do dia, a interface exibe estado vazio claro e indica a próxima ação.

#### Pontos de decisão

- Nenhum ponto crítico adicional identificado.

#### Riscos

- Excesso de indicadores pode reduzir clareza.
- Estado vazio fraco pode travar o primeiro uso.

---

### 7.3. Registro manual de refeições

#### Objetivo

Permitir o registro alimentar sem dependência de IA, garantindo um fluxo confiável e direto.

#### Comportamento esperado

O usuário adiciona uma refeição ao dia atual, informando obrigatoriamente nome e calorias. Proteína, carboidratos e gorduras podem ser informados manualmente ou ficar zerados quando não forem conhecidos. Quando o fluxo partir de uma base nutricional reaproveitada, o usuário pode ajustar a porção em gramas e o sistema recalcula os valores proporcionalmente.

#### Regras de negócio relacionadas

- O fluxo manual deve existir mesmo que IA esteja indisponível.
- Campos obrigatórios do registro manual: nome do alimento e calorias.
- Campos opcionais do registro manual: proteína, carboidratos e gorduras.
- Campos numéricos não podem aceitar valores negativos.
- Se proteína, carboidratos ou gorduras não forem informados, o sistema deve persistir o valor `0`.
- O ajuste proporcional de porção deve usar a fórmula `valor_base * (porção_consumida / 100)`.
- Quando houver recálculo proporcional, calorias e macros devem ser arredondados para inteiro pelo arredondamento matemático padrão.
- O sistema deve atualizar o dashboard imediatamente após salvar ou remover a refeição.

#### Critérios de aceite

- [ ] O usuário consegue adicionar uma refeição manual com nome e calorias, mesmo sem usar IA.
- [ ] Ao salvar, calorias e macros do dia são recalculados e exibidos no dashboard.
- [ ] O usuário consegue remover a refeição e ver o resumo diário corrigido.

#### Pontos de decisão

- Nenhum ponto crítico adicional identificado.

#### Riscos

- Cálculo incorreto de porção compromete confiança.
- Omissão frequente de macros pode reduzir o valor analítico da tela de progresso.

---

### 7.4. Assistência de IA para alimentação

#### Objetivo

Reduzir a fricção de cadastro e planejamento alimentar com análise e geração assistidas, sempre como recomendação revisável.

#### Comportamento esperado

O usuário pode analisar refeição por texto ou imagem, importar dieta própria por texto legível ou gerar plano alimentar com IA. Em todos os casos, o sistema devolve uma estrutura revisável antes de qualquer salvamento.

#### Regras de negócio relacionadas

- Toda saída de IA deve passar por revisão humana antes do salvamento.
- O aviso contextual de IA deve aparecer em todos os fluxos de IA alimentar antes do envio de dados e deve reaparecer no momento da revisão do resultado.
- O aviso contextual mínimo deve cobrir: resultado estimado e revisável, não substitui nutricionista/médico/treinador, IA depende de conexão e imagens não ficam persistidas localmente por padrão.
- O fluxo de IA deve ter fallback manual claro quando a IA estiver indisponível, sem bloquear o produto.
- Imagens enviadas para IA não devem ser persistidas localmente por padrão.
- A importação facilitada de dieta própria aceita texto colado e arquivos `.doc`, `.md`, `.txt` e `.pdf` somente quando o conteúdo puder ser tratado como texto extraível; OCR e layout complexo ficam fora do MVP.
- O produto não deve apresentar IA como orientação profissional ou prescrição clínica.

#### Critérios de aceite

- [ ] No fluxo de IA, o usuário visualiza e pode editar o resultado antes de confirmar o salvamento.
- [ ] Quando a IA falha ou a conexão está indisponível, o usuário recebe erro claro e continua podendo usar o fluxo manual.
- [ ] Imagens usadas para análise não permanecem salvas localmente por padrão após o fluxo.

#### Pontos de decisão

- Aprovação do texto final dos avisos de IA e privacidade local.

#### Riscos

- Respostas incorretas ou malformadas podem gerar perda de confiança.
- O usuário pode interpretar a saída como prescrição nutricional.

---

### 7.5. Planejamento alimentar semanal

#### Objetivo

Permitir que o usuário organize refeições por dia e tipo como recomendação reutilizável, sem preencher automaticamente o diário.

#### Comportamento esperado

O usuário cria, edita, importa ou gera um plano alimentar semanal por dia da semana e tipo de refeição. Itens do plano podem ser aplicados manualmente ao dia atual com poucos toques, mas nunca entram automaticamente como consumo realizado.

#### Regras de negócio relacionadas

- Plano alimentar é recomendação, não registro consumido.
- O usuário mantém liberdade total para registrar refeições manualmente fora do plano.
- Tipos de refeição padrão do MVP: café da manhã, almoço, lanche e jantar.
- Todo item importado ou gerado deve poder ser editado antes do salvamento.
- A aplicação do plano ao diário deve ser explícita e manual.
- O plano semanal deve permanecer salvo localmente.

#### Critérios de aceite

- [ ] O usuário consegue criar ou revisar refeições planejadas por dia e tipo.
- [ ] Itens planejados só entram no diário após ação explícita do usuário.
- [ ] O plano semanal permanece disponível após fechar e reabrir o app.

#### Pontos de decisão

- Nenhum ponto crítico adicional identificado.

#### Riscos

- Confusão entre planejamento e consumo real.
- Fluxo rígido demais pode frustrar o usuário avançado.

---

### 7.6. Registro corporal e progresso

#### Objetivo

Acompanhar evolução física do usuário ao longo do tempo com foco em peso e, opcionalmente, bioimpedância.

#### Comportamento esperado

O usuário consegue registrar peso atual e dados corporais opcionais. A área de progresso deve exibir, no mínimo, tendência de calorias dos últimos 7 dias comparada à meta atual, frequência de treinos dos últimos 7 dias, evolução de peso por medições registradas, tendência de bioimpedância quando houver dados e distribuição de macros do dia atual.

#### Regras de negócio relacionadas

- Peso é parte do acompanhamento corporal do MVP.
- Bioimpedância é opcional.
- A tela de progresso é leitura agregada e comparativa; a tela de histórico é consulta por data/dia.
- O MVP não exige filtros avançados além do conjunto mínimo já definido.
- A ausência de bioimpedância não pode quebrar a tela de progresso.
- Quando não houver dados suficientes, a tela deve mostrar estado vazio claro em vez de erro.

#### Critérios de aceite

- [ ] O usuário consegue salvar peso com ou sem dados de bioimpedância.
- [ ] A tela de progresso exibe o conjunto mínimo de métricas aprovado sem depender de filtros avançados.
- [ ] A ausência de bioimpedância não causa erro em gráficos ou resumos.

#### Pontos de decisão

- Comparações históricas que envolvem metas diárias devem usar snapshot das metas do dia ou a meta atual do perfil.

#### Riscos

- Visualizações confusas podem reduzir valor do histórico.
- Recalcular passado com metas atuais pode distorcer confiança no progresso.

---

### 7.7. Registro de treinos, cardio e passos

#### Objetivo

Permitir acompanhamento diário da rotina física com reflexo no progresso e nas metas do dia.

#### Comportamento esperado

O usuário cadastra treinos, registra execução, informa passos e registra cardio com dados mínimos suficientes. O sistema atualiza o dia atual e exibe o impacto no resumo diário, mantendo separação clara entre rotina planejada e rotina realizada.

#### Regras de negócio relacionadas

- Treino e dieta têm o mesmo peso no produto.
- Passos podem ser registrados manualmente como número inteiro maior ou igual a zero.
- Cardio exige, no mínimo, tipo de atividade, duração em minutos maior que zero e intensidade.
- Velocidade ou outros detalhes de cardio são opcionais.
- Cardio só deve gerar gasto energético automático quando houver base documentada suficiente para uma estimativa alinhada à regra aprovada baseada em MET.
- Passos devem permanecer visíveis no resumo diário mesmo quando não houver base confiável para inferir calorias.
- O produto não deve inventar fórmula nova para gasto energético de treino de força, cardio ou passos.
- Treino de força deve registrar execução e histórico sem exigir cálculo calórico automático no MVP.

#### Critérios de aceite

- [ ] O usuário consegue registrar treino executado no dia atual.
- [ ] O usuário consegue salvar passos e cardio e ver esses dados refletidos no resumo do dia.
- [ ] O sistema mantém consistência entre registro físico diário e consulta posterior no histórico.

#### Pontos de decisão

- Nenhum ponto crítico adicional identificado.

#### Riscos

- Estimativas inconsistentes podem minar confiança no produto.
- Misturar plano e execução pode gerar erro de interpretação.

---

### 7.8. Planejamento e geração de treinos

#### Objetivo

Organizar a rotina semanal de treino e usar IA para importar ou gerar planos de treino dentro das regras aprovadas do MVP.

#### Comportamento esperado

O usuário monta uma agenda semanal de treinos por dia, pode importar ou gerar treinos com IA e registra a execução manualmente quando realmente treinar.

#### Regras de negócio relacionadas

- Plano de treino não equivale a treino executado.
- O usuário precisa revisar toda sugestão de IA antes de salvar.
- A agenda semanal deve ser persistida localmente.
- A funcionalidade obrigatória do MVP é planejar e executar treinos; análise de equipamento por IA não faz parte do fluxo obrigatório documentado.
- Recomendações físicas devem ser apresentadas como sugestão revisável e não como prescrição profissional.

#### Critérios de aceite

- [ ] O usuário consegue associar treinos existentes aos dias da semana.
- [ ] O usuário consegue consultar a agenda semanal salva.
- [ ] Resultados de IA de treino são revisáveis antes de entrar no plano ou no cadastro de treinos.

#### Pontos de decisão

- Aprovação do texto final dos avisos de IA para fluxos de treino.

#### Riscos

- Sugestões inadequadas podem ser interpretadas como prescrição.
- Misturar geração, agenda e execução no mesmo fluxo pode prejudicar usabilidade.

---

### 7.9. Histórico, exportação, backup, importação e reset

#### Objetivo

Dar ao usuário controle sobre continuidade, portabilidade e consulta de seus dados locais.

#### Comportamento esperado

O produto arquiva o dia anterior quando detecta mudança de data, permite consultar histórico, exportar dados no recorte mínimo do MVP, importar backup válido e resetar dados locais com confirmação forte.

#### Regras de negócio relacionadas

- A mudança de dia deve arquivar o último dia ativo uma única vez quando a data atual for diferente da data ativa salva.
- Reabrir o app várias vezes no mesmo dia não pode gerar arquivamento duplicado.
- Se o app ficar vários dias sem ser aberto, o sistema deve preservar o último dia ativo com seus dados reais; dias sem uso podem permanecer sem entrada explícita.
- O sistema usa a data local do dispositivo como referência operacional, mas não deve duplicar o mesmo dia no histórico.
- O histórico é consulta por data/dia; progresso é leitura agregada e comparativa.
- A exportação mínima do MVP cobre os últimos 7 dias corridos.
- O PDF do MVP deve exportar resumo diário com data, calorias, proteína, carboidratos, gorduras, água, passos e cardio.
- O CSV do MVP deve exportar linhas por refeição, repetindo água, passos e cardio na primeira linha de cada dia.
- O backup local deve ser versionado por schema e validado antes de sobrescrever o estado atual.
- Importação inválida não pode sobrescrever dados existentes.
- Reset deve exigir confirmação explícita e irreversível dentro do app.

#### Critérios de aceite

- [ ] O usuário consegue acessar dias anteriores por um fluxo explícito e previsível.
- [ ] Um backup inválido é rejeitado com mensagem clara e sem corromper os dados atuais.
- [ ] O reset só ocorre após confirmação explícita e o resultado é visível ao usuário.

#### Pontos de decisão

- O histórico diário deve armazenar também snapshot das metas vigentes do dia para exportação e comparação futura.

#### Riscos

- Importação frágil pode corromper todo o estado local.
- Histórico pouco visível reduz o valor do produto.
- Reset sem fricção adequada pode causar perda irreversível.

---

### 7.10. Operação local-first, PWA e privacidade local

#### Objetivo

Garantir que o produto funcione como app pessoal mobile-first com persistência local confiável.

#### Comportamento esperado

Dados locais permanecem acessíveis entre sessões, o produto pode ser usado como PWA e fluxos que dependem apenas de persistência local continuam disponíveis sem conexão. Recursos de IA devem indicar dependência de internet sem comprometer os fluxos manuais.

#### Regras de negócio relacionadas

- O MVP é local-first.
- Dados do usuário devem permanecer locais por padrão no dispositivo.
- O produto deve informar claramente que dados locais ficam no dispositivo e que IA depende de conexão.
- O aviso de privacidade local deve existir no mínimo na área de perfil/gestão de dados e nos fluxos de IA com imagem.
- A estrutura conceitual pode facilitar evolução futura com autenticação, sync e Supabase, sem exigir essa migração agora.

#### Critérios de aceite

- [ ] O usuário consegue reabrir o app e reencontrar os dados locais anteriores.
- [ ] Em modo offline, o usuário ainda consegue consultar e operar os fluxos locais centrais já persistidos.
- [ ] O produto diferencia claramente o que funciona offline do que depende de conexão.

#### Pontos de decisão

- Aprovação do texto final do aviso de privacidade local.

#### Riscos

- Dados sensíveis em dispositivo compartilhado podem expor privacidade.
- Fronteira ruim entre offline e online pode fazer o usuário interpretar falhas de IA como erro geral do app.

---

## 8. Funcionalidades secundárias

| Funcionalidade | Valor esperado | Prioridade | Entra no MVP? | Observação |
|---|---|---|---|---|
| Tela dedicada de receitas por IA | Apoiar o usuário com ideias de preparo a partir do contexto nutricional | Média | Não | Recurso útil, mas secundário em relação a registro e planejamento |
| Templates de refeições | Reaproveitar refeições frequentes com menos esforço | Média | Não | Candidata forte para V1 |
| Templates de treino | Reaproveitar rotinas frequentes | Média | Não | Candidata forte para V1 |
| Relatório semanal simples adicional ao export já definido | Melhorar leitura de progresso recorrente | Média | Não | Pode voltar depois do MVP |
| Relatório mensal | Aprofundar análise histórica | Baixa | Não | Melhoria futura |
| Reconhecimento de rótulos ou códigos por IA | Facilitar cadastro de alimentos industrializados via imagem | Média | Não | Candidato futuro sem scanner dedicado nesta fase |
| Biblioteca de alimentos | Reduzir cadastro manual | Baixa | Não | Exige curadoria de dados |
| Biblioteca de exercícios | Padronizar treinos | Baixa | Não | Exige escopo de catálogo |
| Onboarding dedicado | Melhorar primeira configuração do produto | Média | Não | Fora do MVP; usar estados vazios e CTA para perfil no primeiro uso |
| Internacionalização | Suportar mais de um idioma | Baixa | Não | O MVP pode ser tratado como português único |

---

## 9. Fluxos de usuário

### Fluxo 1 — Configurar perfil e metas

- Usuário: usuário individual comum ou avançado.
- Objetivo: habilitar metas e personalização inicial.
- Pré-condições: app aberto pela primeira vez ou perfil ainda não configurado.
- Passos:
  1. O usuário acessa a área de perfil/configurações.
  2. Informa nome, idade, peso, altura e revisa seleções de gênero, nível de atividade, objetivo e tipo de dieta.
  3. Opcionalmente informa restrições alimentares, bioimpedância e macros customizados.
  4. Salva o perfil.
  5. Retorna ao dashboard e visualiza metas ativas.
- Resultado esperado: perfil e metas ficam persistidos localmente.
- Estados de erro: campos obrigatórios vazios; números inválidos; tentativa de salvar macros customizados inválidos; falha de persistência local.
- Critérios de aceite: o perfil é salvo, reaberto sem perda e passa a influenciar as metas exibidas.
- Pontos de decisão: snapshot histórico das metas diárias ainda depende de confirmação humana.

### Fluxo 2 — Registrar refeição manualmente

- Usuário: usuário individual.
- Objetivo: registrar alimentação do dia atual sem depender de IA.
- Pré-condições: app aberto no dia atual.
- Passos:
  1. O usuário abre a tela inicial.
  2. Aciona o fluxo de adicionar refeição.
  3. Informa nome e calorias; opcionalmente informa proteína, carboidratos e gorduras.
  4. Se estiver editando uma base nutricional com porção, ajusta a porção em gramas.
  5. Salva a refeição.
  6. Visualiza o impacto no resumo diário.
- Resultado esperado: a refeição aparece no dia atual e altera os totais do dashboard.
- Estados de erro: envio com nome ou calorias ausentes; valores numéricos negativos; falha de persistência.
- Critérios de aceite: o usuário consegue salvar, visualizar e remover a refeição com atualização imediata.
- Pontos de decisão: nenhum ponto crítico adicional identificado.

### Fluxo 3 — Analisar refeição com IA

- Usuário: usuário que quer reduzir atrito de cadastro.
- Objetivo: transformar texto ou imagem em registro revisável.
- Pré-condições: recurso de IA ativo e conexão disponível.
- Passos:
  1. O usuário entra no fluxo de IA por texto ou imagem.
  2. Visualiza o aviso contextual mínimo sobre estimativa, revisão obrigatória, dependência de internet e não persistência local da imagem.
  3. Envia a descrição ou imagem.
  4. O sistema retorna uma proposta estruturada.
  5. O usuário revisa e ajusta o resultado.
  6. Confirma o salvamento.
- Resultado esperado: os dados só entram no diário após revisão e confirmação.
- Estados de erro: indisponibilidade de conexão; resposta malformada; análise inconclusiva; permissão de câmera negada.
- Critérios de aceite: o fluxo nunca salva automaticamente sem revisão; falhas de IA não quebram o restante do app.
- Pontos de decisão: texto final do aviso contextual ainda depende de aprovação humana.

### Fluxo 4 — Planejar dieta semanal e aplicar ao diário

- Usuário: usuário individual.
- Objetivo: montar ou importar uma rotina alimentar e reaproveitá-la no uso diário.
- Pré-condições: área de plano alimentar disponível.
- Passos:
  1. O usuário acessa a área de plano alimentar.
  2. Cria manualmente, cola texto ou importa conteúdo textual compatível para montagem do plano.
  3. Revisa os itens por dia e tipo de refeição.
  4. Salva o plano semanal.
  5. Em um dia específico, aplica manualmente um item ao diário.
- Resultado esperado: o plano fica salvo como recomendação e não como consumo automático.
- Estados de erro: texto não reconhecido; falha de IA; conteúdo de arquivo sem texto útil; tipo de refeição fora do conjunto padrão do MVP.
- Critérios de aceite: o usuário consegue salvar o plano e aplicar itens ao dia sem preenchimento automático.
- Pontos de decisão: nenhum ponto crítico adicional identificado.

### Fluxo 5 — Registrar treino, cardio e passos

- Usuário: usuário individual.
- Objetivo: registrar atividade física realizada no dia.
- Pré-condições: app aberto; treino existente ou registro manual disponível.
- Passos:
  1. O usuário acessa a área de treino.
  2. Escolhe registrar treino executado, cardio ou passos.
  3. Para passos, informa total do dia.
  4. Para cardio, informa tipo, duração e intensidade; calorias só são estimadas automaticamente se a regra documentada comportar isso.
  5. Salva o registro.
  6. Consulta o impacto no dia atual.
- Resultado esperado: o dado físico fica salvo e refletido no progresso do dia.
- Estados de erro: dados inconsistentes; treino inexistente; tentativa de inferir gasto sem base documentada; falha de persistência.
- Critérios de aceite: o registro fica visível no dia atual, permanece consultável depois e não cria fórmula nova para gasto energético.
- Pontos de decisão: nenhum ponto crítico adicional identificado.

### Fluxo 6 — Consultar histórico e progresso

- Usuário: usuário individual.
- Objetivo: revisar dias anteriores e evolução corporal/diária.
- Pré-condições: existência de dados anteriores ou dados do dia atual.
- Passos:
  1. O usuário acessa a tela de histórico para consultar um dia específico ou a tela de progresso para leitura agregada.
  2. No histórico, seleciona uma data e consulta refeições, água, treino, cardio e passos do dia.
  3. No progresso, consulta gráficos e indicadores mínimos do MVP.
  4. Opcionalmente exporta os últimos 7 dias.
- Resultado esperado: o usuário revisa passado e evolução sem perder contexto.
- Estados de erro: histórico inacessível; dados ausentes; exportação falha.
- Critérios de aceite: existe caminho claro para histórico por data e para progresso agregado.
- Pontos de decisão: definição final sobre snapshot histórico das metas continua pendente.

### Fluxo 7 — Exportar, importar ou resetar dados locais

- Usuário: usuário individual.
- Objetivo: preservar, restaurar ou apagar dados do dispositivo.
- Pré-condições: dados locais existentes ou arquivo de backup disponível.
- Passos:
  1. O usuário acessa a área de perfil/gestão de dados.
  2. Escolhe exportar, importar ou resetar.
  3. No caso de exportação, seleciona CSV ou PDF do recorte mínimo do MVP.
  4. No caso de importação, seleciona um backup local compatível.
  5. O sistema valida e aplica a ação permitida.
  6. O usuário recebe confirmação ou erro claro.
- Resultado esperado: a ação concluída preserva integridade dos dados.
- Estados de erro: arquivo inválido; falha de leitura; incompatibilidade de versão; confirmação de reset não realizada.
- Critérios de aceite: arquivo inválido não sobrescreve o estado existente; reset exige confirmação explícita; exportação retorna feedback claro.
- Pontos de decisão: confirmação humana ainda necessária para o comportamento oficial de snapshot de metas históricas.

---

## 10. Telas e componentes

| Tela | Finalidade | Elementos principais | Obrigatória no MVP? | Observações |
|---|---|---|---|---|
| Início | Consolidar o dia atual | Cards de metas, resumo diário, lista de refeições, registro de água, indicadores físicos | Sim | É a tela central do uso diário |
| Progresso | Consultar evolução agregada | Tendência de calorias 7 dias, frequência de treino 7 dias, evolução de peso, bioimpedância opcional, macros do dia | Sim | Leitura agregada e comparativa |
| Plano | Organizar alimentação semanal | Grade semanal, itens por dia/tipo, importação textual, geração por IA, ação de aplicar ao diário | Sim | Plano é recomendação, não consumo automático |
| Treino | Concentrar cadastro, execução e planejamento físico | Registro de treino, agenda semanal, cardio, passos, IA de treino | Sim | Treino tem mesmo peso de dieta |
| Perfil | Configurar usuário e gerir dados locais | Formulário de perfil, metas, preferências, backup, importação, exportação e reset | Sim | É o ponto de gestão de dados e privacidade local |
| Histórico | Consultar dias anteriores e exportar | Calendário ou seletor de data, resumo do dia, exportação CSV/PDF | Sim | Consulta por data/dia, separada de Progresso |
| Avisos contextuais de IA e privacidade | Explicar limites de IA e do armazenamento local | Blocos de aviso, mensagens de indisponibilidade, textos contextuais, confirmação de revisão | Sim | Componente obrigatório, não precisa ser tela isolada |

### Tela 1 — Início

#### Finalidade

Permitir que o usuário veja rapidamente o estado do dia e execute as ações de registro mais frequentes.

#### Elementos principais

- resumo de calorias e macros;
- progresso de água;
- lista de refeições do dia;
- acesso para adicionar refeição;
- indicadores resumidos de treino, cardio e passos.

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

Apresentar evolução do usuário ao longo do tempo em formato agregado e comparativo.

#### Elementos principais

- tendência de calorias dos últimos 7 dias comparada à meta atual;
- frequência de treinos dos últimos 7 dias;
- histórico de peso;
- histórico de bioimpedância quando houver dados;
- distribuição de macros do dia atual.

#### Ações do usuário

- consultar evolução corporal;
- revisar indicadores agregados;
- interpretar tendência recente sem depender de filtros avançados.

#### Estados necessários

- estado vazio;
- estado de carregamento;
- estado de erro;
- estado de sucesso;
- estado com dados.

#### Critérios de aceite da tela

- [ ] O usuário consegue consultar o conjunto mínimo de métricas do MVP sem erro.
- [ ] A ausência de bioimpedância não impede a visualização da tela.

### Tela 3 — Plano

#### Finalidade

Criar e revisar o planejamento alimentar semanal.

#### Elementos principais

- grade semanal;
- tipos padrão de refeição;
- ações de adicionar, editar e remover;
- importação textual;
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
- ações de backup, importação, exportação e reset;
- aviso de privacidade local.

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

Permitir consulta de dias anteriores e exportação do histórico mínimo do MVP.

#### Elementos principais

- seletor de data ou calendário;
- resumo do dia selecionado;
- exportação CSV e PDF;
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
- [ ] A exportação funciona com feedback ao usuário e respeita o recorte mínimo aprovado.

### Tela 7 — Avisos contextuais de IA e privacidade

#### Finalidade

Explicar limites de IA, uso de imagem, dependência de conexão e natureza local dos dados.

#### Elementos principais

- texto curto de aviso de IA;
- texto curto de privacidade local;
- mensagem de indisponibilidade da IA/offline;
- lembrete de revisão obrigatória antes do salvamento.

#### Ações do usuário

- ler o aviso antes de enviar dados para IA;
- revisar resultado antes de salvar;
- continuar pelo fluxo manual quando IA falhar.

#### Estados necessários

- estado vazio;
- estado de carregamento;
- estado de erro;
- estado de sucesso;
- estado com dados.

#### Critérios de aceite da tela

- [ ] Os avisos aparecem nos fluxos de IA antes do envio e no momento da revisão do resultado.
- [ ] Quando a IA estiver indisponível, o produto informa isso sem impedir o uso do fluxo manual.

---

## 11. Dados e entidades

| Entidade | Finalidade | Campos prováveis | Relações | Observações |
|---|---|---|---|---|
| Perfil do usuário | Personalizar metas e contexto | nome, idade, peso, altura, gênero, nível de atividade, objetivo, tipo de dieta, restrições, dados corporais opcionais, macros customizados | Relaciona-se com metas, progresso, histórico e personalização por IA | Metas são calculadas automaticamente e permanecem editáveis |
| Metas diárias ativas | Comparar o dia com o objetivo | calorias, proteína, carboidratos, gorduras, água | Derivadas do perfil e usadas pelo dashboard e progresso | Fórmula de calorias já está decidida; snapshot histórico ainda é ponto de decisão |
| Refeição | Registrar consumo alimentar | identificador, nome, calorias, proteína, carboidratos, gorduras, data/hora | Pertence ao dia atual ou ao histórico diário | Nome e calorias são obrigatórios; macros podem ser `0` |
| Item planejado de refeição | Planejar alimentação semanal | identificador, dia da semana, tipo de refeição, nome, calorias, proteína, carboidratos, gorduras | Pertence ao plano alimentar semanal | É recomendação, não consumo automático |
| Consumo de água diário | Acompanhar hidratação | data, total em ml | Pertence ao dia atual e ao histórico diário | Modelo agregado por dia |
| Registro corporal | Acompanhar evolução física | identificador, peso, percentual de músculo, percentual de gordura, gordura visceral, data/hora | Relaciona-se ao perfil e ao progresso | Bioimpedância é opcional |
| Treino | Cadastrar rotinas | identificador, nome, descrição, tipo, duração estimada, exercícios | Relaciona-se à agenda semanal e à execução | Funciona como modelo reutilizável |
| Registro de treino executado | Registrar execução real | identificador, treino de referência, data, exercícios executados, duração, humor opcional | Pertence ao dia atual e ao histórico diário | Deve permanecer separado do treino planejado |
| Cardio | Registrar atividade aeróbica | identificador, data, tipo, duração, intensidade, calorias estimadas, velocidade opcional | Pertence ao dia atual e ao histórico diário | Estimativa de gasto só existe quando houver regra documentada suficiente |
| Passos diários | Registrar movimentação diária | data, total de passos | Pertence ao dia atual e ao histórico diário | MVP não exige conversão obrigatória para calorias |
| Plano semanal de treino | Organizar semana física | identificador, treino de referência, dia da semana | Relaciona-se aos treinos cadastrados | Não equivale a treino executado |
| Histórico diário | Consolidar dias anteriores | data, refeições, água, treinos executados, cardio, passos e possivelmente snapshot das metas do dia | Agrega os registros diários | Snapshot das metas do dia ainda depende de decisão humana |
| Backup local | Preservar e restaurar estado | snapshot dos dados locais, data de geração, versão de schema | Agrupa perfil, metas, histórico e estado atual | Deve ser validado antes de importação |
| Artefato temporário de IA | Permitir análise de texto ou imagem sem persistência permanente | imagem ou texto temporário, contexto da análise, status de processamento | Relaciona-se apenas ao fluxo de IA | Não deve virar dado persistido por padrão |

---

## 12. Regras de negócio

| Regra | Descrição | Obrigatória? | Critério de aceite |
|---|---|---|---|
| Persistência local | Os dados do MVP devem ser salvos localmente no dispositivo do usuário | Sim | Após recarregar o app, os dados locais permanecem disponíveis |
| Operação sem login | O MVP não depende de conta para uso básico | Sim | O usuário completa os fluxos centrais sem autenticação |
| Offline para fluxos locais | Dados locais e fluxos locais centrais devem continuar operando sem conexão; IA depende de internet | Sim | Em modo offline, o usuário consulta e usa fluxos locais; IA exibe indisponibilidade sem quebrar o app |
| Campos mínimos do perfil | Nome, idade, peso e altura são obrigatórios; gênero, nível de atividade, objetivo e tipo de dieta precisam estar definidos | Sim | O perfil não pode ser salvo com esses dados ausentes ou inválidos |
| Validação mínima do perfil | Idade, peso e altura devem ser números válidos maiores que zero; campos opcionais aceitam vazio | Sim | O sistema bloqueia salvamento com números inválidos nos campos obrigatórios |
| Metas editáveis | Metas podem ser calculadas automaticamente, mas continuam editáveis manualmente | Sim | O usuário vê metas calculadas e consegue alterá-las |
| Campos mínimos da refeição manual | Nome e calorias são obrigatórios; proteína, carboidratos e gorduras são opcionais e podem ser `0` | Sim | O sistema salva refeição manual com nome e calorias e não exige macros para concluir |
| Arredondamento proporcional da refeição | Ajustes de porção devem recalcular nutrientes proporcionalmente e arredondar para inteiro | Sim | Ao alterar a porção, calorias e macros mudam de forma proporcional e íntegra |
| Planos não são execução | Plano alimentar e plano de treino não preenchem o diário automaticamente | Sim | Nenhum item planejado aparece como consumo ou treino executado sem ação explícita |
| Revisão obrigatória da IA | Toda sugestão de IA precisa ser revisada antes de ser salva | Sim | O fluxo de IA sempre exige confirmação explícita do usuário |
| Avisos contextuais obrigatórios | Fluxos de IA e privacidade local devem exibir aviso contextual mínimo e fallback manual | Sim | O aviso aparece antes do envio para IA e no momento da revisão do resultado |
| Imagem não persistida | Imagens usadas em IA não devem ser armazenadas localmente por padrão | Sim | Após a análise, a imagem não fica disponível como dado persistido |
| Tipos padrão do plano alimentar | O planejamento semanal do MVP usa café da manhã, almoço, lanche e jantar como tipos padrão | Sim | O plano semanal funciona usando esse conjunto padrão |
| Regra oficial de gasto energético | Cardio só pode estimar gasto com regra documentada compatível com a decisão baseada em MET; passos não exigem kcal automática no MVP | Sim | Não há cálculo novo de gasto sem regra documentada e passos continuam visíveis mesmo sem kcal |
| Arquivamento por mudança de dia | O último dia ativo deve ser arquivado uma única vez quando a data mudar, sem duplicação no mesmo dia | Sim | Abrir o app repetidamente no mesmo dia não duplica histórico |
| Exportação mínima do MVP | CSV e PDF devem cobrir os últimos 7 dias no formato mínimo documentado | Sim | O usuário consegue exportar o recorte mínimo com feedback claro |
| Importação segura | Backup inválido não pode sobrescrever estado válido | Sim | Arquivo inválido é rejeitado e os dados atuais permanecem intactos |
| Reset com confirmação | Reset local só pode acontecer após confirmação explícita e irreversível | Sim | O reset não é executado por toque acidental |
| Bioimpedância opcional | O sistema deve aceitar uso sem bioimpedância | Sim | O usuário salva perfil e progresso sem preencher bioimpedância |
| Dieta e treino com mesmo peso | A navegação principal e o escopo do MVP tratam dieta e treino como pilares equivalentes | Sim | Há acesso de primeiro nível tanto para dieta quanto para treino |
| Histórico separado de progresso | Histórico é consulta por data/dia; progresso é visão agregada e comparativa | Sim | O usuário encontra os dois fluxos sem sobreposição ambígua |
| Preparação futura sem dependência atual | A modelagem pode ser preparada para autenticação, sync e Supabase sem exigir backend no MVP | Sim | O MVP funciona integralmente sem autenticação, sync ou nuvem |
| IA pública exige proteção | Qualquer build público com IA deve usar camada server-side/proxy e manter segredo fora do cliente | Sim | Não existe uso público de IA com segredo exposto no front-end |

---

## 13. Permissões e papéis de usuário

| Papel | Permissões | Restrições | Observações |
|---|---|---|---|
| Usuário individual comum | Registrar refeições, água, peso, bioimpedância opcional, treino, cardio, passos, consultar progresso, usar plano semanal, exportar/importar backup e usar IA se ativa | Não acessa dados de terceiros; não possui sync automático; não depende de conta | Papel confirmado para o MVP |
| Usuário individual avançado | Mesmas permissões do usuário comum, com uso mais frequente de planejamento e personalização | Mesmas restrições do usuário comum | Diferença atual é de uso, não de permissão |

`Ponto de decisão`: não há papel administrador, profissional, cliente ou colaborador confirmado para o MVP. Se o produto evoluir para multiusuário, a matriz de permissões precisará ser redesenhada.

---

## 14. Integrações

| Integração | Finalidade | Status | Risco | Observação |
|---|---|---|---|---|
| Gemini / Google GenAI | Analisar refeições por texto ou imagem, gerar ou importar dietas e gerar ou importar treinos | Confirmada | Alto | Ativa no MVP como assistência revisável; qualquer fase pública com IA exige proxy/camada server-side |
| Câmera do dispositivo | Capturar imagem para fluxos de IA alimentar | Confirmada | Médio | Requer permissão do usuário; imagem não deve ser persistida localmente por padrão |
| PWA / service worker | Instalação e experiência app-like com dados locais | Confirmada | Médio | Deve coexistir com funcionamento local-first |
| Exportação PDF | Gerar arquivo exportável do histórico mínimo do MVP | Confirmada | Médio | Escopo aprovado: resumo diário dos últimos 7 dias |
| Exportação CSV | Gerar arquivo exportável do histórico mínimo do MVP | Confirmada | Baixo | Escopo aprovado: linhas por refeição no recorte dos últimos 7 dias |
| Proxy ou camada server-side para IA | Proteger chave e validar payloads em cenário público | Confirmada para fase pública | Alto | Gate obrigatório antes de qualquer release público com IA |
| Autenticação | Permitir conta e possível sync | Futuro | Alto | Fora do MVP atual |
| Armazenamento em nuvem | Permitir sincronização multi-dispositivo | Futuro | Alto | Fora do MVP atual |
| Supabase | Possível caminho futuro para auth, sync e armazenamento | Hipótese | Médio | Direção futura, não requisito do MVP |

---

## 15. Requisitos não funcionais

### 15.1. Desempenho

- Registros locais simples, como salvar refeição, água, passos ou treino, devem refletir na interface sem recarregamento manual da página.
- O app não deve travar ao lidar com estados vazios, dados salvos ou falhas de IA.
- A exportação mínima de 7 dias deve concluir com feedback claro ao usuário.

### 15.2. Responsividade

- O produto deve funcionar prioritariamente em telas mobile, sem quebrar em desktop.
- Os principais fluxos do MVP devem permanecer utilizáveis em largura típica de smartphone.
- Navegação, botões e áreas de toque devem permanecer acessíveis em tema claro e escuro.

### 15.3. Segurança

- Dados pessoais e corporais devem permanecer locais por padrão no MVP.
- O sistema deve validar importações antes de sobrescrever o estado local.
- Ações destrutivas devem exigir confirmação explícita.
- Em qualquer cenário público com IA, o segredo de acesso não pode ficar exposto no cliente.
- O produto deve deixar claro que IA é assistiva e não substitui orientação profissional.

### 15.4. Manutenibilidade

- Regras de cálculo relevantes devem estar documentadas antes de qualquer alteração.
- O backup deve suportar versionamento de schema.
- Funcionalidades ou componentes não confirmados para o MVP não devem ser promovidos a requisito sem decisão humana.
- Fluxos críticos de cálculo, persistência, exportação e importação devem ser verificáveis antes de novas expansões de escopo.

### 15.5. Acessibilidade

- Textos, botões e indicadores devem manter contraste legível em tema claro e escuro.
- A interface deve ter estados vazios e mensagens de erro compreensíveis.
- Ícones essenciais devem ter apoio textual ou contexto suficiente para uso sem ambiguidade.

### 15.6. Confiabilidade

- Reabrir o app não deve apagar dados do usuário.
- Reabrir o app no mesmo dia não deve duplicar arquivamento histórico.
- Falhas de IA não devem comprometer os fluxos manuais.
- Importação inválida não deve corromper dados válidos existentes.

### 15.7. Compatibilidade

- O MVP deve funcionar como PWA em navegadores modernos compatíveis com instalação e armazenamento local.
- O produto deve suportar uso em português com textos consistentes e sem encoding quebrado.
- Internacionalização fica fora do MVP, salvo decisão humana posterior.

---

## 16. Critérios de aceite gerais

| Critério | Como verificar | Obrigatório para MVP? |
|---|---|---|
| Perfil pode ser salvo e reaberto | Salvar perfil, recarregar o app e conferir persistência | Sim |
| Metas automáticas aparecem após salvar perfil | Salvar perfil e conferir metas calculadas no app | Sim |
| Refeição manual atualiza o dia | Adicionar refeição e verificar atualização imediata dos totais | Sim |
| Refeição manual aceita macros opcionais | Salvar refeição apenas com nome e calorias e verificar persistência | Sim |
| Água atualiza a meta do dia | Registrar água e conferir o progresso exibido | Sim |
| Peso e bioimpedância opcional funcionam | Salvar peso com e sem bioimpedância e consultar depois | Sim |
| Treino, cardio e passos entram no dia atual | Registrar atividade física e verificar reflexo no resumo diário | Sim |
| Plano alimentar não vira consumo automático | Criar plano semanal e confirmar que nada entra no diário sem ação explícita | Sim |
| Plano de treino não vira treino executado | Associar treino à semana e confirmar separação entre agenda e execução | Sim |
| Histórico e Progresso estão claramente separados | Um usuário encontra histórico por data e progresso agregado por caminhos distintos | Sim |
| Exportação mínima funciona | Exportar CSV e PDF do recorte de 7 dias e receber feedback de sucesso | Sim |
| Importação inválida é bloqueada com segurança | Tentar importar arquivo inválido e confirmar que dados atuais permanecem intactos | Sim |
| Reset exige confirmação explícita | Tentar resetar e confirmar necessidade de ação deliberada | Sim |
| Offline preserva leitura e uso local | Desconectar após salvar dados e consultar ou usar fluxos locais centrais | Sim |
| IA exige revisão antes de salvar | Executar um fluxo de IA e verificar confirmação manual antes do salvamento | Sim |
| Avisos contextuais aparecem nos fluxos de IA | Acessar fluxo de IA e verificar exibição do aviso antes do envio e na revisão do resultado | Sim |
| Imagens de IA não ficam salvas localmente | Fazer análise por imagem e verificar ausência de persistência local da imagem | Sim |
| IA em cenário público não expõe segredo no cliente | Validar proxy/camada server-side antes de release público | Sim |

---

## 17. Riscos e mitigação

| Risco | Tipo | Impacto | Probabilidade | Mitigação |
|---|---|---|---|---|
| Chave de IA exposta em build público | Segurança | Alto | Alta | Não permitir IA pública sem proxy/camada server-side aprovada |
| Sugestões de IA interpretadas como orientação profissional | Produto | Alto | Alta | Exigir revisão humana, linguagem cautelosa e avisos contextuais |
| Snapshot histórico de metas não definido | Produto | Alto | Média | Tratar como ponto de decisão de alta prioridade antes da implementação final de histórico/progresso/exportação |
| Importação de backup inválido corromper estado | Técnico | Alto | Alta | Validar estrutura e versão antes de importar e bloquear arquivos inválidos |
| Arquivamento diário gerar duplicidade ou perda de contexto | Técnico | Médio | Média | Aplicar regra mínima de rollover e testar reabertura no mesmo dia e após vários dias |
| Escopo crescer para login, sync e backend cedo demais | Escopo | Alto | Alta | Manter esses itens fora do MVP e explicitamente documentados como futuros |
| Componentes existentes fora do escopo confundirem o coder | Manutenção | Médio | Média | Registrar explicitamente itens brownfield fora do MVP, como análise de equipamento |
| OCR ou parsing complexo entrarem por inferência | Escopo | Médio | Média | Delimitar suporte de importação a conteúdo textual extraível, sem OCR |
| Falhas de IA parecerem falha geral do app | UX | Médio | Alta | Exibir indisponibilidade contextual e manter fluxo manual disponível |
| Dados sensíveis em dispositivo compartilhado | Segurança | Alto | Média | Informar limites da privacidade local e evitar promessas de proteção inexistentes |
| Progresso histórico usar metas atuais retroativamente | UX | Médio | Média | Não recalcular passado silenciosamente sem decisão humana |
| Exportação mínima não ser útil para o usuário | Produto | Médio | Média | Fixar escopo mínimo claro para CSV e PDF e validar com dados reais |

---

## 18. Métricas de sucesso

As métricas abaixo combinam sinais confirmados e hipóteses recomendadas para avaliação. Como o MVP atual é local-first e sem backend obrigatório, a coleta exata dessas métricas ainda depende da estratégia de instrumentação.

### Métricas de uso

- Confirmada: percepção de progresso físico ao longo do tempo.
- Hipótese: frequência semanal de uso com pelo menos um registro diário.
- Hipótese: taxa de usuários que completam perfil e continuam usando o dashboard.
- Hipótese: taxa de uso do planejamento semanal em relação ao registro diário.

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
- Hipótese: percepção de centralização do processo antes espalhado em múltiplas ferramentas.
- Hipótese: confiança do usuário no acompanhamento diário e histórico.
- Hipótese: decisão futura de tornar o produto público só deve avançar se os riscos de segurança e responsabilidade estiverem reduzidos.

---

## 19. Pontos de decisão pendentes

| Ponto de decisão | Por que importa | Impacto se não decidir | Prioridade |
|---|---|---|---|
| Snapshot histórico das metas do dia versus uso da meta atual do perfil | Define consistência de progresso, histórico e exportação | O sistema pode recalcular o passado silenciosamente e distorcer comparações | Alta |
| Texto final dos avisos de IA | Define conformidade de UX e reduz interpretação errada do papel da IA | O fluxo pode ficar correto em regra, mas fraco em comunicação | Alta |
| Texto final do aviso de privacidade local | Define clareza sobre onde os dados ficam e quais limites de proteção existem | O usuário pode interpretar proteção maior do que a realmente oferecida | Alta |

---

## 20. Resumo para o agente de implementação

### 20.1. Objetivo da implementação

Entregar o MVP local-first do NutriTrack para uso individual, com foco em registro diário, planejamento semanal, progresso corporal e controle local de dados, mantendo IA ativa como assistência revisável.

### 20.2. O que implementar no MVP

- Perfil do usuário e metas diárias.
- Dashboard diário com água, refeições e resumo físico.
- Registro manual de refeições.
- Registro de peso e bioimpedância opcional.
- Registro de treinos, cardio e passos.
- Planejamento alimentar semanal com aplicação manual ao diário.
- Planejamento semanal de treinos.
- Histórico por data e Progresso agregado.
- Exportação CSV/PDF do recorte mínimo de 7 dias.
- Backup local validado, importação segura e reset local.
- Operação local-first, PWA e avisos contextuais de IA/privacidade.

### 20.3. O que não implementar

- Login obrigatório.
- Sync multi-dispositivo.
- Modo profissional.
- Monetização.
- OCR dedicado ou parsing avançado de layout.
- Biblioteca ampla de alimentos ou exercícios.
- Gamificação, comunidade ou recursos sociais.
- Análise de equipamento por IA como requisito do MVP.
- Qualquer backend obrigatório para o MVP atual.

### 20.4. Regras críticas

- Planos de dieta e treino são recomendações, não registros automáticos.
- Toda saída de IA exige revisão humana antes do salvamento.
- Imagens de IA não devem ser persistidas localmente por padrão.
- Nome e calorias são obrigatórios na refeição manual; macros podem ser `0`.
- Bioimpedância é opcional.
- Dados locais devem permanecer acessíveis offline.
- O cálculo automático de calorias deve seguir Mifflin-St Jeor com multiplicador de atividade e ajuste por objetivo.
- Cardio só estima gasto com regra documentada suficiente; passos não exigem kcal automática no MVP.
- Histórico é consulta por data; Progresso é leitura agregada.

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
- Metas diárias ativas.
- Refeição.
- Item planejado de refeição.
- Consumo de água diário.
- Registro corporal.
- Treino.
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
- Histórico é acessível por fluxo claro e Progresso mostra o conjunto mínimo aprovado.
- Exportação CSV/PDF do recorte mínimo funciona.
- Backup inválido não corrompe o estado local.
- Offline mantém leitura e uso dos fluxos locais centrais.
- IA só salva após revisão humana.

### 20.8. Pontos que o coder não deve decidir sozinho

- Snapshot histórico das metas do dia.
- Texto final dos avisos de IA.
- Texto final do aviso de privacidade local.
- Qualquer expansão de importação para OCR, parsing complexo ou novos formatos reais além do texto extraível.
- Qualquer retorno da análise de equipamento para dentro do MVP.

---

## 21. Principais mudanças feitas nesta revisão

| Mudança | Origem na revisão crítica | Tipo | Impacto |
|---|---|---|---|
| Fechamento dos campos obrigatórios, opcionais e validações mínimas do perfil | CRÍTICO 1 | Correção de entidade/dado | Alto |
| Fechamento do contrato mínimo da refeição manual e da política de arredondamento proporcional | CRÍTICO 1 | Melhoria de regra de negócio | Alto |
| Remoção do conflito do Fluxo 5 e alinhamento com a regra já aprovada de cardio e passos | CRÍTICO 2 | Correção de fluxo | Alto |
| Definição do contrato operacional mínimo dos avisos de IA e privacidade, com fallback manual | CRÍTICO 3 | Correção de risco | Alto |
| Fechamento do escopo mínimo de exportação CSV/PDF no recorte de 7 dias | IMPORTANTE 1 | Fortalecimento de critério de aceite | Médio |
| Fechamento do conjunto mínimo de métricas da tela de Progresso e separação explícita de Histórico | IMPORTANTE 2 e OPCIONAL 2 | Correção de tela/componente | Médio |
| Complemento da regra de arquivamento diário para reabertura no mesmo dia e múltiplos dias sem abrir o app | IMPORTANTE 3 | Melhoria de regra de negócio | Alto |
| Registro explícito do snapshot histórico de metas como ponto de decisão pendente | IMPORTANTE 4 | Ponto de decisão | Alto |
| Delimitação do suporte de `.doc`, `.md`, `.txt` e `.pdf` a conteúdo textual extraível, sem OCR | IMPORTANTE 5 | Correção de risco | Médio |
| Remoção de “análise de equipamento” do escopo do MVP documentado | IMPORTANTE 6 | Não incorporada por risco de escopo | Médio |
| Ajuste do checklist final para refletir prontidão condicional e não total | IMPORTANTE 7 | Correção de clareza | Médio |
| Esclarecimento de que as duas personas do MVP não criam permissões ou fluxos distintos | OPCIONAL 1 | Correção de clareza | Baixo |

---

## 22. Pendências que ainda exigem decisão humana

| Pendência | Por que exige decisão humana | Impacto | Prioridade |
|---|---|---|---|
| Definir se histórico guarda snapshot das metas vigentes do dia | É decisão de produto que afeta histórico, progresso, exportação e confiança nos dados | Alto | Alta |
| Aprovar o texto final dos avisos de IA | Envolve responsabilidade de UX, segurança comunicacional e framing do papel da IA | Alto | Alta |
| Aprovar o texto final do aviso de privacidade local | Envolve comunicação clara sobre limites de proteção e armazenamento no dispositivo | Alto | Alta |

---

## 23. Checklist de qualidade do PRD revisado

| Item | Status | Observação |
|---|---|---|
| Escopo original preservado | OK | O MVP local-first para usuário individual foi mantido sem adicionar novas frentes de produto |
| Regras claras | OK | Fluxos centrais, campos mínimos, arredondamento, exportação e rollover foram explicitados |
| Critérios de aceite fortalecidos | OK | Foram adicionados critérios verificáveis para IA, exportação, progresso e histórico |
| Telas definidas | OK | Telas principais e o componente obrigatório de avisos foram consolidados |
| Dados definidos em nível conceitual | Parcial | Entidades principais estão definidas, mas o snapshot histórico das metas ainda depende de decisão humana |
| Riscos mapeados | OK | Riscos técnicos, de produto, escopo, UX e segurança foram atualizados |
| Fora de escopo definido | OK | Itens futuros, integrações não confirmadas e vazamentos de escopo ficaram explícitos |
| MVP separado de V1 e futuras melhorias | OK | Recursos secundários e evoluções futuras continuam segregados do MVP |
| Pontos de decisão identificados | OK | Pendências humanas reais foram centralizadas e priorizadas |
| Pronto para virar plano de implementação | Parcial | O documento já orienta planejamento técnico, mas snapshot histórico das metas e textos finais dos avisos ainda exigem confirmação humana |
