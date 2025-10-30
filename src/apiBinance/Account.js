import { generateSignature } from "@/helpers/helpers"

// const apiSecret = process.env.VUE_APP_API_SECRET
const apiSecret = localStorage.getItem('bSecret')
console.log('apiSecret', apiSecret)

const Account = {}

export default function (instance) {
    function getServerTime () {
        return instance({
            method: 'get',
            url: '/api/v3/time'
        })
    }

    async function signature (data = {}) {
        const serverTime = await getServerTime()
        return generateSignature(data, serverTime, apiSecret)
    }

    Account.allPairs = async (data = {}) => {
        return instance({
            method: 'get',
            url: '/sapi/v1/margin/allPairs' + await signature(data)
        })
    }

    Account.account = async (data = {}) => {
        return instance({
            method: 'get',
            url: '/api/v3/account' + await signature(data)
        })
    }

    Account.createOrder = async (data = {}) => {
        return instance({
            method: 'post',
            url: '/api/v3/order' + await signature(data)
        })
    }

    Account.openOrders = async (data = {}) => {
        return instance({
            method: 'get',
            url: '/api/v3/openOrders' + await signature(data)
        })
    }

    return Account
}