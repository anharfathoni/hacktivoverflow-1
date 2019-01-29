import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import wysiwyg from "vue-wysiwyg";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// var moment = require('moment');
// moment().startOf('day').fromNow(); 

// import moment from 'moment'
// import 'moment/locale/es'  // without this line it didn't work
// moment.locale('es')

import moment from 'moment'

Vue.prototype.moment = moment

Vue.use(wysiwyg, {});
Vue.use(BootstrapVue);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
