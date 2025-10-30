import { fearGreedIndex } from '@/api/api'
import { reduceByKey } from '@/helpers/helpers'

const state = {
    fearGreedIndexCurrent: null,
    fearGreedIndexCurrentSeries: null,
    fearGreedIndexSeries: [],
}

const mutations = {
    setFearGreedIndexCurrent (state, data) {
        state.fearGreedIndexCurrent = data
    },
    setFearGreedIndexCurrentSeries (state, data) {
        state.fearGreedIndexCurrentSeries = data
    },
    setFearGreedSeries (state, data) {
        state.fearGreedIndexSeries = data
    }
}

const actions = {
    async getFearGreedIndexes ({ commit }) {
        const indexes = (await fearGreedIndex({ limit: 100, date_format: 'us' })).data
        const fearGreedIndexCurrentSeries = [ parseInt(indexes.data[0].value), 100 - indexes.data[0].value ]

        const chartsData = {
            series: [{
                name: 'Crypto Fear & Greed Index',
                data: reduceByKey(indexes.data, 'value'),
            }],
            options: { title: { text: 'Crypto Fear & Greed Index Over Time' }, xaxis: { type: 'datetime', categories: reduceByKey(indexes.data, 'timestamp') } }
        }

        commit('setFearGreedIndexCurrent', indexes.data[0])
        commit('setFearGreedIndexCurrentSeries', fearGreedIndexCurrentSeries)
        commit('setFearGreedSeries', chartsData)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}