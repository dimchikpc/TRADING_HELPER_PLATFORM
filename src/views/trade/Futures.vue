<template>
  <div>
    Futures page
    <v-data-table
        :headers="headers"
        :items="currentPositions"
        hide-default-header
        hide-default-footer
        class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: 'Futures',
  data: () => ({
    headers: [
      { text: 'Symbol', align: 'start', value: 'symbol', },
      { text: 'Size', value: 'notional' },
      { text: 'Entry Price', value: 'entryPrice' },
      { text: 'Mark Price', value: '' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ]
  }),
  computed: {
    currentPositions () {
      return this.$store.state.tradesFutures.currentPositions
    }
  },
  async mounted () {
    await this.$store.dispatch('tradesFutures/GET_ACCOUNT_INFO')
  },
}
</script>

<style scoped>

</style>