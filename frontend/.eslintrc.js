module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:prettier/recommended',
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    plugins: ['prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
}
