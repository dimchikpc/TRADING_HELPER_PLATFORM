const state = {
    show: false
}

const mutations = {
    setSwitch (state, data) {
        return state.show = data
    }
}

export default {
    namespaced: true,
    state,
    mutations
}