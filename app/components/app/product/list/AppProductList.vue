<script lang="ts" setup>
const shoppingListStore = useShoppingListStore()
</script>

<template>
  <SlCard v-if="shoppingListStore.list">
    <div>
      <AppProductListItem v-for="item in shoppingListStore.list.products" :key="item.id" :item />
    </div>
  </SlCard>
</template>
