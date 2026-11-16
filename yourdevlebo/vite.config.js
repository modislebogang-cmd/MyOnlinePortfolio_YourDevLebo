import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    rolldownOptions: {
      // The React Compiler plugin is slow on this project, so Rolldown prints
      // a ``[PLUGIN_TIMINGS] Your build is slower ...`` warning. It is only
      // informational — turn the check off so real errors stand out.
      checks: { pluginTimings: false },
    },
  },
})
