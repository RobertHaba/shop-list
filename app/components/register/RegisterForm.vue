<script lang="ts" setup>
import { AuthState } from '#components'
import { toTypedSchema } from '@vee-validate/zod'
import { userRegisterSchema } from '~~/schema'

const userStore = useUserStore()

const formSchema = toTypedSchema(userRegisterSchema)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  const response = await $fetch('/api/auth/register', {
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
    <AuthState v-slot="{ loggedIn }">
      {{ loggedIn }}
    </AuthState>

    <SlGroupForm>
      <SlInput name="name" />

      <SlInput name="email" />

      <SlInput name="password" />
    </SlGroupForm>

    <CnButton type="submit" class="w-full">
      {{ $t('global.createAccount') }}
    </CnButton>

    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
    </p>
  </form>
</template>

<style>

</style>
