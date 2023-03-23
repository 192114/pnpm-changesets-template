import type { Options } from 'tsup'

export const tsup: Options = {
  name: 'vite-create',
  entry: ['src/index.ts'],
  outDir: './lib',
  format: 'esm',
  dts: false,
  clean: true,
  minify: false,
  sourcemap: true,
}
