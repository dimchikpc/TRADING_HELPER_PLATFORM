import store from '@/store'
export default (message, options) => {
    store.commit('snackbar/addSnackbar', {
        show: true,
        message,
        options
    })
}