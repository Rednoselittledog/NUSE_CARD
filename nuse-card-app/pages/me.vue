<template>
  <CardShell>
    <div class="relative z-10 flex w-full flex-col gap-4 px-6 py-10">
      <h1 class="font-['Mali'] text-xl font-semibold text-navy">สวัสดี {{ user?.name }}</h1>
      <p class="text-sm text-muted-foreground">รหัสนิสิต {{ user?.studentId }}, {{ user?.role }}</p>
      <Button variant="outline" @click="logout">ออกจากระบบ</Button>
    </div>
  </CardShell>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { user, clear } = useUserSession()

async function logout() {
  await clear()
  await navigateTo('/login')
}
</script>
