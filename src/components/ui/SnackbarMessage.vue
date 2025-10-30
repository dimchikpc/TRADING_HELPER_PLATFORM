<template>
  <v-snackbar
      v-model="snackbar"
      multi-line
      top
      class="sb"
  >
    <v-icon class="sb-icon trading-grey--text" v-if="type === 'info'">mdi-information</v-icon>
    <v-icon class="sb-icon trading-red--text" v-if="type === 'error'">mdi-alert-circle</v-icon>
    <v-icon class="sb-icon trading-green--text" v-if="type === 'success'">mdi-check-circle</v-icon>

    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackbarMessage',
  computed: {
    snackbar: {
      set (show) {
        this.$store.commit('snackbar/addSnackbar', { show })
      },
      get () {
        return this.$store.state.snackbar.showSnackbar
      }
    },
    message () {
      return this.$store.state.snackbar.snackbarMessage
    },
    type () {
      return this.$store.state.snackbar.options.type
    },
  }
}
</script>

<style lang="scss">
  .sb {
    .v-snack__content {
      display: flex;
      align-items: center;
    }
    .v-snack__btn {
      min-width: 36px!important;
      width: 36px;
      margin-left: 12px;
      opacity: 0.5;
    }
    &-icon {
      padding-right: 12px;
    }
  }
</style>