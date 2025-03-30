<template>
    <div 
        :key="product.id" 
        class="relative flex flex-col gap-2 w-auto overflow-hidden cursor-pointer transition-transform"
    >
    
        <div class="relative bg-gray-200/40 rounded-lg w-full p-2">
            <div class="absolute bottom-2 right-2 z-[9]">
                <ItemButton :product="product" />
            </div>
            <img :src="product.image" class="object-cover h-28 mx-auto" />
        </div>
        <div class="flex flex-col justify-between">
            <p class="font-medium z-[9]">{{ formatPrice(product.price) }}</p>
            <p class="text-[12px] text-gray-600">{{ product.name }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue"
import { type IProduct } from "@/composables/useCart"
import { formatPrice } from "~/lib/formats";
import ItemButton from "./ItemButton.vue";

defineOptions({
  name: "MarketItem"
})

const props = withDefaults(
  defineProps<{
    product: IProduct
  }>(),
  {  }
)
const { product } = toRefs(props)

</script>

<style scoped>
img {
  background-color: transparent;
  mix-blend-mode: multiply;
}
</style>
