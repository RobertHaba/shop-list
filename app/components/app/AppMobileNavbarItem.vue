<script lang="ts" setup>
interface Props {
  to: string
  icon: string
  title: string
}

const { to, icon } = defineProps<Props>()

const route = useRoute()

const isActiveRoute = computed(() => route.path === to)

const resolvedIcon = computed(() => isActiveRoute.value ? `${icon}-filled` : icon)
</script>

<template>
  <NuxtLink class="flex flex-col items-center w-fit gap-0.5 text-foreground [&.router-link-active]:text-primary [&.router-link-active]:bg-primary/10 px-4 py-1 rounded-lg" :to>
    <SlIcon class="size-6" :name="resolvedIcon" />

    <span class="text-xs font-semibold">{{ title }}</span>
  </NuxtLink>
</template>
