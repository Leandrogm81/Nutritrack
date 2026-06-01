# Handoff — Continuidade de Sessão

## 1. Objetivo atual
Tornar o NutriTrack MVP v1.2.4 instalável como app Android (PWA), com integração de IA rodando via OpenCode Go (`https://opencode.ai/zen/go/v1`) com o modelo `xiaomi/mimo-v2.5`, mitigando erros de cache PWA.

## 2. Estado geral do projeto
MVP completo. Código publicado no GitHub (`main`, commit `f301ee5`). Deploy Vercel automático disparado pelo push. Integração de IA migrada de OpenRouter para OpenCode Go de forma bem-sucedida. O proxy de borda `/api/openrouter-proxy` foi recriado como um alias/wrapper apontando para `/api/opencode-proxy` para evitar erro HTTP 405 em clientes que possuam a versão anterior da aplicação em cache no navegador.

## 3. O que já foi feito nesta sessão
- **Mitigação de Erros de Cache**:
  - Recriada a rota `/api/openrouter-proxy.ts` re-exportando as configurações e o handler do novo `/api/opencode-proxy.ts`, garantindo que requisições de clientes legados continuem funcionando.
- **Migração para OpenCode Go**:
  - Criado o edge proxy `/api/opencode-proxy.ts` apontando para `https://opencode.ai/zen/go/v1/chat/completions` (suporta `OPENCODE_API_KEY`, `OPENCODE_GO_API_KEY` ou fallback para `OPENROUTER_API_KEY`).
  - Atualizado `src/services/geminiService.ts` e `vite.config.ts` para usar o novo proxy e as novas definições de modelo.
- **Otimização do menu inferior**: tamanho de fonte reduzido para `8px` e padding reduzido no mobile no componente `NavButton` (`src/App.tsx`), evitando quebras de layout.
- **PWA Imagens Hardening & Logotipo**: formato dos ícones corrigido e logotipo `favicon.svg` inserido no cabeçalho.
- **Compilação e validação do build de produção**: `npm run build` e testes executados e bem-sucedido.
- **Git Commit & Push**: commits `93ccddb`, `9f791cb` e `f301ee5` enviados ao repositório remoto.

## 4. Decisões tomadas
- **Renomeação do Proxy**: preferiu-se renomear o arquivo e rota do proxy para `/api/opencode-proxy.ts` para manter a coerência semântica com o novo provedor, mas a lógica da chamada mantém compatibilidade com chaves anteriores.
- **Preservação de Mimo v2.5**: o modelo oficial exigido permanece `xiaomi/mimo-v2.5`.
- **Navegação inferior compacta**: o tamanho de fonte dinâmico reduziu o aperto no mobile.

## 5. Arquivos importantes
- `src/App.tsx` — Cabeçalho atualizado para renderizar `favicon.svg`
- `index.html` — Adicionado link do manifesto explicitamente
- `public/pwa-512x512.png` — Imagem de 512x512 corrigida (PNG nativo)
- `public/pwa-maskable-512x512.png` — Imagem maskable corrigida (PNG nativo)

## 6. Problemas encontrados
- **Assinatura do arquivo PNG inválida**: `pwa-512x512.png` e `pwa-maskable-512x512.png` possuíam assinatura de bytes JPEG (`ffd8ffe000104a46`). Isso quebrava silenciosamente a validação de instalação do PWA no Android Chrome. Corrigido com script de conversão via `sharp`.

## 7. Pendências
- Testar a instalação no Android Chrome acessando a URL do deploy na Vercel após limpar cache do navegador.

## 8. Segurança para troca de sessão
- Seguro rodar `/new`? **Sim**
- Motivo: Alterações de código e imagem commitadas no GitHub, build local testado e limpo, arquivos de continuidade atualizados.
