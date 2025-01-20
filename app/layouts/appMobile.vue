<template>
  <div class="relative flex flex-col h-screen overflow-hidden">
    <slot name="header" />

    <div class="h-full flex flex-col">
      <slot />
    </div>

    <AppMobileNavbar />
  </div>
</template>
