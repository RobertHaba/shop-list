<script lang="ts" setup>
const shoppingListStore = useShoppingListStore()
</script>

<template>
  <SlCard v-if="shoppingListStore.list">
    <ShoppingPreviewListItem v-for="item in shoppingListStore.list.items" :key="item.id" :item />
  </SlCard>
</template>
