export function useFormFieldAttrs() {
  const { t } = useI18n()

  const fieldNameIndexRegex = /^(.*)\[(\d+)\]$/

  const convertPathNameToCamelCase = (name?: string) => name ? name.split('.').map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join('') : ''

  const generateText = ({ textType, propValue, fieldType, name }: { name: string, textType: 'label' | 'placeholder' | 'searchPlaceholder', propValue?: string, fieldType?: 'input' | 'select' }) => {
    if (propValue)
      return propValue

    const match = new RegExp(fieldNameIndexRegex).exec(name.trim())

    const resolvedName = match ? match[1] : name

    const path = `fields.${fieldType}.${convertPathNameToCamelCase(resolvedName)}.${textType}`

    const isEmptyTranslation = t(path) === path

    if (isEmptyTranslation)
      return undefined

    if (!match) {
      return t(path)
    }

    const index = useLodashToNumber(match[2]) + 1

    return match ? t(path, { index: index === 1 ? '' : index }) : t(path)
  }

  interface FieldTextAttrs {
    name: string
    textKey?: string
    label?: string
    placeholder?: string
    hideLabel?: boolean
  }

  const generateFieldTextAttrs = (props: FieldTextAttrs) => {
    return {
      resolvedLabel: computed(() => props.hideLabel ? '' : generateText({ fieldType: 'input', textType: 'label', propValue: props.label, name: props.textKey ?? props.name })),
      resolvedPlaceholder: computed(() => generateText({ fieldType: 'input', textType: 'placeholder', propValue: props.placeholder, name: props.textKey ?? props.name })),
    }
  }

  const generateSelectTextAttrs = (props: FieldTextAttrs) => {
    return {
      resolvedLabel: computed(() => props.hideLabel ? '' : generateText({ fieldType: 'select', textType: 'label', propValue: props.label, name: props.textKey ?? props.name })),
      resolvedPlaceholder: computed(() => generateText({ fieldType: 'select', textType: 'placeholder', propValue: props.placeholder, name: props.textKey ?? props.name })),
      resolvedSearchPlaceholder: computed(() => generateText({ fieldType: 'select', textType: 'searchPlaceholder', propValue: props.placeholder, name: props.textKey ?? props.name })),
    }
  }

  return {
    generateFieldTextAttrs,
    generateSelectTextAttrs,
  }
}
