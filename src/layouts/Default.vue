<template>
  <div>
    <Header />
    <v-main class="main-section">
      <v-container fluid>
        <router-view/>
      </v-container>

      <SnackbarMessage />
      <CurrencySwitcher />
    </v-main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '@/components/header/Index'
import SnackbarMessage from '@/components/ui/SnackbarMessage'
import CurrencySwitcher from '@/components/CurrencySwitcher'

export default {
  name: 'Default',
  components: {
    Header,
    SnackbarMessage,
    CurrencySwitcher,
  },
  async mounted () {
    await this.getAllPairs()
    const defaultf = {
      base:"BTC",
      quote:"USDT",
      symbol:"BTCUSDT"
    }
    this.$store.commit('trades/setDefaultSymbolInfo', defaultf)
    this.getDefaultSymbolStream()
  },
  methods: {
    ...mapActions({
      getAllPairs: 'getAllPairs',
      getDefaultSymbolStream: 'trades/getDefaultSymbolStream'
    }),
  }
}
</script>

<style scoped>

</style>