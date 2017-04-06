import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/pages/Home.vue'
import GarmentDetail from './components/pages/GarmentDetail.vue'

import * as mdc from 'material-components-web/dist/material-components-web'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/garment/:id', component: GarmentDetail, name:'garment-detail' }
  ]
});

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});

mdc.autoInit();
