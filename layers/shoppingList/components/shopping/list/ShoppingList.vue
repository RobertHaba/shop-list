<script lang="ts" setup>
const { data } = useFetch('/api/shopping-lists')
</script>

<template>
  <div class="flex flex-col gap-4 overflow-auto">
    <template v-if="data?.data?.length">
      <ShoppingListItem v-for="item in data.data" :key="item.id" :item />
    </template>
  </div>
</template>
