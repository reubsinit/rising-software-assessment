module.exports = {
  root: true,
  env: {
    // This config is for front end projects operating in browsers
    browser: true,
    // For config modules
    node: true,
    // Todo: use recent versions of JS which will get transpiled by Babel
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/prettier',
    //
    // Requires:
    // * eslint-config-prettier
    // * eslint-prettier
    // added as dev dependencies.
    //
    // prettier/recommended configures both as a single step.
    //
    'plugin:prettier/recommended',
    'plugin:compat/recommended',
    'plugin:cypress/recommended',
  ],
  ignorePatterns: ['!/.storybook'],
  rules: {
    'no-console':
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger':
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
