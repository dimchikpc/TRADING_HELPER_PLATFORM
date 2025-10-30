import Vue from 'vue'
import api from '@/apiBinance'
import {groupObjectPricesBy, ordersBookTickSizes} from '@/helpers/helpers'
const BASE_URL = process.env.VUE_APP_WS_BASE_URL

const state = {
    bids: {},
    asks: {},
    socket: null,
    currentPrice: null,
    groupByN: 0.01,
    ordersBookGroupSizes: []
}

const mutations = {
    setSocket(state, data) {
        Vue.set(state, 'socket', data)
    },
    setBids (state, data) {
        Vue.set(state, 'bids', data)
    },
    setAsks (state, data) {
        Vue.set(state, 'asks', data)
    },
    setCurrentPrice (state, data) {
        state.currentPrice = data
    },
    setGroupByN (state, data) {
        state.groupByN = data
    },
    setOrdersBookGroupSizes (state, data) {
        state.ordersBookGroupSizes = data
    },
}

const actions = {
    async getDepth({ state, commit }, data) {
        if(state.socket) state.socket.close()

        const symbol = data.symbol.toLowerCase()
        const currentPrice = await api.currentPrice(symbol)
        const ordersBookGroupSizes = ordersBookTickSizes(currentPrice.data.price)

        commit('setCurrentPrice', currentPrice.data)
        commit('setOrdersBookGroupSizes', ordersBookGroupSizes)
        commit('setGroupByN', ordersBookGroupSizes[0])

        let newU = false
        let firstTime = true
        let depth = {}
        let bufferB = {}
        let bufferA = {}
        let id = ''

        let socket = new WebSocket(`${BASE_URL}/ws/${symbol}@depth@1000ms`)
        commit('setSocket', socket)
        let n = 0;
        socket.onmessage = async function(event){
            const r = JSON.parse(event.data)
            if(firstTime) {
                depth = (await api.depth(symbol, '1000')).data
                id = depth.lastUpdateId
                bufferB = Object.fromEntries(depth.bids)
                bufferA = Object.fromEntries(depth.asks)
                firstTime = false
            }

            let updateDepth = () => {
                r.a.forEach(i => {
                    if(i[1] === '0.00000000') delete bufferA[i[0]]
                    else bufferA[i[0]] = i[1]
                })
                r.b.forEach(i => {
                    if(i[1] === '0.00000000') delete bufferB[i[0]]
                    else bufferB[i[0]] = i[1]
                })
            }

            if(!(r.u <= id)) {
                if(!newU && r.U <= id+1 && r.u >= id+1) {
                    newU = r.u
                    updateDepth()
                } else {
                    newU++
                    updateDepth()
                }
            }

            commit('setBids', groupObjectPricesBy(bufferB, state.groupByN, 'floor'))
            commit('setAsks', groupObjectPricesBy(bufferA, state.groupByN, 'ceil'))
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}