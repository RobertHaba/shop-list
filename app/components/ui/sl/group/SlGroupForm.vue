<script lang="ts" setup>
interface Props {
  column?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-3 w-full" :class="{ 'a-group-form-column': column }">
    <slot />
  </div>
</template>

<style scoped>
.a-group-form-column {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>
