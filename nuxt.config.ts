// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode', '@nuxt/eslint', '@nuxtjs/i18n', 'nuxt-auth-utils'],

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
  },

  // Components

  components: [
    {
      path: '~/components/ui',
      pathPrefix: false,
      prefix: 'cn',
      extensions: ['vue'],
    },
  ],

  alias: {
    '@app': './app',
  },

  shadcn: {
    prefix: 'Cn',
    componentDir: './app/components/ui',
  },

  // SERVER

  nitro: {
    experimental: {
      tasks: true,
    },
  },

  // DX

  eslint: {
    config: {
      standalone: false,
    },
  },

  i18n: {
    lazy: true,
    defaultLocale: 'pl',
    restructureDir: 'app',
    locales: [
      { code: 'pl', file: 'pl.json' },
    ],
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
      },
    },
  },
})
