const path = require('path');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    config.plugins.push(new VuetifyLoaderPlugin());
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      loader: ['style-loader', 'css-loader', 'sass-loader'],
    });
    config.resolve.extensions.push(
      ...['.css', '.less', '.scss', '.sass', '.html']
    );
    config.resolve.alias['@'] = path.resolve(__dirname, '../src/');
    return config;
  },
};
