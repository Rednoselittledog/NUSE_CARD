<template>
  <CardShell>
    <div class="relative z-10 flex w-full flex-col gap-6 px-6 py-10">
      <div class="flex flex-col gap-4">
        <h1 class="font-['Mali'] text-xl font-semibold text-navy">สวัสดี {{ user?.name }}</h1>
        <p class="text-sm text-muted-foreground">รหัสนิสิต {{ user?.studentId }}, {{ user?.role }}</p>
      </div>

      <StampGrid :stamps="stamps ?? []" />

      <JoinButton />

      <Button variant="outline" @click="logout">ออกจากระบบ</Button>
    </div>
  </CardShell>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import StampGrid from '~/components/activity/StampGrid.vue'
import JoinButton from '~/components/card/JoinButton.vue'
import type { AttendanceStamp } from '~/shared/types/attendance'

definePageMeta({ middleware: 'auth' })

const { user, clear } = useUserSession()
const route = useRoute()
const router = useRouter()

const { data: stamps } = await useFetch<AttendanceStamp[]>('/api/me/attendance')

onMounted(() => {
  if (route.query.checkedIn === '1') {
    const activity = typeof route.query.activity === 'string' ? route.query.activity : ''
    toast.success(activity ? `เช็คอิน "${activity}" สำเร็จ` : 'เช็คอินสำเร็จ')
    router.replace({ query: {} })
  }
})

async function logout() {
  await clear()
  await navigateTo('/login')
}
</script>
