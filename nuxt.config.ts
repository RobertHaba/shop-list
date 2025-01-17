// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode', '@nuxt/eslint'],

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

  // DX

  eslint: {
    config: {
      standalone: false,
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
      },
    },
  },
})
