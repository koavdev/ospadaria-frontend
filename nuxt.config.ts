export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  nitro: {
    routeRules: {
      '/api/**': { cors: true }
    }
  },
  runtimeConfig: {
    private: {
      googleSheetId: process.env.PRODUCTS_SPREADSHEET_ID,
      serviceAccountJson: process.env.SERVICE_ACCOUNT_JSON,
    }
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  compatibilityDate: '2025-03-30',
  experimental: {
    appManifest: false
  }
})
