<template>
  <div class="page-shell box-border flex min-h-screen w-full justify-center sm:px-4 sm:py-14">
    <div class="relative box-border flex w-full max-w-105 flex-col items-center overflow-hidden">
      <BackgroundDecor />
      <AuthNav />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-shell {
  background: linear-gradient(160deg, var(--color-cream-light) 0%, var(--color-cream) 35%, var(--color-blue-pale) 70%, var(--color-cream) 100%);
  background-image: radial-gradient(rgba(18, 24, 74, 0.06) 1px, transparent 1.4px),
    linear-gradient(160deg, var(--color-cream-light) 0%, var(--color-cream) 35%, var(--color-blue-pale) 70%, var(--color-cream) 100%);
  background-size: 14px 14px, 100% 100%;
}
</style>
