import Vue from 'vue';

// A la carte mode - See: https://vuetifyjs.com/en/features/treeshaking/#vuetify-loader
// Note: Treeshaking will only work with Webpack 4 in production mode. This is automatic when using Vue CLI.
import Vuetify from 'vuetify/lib';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

// export the config for use in Storybook
export const vuetifyConfig = {
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#2755FB',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
};

export default new Vuetify(vuetifyConfig);
