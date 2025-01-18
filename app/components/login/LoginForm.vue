<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { userLoginSchema } from '~~/server/database/schema'

const userStore = useUserStore()

const formSchema = toTypedSchema(userLoginSchema)

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  const response = await $fetch('/api/auth/login', {
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
      <SlInput name="email" />

      <SlInput name="password" type="password" />
    </SlGroupForm>

    <CnButton type="submit" class="w-full">
      {{ $t('global.login') }}
    </CnButton>

    {{ errors }}

    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      {{ $t('auth.noAccountYet') }}
      <NuxtLink to="/register" class="font-medium text-primary">
        {{ $t('global.createAccount') }}
      </NuxtLink>
    </p>
  </form>
</template>
