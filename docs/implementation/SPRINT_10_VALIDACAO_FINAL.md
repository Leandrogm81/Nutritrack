# Sprint 10 - Validacao final

## Objetivo

Executar a regressao final do MVP, consolidar a cobertura minima de testes e fechar apenas ajustes necessarios para entregar o escopo aprovado sem regressao.

## Escopo da sprint

- Confirmar scripts finais de validacao.
- Adicionar ou consolidar cobertura minima para utilitarios e fluxos criticos.
- Reexecutar os fluxos manuais centrais do MVP em mobile e desktop.
- Corrigir inconsistencias residuais estritamente dentro do escopo aprovado.
- Atualizar a documentacao operacional e de evolucao conforme o que realmente mudou.

## Fora do escopo

- Novas features.
- Refatoracao ampla nao exigida por bug real.
- Mudanca de arquitetura.
- Reabrir `PONTO DE DECISAO` ja resolvido ou ainda pendente.

## Dependencias da sprint

- Sprints 0 a 9 concluidas.
- Todos os `PONTO DE DECISAO` necessarios para o MVP tratados.
- Comandos finais confirmados.
- Fluxos manuais principais funcionando ao menos uma vez por area.

## Arquivos provaveis a criar/alterar

- Arquivo confirmado na codebase: `/package.json`
- Arquivo confirmado na codebase: `/src/*`
- Arquivo provavel a criar: `/src/**/*.test.*` ou equivalente, a confirmar na Sprint 0
- Arquivo provavel a criar/alterar: `/docs/agent/CURRENT_STATE.md`
- Arquivo provavel a criar/alterar: `/docs/evolution/CHANGELOG.md`
- Arquivo provavel a criar/alterar: `/docs/evolution/DECISIONS.md`

## Tarefas em ordem

### Tarefa 10.1 - Confirmar e consolidar a estrategia de testes

Descricao:
Se o projeto ainda nao tiver runner de testes, escolher a opcao minima compativel com o stack e registrar a decisao. Priorizar cobertura para utilitarios puros de metas, nutricao, rollover, backup/importacao e exportacao.

Arquivos provaveis:
- `/package.json`
- Arquivos provaveis a criar: `/src/**/*.test.*`

Criterio de aceite:
- Existe um comando claro de teste ou um registro explicito do motivo pelo qual a cobertura automatizada ficou limitada.

Validacao:
- Rodar o comando de teste confirmado
- `npm run lint`

Riscos:
- Introduzir ferramental demais tarde no ciclo ou deixar sem nenhuma cobertura minima.

O que NAO alterar:
- Escopo funcional do MVP so para acomodar o teste.

### Tarefa 10.2 - Reexecutar a regressao completa do MVP

Descricao:
Rodar manualmente o fluxo inteiro: perfil, dashboard, refeicoes, agua, IA alimentar, planner alimentar, progresso, historico/exportacao, treino, cardio/passos, planner de treino, backup/importacao/reset e offline.

Arquivos provaveis:
- `/src/*`

Criterio de aceite:
- Os fluxos centrais do MVP funcionam sem regressao perceptivel.

Validacao:
- `npm run build`
- `npm run dev`
- Fluxo manual completo

Riscos:
- Regressao cruzada entre areas que antes foram validadas isoladamente.

O que NAO alterar:
- Comportamentos fora do escopo aprovado.

### Tarefa 10.3 - Corrigir inconsistencias residuais aprovadas

Descricao:
Corrigir apenas bugs, labels, copy, responsividade ou regressao encontrados na validacao final, desde que caibam no PRD e nao exijam mudanca arquitetural.

Arquivos provaveis:
- `/src/*`

Criterio de aceite:
- Ajustes finais resolvem problemas reais sem abrir frente nova de implementacao.

Validacao:
- Repetir os testes impactados
- `npm run lint`
- `npm run build`

Riscos:
- Virar sprint de polimento infinito.

O que NAO alterar:
- Nao adicionar feature nova mascarada de bugfix.

### Tarefa 10.4 - Fechar documentacao de continuidade e release interna

Descricao:
Atualizar estado atual, changelog e decisoes com evidencias reais do que foi implementado, validado e deixado pendente.

Arquivos provaveis:
- `/docs/agent/CURRENT_STATE.md`
- `/docs/evolution/CHANGELOG.md`
- `/docs/evolution/DECISIONS.md`
- `/docs/evolution/out-of-scope-changes.md`

Criterio de aceite:
- A documentacao final registra o que entrou, o que nao entrou e o que continua pendente.

Validacao:
- Revisao manual dos documentos

Riscos:
- Declarar pronto sem evidencias ou omitir limite conhecido.

O que NAO alterar:
- PRD original sem necessidade documentada.

## Comandos de validacao da sprint

- `npm run lint`
- `npm run build`
- Comando de testes confirmado na Sprint 10
- `npm run dev`
- Validacoes manuais de responsividade e regressao

## Testes necessarios

- Testes unitarios dos utilitarios puros.
- Testes de integracao dos fluxos criticos, se o stack adotado suportar.
- Testes manuais fim a fim do fluxo principal.
- Testes de responsividade.
- Testes de estados vazios e de erro.
- Testes de permissao/ambiente para IA local/publica conforme gate definido.

## Fluxo manual de validacao

1. Criar ou revisar um perfil valido.
2. Registrar agua e refeicoes manuais.
3. Executar um fluxo de IA alimentar com revisao.
4. Criar plano alimentar e aplicar item ao dia.
5. Registrar peso, treino, cardio e passos.
6. Consultar Progresso e Historico.
7. Exportar CSV/PDF.
8. Exportar backup, importar backup e testar reset.
9. Colocar o app offline e validar os fluxos locais.

## Riscos da sprint

- Falta de cobertura automatizada suficiente.
- Encontrar regressao estrutural tarde no ciclo.
- Expandir escopo durante o polimento final.

## Criterios finais de aceite da sprint

- Lint e build aprovados.
- Testes minimos executados ou explicitamente justificados.
- Fluxo manual central do MVP aprovado.
- Responsividade verificada.
- Documentacao de continuidade atualizada.

## O que NAO deve ser alterado nesta sprint

- Escopo de produto.
- Arquitetura sem justificativa forte.
- Regras de negocio aprovadas no PRD.

## Atualizacoes documentais recomendadas

- Atualizar `/docs/agent/CURRENT_STATE.md`
- Atualizar `/docs/evolution/CHANGELOG.md`
- Atualizar `/docs/evolution/DECISIONS.md` quando houver decisao definitiva nova
- Atualizar `/docs/evolution/out-of-scope-changes.md` se algo relevante ficar explicitamente adiado
