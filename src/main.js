// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import axios from 'axios'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueCookies)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

axios.interceptors.response.use(
  response => {
    if (response.data.code === 4001) {
      // catch unauthorized situation
      router.push({
        path: '/sso',
        query: {redirect: router.history.current.fullPath}
      })
      return Promise.reject(response.data)
    }
    return response
  }, error => {
    return Promise.reject(error.response.data)
  }
)
