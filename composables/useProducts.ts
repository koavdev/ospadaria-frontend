import { ref, computed, readonly } from 'vue'
import type { IProductWithCategory, ProductCategory } from '@/lib/types'
import Pastelina from "@/assets/images/pastelina.jpg?url"

// Mock data - will be replaced with API calls in the future
const mockProducts: IProductWithCategory[] = [
  { id: 1, name: "Pastelina", price: 4.50, image: Pastelina, category: 'Pastéis' },
  { id: 2, name: "Pastel de Carne", price: 6.00, image: Pastelina, category: 'Pastéis' },
  { id: 3, name: "Pastel de Queijo", price: 5.50, image: Pastelina, category: 'Pastéis' },
  { id: 4, name: "Pastel de Frango", price: 6.00, image: Pastelina, category: 'Pastéis' },
  { id: 5, name: "Coxinha", price: 4.00, image: Pastelina, category: 'Salgados' },
  { id: 6, name: "Esfiha", price: 3.50, image: Pastelina, category: 'Salgados' },
  { id: 7, name: "Kibe", price: 4.00, image: Pastelina, category: 'Salgados' },
  { id: 8, name: "Risole", price: 3.50, image: Pastelina, category: 'Salgados' },
]

// Create a single product store
const products = ref<IProductWithCategory[]>([])
const isLoading = ref(false)
const error = ref<Error | null>(null)
const activeFilters = ref({
  searchText: '',
  category: null as ProductCategory | null,
  productId: null as number | null
})

// Get all unique categories from products
const categories = computed<ProductCategory[]>(() => {
  const uniqueCategories = new Set(products.value.map(product => product.category))
  return Array.from(uniqueCategories) as ProductCategory[]
})

// Filtered products based on active filters
const filteredProducts = computed(() => {
  let result = products.value
  
  // Filter by search text
  if (activeFilters.value.searchText) {
    const search = activeFilters.value.searchText.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(search)
    )
  }
  
  // Filter by productId
  if (activeFilters.value.productId) {
    result = result.filter(product => product.id === activeFilters.value.productId)
  }
  
  // Filter by category
  if (activeFilters.value.category) {
    result = result.filter(product => product.category === activeFilters.value.category)
  }
  
  return result
})

// Function to fetch products from API (will be implemented in the future)
async function fetchProducts() {
  if (products.value.length > 0) {
    return // Don't fetch if we already have products
  }
  
  isLoading.value = true
  error.value = null
  
  try {
    // In the future, this will be replaced with an actual API call
    // For now, just simulate a delay to mimic a network request
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Mock response (would be replaced with actual API response)
    products.value = mockProducts
  } catch (err) {
    error.value = err as Error
    console.error('Error fetching products:', err)
  } finally {
    isLoading.value = false
  }
}

// Set filters
function setFilters({
  searchText,
  category,
  productId
}: {
  searchText?: string,
  category?: ProductCategory | null,
  productId?: number | null
} = {}) {
  if (searchText !== undefined) {
    activeFilters.value.searchText = searchText
  }
  
  if (category !== undefined) {
    activeFilters.value.category = category
  }
  
  if (productId !== undefined) {
    activeFilters.value.productId = productId
  }
}

// Clear all filters
function clearFilters() {
  activeFilters.value = {
    searchText: '',
    category: null,
    productId: null
  }
}

// Export the product store
export function useProducts() {
  return {
    // State (read-only)
    products: readonly(products),
    filteredProducts,
    categories,
    isLoading: readonly(isLoading),
    error: readonly(error),
    filters: readonly(activeFilters),
    
    // Actions
    fetchProducts,
    setFilters,
    clearFilters
  }
}

// Create a single instance to be used globally
export const productsInstance = useProducts()