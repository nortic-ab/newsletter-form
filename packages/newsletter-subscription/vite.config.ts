import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'NorticNewsletter',
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
