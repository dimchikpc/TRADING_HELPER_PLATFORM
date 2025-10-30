<template>
  <div class="blockchain-info" v-if="ai">
    <div class="blockchain-info__actions">
      <v-row>
        <v-col cols="12" md="6">
          <v-select
              :items="addresses"
              v-model="selectedAddress"
              item-value="address"
              v-on:change="getAddressesInfo"
              label="Select from favorites"
          >
            <template v-slot:selection="{ item, index }">
              <span><b>{{ item.name }}</b> - {{ item.address }}</span>
            </template>
            <template v-slot:item="{ item, index }">
              <span><b>{{ item.name }}</b> - {{ item.address }}</span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Or enter Bitcoin address here" v-model="findAddress" clearable>
            <template v-slot:append-outer>
              <v-btn outlined small :disabled="!findAddress" @click="getAddressesInfo">
                Find
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="blockchain-info__address-card" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                <div class="d-flex">
                  <div class="flex">Address</div>
                  <v-btn class="ml-1" :title="isInFavorites ? 'Remove from favorites' : 'Add to favorites'" icon small @click="addToFavorites">
                    <v-icon :class="{ 'trading-green--text': isInFavorites }">mdi-star</v-icon>
                  </v-btn>
                </div>
              </v-list-item-title>
              <v-list-item-subtitle>
                <code>{{ selectedAddress }}</code>
                <v-btn fab small plain width="24" height="24" @click="copyAddress(selectedAddress)">
                  <v-icon small class="pointer ml-1">mdi-content-copy</v-icon>
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-text>
            <div class="blockchain-info__wallet">
              <template v-for="w in walletList">
                <div>{{ w.title }}</div>
                <div class="font-weight-bold" :class="w.color">
                  {{ ai.wallet[w.key] | withConversion(ai.info.conversion) }}
                  <span class="font-weight-regular">{{ ai.info.symbol_btc.code }}</span>
                </div>
              </template>
            </div>
            <div v-if="qrCode" class="mt-5">
              <img :src="qrCode" alt="">
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="blockchain-info__transactions-wrapper" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Transactions <span class="text-caption">(Most recent)</span>
              </v-list-item-title>
              <v-list-item-subtitle v-text="" />
            </v-list-item-content>
          </v-list-item>
          <v-card-text>
            <v-expansion-panels accordion>
              <v-expansion-panel v-for="transaction in transactions" :key="transaction.hash">
                <v-expansion-panel-header class="blockchain-info__transaction-header">
                  <div class="text-caption">
                    <b>Hash: </b>
                    <code class="trading-grey--text">{{ transaction.hash | sliceLeft(sliceN) }}</code>
                    <v-btn fab small plain width="24" height="24" @click.stop="copyAddress(transaction.hash)">
                      <v-icon small class="pointer ml-1">mdi-content-copy</v-icon>
                    </v-btn>
                    <div>
                      <b>Time: </b> {{ transaction.time | toDateTime }}
                    </div>
                  </div>
                  <div class="text-right pr-3 blockchain-info__value">
                    <v-chip  class="ma-2" color="success" outlined>
                      +
                      <b>{{ transaction.result | withConversion(ai.info.conversion) }}</b>
                      {{ ai.info.symbol_btc.code }}
                    </v-chip>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-divider class="mb-3" />
                  <div class="blockchain-info__transaction-info blockchain-info__mobile-list">
                    <div class="blockchain-info__transaction-info">
                      <div v-for="input in transaction.inputs" class="blockchain-info__hash">
                        <div>
                          <code>{{ input.prev_out.addr | sliceLeft(26) }}</code>
                          <v-btn fab small plain width="24" height="24" @click.stop="copyAddress(input.prev_out.addr)">
                            <v-icon small class="pointer ml-1">mdi-content-copy</v-icon>
                          </v-btn>
                        </div>
                        <div class="pr-5 text-right">
                          {{ input.prev_out.value | withConversion(ai.info.conversion) | toFixed(8) }} {{ ai.info.symbol_btc.code }}
                        </div>
                      </div>
                    </div>
                    <div class="blockchain-info__transaction-info">
                      <div v-for="out in transaction.out" class="blockchain-info__hash">
                        <div class="pl-5">
                          <code>{{ out.addr | sliceLeft(26) }}</code>
                          <v-btn fab small plain width="24" height="24" @click.stop="copyAddress(out.addr)">
                            <v-icon small class="pointer ml-1">mdi-content-copy</v-icon>
                          </v-btn>
                        </div>
                        <div class="text-right">
                          {{ out.value | withConversion(ai.info.conversion) | toFixed(8) }} {{ ai.info.symbol_btc.code }}
                        </div>
                      </div>
                    </div>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="favoritesDialog" persistent max-width="360">
      <v-card>
        <v-card-title class="text-h5 trading-white--text">
          Add address to favorites
        </v-card-title>
        <v-card-text>
          <v-text-field
              label="Address name"
              :rules="[v => v.length >= 2 || 'Min 2 characters']"
          >
            <template v-slot:append-outer>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" class="blockchain-info__icon">mdi-information-outline</v-icon>
                </template>
                <span class="blockchain-info__tooltip-text">The name is needed for easy retrieval of the addresses you are tracking.</span>
              </v-tooltip>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="trading-grey--text" text @click="favoritesDialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="favoritesDialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'
import { toDateTime, withConversion, toFixed, sliceLeft } from '@/helpers/filters'
import { generateQR } from '@/helpers/helpers'
import addSnackbarMessage from '@/helpers/addSnackbarMessage'
import { mobileWidth } from '@/helpers/const'

export default {
  name: 'BlockchainInfo',
  filters: {
    withConversion,
    toDateTime,
    toFixed,
    sliceLeft,
  },
  data: () => ({
    sliceN: 0,
    favoritesDialog: false,
    qrCode: null,
    findAddress: '',
    walletList: [
      { key: 'total_received', title: 'Total Received:', color: 'success--text' },
      { key: 'total_sent', title: 'Total Sent:', color: 'error--text' },
      { key: 'final_balance', title: 'Final Balance:', color: 'trading-white--text' },
    ],
    addresses: [
      { name: 'Luna Foundation', address: 'bc1q9d4ywgfnd8h43da5tpcxcn6ajv590cg6d3tg6axemvljvt2k76zs50tv4q' },
      { name: 'Test 2', address: '34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo' },
      { name: 'Test 3', address: 'bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrpmv24sq90ecnvqqjwvw97' },
      { name: 'Test 4', address: '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ' },
      { name: 'Test 5', address: '3LYJfcfHPXYJreMsASk2jkn69LWEYKzexb' }
    ],
    selectedAddress: 'bc1q9d4ywgfnd8h43da5tpcxcn6ajv590cg6d3tg6axemvljvt2k76zs50tv4q'
  }),
  computed: {
    ai () {
      return this.$store.state.blockchainInfo.addressesInfo
    },
    transactions () {
      return this.ai.txs
    },
    isInFavorites () {
      return this.addresses.some(e => e.address === this.selectedAddress)
    }
  },
  async mounted () {
    await this.getAddressesInfo()

    if (window.innerWidth <= mobileWidth) {
      this.sliceN = 34
    }
  },
  methods: {
    async getAddressesInfo () {
      let selectedAddressSnapshot = this.selectedAddress
      if (this.findAddress) this.selectedAddress = this.findAddress

      await this.$store.dispatch('blockchainInfo/getAddressesInfo', this.selectedAddress)
          .catch(e => {
            if (e.response) {
              addSnackbarMessage(e.response.data.message, { type: 'error' })
            }
            this.selectedAddress = selectedAddressSnapshot
          })
      this.qrCode = await generateQR(this.selectedAddress)
      this.findAddress = ''
    },
    addToFavorites () {
      if(this.isInFavorites) { return } // TODO: Remove from favorites action here
      this.favoritesDialog = true
    },
    copyAddress(val) {
      copy(val)
      addSnackbarMessage('Copied to clipboard!', { type: 'info' })
    }
  }
}
</script>

<style scoped>

</style>