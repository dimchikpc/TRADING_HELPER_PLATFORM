<template>
  <div>
    <ApexCharts type="donut" :height="height" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import ApexCharts from 'vue-apexcharts'

export default {
  name: 'FearGreedIndexChart',
  props: {
    series: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      default: '370'
    }
  },
  components: {
    ApexCharts,
  },
  data: () => ({
    chartOptions: {
      chart: {
        type: 'donut',
      },
      legend: {
        show: false,
      },
      colors: ['#0ecb81', '#f6465d'],
      stroke: {
        show: false,
      },
      toolbar: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          startAngle: 180,
          endAngle: 360,
        },
      },
    }
  })
}
</script>

<style>
.apexcharts-tooltip-title {
  display: none;
}
</style>