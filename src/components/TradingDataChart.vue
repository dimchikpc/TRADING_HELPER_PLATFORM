<template>
  <div>
    <ApexCharts
        :series="data"
        :options="options"
        height="250"
    />
  </div>
</template>

<script>
import ApexCharts from 'vue-apexcharts'
import tradingDataDefaults from '@/helpers/defaults/tradingDataDefaults'

export default {
  name: 'TradingDataChart',
  props: {
    chartOptions: {
      type: Object,
      required: false,
    },
    data: {
      type: Array,
      required: true,
    }
  },
  components: {
    ApexCharts
  },
  computed: {
    options () {
      return tradingDataDefaults(this.chartOptions)
    }
  },
}
</script>

<style lang="scss">
.apexcharts-canvas {
  .apexcharts-tooltip {
    position: absolute;
    font-size: 12px;
    top: 30px !important;
    left: 0;
    width: 100%;
    color: red;
    border-radius: 0;
    box-shadow: none;

    ul {
      display: grid;
      grid-template-columns: 110px 110px 110px;
      grid-gap: 10px;
      list-style-type: none;

      li {
        align-self: center;
      }
    }
  }
  .apexcharts-legend {
    margin-top: 10px;
  }
}
</style>