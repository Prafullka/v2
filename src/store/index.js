import Vue from 'vue'
import Vuex from 'vuex'

import {Store as products_module} from './products';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    main_products:[{name: 'a main store'}] // not visible once added module
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products_module
  }
})
