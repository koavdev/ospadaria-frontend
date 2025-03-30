<template>
    <div class="fixed w-screen bg-black p-4 flex justify-between items-center z-50">
      <img src="assets/images/ospadaria_logo.png" class="invert h-12" />
      <component
        :is="showMenu ? XMarkIcon : Bars3Icon"
        class="text-white h-8"
        @click="handleMenu"
      />
    </div>
  
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-10px]"
    >
      <div
        v-if="showMenu"
        class="absolute bg-black w-full top-20 h-[calc(100vh-80px)] text-white p-4 flex flex-col gap-3 justify-center items-center z-40"
      >
        <p class="text-[24px]">Cadastre-se</p>
        <p class="text-[24px]">Produtos</p>
        <p class="text-[24px]">Loja</p>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/16/solid'
  
  const showMenu = ref(false)
  
  function handleMenu() {
    showMenu.value = !showMenu.value
  }
  </script>
  