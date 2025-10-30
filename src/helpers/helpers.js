import crypto from 'crypto'
import BigNumber from 'bignumber.js'
import QRCode from 'qrcode'

export function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
        return { 'Authorization': 'Bearer ' + token }
    } else {
        return {}
    }
}

export const makeQueryString = q =>
    q ? `?${Object.keys(q).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(q[k])}`).join('&')}`
        : ''

export const generateSignature =  (data = {}, serverTime, apiSecret) => {
    const timestamp = serverTime.data.serverTime
    const signature = crypto
        .createHmac('sha256', apiSecret)
        .update(makeQueryString({ ...data, timestamp }).substr(1))
        .digest('hex')

    return makeQueryString({ ...data, timestamp, signature })
}

export const removeAlias = (str) => str.substring(0, str.indexOf("@"))

export const sortKeys = (obj, desc) => {
    const keys = Object.keys(obj)
    keys.sort((a, b) => { const d = +a - +b; return desc? -d : d; })
    const res = {}
    keys.forEach(i => {
        res[i+' '] = obj[i]
    })
    return res
}

export const sliceObj =  (obj, count) => {
    if(count === 0) return {}
    if(count > 0) {
        return Object.keys(obj).slice(0, count).reduce((result, key) => {
            result[key] = obj[key]
            return result
        }, {})
    }
    return Object.keys(obj).slice(count).reduce((result, key) => {
        result[key] = obj[key]
        return result
    }, {})
}

export const sortBalances = (arr) => arr.sort((a,b) => (a.free > b.free) ? -1 : ((b.free > a.free) ? 1 : 0))

export const getDecimalsCount = (n) => (n + '').split(".")[1].length

export const filterPositiveValues = (val, key) => val.filter(i => parseInt(i[key]))

export const reduceByKey = (arr, key) => arr.reduce((acc, i) => {
    // acc.push(BigNumber(i[key]).toNumber())
    acc.push(i[key])
    return acc
}, [])

export const groupObjectPricesBy = (obj, n, method = 'ceil') => {
    let r = {}
    const keys = Object.keys(obj)
    keys.forEach(function(x) {
        const y = Math[method](x * (1 / n)) / (1 / n)
        r[y] = BigNumber((r[y] || 0)).plus(obj[x]).toNumber()
    })
    return sortKeys(r, true)
}

function bn(n) {
    return BigNumber(n)
}
export const ordersBookTickSizes = (p) => {
    let price = bn(p).toNumber()
    const fmt = {
        decimalSeparator: '',
        groupSeparator: '',
    }
    if(bn(price).isInteger()) price = bn(price).toFixed(2)

    let res = []

    const s = (price + "").split(".")
    const int = bn(s[0]).toNumber()
    const decimals = s[1].length

    const fullDeep = bn(price).toFormat(fmt).length
    const decimalDeep = bn(s[1]).toFormat(fmt).length
    const startPrice = bn((0).toFixed(decimals-1)+'1').toNumber()

    const limit = int === 0 ? decimalDeep-2 : fullDeep-2

    res.push(startPrice)
    for (let i = 0; i <= limit; i++) {
        if(res[i] >= 100) {
            res.splice(-1, 0, 50)
            break
        }
        res.push(bn(res[i]).multipliedBy(10).toNumber())
    }
    return res
}

export const groupCoinsByQuotes = (coins) => {
    const data = coins.reduce((r, a) => {
            r[a.quote] = r[a.quote] || []
            r[a.quote].push(a)
            return r
        }, Object.create(null))
    const quotes = Object.keys(data)

    return {
        data,
        quotes
    }
}

export const generateQR = async text => await QRCode.toDataURL(text).catch(e => console.error(e))
