<script lang="ts" setup generic="T extends RoutesNamesList, P extends string">
import type { NuxtRoute, RoutesNamesList } from '@typed-router'
import type { CnButtonProps } from '~/components/ui/cn/button/Button.vue'

interface Props extends CnButtonProps {
  to?: NuxtRoute<T, P>
}

const { to } = defineProps<Props>()

const asComponent = computed(() => to ? resolveComponent('NuxtLink') : 'button')
</script>

<template>
  <CnButton v-bind="$props" :to :as="asComponent">
    <slot />
  </CnButton>
</template>
