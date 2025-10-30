<template>
  <v-row>
    <v-col lg="6" sm="12">
      <v-row class="chart-data-selector">
        <v-col class="py-0">
          <v-autocomplete
              :items="allPairs"
              item-text="symbol"
              v-model="symbol"
              v-on:change="refreshData"
          ></v-autocomplete>
        </v-col>
        <v-col class="py-0">
          <v-select
              :items="intervals"
              v-model="interval"
              v-on:change="refreshData"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="middle-div py-0" ref="tradingChartWrapper">
          <trading-vue
              ref="tradingVue"
              :title-txt="symbol"
              :width="width"
              :height="height"
              :data="chartData"
              :chart-config="config"
              :color-back="color"
          ></trading-vue>
        </v-col>
      </v-row>
    </v-col>
    <v-col class="order-book__section" cols="5" sm="5" lg="3">
      <OrdersBook :symbol="symbol" />
    </v-col>
    <v-col cols="7" sm="7" lg="3">
      <TradeClassic :symbol="symbol" />
    </v-col>
    <v-col cols="12">
      <OpenOrders />
    </v-col>
  </v-row>
</template>

<script>
import TradingVue from 'trading-vue-js'
import OrdersBook from '@/components/OrdersBook'
import OpenOrders from '@/components/OpenOrders'
import TradeClassic from '@/views/trade/Classic'
import intervals from '@/helpers/intervals'
import { mapActions, mapState } from 'vuex'
import throttle from 'lodash/throttle'
import { mobileWidth } from '@/helpers/const'

export default {
  name: 'Chart',
  components: {
    TradingVue,
    OrdersBook,
    TradeClassic,
    OpenOrders
  },
  data: () => ({
    symbol: 'BTCUSDT',
    intervals: intervals,
    interval: '1d',
    config: {
      VOLSCALE: 0.5
    },
    color: '#191b20',
    width: 1000,
    height: 500,
  }),
  computed: {
    ...mapState({
      allPairs: state => state.allPairs,
      chartData: state => state.trades.chartData,
      chartDataStreamKlines: state => state.trades.chartDataStreamKlines
    })
  },
  mounted () {
    this.refreshData()
    this.chartResize()
    window.addEventListener("resize", throttle(this.chartResize, 500))

    if (window.innerWidth <= mobileWidth) {
      this.height = 300
    }
  },
  methods: {
    ...mapActions({
      getChartDataStream: 'trades/getChartDataStream'
    }),
    async refreshData () {
      if(this.chartDataStreamKlines) this.closeStream()

      await this.getChartDataStream({
        symbol: this.symbol,
        interval: this.interval
      })

      this.$refs.tradingVue.resetChart()
    },
    chartResize () {
      if(this.$refs.tradingChartWrapper){
        this.width = this.$refs.tradingChartWrapper.clientWidth - 24
      }
    },
    closeStream () {
      this.chartDataStreamKlines.close()
    },
  },
  beforeDestroy() {
    this.closeStream()
    window.removeEventListener("resize", this.chartResize)
  }
}
</script>

<style lang="scss">
.trading-vue-legend {
  z-index: 1;
}
</style>