import { defineConfig } from 'vite'

export default defineConfig({
  // Relative base so GitHub Pages (/anatomy-3d/) and local preview both resolve assets.
  base: './',
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
