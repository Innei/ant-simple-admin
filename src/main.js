import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/ant-design-vue.js'
import http from './plugins/http'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$server = axios.create({
  baseURL: 'http://localhost:8001/api'
})
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
