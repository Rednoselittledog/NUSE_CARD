<template>
  <CardShell>
    <div class="flex w-full flex-col gap-6 px-6 py-10">
      <NuxtLink to="/activity" class="text-sm text-navy/60">← กลับไปหน้ากิจกรรม</NuxtLink>

      <p v-if="pending" class="text-center text-sm text-navy/60">กำลังโหลด...</p>
      <p v-else-if="!activity" class="text-center text-sm text-navy/60">ไม่พบกิจกรรมนี้</p>

      <template v-else>
        <img v-if="activity.coverImage" :src="activity.coverImage" alt="" class="h-48 w-full rounded-lg object-cover" />

        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <h1 class="font-['Noto_Serif_Thai'] text-xl font-bold text-navy">{{ activity.title }}</h1>
            <Badge :variant="activityStatusBadgeVariant(activity.status)">{{ activityStatusLabel(activity.status) }}</Badge>
          </div>
          <p class="text-sm text-navy/60">{{ formatActivityDateTime(activity.startsAt) }}</p>
          <p v-if="activity.location" class="text-sm text-navy/60">สถานที่: {{ activity.location }}</p>
        </div>

        <p class="text-sm leading-relaxed text-navy/70">{{ activity.description || 'ยังไม่มีรายละเอียดเพิ่มเติม' }}</p>

        <div v-if="isStaff" class="flex flex-col gap-3">
          <div class="flex flex-col gap-1.5">
            <div class="flex gap-2">
              <Button variant="outline" @click="editOpen = true">แก้ไขกิจกรรมนี้</Button>
              <Button variant="destructive" :disabled="deleting" @click="onDelete">
                {{ deleting ? 'กำลังลบ...' : 'ลบกิจกรรมนี้' }}
              </Button>
            </div>
            <p v-if="deleteError" class="text-destructive text-xs">{{ deleteError }}</p>
          </div>

          <CheckinPanel
            v-if="activity.checkinToken"
            :activity-id="activityId"
            :checkin-token="activity.checkinToken"
            :checkin-open="activity.checkinOpen"
            @changed="refresh"
          />
        </div>

        <section class="flex flex-col gap-3 border-t border-dashed border-navy/20 pt-6">
          <h2 class="text-sm font-bold text-navy">ภาพกิจกรรม</h2>
          <GalleryGrid
            :images="images ?? []"
            :activities="allActivities ?? []"
            :is-staff="isStaff"
            :upload-activity-id="activityId"
            @changed="refreshImages"
          />
        </section>
      </template>
    </div>

    <Dialog v-model:open="editOpen">
      <DialogContent class="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>แก้ไขกิจกรรม</DialogTitle>
        </DialogHeader>
        <ActivityForm :initial-value="activity" :loading="saving" :error="formError" @submit="onEditSubmit" />
      </DialogContent>
    </Dialog>
  </CardShell>
</template>

<script setup lang="ts">
import ActivityForm from '~/components/activity/ActivityForm.vue'
import CheckinPanel from '~/components/activity/CheckinPanel.vue'
import GalleryGrid from '~/components/gallery/GalleryGrid.vue'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import type { Activity } from '~/shared/types/activity'
import type { GalleryImage } from '~/shared/types/image'
import { activityStatusBadgeVariant, activityStatusLabel } from '~/shared/utils/activityStatus'
import { formatActivityDateTime } from '~/shared/utils/formatDate'

const route = useRoute()
const activityId = route.params.id as string

const { user } = useUserSession()
const isStaff = computed(() => user.value?.role === 'staff')

const { data: activity, pending, refresh } = await useFetch<Activity>(`/api/activities/${activityId}`)
const { data: images, refresh: refreshImages } = await useFetch<GalleryImage[]>('/api/images', {
  query: { activityId },
})
const { data: allActivities } = await useFetch<Activity[]>('/api/activities')

const editOpen = ref(false)
const saving = ref(false)
const formError = ref('')

async function onEditSubmit(payload: Record<string, unknown>) {
  saving.value = true
  formError.value = ''
  try {
    await $fetch(`/api/activities/${activityId}`, { method: 'PATCH', body: payload })
    editOpen.value = false
    await refresh()
  } catch (err: any) {
    formError.value = err?.data?.statusMessage || err?.statusMessage || 'เกิดข้อผิดพลาด ลองใหม่อีกครั้ง'
  } finally {
    saving.value = false
  }
}

const deleting = ref(false)
const deleteError = ref('')

async function onDelete() {
  if (!confirm(`ลบกิจกรรม "${activity.value?.title}" ใช่ไหม? ลบแล้วกู้คืนไม่ได้`)) return

  deleting.value = true
  deleteError.value = ''
  try {
    await $fetch(`/api/activities/${activityId}`, { method: 'DELETE' })
    await navigateTo('/activity')
  } catch (err: any) {
    deleteError.value = err?.data?.statusMessage || err?.statusMessage || 'ลบไม่สำเร็จ ลองใหม่อีกครั้ง'
  } finally {
    deleting.value = false
  }
}

</script>
