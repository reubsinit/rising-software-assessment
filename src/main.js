import Vue from 'vue';
import App from '@/App.vue';
import axios from 'axios';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://dbtest1.risingsoftware.com/api/v3/';

new Vue({
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount('#app');
