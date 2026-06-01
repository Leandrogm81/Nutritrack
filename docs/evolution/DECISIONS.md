# DECISIONS

Registro de decisoes permanentes do projeto.

## Formato

```markdown
## [data] - [titulo da decisao]

### Contexto
[situacao]

### Decisao
[o que foi decidido]

### Motivo
[por que]

### Impacto
[efeito pratico]

### Status
[ativa / substituida / revogada]
```

## Decisoes iniciais deste framework

### 2026-05-28 - Planilha como mapa, Markdown como fonte dos prompts

**Decisao:** manter a planilha como indice/roteador e armazenar prompts completos em arquivos `.md`.

**Motivo:** a planilha e melhor para navegacao visual; Markdown e melhor para prompts longos, versionamento e manutencao.

**Status:** ativa.

### 2026-05-28 - Menor numero significa maior prioridade na hierarquia de documentos

**Decisao:** corrigir a ambiguidade da lacuna L4: prioridade 1 e a mais alta.

**Motivo:** evita interpretacao contraditoria entre texto e tabela.

**Status:** ativa.

## 2026-05-28 - Direcao atual do MVP do NutriTrack

### Contexto

Durante a revisao do pre-PRD do NutriTrack, o usuario definiu varios pontos de produto que deixaram de ser hipotese e passaram a orientar o escopo atual.

### Decisao

- O foco atual do produto e usuario individual comum e usuario individual avancado.
- Dieta e treino tem o mesmo peso no produto.
- Planos e sugestoes de IA sao recomendacoes; o usuario mantem liberdade total para registrar manualmente suas refeicoes e treinos.
- Bioimpedancia deve estar disponivel, mas nao obrigatoria.
- Perfil completo e historico de uso devem alimentar calculos e personalizacao por IA.
- O app permanece local-first no MVP atual: dados locais precisam funcionar offline, enquanto IA exige conexao.
- A estrutura pode ser preparada para futura evolucao com Supabase, sem transformar isso em dependencia obrigatoria do MVP.
- Monetizacao fica fora do escopo atual.

### Motivo

Essas definicoes reduzem ambiguidade no escopo, alinham o produto ao uso esperado pelo usuario e evitam que o MVP cresca para backend, sync ou prescricao automatica antes da hora.

### Impacto

O PRD e as proximas tarefas devem tratar IA como assistencia revisavel, manter foco em uso individual, considerar treino e dieta como pilares equivalentes, e preservar uma arquitetura local-first com possibilidade de evolucao futura.

### Status

ativa

## 2026-05-28 - Fechamentos do PRD apos revisao do usuario

### Contexto

Apos a criacao do PRD do NutriTrack, o usuario revisou o documento por diff comments e respondeu pontos que ainda estavam em aberto no escopo do MVP.

### Decisao

- O MVP atual continua local-first para uso individual, mas a direcao futura do produto e tornar-se publico.
- A IA permanece ativa no MVP.
- Qualquer fase publica com IA exige camada server-side/proxy e segredo fora do cliente.
- Login, backend e sync continuam fora do MVP atual; ficam como evolucao futura.
- O historico deve existir como tela principal de primeiro nivel.
- O backup deve usar schema versionado e validacao forte.
- A importacao facilitada de dieta propria deve aceitar texto simples colado e arquivos `.doc`, `.md`, `.txt` e `.pdf`.
- `CoachInsights` sai do escopo atual do MVP.
- Metas devem ser calculadas automaticamente e continuar editaveis manualmente.
- O PRD passa a usar Mifflin-St Jeor para meta calorica automatica e abordagem baseada em MET para cardio quando houver dados suficientes; passos nao exigem kcal automatica no MVP.

### Motivo

Esses fechamentos eliminam ambiguidades centrais do PRD, preservam o MVP como local-first e evitam que o proximo ciclo trate como pendente o que ja foi respondido pelo usuario.

### Impacto

O PRD deixa de tratar esses pontos como duvida aberta. O proximo agente deve partir do documento atual para planejamento e implementacao, sem reabrir escopo de IA, historico, backup, importacao ou formulas base.

### Riscos

- A fase publica continua bloqueada sem hardening de seguranca e copy legal/UX final.
- Ainda faltam plano de implementacao e artefatos de auditoria no workspace.

### Fonte

`/docs/product/PRD.md`, revisao do usuario nesta sessao consolidada no PRD, `/src/components/UserProfileForm.tsx`, `/src/components/ActivityTracker.tsx`.

## 2026-05-30 - Contrato do Histórico Diário e Conjunto Mínimo de Progresso

### Contexto
Durante a Sprint 6, foi constatado que alterar as metas no perfil atual afetava o histórico passado nos gráficos e exportações, o que causava distorções retrospectivas. Também havia dúvida sobre o que compunha a superfície mínima da tela de Progresso.

### Decisao
- **Progresso:** A tela de Progresso manterá os exatos 5 cards atuais (Tendência de Calorias, Frequência de Treinos, Evolução de Peso, Bioimpedância (opcional) e Distribuição de Macros). Filtros avançados não entram no MVP.
- **Snapshot de Metas:** O tipo `DailyHistoryEntry` passará a conter uma propriedade `goals` guardando o snapshot exato da meta vigente naquele dia.
- **Exportação e Gráficos:** As exportações (CSV/PDF) e gráficos usarão a meta armazenada no histórico, fazendo fallback gracioso para a meta atual apenas quando for um registro legado que não possua o snapshot.

### Motivo
Preservar a integridade das exportações em saúde e garantir que mudanças nos objetivos corporais (como mudar de emagrecimento para hipertrofia) não invalidem falsamente o desempenho histórico pregresso.

### Impacto
Exige a atualização das tipagens em `types.ts`, da lógica em `rollover.ts` e refatoração da exportação em `HistoryCalendar.tsx`.

### Status
ativa

## 2026-06-01 - Regra oficial de Gasto Energético (Sprint 07)

### Contexto
Componentes visuais como o `ActivityTracker` e o `Dashboard` calculavam sozinhos as calorias baseadas em passos ou níveis de cardio (sem fonte oficial ou tabela MET real).

### Decisao
Passos devem registrar apenas "Volume" e não converter para calorias. O cardio não inferirá calorias caso não exista uma tabela base. O preenchimento da caloria gasta fica sob responsabilidade da edição manual pelo usuário ou futura integração oficial de métricas.

### Motivo
Evitar métricas mentirosas que prejudicam a percepção de resultado calórico do paciente no App de Nutrição e alinhar perfeitamente com os preceitos do PRD v1.1.

### Impacto
O componente do Dashboard parou de apresentar e embutir calorias gasta proveniente dos "Passos", e simplificamos a lógica para considerar puramente Cardio reportado.

### Status
ativa

## 2026-06-01 - Substitui��o da API do Gemini pela API do OpenRouter

### Contexto
O usu�rio solicitou que as capacidades de IA do aplicativo (an�lise de imagem, gera��o de dieta/treino, coach, etc.) utilizassem o modelo \xiaomi/mimo-v2.5\ servido pela API do OpenRouter, mantendo a camada de seguran�a no Vercel Edge.

### Decisao
O servi�o nativo do Google Gemini (\@google/genai\) foi removido e substitu�do por requisi��es \etch\ padronizadas usando a interface OpenAI (messages), apontando para a API do OpenRouter. O Vercel Proxy tamb�m foi reescrito.

### Motivo
Para habilitar a integra��o r�pida com o modelo \xiaomi/mimo-v2.5\ exigido pelo usu�rio e facilitar o uso futuro de qualquer LLM OpenAI-compatible dispon�vel no ecosistema do OpenRouter sem lock-in a pacotes propriet�rios.

### Impacto
O nome \geminiService.ts\ foi mantido para evitar o \reaking change\ massivo nas importa��es da base de c�digo, por�m seu corpo opera agnosticamente.

### Status
ativa

