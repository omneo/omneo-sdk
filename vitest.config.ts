import { defineConfig, loadEnv } from 'vite'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@omneo': path.resolve(__dirname, 'src/omneo'),
        '@id': path.resolve(__dirname, 'src/id'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@lib': path.resolve(__dirname, 'src/tests/lib')
      }
    },
    test: {
      env,
      testTimeout: 40000,
      // afterAll teardown fires a serial run of live DELETEs, which can exceed
      // the 10s default when the whole suite is running in parallel
      hookTimeout: 40000
    }
  }
})
