<script lang="ts" setup>
const shoppingListStore = useShoppingListStore()
</script>

<template>
  <div v-if="shoppingListStore.list" class="flex flex-col justify-end h-full">
    <SlCard>
      <div class="flex-1">
        <ShoppingPreviewListEmpty v-if="!shoppingListStore.list.items.length" />

        <ShoppingPreviewListItem v-for="item in shoppingListStore.list.items" :key="item.id" :item />
      </div>

      <template #footer>
        <ShoppingAddProduct />
      </template>
    </SlCard>
  </div>
</template>
