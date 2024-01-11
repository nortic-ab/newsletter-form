import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'iife'], // Build for commonJS and ESmodules
  target: 'es5',
  globalName: 'NorticNewsletter',
  dts: true, // Generate declaration file (.d.ts)
  sourcemap: true,
  clean: true,
})
