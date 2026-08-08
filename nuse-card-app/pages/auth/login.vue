<template>
  <CardShell>
    <div class="relative z-10 flex w-full flex-col gap-6 px-6 py-10">
      <h1 class="font-['Mali'] text-xl font-semibold text-navy">เข้าสู่ระบบ</h1>
      <AuthForm mode="login" @success="navigateTo('/')" />
      <p class="text-sm text-muted-foreground">
        ยังไม่มีบัญชี? <NuxtLink to="/register" class="underline">สมัครสมาชิก</NuxtLink>
      </p>
    </div>
  </CardShell>
</template>

<script setup lang="ts">
// File lives under pages/auth/ for tidiness, but the URL stays /login —
// pages/activity.vue already links here directly.
definePageMeta({ path: '/login' })
</script>
