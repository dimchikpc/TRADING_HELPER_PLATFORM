export default function loggedIn ({ next, store }){
    if(!store.getters['auth/checkBinanceSettings']){
        return next({
            name: 'Setup'
        })
    }
    return next()
}