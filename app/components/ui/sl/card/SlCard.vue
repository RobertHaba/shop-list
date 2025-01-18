<script lang="ts" setup>
interface Props {
  label?: string
}

const props = defineProps<Props>()

const { hasSlotContent } = useSlotContent()

const showTitle = computed(() => props.label || hasSlotContent('title'))

const showHeader = computed(() => hasSlotContent('header') || showTitle.value)

const showFooter = computed(() => hasSlotContent('footer'))
</script>

<template>
  <CnCard>
    <CnCardHeader v-if="showHeader">
      <slot name="header">
        <CnCardTitle v-if="showTitle">
          <slot name="title">
            {{ label }}
          </slot>
        </CnCardTitle>

        <slot name="actions" />
      </slot>
    </CnCardHeader>

    <CnCardContent :class="{ 'pt-6': !showHeader }">
      <slot />
    </CnCardContent>

    <CnCardFooter v-if="showFooter">
      <slot name="footer" />
    </CnCardFooter>
  </CnCard>
</template>
