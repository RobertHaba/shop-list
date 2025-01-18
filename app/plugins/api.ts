export default defineNuxtPlugin(() => {
  const { session } = useUserSession()
  const { toastError } = useToast()

  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    onRequest({ options }) {
      if (session.value?.token) {
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        options.headers.set('Authorization', `Bearer ${session.value?.token}`)
      }
    },
    async onResponseError({ response }) {
      const { $i18n } = useNuxtApp()

      toastError({ message: $i18n.t(response.statusText) })
    },
  })

  return {
    provide: {
      api,
    },
  }
})
