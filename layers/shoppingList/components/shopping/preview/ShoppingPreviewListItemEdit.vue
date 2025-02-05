<script lang="ts" setup>
import { shoppingListItemsUpdateSchema } from '~~/server/database/schema'

type Item = ApiResponse<'/api/shopping-lists/:listId', 'get'>['items'][0]

interface Props {
  item: Item
}

const { item } = defineProps<Props>()

const shoppingListStore = useShoppingListStore()
const route = useRoute()

const isOpen = ref(false)

const { handleSubmit, isSubmitting, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(shoppingListItemsUpdateSchema),
  initialValues: {
    name: item.name,
    quantity: item.quantity,
  },
  keepValuesOnUnmount: true,
})

const onSubmit = handleSubmit(async (values) => {
  if (!meta.value.dirty) {
    isOpen.value = false
  }

  await shoppingListStore.updateItem(Number(route.params.id), item.id, values)

  resetForm({ values })

  isOpen.value = false
})
</script>

<template>
  <CnDrawer v-model:open="isOpen">
    <CnDrawerTrigger as-child>
      <slot name="trigger" />
    </CnDrawerTrigger>

    <CnDrawerContent>
      <form class="mx-auto w-full flex flex-col gap-2 py-6 max-w-lg">
        <CnDrawerHeader>
          <h2 class="text-left">
            {{ $t('global.edit') }}
          </h2>
        </CnDrawerHeader>

        <div class="px-4 flex flex-wrap gap-3">
          <SlInput class="grow" name="name" hide-label text-key="productName" />

          <SlInputNumber class="max-w-32" name="quantity" hide-label />
        </div>

        <CnDrawerFooter>
          <SlButton type="submit" class="w-full" :disabled="isSubmitting " @click="onSubmit">
            Save
          </SlButton>
        </CnDrawerFooter>
      </form>
    </CnDrawerContent>
  </CnDrawer>
</template>
