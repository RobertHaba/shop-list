<script lang="ts" setup>
interface Props {
  name: string
  size?: number | string
}

defineProps<Props>()
</script>

<template>
  <Icon class="shrink-0" :name :size />
</template>
