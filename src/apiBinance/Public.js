const Public = {}

export default function (instance) {
    function getServerTime () {
        return instance({
            method: 'get',
            url: '/api/v3/time'
        })
    }

    Public.ping = () => instance({
        method: 'get',
        url: '/api/v3/ping'
    })

    Public.time = () => getServerTime()

    Public.klines = (symbol, interval) => {
        return instance({
            method: 'get',
            url: '/api/v3/klines',
            params: {
                symbol: symbol.toUpperCase(),
                interval
            }
        })
    }

    Public.depth = (symbol, limit) => {
        return instance({
            method: 'get',
            url: '/api/v3/depth',
            params: {
                symbol: symbol.toUpperCase(),
                limit
            }
        })
    }

    Public.currentPrice = (symbol) => {
        return instance({
            method: 'get',
            url: 'api/v3/ticker/price',
            params: {
                symbol: symbol.toUpperCase()
            }
        })
    }

    return Public
}
