import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Options from './options/main.vue'

Vue.use(ElementUI);

const app = new Vue({
  el: '#app',
  render(h) {
    return h(Options)
  }
})