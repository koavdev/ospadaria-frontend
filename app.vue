<template>
  <ClientOnly>
    <template v-if="false">
      <NuxtLayout>
        <NuxtPage
        :transition="{
            name: `form-fade`,
            mode: 'out-in',
        }"/>
      </NuxtLayout>
    </template>
    <template v-else>
      <div class="h-screen w-full flex gap-2 items-center justify-center bg-black text-white">
        <p class="font-bold">503.</p>
        <p>Service unavailable</p>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
// Providers for the app
// The cart state will be accessible throughout the application
</script>
