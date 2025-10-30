const state = {
    token: null,
    bSecret: null,
    bApiKey: null
}

const mutations = {
    setToken(state, token) {
        if (!localStorage.getItem('token')) {
            localStorage.setItem('token', token)
        }
        state.token = token
    },
    removeToken(state) {
        state.token = null
    },
    setBSecret(state, secret) {
        if (!localStorage.getItem('bSecret')) {
            localStorage.setItem('bSecret', secret)
        }
        state.bSecret = secret
    } ,
    setBApiKey(state, apiKey) {
        if (!localStorage.getItem('bApiKey')) {
            localStorage.setItem('bApiKey', apiKey)
        }
        state.bApiKey = apiKey
    }
}

const actions = {
    checkToken({ commit }) {
        const token = localStorage.getItem('token')
        const bSecret = localStorage.getItem('bSecret')
        const bApiKey = localStorage.getItem('bApiKey')

        if (token) { commit('setToken', token) }
        if (bSecret) { commit('setBSecret', bSecret) }
        if (bApiKey) { commit('setBApiKey', bApiKey) }
    },
    logout({ commit }) {
        localStorage.removeItem('token')
        localStorage.removeItem('bSecret')
        localStorage.removeItem('bApiKey')
        commit('removeToken')
    }
}

const getters = {
    isLoggedIn(state) {
        return !!state.token
    },
    checkBinanceSettings(state) {
        return !!(state.bSecret && state.bApiKey)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}