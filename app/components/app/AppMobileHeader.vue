<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  title?: string
  backTo: RouteLocationRaw
}

defineProps<Props>()
</script>

<template>
  <header class="flex shrink-0 gap-2 h-12 items-center">
    <SlButton size="icon" variant="ghost" :to="backTo">
      <SlIcon class="size-8 text-muted-foreground" name="tabler:arrow-narrow-left" />
    </SlButton>

    <slot>
      <h1 class="text-lg font-semibold">
        {{ title }}
      </h1>
    </slot>
  </header>
</template>
