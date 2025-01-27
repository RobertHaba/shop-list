<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const { t } = useI18n()

const isNewList = computed(() => route.params.id === 'new')
</script>

<template>
  <NuxtLayout name="app-container">
    <AppMobileHeader :back-to="`/app/products/${$route.params.id}`">
      <SlInput name="search" icon-prepend="tabler:search" />
    </AppMobileHeader>
  </NuxtLayout>
</template>
