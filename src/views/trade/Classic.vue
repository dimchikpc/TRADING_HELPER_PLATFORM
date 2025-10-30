<template>
  <v-row class="trade-section">
    <v-col>
      <v-btn-toggle v-model="selected" class="trade-section__action">
        <v-btn @click="side = 'BUY'" :class="[selected ? 'trading-darken1--background' : 'trading-green--background']">
          Buy
        </v-btn>
        <v-btn @click="side = 'SELL'" :class="[!selected ? 'trading-darken1--background' : 'trading-red--background']">
          Sell
        </v-btn>
      </v-btn-toggle>
      <div class="trade-section__action mt-5">
        <v-select :items="types" v-model="type" outlined />
      </div>
      <div class="trade-section__action mt-3">
        <v-text-field type="number" pattern="\d*" v-model="price" v-on:input="calc" placeholder="Price (USDT)" outlined/>
      </div>
      <div class="trade-section__action mt-3">
        <v-text-field type="number" pattern="\d*" v-model="quantity" v-on:input="calcTotal" placeholder="Amount (BTC)" outlined/>
      </div>
      <div class="trade-section__action mt-1">
        <v-slider
            v-model="proportion"
            :tick-labels="ticksLabels"
            min="0"
            max="100"
            step="25"
            ticks="always"
            tick-size="4"
            :color="selected ? 'trading-red--background' : 'trading-green--background'"
        ></v-slider>
      </div>
      <div class="trade-section__action mt-3">
        <v-text-field type="number" pattern="\d*" v-model="total" v-on:input="calcQuantity" placeholder="Total (USDT)" outlined/>
      </div>
      <div class="trade-section__available my-3">
        Avlb. 100$ {{ symbol }}
      </div>
      <div class="trade-section__action mt-3">
        <v-btn @click="submit" :class="[selected ? 'trading-red--background' : 'trading-green--background', 'trade-section__action-submit']">
          {{ side }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import BigNumber from 'bignumber.js'
import api from '@/apiBinance'
import addSnackbarMessage from '@/helpers/addSnackbarMessage'
export default {
  name: 'Classic',
  props: {
    symbol: {
      type: String,
      required: true
    }
  },
  data: () => ({
    selected: 0,
    side: 'BUY',
    type: 'Limit',
    price: '',
    quantity: '',
    total: '',
    proportion: 0,
    types: ['Market', 'Limit'],
    ticksLabels: [
      '0%',
      '25%',
      '50%',
      '75%',
      '100%',
    ],
  }),
  methods: {
    calcTotal () {
      const { price, quantity } = this
      if (price && quantity) {
        this.total = BigNumber(price).multipliedBy(quantity).toFixed(2)
      } else { this.total = '' }
    },
    calcQuantity () {
      const { price, total } = this
      if (price && total) this.quantity = BigNumber(total).div(price).toFixed(2)
    },
    calc () {
      this.calcTotal()
      this.calcQuantity()
    },
    reset () {
      this.price = ''
      this.quantity = ''
      this.total = ''
    },
    async submit () {
      const { symbol, type, side, price, quantity } = this

      await api.createOrder({
        type: type.toUpperCase(),
        timeInForce: 'GTC', // GTC (действует до отмены), IOC (немедленно или отменить), FOK (исполнить или отменить) TODO: timeInForce switcher
        symbol,
        side,
        quantity,
        price,
      }).catch(e => {
        if (e.response) {
          addSnackbarMessage(e.response.data.msg, { type: 'error' })
        }
      })

      this.reset()
    },
  }
}
</script>

<style scoped>

</style>