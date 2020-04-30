import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { fb } from '@/firebase'
import apolloProvider from '@/apollo'

Vue.config.productionTip = false;

import 'material-design-icons-iconfont/dist/material-design-icons.css'

let app = ""

fb.auth().onAuthStateChanged(function() {
  if(!app) {
    new Vue({
      router,
      store,
      vuetify,
      apolloProvider,
      render: h => h(App)
    }).$mount("#app");  
  }
})