import { defineNuxtPlugin } from '#app'
import { useCart } from '@/composables/useCart'

export default defineNuxtPlugin(() => {
  // Initialize the cart globally
  useCart()
})