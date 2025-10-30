<template>
  <div class="trading-dark">
    <v-app dark>
      <component :is="layout">
        <router-view />
      </component>
    </v-app>
  </div>
</template>

<script>
import Default from '@/layouts/Default'
import Auth from '@/layouts/Auth'

const default_layout = 'auth'

export default {
  name: 'App',
  components: {
    'default-layout': Default,
    'auth-layout': Auth
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    }
  },
  mounted () {
    this.$store.dispatch('auth/checkToken')
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/themes/dark.scss';
</style>