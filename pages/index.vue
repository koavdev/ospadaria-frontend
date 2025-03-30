<template>
    <div class="p-3 flex flex-col gap-3">
        <MarketFilters @update:search="searchText = $event" />
        <div class="w-full grid grid-cols-2 gap-3">
            <MarketItem v-for="product in filteredProducts" :product="product"/>
        </div>    
    </div>
    <MarketCartButton />
</template>

<script setup lang="ts">
import Pastelina from "@/assets/images/pastelina.jpg"
import { type IProduct } from "@/composables/useCart"
import { ref, computed } from 'vue'

const searchText = ref('')

const products: IProduct[] = [
    { id: 1, name: "Pastelina", price: 4.50, image: Pastelina },
    { id: 2, name: "Pastel de Carne", price: 6.00, image: Pastelina },
    { id: 3, name: "Pastel de Queijo", price: 5.50, image: Pastelina },
    { id: 4, name: "Pastel de Frango", price: 6.00, image: Pastelina },
    { id: 5, name: "Coxinha", price: 4.00, image: Pastelina },
    { id: 6, name: "Esfiha", price: 3.50, image: Pastelina },
    { id: 7, name: "Kibe", price: 4.00, image: Pastelina },
    { id: 8, name: "Risole", price: 3.50, image: Pastelina },
]

const filteredProducts = computed(() => {
  if (!searchText.value) return products
  
  const search = searchText.value.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(search)
  )
})
</script>