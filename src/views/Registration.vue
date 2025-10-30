<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center class="trading-auth">
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark class="auth-toolbar">
            <v-toolbar-title><Logo /></v-toolbar-title>
            <v-btn plain class="text-caption" to="/login">
              Log in
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-alert dense icon="mdi-alert-box-outline" class="trading-alert--error" v-if="error">
              {{ error }}
            </v-alert>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="submit">

                <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                  <v-text-field v-model="email" :error-messages="errors" label="E-mail" required></v-text-field>
                </validation-provider>

                <validation-provider v-slot="{ errors }" name="password" rules="required|min:10">
                  <v-text-field v-model="password" :error-messages="errors" label="Password" type="password" required></v-text-field>
                </validation-provider>

                <validation-provider v-slot="{ errors }" name="password-confirm" rules="required|confirmed:password">
                  <v-text-field v-model="confirmPassword" :error-messages="errors" label="Confirm password" type="password" required></v-text-field>
                </validation-provider>

                <div class="mt-5">
                  <v-btn class="mr-3" type="submit" :disabled="invalid" :loading="loading">
                    Sign up
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
import { required, email, min, confirmed } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import Logo from '@/components/Logo'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

extend('confirmed', {
  ...confirmed,
  message: 'The password confirmation does not match',
})

import { registration } from '@/api/api'
export default {
  name: 'Registration',
  components: {
    ValidationProvider,
    ValidationObserver,
    Logo,
  },
  data: () => ({
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    loading: false
  }),
  methods: {
    async submit () {
      this.loading = true
      this.error = ''
      const response = await registration({
        email: this.email,
        password: this.password
      }).catch(e => {
        this.error = e.response.data.message
      })
      this.loading = false
      if (response) {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="scss">

</style>