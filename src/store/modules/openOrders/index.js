import binanceApi from '@/apiBinance'

const state = {
    openOrders: []
}

const mutations = {
    setOpenOrders (state, data) {
        state.openOrders = data
    }
}

const actions = {
    async getOpenOrders ({ commit }) {
        const data = (await binanceApi.openOrders()).data
        commit('setOpenOrders', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}