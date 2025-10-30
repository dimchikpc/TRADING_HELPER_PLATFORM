import axios from 'axios'

const baseURL = process.env.VUE_APP_CM_API_URL

const instance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

instance.interceptors.response.use(response => ({
    status: response.status,
    statusText: response.statusText,
    data: response.data
}))

export const registration = (data) => instance({
    method: 'post',
    url: '/auth/registration',
    data
})

export const login = (data) => instance({
    method: 'post',
    url: '/auth/login',
    data
})

export const fearGreedIndex = (data = {}) => instance({
    method: 'get',
    url: '/fng/',
    params: data
})

export const blockchainInfo = (data) => instance({
    method: 'get',
    url: '/multiaddr',
    params: data
})
