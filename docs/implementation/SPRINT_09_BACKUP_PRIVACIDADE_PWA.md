# Sprint 9 - Backup, privacidade e PWA

## Objetivo

Consolidar a operacao local-first do MVP com backup/importacao/reset seguros, avisos de privacidade local claros, comportamento offline compreensivel e gate de release para IA.

## Escopo da sprint

- Fechar backup local versionado por schema.
- Validar importacao antes de sobrescrever estado.
- Garantir reset com confirmacao forte.
- Aplicar aviso de privacidade local e diferenciar fluxos offline x online.
- Revisar PWA/metadata/assets e bloquear release publica insegura com segredo no cliente.

## Fora do escopo

- Autenticacao.
- Sync multi-dispositivo.
- Backend completo do produto.
- Politica juridica final alem do texto aprovado pelo usuario.

## Dependencias da sprint

- Sprints 0 a 8 concluidas.
- `PONTO DE DECISAO`: texto final do aviso de privacidade local aprovado por humano.
- Confirmacao da estrutura atual de exportacao/importacao/reset.
- Confirmacao do alvo de release: uso local/privado ou release publica.

## Arquivos provaveis a criar/alterar

- Arquivo confirmado na codebase: `/src/components/UserProfileForm.tsx`
- Arquivo confirmado na codebase: `/src/hooks/useLocalStorage.ts`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo confirmado na codebase: `/index.html`
- Arquivo confirmado na codebase: `/vite.config.ts`
- Arquivo confirmado na codebase: `/.env.example`
- Arquivo provavel a criar: `/src/utils/backup/*` ou equivalente, a confirmar na Sprint 0
- Arquivo provavel a criar: `/public/*` ou equivalente para assets PWA, a confirmar na Sprint 0

## Tarefas em ordem

### Tarefa 9.1 - Fechar backup versionado e importacao validada

Descricao:
Garantir que o backup carregue versao de schema, que a importacao valide estrutura e versao antes de sobrescrever o estado e que arquivo invalido seja rejeitado sem corromper dados.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/hooks/useLocalStorage.ts`
- `/src/types.ts`
- Arquivo provavel a criar: `/src/utils/backup/*`

Criterio de aceite:
- Backup invalido e bloqueado com mensagem clara e estado local preservado.

Validacao:
- `npm run lint`
- Teste manual com backup valido e invalido

Riscos:
- Corrupcao de dados locais.

O que NAO alterar:
- Contratos do PRD sem necessidade objetiva.

### Tarefa 9.2 - Garantir reset com confirmacao forte

Descricao:
Revisar a acao destrutiva de reset para exigir confirmacao deliberada e evitar perda acidental de dados.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/App.tsx`

Criterio de aceite:
- O reset so acontece apos confirmacao explicita e compreensivel.

Validacao:
- `npm run build`
- Teste manual do fluxo de reset

Riscos:
- UX ambigua em acao destrutiva.

O que NAO alterar:
- Historico/exportacao alem do necessario para suportar o reset.

### Tarefa 9.3 - Aplicar aviso de privacidade local e fronteira offline/online

Descricao:
Exibir o aviso de privacidade local na area de gestao de dados e nos fluxos de IA com imagem, deixando claro o que continua funcionando offline e o que depende de conexao.

Arquivos provaveis:
- `/src/components/UserProfileForm.tsx`
- `/src/components/MealForm.tsx`
- `/src/App.tsx`
- Arquivo provavel a criar: `/src/components/shared/ContextWarning.tsx`

Criterio de aceite:
- O usuario entende onde os dados ficam, quais limites de protecao existem e quando a IA depende de internet.

Validacao:
- `npm run dev`
- Teste manual online/offline

Riscos:
- Copy ambigua gerar falsa sensacao de seguranca.

O que NAO alterar:
- Texto final sem aprovacao humana.

### Tarefa 9.4 - Revisar PWA e gate de release para IA

Descricao:
Productizar metadata/PWA basicos e tratar a exposicao de segredo da IA conforme o alvo de release. Se o alvo for publico com IA ativa, escalar para proxy/server-side e modelo forte; se nao for, bloquear a liberacao publica insegura e documentar o limite.

Arquivos provaveis:
- `/vite.config.ts`
- `/index.html`
- `/.env.example`
- Arquivo provavel a criar: `/public/*`

Criterio de aceite:
- O projeto nao fica com release publica aprovada enquanto a chave de IA depender do cliente.

Validacao:
- `npm run build`
- Revisao manual da configuracao de ambiente e metadata

Riscos:
- Tratar como resolvido algo que so estaria seguro com proxy real.

O que NAO alterar:
- Nao improvisar backend completo sem confirmacao explicita.

## Comandos de validacao da sprint

- `npm run lint`
- `npm run build`
- `npm run dev`
- Testes automatizados: a confirmar na Sprint 0

## Testes necessarios

- Teste manual de exportar backup e importar backup valido.
- Teste manual de importar backup invalido.
- Teste manual de reset com confirmacao forte.
- Teste manual offline/online dos fluxos locais e de IA.
- Validacao de metadata/PWA em build.

## Fluxo manual de validacao

1. Exportar um backup local.
2. Importar o mesmo backup e confirmar preservacao dos dados.
3. Tentar importar um arquivo invalido e confirmar bloqueio.
4. Testar o reset com confirmacao forte.
5. Colocar o app offline e validar o que continua funcionando.
6. Revisar a configuracao de release para garantir que a IA nao seja liberada publicamente de forma insegura.

## Riscos da sprint

- Corrupcao de estado local.
- Mensagem de privacidade insuficiente.
- Falso senso de prontidao para release publico.

## Criterios finais de aceite da sprint

- Backup versionado e importacao segura.
- Reset com confirmacao forte.
- Aviso de privacidade local e fronteira offline/online claros.
- Gate de release para IA tratado de forma segura.

## O que NAO deve ser alterado nesta sprint

- Escopo de produto para auth/sync.
- Funcionalidades novas de IA.
- Planejamento alimentar ou de treino alem do necessario para mensagens/estado.

## Atualizacoes documentais recomendadas

- Atualizar `/docs/agent/CURRENT_STATE.md`
- Atualizar `/docs/evolution/DECISIONS.md` se houver definicao formal de release/gate
- Atualizar `/docs/evolution/CHANGELOG.md`
- Sugerir registro em `/docs/evolution/out-of-scope-changes.md` se o time optar por adiar proxy publico
