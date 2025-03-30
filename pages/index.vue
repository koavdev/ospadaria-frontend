<template>
    <div class="w-full grid grid-cols-2 gap-3 p-3">
        <MarketItem v-for="product in products" :product="product"/>
    </div>
    
    <MarketCartButton />
</template>

<script setup lang="ts">
import Pastelina from "@/assets/images/pastelina.jpg"
import { type IProduct } from "@/composables/useCart"

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
</script>