<script lang="ts" setup>
type Item = ApiResponse<'/api/shopping-lists/:listId', 'get'>['items'][0]

interface Props {
  item: Item
}

const { item } = defineProps<Props>()

const route = useRoute()

const shoppingListStore = useShoppingListStore()

const itemRef = useTemplateRef('itemRef')

const { isSwiping } = useSwipe(itemRef)

const { toggleChecked } = useItemActions()

const resolvedIcon = computed(() => 'tabler:cactus')

function useItemActions() {
  async function toggleChecked() {
    await shoppingListStore.updateItem(Number(route.params.id), item.id, {
      isPurchased: !item.isPurchased,
    })
  }

  return {
    toggleChecked,
  }
}
</script>

<template>
  <div ref="itemRef" class="border-b flex justify-between border-border items-center min-h-14" :class="{ 'bg-muted': isSwiping }">
    <div class="flex gap-4 items-center">
      <CnCheckbox :checked="item.isPurchased" class="size-6 rounded-full" @update:checked="toggleChecked" />

      <div class="flex gap-2 items-center">
        <SlIcon :name="resolvedIcon" />

        <h3 class="text-sm">
          {{ item.product.name }}
        </h3>
      </div>
    </div>

    <CnBadge class="bg-muted text-muted-foreground">
      {{ item.quantity }}
    </CnBadge>
  </div>
</template>
