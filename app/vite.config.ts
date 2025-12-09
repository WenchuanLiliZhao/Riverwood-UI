import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'library'

  if (isLibrary) {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/components/index.ts'),
          name: 'RiverwoodUI',
          fileName: (format) => `riverwood-ui.${format === 'es' ? 'js' : 'umd.js'}`,
          formats: ['es', 'umd'],
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'react/jsx-runtime',
            },
            assetFileNames: 'styles.css',
          },
        },
        cssCodeSplit: false,
        sourcemap: true,
        outDir: 'dist',
      },
    }
  }

  return {
    plugins: [react()],
  }
})
