// measure2.mjs — isolate which import/step is slow, with a hard timeout.
import { performance } from 'node:perf_hooks'

const t0 = performance.now()
const mark = (label) => console.log(`${label}: ${Math.round(performance.now() - t0)} ms`)

setTimeout(() => {
  mark('HARD TIMEOUT — something never finished')
  process.exit(0)
}, 45000).unref()

mark('start')
await import('vite')
mark('import vite')

await import('@vitejs/plugin-react')
mark('import @vitejs/plugin-react')

await import('@rolldown/plugin-babel')
mark('import @rolldown/plugin-babel')

mark('done imports')
process.exit(0)
