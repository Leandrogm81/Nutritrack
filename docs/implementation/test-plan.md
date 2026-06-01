# Plano de Testes

## Framework

- Vitest `^3.2.4`
- @testing-library/react `^16.3.0`
- jsdom `^27.2.0`

## Tipos configurados

- Unitarios: Vitest
- Integracao leve (DOM/React): Vitest + Testing Library
- E2E: nao configurado na Sprint 00B

## Localizacao dos testes

- `src/**/*.test.ts`
- `src/**/*.test.tsx`

## Nomenclatura

- Arquivos com sufixo `.test.ts` ou `.test.tsx`
- Nome do arquivo de teste ao lado do arquivo alvo (co-location)

## Como executar

- `npm run test` para execucao unica
- `npm run test:watch` para execucao em watch

## Cobertura esperada

- Sem meta numerica nesta sprint.
- Objetivo atual: garantir base executavel de testes e smoke test real.

## Decisoes tomadas

- Runner escolhido: Vitest por compatibilidade nativa com Vite/ESM.
- Ambiente de teste: `jsdom` para suportar casos com DOM/React.
- Sprint 00B limitada a fundacao de testes, sem E2E completo.
- Smoke test inicial em `useLocalStorage` para validar persistencia real.
