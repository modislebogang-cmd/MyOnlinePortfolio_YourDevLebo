// measure.mjs — time each part of the config to find what makes startup slow.
import { performance } from 'node:perf_hooks'

const t0 = performance.now()
const mark = (label) => {
  console.log(`${label}: ${Math.round(performance.now() - t0)} ms`)
  return performance.now()
}

const vite = await import('vite')
mark('import vite')

await import('@vitejs/plugin-react')
mark('import @vitejs/plugin-react')

await import('@rolldown/plugin-babel')
mark('import @rolldown/plugin-babel')

const { reactCompilerPreset } = await import('@vitejs/plugin-react')
mark('reactCompilerPreset available')

await import('babel-plugin-react-compiler')
mark('import babel-plugin-react-compiler')

const server = await vite.createServer({
  configFile: false,
  root: process.cwd(),
  logLevel: 'silent',
  server: { middlewareMode: true, hmr: false },
})
mark('createServer (no plugins)')
await server.close()
mark('close')
