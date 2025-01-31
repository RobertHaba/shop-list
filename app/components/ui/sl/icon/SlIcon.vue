<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface Props {
  name: string
  size?: number | string
  class?: HTMLAttributes['class']
}

defineProps<Props>()
</script>

<template>
  <Icon class="shrink-0" :name :size :class="$props.class" />
</template>
