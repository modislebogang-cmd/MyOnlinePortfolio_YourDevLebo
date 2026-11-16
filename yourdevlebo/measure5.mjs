// measure5.mjs — time each step of the real config file.
import { performance } from 'node:perf_hooks'

const t0 = performance.now()
const mark = (l) => console.log(`[cfg] ${l}: ${Math.round(performance.now() - t0)} ms`)

setTimeout(() => {
  mark('HARD TIMEOUT')
  process.exit(1)
}, 120000).unref()

const reactMod = await import('@vitejs/plugin-react')
mark('import @vitejs/plugin-react')

const babelMod = await import('@rolldown/plugin-babel')
mark('import @rolldown/plugin-babel')

const viteMod = await import('vite')
mark('import vite')

const react = reactMod.default
const babel = babelMod.default

mark('about to build presets')
const preset = reactMod.reactCompilerPreset()
mark('reactCompilerPreset()')

const babelPlugin = babel({ presets: [preset] })
mark('babel({presets})')

const plugins = [react(), babelPlugin]
mark('react() + array built')
console.log('plugin names:', plugins.flat().map((p) => p?.name ?? p))

const cfg = viteMod.defineConfig({ plugins })
mark('defineConfig')

const server = await viteMod.createServer({
  configFile: false,
  root: process.cwd(),
  config: cfg,
  logLevel: 'info',
})
mark('createServer')
await server.close()
mark('closed')
process.exit(0)
