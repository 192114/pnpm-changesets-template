module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'never'],
  },
}
