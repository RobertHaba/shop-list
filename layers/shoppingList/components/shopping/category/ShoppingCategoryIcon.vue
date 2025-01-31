<script lang="ts" setup>
import { CategoryIcon } from '~~/layers/shoppingList/constants/'

interface Props {
  icon: string | null
}

const { icon } = defineProps<Props>()

const iconName = computed(() => (CategoryIcon[icon as keyof typeof CategoryIcon] ?? CategoryIcon.fruits))
</script>

<template>
  <div class="p-1 flex place-content-center bg-background rounded-full">
    <SlIcon :name="iconName" />
  </div>
</template>
