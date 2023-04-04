import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

export default defineConfig([
  {
    input: 'src/index.tsx',
    external: ['react', 'react-dom'],
    plugins: [
      typescript(),
      resolve({
        extensions: ['.tsx', '.ts', '.js'],
      }),
      babel({
        babelrc: false,
        exclude: '**/node_modules/**',
        presets: ['@babel/preset-react', '@babel/preset-env'],
        babelHelpers: 'bundled',
        plugins: [
          '@babel/plugin-transform-react-jsx',
          [
            '@babel/plugin-transform-runtime',
            {
              absoluteRuntime: false,
              corejs: false,
              helpers: false,
              regenerator: false,
              useESModules: false,
            },
          ],
        ],
      }),
      commonjs(),
    ],
    output: [
      {
        name: '@infras/ui',
        file: './dist/umd/infras-ui.js',
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        sourcemap: true,
      },
      {
        name: '@infras/ui',
        file: './dist/umd/infras-ui.min.js',
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        plugins: [terser()],
      },
      {
        name: '@infras/ui',
        file: './dist/es/index.js',
        format: 'es',
      },
      {
        name: '@infras/ui',
        file: './dist/lib/index.cjs',
        format: 'commonjs',
      },
    ],
  },
])
