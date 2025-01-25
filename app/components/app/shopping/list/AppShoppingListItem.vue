<script lang="ts" setup>
interface Props {
  name: string
  id: number
  createdAt: string | null
  userId: number
  productCount: number
  completedProductCount: number
}

const props = defineProps<Props>()

const { completedPercent, totalToBuy } = useStats()

function useStats() {
  const completedPercent = computed(() => props.productCount > 1 ? (props.completedProductCount / props.productCount) * 100 : 0)

  const totalToBuy = computed(() => props.productCount - props.completedProductCount)

  return {
    completedPercent,
    totalToBuy,
  }
}
</script>

<template>
  <NuxtLink :to="`/app/products/${id}`" class="flex flex-col justify-between gap-2 p-4 bg-card rounded-lg">
    <h3 class="font-semibold">
      {{ name }}
    </h3>

    <div class="flex gap-2 items-center">
      <CnProgress :model-value="completedPercent" />

      <span class="text-xs">{{ completedProductCount }}/{{ productCount }}</span>
    </div>

    <SlTextHint v-if="totalToBuy" :text="$t('app.shoppingList.completeListAndBuyProducts', { nProducts: $t('global.nProducts', totalToBuy) })" />
  </NuxtLink>
</template>
