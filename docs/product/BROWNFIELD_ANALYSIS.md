# Brownfield Analysis - NutriTrack

Data: 2026-05-28
Repositorio: `Leandrogm81/Nutritrack`
Branch analisada: `main`
Escopo: documentar o estado real do projeto existente. Nenhuma feature foi implementada neste ciclo.

## 1. Resumo executivo

NutriTrack e um PWA front-end em React 19 + Vite 6 para acompanhamento pessoal de dieta, hidratacao, treino, cardio, passos, peso e bioimpedancia. O app funciona como SPA mobile-first, persiste todos os dados no `localStorage` e usa Gemini para leitura, analise e geracao de refeicoes, dietas e treinos.

O estado funcional observado e razoavelmente avancado para um MVP/prototipo: ha telas principais para dashboard, progresso, planejamento alimentar, receitas, treino e perfil. Tambem existe exportacao/importacao de backup e historico diario em CSV/PDF.

O principal risco de produto/engenharia e que o app parece ser client-only, mas consome Gemini com `GEMINI_API_KEY` exposta no bundle via `vite.config.ts`. Tambem nao ha testes automatizados, ha 19 vulnerabilidades reportadas por `npm audit`, o README ainda e boilerplate do AI Studio, e parte da documentacao/config contem problemas de encoding.

Validacoes executadas:

- `npm run lint`: passou.
- `npm run build`: passou.
- `npm audit --audit-level=moderate`: falhou com 19 vulnerabilidades, sendo 10 moderadas, 7 altas e 2 criticas.
- Busca por testes fora de `node_modules`: nenhum arquivo `test`/`spec` encontrado.

## 2. Inventario de funcionalidades

Funcionalidades atuais observadas:

- Registro diario de refeicoes com calorias, proteinas, carboidratos e gorduras.
- Entrada manual de refeicao.
- Analise de refeicao por texto via Gemini.
- Analise de refeicao por imagem via Gemini.
- Ajuste de porcao com recalculo proporcional de macros.
- Rastreamento de agua com botoes rapidos.
- Dashboard diario com metas, macros, agua, peso, bioimpedancia, treinos e gasto estimado.
- Historico por data com fechamento automatico quando o dia muda.
- Exportacao de historico em CSV e PDF.
- Planejador alimentar semanal por dia da semana e tipo de refeicao.
- Importacao de plano alimentar por texto com IA.
- Gerador de dieta semanal com IA.
- Sugestoes de receitas por IA com base nos macros restantes.
- Cadastro de perfil do usuario, objetivo, nivel de atividade e preferencia alimentar.
- Calculo estimado de metas nutricionais a partir do perfil.
- Registro de peso e dados de bioimpedancia.
- Backup JSON dos dados locais.
- Importacao de backup JSON.
- Reset de dados locais.
- Tema claro/escuro.
- Cadastro e exclusao de treinos.
- Registro de treino executado.
- Planejador semanal de treinos.
- Importacao de treino por texto com IA.
- Gerador de plano semanal de treino com IA.
- Analise de equipamento de academia por imagem via Gemini.
- Registro de passos.
- Registro de cardio com tipo, duracao, intensidade e calorias estimadas.
- Calculo de gasto estimado por passos e cardio.
- PWA com service worker gerado por `vite-plugin-pwa`.

Componentes existentes mas aparentemente nao integrados ao fluxo principal:

- `BarcodeScanner.tsx`: componente de scanner por `html5-qrcode`, sem referencia de uso encontrada em `src/App.tsx` ou outros componentes.
- `CoachInsights.tsx`: componente de insight de IA, sem referencia de uso encontrada no fluxo renderizado.

Dependencias declaradas sem uso evidente no codigo fonte atual:

- `express`
- `dotenv`
- `react-markdown`
- `clsx`
- `tailwind-merge`
- `@types/express`

## 3. Inventario de telas e rotas

O app nao usa roteador. Existe uma unica rota SPA servida por `index.html`; `vercel.json` reescreve qualquer caminho para `/index.html`.

Navegacao principal renderizada em `src/App.tsx`:

- `Inicio`: dashboard diario, agua, refeicoes do dia e resumo.
- `Progresso`: analytics com graficos de calorias, macros, peso/bioimpedancia e frequencia de treino.
- `Plano`: planejamento alimentar semanal e gerador de dieta.
- `Receitas`: sugestoes de receitas por IA.
- `Treino`: area com subtabs.
- `Perfil`: formulario de perfil, metas, backup/importacao/reset.

Subtelas em `Treino`:

- `Registro`: treinos salvos e registro de execucao.
- `Agenda`: planejador semanal de treinos.
- `Cardio`: passos e cardio do dia.
- `Gerador`: gerador/importador de treino com IA.

Tela adicional existente:

- `Historico`: calendario e exportacoes. O tipo `Section` inclui `history` e o componente `HistoryCalendar` e renderizado, mas nao ha item correspondente na navegacao inferior observada. A tela pode ficar inacessivel pela navegacao principal se nenhum outro controle direcionar para ela.

Metadados de UI:

- `index.html` ainda usa o titulo `My Google AI Studio App`.
- `metadata.json` descreve o app como PWA de dieta/hidratacao e solicita permissao de camera.
- O app usa layout mobile-first com largura maxima aproximada de celular (`max-w-md`) e bottom navigation fixa.

## 4. Arquitetura real

Stack observada:

- React 19.
- TypeScript 5.8.
- Vite 6.
- Tailwind CSS 4 via `@tailwindcss/vite`.
- PWA com `vite-plugin-pwa`.
- Gemini via `@google/genai`.
- Graficos com `recharts`.
- Icones com `lucide-react`.
- Animacoes com `motion`.
- PDF com `jspdf` e `jspdf-autotable`.
- Scanner disponivel com `html5-qrcode`, mas sem uso integrado.

Modelo de execucao:

- Aplicacao puramente client-side.
- Estado global fica em `src/App.tsx`.
- Persistencia ocorre no hook `src/hooks/useLocalStorage.ts` com a chave `nutritrack_data`.
- O rollover de dia arquiva o dia anterior em `history`.
- Nao ha backend proprio, banco de dados, autenticacao ou autorizacao.
- Nao ha camada de API interna para proteger chaves, validar payloads ou auditar operacoes.

Organizacao:

- `src/App.tsx`: orquestracao de estado, navegacao e handlers principais.
- `src/types.ts`: contratos principais do dominio.
- `src/services/geminiService.ts`: concentracao das chamadas Gemini e prompts.
- `src/components/*`: componentes/telas do produto.
- `docs/*`: framework de prompts, regras, changelog e templates; esta pasta esta atualmente nao rastreada pelo Git.

Configuracoes relevantes:

- `.env.example` declara `GEMINI_API_KEY` e `APP_URL`.
- `vite.config.ts` injeta `process.env.GEMINI_API_KEY` no bundle do front-end.
- `vite.config.ts` usa icones PWA remotos de `https://picsum.photos`.
- `tsconfig.json` nao ativa `strict`; tambem permite JS (`allowJs: true`).
- `package.json` tem `vite` em `dependencies` e `devDependencies`.

## 5. Qualidade observavel

Pontos positivos:

- `npm run lint` passa com `tsc --noEmit`.
- `npm run build` passa e gera PWA/service worker.
- Tipos de dominio principais existem em `src/types.ts`.
- A maior parte das chamadas Gemini esta centralizada em um servico unico.
- O app tem backup/importacao, o que reduz perda de dados em um modelo local-only.
- Ha historico diario e exportacao, importantes para uso real.

Pontos de atencao:

- Nao foram encontrados testes automatizados.
- `npm audit` reporta 19 vulnerabilidades, incluindo vulnerabilidades criticas em `jspdf` e `protobufjs`.
- O bundle principal gerado tem aproximadamente 1.328 kB minificado; o build alerta sobre chunks acima de 500 kB.
- Muitos fluxos dependem de IA e retornos JSON; parte do parsing usa `any` e normalizacoes manuais.
- A importacao de backup valida pouco a estrutura recebida.
- Algumas strings/configuracoes aparecem com encoding quebrado em arquivos de metadata/config.
- README e titulo HTML ainda parecem boilerplate do AI Studio.

## 6. Debitos tecnicos

Debitos mais importantes:

- Exposicao potencial da chave Gemini no front-end.
- Ausencia de testes unitarios, de integracao e de smoke/e2e versionados.
- Ausencia de roteamento real ou mapa formal de telas.
- Estado global concentrado em `App.tsx`, que ja acumula muitas responsabilidades.
- Sem schema de validacao para dados importados, respostas de IA e dados persistidos.
- Sem migracoes versionadas para `localStorage`.
- Sem estrategia clara para LGPD/privacidade, apesar de dados de saude, peso, medidas e dieta.
- Sem backend para sincronizacao multi-dispositivo.
- Sem autenticacao ou perfis por usuario.
- Componentes aparentemente mortos (`BarcodeScanner`, `CoachInsights`).
- Dependencias aparentemente nao usadas.
- Duplicidade de `vite` em dependencias.
- Icones PWA usam imagens aleatorias externas, nao assets controlados do produto.
- Titulo/README/metadados ainda nao estao totalmente productizados.
- TypeScript sem `strict`, permitindo que problemas de contrato passem despercebidos.

## 7. PRD reverso

Produto atual inferido:

NutriTrack deve permitir que uma pessoa acompanhe dieta, hidratacao, composicao corporal, treinos e atividades em um app mobile-first, com suporte offline e auxilio de IA para reduzir o trabalho manual de cadastro.

Publico-alvo inferido:

- Usuario individual que quer registrar alimentacao, acompanhar macros e organizar rotina de treino.
- Usuario que prefere um app simples/local, sem conta obrigatoria.
- Usuario que aceita auxilio de IA para gerar dietas, interpretar refeicoes e estruturar treinos.

Objetivos funcionais atuais:

- Registrar consumo alimentar diario.
- Comparar consumo com metas.
- Registrar agua.
- Registrar peso e bioimpedancia.
- Planejar refeicoes e treinos por semana.
- Gerar ou interpretar planos com IA.
- Registrar treinos, cardio e passos.
- Consultar progresso por graficos.
- Exportar historico e backup.

Requisitos nao funcionais atuais/inferidos:

- Rodar como PWA.
- Funcionar majoritariamente offline para dados ja salvos.
- Manter dados no dispositivo.
- Ter UX mobile-first.
- Integrar camera para imagens/refeicoes/equipamentos.

Limites atuais do produto:

- Sem conta.
- Sem sincronizacao.
- Sem servidor.
- Sem protecao robusta para chave de IA.
- Sem testes automatizados.
- Sem garantia clinica/nutricional formal.

## 8. Delta entre estado atual e desejado

Estado atual:

- MVP/prototipo funcional, client-only, com muitas features de dieta/treino ja presentes.
- Dados locais e sem autenticacao.
- IA chamada diretamente do browser.
- Documentacao de produto ainda incipiente.
- Sem suite de testes.
- Build passa, mas audit falha.

Estado desejado inferido para evolucao segura:

- Produto com fronteira clara entre prototipo local e app publicavel.
- Backend ou serverless API para chamadas Gemini e protecao de chave.
- Schemas de validacao para dados persistidos, backup e respostas de IA.
- Suite minima de testes para calculos, persistencia, importacao/exportacao e fluxos principais.
- Dependencias limpas e vulnerabilidades reduzidas.
- Documentacao de produto real: PRD, mapa de telas, criterios de aceite e estrategia de privacidade.
- PWA com assets proprios, metadata correta e textos sem encoding quebrado.
- Melhor divisao de estado/domino para reduzir o tamanho de `App.tsx`.
- Historico acessivel por navegacao clara.
- Decisao explicita sobre sincronizacao, autenticacao e privacidade.

Possiveis features futuras inspiradas em apps de treino/dieta:

- Metas por periodo.
- Templates de refeicao e treino.
- Relatorios semanais/mensais.
- Conquistas/habitos.
- Biblioteca de alimentos/exercicios.
- Autenticacao e sincronizacao opcional.

Essas features devem vir depois de corrigir os fundamentos de seguranca, validacao e testes.

## 9. Riscos

Riscos altos:

- Chave Gemini no front-end: qualquer build publico pode expor segredo e gerar custo/abuso.
- Dados sensiveis em `localStorage`: historico alimentar, peso, medidas e composicao corporal ficam sem criptografia e sem controle de acesso.
- Vulnerabilidades criticas no grafo de dependencias: `npm audit` falha.
- Sem testes: regressao em calculos, importacao/exportacao e persistencia pode passar sem deteccao.

Riscos medios:

- Respostas de IA podem ser malformadas ou nutricionalmente inadequadas.
- Importacao de backup pode aceitar estrutura invalida e corromper estado local.
- Historico depende de rollover por abertura do app; dias sem uso podem nao ter registros esperados.
- Bundle grande pode prejudicar performance mobile.
- Componentes/dependencias mortos aumentam custo de manutencao.
- PWA com icones remotos aleatorios enfraquece confiabilidade e identidade.

Riscos baixos/operacionais:

- README/titulo/metadados desalinhados passam impressao de prototipo.
- Encoding quebrado pode aparecer para usuario final.
- Falta de docs de arquitetura dificulta onboarding e continuidade.

## 10. Recomendacao de proximo passo

Recomendacao principal: executar uma sprint curta de estabilizacao antes de adicionar novas features.

Prioridade sugerida:

1. Remover a exposicao direta de `GEMINI_API_KEY` criando uma API server-side/proxy ou desativando IA em builds publicos ate haver protecao.
2. Corrigir vulnerabilidades com `npm audit fix` controlado, atualizacao de dependencias e validacao de build.
3. Criar schemas de validacao para `DailyData`, backup/importacao e respostas Gemini.
4. Adicionar testes minimos para calculos de metas/macros, cardio/passos, rollover diario, backup/importacao e parsing de IA.
5. Limpar dependencias e componentes nao usados.
6. Productizar README, `index.html`, metadata PWA e assets.
7. Criar PRD real a partir deste PRD reverso, separando MVP atual, riscos e roadmap.

Somente depois disso vale priorizar novas features como conquistas, templates avancados, relatorios ou sincronizacao.
