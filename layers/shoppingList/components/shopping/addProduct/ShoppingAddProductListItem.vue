<script setup lang="ts">
import { z } from 'zod'

type Product = ApiResponse<'/api/products', 'get'>[0]

interface Props {
  product: Product
}

const { product } = defineProps<Props>()

const shoppingListStore = useShoppingListStore()
const route = useRoute()

const { handleAddProduct, isAdded, showDelete } = useProduct()

const icon = computed(() => isAdded.value ? 'tabler:check' : 'tabler:plus')

function useProduct() {
  const shoppingItem = computed(() => shoppingListStore.list?.items?.find(item => item.productId === product.id))

  const { values, setFieldValue } = useForm({
    validationSchema: toTypedSchema(z.object({ quantity: z.number().int() })),
    initialValues: {
      quantity: shoppingItem.value?.quantity ?? 1,
    },
  })

  const isAdded = computed(() => !!shoppingItem.value)

  const showDelete = computed(() => values.quantity === 1)

  async function handleAddProduct() {
    if (isAdded.value) {
      setFieldValue('quantity', (values.quantity ?? 0) + 1)

      return
    }
    await shoppingListStore.addItem(String(route.params.id), product.id)
    setFieldValue('quantity', 1)
  }

  async function onQuantityChange() {
    if (values.quantity === 0) {
      await handleDeleteItem()
    }
    else {
      await handleUpdateQuantity()
    }
  }

  async function handleDeleteItem() {
    if (!shoppingItem.value?.id)
      return
    await shoppingListStore.deleteItem(Number(route.params.id), shoppingItem.value.id)
  }

  async function handleUpdateQuantity() {
    if (!shoppingItem.value?.id)
      return
    await shoppingListStore.updateItem(Number(route.params.id), shoppingItem.value.id, { quantity: values.quantity })
  }

  watch(
    computed(() => values.quantity),
    () => {
      if (values.quantity === 0) {
        handleDeleteItem()
      }
    },
  )

  watchDebounced(
    computed(() => values.quantity),
    () => {
      if (Number(values.quantity) > 0 && values.quantity !== shoppingItem.value?.quantity) {
        onQuantityChange()
      }
    },
    { debounce: 500, maxWait: 1000 },
  )

  return {
    handleAddProduct,
    shoppingItem,
    isAdded,
    values,
    showDelete,
  }
}
</script>

<template>
  <div class="flex gap-3 items-center min-h-10">
    <SlButton size="icon" :icon variant="secondary" @click="handleAddProduct" />

    <div class="flex gap-2 items-center grow">
      <h3 class="text-sm">
        {{ product.name }}
      </h3>
    </div>

    <SlInputNumber v-if="isAdded" class-input="w-24" name="quantity" hide-label hide-placeholder>
      <template #decrement>
        <SlIcon v-if="showDelete" name="tabler:trash" class="size-4" />
      </template>
    </SlInputNumber>
  </div>
</template>
