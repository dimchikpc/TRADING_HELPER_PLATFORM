<template>
  <div class="orders-book">
    <div class="d-flex justify-space-between">
      <div class="orders-book__book-actions">
        <v-btn @click="ordersGlass('all')" icon class="trading-white--text">
          <v-icon>mdi-arrow-expand-vertical</v-icon>
        </v-btn>
        <v-btn @click="ordersGlass('buy')" icon class="trading-green--text">
          <v-icon>mdi-arrow-top-left-bold-box</v-icon>
        </v-btn>
        <v-btn @click="ordersGlass('sell')" icon class="trading-red--text">
          <v-icon>mdi-arrow-bottom-right-bold-box</v-icon>
        </v-btn>
      </div>
      <div class="group-by--select">
        <v-select
            v-if="ordersBookGroupSizes.length"
            :items="ordersBookGroupSizes"
            v-model="groupByN"
            solo
        ></v-select>
      </div>
    </div>
    <div class="orders-book__wrapper">
      <div class="orders-book__title my-1">
        <v-row no-gutters>
          <v-col>Price</v-col>
          <v-col class="text-right">Amount</v-col>
          <v-col class="text-right">Total</v-col>
        </v-row>
      </div>
      <div class="orders-book__bids justify-space-between mt-2" v-if="hideAsks">
        <v-row v-for="(a, i) in asks" :key="i" no-gutters>
          <v-col class="price">
            {{ i }}
          </v-col>
          <v-col class="amount">
            {{ a | toFormat }}
          </v-col>
          <v-col class="total">
            {{ i | multipliedBy(a) }}
          </v-col>
          <div class="orders-book__overlay--red" :style="overlayLinePosition(a, asksMax)"/>
        </v-row>
      </div>
      <div class="orders-book__asks justify-space-between mt-3" v-if="hideBids">
        <v-row v-for="(b, i) in bids" :key="i" no-gutters>
          <v-col class="price">
            {{ i }}
          </v-col>
          <v-col class="amount">
            {{ b | toFormat }}
          </v-col>
          <v-col class="total">
            {{ i | multipliedBy(b) }}
          </v-col>
          <div class="orders-book__overlay--green" :style="overlayLinePosition(b, bidsMax)"/>
        </v-row>
      </div>
      <div ref="ordersBookBids" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { toFormat, toFixed, multipliedBy } from '@/helpers/filters'
import { sliceObj } from '@/helpers/helpers'
import { mobileWidth } from '@/helpers/const'
import BigNumber from 'bignumber.js'
export default {
  name: 'OrdersBook',
  props: {
    symbol: {
      required: true
    }
  },
  data: () => ({
    sliceCountBids: 12,
    sliceCountAsks: -12,
    hideBids: true,
    hideAsks: true,
    bidsMax: 0,
    asksMax: 0
  }),
  filters: {
    toFormat,
    toFixed,
    multipliedBy
  },
  watch: {
    symbol () {
      this.initConnection()
    }
  },
  computed: {
    bids () {
      const b = sliceObj(this.$store.state.ordersBook.bids, this.sliceCountBids)
      this.bidsMax = Math.max(...(Object.values(b)))
      return b
    },
    asks () {
      const a = sliceObj(this.$store.state.ordersBook.asks, this.sliceCountAsks)
      this.asksMax = Math.max(...(Object.values(a)))
      return a
    },
    ordersBookGroupSizes () {
      return this.$store.state.ordersBook.ordersBookGroupSizes
    },
    groupByN: {
      get () {
        return this.$store.state.ordersBook.groupByN
      },
      set (val) {
        this.$store.commit('ordersBook/setGroupByN', val)
      }
    }
  },
  mounted () {
    this.initConnection()

    if (window.innerWidth <= mobileWidth) {
      this.sliceCountBids = 9
      this.sliceCountAsks = -9
    }
  },
  methods: {
    ...mapActions({
      getDepth: 'ordersBook/getDepth',
    }),
    async initConnection () {
      await this.getDepth({
        symbol: this.symbol
      })
    },
    overlayLinePosition (current, max) {
      const val = `${100 - BigNumber(current).div(max).multipliedBy(100).toFixed()}%`
      return `left: ${val};`
    },
    ordersGlass(glass) {
      const w = window.innerWidth

      switch (glass) {
        case 'all':
          this.sliceCountBids = 12
          this.sliceCountAsks = -12
          if (w <= mobileWidth) {
            this.sliceCountBids = 9
            this.sliceCountAsks = -9
          }
          this.hideBids = true
          this.hideAsks = true
          break
        case 'buy':
          this.sliceCountBids = 50
          this.sliceCountAsks = 0
          if(w <= mobileWidth) {
            this.hideBids = true
            this.hideAsks = false
          }
          break
        case 'sell':
          this.sliceCountBids = 0
          this.sliceCountAsks = -50
          if(w <= mobileWidth) {
            this.hideBids = false
            this.hideAsks = true
          }
          break
      }
    }
  }
}
</script>

<style lang="scss">
.group-by--select {
  padding-top: 0!important;
  margin-top: 0!important;
  width: 150px;
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-text-field__details {
    display: none;
  }
  .v-select__slot {
    height: 36px;
    font-size: 14px;
  }
  .v-select__selections {
    direction: rtl;
  }
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot,
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0!important;
  }
  .v-input__control {
    min-height: inherit!important;
  }
  .v-text-field--solo > .v-input__control > .v-input__slot {
    background: transparent!important;
    box-shadow: none!important;
  }
  .v-text-field input {
    padding: 0!important;
  }
  .v-icon.v-icon {
    font-size: 20px;
  }
}
</style>