<template>
    <div class="p-3 flex flex-col gap-3">
        <MarketFilters @update:search="updateSearchFilter" />
        <div v-if="isLoading" class="w-full flex justify-center py-10">
          <p>Carregando produtos...</p>
        </div>
        <div v-else-if="filteredProducts.length === 0" class="w-full flex justify-center py-10">
          <p>Nenhum produto encontrado</p>
        </div>
        <div v-else class="w-full grid grid-cols-2 gap-3">
            <MarketItem v-for="product in filteredProducts" :key="product.id" :product="product"/>
        </div>    
    </div>
    <MarketCartButton />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '@/composables/useProducts'
import type { ProductCategory } from '@/lib/types'

const route = useRoute()
const { filteredProducts, setFilters, fetchProducts, isLoading } = useProducts()

function updateSearchFilter(text: string) {
  setFilters({ searchText: text })
}

watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    setFilters({ category: newCategory as ProductCategory })
  } else {
    setFilters({ category: null })
  }
}, { immediate: true })

onMounted(() => {
  fetchProducts()
})
</script>