<script lang="ts" setup>
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<template>
  <header class="flex gap-2 h-10 items-center">
    <CnButton size="icon" variant="ghost" @click="$router.back()">
      <SlIcon class="size-8 text-muted-foreground" name="tabler:arrow-narrow-left" />
    </CnButton>

    <h1 class="text-lg font-semibold">
      {{ title }}
    </h1>
  </header>
</template>

<style>

</style>
