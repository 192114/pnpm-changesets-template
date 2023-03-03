import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
// rollup配置externals 会导致
// Uncaught TypeError: Failed to resolve module specifier "react". Relative references must start with either "/", "./", or "../".
import { viteExternalsPlugin } from 'vite-plugin-externals'
import { createHtmlPlugin } from 'vite-plugin-html'
import { version as reactV } from 'react'
import { version as reactDomV } from 'react-dom'

console.log(reactDomV, reactV)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    viteExternalsPlugin({
      react: 'React',
      'react-dom': 'ReactDOM',
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'demo',
          injectScript: [
            `<script crossorigin src="https://unpkg.zhimg.com/react@${reactV}/umd/react.${
              process.env.NODE_ENV === 'production' ? 'production.min' : 'development'
            }.js"></script>`,
            `<script crossorigin src="https://unpkg.zhimg.com/react-dom@${reactDomV}/umd/react-dom.${
              process.env.NODE_ENV === 'production' ? 'production.min' : 'development'
            }.js"></script>`,
          ].join('\n'),
        },
      },
    }),
  ],
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      // output: {
      //   manualChunks: {
      //     'react-vendor': ['react', 'react-dom', 'react-router-dom'],
      //   },
      // },
      // external: ['react', 'react-dom'],
      // output: {
      //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //   globals: {
      //     react: 'React',
      //     'react-dom': 'ReactDOM',
      //   },
      // },
    },
  },
})
