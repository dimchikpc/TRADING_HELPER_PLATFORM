import api from '@/apiBinance'
import { filterPositiveValues, reduceByKey } from '@/helpers/helpers'

const state = {
    accountInfo: null,
    currentPositions: null
}

const mutations = {
    setAccountInfo (state, data) {
        state.accountInfo = data
    },
    setCurrentPositions (state, data) {
        state.currentPositions = data
    }
}

const actions = {
    async GET_ACCOUNT_INFO ({ commit }) {
        const data = (await api.futures.account()).data
        const currentPositions = filterPositiveValues(data.positions, 'entryPrice')

        commit('setAccountInfo', data)
        commit('setCurrentPositions', currentPositions)
    },
    async GET_LONG_SHORT_ACCOUNT_RATIO ({ commit }, payload) {
        const data = (await api.futures.topLongShortAccountRatio( payload )).data
        const categories = reduceByKey(data, 'timestamp')

        return {
            title: 'Long/Short Ratio(Accounts)',
            categories,
            series: [
                { name: 'LongShortRatio', data: reduceByKey(data, 'longShortRatio') },
                { name: 'LongAccount', data: reduceByKey(data, 'longAccount') },
                { name: 'ShortAccount', data: reduceByKey(data, 'shortAccount') },
            ]
        }
    },
    async GET_OPEN_INTEREST_HIST ({ commit }, payload) {
        const data = (await api.futures.openInterestHist( payload )).data
        const categories = reduceByKey(data, 'timestamp')

        return {
            title: 'Open Interest',
            categories,
            series: [
                { name: 'SumOpenInterest', data: reduceByKey(data, 'sumOpenInterest') },
                { name: 'SumOpenInterestValue', data: reduceByKey(data, 'sumOpenInterestValue') },
            ]
        }
    },
    async GET_LONG_SHORT_POSITION_RATIO ({ commit }, payload) {
        const data = (await api.futures.topLongShortPositionRatio( payload )).data

        const longAccount = reduceByKey(data, 'longAccount')
        const shortAccount = reduceByKey(data, 'shortAccount')
        const longShortRatio = reduceByKey(data, 'longShortRatio')

        const categories = reduceByKey(data, 'timestamp')

        return {
            title: 'Long/Short Ratio(Positions)',
            categories,
            series: [
                { name: 'LongShortRatio', data: longShortRatio },
                { name: 'LongAccount', data: longAccount },
                { name: 'ShortAccount', data: shortAccount },
            ]
        }
    },
    async GET_GLOBAL_LONG_SHORT_ACCOUNT_RATIO ({ commit }, payload) {
        const data = (await api.futures.globalLongShortAccountRatio( payload )).data
        const categories = reduceByKey(data, 'timestamp')

        return {
            title: 'Long/Short Ratio(Global)',
            categories,
            series: [
                { name: 'LongShortRatio', data: reduceByKey(data, 'longShortRatio') },
                { name: 'LongAccount', data: reduceByKey(data, 'longAccount') },
                { name: 'ShortAccount', data: reduceByKey(data, 'shortAccount') },
            ]
        }
    },
    async GET_TAKER_LONG_SHORT_RATIO ({ commit }, payload) {
        const data = (await api.futures.takerLongShortRatio( payload )).data
        const categories = reduceByKey(data, 'timestamp')

        return {
            title: 'Taker Buy/Sell Volume',
            categories,
            series: [
                { name: 'BuySellRatio', data: reduceByKey(data, 'buySellRatio') },
                { name: 'BuyVol', data: reduceByKey(data, 'buyVol') },
                { name: 'SellVol', data: reduceByKey(data, 'sellVol') },
            ]
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}