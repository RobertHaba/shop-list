<script setup lang="ts">
const route = useRoute()

const shoppingListStore = useShoppingListStore()

shoppingListStore.getList(String(route.params.id))
</script>

<template>
  <NuxtLayout name="app-container">
    <AppMobileHeader :title="shoppingListStore.list?.name" back-to="/app" />

    <AppProductList class="h-full" />

    <ShoppingAddProduct />
  </NuxtLayout>
</template>
