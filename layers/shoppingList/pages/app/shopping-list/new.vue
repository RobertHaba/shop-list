<script lang="ts" setup>
import type { z } from 'zod'
import { shoppingListInsertSchema } from '~~/server/database/schema'

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(shoppingListInsertSchema),
})

const { createList } = useListCreate()

const onSubmit = handleSubmit(createList)

function useListCreate() {
  async function createList(values: z.infer<typeof shoppingListInsertSchema>) {
    const response = await $fetch('/api/shopping-lists', {
      method: 'POST',
      body: values,
    })

    if (response) {
      router.push(`/app/shopping-list/${response.id}`)
    }
  }

  return {
    createList,
  }
}
</script>

<template>
  <NuxtLayout name="app-container">
    <SlTextHeader :text="$t('shoppingList.new.title')" />

    <div class="flex flex-col h-full justify-center">
      <form @submit="onSubmit">
        <SlGroupForm>
          <SlInput name="name" text-key="listName" />

          <SlButton>{{ $t('global.create') }}</SlButton>
        </SlGroupForm>
      </form>
    </div>
  </NuxtLayout>
</template>
