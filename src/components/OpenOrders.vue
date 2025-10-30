<template>
  <v-data-table
      :headers="headers"
      :items="openOrders"
      hide-default-footer
      class="open-orders-table"
  ></v-data-table>
</template>

<script>

export default {
  name: 'OpenOrders',
  data: () => ({
    headers: [
      { text: 'Date', align: 'start', value: 'time' },
      { text: 'Pair', value: 'symbol' },
      { text: 'Type', value: 'type' },
      { text: 'Side', value: 'side' },
      { text: 'Price', value: 'price' },
      { text: 'Amount', value: 'origQty' },
    ]
  }),
  computed: {
    openOrders () {
      return this.$store.state.openOrders.openOrders
    }
  },
  mounted () {
    this.$store.dispatch('openOrders/getOpenOrders')
  },
}
</script>

<style scoped>

</style>