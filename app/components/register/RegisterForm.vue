<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { userInsertSchema } from '~~/server/database/schema'

const userStore = useUserStore()

const formSchema = toTypedSchema(userInsertSchema)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  await $fetch('/api/auth/register', {
    method: 'POST',
    body: values,
  })

  const { fetch } = useUserSession()

  await fetch()

  userStore.refreshUser()
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <SlGroupForm>
      <SlInput name="name" />

      <SlInput name="email" />

      <SlInput name="password" type="password" />
    </SlGroupForm>

    <CnButton type="submit" class="w-full">
      {{ $t('global.createAccount') }}
    </CnButton>

    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      {{ $t('auth.youHaveAccountYet') }}
      <NuxtLink to="/login" class="font-medium text-primary">
        {{ $t('global.login') }}
      </NuxtLink>
    </p>
  </form>
</template>
