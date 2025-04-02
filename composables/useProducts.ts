import { ref, computed, readonly } from 'vue'
import type { IProductWithCategory, ProductCategory } from '@/lib/types'

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

const { fetchSheetData } = useGoogleSheets()

async function fetchProducts() {
  if (products.value.length > 0) {
    return // Don't fetch if we already have products
  }
  
  isLoading.value = true
  error.value = null
  
  try {
    const response = await fetchSheetData()

    // Parse the data from Google Sheets
    const sheetValues = response.values.slice(1) // Skipping the header row
    products.value = sheetValues.map((row, index) => ({
      id: index + 1, // Or map this to a real ID if applicable
      name: row[0],
      price: parseFloat(row[1]),
      category: row[2], // Assuming category is in the 3rd column
      image: row[3] || '', // Assuming the image URL is in the 4th column, or provide a default
    }))
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
