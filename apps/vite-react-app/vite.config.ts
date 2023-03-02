import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
// import { version as reactV } from 'react'
// import { version as reactDomV } from 'react-dom'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
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
      external: ['react', 'react-dom'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
