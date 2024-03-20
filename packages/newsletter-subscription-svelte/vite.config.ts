import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'SvelteForm',
      fileName: 'index',
      formats: ['iife', 'es', 'cjs', 'umd'],
    },
  },
})
