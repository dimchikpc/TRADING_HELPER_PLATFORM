<template>
  <v-card
      class="mb-3 trading-data-card"
      outlined
  >
    <v-card-title class="px-0 pt-0 py-3">
      Trading Data
      <v-spacer />
      <v-chip class="trading-white--text trading-data-card__currency-switcher" label outlined @click="changeCurrency">
        <img :src="`img/icons/coins/color/${defaultSymbolInfo.base.toLowerCase()}.svg`" class="mr-2" height="20px" alt="">
        {{ defaultSymbolInfo.symbol }}
      </v-chip>
      <v-chip-group v-model="interval" v-on:change="getTradingData">
        <v-chip class="trading-white--text" label outlined v-for="i in intervals" :value="i" :key="i">
          {{ i }}
        </v-chip>
      </v-chip-group>
    </v-card-title>
    <v-divider />
    <v-row v-if="chartsData" class="mt-0">
      <v-col cols="12" md="3" v-for="(chart, i) in charts" :key="i">
        <TradingDataChart :data="chartsData[chart].series" :chartOptions="chartsData[chart].options" />
      </v-col>
    </v-row>
    <div v-else>
      <Loading active="true" />
    </div>
  </v-card>
</template>

<script>
import Loading from '@/components/ui/Loading'
import TradingDataChart from '@/components/TradingDataChart'
import { tradingDataIntervals } from '@/helpers/intervals'

export default {
  name: 'TradingData',
  components: { TradingDataChart, Loading },
  data: () => ({
    intervals: tradingDataIntervals,
    interval: '1d',
    charts: [
      'GET_OPEN_INTEREST_HIST',
      'GET_LONG_SHORT_ACCOUNT_RATIO',
      'GET_LONG_SHORT_POSITION_RATIO',
      'GET_GLOBAL_LONG_SHORT_ACCOUNT_RATIO',
      'GET_TAKER_LONG_SHORT_RATIO',
    ],
    chartsData: null
  }),
  watch: {
    async defaultSymbolInfo () {
      if (this.chartsData) await this.getTradingData()
    }
  },
  computed: {
    defaultSymbolInfo () {
      return this.$store.state.trades.defaultSymbolInfo
    },
  },
  async mounted () {
    await this.getTradingData()
  },
  methods: {
    async getTradingData () {
      this.chartsData = null
      const chartsData = {}

      for (let chart of this.charts) {
        const data = await this.$store.dispatch(`tradesFutures/${chart}`, {
          symbol: this.defaultSymbolInfo.symbol,
          period: this.interval
        })

        chartsData[chart] = {
          series: data.series,
          options: { title: { text: data.title }, xaxis: { type: 'datetime', categories: data.categories } }
        }
      }

      this.chartsData = chartsData
    },
    changeCurrency () {
      this.$store.commit('currencySwitcher/setSwitch', true)
    }
  }
}
</script>

<style scoped>

</style>