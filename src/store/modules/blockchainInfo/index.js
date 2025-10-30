import { blockchainInfo } from '@/api/api'

const state = {
    addressesInfo: null,
}

const mutations = {
    setAddressesInfo (state, data) {
        state.addressesInfo = data
    }
}

const actions = {
    async getAddressesInfo ({ commit }, address) {
        const response = await blockchainInfo({
            cors: 'true',
            active: address
        })

        console.log('ss', JSON.stringify(response.data))

        commit('setAddressesInfo', response.data)
    }
}





export default {
    namespaced: true,
    state,
    mutations,
    actions,
}