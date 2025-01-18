<script setup lang="ts">
interface SlInputProps {
  type?: string
  name: string
  textKey?: string
  label?: string
  placeholder?: string
  hideLabel?: boolean
  required?: boolean
  description?: string
}

const props = defineProps<SlInputProps>()

const { generateFieldTextAttrs } = useFormFieldAttrs()

const { resolvedLabel, resolvedPlaceholder } = generateFieldTextAttrs(props)
</script>

<template>
  <CnFormField v-slot="{ componentField }" :name>
    <CnFormItem>
      <CnFormLabel>{{ resolvedLabel }}</CnFormLabel>

      <CnFormControl>
        <CnInput :type :placeholder="resolvedPlaceholder" v-bind="componentField" />
      </CnFormControl>

      <CnFormDescription>
        {{ description }}
      </CnFormDescription>

      <CnFormMessage />
    </CnFormItem>
  </CnFormField>
</template>
