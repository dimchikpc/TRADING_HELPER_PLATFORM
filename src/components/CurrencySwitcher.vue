<template>
  <v-dialog v-model="show" max-width="600" transition="dialog-bottom-transition" class="currency-switcher">
    <v-card>
      <div class="currency-switcher__header">
        <v-chip-group v-model="selectedQuotes" multiple mandatory v-if="quotes">
          <v-chip filter outlined v-for="q in quotes.quotes" :value="q" :key="q">
            {{ q }}
          </v-chip>
        </v-chip-group>
        <v-divider></v-divider>
      </div>

      <v-list dense class="currency-switcher__list" v-if="quotes">
        <v-list-item-group color="primary">
          <template v-for="q in selectedQuotes">
            <v-list-item v-for="item in quotes.data[q]" :key="item.id" @click="switchCurrency(item)">
<!--              <v-list-item-icon>-->
<!--                <img :src="`img/icons/coins/color/${item.base.toLowerCase()}.svg`" alt="">-->
<!--              </v-list-item-icon>-->
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.base }} <span class="trading-grey--text text-caption">/{{ item.quote }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

    </v-card>
  </v-dialog>
</template>

<script>
import { groupCoinsByQuotes } from '@/helpers/helpers'

export default {
  name: 'CurrencySwitcher',
  data: () => ({
    selectedQuotes: ['USDT']
  }),
  computed: {
    show: {
      get () {
        return this.$store.state.currencySwitcher.show
      },
      set (val) {
        this.$store.commit('currencySwitcher/setSwitch', val)
      }
    },
    quotes () {
      return groupCoinsByQuotes(this.$store.state.allPairs)
    },
  },
  methods: {
    switchCurrency (symbolInfo) {
      this.$store.commit('trades/setDefaultSymbolInfo', symbolInfo)
      this.$store.dispatch('trades/getDefaultSymbolStream')
      this.show = false
    }
  }
}
</script>

<style>

</style>