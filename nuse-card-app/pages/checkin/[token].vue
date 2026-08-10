<template>
  <CardShell>
    <div class="relative flex w-full flex-col items-center gap-4 px-6 py-16 text-center">
      <template v-if="state === 'loading'">
        <p class="text-sm text-navy/60">กำลังเช็คอิน...</p>
      </template>

      <template v-else-if="state === 'error'">
        <h1 class="font-['Mali'] text-lg font-semibold text-destructive">เช็คอินไม่สำเร็จ</h1>
        <p class="text-sm text-navy/60">{{ errorMessage }}</p>
        <Button variant="outline" @click="navigateTo('/activity')">กลับหน้ากิจกรรม</Button>
      </template>

      <template v-else>
        <h1 class="font-['Mali'] text-lg font-semibold text-navy">
          {{ state === 'already' ? 'เช็คอินไปแล้ว' : 'เช็คอินสำเร็จ' }}
        </h1>
        <p class="text-sm text-navy/60">{{ activityTitle }}</p>
        <Button variant="outline" @click="navigateTo('/me')">ไปหน้าโปรไฟล์</Button>
      </template>
    </div>
  </CardShell>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Button } from '~/components/ui/button'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const token = route.params.token as string

const state = ref<'loading' | 'success' | 'already' | 'error'>('loading')
const activityTitle = ref('')
const errorMessage = ref('')

onMounted(async () => {
  try {
    const result = await $fetch<{ activity: { id: string; title: string }; alreadyCheckedIn: boolean }>(
      `/api/checkin/${token}`,
      { method: 'POST' },
    )
    activityTitle.value = result.activity.title
    state.value = result.alreadyCheckedIn ? 'already' : 'success'

    if (result.alreadyCheckedIn) {
      toast.info(`เช็คอิน "${result.activity.title}" ไปแล้ว`)
    } else {
      toast.success(`เช็คอิน "${result.activity.title}" สำเร็จ`)
    }

    setTimeout(() => {
      navigateTo({ path: '/me', query: { checkedIn: '1', activity: result.activity.title } })
    }, 1200)
  } catch (err: any) {
    state.value = 'error'
    errorMessage.value = err?.data?.statusMessage || err?.statusMessage || 'เช็คอินไม่สำเร็จ ลองใหม่อีกครั้ง'
  }
})
</script>
