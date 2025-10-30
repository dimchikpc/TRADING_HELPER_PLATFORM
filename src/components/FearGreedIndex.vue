<template>
  <v-card
      class="mb-3 trading-data-card"
      outlined
  >
    <v-card-title class="px-0 pt-0 py-3">
      Fear & Greed Index
    </v-card-title>
    <v-divider />
    <v-row v-if="fearGreedIndexCurrent" class="mt-0">
      <v-col cols="12" md="3" class="fearGreedIndexChart-wrapper">
        <div class="fearGreedIndexChart__classification">
          Now: <span :class="fearGreedIndexCurrentColor">Fear</span>
        </div>
        <div class="fearGreedIndexChart__value">
          {{ fearGreedIndexCurrent.value }}
        </div>
        <FearGreedIndexChart :series="fearGreedIndexCurrentSeries" class="fearGreedIndexChart" />
      </v-col>
      <v-col cols="12" md="9">
        <TradingDataChart :data="fearGreedIndexSeries.series" :chartOptions="fearGreedIndexSeries.options" />
      </v-col>
    </v-row>
    <div v-else>
      <Loading active="true" />
    </div>
  </v-card>
</template>

<script>
import Loading from '@/components/ui/Loading'
import FearGreedIndexChart from '@/components/FearGreedIndexChart'
import TradingDataChart from '@/components/TradingDataChart'

export default {
  name: 'FearGreedIndex',
  components: {
    Loading,
    FearGreedIndexChart,
    TradingDataChart,
  },
  data: () => ({}),
  watch: {},
  computed: {
    fearGreedIndexCurrent () {
      return this.$store.state.fearGreedIndex.fearGreedIndexCurrent
    },
    fearGreedIndexCurrentColor () {
      const v = this.fearGreedIndexCurrent.value
      return v <= 33 ? 'trading-red--text'
          : (v > 33 && v < 66) ? 'trading-yellow--text'
          : 'trading-green--text'
    },
    fearGreedIndexCurrentSeries () {
      return this.$store.state.fearGreedIndex.fearGreedIndexCurrentSeries
    },
    fearGreedIndexSeries () {
      return this.$store.state.fearGreedIndex.fearGreedIndexSeries
    },
  },
  async mounted () {
    await this.$store.dispatch('fearGreedIndex/getFearGreedIndexes')
  },
  methods: {}
}
</script>

<style scoped>

</style>