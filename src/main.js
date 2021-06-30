import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'
import modal from './plugins/ModalWindow'
import vuetify from './plugins/vuetify'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false
Vue.use(modal)
// Vue.use(Bar)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
new Vue({
  render: h => h(App),
  store,
  router,
  vuetify
}).$mount('#app')
