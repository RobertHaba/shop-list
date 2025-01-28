<template>
  <div class="relative flex flex-col h-screen overflow-hidden">
    <slot name="header" />

    <div class="h-full flex flex-col overflow-auto">
      <slot />
    </div>

    <AppMobileNavbar />
  </div>
</template>
