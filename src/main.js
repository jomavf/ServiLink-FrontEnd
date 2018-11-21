import Vue from 'vue'
import App from './App'
import { store } from './store/index'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import AlertCmp from './components/Shared/Alert'
import GoogleMapGetLocation from './components/Map/GoogleMapGetLocation'
import GoogleMapShare from './components/Map/GoogleMapShare'
import GoogleMapInfo from './components/Map/GoogleMapInfo'
import * as VueGoogleMaps from 'vue2-google-maps'
import * as firebase from 'firebase'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC56EPYt00AZJIRDU58YabyrWLh_CMvTSY',
    libraries: 'places'
  }
})

Vue.use(Vuetify, { theme: {
  primary: '#F44336',
  secondary: '#e57373',
  accent: '#9c27b0',
  error: '#f44336',
  warning: '#ffeb3b',
  info: '#2196f3',
  success: '#4caf50'
}})

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
Vue.component('GoogleMapGetLocation', GoogleMapGetLocation)
Vue.component('GoogleMapShare', GoogleMapShare)
Vue.component('GoogleMapInfo', GoogleMapInfo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAH6hrjuUTny1LKBhHnOP0O8yOHyHJMVmE',
      authDomain: 'servilink-222102.firebaseapp.com',
      databaseURL: 'https://servilink-222102.firebaseio.com',
      projectId: 'servilink-222102',
      storageBucket: 'servilink-222102.appspot.com'
    })
    this.$store.dispatch('loadServices')
    this.$store.dispatch('autoSignIn')
    this.$store.dispatch('getAccount')
  }
})
