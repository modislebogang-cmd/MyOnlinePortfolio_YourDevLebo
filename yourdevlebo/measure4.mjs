// measure4.mjs — what does loading the plugins themselves cost?
import { performance } from 'node:perf_hooks'

const t0 = performance.now()
const mark = (l) => console.log(`${l}: ${Math.round(performance.now() - t0)} ms`)

setTimeout(() => {
  mark('HARD TIMEOUT')
  process.exit(1)
}, 90000).unref()

mark('start')
const react = await import('@vitejs/plugin-react')
mark('import @vitejs/plugin-react')

const babel = await import('@rolldown/plugin-babel')
mark('import @rolldown/plugin-babel')

const p = react.default()
mark('call react()')
console.log('react plugin name:', p.name)

const b = babel.default({ presets: [react.reactCompilerPreset()] })
mark('call babel({ presets: [reactCompilerPreset()] })')
console.log('babel plugin name:', b.name)

process.exit(0)
