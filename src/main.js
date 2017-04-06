import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

import * as mdc from 'material-components-web/dist/material-components-web'

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});

mdc.autoInit();
