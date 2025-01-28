<script lang="ts" setup generic="T extends RoutesNamesList, P extends string">
import type { NuxtRoute, RoutesNamesList } from '@typed-router'

interface Props {
  title?: string
  backTo: NuxtRoute<T, P>
}

defineProps<Props>()
</script>

<template>
  <header class="flex shrink-0 gap-2 h-12 items-center">
    <ClientOnly>
      <SlButton size="icon" variant="ghost" :to="backTo">
        <SlIcon class="size-8 text-muted-foreground" name="tabler:arrow-narrow-left" />
      </SlButton>
    </ClientOnly>

    <slot>
      <h1 class="text-lg font-semibold">
        {{ title }}
      </h1>
    </slot>
  </header>
</template>
