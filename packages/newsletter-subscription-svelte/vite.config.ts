import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'SvelteForm',
      fileName: (module) => {
        switch (module) {
          case 'es': return 'index.js'
          case 'cjs': return 'index.cjs'
          case 'umd': return 'index.umd.cjs'
          case 'iife': return 'index.global.js'
          default: return 'index.js'
        }
      },
      formats: ['iife', 'es', 'cjs', 'umd'],
    },
  },
})
