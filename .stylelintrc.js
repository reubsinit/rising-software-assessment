module.exports = {
  //
  // Requires:
  // * stylelint-config-prettier
  // * stylelint-prettier
  // added as dev dependencies.
  //
  // Following configures both in a single step.
  //
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-rational-order',
  ],
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
      },
    ],
  },
  ignoreFiles: ['**/*.{svg,png,gif,jpg,jpeg}'],
};
