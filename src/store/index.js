import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import trades from './modules/trade/classic'
import tradesFutures from './modules/trade/futures'
import ordersBook from './modules/ordersBook'
import snackbar from './modules/snackbar'
import currencySwitcher from './modules/currencySwitcher'
import openOrders from './modules/openOrders'
import fearGreedIndex from './modules/trade/fearGreedIndex'
import blockchainInfo from './modules/blockchainInfo'
import api from "@/apiBinance"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allPairs: [],
  },
  mutations: {
    setAllPairs (state, payload) {
      state.allPairs = payload.data
    },
  },
  actions: {
    async getAllPairs({ commit }) {
      const response = await api.allPairs()
      commit('setAllPairs', response)
    }
  },
  modules: {
    auth,
    trades,
    tradesFutures,
    snackbar,
    ordersBook,
    currencySwitcher,
    openOrders,
    fearGreedIndex,
    blockchainInfo,
  }
})
