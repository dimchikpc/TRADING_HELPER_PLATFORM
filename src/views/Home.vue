<template>
  <div>
    <TradingData />
    <FearGreedIndex />
  </div>
</template>

<script>
import api from '@/apiBinance'
import WS from '@/apiBinance/WS'
const FUTURE_URL = process.env.VUE_APP_WS_FUTURES_URL

import TradingData from '@/components/TradingData'
import FearGreedIndex from '@/components/FearGreedIndex'
import { news } from '@/api/api'

export default {
  name: 'Home',
  data: () => ({}),
  components: {
    TradingData,
    FearGreedIndex,
  },
  async mounted () {
    // this.options.xaxis.categories = data.categories

    //
    // const longAccount = res.reduce((acc, i) => {
    //   acc.push(i.longAccount)
    //   return acc
    // }, [])
    //
    // console.log(longAccount)



    // console.log((await api.futures.listenKey()).data)

    // const listenKey = (await api.futures.listenKey()).data.listenKey

    // console.log(`${FUTURE_URL}/ws/lunausdt@markPrice@1s?listenKey=${listenKey}`)

    // WS(`${FUTURE_URL}/ws/SUSHIUSDT@compositeIndex?listenKey=${listenKey}`, {
    //   message: event => {
    //     const response = JSON.parse(event.data)
    //     console.log('response:', response)
    //   },
    // })
    //
    // WS(`${FUTURE_URL}/ws/sushiusdt@forceOrder?listenKey=${listenKey}`, {
    //   message: event => {
    //     const response = JSON.parse(event.data)
    //     console.log('sushi:', response)
    //   },
    // })


  },
}
</script>
