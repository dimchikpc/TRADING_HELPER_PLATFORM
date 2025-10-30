import Vue from 'vue'
import VueRouter from 'vue-router'
import loggedIn from './middlewares/loggedIn'
import loggedOut from './middlewares/loggedOut'
import binanceSettings from './middlewares/binanceSettings'
import middlewarePipeline from './middlewares/middlewarePipeline'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: 'default',
      middleware: [ loggedIn, binanceSettings ]
    }
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import(/* webpackChunkName: "chart" */ '@/views/Chart.vue'),
    meta: {
      layout: 'default',
      middleware: [ loggedIn, binanceSettings ]
    }
  },
  {
    path: '/balances',
    name: 'Balances',
    component: () => import(/* webpackChunkName: "balances" */ '@/views/account/wallet/Balances.vue'),
    meta: {
      layout: 'default',
      middleware: [ loggedIn, binanceSettings ]
    }
  },
  {
    path: '/trade/classic',
    name: 'TradeClassic',
    component: () => import(/* webpackChunkName: "tradeClassic" */ '@/views/trade/Classic.vue'),
    meta: {
      layout: 'default',
      middleware: [ loggedIn, binanceSettings ]
    }
  },
  {
    path: '/trade/futures',
    name: 'TradeFutures',
    component: () => import(/* webpackChunkName: "tradeFutures" */ '@/views/trade/Futures.vue'),
    meta: {
      layout: 'default',
      middleware: [ loggedIn, binanceSettings ]
    }
  },
  {
    path: '/stat/blockchain-info',
    name: 'BlockchainInfo',
    component: () => import(/* webpackChunkName: "blockchainInfo" */ '@/views/BlockchainInfo.vue'),
    meta: {
      layout: 'default',
      middleware: [ loggedIn, binanceSettings ]
    }
  },
  {
    path: '/registration',
    name: 'Registrations',
    component: () => import(/* webpackChunkName: "registration" */ '@/views/Registration.vue'),
    meta: {
      layout: 'auth',
      middleware: [ loggedOut ]
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      layout: 'auth',
      middleware: [ loggedOut ]
    }
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => import(/* webpackChunkName: "setup" */ '@/views/BinanceSetup.vue'),
    meta: {
      layout: 'auth',
      middleware: [ loggedIn ]
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
