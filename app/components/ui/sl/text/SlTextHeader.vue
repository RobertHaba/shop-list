<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <h2 class="text-2xl font-semibold">
    <slot>{{ text }}</slot>
  </h2>
</template>
