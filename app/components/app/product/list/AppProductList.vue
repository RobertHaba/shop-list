<script lang="ts" setup>
const list = [
  { icon: 'tabler:a-b', name: 'Pomidor' },
  { icon: 'tabler:a-b', name: 'Cebula' },
]
</script>

<template>
  <SlCard>
    <div>
      <AppProductListItem v-for="item in list" :key="item.name" v-bind="item" />
    </div>
  </SlCard>
</template>
