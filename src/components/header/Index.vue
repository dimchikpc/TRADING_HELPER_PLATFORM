<template>
  <div>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item exact>
          <v-list-item-action>
            <v-icon @click.stop="miniVariant = !miniVariant">
              mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Minimize menu
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout" router exact>
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app class="font-weight-medium">
      <div class="trading-toolbar-actions">
        <v-toolbar-title><Logo /></v-toolbar-title>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </div>

      <tickerList />
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TickerList from '@/components/header/TickerList'
import Logo from '@/components/Logo'

export default {
  name: 'Header',
  components: {
    TickerList,
    Logo,
  },
  data: () => ({
    clipped: true,
    drawer: false,
    items: [
      {
        icon: 'mdi-account-circle',
        title: 'Account',
        to: '/balances'
      },
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/'
      },
      {
        icon: 'mdi-chart-bar-stacked',
        title: 'Chart',
        to: '/chart'
      },
      {
        icon: 'mdi-bitcoin',
        title: 'Blockchain Wallets',
        to: '/stat/blockchain-info'
      }
    ],
    miniVariant: true,
    title: ''
  }),
  methods: {
    ...mapActions({
      authLogout: 'auth/logout',
    }),
    logout() {
      this.authLogout()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>

</style>