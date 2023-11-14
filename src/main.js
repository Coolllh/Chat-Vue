import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/permission'
import axiosInstance from './store/request.js'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$http = axios
Vue.config.productionTip = false
// axiosInstance.defaults.baseURL = 'http://localhost:8081'; // 后端端口为8081


Vue.use(ElementUI);

new Vue({
  router,
  store,
  axiosInstance,
  render: h => h(App)
}).$mount('#app')
