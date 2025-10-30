import BigNumber from 'bignumber.js'
import moment from 'moment'

export const priceDirection = (val, oldVal) => val > oldVal ? 'trading-green--text' : val < oldVal ? 'trading-red--text' : 'trading-white--text'
export const percentDirection = (val) => val > 0 ? 'trading-green--text' : val < 0 ? 'trading-red--text' : 'trading-white--text'
export const toFixed = (price, n = 2) => BigNumber(price).toFixed(n)
export const multipliedBy  = (price, n ) => BigNumber(price).multipliedBy(n).toFormat()
export const toFormat = (price) => {
    const n = (price + "").split(".")
    return n[0] > 0 ? BigNumber(price).toFormat(2) : BigNumber(price).toFormat()
}
export const toFormatN = (price, n) => BigNumber(price).toFormat(n)
export const percent = (val) => val > 0 ? `+${val}%` : val < 0 ? `${val}%` : `${val}%`
export const prependUSD = (price) => `$${price}`
export const withConversion = (price, conversion) => BigNumber(price).div(conversion).toNumber()
export const toDateTime = (time) => moment.unix(time).format('YYYY-MM-DD h:mm')
export const sliceLeft = (str, n) => n ? str.slice(0, n) : str
export const sliceRight = (str, n) => n ? str.slice(0, -n) : str