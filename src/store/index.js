import Vue from "vue";
import Vuex from "vuex";
import { fb } from '@/firebase'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false
  },
  mutations: {
    OPEN_DRAWER(state, drawer) {
      state.drawer = !drawer
    }
  },
  actions: {
    openDrawer({ commit }, drawer) {
      commit('OPEN_DRAWER', drawer)
    }
  },
  modules: {}
});
