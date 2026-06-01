import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'NutriTrack PWA',
          short_name: 'NutriTrack',
          description: 'Seu assistente de dieta e hidratação offline',
          theme_color: '#10b981',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    define: {
      // SECURITY: OPENROUTER_API_KEY is NOT injected into the client bundle.
      // The secret lives exclusively in the Vercel server environment (no VITE_ prefix).
      // All AI calls go through /api/openrouter-proxy.ts.
      'process.env.VITE_OPENROUTER_MODEL': JSON.stringify(env.VITE_OPENROUTER_MODEL || 'xiaomi/mimo-v2.5'),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR can be disabled via DISABLE_HMR env var (useful during agent-assisted development).
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
