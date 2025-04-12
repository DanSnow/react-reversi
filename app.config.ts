import { defineConfig } from '@tanstack/react-start/config'
import Sonda from 'sonda/vite'
import Icons from 'unplugin-icons/vite'
import Inspect from 'vite-plugin-inspect'
import TsConfigPath from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    preset: 'github-pages',
  },
  react: {
    babel: {
      plugins: ['jotai/babel/plugin-react-refresh', 'jotai/babel/plugin-debug-label', 'babel-plugin-react-compiler'],
    },
  },
  vite: {
    plugins: [
      Sonda(),
      Inspect({ open: true }),
      TsConfigPath(),
      Icons({
        compiler: 'jsx',
        jsx: 'react',
      }),
    ],
  },
})
