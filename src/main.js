import Vue from 'vue';
import App from '@/App.vue';
import axios from 'axios';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

// TODO: Move this into a vue env variable
axios.defaults.baseURL = 'https://dbtest1.risingsoftware.com/api/v3/';

new Vue({
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount('#app');
