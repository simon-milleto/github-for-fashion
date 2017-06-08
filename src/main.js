import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import * as mdc from 'material-components-web/dist/material-components-web';

import App from './App.vue';
import router from './router';

Vue.use(VueAnalytics, {
  id: 'UA-99008089-1',
  router,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
});

mdc.autoInit();
