import Vue from 'vue';

import * as mdc from 'material-components-web/dist/material-components-web';

<<<<<<< HEAD
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/garment/:user/:repo', component: GarmentDetail, name:'garment-detail', props: true }

  ]
});
=======
import App from './App.vue';
import router from './router';
>>>>>>> 11da4a3f4ac2e9d5b16e67b9208a3418cc044cf5

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
});

mdc.autoInit();
