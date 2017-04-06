import Vue from 'vue';
import * as mdc from 'material-components-web/dist/material-components-web';

import App from './App.vue';
import router from './router';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
});

mdc.autoInit();
