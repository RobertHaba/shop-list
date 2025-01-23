<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'
import type { CnButtonProps } from '~/components/ui/cn/button/Button.vue'

interface Props extends CnButtonProps {
  to?: RouteLocationRaw
}

const { to } = defineProps<Props>()

const asComponent = computed(() => to ? resolveComponent('NuxtLink') : 'button')
</script>

<template>
  <CnButton v-bind="$props" :to :as="asComponent">
    <slot />
  </CnButton>
</template>
