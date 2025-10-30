import { generateSignature } from '@/helpers/helpers'


const apiSecret = localStorage.getItem('bSecret')

const Futures = {}

export default function (instance) {
    const getServerTime = () => instance({
        method: 'get',
        url: '/api/v3/time'
    })

    async function sign (data = {}) {
        const serverTime = await getServerTime()
        return generateSignature(data, serverTime, apiSecret)
    }

    Futures.listenKey = async () => instance({
        method: 'post',
        url: '/fapi/v1/listenKey'
    })

    Futures.openOrders = async (data = {}) => instance({
        method: 'get',
        url: '/fapi/v1/openOrders' + await sign(data)
    })

    Futures.userTrades = async (data = {}) => instance({
        method: 'get',
        url: '/fapi/v1/userTrades' + await sign(data)
    })

    Futures.balance = async (data = {}) => instance({
        method: 'get',
        url: '/fapi/v2/balance' + await sign(data)
    })

    Futures.account = async (data = {}) => instance({
        method: 'get',
        url: '/fapi/v2/account' + await sign(data)
    })

    Futures.topLongShortAccountRatio = async (data = {}) => instance({
        method: 'get',
        url: '/futures/data/topLongShortAccountRatio' + await sign(data)
    })

    Futures.openInterestHist = async (data = {}) => instance({
        method: 'get',
        url: '/futures/data/openInterestHist' + await sign(data)
    })

    Futures.topLongShortPositionRatio = async (data = {}) => instance({
        method: 'get',
        url: '/futures/data/topLongShortPositionRatio' + await sign(data)
    })

    Futures.globalLongShortAccountRatio = async (data = {}) => instance({
        method: 'get',
        url: '/futures/data/globalLongShortAccountRatio' + await sign(data)
    })

    Futures.takerLongShortRatio = async (data = {}) => instance({
        method: 'get',
        url: '/futures/data/takerlongshortRatio' + await sign(data)
    })

    return Futures
}