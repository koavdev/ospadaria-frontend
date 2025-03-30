<template>
  <div class="flex justify-between items-center bg-white rounded-full"
     :class="itemQuantity === 0 ? '' : 'min-w-[120px]'">
    <template v-if="itemQuantity === 0">
      <Button 
        size="icon" 
        class="bg-white !focus:bg-white !hover:bg-white text-black rounded-full"
        @click="addToCart"
      >
        <PlusIcon class="h-4 w-4" />
      </Button>
    </template>
    <template v-else>
      <Button 
        size="icon" 
        class="bg-white !focus:bg-white !hover:bg-white text-black rounded-full"
        @click="removeFromCart"
      >
        <TrashIcon class="h-4 w-4" />
      </Button>
      <p class="mx-1 bg-white text-black font-medium text-[14px]">{{ itemQuantity }}</p>
      <Button 
        size="icon" 
        class="bg-white !focus:bg-white !hover:bg-white text-black rounded-full"
        @click="addToCart"
      >
        <PlusIcon class="h-4 w-4" />
      </Button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { PlusIcon, TrashIcon } from "lucide-vue-next";
import { useCart } from "@/composables/useCart";
import { type IProduct } from "~/lib/types";

defineOptions({
  name: "CartItemButton"
});

const props = defineProps<{
  product: IProduct
}>();

const { items, addItem, removeItem } = useCart();

const itemQuantity = computed(() => {
  const cartItem = items.value.find(item => item.id === props.product.id);
  return cartItem ? cartItem.quantity : 0;
});

const addToCart = () => {
  addItem(props.product);
};

const removeFromCart = () => {
  removeItem(props.product.id);
};
</script>