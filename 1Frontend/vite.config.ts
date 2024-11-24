import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// Configuração para um projeto TypeScript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias para corrigir problemas de compatibilidade de bibliotecas
      stream: 'stream-browserify',
      buffer: 'buffer',
      util: 'util',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Resolve problemas com "global" no ambiente do browser
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Configuração opcional para chunks
      },
    },
  },
})
