<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { userLoginSchema } from '~~/server/database/schema'

const { $api } = useNuxtApp()

const userStore = useUserStore()

const { toastSuccess } = useToast()

const formSchema = toTypedSchema(userLoginSchema)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  const response = await $api('/auth/login', {
    method: 'POST',
    body: values,
  })

  const { fetch } = useUserSession()

  await fetch()

  userStore.refreshUser()
})
</script>

<template>
  <button
    variant="outline" @click="() => toastSuccess({ message: 'Event added to calendar' })"
  >
    Add to calendar
  </button>

  <form class="flex flex-col gap-4" @submit="onSubmit">
    <SlGroupForm>
      <SlInput name="email" />

      <SlInput name="password" type="password" />
    </SlGroupForm>

    <CnButton type="submit" class="w-full">
      {{ $t('global.login') }}
    </CnButton>

    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      {{ $t('auth.noAccountYet') }}
      <NuxtLink to="/register" class="font-medium text-primary">
        {{ $t('global.createAccount') }}
      </NuxtLink>
    </p>
  </form>
</template>
