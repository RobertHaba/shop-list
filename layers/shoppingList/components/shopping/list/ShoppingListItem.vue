<script lang="ts" setup>
type Item = ApiResponse<'/api/shopping-lists', 'get'>['data'][0]

interface Props {
  item: Item
}

const props = defineProps<Props>()

const { completedPercent, totalToBuy } = useStats()

function useStats() {
  const completedPercent = computed(() => props.item.itemCount > 1 ? (props.item.completedItemCount / props.item.itemCount) * 100 : 0)

  const totalToBuy = computed(() => props.item.itemCount - props.item.completedItemCount)

  return {
    completedPercent,
    totalToBuy,
  }
}
</script>

<template>
  <NuxtLink :to="`/app/shopping-list/${item.id}`" class="flex flex-col justify-between gap-2 py-5 border-b border-border">
    <h3 class="font-semibold">
      {{ item.name }}
    </h3>

    <div class="flex gap-2 items-center">
      <CnProgress :model-value="completedPercent" />

      <span class="text-xs">{{ item.completedItemCount }}/{{ item.itemCount }}</span>
    </div>

    <SlTextHint v-if="totalToBuy" :text="$t('app.shoppingList.completeListAndBuyProducts', { nProducts: $t('global.nProducts', totalToBuy) })" />
  </NuxtLink>
</template>
