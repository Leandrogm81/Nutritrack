# Pré-PRD de Escopo

## 1. Resumo executivo

NutriTrack e um PWA mobile-first ja existente para acompanhamento pessoal de dieta, hidratacao, treino, cardio, passos, peso e bioimpedancia. O produto parece resolver a dor de registrar e acompanhar rotinas de saude e fitness em um unico lugar, com apoio de IA para reduzir trabalho manual em refeicoes, dietas e treinos.

O estagio atual e de produto/prototipo funcional brownfield, com muitas funcionalidades ja implementadas, mas ainda sem PRD formal, sem testes automatizados encontrados, com dados sensiveis em `localStorage` e com risco relevante de exposicao de chave Gemini no front-end.

O escopo funcional atual esta parcialmente claro por evidencia do codigo, pela analise brownfield e pelas decisoes mais recentes. Ja existe direcao para publico individual comum e avancado, com dieta e treino tendo o mesmo peso, planos funcionando como recomendacao e preparacao da modelagem para futura evolucao com Supabase. Ainda restam duvidas criticas sobre grau de publicacao, IA em builds publicos, autenticacao/sincronizacao e limites de responsabilidade sobre recomendacoes de saude.

Nivel de maturidade do escopo: `Escopo parcialmente definido`.

Ainda existem duvidas criticas antes de criar o PRD final.

## 2. Objetivo do produto

### Objetivo confirmado

- Permitir que uma pessoa acompanhe alimentacao diaria, macros, calorias, agua, peso, bioimpedancia, treinos, cardio e passos em um app mobile-first.
- Permitir planejamento alimentar semanal e planejamento semanal de treinos.
- Usar IA para analisar refeicoes por texto/imagem, importar planos alimentares e treinos por texto, gerar dietas, sugerir receitas e analisar equipamentos de academia por imagem.
- Persistir dados localmente no dispositivo via `localStorage`.
- Oferecer backup/exportacao/importacao de dados locais.
- Tratar planos e sugestoes de IA como recomendacoes, mantendo liberdade total para o usuario registrar manualmente suas refeicoes e treinos.
- Preparar a estrutura do produto para futura evolucao com Supabase, sem tornar isso dependencia do MVP atual.

### Hipoteses de objetivo

- Hipotese: o produto busca ser um assistente pessoal de dieta e treino, nao uma plataforma clinica profissional.
- Direcao atual: o produto prioriza uso individual, sem conta obrigatoria no MVP.
- Direcao atual: o proximo ciclo deve priorizar uma sprint de estabilizacao antes de novas features.
- Hipotese: a IA existe para reduzir friccao de registro e planejamento, nao para substituir orientacao profissional.

### Duvidas sobre o objetivo

- DÚVIDA: o objetivo final e um app pessoal local-only, um app publicavel para usuarios externos ou uma base para SaaS?
- DÚVIDA: o app deve ser tratado como produto de saude/fitness recreativo ou como ferramenta de acompanhamento nutricional com responsabilidade maior?
- Direcao atual: dieta e treino tem o mesmo peso no produto, com acompanhamento corporal como apoio relevante.

## 3. Problema que o produto resolve

O produto resolve a necessidade de centralizar registros de dieta, hidratacao, treino, cardio, passos, peso e bioimpedancia, reduzindo a fragmentacao entre planilhas, notas, apps de treino, apps de calorias e registros manuais.

Quem sente essa dor: usuario individual interessado em acompanhar rotina alimentar e fisica. O brownfield nao informa uso por nutricionista, personal trainer, clinica, equipe ou empresa.

Como essa dor e resolvida hoje: Não informado de forma direta. Pelo produto existente, infere-se que o usuario poderia usar apps separados, anotar manualmente, usar planilhas ou depender de memoria.

Por que vale a pena criar esse produto: porque ha um prototipo funcional com fluxo integrado e uso de IA para reduzir entrada manual. Porem, antes de ampliar o produto, e necessario decidir o posicionamento e corrigir riscos de seguranca, privacidade, validacao e qualidade.

## 4. Publico-alvo

- Publico principal: usuario individual comum e praticante avancado que quer acompanhar dieta, macros, hidratacao, treino e progresso corporal.
- Publico secundario: Nao definido por enquanto; profissionais e atendimento de clientes ficam fora do foco atual.
- Tipo de usuario: pessoa comum em rotina de saude/fitness e tambem usuario mais avancado que busca maior personalizacao, historico e controle.
- Contexto de uso: mobile-first, uso diario, com possivel consulta offline aos dados salvos.
- Nivel tecnico esperado: baixo a medio; o usuario provavelmente espera fluxos simples e guiados.

## 5. Personas principais

### Persona 1 — Usuario comum de dieta e treino

- Perfil: pessoa que registra alimentacao, agua, treino, peso e progresso.
- Objetivo: acompanhar metas diarias e evolucao ao longo do tempo.
- Dor principal: entrada manual trabalhosa e dados espalhados.
- O que precisa fazer no produto: registrar refeicoes, agua, peso, treino, cardio/passos, consultar progresso e exportar historico.
- Duvidas sobre essa persona: nivel de experiencia, objetivo principal, frequencia de uso, tolerancia a IA e necessidade de privacidade.

### Persona 2 — Usuario avancado que quer ajuda de IA para planejar

- Perfil: pessoa que usa IA para interpretar refeicoes, montar dietas, sugerir receitas e organizar treinos.
- Objetivo: reduzir esforco de planejamento e cadastro.
- Dor principal: dificuldade de estimar macros, montar plano alimentar ou estruturar treino.
- O que precisa fazer no produto: enviar texto ou imagem, revisar sugestoes de IA e salvar informacoes no plano ou registro diario.
- Duvidas sobre essa persona: quanto confia na IA, se precisa de disclaimers, se aceita revisar resultados e se espera recomendacoes personalizadas seguras.

## 6. Funcionalidades principais

| Funcionalidade | Descricao | Status | Observacao |
|---|---|---|---|
| Registro diario de refeicoes | Registrar refeicoes com calorias, proteinas, carboidratos e gorduras | Confirmada | Observada no brownfield |
| Entrada manual de refeicao | Permitir cadastro manual de refeicao | Confirmada | Observada no brownfield |
| Analise de refeicao por texto | Usar IA para interpretar refeicao descrita em texto | Confirmada | RISCO TECNICO: depende de Gemini e parsing confiavel |
| Analise de refeicao por imagem | Usar IA/camera para analisar imagem de refeicao | Confirmada | RISCO TECNICO e RISCO DE PRODUTO: precisao e privacidade |
| Ajuste de porcao | Recalcular macros proporcionalmente | Confirmada | Requer testes de calculo |
| Rastreamento de agua | Registrar consumo de agua com botoes rapidos | Confirmada | Observada no brownfield |
| Dashboard diario | Exibir metas, macros, agua, peso, bioimpedancia, treino e gasto estimado | Confirmada | Tela `Inicio` |
| Historico diario | Arquivar e consultar dias anteriores | Confirmada | RISCO DE PRODUTO: navegacao para historico pode estar inacessivel |
| Exportacao CSV/PDF | Exportar historico diario | Confirmada | RISCO TECNICO: dependencia `jspdf` com vulnerabilidades reportadas |
| Planejamento alimentar semanal | Planejar refeicoes por dia da semana e tipo | Confirmada | Tela `Plano` |
| Importacao de plano alimentar por IA | Converter texto em plano alimentar | Confirmada | RISCO TECNICO: validacao de retorno de IA |
| Importacao facilitada de dieta propria | Permitir colar/importar a propria dieta por formatos simples e revisar antes de salvar | Confirmada | Formas facilitadas ainda precisam ser definidas |
| Gerador de dieta semanal por IA | Gerar dieta semanal | Confirmada | RISCO DE PRODUTO: recomendacao nutricional sensivel |
| Perfil e metas | Cadastrar perfil, objetivo, atividade, preferencia alimentar e metas | Confirmada | Regras de calculo precisam ser documentadas |
| Registro de peso e bioimpedancia | Salvar peso e dados corporais | Confirmada | Bioimpedancia deve ser opcional, mas disponivel |
| Backup/importacao/reset | Exportar, importar e resetar dados locais | Confirmada | RISCO TECNICO: validacao insuficiente do backup |
| Tema claro/escuro | Alternar tema visual | Confirmada | Observada no brownfield |
| Cadastro e registro de treinos | Criar treinos e registrar execucao | Confirmada | Tela `Treino` |
| Planejador semanal de treinos | Organizar treinos por semana | Confirmada | Subtela `Agenda` |
| Importacao/geracao de treino por IA | Criar ou importar plano de treino com IA | Confirmada | RISCO DE PRODUTO: recomendacoes fisicas inadequadas |
| Aplicacao rapida de recomendacoes ao diario | Transformar planos e sugestoes em registros com poucos toques | Confirmada | Usuario mantem liberdade total de preenchimento |
| Analise de equipamento por imagem | Usar IA para analisar equipamento de academia | Confirmada | Feature mantida no escopo, com validacao de utilidade |
| Registro de passos e cardio | Registrar passos, cardio, duracao, intensidade e calorias | Confirmada | Regras de estimativa precisam de criterio |
| Estimativa personalizada de gasto calorico em treino | Impactar metas/calorias usando metabolismo, carga, repeticoes e historico quando disponivel | Confirmada | Regras precisam ser documentadas e validadas |
| PWA | Instalar/usar como Progressive Web App | Confirmada | Assets e metadata ainda precisam ser productizados |

## 7. Funcionalidades secundarias

| Funcionalidade | Valor esperado | Risco de escopo | Status |
|---|---|---|---|
| Scanner de codigo de barras | Facilitar cadastro de alimentos industrializados | Alto | Backlog futuro; prioridade menor que reutilizacao de registros |
| Coach insights | Gerar insights personalizados de progresso | Medio | DÚVIDA / RISCO DE ESCOPO |
| Templates de refeicao | Reutilizar e copiar refeicoes frequentes | Medio | Confirmada / Futuro |
| Templates de treino | Reutilizar e copiar rotinas frequentes | Medio | Confirmada / Futuro |
| Relatorios semanais/mensais | Melhorar acompanhamento de progresso | Medio | Hipotese |
| Conquistas/habitos | Aumentar engajamento | Medio | Hipotese / RISCO DE PRODUTO |
| Biblioteca de alimentos | Reduzir entrada manual | Alto | Hipotese / RISCO DE ESCOPO |
| Biblioteca de exercicios | Padronizar treinos | Alto | Hipotese / RISCO DE ESCOPO |
| Sugestoes de receitas por IA | Complementar o planejamento alimentar com ideias de preparo | Medio | Secundaria confirmada |
| Autenticacao | Permitir conta, protecao e possivel sync | Alto | DÚVIDA / RISCO DE ESCOPO |
| Sincronizacao multi-dispositivo | Permitir uso em varios aparelhos | Alto | DÚVIDA / RISCO TECNICO |

## 8. Brainstorming Controlado

Esta secao serve para explorar possibilidades, nao para definir escopo aprovado.

Nenhuma ideia desta secao deve ser considerada requisito obrigatorio sem decisao humana posterior.

### 8.1 Ideias possiveis para o produto

| Ideia | Valor potencial | Complexidade | Risco de escopo | Recomendacao |
|---|---|---|---|---|
| Sprint de estabilizacao antes de novas features | Alto | Media | Baixo | MVP |
| Proxy server-side para chamadas de IA | Alto | Media | Medio | MVP, se o app for publico |
| Disclaimers claros sobre IA, saude, nutricao e treino | Alto | Baixa | Baixo | MVP |
| Validacao estruturada de backup e respostas de IA | Alto | Media | Baixo | MVP |
| Testes minimos de calculos, persistencia e importacao | Alto | Media | Baixo | MVP |
| Acesso ao historico pela navegacao principal | Medio | Baixa | Baixo | MVP |
| Templates de refeicoes e treinos | Medio | Media | Medio | Futuro |
| Relatorio semanal simples | Medio | Media | Medio | Futuro |
| Preparacao da modelagem para futura evolucao com Supabase | Alto | Media | Medio | Futuro planejado |
| Login opcional | Alto | Alta | Alto | Requer decisao |
| Sync em nuvem com Supabase ou equivalente | Alto | Alta | Alto | Futuro / Requer decisao |
| Scanner de codigo de barras com base de alimentos | Alto | Alta | Alto | Futuro |
| Plano pago/assinatura | DÚVIDA | Alta | Alto | Requer decisao |
| Modo profissional para nutricionista/personal | Alto | Alta | Alto | Descartar por enquanto |

### 8.2 Possiveis diferenciais

- IA para reduzir entrada manual de refeicoes e treinos: `Possivel MVP`, desde que seguranca da chave e validacao sejam resolvidas.
- Local-first com backup: `Possivel MVP`, se o posicionamento for privacidade e simplicidade.
- Dashboard integrado de dieta, treino e composicao corporal: `Possivel MVP`.
- Geracao semanal de dieta e treino por IA: `Recomendacao assistida`, nao prescricao automatica.
- Analise de imagem de refeicao/equipamento: `Manter no escopo`, com validacao continua.
- Sincronizacao multi-dispositivo: `Versao futura`, preferencialmente preparada para Supabase.
- Modo profissional para acompanhamento por nutricionista/personal: `Arriscado para escopo`.
- Gamificacao e conquistas: `Descartar por enquanto`.

### 8.3 Versoes possiveis do produto

#### Versao 1 — MVP enxuto

- Foco: estabilizar o produto atual como app pessoal local-first.
- Funcionalidades incluidas: registro diario de refeicoes, agua, peso, bioimpedancia opcional, treino, cardio/passos, dashboard, progresso, plano alimentar, plano de treino, backup/importacao, exportacao e IA ja existente apenas se protegida.
- Funcionalidades excluidas: login, sync, monetizacao, marketplace, modo profissional, biblioteca ampla, scanner de codigo de barras e gamificacao.
- Risco: manter IA sem protecao de chave ou sem validacao adequada.
- Por que faz sentido: reduz retrabalho, preserva a fase local-first e deixa o produto pronto para evolucao futura sem obrigar backend agora.

#### Versao 2 — Produto intermediario

- Foco: melhorar confiabilidade, navegacao, relatorios e reutilizacao.
- Funcionalidades incluidas: tudo do MVP enxuto, relatorio semanal/mensal simples, templates de refeicoes/treinos, historico mais acessivel, importacao facilitada de dieta propria, assets PWA proprios, textos productizados e validacoes mais robustas.
- Funcionalidades excluidas: sync obrigatorio, modo profissional, monetizacao complexa e integracoes externas grandes.
- Risco: adicionar comodidades antes de resolver privacidade e testes.
- Por que faz sentido: melhora uso recorrente sem mudar radicalmente o modelo de produto.

#### Versao 3 — Produto completo

- Foco: evoluir para produto publicavel com contas, sincronizacao e estrategia comercial, se essa for a decisao humana.
- Funcionalidades incluidas: autenticacao, sync opcional, armazenamento seguro, camada server-side, historico multi-dispositivo, politicas de privacidade e possivel plano pago, preferencialmente sobre Supabase ou equivalente.
- Funcionalidades excluidas: Não informado; dependeria da estrategia.
- Risco: alto custo tecnico, legal, de seguranca e de suporte.
- Por que faz sentido: somente se houver intencao real de distribuir para usuarios externos.

### 8.4 Ideias que NÃO devem entrar agora

- Modo nutricionista/personal:
  - Por que e tentadora: aumenta valor percebido e abre possibilidade B2B.
  - Por que e arriscada: muda publico, permissoes, dados, responsabilidade e fluxos.
  - Quando considerar: depois de validar o app individual e definir privacidade, contas e compliance.
- Sincronizacao em nuvem:
  - Por que e tentadora: resolve multi-dispositivo e backup automatico.
  - Por que e arriscada: exige autenticacao, backend, seguranca, privacidade e migracao de dados.
  - Quando considerar: apos decisao clara de produto publicavel; Supabase e uma direcao futura aceitavel, nao uma obrigacao imediata.
- Scanner de codigo de barras:
  - Por que e tentadora: facilita cadastro de alimentos.
  - Por que e arriscada: depende de base de produtos, qualidade de dados e UX de camera.
  - Quando considerar: apos resolver as features centrais e decidir integracoes.
- Gamificacao:
  - Por que e tentadora: pode aumentar engajamento.
  - Por que e arriscada: pode distrair do valor central e inflar design/regra de negocio.
  - Quando considerar: apos medir retencao e comportamento real de uso.
- Monetizacao:
  - Por que e tentadora: transforma o app em negocio.
  - Por que e arriscada: exige proposta de valor, planos, pagamento, suporte e politicas.
  - Quando considerar: depois de definir publico, riscos de IA e posicionamento.

## 9. Fluxos de usuario

### Fluxo 1 — Registrar refeicao manualmente

- Usuario: usuario individual.
- Objetivo: adicionar refeicao ao dia atual.
- Passos provaveis: abrir Inicio, selecionar/adicionar refeicao, informar alimento/macros, salvar, ver impacto no dashboard.
- Resultado esperado: refeicao aparece no dia e macros sao atualizados.
- Duvidas: campos obrigatorios, edicao apos salvar, exclusao, refeicoes favoritas e comportamento de porcao.
- Riscos: erro de calculo e perda/corrupcao de dados locais.

### Fluxo 2 — Analisar refeicao com IA

- Usuario: usuario individual que quer reduzir entrada manual.
- Objetivo: transformar texto ou imagem em estimativa nutricional.
- Passos provaveis: enviar descricao/imagem, IA retorna alimentos/macros, usuario revisa, ajusta porcao e salva.
- Resultado esperado: dados estruturados entram no diario.
- Duvidas: o usuario sempre revisa antes de salvar? ha alerta de imprecisao? como deixar claro que a imagem nao sera persistida localmente?
- Riscos: RISCO TECNICO por retorno malformado; RISCO DE PRODUTO por estimativa errada; RISCO DE PRIVACIDADE se imagem contiver dados sensiveis.

### Fluxo 3 — Acompanhar dashboard diario

- Usuario: usuario individual.
- Objetivo: ver progresso do dia contra metas.
- Passos provaveis: abrir app, consultar calorias/macros/agua/treino/cardio/peso, decidir proxima acao.
- Resultado esperado: status do dia fica claro.
- Duvidas: quais indicadores sao essenciais no MVP? como lidar com metas nao configuradas?
- Riscos: excesso de informacao pode reduzir clareza.

### Fluxo 4 — Planejar dieta semanal

- Usuario: usuario individual.
- Objetivo: montar plano alimentar por semana.
- Passos provaveis: acessar Plano, criar/importar/gerar dieta, revisar refeicoes por dia e salvar.
- Resultado esperado: plano semanal fica disponivel como recomendacao e pode ser transformado em registros diarios com poucos toques.
- Duvidas: quais formatos de importacao facilitada de dieta propria entram no MVP? pode editar itens gerados?
- Riscos: RISCO DE PRODUTO se a dieta gerada parecer prescricao nutricional sem validação.

### Fluxo 5 — Registrar treino e cardio

- Usuario: usuario individual.
- Objetivo: registrar execucao fisica e gasto estimado.
- Passos provaveis: acessar Treino, selecionar registro/agenda/cardio, inserir treino ou cardio/passos, salvar.
- Resultado esperado: execucao aparece no dia, atualiza progresso e impacta metas/calorias com gasto estimado.
- Duvidas: como formalizar a estimativa baseada em metabolismo, carga, repeticoes e historico de uso?
- Riscos: calculo inconsistente e recomendacao fisica inadequada.

### Fluxo 6 — Exportar, importar ou resetar dados

- Usuario: usuario individual.
- Objetivo: preservar, migrar ou apagar dados locais.
- Passos provaveis: acessar Perfil/Historico, exportar CSV/PDF/JSON, importar backup ou resetar.
- Resultado esperado: dados sao exportados/importados/resetados com confirmacao.
- Duvidas: ha validacao de formato? ha confirmacao forte para reset? ha versao de backup? qual sera o papel do backup quando houver sync futuro?
- Riscos: RISCO TECNICO alto se backup invalido corromper estado.

## 10. Telas necessarias

| Tela | Finalidade | Obrigatoria? | Duvidas |
|---|---|---|---|
| Inicio | Dashboard diario, agua, refeicoes e resumo | Sim | Quais cards sao essenciais no MVP? |
| Progresso | Graficos de calorias, macros, peso, bioimpedancia e treino | Sim | Quais periodos e metricas sao obrigatorios? |
| Plano | Planejamento alimentar semanal e gerador de dieta | Sim | Funciona como recomendacao com adicao facilitada ao diario |
| Receitas | Sugestoes de receitas por IA | Nao | Funcionalidade secundaria |
| Treino | Registro, agenda, cardio e gerador/importador de treino | Sim | Tem o mesmo peso de dieta no produto |
| Perfil | Perfil, metas, preferencias, backup/importacao/reset | Sim | Quais dados de perfil sao obrigatorios? |
| Historico | Calendario e exportacoes | Sim | Tela parece existir, mas acesso pela navegacao principal esta duvidoso |
| Onboarding | Configurar metas e perfil inicial | Hipotese | Nao informado se existe ou se precisa existir |
| Avisos/consentimento | Explicar limites de IA e privacidade | Hipotese | Necessario se produto for publico |

## 11. Regras de negocio

| Regra | Status | Observacao |
|---|---|---|
| Dados sao persistidos localmente na chave `nutritrack_data` | Confirmada | Observado no brownfield |
| O dia anterior e arquivado quando o dia muda | Confirmada | RISCO: depende da abertura/uso do app |
| Metas nutricionais sao estimadas a partir do perfil | Confirmada | Formula precisa ser documentada |
| Porcao recalcula macros proporcionalmente | Confirmada | Requer criterios de arredondamento |
| Passos e cardio geram gasto estimado | Confirmada | Formula precisa ser documentada |
| Backup JSON pode restaurar dados locais | Confirmada | Validacao precisa ser detalhada |
| IA deve retornar dados estruturados consumidos pelo app | Confirmada | RISCO TECNICO: parsing e schema |
| Usuario precisa revisar recomendacoes de IA antes de salvar | Confirmada | IA atua como recomendacao; usuario mantem liberdade total de preenchimento |
| App pode ser usado sem login | Confirmada | Direcao atual do MVP |
| App deve funcionar offline para dados salvos | Confirmada | IA exige conexao, mas os dados locais devem continuar acessiveis offline |
| Planos de dieta e treino nao preenchem o diario automaticamente | Confirmada | Devem ser recomendacoes com adicao facilitada aos registros |
| Treinos impactam metas e calorias do dia | Confirmada | Estimativa deve considerar metabolismo, carga, repeticoes e historico quando disponivel |
| Bioimpedancia e opcional | Confirmada | Campos ficam disponiveis, mas nao obrigatorios |
| Perfil completo e historico de uso alimentam calculos e IA | Confirmada | Personalizacao depende desses dados |
| Imagens enviadas para IA nao sao persistidas localmente por enquanto | Confirmada | Reduz consumo de memoria e risco de privacidade |
| Estrutura de dados deve facilitar futura evolucao com Supabase | Confirmada | Sem virar dependencia do MVP atual |

As regras de negocio ainda precisam ser detalhadas.

## 12. Dados e entidades

| Entidade/Dado | Por que precisa existir | Status | Duvidas |
|---|---|---|---|
| Usuario/perfil | Calcular metas e personalizar dieta/treino | Confirmado | Perfil completo deve alimentar calculos e IA |
| Metas nutricionais | Comparar consumo diario com objetivo | Confirmado | Sao calculadas, editaveis ou ambas? |
| Refeicao | Registrar consumo alimentar | Confirmado | Campos minimos, edicao e exclusao |
| Alimento/item da refeicao | Detalhar macros por item | Hipotese | Nao detalhado no brownfield |
| Agua | Acompanhar hidratacao | Confirmado | Unidade e meta padrao |
| Peso | Acompanhar evolucao corporal | Confirmado | Frequencia e historico |
| Bioimpedancia | Registrar composicao corporal | Confirmado | Campos disponiveis, porem opcionais |
| Treino | Armazenar rotinas cadastradas | Confirmado | Estrutura de exercicios/series |
| Treino executado | Registrar conclusao no dia | Confirmado | Impacta progresso, metas e gasto estimado |
| Plano alimentar semanal | Planejar refeicoes | Confirmado | Funciona como recomendacao com adicao rapida ao diario |
| Plano semanal de treino | Planejar agenda | Confirmado | Deve impactar metas/calorias com estimativa personalizada |
| Cardio | Registrar atividade aerobica | Confirmado | Formula de calorias |
| Passos | Registrar movimentacao diaria | Confirmado | Entrada manual ou integracao futura |
| Historico diario | Consultar dias anteriores e exportar | Confirmado | Tambem deve apoiar IA e planejamento futuro |
| Historico de uso | Personalizar sugestoes e estimativas | Confirmado | Escopo de uso precisa ser detalhado |
| Backup JSON | Portabilidade dos dados locais | Confirmado | Recurso atual; pode perder relevancia com sync futuro |
| Imagens enviadas para IA | Analise de refeicao/equipamento | Confirmado | Devem ser descartadas apos analise, sem persistencia local |

## 13. Usuários e permissões

- Login: fora do escopo atual do MVP; preparar futura evolucao com Supabase ou equivalente sem depender disso agora.
- Tipos de usuario: usuario individual comum e usuario individual avancado.
- Permissoes: no MVP atual, sem perfis internos ou hierarquia de acesso.
- Administrador: Não informado.
- Cliente: Não aplicavel no foco atual.
- Colaborador: Não informado.
- Acesso publico: DÚVIDA. Se publicado, ha risco de chave de IA exposta e dados sensiveis locais.
- Acesso privado: DÚVIDA. Pode continuar como app pessoal/local em fase inicial.
- Camera: Confirmada como permissao relevante para imagens/refeicoes/equipamentos e metadata PWA.

DECISÃO HUMANA: definir se o produto continua local-first sem conta ou se evolui para contas, backend, sincronizacao e permissoes em uma fase futura.

## 14. Integrações necessárias

| Integracao | Finalidade | Status | Risco |
|---|---|---|---|
| Gemini / Google GenAI | Analise e geracao de refeicoes, dietas, receitas, treinos e equipamentos | Confirmada | Alto |
| Camera do dispositivo | Capturar imagens para IA e possivel scanner | Confirmada | Medio |
| PWA/service worker | Instalacao e experiencia app-like | Confirmada | Medio |
| Exportacao PDF | Gerar historico em PDF | Confirmada | Medio |
| Exportacao CSV | Gerar historico em CSV | Confirmada | Baixo |
| Base de codigo de barras/alimentos | Scanner de produtos | Backlog futuro | Alto |
| Backend/proxy server-side | Proteger chave de IA e validar payloads | Hipotese | Alto |
| Autenticacao | Conta e possivel sync | DÚVIDA | Alto |
| Armazenamento em nuvem | Sincronizacao multi-dispositivo | DÚVIDA | Alto |
| Supabase | Caminho futuro para auth, sync e armazenamento, se essa fase existir | Direcao futura | Medio |

## 15. Monetizacao

No momento nao ha intencao definida de cobrar pelo produto ou pelo uso de IA.

Direcao atual:

- Monetizacao fica fora do escopo atual.
- Se o produto virar publico no futuro, sera necessario reavaliar custo de IA, limites de uso e modelo economico.

## 16. Criterios de sucesso

### Criterios confirmados

- Progresso fisico e um dos sinais principais de sucesso do produto.

### Criterios sugeridos

- Reduzir tempo de registro de refeicoes usando texto/imagem e ajustes de porcao.
- Centralizar dieta, hidratacao, treino, cardio, passos, peso e bioimpedancia.
- Ajudar o usuario a perceber e acompanhar progresso fisico ao longo do tempo.
- Evitar perda de dados por meio de backup/exportacao/importacao confiavel.
- Aumentar clareza do progresso diario contra metas.
- Reduzir erros de importacao, parsing de IA e calculos por validacao e testes.
- Tornar o produto seguro o bastante para uso fora do ambiente local, se esse for o objetivo.
- Melhorar confianca do usuario com disclaimers e revisao humana de sugestoes de IA.

## 17. Riscos

### Riscos tecnicos

- RISCO TÉCNICO: `GEMINI_API_KEY` exposta no bundle front-end pode gerar abuso, custo e comprometimento do produto.
- RISCO TÉCNICO: dados sensiveis em `localStorage` sem criptografia, autenticacao ou controle de acesso.
- RISCO TÉCNICO: `npm audit` reporta vulnerabilidades moderadas, altas e criticas.
- RISCO TÉCNICO: ausencia de testes automatizados para calculos, persistencia, backup/importacao e IA.
- RISCO TÉCNICO: respostas de IA podem vir malformadas e quebrar parsing.
- RISCO TÉCNICO: importacao de backup com pouca validacao pode corromper estado local.
- RISCO TÉCNICO: bundle grande pode afetar performance mobile.
- RISCO TÉCNICO: falta de migracoes/versionamento de dados locais.

### Riscos de produto

- RISCO DE PRODUTO: usuario pode interpretar sugestoes de dieta/treino por IA como orientacao profissional.
- RISCO DE PRODUTO: escopo muito amplo mistura dieta, treino, bioimpedancia, cardio, IA e PWA, podendo prejudicar clareza.
- RISCO DE PRODUTO: publico comum e avancado podem exigir niveis diferentes de detalhamento e UX.
- RISCO DE PRODUTO: historico pode estar inacessivel pela navegacao principal.
- RISCO DE PRODUTO: README, titulo e metadata ainda parecem prototipo, reduzindo confianca.
- RISCO DE PRODUTO: estimativas incorretas de macros, gasto calorico ou treino podem frustrar ou induzir erro.

### Riscos de escopo

- RISCO DE ESCOPO: adicionar login e sync muda arquitetura, seguranca, dados e suporte.
- RISCO DE ESCOPO: scanner de codigo de barras exige base de dados confiavel.
- RISCO DE ESCOPO: modo nutricionista/personal altera publico, permissoes e responsabilidade.
- RISCO DE ESCOPO: gamificacao pode distrair da estabilizacao do MVP.
- RISCO DE ESCOPO: monetizacao antes de proposta de valor clara cria retrabalho.
- RISCO DE ESCOPO: preparar terreno para Supabase cedo demais pode empurrar backend prematuro para um MVP local-first.
- RISCO DE ESCOPO: adicionar novas features antes de corrigir chave de IA, testes e validacao aumenta risco de regressao.

## 18. Dúvidas em aberto

As perguntas sobre publico comum/avancado, peso equivalente entre dieta e treino, receitas como funcionalidade secundaria, persistencia de imagens, monetizacao atual, modo offline, comportamento do plano alimentar, impacto do treino nas metas e opcionalidade da bioimpedancia ja receberam direcionamento nesta revisao.

| Duvida | Categoria | Impacto | Prioridade |
|---|---|---|---|
| O produto sera app pessoal local-only ou app publico para multiplos usuarios? | Objetivo | Alto | Critica |
| IA deve continuar ativa no MVP antes de existir protecao server-side da chave? | Integracao | Alto | Critica |
| O produto precisa de login, sync e backend agora ou isso fica fora do MVP? | Usuarios e permissoes | Alto | Critica |
| Quais limites legais/UX serao usados para recomendacoes de IA sobre nutricao e treino? | Riscos | Alto | Critica |
| O historico deve ser uma tela obrigatoria na navegacao principal? | Fluxo | Medio | Normal |
| Backup/importacao deve bloquear arquivos invalidos com schema versionado? | Dados | Alto | Normal |
| Quais formatos de importacao facilitada de dieta propria entram no MVP? | Funcionalidade | Medio | Normal |
| `CoachInsights` deve ser removido, integrado ou mantido fora do escopo? | Funcionalidade | Medio | Normal |

## 19. Perguntas essenciais para fechar o escopo

As perguntas abaixo permanecem realmente em aberto apos esta revisao. As demais ja receberam direcao preliminar suficiente para orientar o proximo PRD.

### Pergunta 1 — CRÍTICA

- Categoria: objetivo do produto.
- Pergunta: o NutriTrack deve ser tratado como app pessoal local-only, prototipo privado ou produto publicavel para usuarios externos?
- Por que importa: define seguranca, privacidade, backend, autenticacao, suporte e nivel de qualidade esperado.
- O que muda dependendo da resposta: local-first pode priorizar backup e estabilidade; produto publico exige protecao de chave, politicas, hardening e possivelmente backend.

### Pergunta 2 — CRÍTICA

- Categoria: integracoes.
- Pergunta: as funcionalidades de IA devem permanecer no MVP mesmo com a chave Gemini atualmente exposta no front-end?
- Por que importa: e o maior risco tecnico identificado.
- O que muda dependendo da resposta: manter IA exige proxy/server-side ou mitigacao; remover/desativar IA reduz valor mas tambem reduz risco imediato.

### Pergunta 3 — CRÍTICA

- Categoria: usuarios e permissoes.
- Pergunta: o MVP precisa de login, contas e sincronizacao multi-dispositivo, ou esses itens ficam explicitamente fora do escopo inicial enquanto a estrutura apenas se prepara para um futuro com Supabase?
- Por que importa: muda arquitetura, dados, privacidade e custo.
- O que muda dependendo da resposta: com login/sync, o PRD precisa de permissoes, backend e dados em nuvem; sem login/sync, o PRD foca localStorage, backup e privacidade local.

### Pergunta 4 — CRÍTICA

- Categoria: riscos.
- Pergunta: quais limites o produto deve impor para recomendacoes de dieta e treino geradas por IA, incluindo avisos, revisao humana e responsabilidade?
- Por que importa: dieta, treino e dados corporais podem afetar saude e confianca.
- O que muda dependendo da resposta: pode exigir disclaimers, bloqueios, revisao antes de salvar, linguagem cautelosa e criterios de aceite especificos.

### Pergunta 5

- Categoria: dados que serao salvos.
- Pergunta: o backup JSON precisa ter versao de schema e validacao forte antes de importar?
- Por que importa: importacao invalida pode corromper todo o estado local.
- O que muda dependendo da resposta: define trabalho de validacao, mensagens de erro e migracao.

### Pergunta 6

- Categoria: telas e fluxos.
- Pergunta: a tela Historico deve aparecer na navegacao principal ou ser acessada por outro ponto claro?
- Por que importa: historico/exportacao sao funcionalidades confirmadas, mas podem estar pouco acessiveis.
- O que muda dependendo da resposta: altera mapa de navegacao e criterios de aceite.

### Pergunta 7

- Categoria: funcionalidades obrigatorias.
- Pergunta: quais formatos de importacao facilitada de dieta propria entram no MVP?
- Por que importa: o usuario quer liberdade total de preenchimento, mas tambem precisa de formas rapidas de aproveitar dietas ja existentes.
- O que muda dependendo da resposta: altera UX de colar texto, importar plano, revisar sugestoes e salvar.

### Pergunta 8

- Categoria: funcionalidades opcionais.
- Pergunta: `CoachInsights` deve ser removido, integrado ou mantido como experimento fora do escopo?
- Por que importa: componente aparentemente morto aumenta manutencao e confusao de produto.
- O que muda dependendo da resposta: decide limpeza tecnica ou entrada planejada no roadmap.

## 20. Pontos que precisam de decisão humana

| Decisao | Por que precisa de humano | Impacto |
|---|---|---|
| Definir posicionamento: app pessoal, prototipo privado ou produto publico | Define nivel de seguranca, privacidade e arquitetura | Alto |
| Definir se IA fica no MVP e sob quais protecoes | Ha risco de chave exposta e recomendacoes sensiveis | Alto |
| Definir se havera login/sync/backend agora ou apenas preparacao para futuro Supabase | Muda completamente o escopo tecnico e de dados | Alto |
| Definir limites de responsabilidade sobre nutricao/treino | Impacta UX, disclaimers e riscos de produto | Alto |
| Definir se historico/exportacao entram como fluxos centrais na navegacao | Afeta navegacao e criterios de aceite | Medio |
| Definir schema/versionamento forte de backup | Afeta seguranca do estado local | Medio |
| Definir formatos de importacao facilitada de dieta propria | Afeta UX do fluxo de planejamento | Medio |
| Definir destino de `CoachInsights` | Evita codigo morto e escopo fantasma | Medio |

## 21. Lacunas adicionais não bloqueantes

- Identidade visual final, icones PWA e metadata de produto.
- Tom de voz do app para alertas de IA e saude.
- Regras de arredondamento de macros e calorias.
- Periodos padrao de relatorios de progresso.
- Formato final de exportacao PDF/CSV.
- Politica de retencao local de dados.
- Escopo de uso do historico para personalizacao de IA e calculos.
- Formatos de importacao facilitada de dieta propria.
- Nomes finais das abas e subtelas.
- Estrategia de onboarding.
- Nivel de acessibilidade esperado.
- Suporte a internacionalizacao ou apenas portugues.

## 22. Recomendações para a próxima etapa

Recomendacao: responder as duvidas criticas remanescentes antes de fechar o PRD.

O proximo passo mais seguro e fechar primeiro as decisoes sobre posicionamento do produto, permanencia da IA no MVP, necessidade de login/sync/backend e limites de responsabilidade das recomendacoes de saude. Em seguida, vale consolidar as definicoes de backup, historico e importacao facilitada de dieta propria.

Antes de adicionar novas funcionalidades, recomenda-se uma sprint curta de estabilizacao, agora ja respaldada pela direcao atual: proteger ou desativar IA em builds publicos, corrigir vulnerabilidades, adicionar validacao de dados, criar testes minimos, productizar metadata/README e decidir o fluxo do historico.

## 23. O que o proximo modelo NÃO deve fazer

- Nao criar PRD final sem responder perguntas criticas.
- Nao inventar funcionalidades.
- Nao escolher stack tecnica sem autorizacao.
- Nao transformar hipoteses em requisitos.
- Nao transformar brainstorming em escopo aprovado.
- Nao ignorar riscos de escopo.
- Nao simplificar duvidas importantes.
- Nao assumir monetizacao.
- Nao assumir permissoes.
- Nao criar telas desnecessarias.
- Nao avancar para implementacao.
- Nao tratar recomendacoes de IA como orientacao profissional sem limites claros.
- Nao assumir que produto publico pode manter chave de IA no front-end.
- Nao adicionar sync/login sem decisao humana.

## 24. Saída obrigatória para continuidade

### 24.1 Ideia consolidada

NutriTrack e um PWA mobile-first para acompanhamento pessoal de dieta, hidratacao, treino, cardio, passos, peso e bioimpedancia, com apoio de IA para reduzir trabalho manual em analise de refeicoes, geracao/importacao de dietas, sugestao de receitas e estruturacao de treinos.

### 24.2 Problema que o produto resolve

O produto centraliza registros e planejamento de rotina alimentar e fisica, reduzindo a friccao de entrada manual e ajudando o usuario a acompanhar metas diarias e evolucao. O foco atual ja aponta para usuarios individuais comuns e avancados, embora o posicionamento final entre app pessoal/local-first e produto publico ainda precise ser fechado.

### 24.3 Publico-alvo

Publico-alvo atual: usuario individual comum e usuario individual avancado que querem acompanhar a propria dieta, macros, hidratacao, treino e progresso corporal. Profissionais, clientes, grupos e usuarios pagantes ficam fora do foco atual.

### 24.4 Escopo inicial

- Registro diario de refeicoes e macros.
- Registro de agua.
- Dashboard diario com metas e progresso.
- Historico diario e exportacao.
- Perfil, metas e preferencias.
- Peso e bioimpedancia opcional.
- Planejamento alimentar semanal como recomendacao, com adicao facilitada aos registros.
- Importacao facilitada de dieta propria, em formatos ainda a definir.
- Registro e planejamento de treinos.
- Cardio e passos.
- Impacto de treino nas metas/calorias com estimativa personalizada.
- Backup/importacao/reset de dados locais.
- PWA mobile-first.
- IA existente apenas com decisao explicita sobre seguranca, chave e limites.
- Preparacao da modelagem para futura evolucao com Supabase, sem backend obrigatorio no MVP.

### 24.5 Fora de escopo inicial

- Login obrigatorio, salvo decisao humana contraria.
- Sincronizacao multi-dispositivo.
- Modo nutricionista/personal.
- Monetizacao.
- Scanner de codigo de barras integrado.
- Biblioteca ampla de alimentos ou exercicios.
- Gamificacao/conquistas.
- Marketplace ou comunidade.
- Novas grandes features antes de estabilizacao tecnica.

### 24.6 Riscos

- RISCO TÉCNICO: chave Gemini exposta no front-end.
- RISCO TÉCNICO: dados sensiveis em `localStorage`.
- RISCO TÉCNICO: vulnerabilidades reportadas por `npm audit`.
- RISCO TÉCNICO: ausencia de testes automatizados.
- RISCO TÉCNICO: parsing e validacao fragil de respostas de IA e backups.
- RISCO DE PRODUTO: recomendacoes de IA podem ser interpretadas como orientacao profissional.
- RISCO DE PRODUTO: usuarios comuns e avancados podem exigir UX e profundidade diferentes.
- RISCO DE ESCOPO: login, sync, modo profissional, scanner e monetizacao podem inflar o MVP.
- RISCO DE ESCOPO: preparar cedo demais para Supabase pode puxar backend prematuro para um MVP local-first.

### 24.7 Duvidas em aberto

- O produto e pessoal/local-only ou publico?
- IA permanece no MVP? Com qual protecao?
- Havera login, sync e backend?
- Quais limites de responsabilidade serao aplicados a IA?
- Historico deve entrar na navegacao principal?
- Backup tera schema versionado e validacao forte?
- Quais formatos de importacao facilitada de dieta propria entram no MVP?
- Qual sera o destino de `CoachInsights`?

### 24.8 Criterios iniciais de aceite

- Usuario consegue registrar refeicao manual e ver macros atualizados no dashboard.
- Usuario consegue registrar agua e ver progresso contra meta.
- Usuario consegue registrar peso e bioimpedancia opcional e consultar progresso.
- Usuario consegue registrar treino/cardio/passos e consultar impacto diario nas metas/calorias.
- Usuario consegue criar ou consultar plano alimentar semanal como recomendacao e adiciona-lo ao diario com poucos toques.
- Usuario consegue exportar historico e backup.
- Importacao de backup invalido nao corrompe dados existentes.
- Historico diario e acessivel por fluxo claro.
- Imagens enviadas para IA nao ficam persistidas localmente por padrao.
- Dados locais continuam acessiveis offline; IA exige conexao.
- Perfil completo e historico de uso podem ser considerados para personalizacao de dieta e treino.
- Dados sensiveis e uso de IA possuem avisos/limites adequados, se o produto for publico.
- Chave de IA nao fica exposta em build publico, se IA permanecer ativa.
- Fluxos principais possuem testes minimos definidos antes de evolucao.

### 24.9 Próximo passo recomendado

Fechar as duvidas criticas remanescentes e executar uma sprint curta de estabilizacao antes da criacao do PRD mestre final.
