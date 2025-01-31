<script lang="ts" setup>
const shoppingListStore = useShoppingListStore()
</script>

<template>
  <SlCard v-if="shoppingListStore.list" class="h-full">
    <div class="flex-1">
      <ShoppingPreviewListItem v-for="item in shoppingListStore.list.items" :key="item.id" :item />
    </div>

    <template #footer>
      <ShoppingAddProduct />
    </template>
  </SlCard>
</template>
