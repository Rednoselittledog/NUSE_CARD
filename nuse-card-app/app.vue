<template>
  <NuxtPage />
  <Analytics />
  <Toaster rich-colors position="top-center" />
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
import { Toaster } from '~/components/ui/sonner'
</script>
