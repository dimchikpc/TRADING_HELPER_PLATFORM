import Vue from 'vue'
import api from '@/apiBinance'
import WS from '@/apiBinance/WS'
import throttle from 'lodash/throttle'

import formatKlinesDataArray from '@/helpers/dataFormatting/formatKlinesDataArray'
import formatKlinesDataObject from '@/helpers/dataFormatting/formatKlinesDataObject'
import wsKlinesChannels from '@/helpers/wsChannels/kline'

const BASE_URL = process.env.VUE_APP_WS_BASE_URL

const state = {
    chartData: { ohlcv: [] },
    defaultSymbolInfo: {
        base: 'BTC',
        quote: 'USDT',
        symbol: 'BTCUSDT'
    },
    defaultSymbolStreamKlines: null,
    chartDataStreamKlines: null,
    defaultSymbolStream: null,
    defaultSymbolLastPrice: 0
}

const getters = {}

const mutations = {
    updateChartData (state, payload) {
        let newChartData = state.chartData.ohlcv

        if ( Array.isArray(payload.data) ) {
            newChartData = formatKlinesDataArray(payload)
        } else {
            newChartData = formatKlinesDataObject(newChartData, payload)
        }

        Vue.set(state, 'chartData', { ohlcv: newChartData })
    },
    setChartDataStreamKlines (state, stream) {
        state.chartDataStreamKlines = stream
    },
    setDefaultSymbolStream (state, stream) {
        state.defaultSymbolStream = stream
    },
    updateDefaultSymbolStream (state, payload) {
        Vue.set(state, 'defaultSymbolStreamKlines', payload.data)
    },
    setDefaultSymbolInfo (state, payload) {
        Vue.set(state, 'defaultSymbolInfo', payload)
    }
}

const actions = {
    async getChartDataStream({ commit }, data) {
        const response = await api.klines(data.symbol, data.interval)
        const channels = wsKlinesChannels(data.symbol, data.interval)

        commit('updateChartData', response)
        console.log(`${BASE_URL}/stream?streams=${channels.join('/')}`)
        commit('setChartDataStreamKlines', WS(`${BASE_URL}/stream?streams=${channels.join('/')}`, {
            message: event => commit('updateChartData', JSON.parse(event.data))
        }))
    },
    getDefaultSymbolStream({ commit, state }) {
        const lastPriceUpdate = throttle((price) => {
            state.defaultSymbolLastPrice = price
        }, 2000)

        if(state.defaultSymbolStream) {
            state.defaultSymbolStream.close()
        }

        const symbol = state.defaultSymbolInfo.symbol.toLowerCase()
        const socket = WS(`${BASE_URL}/stream?streams=${symbol}@ticker`, {
            message: event => {
                const response = JSON.parse(event.data)
                commit('updateDefaultSymbolStream', response)
                lastPriceUpdate(response.data.c)
            }
        })
        commit('setDefaultSymbolStream', socket)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}