<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface SlInputProps {
  type?: string
  name: string
  textKey?: string
  label?: string
  placeholder?: string
  hideLabel?: boolean
  hidePlaceholder?: boolean
  required?: boolean
  description?: string
  iconPrepend?: string
  classInput?: HTMLAttributes['class']
}

const props = defineProps<SlInputProps>()

const { generateFieldTextAttrs } = useFormFieldAttrs()

const { resolvedLabel, resolvedPlaceholder } = generateFieldTextAttrs(props)
</script>

<template>
  <CnFormField v-slot="{ componentField }" :name>
    <CnFormItem>
      <CnFormLabel v-if="resolvedLabel">
        {{ resolvedLabel }}
      </CnFormLabel>

      <CnFormControl>
        <div class="relative">
          <SlIcon v-if="iconPrepend" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" :name="iconPrepend" />

          <CnInput :class="[$props.classInput, { 'pl-8': iconPrepend }]" :type :placeholder="resolvedPlaceholder" v-bind="componentField" />
        </div>
      </CnFormControl>

      <CnFormDescription v-if="description">
        {{ description }}
      </CnFormDescription>

      <CnFormMessage />
    </CnFormItem>
  </CnFormField>
</template>
