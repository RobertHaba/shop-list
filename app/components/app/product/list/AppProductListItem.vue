<script lang="ts" setup>
interface Props {
  name: string
  icon: string
}

defineProps<Props>()

const itemRef = useTemplateRef('itemRef')

const { isSwiping, direction } = useSwipe(itemRef)
</script>

<template>
  <div ref="itemRef" class="border-b flex justify-between border-border items-center min-h-14" :class="{ 'bg-muted': isSwiping }">
    <div class="flex gap-4 items-center">
      <CnCheckbox class="size-6 rounded-full" />

      <div class="flex gap-2 items-center">
        <SlIcon :name="icon" />

        <h3 class="text-sm">
          {{ name }}
        </h3>
      </div>
    </div>

    <CnBadge class="bg-muted text-muted-foreground">
      2
    </CnBadge>
  </div>
</template>
