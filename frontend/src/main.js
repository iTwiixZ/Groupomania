import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSessionStorage from 'vue-sessionstorage'
import VueLocalStorage from 'vue-localstorage'
import './assets/custom.scss'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.use(VueLocalStorage)
Vue.use(VueSessionStorage)
Vue.use(Vuex)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
