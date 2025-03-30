import { defineNuxtPlugin } from '#app'
import { productsInstance } from '@/composables/useProducts'

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize products data
  productsInstance.fetchProducts()
  
  // Make products available globally
  return {
    provide: {
      products: productsInstance
    }
  }
})