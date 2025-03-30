<template>
    <div class="fixed w-screen bg-black p-4 flex justify-between items-center z-50">
      <img src="/assets/images/ospadaria_logo.png" class="invert h-8" />
      <NavbarShowButton v-model="showMenu"/>
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
        class="absolute bg-black w-full top-16 h-[calc(100vh-64px)] text-white p-4 flex flex-col gap-3 z-[60] overflow-y-auto"
      >
        <p class="text-[24px]">Categorias</p>

        <div class="flex flex-col gap-2">
          <div 
            v-for="category in categories" 
            :key="category"
            class="flex w-full p-3 hover:bg-zinc-800 rounded-md cursor-pointer items-center justify-between"
            @click="filterByCategory(category)"
          >
            <span class="text-lg">{{ category }}</span>
            <ChevronRightIcon class="w-5 h-5" />
          </div>
          <div 
            class="flex w-full p-3 hover:bg-zinc-800 rounded-md cursor-pointer items-center justify-between mt-2 border-t border-zinc-700 pt-5"
            @click="filterByCategory(null)"
          >
            <span class="text-lg">Todos os Produtos</span>
            <ChevronRightIcon class="w-5 h-5" />
          </div>
        </div>
        
        <div class="absolute bottom-2 left-0 flex justify-center w-full gap-1"
          @click="goToGithub">
          <p>
            koavdev/<span class="font-bold">ospadaria-frontend</span>
          </p>
          <component :is="GithubIcon" class="w-4" />
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { GithubIcon, ChevronRightIcon } from 'lucide-vue-next';
  import { type ProductCategory } from '@/lib/types';
  import { useRouter } from 'vue-router';

  const showMenu = ref(false);
  const router = useRouter();
  
  const { categories } = useProducts()

  const filterByCategory = (category: ProductCategory | null) => {
    showMenu.value = false;
    if (category) {
      router.push(`/?category=${category}`);
    } else {
      router.push('/');
    }
  };

  function goToGithub() {
    window.location.href = "https://github.com/koavdev/ospadaria-frontend"
  }
  </script>