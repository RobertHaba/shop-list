// https://nuxt.com/docs/api/configuration/nuxt-config
import { useLayers } from 'nuxt-layers-utils'

const layers = useLayers(__dirname, {

  auth: 'layers/shoppingList',
})

export default defineNuxtConfig({
  compatibilityDate: '2025-01-19',

  extends: layers.extends(),

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    typedPages: true,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    'nuxt-auth-utils',
    '@vee-validate/nuxt',
    'nuxt-lodash',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@formkit/auto-animate',
    '@vueuse/nuxt',
    'nuxt-typed-router',
  ],

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  // Components

  components: [
    {
      path: '~/components/ui/cn',
      pathPrefix: false,
      prefix: 'cn',
      extensions: ['vue'],
    },
    {
      path: '~/components/ui/sl',
      pathPrefix: false,
      prefix: 'sl',
    },
    {
      path: '~/components',
      extensions: ['.vue'],
    },
  ],

  shadcn: {
    prefix: 'Cn',
    componentDir: './app/components/ui/cn',
  },

  colorMode: {
    preference: 'dark',
    classSuffix: '',
  },

  // SERVER

  nitro: {
    experimental: {
      tasks: true,
    },
  },

  // DX
  alias: {
    '@app': './app',
    ...layers.alias(),
  },

  lodash: {
    prefix: 'useLodash',
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  i18n: {
    vueI18n: './i18n/i18n.config.ts',
    defaultLocale: 'pl',
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