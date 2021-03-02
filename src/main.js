import Vue from 'vue';
import App from '@/App.vue';
import axios from 'axios';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount('#app');
