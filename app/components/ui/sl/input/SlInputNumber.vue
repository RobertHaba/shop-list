<script lang="ts" setup>
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
  <CnFormField v-slot="{ componentField, handleChange, value }" :name>
    <CnFormItem>
      <CnNumberField :min="0" :model-value="value" @update:model-value="handleChange">
        <CnFormLabel v-if="resolvedLabel">
          {{ resolvedLabel }}
        </CnFormLabel>

        <CnNumberFieldContent>
          <CnNumberFieldDecrement>
            <slot name="decrement" />
          </CnNumberFieldDecrement>

          <CnFormControl>
            <CnNumberFieldInput :class="$props.classInput" :placeholder="resolvedPlaceholder" v-bind="componentField" />
          </CnFormControl>

          <CnNumberFieldIncrement />
        </CnNumberFieldContent>

        <CnFormMessage />
      </CnNumberField>
    </CnFormItem>
  </CnFormField>
</template>
