# Plano de Implementacao

## 1. Premissas

- Observado no PRD: o MVP continua brownfield, mobile-first, local-first, sem login obrigatorio e sem sync como requisito atual.
- Observado no PRD: dieta e treino tem o mesmo peso no produto; historico por data e progresso agregado sao fluxos diferentes.
- Observado no PRD: IA permanece ativa como assistencia revisavel; nenhum resultado de IA pode ser salvo sem revisao humana explicita.
- Observado no PRD: exportacao minima cobre os ultimos 7 dias em CSV/PDF; backup, importacao e reset local fazem parte do MVP.
- Observado no PRD: pontos pendentes de decisao humana continuam abertos para snapshot historico das metas do dia, texto final dos avisos de IA e texto final do aviso de privacidade local.
- Observado na codebase: o app usa React 19 + Vite 6; o estado principal esta em `/src/App.tsx`, a persistencia local em `/src/hooks/useLocalStorage.ts`, os contratos em `/src/types.ts` e as chamadas de IA em `/src/services/geminiService.ts`.
- Inferido: como o brownfield ja cobre boa parte do escopo, o plano prioriza alinhamento ao PRD, fechamento de regras, reducao de risco e remocao de ambiguidades antes de qualquer expansao.
- Precisa ser confirmado: estrategia oficial para segredo da IA em ambiente publico, estrategia de testes automatizados, local exato das rotinas de exportacao/importacao e presenca de parsing real para `.doc` e `.pdf`.
- Limites do PRD respeitados: sem login, sem sync multi-dispositivo, sem monetizacao, sem modo profissional, sem OCR dedicado, sem biblioteca ampla de alimentos/exercicios, sem gamificacao e sem analise de equipamento como requisito do MVP.
- Nao expandir sem autorizacao: backend obrigatorio para todo o app, multiusuario, social, marketplace de alimentos/exercicios, novas areas de produto fora das telas e entidades listadas no PRD.
- Dependencias da Sprint 0: confirmar o mapa real de arquivos, os comandos oficiais do projeto, a superficie atual da tela Historico, os assets PWA e o risco operacional do uso de `GEMINI_API_KEY` no cliente.

## 2. Fonte do plano

Fonte principal:
- `/docs/product/PRD_v1.1.md`

Fontes auxiliares, se disponiveis:
- `/docs/product/acceptance-criteria.md` (nao encontrado no workspace)
- `/docs/evolution/DECISIONS.md`
- `/docs/design/UI_UX_GUIDE.md` (nao encontrado; usada referencia complementar `/docs/design/UI_UX_GUIDE_SECTION_16.md`)

Observacao:
Este plano nao altera o PRD. Ele apenas transforma o PRD em uma sequencia executavel de sprints.

## 3. Visao geral das sprints

| Sprint | Nome | Objetivo | Arquivo |
|---|---|---|---|
| Sprint 0 | Preparacao e leitura do projeto | Confirmar arquitetura, comandos, riscos e arquivos reais antes de alterar codigo | `/docs/implementation/SPRINT_00_PREPARACAO.md` |
| Sprint 1 | Fundacao de dados | Alinhar contratos de dominio, rollover diario e guardrails do brownfield com o PRD | `/docs/implementation/SPRINT_01_FUNDACAO_DADOS.md` |
| Sprint 2 | Perfil e metas | Fechar campos, validacoes e calculo/editabilidade das metas do usuario | `/docs/implementation/SPRINT_02_PERFIL_METAS.md` |
| Sprint 3 | Dashboard, refeicoes e agua | Alinhar o fluxo diario principal, refeicao manual e hidratacao | `/docs/implementation/SPRINT_03_DASHBOARD_REFEICOES_AGUA.md` |
| Sprint 4 | IA de refeicao e avisos | Fechar os fluxos de analise alimentar por IA, revisao obrigatoria e fallback manual | `/docs/implementation/SPRINT_04_IA_REFEICAO_AVISOS.md` |
| Sprint 5 | Plano alimentar | Alinhar planejamento semanal de dieta, aplicacao manual ao dia e importacao/geracao revisavel | `/docs/implementation/SPRINT_05_PLANO_ALIMENTAR.md` |
| Sprint 6 | Progresso, historico e exportacao | Separar historico de progresso, consolidar metricas e fechar exportacao minima | `/docs/implementation/SPRINT_06_PROGRESSO_HISTORICO_EXPORTACAO.md` |
| Sprint 7 | Treino, cardio e passos | Alinhar cadastro/execucao fisica, passos e cardio sem inventar formulas novas | `/docs/implementation/SPRINT_07_TREINO_EXECUCAO_CARDIO_PASSOS.md` |
| Sprint 8 | Plano de treino e IA | Fechar agenda semanal de treino, IA revisavel e isolamento de itens fora do MVP | `/docs/implementation/SPRINT_08_PLANO_TREINO_IA.md` |
| Sprint 9 | Backup, privacidade e PWA | Consolidar gestao de dados locais, avisos de privacidade, offline e gate de release | `/docs/implementation/SPRINT_09_BACKUP_PRIVACIDADE_PWA.md` |
| Sprint 10 | Validacao final | Executar regressao, cobertura minima e ajustes finais dentro do escopo aprovado | `/docs/implementation/SPRINT_10_VALIDACAO_FINAL.md` |

## 4. Ordem de execucao recomendada

Sprint 0 vem primeiro porque o coder precisa reconfirmar mapa de arquivos, scripts, riscos e pontos pendentes diretamente na codebase antes de tocar componentes sensiveis do brownfield.

As Sprints 1 a 3 devem ocorrer em sequencia, porque contratos de dados, calculo de metas e fluxo diario precisam estar estaveis antes de expandir IA, planejamento semanal e historico.

As Sprints 4 e 5 dependem do fluxo manual estar correto. A recomendacao segura para um modelo coder menor e primeiro estabilizar revisao obrigatoria, warnings e fallback manual, e so depois ligar isso ao planejador alimentar semanal.

As Sprints 6 e 9 nao devem ser iniciadas sem os `PONTO DE DECISAO` correspondentes. Historico/exportacao dependem da decisao sobre snapshot das metas do dia. Avisos finais de IA/privacidade dependem da aprovacao humana do texto.

As Sprints 7 e 8 podem ser validadas isoladamente depois que o nucleo de dados estiver alinhado, mas a Sprint 8 depende da Sprint 7 para manter clara a separacao entre treino planejado e treino executado.

A Sprint 10 fecha a cadeia com a sequencia mais segura para modelo menor: confirmar regressao, consolidar cobertura minima e limitar ajustes finais ao que ja foi aprovado nas sprints anteriores.

## 5. Checklist de validacao geral

| Validacao | Como executar | Obrigatoria? | Observacao |
|---|---|---|---|
| Lint | `npm run lint` | Sim | Confirmado em `package.json`; hoje executa `tsc --noEmit` |
| Typecheck | Confirmar se continuara sendo `npm run lint` ou se havera script dedicado | Sim | A confirmar na Sprint 0 |
| Build | `npm run build` | Sim | Confirmado em `package.json` |
| Testes | Confirmar script oficial; se nao existir, criar e registrar na Sprint 10 | Sim, se existir | Hoje nao ha script dedicado confirmado |
| Fluxo manual | Executar o fluxo principal da sprint e o fluxo central do dia atual | Sim | Descrever em cada sprint |
| Responsividade | Validar em largura mobile e desktop sem quebra visual | Sim | Descrever em cada sprint |
| Regressoes | Reexecutar refeicao, agua, perfil e historico apos cada sprint | Sim | Escopo minimo do MVP nao pode regredir |
| Verificacao de escopo | Comparar entrega com PRD e DECISIONS antes de fechar a sprint | Sim | Nao promover sugestao a requisito |
| Verificacao de arquivos alterados | Revisar diff e garantir que nao tocou areas fora da sprint | Sim | Especialmente `/src/App.tsx` e `/src/services/geminiService.ts` |
| Variaveis de ambiente | Conferir `.env.example`, uso de `GEMINI_API_KEY` e `APP_URL` | Sim | A confirmar na Sprint 0 e revisitar na Sprint 9 |
| Seguranca basica | Garantir que importacao invalida nao corrompe dados e que segredo da IA nao seja liberado em release publico | Sim | Parte do gate final da Sprint 9 |

## 6. Pontos que exigem modelo mais forte

| Tarefa ou area | Motivo | Risco | Recomendacao |
|---|---|---|---|
| Definir e implementar estrategia de IA para ambiente publico | Alteracao sensivel de seguranca e integracao externa | Alto | Modelo forte e revisao humana antes de executar |
| Desenhar snapshot historico das metas do dia | Afeta regra de negocio, exportacao, historico e confianca dos dados | Alto | Decisao humana antes; implementacao por modelo forte |
| Reestruturar amplamente `/src/App.tsx` | Refatoracao ampla em ponto central do brownfield | Alto | So refatorar o minimo; qualquer quebra estrutural grande pede modelo forte |
| Validacao robusta de backup/importacao com migracao versionada | Dado local e risco de corrupcao de estado | Alto | Modelo forte e teste dedicado |
| Normalizacao forte de respostas Gemini | Parsing de IA, tratamento de erro e resiliencia de fluxo critico | Medio/Alto | Modelo forte ou revisao senior antes de merge |
| Ajustes de service worker/offline com impacto em cache | Performance e confiabilidade do PWA | Medio | Modelo forte se houver mudanca de estrategia de cache |

## 7. Tarefas adequadas para coder economico

| Tarefa | Por que e adequada | Limites | Validacao esperada |
|---|---|---|---|
| Ajustar labels, empty states e mensagens de apoio do fluxo manual | Escopo local e visivel | Sem reescrever arquitetura | Build + validacao manual da tela |
| Alinhar validacoes de campos obrigatorios em formularios existentes | Mudanca concentrada em componentes de formulario | Sem trocar a formula de negocio aprovada | Lint + fluxo manual de erro/sucesso |
| Separar Historico de Progresso na navegacao | Mudanca de navegacao/UI controlada | Sem alterar contrato de dados sem decisao | Build + fluxo manual de acesso |
| Remover ou ocultar superficies claramente fora do MVP se estiverem expostas | Reduz risco de escopo | Nao apagar codigo util sem confirmar uso real | Diff + validacao manual |
| Implementar testes unitarios para utilitarios puros ja extraidos | Baixo acoplamento depois da Sprint 1 | Sem introduzir frameworks grandes sem registrar decisao | Suite minima + build |
| Ajustar exportacao de 7 dias depois do contrato fechado | Escopo delimitado e verificavel | Depende da decisao sobre snapshot | Exportar CSV/PDF e revisar conteudo |

## 8. Sugestoes fora do escopo

| Sugestao | Valor potencial | Por que esta fora do escopo | Quando considerar |
|---|---|---|---|
| Roteamento formal por pagina | Medio | O PRD nao exige troca de arquitetura agora | Depois de estabilizar o MVP e regressao |
| Biblioteca estruturada de alimentos/exercicios | Alto | O PRD explicitamente deixa isso fora do MVP | Ciclo futuro aprovado |
| Instrumentacao de uso e metricas de produto | Medio | Exige estrategia de coleta e privacidade ainda nao definida | Depois do MVP e da politica de privacidade |

## 9. Observacoes finais

- O plano parte do PRD versionado mais recente e das decisoes permanentes registradas em `/docs/evolution/DECISIONS.md`.
- Qualquer divergencia entre o PRD e a codebase deve ser registrada na Sprint 0 antes de virar implementacao.
- Os tres `PONTO DE DECISAO` principais nao podem ser convertidos em comportamento final por inferencia do coder.
- O brownfield ja possui funcionalidades alem do MVP documentado; a diretriz segura e alinhar o que esta exposto ao usuario e nao expandir o que sobrou fora de escopo.
- Se a release alvo for publica com IA ativa, o projeto nao deve ser considerado pronto sem o gate de seguranca da Sprint 9.
