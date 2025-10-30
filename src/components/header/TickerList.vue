<template>
  <div class="contents">
    <div class="default-symbol-header pointer" @click="openCurrencySwitcher">
        <span>
          {{ defaultSymbolInfo.base }}<span class="trading-grey--text">/{{ defaultSymbolInfo.quote }}</span>
        </span>
    </div>
    <div class="ticker-list-container" v-if="dssk">
      <div class="my-2 mx-4 main-price pointer" @click="openCurrencySwitcher">
        <span :class="dssk.c | priceDirection(defaultSymbolLastPrice)">{{ dssk.c | toFormat }}</span>
        <div class="trading-white--text text-caption">
          ≈ {{ dssk.c | toFormat | prependUSD }}
          <strong class="mobile-percent-change text-caption font-weight-medium" :class="dssk.P | percentDirection">
            {{ dssk.P | toFormat | percent }}
          </strong>
        </div>
      </div>
      <div class="trades-info-header-section">
        <div class="my-2 mx-4">
          <span class="trading-darken--text text-caption ">24h Change</span>
          <div class="text-caption font-weight-medium" :class="dssk.P | percentDirection">
            {{ dssk.p | toFormat }}
            {{ dssk.P | toFixed(2) | percent }}
          </div>
        </div>
        <div class="my-2 mx-4">
          <span class="trading-darken--text text-caption ">24h High</span>
          <div class="text-caption font-weight-medium">
            {{ dssk.h | toFormat }}
          </div>
        </div>
        <div class="my-2 mx-4">
          <span class="trading-darken--text text-caption ">24h Low</span>
          <div class="text-caption font-weight-medium">
            {{ dssk.l | toFormat }}
          </div>
        </div>
        <div class="my-2 mx-4">
          <span class="trading-darken--text text-caption ">24h Vol({{ defaultSymbolInfo.base }})</span>
          <div class="text-caption font-weight-medium">
            {{ dssk.v | toFixed | toFormat }}
          </div>
        </div>
        <div class="my-2 mx-4">
          <span class="trading-darken--text text-caption ">24h Vol({{ defaultSymbolInfo.quote }})</span>
          <div class="text-caption font-weight-medium">
            {{ dssk.q | toFixed | toFormatN(0) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  priceDirection,
  percent,
  toFixed,
  prependUSD,
  percentDirection,
  toFormat,
  toFormatN
} from '@/helpers/filters'

export default {
  name: 'TickerList',
  filters: {
    priceDirection,
    percent,
    toFixed,
    prependUSD,
    percentDirection,
    toFormat,
    toFormatN
  },
  computed: {
    dssk () {
      return this.$store.state.trades.defaultSymbolStreamKlines
    },
    defaultSymbolInfo () {
      return this.$store.state.trades.defaultSymbolInfo
    },
    defaultSymbolLastPrice () {
      return this.$store.state.trades.defaultSymbolLastPrice
    }
  },
  methods: {
    openCurrencySwitcher () {
      this.$store.commit('currencySwitcher/setSwitch', true)
    },
  }
}
</script>