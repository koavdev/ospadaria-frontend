// useCart.ts
import { ref, computed } from 'vue'

export interface IProduct {
  id: number
  name: string
  price: number
  image: string
}

// use um cache interno para evitar múltiplas instâncias
let cartInstance: ReturnType<typeof createCart>

const createCart = () => {
  const items = ref<(IProduct & { quantity: number })[]>([])

  const addItem = (product: IProduct) => {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const removeItem = (productId: number) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      const item = items.value[index]
      if (item.quantity > 1) item.quantity -= 1
      else items.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const totalItems = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  return {
    items,
    addItem,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  }
}

export const useCart = () => {
  if (!cartInstance) cartInstance = createCart()
  return cartInstance
}
