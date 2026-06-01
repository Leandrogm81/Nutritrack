# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: `Sprint 9 - Backup, privacidade e PWA`
- objetivo da sprint original: consolidar a operacao local-first do MVP com backup/importacao/reset seguros, avisos de privacidade local claros, comportamento offline compreensivel e gate de release para IA.
- arquivo de origem: `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA.md`
- resumo do escopo: fechar backup local versionado por schema, validar importacao antes de sobrescrever o estado, reforcar o reset destrutivo, aplicar aviso de privacidade local, diferenciar o que funciona offline do que depende de conexao e revisar PWA/release para nao aprovar exposicao insegura da chave de IA no cliente.
- documentos consultados:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/PLANO_IMPLEMENTACAO.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA.md`
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`
- `/package.json`
- `/vite.config.ts`
- `/index.html`
- `/metadata.json`
- `/src/App.tsx`
- `/src/components/UserProfileForm.tsx`
- `/src/components/MealForm.tsx`
- `/src/hooks/useLocalStorage.ts`
- `/src/services/geminiService.ts`
- `/src/types.ts`
- `/src/utils/stateMigration.ts`
- documentos ausentes na leitura atual:
- `/docs/product/acceptance-criteria.md` nao encontrado no workspace
- `/docs/design/UI_UX_GUIDE.md` nao encontrado no workspace
- `/public/*` nao existe na leitura atual da codebase
- pontos assumidos:
- `npm run dev`, `npm run lint`, `npm run build` e `npm run test` existem no `package.json`.
- Na leitura atual, `npm run lint` executa `tsc --noEmit`; nao ha script dedicado adicional de typecheck.
- A area atual de backup/importacao/reset esta concentrada em `/src/components/UserProfileForm.tsx`.
- A persistencia local continua centralizada em `/src/App.tsx` via `/src/hooks/useLocalStorage.ts`, usando a chave `nutritrack_data`.
- A importacao atual ainda chama `setData(importedData)` sem validacao forte do contrato.
- O reset atual remove `localStorage` diretamente em `UserProfileForm.tsx`.
- A configuracao atual do PWA usa `vite-plugin-pwa`, `index.html` ainda esta com titulo placeholder e `vite.config.ts` usa icones remotos de `picsum.photos`.
- A chave de IA continua exposta ao cliente na leitura atual via `define` de `vite.config.ts` e leitura em `/src/services/geminiService.ts`.
- pontos que precisam ser confirmados na codebase:
- `PONTO DE DECISAO`: texto final aprovado do aviso de privacidade local.
- `PONTO DE DECISAO`: alvo de release desta branch para a Sprint 9: uso local/privado ou release publico.
- Confirmar se as Sprints 3 a 8 foram realmente executadas nesta branch, pois `CURRENT_STATE.md` e `HANDOFF.md` ainda apontam a Sprint 3 como proxima acao operacional.
- Confirmar se o tratamento de offline/online deve atingir apenas `MealForm.tsx` ou tambem outras superficies de IA ja presentes na codebase, como `DietGenerator.tsx`, `WorkoutGenerator.tsx`, `RecipeSuggestions.tsx` e `CoachInsights.tsx`.
- Confirmar se o projeto deve criar `public/*` para assets PWA ou usar outra convencao de pasta para icones locais.
- Confirmar se a validacao versionada do backup precisa apenas aceitar a versao atual e rejeitar o resto, ou se existe requisito de migracao entre versoes.

## Analise da Sprint

### Objetivo da sprint

Fechar o ciclo de confiabilidade do MVP local-first para que dados locais possam ser exportados, importados, resetados e usados offline com comunicacao honesta e sem sinal verde falso para release publico inseguro da IA.

### Escopo identificado

- Confirmar a superficie real de backup, importacao, reset, PWA, offline e release de IA.
- Definir um contrato de backup com schema versionado e validacao antes de sobrescrever estado.
- Separar exportacao e importacao em tarefas pequenas e testaveis.
- Reforcar o reset destrutivo sem inventar novo fluxo de produto.
- Exibir o aviso de privacidade local na area de gestao de dados.
- Diferenciar o fluxo local offline do fluxo de IA dependente de conexao.
- Revisar metadata, manifest e assets PWA basicos.
- Impedir aprovacao de release publico enquanto a IA depender de chave exposta no cliente.

### Fora do escopo

- Autenticacao, sync multi-dispositivo e backend completo.
- Proxy/server-side completo para IA sem confirmacao humana explicita.
- Politica juridica final alem do texto aprovado por humano.
- Refatoracao ampla de `/src/App.tsx` ou de todo `/src/services/geminiService.ts`.
- Mudancas de regras de negocio fora de backup/importacao/reset/privacidade/offline/PWA.
- Reescrever estrategia de cache do service worker sem necessidade comprovada.

### Dependencias entre partes

- O mapeamento real da codebase precisa vir antes de qualquer edicao.
- O contrato versionado do backup deve ser definido antes da exportacao e da importacao.
- Os testes do contrato de backup devem existir antes da integracao de importacao em UI.
- O texto aprovado de privacidade local deve existir antes da tarefa de aviso em UI.
- O alvo de release deve estar confirmado antes da tarefa de gate de IA.
- `PONTO DE DECISAO`: se o alvo for release publico com IA ativa, a tarefa de gate nao pode ser tratada como resolvida sem proxy/camada server-side aprovada.
- `PONTO DE DECISAO`: se a validacao do backup exigir migracao entre schemas, a tarefa sai do escopo seguro para modelo economico.

### Riscos principais

- Corrupcao de dados locais ao importar um arquivo invalido ou parcialmente valido.
- Promessa enganosa de privacidade se o aviso local omitir risco de dispositivo compartilhado.
- Falsa percepcao de erro geral do app quando apenas a IA estiver indisponivel offline.
- Sinal verde indevido para release publico com `GEMINI_API_KEY` no cliente.
- `RISCO DE ESCOPO`: tocar varias superficies de IA ou refatorar `App.tsx` alem do necessario.
- `RISCO DE ESCOPO`: transformar revisao de PWA em mudanca ampla de service worker/cache.

### Estrategia de quebra

Dividir a sprint em mapeamento, decisoes humanas obrigatorias, contrato puro de backup, testes focados do contrato, integracao de exportacao, integracao de importacao, reset destrutivo, aviso de privacidade local, fronteira offline/online no fluxo de IA confirmado, PWA basico, gate de release para IA e validacao final. Cada tarefa deve produzir diff pequeno, reversivel e com criterio de aceite objetivo.

### Limites para modelo economico

- Cabem em modelo economico: mapeamento, coleta de decisoes, exportacao versionada, reset com confirmacao mais forte, aviso de privacidade local, ajuste de metadata/PWA basica e validacao final.
- Modelo intermediario recomendado: testes focados do contrato de backup e integracao localizada da fronteira offline/online no `MealForm`.
- Modelo forte recomendado: contrato de backup/importacao com validacao forte, qualquer necessidade de migracao versionada, gate de release publico da IA e qualquer mudanca de estrategia de service worker/cache.

---

# Tarefas da Sprint

## Tarefa 1 - Mapear a superficie real da sprint

### Objetivo

Confirmar onde vivem hoje backup, importacao, reset, offline/PWA e exposicao da chave de IA antes de qualquer alteracao.

### Tipo da tarefa

- leitura/mapeamento

### Pre-requisitos

- Leitura de `/docs/agent/agent-operating-rules.md`.
- Leitura da sprint original e deste arquivo de tarefas.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/UserProfileForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/hooks/useLocalStorage.ts`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `/vite.config.ts`
- Arquivo confirmado na codebase: `/index.html`
- Arquivo confirmado na codebase: `/metadata.json`
- Arquivo confirmado na codebase: `/package.json`

### Passos

1. Ler `UserProfileForm.tsx`, `App.tsx`, `useLocalStorage.ts`, `types.ts`, `MealForm.tsx`, `geminiService.ts`, `vite.config.ts`, `index.html`, `metadata.json` e `package.json`.
2. Confirmar onde a exportacao e a importacao sao disparadas, onde o estado importado entra em `setData` e onde o reset remove dados locais.
3. Confirmar como a chave de IA entra no bundle e quais superficies de IA dependem dela.
4. Confirmar o estado atual do PWA: manifest, titulo, icones, metadata e existencia ou ausencia de assets locais.
5. Registrar qualquer divergencia entre a sprint, o plano e o estado operacional atual como fato, sem resolver por inferencia.

### Criterios de aceite

- O ponto atual de exportacao foi identificado.
- O ponto atual de importacao e sobrescrita do estado foi identificado.
- O ponto atual de reset destrutivo foi identificado.
- A forma atual de exposicao da chave de IA no cliente foi identificada.
- A ausencia de `public/*` e o uso atual de icones remotos ficaram registrados.

### Como validar

- `rg -n "handleExport|handleImport|removeItem|setData|GEMINI_API_KEY|VitePWA|manifest|picsum" src vite.config.ts index.html metadata.json`
- Revisao manual dos arquivos lidos

### Riscos

- Nao perceber uma segunda superficie de IA relevante para a sprint.
- Pressupor conclusao das sprints anteriores sem confirmar a branch atual.

### O que NAO alterar

- Nao editar codigo nesta tarefa.
- Nao reabrir escopo de backend, sync, login ou service worker amplo.

### Reversibilidade

Totalmente reversivel, pois esta tarefa deve produzir apenas mapeamento e anotacoes operacionais.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 1 - Mapear a superficie real da sprint.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA.md`
- `/src/components/UserProfileForm.tsx`
- `/src/App.tsx`
- `/vite.config.ts`

Objetivo:
Mapear os pontos atuais de backup, importacao, reset, PWA e exposicao da chave de IA.

Escopo:
Somente leitura e registro de evidencias da codebase.

Fora do escopo:
Nao editar codigo, nao decidir release, nao alterar PWA.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/App.tsx`
- `/src/hooks/useLocalStorage.ts`
- `/src/types.ts`
- `/src/services/geminiService.ts`
- `/src/components/MealForm.tsx`
- `/vite.config.ts`
- `/index.html`
- `/metadata.json`
- `/package.json`

Validacao:
- `rg -n "handleExport|handleImport|removeItem|setData|GEMINI_API_KEY|VitePWA|manifest|picsum" src vite.config.ts index.html metadata.json`
- revisao manual das leituras

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 2 - Confirmar decisoes humanas obrigatorias

### Objetivo

Localizar ou solicitar confirmacao dos pontos que a sprint nao pode fechar por inferencia: texto final de privacidade local, alvo de release e alcance da fronteira offline/online.

### Tipo da tarefa

- documentacao

### Pre-requisitos

- Tarefa 1 concluida.
- Leitura de `/docs/product/PRD.md` e `/docs/evolution/DECISIONS.md`.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/docs/product/PRD.md`
- Arquivo confirmado na codebase: `/docs/evolution/DECISIONS.md`
- Arquivo confirmado na codebase: `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA.md`
- Arquivo confirmado na codebase: `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- Arquivo confirmado na codebase: `/docs/agent/CURRENT_STATE.md`
- Arquivo confirmado na codebase: `/docs/agent/HANDOFF.md`

### Passos

1. Buscar no PRD e em `DECISIONS.md` se o texto final da privacidade local ja foi aprovado.
2. Confirmar com evidencias documentais se a release alvo desta sprint e local/privada ou publica.
3. Confirmar se a fronteira offline/online deve cobrir apenas `MealForm.tsx` ou mais superficies de IA.
4. Se qualquer um desses itens nao estiver decidido, registrar `PONTO DE DECISAO` e bloquear as tarefas dependentes.
5. Registrar tambem a divergencia operacional de continuidade se a branch ainda aparentar estar antes da Sprint 9.

### Criterios de aceite

- O texto aprovado de privacidade foi localizado ou sua ausencia foi registrada como `PONTO DE DECISAO`.
- O alvo de release foi localizado ou sua ausencia foi registrada como `PONTO DE DECISAO`.
- O alcance das superficies de IA da sprint foi delimitado ou marcado para confirmacao humana.

### Como validar

- `rg -n "privacidade|offline|release|publico|GEMINI|proxy|server-side" docs`
- Revisao manual dos documentos encontrados

### Riscos

- Tratar uma hipotese como decisao confirmada.
- Prosseguir para UI ou release gate sem o texto/aprovacao necessarios.

### O que NAO alterar

- Nao implementar UI ou configuracao nesta tarefa.
- Nao inventar copy final nem aprovar release por conta propria.

### Reversibilidade

Totalmente reversivel, pois a tarefa deve produzir apenas registro de decisoes ou pendencias.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 2 - Confirmar decisoes humanas obrigatorias.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`

Objetivo:
Descobrir o que ja foi decidido e registrar `PONTO DE DECISAO` no que ainda depende de humano.

Escopo:
Somente leitura documental e registro de pendencias.

Fora do escopo:
Nao editar UI, nao alterar configuracao, nao criar texto final sem aprovacao.

Arquivos provaveis:
- `/docs/product/PRD.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/agent/HANDOFF.md`

Validacao:
- `rg -n "privacidade|offline|release|publico|GEMINI|proxy|server-side" docs`
- revisao manual dos achados

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 3 - Definir o contrato versionado do backup

### Objetivo

Criar ou ajustar um contrato puro para exportacao/importacao com schema versionado, validacao estrutural minima e rejeicao explicita de arquivos invalidos.

### Tipo da tarefa

- modelo/tipos

### Pre-requisitos

- Tarefa 1 concluida.
- Tarefa 2 concluida.
- Confirmacao de que a sprint pode rejeitar versoes nao suportadas sem migracao adicional, ou escalonamento explicito se isso nao for suficiente.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo confirmado na codebase: `/src/utils/stateMigration.ts`
- Arquivo provavel a criar: `/src/utils/backup/schema.ts` - a confirmar na codebase
- Arquivo provavel a criar: `/src/utils/backup/validateBackup.ts` - a confirmar na codebase
- Arquivo provavel a criar: `/src/utils/backup/index.ts` - a confirmar na codebase

### Passos

1. Definir o envelope minimo do backup versionado, com campos como versao do schema e dados exportados.
2. Reutilizar `DailyData` e `stateMigration` apenas onde isso nao mascarar arquivo invalido como sucesso.
3. Criar validacao pura que diferencie ao menos: arquivo malformado, envelope ausente, versao nao suportada e dados invalidos.
4. Garantir que a validacao retorne motivo explicito de rejeicao, sem tocar UI ainda.
5. Se a necessidade real for migracao entre versoes, marcar `modelo mais forte recomendado` e parar antes de improvisar.

### Criterios de aceite

- Existe um contrato versionado claro para exportacao/importacao.
- Arquivo sem envelope ou sem versao e rejeitado.
- Arquivo com versao nao suportada e rejeitado de forma explicita.
- A validacao do contrato nao depende da UI para funcionar.

### Como validar

- `npm run test`
- `npm run lint`
- Revisao manual do helper/util criado e de seu contrato de entrada/saida

### Riscos

- Aceitar dados parcialmente invalidos e corromper o estado depois.
- `RISCO DE ESCOPO`: transformar esta tarefa em sistema de migracao completo sem respaldo documental.

### O que NAO alterar

- Nao alterar a UI de perfil/importacao nesta tarefa.
- Nao reescrever a persistencia global de `useLocalStorage`.
- Nao tratar release publico da IA nesta tarefa.

### Reversibilidade

Reversivel por remover o helper/contrato criado e restaurar os tipos anteriores.

### Modelo recomendado

- modelo forte recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 3 - Definir o contrato versionado do backup.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/src/types.ts`
- `/src/utils/stateMigration.ts`
- `/src/App.tsx`

Objetivo:
Criar um contrato de backup versionado e uma validacao pura que rejeite arquivos invalidos antes da UI.

Escopo:
Editar apenas tipos e utilitarios puros ligados ao backup.

Fora do escopo:
Nao editar `UserProfileForm`, nao integrar importacao na UI, nao criar migracao ampla sem decisao.

Arquivos provaveis:
- `/src/types.ts`
- `/src/utils/stateMigration.ts`
- `/src/utils/backup/schema.ts`
- `/src/utils/backup/validateBackup.ts`
- `/src/utils/backup/index.ts`

Validacao:
- `npm run test`
- `npm run lint`
- revisao manual do contrato criado

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 4 - Adicionar testes focados do contrato de backup

### Objetivo

Cobrir o contrato versionado do backup com testes automatizados pequenos e objetivos antes de integrar exportacao/importacao na interface.

### Tipo da tarefa

- testes

### Pre-requisitos

- Tarefa 3 concluida.
- Confirmacao de que `npm run test` continua valido no projeto.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/test/setup.ts`
- Arquivo confirmado na codebase: `/vitest.config.ts`
- Arquivo provavel a criar: `/src/utils/backup/validateBackup.test.ts` - a confirmar na codebase
- Arquivo provavel a criar: `/src/utils/backup/schema.test.ts` - a confirmar na codebase

### Passos

1. Reutilizar a infraestrutura atual de Vitest, sem criar framework novo.
2. Adicionar testes para arquivo valido, JSON malformado, envelope ausente, versao nao suportada e payload invalido.
3. Garantir que os testes expressem preservacao do estado como expectativa da integracao posterior, sem precisar montar a UI ainda.
4. Manter os testes localizados no helper de backup e evitar snapshots amplos.

### Criterios de aceite

- Existe cobertura automatizada para os cenarios criticos do contrato de backup.
- `npm run test` passa com os testes novos.
- Os testes permanecem focados em helpers/validacao puros.

### Como validar

- `npm run test`
- `npm run lint`

### Riscos

- Testes pouco especificos deixarem a UI integrar um contrato ambiguo.
- Expandir a tarefa para E2E ou mocks desnecessarios.

### O que NAO alterar

- Nao editar `UserProfileForm.tsx` nesta tarefa.
- Nao introduzir infraestrutura nova de testes.

### Reversibilidade

Reversivel por remover os testes adicionados sem afetar a logica de producao.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 4 - Adicionar testes focados do contrato de backup.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- os utilitarios de backup criados na tarefa anterior
- `/src/test/setup.ts`
- `/vitest.config.ts`

Objetivo:
Cobrir com testes unitarios os cenarios criticos do contrato versionado do backup.

Escopo:
Adicionar testes pequenos e objetivos apenas para helpers de backup.

Fora do escopo:
Nao editar UI, nao criar E2E, nao mexer em release/PWA.

Arquivos provaveis:
- `/src/utils/backup/validateBackup.test.ts`
- `/src/utils/backup/schema.test.ts`
- `/src/test/setup.ts`
- `/vitest.config.ts`

Validacao:
- `npm run test`
- `npm run lint`

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 5 - Integrar exportacao versionada na area de perfil

### Objetivo

Trocar a exportacao bruta atual por uma exportacao baseada no contrato versionado, sem alterar importacao, reset ou outras partes do perfil.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 3 concluida.
- Tarefa 4 concluida.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/UserProfileForm.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo provavel: `/src/utils/backup/index.ts` - a confirmar na codebase

### Passos

1. Substituir a serializacao direta de `fullData` pela funcao de exportacao do contrato versionado.
2. Manter o nome base do arquivo de backup sem reinventar fluxo paralelo.
3. Garantir que a exportacao nao inclua estados transientes fora do contrato aprovado.
4. Revisar o diff para confirmar que nenhum campo de perfil ou metas mudou fora da exportacao.

### Criterios de aceite

- O arquivo exportado contem envelope versionado.
- A exportacao continua acessivel pela mesma area do perfil.
- Nenhum fluxo de importacao ou reset foi alterado nesta tarefa.

### Como validar

- `npm run lint`
- `npm run build`
- Teste manual de exportar backup e inspecionar o JSON gerado

### Riscos

- Exportar estrutura diferente da esperada pela importacao futura.
- Introduzir dependencia acidental de estado transiente na exportacao.

### O que NAO alterar

- Nao mexer na validacao de importacao nesta tarefa.
- Nao mudar UI de reset nem aviso de privacidade.

### Reversibilidade

Reversivel por restaurar o `handleExport` anterior e remover a chamada ao helper versionado.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 5 - Integrar exportacao versionada na area de perfil.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/src/components/UserProfileForm.tsx`
- os utilitarios de backup versionado

Objetivo:
Passar a exportar um backup versionado pela mesma area atual de perfil.

Escopo:
Editar apenas o fluxo de exportacao em `UserProfileForm`.

Fora do escopo:
Nao alterar importacao, reset, copy de privacidade ou PWA.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/types.ts`
- `/src/utils/backup/index.ts`

Validacao:
- `npm run lint`
- `npm run build`
- teste manual de exportacao com inspecao do arquivo

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 6 - Integrar importacao segura com preservacao do estado atual

### Objetivo

Garantir que a importacao valide estrutura e versao antes de sobrescrever o estado e que arquivo invalido seja rejeitado com mensagem clara, sem corromper dados locais.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefa 3 concluida.
- Tarefa 4 concluida.
- Tarefa 5 concluida.
- `PONTO DE DECISAO` sobre migracao de versao resolvido.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/UserProfileForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/utils/stateMigration.ts`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo provavel: `/src/utils/backup/index.ts` - a confirmar na codebase

### Passos

1. Ler o arquivo selecionado e validar o JSON pelo helper versionado antes de qualquer `setData`.
2. Exibir mensagem clara para arquivo malformado, versao nao suportada ou payload invalido.
3. Somente apos validacao bem-sucedida e confirmacao explicita do usuario chamar o fluxo que sobrescreve o estado.
4. Garantir que `App.tsx` receba apenas dados ja validados e normalizados.
5. Confirmar manualmente que um arquivo invalido nao altera o estado atual e que um valido preserva a consistencia do app.

### Criterios de aceite

- Backup invalido e bloqueado com mensagem clara.
- O estado local permanece intacto apos falha de importacao.
- Backup valido importa apenas apos confirmacao explicita.
- `setData` nao recebe mais objeto arbitrario vindo diretamente do parse bruto da UI.

### Como validar

- `npm run lint`
- `npm run build`
- `npm run test`
- Teste manual com backup valido e invalido

### Riscos

- Corrupcao de dados se a validacao aceitar payload ambiguo.
- `RISCO DE ESCOPO`: transformar a importacao em migracao completa sem decisao.
- Regressao em `App.tsx` por alterar o ponto central de persistencia.

### O que NAO alterar

- Nao mexer em reset, privacidade local ou PWA nesta tarefa.
- Nao expandir a tarefa para historico/exportacao de CSV/PDF.

### Reversibilidade

Reversivel por restaurar o handler anterior de importacao e remover a integracao com o helper versionado.

### Modelo recomendado

- modelo forte recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 6 - Integrar importacao segura com preservacao do estado atual.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/src/components/UserProfileForm.tsx`
- `/src/App.tsx`
- os utilitarios de backup versionado

Objetivo:
Validar o backup antes de sobrescrever o estado e rejeitar arquivos invalidos sem corromper dados locais.

Escopo:
Editar apenas o fluxo de importacao e o ponto controlado de aplicacao do estado importado.

Fora do escopo:
Nao tocar reset, PWA, copy de privacidade ou outras exportacoes do produto.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/App.tsx`
- `/src/utils/stateMigration.ts`
- `/src/types.ts`
- `/src/utils/backup/index.ts`

Validacao:
- `npm run lint`
- `npm run build`
- `npm run test`
- teste manual com backup valido e invalido

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 7 - Reforcar o reset destrutivo com confirmacao deliberada

### Objetivo

Tornar o reset de dados locais explicitamente deliberado e compreensivel, sem mexer no restante da gestao de dados alem do necessario.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 1 concluida.
- Leitura do fluxo atual de reset em `UserProfileForm.tsx`.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/UserProfileForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo provavel a criar: `/src/utils/reset/confirmReset.ts` ou equivalente - a confirmar na codebase

### Passos

1. Revisar a confirmacao atual em dois passos e identificar o menor reforco necessario para evitar toque acidental.
2. Centralizar a acao destrutiva em callback claro, evitando `removeItem` inline disperso se isso nao aumentar escopo.
3. Garantir que o usuario entenda que perfil, historico e dados locais serao apagados permanentemente.
4. Garantir que cancelar o fluxo nao altere nenhum dado local.
5. Validar manualmente que o reset so ocorre apos confirmacao deliberada.

### Criterios de aceite

- O reset so acontece apos confirmacao explicita e compreensivel.
- Cancelar o fluxo deixa o estado intacto.
- A mensagem deixa clara a irreversibilidade da acao.
- Nenhum fluxo de exportacao/importacao foi alterado sem necessidade.

### Como validar

- `npm run build`
- `npm run lint`
- Teste manual do fluxo de reset

### Riscos

- UX ainda ambigua para uma acao destrutiva.
- `RISCO DE ESCOPO`: transformar reset em fluxo complexo demais para o MVP.

### O que NAO alterar

- Nao alterar historico/exportacao alem do necessario para suportar o reset.
- Nao criar autenticacao, lixeira ou undo.

### Reversibilidade

Reversivel por restaurar a confirmacao anterior e remover qualquer helper local de reset.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 7 - Reforcar o reset destrutivo com confirmacao deliberada.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/src/components/UserProfileForm.tsx`
- `/src/App.tsx`

Objetivo:
Reforcar o reset para que ele so aconteca apos uma confirmacao realmente deliberada.

Escopo:
Editar apenas o fluxo de reset e sua mensagem de confirmacao.

Fora do escopo:
Nao criar undo, nao tocar importacao/exportacao, nao reescrever o perfil inteiro.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/App.tsx`
- `/src/utils/reset/confirmReset.ts`

Validacao:
- `npm run build`
- `npm run lint`
- teste manual do reset

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 8 - Aplicar o aviso de privacidade local na area de gestao de dados

### Objetivo

Exibir o aviso aprovado de privacidade local junto de backup/importacao/reset, deixando claro onde os dados ficam e quais limites de protecao existem.

### Tipo da tarefa

- UI/componente

### Pre-requisitos

- Tarefa 2 concluida com texto aprovado.
- Tarefa 1 concluida com a localizacao real da area de gestao de dados.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/UserProfileForm.tsx`
- Arquivo provavel a criar: `/src/components/shared/ContextWarning.tsx` - a confirmar na codebase
- Arquivo provavel a criar: `/src/constants/privacy.ts` ou equivalente - a confirmar na codebase

### Passos

1. Inserir o texto aprovado na area de backup/importacao/reset, sem espalhar copy nao confirmada por outras telas.
2. Explicar de forma objetiva que os dados ficam no dispositivo/navegador local e que dispositivo compartilhado reduz privacidade.
3. Garantir que o bloco visual nao prometa criptografia, sync ou protecoes inexistentes.
4. Reaproveitar padrao visual existente; se nao houver, criar o menor bloco visual reutilizavel possivel.
5. Validar responsividade do bloco em mobile e desktop.

### Criterios de aceite

- O aviso de privacidade local esta visivel na area de gestao de dados.
- O texto usado e exatamente o aprovado ou uma referencia aprovada documentada.
- O aviso nao cria promessa de seguranca inexistente.
- Nenhuma funcionalidade nova foi adicionada fora da copy e do bloco visual.

### Como validar

- `npm run dev`
- `npm run lint`
- Validacao manual do bloco de privacidade em mobile e desktop

### Riscos

- Copy ambigua gerar falsa sensacao de seguranca.
- `RISCO DE ESCOPO`: espalhar o aviso por varias telas sem necessidade.

### O que NAO alterar

- Nao inventar texto final.
- Nao alterar o calculo de metas, historico ou outras areas do perfil fora da gestao de dados.

### Reversibilidade

Reversivel por remover o bloco de aviso e qualquer constante/componente local criado para ele.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 8 - Aplicar o aviso de privacidade local na area de gestao de dados.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/src/components/UserProfileForm.tsx`
- o arquivo/documento que contenha o texto aprovado do aviso

Objetivo:
Exibir o aviso aprovado de privacidade local na area de backup/importacao/reset.

Escopo:
Editar apenas a UI da gestao de dados e, se necessario, criar um bloco visual leve.

Fora do escopo:
Nao inventar copy, nao tocar outras telas, nao prometer seguranca inexistente.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/components/shared/ContextWarning.tsx`
- `/src/constants/privacy.ts`

Validacao:
- `npm run dev`
- `npm run lint`
- walkthrough manual do bloco em mobile e desktop

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 9 - Diferenciar offline x online no fluxo de IA alimentar

### Objetivo

Deixar claro, no fluxo de IA alimentar por texto/imagem, o que continua funcionando offline e o que depende de conexao, sem quebrar o cadastro manual local.

### Tipo da tarefa

- estado/integracao

### Pre-requisitos

- Tarefa 1 concluida.
- Tarefa 2 concluida com confirmacao do alcance desta tarefa.
- Confirmacao de que `MealForm.tsx` faz parte do escopo da sprint atual.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo provavel a criar: `/src/components/shared/ContextWarning.tsx` - a confirmar na codebase
- Arquivos provaveis adicionais, somente se a Tarefa 2 confirmar o escopo: `/src/components/DietGenerator.tsx`, `/src/components/WorkoutGenerator.tsx`, `/src/components/RecipeSuggestions.tsx`, `/src/components/CoachInsights.tsx` - a confirmar na codebase

### Passos

1. Confirmar se o escopo desta tarefa fica apenas no `MealForm` ou se outras superficies de IA vao receber o mesmo tratamento.
2. Introduzir o menor estado/checagem necessaria para diferenciar ausencia de internet de erro geral do app.
3. Exibir mensagem clara quando a IA estiver indisponivel offline e manter o cadastro manual de refeicao funcionando.
4. Garantir que a copy do aviso nao conflite com o texto aprovado da privacidade local.
5. Se o time pedir cobertura de varias superficies de IA ao mesmo tempo, quebrar em subtarefas futuras e registrar `RISCO DE ESCOPO`.

### Criterios de aceite

- Em modo offline, a interface deixa claro que dados locais continuam acessiveis.
- Em modo offline, a IA de refeicao e marcada como indisponivel sem quebrar o fluxo manual.
- Ao voltar online, o usuario pode tentar novamente sem reload obrigatorio.
- Nenhuma outra superficie de IA foi alterada sem confirmacao explicita.

### Como validar

- `npm run dev`
- `npm run lint`
- Teste manual online/offline do fluxo de texto e imagem no `MealForm`

### Riscos

- Confundir erro de IA com erro geral do aplicativo.
- `RISCO DE ESCOPO`: abrir esta tarefa para todas as superficies de IA da codebase.

### O que NAO alterar

- Nao alterar o contrato de backup/importacao nesta tarefa.
- Nao redesenhar a arquitetura inteira de rede do app.

### Reversibilidade

Reversivel por remover os estados e mensagens offline adicionados ao fluxo de IA.

### Modelo recomendado

- modelo intermediario recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 9 - Diferenciar offline x online no fluxo de IA alimentar.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/src/components/MealForm.tsx`
- `/src/App.tsx`

Objetivo:
Mostrar no fluxo de IA alimentar o que depende de conexao e manter o fluxo manual local funcionando offline.

Escopo:
Editar apenas a superficie de IA confirmada na Tarefa 2, preferencialmente `MealForm.tsx`.

Fora do escopo:
Nao ampliar para todas as IAs sem confirmacao, nao mexer no contrato de backup, nao reescrever networking.

Arquivos provaveis:
- `/src/components/MealForm.tsx`
- `/src/App.tsx`
- `/src/components/shared/ContextWarning.tsx`

Validacao:
- `npm run dev`
- `npm run lint`
- teste manual online/offline do fluxo de refeicao com IA

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 10 - Revisar metadata, manifest e assets PWA basicos

### Objetivo

Substituir placeholders evidentes do PWA por metadata coerente e assets locais minimos, sem entrar em mudanca ampla de estrategia de cache.

### Tipo da tarefa

- configuracao

### Pre-requisitos

- Tarefa 1 concluida.
- Confirmacao da convencao de pasta para assets locais.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/vite.config.ts`
- Arquivo confirmado na codebase: `/index.html`
- Arquivo confirmado na codebase: `/metadata.json`
- Arquivo provavel a criar: `/public/*` - a confirmar na codebase
- Arquivo provavel a criar: `/src/assets/*` - a confirmar na codebase

### Passos

1. Ajustar `index.html` para remover titulo placeholder e alinhar idioma/metadata basica ao produto.
2. Revisar `vite.config.ts` para substituir icones remotos por assets locais.
3. Criar ou apontar para assets locais minimos do PWA sem inventar uma biblioteca completa de icones.
4. Validar o build do PWA e inspecionar se o manifest final referencia assets locais reais.
5. Se aparecer necessidade de mexer na estrategia de cache/service worker, registrar `modelo mais forte recomendado` e parar esta tarefa no limite basico.

### Criterios de aceite

- O titulo do app em `index.html` nao e mais placeholder.
- O manifest do PWA referencia assets locais reais.
- O build conclui sem depender de `picsum.photos` para icones do instalavel.
- Nenhuma mudanca ampla de cache/service worker foi introduzida sem justificativa.

### Como validar

- `npm run build`
- `npm run dev`
- Inspecao manual do manifest e dos assets gerados no build

### Riscos

- Deixar referencias quebradas para icones.
- `RISCO DE ESCOPO`: transformar a tarefa em reengenharia de PWA/cache.

### O que NAO alterar

- Nao inventar backend ou release gate nesta tarefa.
- Nao mexer na estrategia de service worker alem do basico de metadata/assets.

### Reversibilidade

Reversivel por restaurar metadata/manifest anteriores e remover os assets locais adicionados.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 10 - Revisar metadata, manifest e assets PWA basicos.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/vite.config.ts`
- `/index.html`
- `/metadata.json`

Objetivo:
Remover placeholders do PWA e usar assets locais minimos, sem reescrever a estrategia de cache.

Escopo:
Editar apenas metadata, manifest e arquivos de assets basicos.

Fora do escopo:
Nao mexer em cache amplo, nao tratar release gate da IA, nao tocar backup/importacao.

Arquivos provaveis:
- `/vite.config.ts`
- `/index.html`
- `/metadata.json`
- `/public/*`
- `/src/assets/*`

Validacao:
- `npm run build`
- `npm run dev`
- inspecao manual do manifest e assets gerados

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 11 - Tratar o gate de release para IA sem inventar backend

### Objetivo

Garantir que a branch nao seja tratada como pronta para release publico enquanto a IA depender de chave exposta no cliente e, se o alvo for local/privado, documentar esse limite com clareza.

### Tipo da tarefa

- configuracao

### Pre-requisitos

- Tarefa 1 concluida.
- Tarefa 2 concluida com alvo de release confirmado.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/.env.example`
- Arquivo confirmado na codebase: `/vite.config.ts`
- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivo confirmado na codebase: `/docs/evolution/DECISIONS.md`
- Arquivo confirmado na codebase: `/docs/agent/CURRENT_STATE.md`
- Arquivo provavel: `/README.md` - a confirmar na codebase
- Arquivo provavel: `/docs/evolution/out-of-scope-changes.md` - a confirmar na codebase

### Passos

1. Confirmar com evidencias tecnicas que a chave de IA ainda esta do lado do cliente.
2. Se o alvo de release for publico com IA ativa, registrar bloqueio explicito e escalar para proxy/server-side em `PONTO DE DECISAO`, sem improvisar backend.
3. Se o alvo for local/privado, documentar o limite operacional no menor conjunto necessario de arquivos de ambiente/documentacao.
4. Ajustar exemplos/documentacao para nao sugerir prontidao publica insegura.
5. Revisar o diff final desta tarefa para garantir que nenhum "pseudo-gate" cosmetico foi vendido como seguranca real.

### Criterios de aceite

- O projeto nao fica com release publico aprovado enquanto a chave de IA depender do cliente.
- O limite atual de release fica documentado de forma clara.
- Nao foi criado backend parcial improvisado apenas para "fechar" a sprint.

### Como validar

- `rg -n "GEMINI_API_KEY|process.env.GEMINI_API_KEY" vite.config.ts src/services/geminiService.ts .env.example`
- `npm run build`
- Revisao manual da documentacao/configuracao alterada

### Riscos

- Sugerir seguranca inexistente por meio de documentacao ambigua.
- `RISCO DE ESCOPO`: tentar resolver release publico sem proxy real.

### O que NAO alterar

- Nao improvisar backend completo sem confirmacao explicita.
- Nao considerar "bloqueio de release" resolvido se o alvo continuar sendo publico com IA ativa no cliente.

### Reversibilidade

Reversivel por restaurar apenas a documentacao/configuracao alterada, sem impacto funcional no app local.

### Modelo recomendado

- modelo forte recomendado

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 11 - Tratar o gate de release para IA sem inventar backend.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/.env.example`
- `/vite.config.ts`
- `/src/services/geminiService.ts`
- `/docs/evolution/DECISIONS.md`

Objetivo:
Impedir que a branch seja tratada como pronta para release publico com a chave de IA ainda exposta no cliente.

Escopo:
Documentar e configurar o minimo necessario para registrar o bloqueio ou limite atual, sem criar backend novo.

Fora do escopo:
Nao improvisar proxy/server-side, nao vender seguranca cosmetica, nao alterar outras areas do produto.

Arquivos provaveis:
- `/.env.example`
- `/vite.config.ts`
- `/src/services/geminiService.ts`
- `/docs/evolution/DECISIONS.md`
- `/docs/agent/CURRENT_STATE.md`
- `/README.md`
- `/docs/evolution/out-of-scope-changes.md`

Validacao:
- `rg -n "GEMINI_API_KEY|process.env.GEMINI_API_KEY" vite.config.ts src/services/geminiService.ts .env.example`
- `npm run build`
- revisao manual da documentacao/configuracao final

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

## Tarefa 12 - Executar validacao final da sprint e registrar continuidade

### Objetivo

Fechar a Sprint 9 com evidencias tecnicas e manuais, revisar escopo do diff e atualizar a documentacao de continuidade conforme aplicavel.

### Tipo da tarefa

- validacao

### Pre-requisitos

- Tarefas 1 a 11 concluidas conforme aplicavel.
- Todo `PONTO DE DECISAO` resolvido ou explicitamente registrado como bloqueio.

### Arquivos provaveis

- Arquivo confirmado na codebase: `/docs/agent/CURRENT_STATE.md`
- Arquivo confirmado na codebase: `/docs/evolution/CHANGELOG.md`
- Arquivo confirmado na codebase: `/docs/evolution/DECISIONS.md`
- Arquivo provavel: `/docs/evolution/out-of-scope-changes.md` - a confirmar na codebase
- Arquivo confirmado na codebase: `/docs/agent/HANDOFF.md`

### Passos

1. Executar `test`, `lint` e `build`.
2. Validar manualmente exportacao, importacao valida, importacao invalida, reset, aviso de privacidade local, fluxo offline/online e metadata/PWA basica.
3. Revisar o diff para garantir que nada fora de backup/importacao/reset/privacidade/offline/PWA/release gate foi alterado sem justificativa.
4. Atualizar `CURRENT_STATE.md` e, se houver pausa ou troca de sessao, `HANDOFF.md`.
5. Atualizar `CHANGELOG.md`, `DECISIONS.md` e `out-of-scope-changes.md` apenas quando aplicavel.

### Criterios de aceite

- Validacoes tecnicas e manuais foram executadas e registradas.
- Os riscos residuais ficaram documentados.
- O diff final permaneceu dentro do escopo da Sprint 9.
- A continuidade operacional ficou atualizada para a proxima sessao.

### Como validar

- `npm run test`
- `npm run lint`
- `npm run build`
- Walkthrough manual completo da sprint
- Revisao manual do diff final

### Riscos

- Declarar sprint concluida sem walkthrough manual real.
- Atualizar `DECISIONS.md` sem haver decisao humana nova.

### O que NAO alterar

- Nao criar funcionalidades novas nesta etapa.
- Nao marcar como validado algo que nao foi executado.

### Reversibilidade

Reversivel por corrigir apenas os registros documentais indevidos e reabrir a validacao se alguma evidencia faltar.

### Modelo recomendado

- modelo economico suficiente

### Prompt de execucao para o coder

```markdown
Voce e um agente coder executando apenas a Tarefa 12 - Executar validacao final da sprint e registrar continuidade.

Antes de editar, leia:
- `/docs/agent/agent-operating-rules.md`
- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA_TAREFAS.md`
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/evolution/DECISIONS.md`

Objetivo:
Fechar a Sprint 9 com validacoes, revisao de escopo e documentacao de continuidade.

Escopo:
Executar validacoes e atualizar apenas a documentacao realmente necessaria.

Fora do escopo:
Nao implementar novas funcionalidades, nao registrar validacoes inexistentes, nao reabrir arquitetura.

Arquivos provaveis:
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/evolution/out-of-scope-changes.md`
- `/docs/agent/HANDOFF.md`

Validacao:
- `npm run test`
- `npm run lint`
- `npm run build`
- walkthrough manual completo da sprint

Responda ao final com:
1. arquivos alterados;
2. resumo do que foi feito;
3. validacoes executadas;
4. limitacoes;
5. riscos ou pendencias.
```

---

# Ordem recomendada de execucao

| Ordem | Tarefa | Depende de | Pode executar isolada? | Checkpoint recomendado |
|---|---|---|---|---|
| 1 | Tarefa 1 - Mapear a superficie real da sprint | Nenhuma | Sim | Apos confirmar pontos reais de backup/importacao/reset/PWA/IA |
| 2 | Tarefa 2 - Confirmar decisoes humanas obrigatorias | Tarefa 1 | Sim | Apos localizar decisoes ou registrar `PONTO DE DECISAO` |
| 3 | Tarefa 3 - Definir o contrato versionado do backup | Tarefas 1 e 2 | Nao | Apos revisao do contrato e do risco de migracao |
| 4 | Tarefa 4 - Adicionar testes focados do contrato de backup | Tarefa 3 | Sim | Apos `npm run test` e `npm run lint` |
| 5 | Tarefa 5 - Integrar exportacao versionada na area de perfil | Tarefas 3 e 4 | Nao | Apos teste manual de exportacao e `build` |
| 6 | Tarefa 6 - Integrar importacao segura com preservacao do estado atual | Tarefas 3, 4 e 5 | Nao | Apos teste manual de backup valido/invalido |
| 7 | Tarefa 7 - Reforcar o reset destrutivo com confirmacao deliberada | Tarefa 1 | Sim | Apos teste manual de reset |
| 8 | Tarefa 8 - Aplicar o aviso de privacidade local na area de gestao de dados | Tarefa 2 | Sim | Apos walkthrough visual mobile/desktop |
| 9 | Tarefa 9 - Diferenciar offline x online no fluxo de IA alimentar | Tarefas 1 e 2 | Nao | Apos walkthrough online/offline da superficie confirmada |
| 10 | Tarefa 10 - Revisar metadata, manifest e assets PWA basicos | Tarefa 1 | Sim | Apos `build` e inspecao do manifest |
| 11 | Tarefa 11 - Tratar o gate de release para IA sem inventar backend | Tarefas 1 e 2 | Nao | Apos revisao documental/configuracional do bloqueio de release |
| 12 | Tarefa 12 - Executar validacao final da sprint e registrar continuidade | Tarefas 1 a 11 | Nao | Apos `test`, `lint`, `build`, walkthrough manual e revisao de diff |

---

# Checklist final da sprint

- [ ] lint executado;
- [ ] typecheck executado;
- [ ] build executado;
- [ ] testes executados;
- [ ] fluxo manual validado;
- [ ] responsividade validada, se houver UI;
- [ ] regressoes verificadas;
- [ ] arquivos alterados revisados;
- [ ] escopo conferido contra a sprint original;
- [ ] nenhuma funcionalidade fora do escopo adicionada;
- [ ] nenhuma mudanca arquitetural feita sem autorizacao;
- [ ] limitacoes registradas;
- [ ] riscos residuais registrados.

---

# Tarefas que NAO devem ir para modelo economico

| Tarefa ou area | Motivo | Risco | Recomendacao |
|---|---|---|---|
| Tarefa 3 - Definir o contrato versionado do backup | Dado local sensivel e risco de aceitar payload invalido ou exigir migracao | Alto | Modelo forte |
| Tarefa 6 - Integrar importacao segura com preservacao do estado atual | Sobrescrita de estado central em `/src/App.tsx` e risco de corrupcao de dados | Alto | Modelo forte |
| Tarefa 11 - Tratar o gate de release para IA sem inventar backend | Seguranca de chave exposta e necessidade possivel de proxy/server-side para publico | Alto | Modelo forte e validacao humana obrigatoria |
| Qualquer ajuste que exija mexer na estrategia de cache/service worker | Impacto em offline, performance e confiabilidade do PWA | Medio | Modelo forte ou revisao humana obrigatoria |

---

# Atualizacoes documentais recomendadas

| Arquivo | Quando atualizar | Obrigatorio? |
|---|---|---|
| `/docs/agent/CURRENT_STATE.md` | Ao concluir tarefa relevante ou ao registrar bloqueio novo de backup/importacao/release | Sim |
| `/docs/evolution/CHANGELOG.md` | Quando houver alteracao real no projeto | Sim, se houver alteracao |
| `/docs/evolution/DECISIONS.md` | Quando houver decisao tecnica ou de negocio, como texto final de privacidade ou alvo de release | Sim, se houver decisao |
| `/docs/evolution/out-of-scope-changes.md` | Quando houver mudanca fora do escopo ou adiamento formal do proxy publico para IA | Sim, se houver mudanca fora do escopo |

---

# Sprint original

O agente deve procurar automaticamente a sprint de origem em:

```text
/docs/implementation/SPRINT_*.md
```

Se o numero da sprint for conhecido, procure primeiro pelo padrao especifico:

```text
/docs/implementation/SPRINT_XX_*.md
```

Para esta quebra, a sprint de origem ja esta definida como:

- `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA.md`

Se encontrar apenas um arquivo compativel, use esse arquivo como fonte principal.

Se encontrar mais de um arquivo compativel, liste os arquivos encontrados e solicite confirmacao de qual sprint deve ser quebrada.

Se esse arquivo deixar de existir, o agente deve parar e solicitar o arquivo correto ou o conteudo original da sprint.
