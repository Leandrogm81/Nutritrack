# Sprint 4 - IA de refeicao e avisos

## Objetivo

Fechar os fluxos de analise alimentar por IA com revisao humana obrigatoria, mensagens de limite claras e fallback manual sem bloquear o app.

## Escopo da sprint

- Alinhar analise de refeicao por texto e imagem ao papel de recomendacao revisavel.
- Exibir aviso contextual minimo antes do envio para IA e no momento da revisao.
- Garantir erro claro e fallback manual quando a IA falhar ou estiver offline.
- Garantir que imagem usada na analise nao fique persistida localmente por padrao.

## Fora do escopo

- Geracao/importacao do plano alimentar semanal completo.
- Fluxos de treino por IA.
- Proxy/server-side completo para release publica.
- Decidir sozinho o texto final dos avisos.

## Dependencias da sprint

- Sprints 0 a 3 concluidas.
- `PONTO DE DECISAO`: texto final dos avisos de IA aprovado por humano.
- Confirmacao do local exato das chamadas de analise de refeicao e imagem.
- Confirmacao da estrategia para nao persistir imagem localmente.

## Arquivos provaveis a criar/alterar

- Arquivo confirmado na codebase: `/src/services/geminiService.ts`
- Arquivo confirmado na codebase: `/src/components/MealForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo provavel a criar: `/src/components/shared/ContextWarning.tsx` ou equivalente, a confirmar na Sprint 0
- Arquivo provavel a criar: `/src/utils/ai/*` ou equivalente, a confirmar na Sprint 0

## Tarefas em ordem

### Tarefa 4.1 - Aplicar o aviso contextual minimo aprovado

Descricao:
Inserir ou reutilizar um componente de aviso contextual nos fluxos de IA alimentar antes do envio e na tela/etapa de revisao do resultado.

Arquivos provaveis:
- `/src/components/MealForm.tsx`
- Arquivo provavel a criar: `/src/components/shared/ContextWarning.tsx`

Criterio de aceite:
- O usuario visualiza o aviso antes de enviar dados para a IA e volta a ve-lo antes de confirmar o salvamento.

Validacao:
- `npm run lint`
- Validacao manual do fluxo de IA

Riscos:
- Implementar copy nao aprovada ou exibir aviso em momento errado.

O que NAO alterar:
- Texto final sem aprovacao humana.

### Tarefa 4.2 - Garantir revisao humana antes de salvar

Descricao:
Conferir que texto e imagem retornam um rascunho editavel/revisavel e que nenhum resultado da IA entra no dia automaticamente.

Arquivos provaveis:
- `/src/components/MealForm.tsx`
- `/src/services/geminiService.ts`
- `/src/App.tsx`

Criterio de aceite:
- Nenhum resultado de IA e salvo no dia sem confirmacao explicita do usuario.

Validacao:
- `npm run build`
- Teste manual de envio, revisao e cancelamento

Riscos:
- Misturar preview com dado persistido.

O que NAO alterar:
- Fluxo manual simples de refeicao.

### Tarefa 4.3 - Implementar fallback manual e erro claro

Descricao:
Quando a IA falhar, estiver offline ou devolver resposta invalida, o usuario deve receber mensagem compreensivel e continuar conseguindo usar o fluxo manual.

Arquivos provaveis:
- `/src/services/geminiService.ts`
- `/src/components/MealForm.tsx`

Criterio de aceite:
- Falha de IA nao bloqueia o registro manual nem derruba a tela.

Validacao:
- `npm run dev`
- Simulacao manual de falha/offline

Riscos:
- Tratar erro generico demais e esconder a acao manual disponivel.

O que NAO alterar:
- Fluxos de planejamento semanal.

### Tarefa 4.4 - Garantir descarte da imagem e conter superficies fora do PRD

Descricao:
Confirmar que imagens de refeicao nao ficam guardadas no estado local por padrao e que superficies de IA alimentar fora do PRD nao sejam promovidas como parte do MVP.

Arquivos provaveis:
- `/src/services/geminiService.ts`
- `/src/components/MealForm.tsx`
- `/src/App.tsx`

Criterio de aceite:
- A imagem nao reaparece apos reload e nenhuma feature extra de IA alimentar vira dependencia do fluxo principal.

Validacao:
- `npm run build`
- Recarregar o app apos uso de imagem

Riscos:
- Persistencia acidental em estado local ou em preview.

O que NAO alterar:
- Plano alimentar semanal e treino por IA.

## Comandos de validacao da sprint

- `npm run lint`
- `npm run build`
- `npm run dev`
- Testes automatizados: a confirmar na Sprint 0

## Testes necessarios

- Teste manual de analise por texto.
- Teste manual de analise por imagem.
- Teste manual de cancelamento antes do salvamento.
- Teste manual de falha/offline com fallback manual.
- Teste de regressao do cadastro manual de refeicao.

## Fluxo manual de validacao

1. Abrir o fluxo de IA alimentar.
2. Confirmar exibicao do aviso antes do envio.
3. Enviar texto e revisar o resultado sem salvar.
4. Repetir com imagem e confirmar que nao fica persistida apos reload.
5. Simular falha/offline e confirmar retorno ao fluxo manual.

## Riscos da sprint

- Resposta de IA malformada.
- Usuario interpretar IA como prescricao.
- Persistencia acidental de imagem local.

## Criterios finais de aceite da sprint

- Avisos contextuais de IA aplicados no fluxo alimentar.
- Revisao humana obrigatoria antes de salvar.
- Fallback manual claro em falha/offline.
- Imagens nao persistidas localmente por padrao.

## O que NAO deve ser alterado nesta sprint

- Plano semanal alimentar completo.
- Historico/exportacao.
- Treino, cardio, passos.
- Proxy publico completo.

## Atualizacoes documentais recomendadas

- Atualizar `/docs/agent/CURRENT_STATE.md`
- Atualizar `/docs/evolution/DECISIONS.md` se houver decisao nova sobre o fluxo de IA
