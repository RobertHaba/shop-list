<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const { t } = useI18n()

const isNewList = computed(() => route.params.id === 'new')

const title = computed(() => isNewList.value ? t('app.productList.newList') : 'BCK')
</script>

<template>
  <NuxtLayout name="app-container">
    <AppMobileHeader :title />

    <AppProductList class="h-full" />

    <SlButton class="w-full" size="lg" :to="`/app/products/${$route.params.id}/add`">
      {{ $t('global.add') }}
    </SlButton>
  </NuxtLayout>
</template>
