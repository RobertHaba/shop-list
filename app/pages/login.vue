<script lang="ts" setup>
definePageMeta({
  middleware: ['unauth'],
})
</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <NuxtLink to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        {{ $t('global.appName') }}
      </NuxtLink>

      <SlCard class="w-full sm:max-w-md" :label="$t('global.login')">
        <LoginForm />
      </SlCard>
    </div>
  </section>
</template>
