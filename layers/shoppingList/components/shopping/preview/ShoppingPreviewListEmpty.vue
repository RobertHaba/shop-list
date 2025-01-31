<template>
  <div class="flex gap-4">
    <NuxtImg class="shrink-0 h-fit" src="/img/strawberry.png" sizes="80px" />

    <div>
      <h2 class="text-lg font-bold">
        {{ $t('shopping.preview.emptyListTitle') }}
      </h2>

      <p>
        {{ $t('shopping.preview.emptyList') }}
      </p>
    </div>
  </div>
</template>
