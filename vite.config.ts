import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import { writeModelPacks, omitLoosePackedGlbs } from './scripts/pack-models.mjs'

/** Production builds get byte-identical GLB packs under dist/models/packs. */
function anatomyModelPacks(): Plugin {
  let outDir = 'dist'
  return {
    name: 'anatomy-model-packs',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    async closeBundle() {
      await writeModelPacks(path.resolve(outDir, 'models/packs'))
      await omitLoosePackedGlbs(path.resolve(outDir, 'models'))
    },
  }
}

export default defineConfig({
  // Relative base so GitHub Pages (/anatomy-3d/) and local preview both resolve assets.
  base: './',
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  plugins: [anatomyModelPacks()],
})
