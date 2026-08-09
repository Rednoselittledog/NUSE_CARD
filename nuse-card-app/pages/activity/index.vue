<template>
  <CardShell>
    <div class="flex w-full flex-col gap-6 px-6 py-10">
      <div class="text-center">
        <span class="text-kicker text-orange">✦ OUR JOURNEY ✦</span>
        <h1 class="mt-1 font-['Noto_Serif_Thai'] text-2xl font-bold text-navy">NUSE Roadmap</h1>
        <Button v-if="isStaff" size="sm" class="mt-4" @click="openCreate">+ กิจกรรมใหม่</Button>
      </div>

      <p v-if="pending" class="text-center text-sm text-navy/60">กำลังโหลด...</p>
      <p v-else-if="!activities?.length" class="text-center text-sm text-navy/60">ยังไม่มีกิจกรรม</p>
      <ActivityTimeline v-else :activities="activities" @select="openDetail" />

      <section v-if="!loggedIn" class="mt-4 flex flex-col items-center gap-3 border-t border-dashed border-navy/20 pt-6 text-center">
        <h2 class="text-lg font-bold text-navy">Ready to join us?</h2>
        <p class="text-sm text-navy/60">มาเป็นส่วนหนึ่งของการเดินทางไปด้วยกัน</p>
        <div class="flex gap-3">
          <Button as-child variant="default"><NuxtLink to="/login">Login</NuxtLink></Button>
          <Button as-child variant="outline"><NuxtLink to="/register">Register</NuxtLink></Button>
        </div>
      </section>
    </div>

    <Dialog v-model:open="formOpen">
      <DialogContent class="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>กิจกรรมใหม่</DialogTitle>
        </DialogHeader>
        <ActivityForm :loading="saving" :error="formError" @submit="onSubmit" />
      </DialogContent>
    </Dialog>
  </CardShell>
</template>

<script setup lang="ts">
import ActivityForm from '~/components/activity/ActivityForm.vue'
import ActivityTimeline from '~/components/activity/ActivityTimeline.vue'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import type { Activity } from '~/shared/types/activity'

const { user, loggedIn } = useUserSession()
const isStaff = computed(() => user.value?.role === 'staff')

const { data: activities, pending, refresh } = await useFetch<Activity[]>('/api/activities')

function openDetail(activity: Activity) {
  navigateTo(`/activity/${activity.id}`)
}

const formOpen = ref(false)
const saving = ref(false)
const formError = ref('')

function openCreate() {
  formError.value = ''
  formOpen.value = true
}

async function onSubmit(payload: Record<string, unknown>) {
  saving.value = true
  formError.value = ''
  try {
    await $fetch('/api/activities', { method: 'POST', body: payload })
    formOpen.value = false
    await refresh()
  } catch (err: any) {
    formError.value = err?.data?.statusMessage || err?.statusMessage || 'เกิดข้อผิดพลาด ลองใหม่อีกครั้ง'
  } finally {
    saving.value = false
  }
}
</script>
