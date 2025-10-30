<template>
  <v-row>
    <v-col md="6">
      <loading :active="loading" />
      <v-data-table
          :headers="headers"
          :items="balances"
          :search="search"
          :items-per-page="12"
          class="elevation-1"
          v-if="!loading"
      >
        <template v-slot:top>
          <v-text-field
              v-model="search"
              label="Asset search"
              class="mx-4"
          ></v-text-field>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import api from '@/apiBinance'
import { sortBalances } from '@/helpers/helpers'
import Loading from '@/components/ui/Loading'

export default {
  name: 'Balances',
  components: {
    Loading
  },
  data: () => ({
    headers: [
      {
        text: 'Asset',
        align: 'start',
        sortable: false,
        value: 'asset',
      },
      { text: 'Free', value: 'free' },
      { text: 'Locked', value: 'locked' }
    ],
    balances: [],
    search: '',
    loading: false
  }),
  async mounted () {
    this.loading = true
    const account = await api.account()
    this.balances = sortBalances(account.data.balances)
    this.loading = false
  },
  methods: {}
}
</script>
