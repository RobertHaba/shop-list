<script lang="ts" setup>
type Item = ApiResponse<'/api/shopping-lists/:listId', 'get'>['products'][0]

interface Props {
  item: Item
}

const { item } = defineProps<Props>()

const route = useRoute()

const itemRef = useTemplateRef('itemRef')

const { isSwiping, direction } = useSwipe(itemRef)

const { toggleChecked } = useItemActions()

const resolvedIcon = computed(() => 'tabler:cactus')

function useItemActions() {
  async function toggleChecked() {
    const res = await $fetch(`/api/shopping-lists/${route.params.id}/items/${item.id}`, {
      method: 'PUT',
      body: {
        isCompleted: !item.isCompleted,
      },
    })

    console.log(res)
  }

  return {
    toggleChecked,
  }
}
</script>

<template>
  <div ref="itemRef" class="border-b flex justify-between border-border items-center min-h-14" :class="{ 'bg-muted': isSwiping }">
    <div class="flex gap-4 items-center">
      <CnCheckbox :checked="item.isCompleted" class="size-6 rounded-full" @update:checked="toggleChecked" />

      <div class="flex gap-2 items-center">
        <SlIcon :name="resolvedIcon" />

        <h3 class="text-sm">
          {{ item.name }}
        </h3>
      </div>
    </div>

    <CnBadge class="bg-muted text-muted-foreground">
      2
    </CnBadge>
  </div>
</template>
