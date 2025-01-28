<script lang="ts" setup>
const { data } = useFetch('/api/shopping-lists')
</script>

<template>
  <SlCard :label="$t('shopping.list.title')">
    <div v-if="data?.data?.length">
      <ShoppingListItem v-for="item in data.data" :key="item.id" :item />
    </div>

    <div v-else class="flex flex-col gap-3">
      <p class="text-sm">
        {{ $t('shopping.list.empty') }}
      </p>
    </div>

    <template #footer>
      <SlButton class="w-full sm:w-fit" to="/app/shopping-list/new">
        {{ $t('shopping.createList') }}
      </SlButton>
    </template>
  </SlCard>
</template>
