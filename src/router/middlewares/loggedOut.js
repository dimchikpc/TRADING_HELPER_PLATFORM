export default function loggedOut ({ next, store }){
    if(store.getters['auth/isLoggedIn']){
        return next({
            name: 'Home'
        })
    }

    return next()
}