<template>
  <div class="text-center" v-if="active">
    <v-btn class="ma-2 trading-green--text" plain large fab loading />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['active']
}
</script>

<style scoped>

</style>