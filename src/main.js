import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios7 from 'axios'

Vue.prototype.axios = axios7;
Vue.config.productionTip = false


// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入公共的top
import top from "./views/top.vue"
// 引入公共的底部
import bottom from "./views/bottom.vue"
Vue.config.productionTip = false
// 声明
Vue.component("top",top);
Vue.component("bottom",bottom);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


axios7.interceptors.request.use(
  config => {
  
    console.log("abc");
    
return config;
  },
  err => {
      return Promise.reject(err)
  })

  //相应拦截
// http response 拦截器
axios7.interceptors.response.use(
  response => {
// console.log("adfjaslfjldksajfklsda");

      return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
      return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })
