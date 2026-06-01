# Sprint 6 - Progresso, historico e exportacao

## Objetivo

Separar com clareza Historico e Progresso, fechar o conjunto minimo de metricas corporais e concluir a exportacao minima de 7 dias sem ambiguidade nos dados.

## Escopo da sprint

- Alinhar registro corporal e tela de progresso ao conjunto minimo aprovado.
- Tornar Historico uma tela de primeiro nivel acessivel por caminho claro.
- Fechar o shape do historico diario e o rollover em conformidade com a decisao humana.
- Ajustar exportacao CSV/PDF do recorte minimo do MVP.

## Fora do escopo

- Relatorios avancados semanais/mensais.
- Filtros analiticos sofisticados.
- Sync em nuvem.
- Mudar o escopo do snapshot historico sem decisao humana.

## Dependencias da sprint

- Sprints 0 a 5 concluidas.
- `PONTO DE DECISAO`: definir se o historico armazena snapshot das metas vigentes do dia.
- Confirmacao do local atual da exportacao CSV/PDF.
- Confirmacao do conjunto minimo da tela Progresso descrito no PRD.

## Arquivos provaveis a criar/alterar

- Arquivo confirmado na codebase: `/src/components/Analytics.tsx`
- Arquivo confirmado na codebase: `/src/components/HistoryCalendar.tsx`
- Arquivo confirmado na codebase: `/src/components/UserProfileForm.tsx`
- Arquivo confirmado na codebase: `/src/App.tsx`
- Arquivo confirmado na codebase: `/src/types.ts`
- Arquivo provavel a criar: `/src/utils/export/*` ou equivalente, a confirmar na Sprint 0

## Tarefas em ordem

### Tarefa 6.1 - Alinhar o conjunto minimo de progresso corporal

Descricao:
Garantir que peso, bioimpedancia opcional e metricas agregadas aparecam como leitura comparativa, sem depender de filtros avancados.

Arquivos provaveis:
- `/src/components/Analytics.tsx`
- `/src/App.tsx`
- `/src/types.ts`

Criterio de aceite:
- A tela Progresso exibe o conjunto minimo aprovado e nao quebra quando a bioimpedancia estiver ausente.

Validacao:
- `npm run lint`
- Teste manual com e sem bioimpedancia

Riscos:
- Acoplar progresso a dados que ainda nao existem para todos os usuarios.

O que NAO alterar:
- Regras de treino e planner alimentar.

### Tarefa 6.2 - Separar Historico de Progresso na navegacao

Descricao:
Dar caminho claro e distinto para Historico por data e Progresso agregado, ajustando navegacao e textos para evitar sobreposicao conceitual.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/components/HistoryCalendar.tsx`
- `/src/components/Analytics.tsx`

Criterio de aceite:
- O usuario encontra Historico e Progresso por caminhos separados e entende a diferenca entre eles.

Validacao:
- `npm run build`
- Validacao manual da navegacao

Riscos:
- Quebrar a navegacao inferior existente ou esconder Historico novamente.

O que NAO alterar:
- Layout global alem do necessario para expor Historico.

### Tarefa 6.3 - Fechar historico diario e rollover conforme decisao humana

Descricao:
Aplicar a decisao oficial sobre snapshot das metas no historico diario, garantindo consistencia para consulta futura e exportacao.

Arquivos provaveis:
- `/src/App.tsx`
- `/src/types.ts`
- `/src/hooks/useLocalStorage.ts`
- Arquivo provavel a criar: `/src/utils/rollover.ts`

Criterio de aceite:
- O historico armazena exatamente o contrato aprovado e nao recalcula o passado silenciosamente fora da decisao humana.

Validacao:
- `npm run lint`
- Reabrir o app no mesmo dia e apos simular mudanca de dia

Riscos:
- Distorcer comparacoes historicas ou duplicar dias.

O que NAO alterar:
- Decisao de negocio pendente por inferencia.

### Tarefa 6.4 - Ajustar exportacao minima de 7 dias

Descricao:
Fechar PDF e CSV conforme o recorte aprovado: PDF com resumo diario; CSV com linhas por refeicao e repeticao dos dados diarios na primeira linha do dia.

Arquivos provaveis:
- `/src/components/HistoryCalendar.tsx`
- Arquivo provavel a criar: `/src/utils/export/*`
- `/src/types.ts`

Criterio de aceite:
- O usuario exporta os ultimos 7 dias em CSV/PDF com feedback claro e conteudo coerente com o PRD.

Validacao:
- `npm run build`
- Exportar CSV/PDF e revisar manualmente os arquivos

Riscos:
- Exportar dados inconsistentes com a decisao sobre snapshot de metas.

O que NAO alterar:
- Relatorios adicionais fora do recorte minimo.

## Comandos de validacao da sprint

- `npm run lint`
- `npm run build`
- `npm run dev`
- Testes automatizados: a confirmar na Sprint 0

## Testes necessarios

- Teste manual da tela Progresso com dados minimos.
- Teste manual do Historico por data.
- Teste manual de exportacao CSV.
- Teste manual de exportacao PDF.
- Teste de regressao do rollover diario.

## Fluxo manual de validacao

1. Salvar peso com e sem bioimpedancia.
2. Abrir Progresso e confirmar metricas minimas.
3. Abrir Historico por caminho proprio e consultar um dia salvo.
4. Exportar os ultimos 7 dias em CSV e PDF.
5. Conferir se os arquivos respeitam o formato aprovado.

## Riscos da sprint

- Falta da decisao humana sobre snapshot historico.
- Navegacao inconsistente entre Perfil, Historico e Progresso.
- Exportacao parecer correta mas usar dados errados.

## Criterios finais de aceite da sprint

- Historico e Progresso separados de forma clara.
- Tela Progresso usa o conjunto minimo aprovado.
- Historico diario segue a decisao oficial.
- Exportacao CSV/PDF de 7 dias funciona com feedback claro.

## O que NAO deve ser alterado nesta sprint

- Fluxos de IA alem do necessario para leitura de dados exportados.
- Planner alimentar.
- Treino e cardio.
- Backup/importacao geral.

## Atualizacoes documentais recomendadas

- Atualizar `/docs/agent/CURRENT_STATE.md`
- Atualizar `/docs/evolution/DECISIONS.md` com a decisao do snapshot, se tomada
- Atualizar `/docs/evolution/CHANGELOG.md`
