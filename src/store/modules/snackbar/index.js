const state = {
    showSnackbar: false,
    snackbarMessage: '',
    options: {
        type: 'info'
    }
}

const mutations = {
    addSnackbar (state, data) {
        state.showSnackbar = data.show
        state.snackbarMessage = data.message
        if (data.options) state.options = { ...state.options, ...data.options }
    },
}

export default {
    namespaced: true,
    state,
    mutations
}