<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center class="trading-auth">
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark class="auth-toolbar">
            <v-toolbar-title><Logo /></v-toolbar-title>
            <v-btn plain class="text-caption">
              Setup account
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-alert dense icon="mdi-alert-box-outline" class="trading-alert--error" v-if="error">
              {{ error }}
            </v-alert>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="submit">

                <validation-provider v-slot="{ errors }" name="Secret" rules="required|min:10">
                  <v-text-field v-model="secret" :error-messages="errors" label="Binance Secret" required></v-text-field>
                </validation-provider>

                <validation-provider v-slot="{ errors }" name="API Key" rules="required|min:10">
                  <v-text-field v-model="apiKey" :error-messages="errors" label="Binance API Key" required></v-text-field>
                </validation-provider>

                <div class="mt-5">
                  <v-btn class="mr-3" type="submit" :disabled="invalid" :loading="loading">
                    save
                  </v-btn>
                </div>
              </form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import { required, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import Logo from '@/components/Logo'

setInteractionMode('lazy')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
})

export default {
  name: 'BinanceSettings',
  components: {
    ValidationProvider,
    ValidationObserver,
    Logo,
  },
  data: () => ({
    secret: '',
    apiKey: '',
    error: '',
    loading: false
  }),
  methods: {
    ...mapMutations({
      setBSecret: 'auth/setBSecret',
      setBApiKey: 'auth/setBApiKey'
    }),
    submit() {
      this.setBSecret(this.secret)
      this.setBApiKey(this.apiKey)

      location.href = '/'
    }
  }
}
</script>

<style scoped>

</style>