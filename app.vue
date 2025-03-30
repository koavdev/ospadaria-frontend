<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage
      :transition="{
          name: `form-fade`,
          mode: 'out-in',
      }"/>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
// Providers for the app
// The cart state will be accessible throughout the application
</script>
