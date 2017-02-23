import Vue from 'vue'
import App from './App.vue'
import * as mdc from 'material-components-web/dist/material-components-web';

new Vue({
  el: '#app',
  render: h => h(App)
});

mdc.autoInit();
