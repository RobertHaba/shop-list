<script lang="ts" setup>
import { helpers } from '@typed-router'

const { t } = useI18n()

const menuItemList = [
  { to: helpers.path('/app'), icon: 'tabler:home', title: t('app.menu.home') },
  { to: helpers.path('/app/shopping-list/new'), icon: 'tabler:square-rounded-plus', title: t('app.menu.newList') },
  // { to: '/app/list/favorites', icon: 'tabler:heart', title: t('app.menu.favorites') },
]
</script>

<template>
  <div class="w-full h-20 bg-slate-200 flex items-center justify-evenly px-4 dark:bg-slate-800 sticky bottom-0 rounded-t-3xl">
    <AppMobileNavbarItem v-for="item in menuItemList" :key="item.title" v-bind="item" />
  </div>
</template>
