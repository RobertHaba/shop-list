<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <p class="text-xs text-muted-foreground">
    <slot>{{ text }}</slot>
  </p>
</template>
