<script lang="ts" setup>
import AppShoppingListItem from './AppShoppingListItem.vue'

const { data } = useFetch('/api/shopping-lists')
</script>

<template>
  <div class="flex flex-col gap-4">
    <template v-if="data?.data?.length">
      <AppShoppingListItem v-for="item in data.data" :key="item.id" v-bind="item" />
    </template>
  </div>
</template>
