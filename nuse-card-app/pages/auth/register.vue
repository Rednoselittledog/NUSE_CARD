<template>
  <CardShell>
    <div class="relative flex w-full flex-col gap-6 px-6 py-10">
      <h1 class="font-['Mali'] text-xl font-semibold text-navy">สมัครสมาชิก</h1>
      <AuthForm mode="register" @success="onSuccess" />
      <p class="text-sm text-muted-foreground">
        มีบัญชีอยู่แล้ว? <NuxtLink to="/login" class="underline">เข้าสู่ระบบ</NuxtLink>
      </p>
    </div>
  </CardShell>
</template>

<script setup lang="ts">
// File lives under pages/auth/ for tidiness, but the URL stays /register —
// pages/activity.vue already links here directly.
definePageMeta({ path: '/register' })

const route = useRoute()

function onSuccess() {
  const redirect = route.query.redirect
  const target = typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/'
  return navigateTo(target)
}
</script>
