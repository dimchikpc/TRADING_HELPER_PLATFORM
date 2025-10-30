module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "/api/v3": {
        target: "https://api.binance.com"
      },
      "/sapi/v1": {
        target: "https://api.binance.com"
      },
      "/fapi/v1": {
        target: "https://fapi.binance.com"
      },
      "/futures/data": {
        target: "https://fapi.binance.com"
      },
      "/fapi/v2": {
        target: "https://fapi.binance.com"
      },
      "/auth": {
        target: "http://localhost:3000"
      },
      "/fng": {
        target: "https://api.alternative.me"
      },
      "/multiaddr": {
        target: "https://blockchain.info"
      },
    }
  },
  pwa: {
    themeColor: '#161a1e'
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/styles/breakpoints.scss";
          @import "~@/assets/styles/variables.scss";
        `
      },
    }
  }
}
