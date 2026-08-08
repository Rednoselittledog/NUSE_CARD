<template>
  <div class="page-shell box-border flex min-h-screen w-full justify-center sm:px-4 sm:py-14">
    <div class="relative box-border flex w-full max-w-105 flex-col items-center overflow-hidden">
      <BackgroundDecor />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-shell {
  background: linear-gradient(160deg, #fef3e8 0%, #f7f2e8 35%, #eaf1fb 70%, #f7f2e8 100%);
  background-image: radial-gradient(rgba(18, 24, 74, 0.06) 1px, transparent 1.4px),
    linear-gradient(160deg, #fef3e8 0%, #f7f2e8 35%, #eaf1fb 70%, #f7f2e8 100%);
  background-size: 14px 14px, 100% 100%;
}
</style>
