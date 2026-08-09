<template>
  <div class="page-shell box-border flex min-h-screen w-full justify-center sm:px-4 sm:py-14">
    <div class="relative box-border flex w-full max-w-105 flex-col items-center overflow-hidden">
      <BackgroundDecor />

      <div v-if="isHome" class="absolute top-4 right-4 z-20">
        <AuthNav />
      </div>
      <nav v-else class="relative z-20 flex w-full items-center justify-between px-4 py-3">
        <NuxtLink to="/" aria-label="กลับหน้าแรก">
          <img :src="logoUrl" alt="NUSE" class="size-9 rounded-full border-2 border-navy bg-white object-contain p-1 shadow-brutal-sm" />
        </NuxtLink>
        <AuthNav />
      </nav>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import logoUrl from '~/assets/images/nuse-logo.png'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<style scoped>
.page-shell {
  background: linear-gradient(160deg, var(--color-cream-light) 0%, var(--color-cream) 35%, var(--color-blue-pale) 70%, var(--color-cream) 100%);
  background-image: radial-gradient(rgba(18, 24, 74, 0.06) 1px, transparent 1.4px),
    linear-gradient(160deg, var(--color-cream-light) 0%, var(--color-cream) 35%, var(--color-blue-pale) 70%, var(--color-cream) 100%);
  background-size: 14px 14px, 100% 100%;
}
</style>
