import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
// import postcss from 'rollup-plugin-postcss'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
// import typescript from 'rollup-plugin-typescript2'
import typescript from '@rollup/plugin-typescript'
import { babel } from '@rollup/plugin-babel'

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
        file: './dist/index.js',
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      {
        name: '@infras/ui',
        file: './es/index.js',
        format: 'es',
      },
      {
        name: '@infras/ui',
        file: './lib/index.cjs',
        format: 'commonjs',
      },
    ],
  },
])
