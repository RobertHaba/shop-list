export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: { lazy: true, locales: [{ code: 'pl', file: 'pl.json' }] },
})
