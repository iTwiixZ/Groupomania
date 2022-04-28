import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSessionStorage from 'vue-sessionstorage'
import VueLocalStorage from 'vue-localstorage'
import './assets/custom.scss'



Vue.use(VueLocalStorage)
Vue.use(VueSessionStorage)
Vue.use(Vuex)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
