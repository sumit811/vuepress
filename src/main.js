import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery'
import VueRouter from 'vue-router'
import Routes from './routes'
import Vuelidate from 'vuelidate'
import {store} from './store/store';

window.$ = window.jQuery = jQuery
import 'popper.js'
import 'bootstrap'
// import './assets/scss/app.scss'
// import 'bootstrap/dist/css/bootstrap.min.css';// but cannot use bootstrap variables
Vue.use(VueRouter);
Vue.use(Vuelidate);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  store: store,
  render: h => h(App),
  router: router
}).$mount('#app')

