module.exports = {
  ...require('@infras/config/eslintconfig/eslint-node-ts.cjs'),
  ignorePatterns: ["bin/*.js"],
  overrides: [
    {
      files: ['*.ts', '*.js'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json'],
      },
      rules: {},
    },
  ],
}
