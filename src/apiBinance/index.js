import axios from 'axios'
import Public from '@/apiBinance/Public'
import Account from '@/apiBinance/Account'
import Futures from '@/apiBinance/Futures'

const baseURL = process.env.VUE_APP_BASE_API_URL
const apiKey = localStorage.getItem('bApiKey')

const instance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-MBX-APIKEY': apiKey
    },
})

instance.interceptors.response.use(response => ({
    status: response.status,
    statusText: response.statusText,
    data: response.data
}))

const Api = {
    ...Public(instance),
    ...Account(instance),
    futures: { ...Futures(instance), },
}

export default Api