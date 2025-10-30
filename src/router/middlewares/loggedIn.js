export default function loggedIn ({ next, store }){
    if(!store.getters['auth/isLoggedIn']){
        return next({
            name: 'Login'
        })
    }
    return next()
}