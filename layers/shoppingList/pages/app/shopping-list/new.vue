<script lang="ts" setup>
import type { z } from 'zod'
import { helpers, type NuxtRoute } from '@typed-router'
import { shoppingListInsertSchema } from '~~/server/database/schema'

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(shoppingListInsertSchema),
})

const { createList } = useListCreate()

const onSubmit = handleSubmit(createList)

const backTo = computed(() => helpers.path(String(router.options.history.state.back) ?? '/app'))

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
    <AppMobileHeader :title="$t('shoppingList.new.title')" :back-to />

    <div class="flex flex-col h-full justify-center">
      <SlCard>
        <form @submit="onSubmit">
          <SlGroupForm>
            <SlInput name="name" text-key="listName" />

            <SlButton class="w-full">
              {{ $t('global.create') }}
            </SlButton>
          </SlGroupForm>
        </form>
      </SlCard>
    </div>
  </NuxtLayout>
</template>
