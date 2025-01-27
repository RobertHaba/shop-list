<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const { t } = useI18n()

const shoppingListStore = useShoppingListStore()

shoppingListStore.getList(route.params.id as string)

const { title } = useListData()

function useListData() {
  const isNewList = computed(() => route.params.id === 'new')

  const title = computed(() => isNewList.value ? t('app.productList.newList') : shoppingListStore.list?.name)

  return { title }
}
</script>

<template>
  <NuxtLayout name="app-container">
    <AppMobileHeader :title back-to="/app" />

    <AppProductList class="h-full" />

    <SlButton class="w-full" size="lg" :to="`/app/products/${$route.params.id}/add`">
      {{ $t('global.add') }}
    </SlButton>
  </NuxtLayout>
</template>
