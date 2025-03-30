<template>
    <div class="flex items-center gap-3 overflow-visible py-2">
        <Input v-model="searchText" placeholder="Pesquise pelo nome do produto" />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import Input from "../ui/input/Input.vue";

defineOptions({
  name: "MarketFilters"
})

const emit = defineEmits<{
  (e: 'update:search', value: string): void
}>()

const searchText = ref('')

watch(searchText, (newValue) => {
  emit('update:search', newValue)
})
</script>