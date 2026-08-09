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

        <Button v-if="isStaff" variant="outline" class="self-start" @click="editOpen = true">แก้ไขกิจกรรมนี้</Button>

        <section class="flex flex-col gap-3 border-t border-dashed border-navy/20 pt-6">
          <h2 class="text-sm font-bold text-navy">ภาพกิจกรรม</h2>
          <p v-if="!activity.gallery.length && !pendingUploads.length" class="text-sm text-navy/50">ยังไม่มีรูปภาพ</p>
          <div v-else class="grid grid-cols-3 gap-2">
            <div v-for="url in activity.gallery" :key="url" class="group relative aspect-square overflow-hidden rounded-md">
              <img :src="url" alt="" class="h-full w-full object-cover" />
              <button
                v-if="isStaff"
                type="button"
                class="absolute top-1 right-1 hidden h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white group-hover:flex"
                aria-label="ลบรูปนี้"
                @click="removePhoto(url)"
              >
                ×
              </button>
            </div>

            <div v-for="item in pendingUploads" :key="item.id" class="relative aspect-square overflow-hidden rounded-md">
              <img :src="item.previewUrl" alt="" class="h-full w-full object-cover" :class="{ 'opacity-50': item.status === 'uploading' }" />
              <div v-if="item.status === 'uploading'" class="absolute inset-0 flex items-center justify-center bg-black/20 text-xs text-white">
                กำลังอัป...
              </div>
              <div v-else-if="item.status === 'error'" class="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/70 p-1 text-center text-[10px] text-white">
                <span>{{ item.error }}</span>
                <button type="button" class="underline" @click="dismissFailedUpload(item.id)">ปิด</button>
              </div>
            </div>
          </div>

          <div v-if="isStaff" class="flex flex-col gap-1.5">
            <Input type="file" accept="image/*" multiple @change="onGalleryFileChange" />
            <p class="text-xs text-navy/40">รูปจะถูกย่อขนาดอัตโนมัติก่อนอัปโหลด (สำหรับดูเท่านั้น ไม่เก็บไฟล์ต้นฉบับ)</p>
          </div>
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
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import type { Activity } from '~/shared/types/activity'
import { activityStatusBadgeVariant, activityStatusLabel } from '~/shared/utils/activityStatus'
import { formatActivityDateTime } from '~/shared/utils/formatDate'

const route = useRoute()
const activityId = route.params.id as string

const { user } = useUserSession()
const isStaff = computed(() => user.value?.role === 'staff')

const { data: activity, pending, refresh } = await useFetch<Activity>(`/api/activities/${activityId}`)

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

interface PendingUpload {
  id: string
  file: File
  previewUrl: string
  status: 'pending' | 'uploading' | 'error'
  error?: string
}

const pendingUploads = ref<PendingUpload[]>([])
let queueRunning = false

function onGalleryFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files ?? [])
  input.value = ''
  if (!files.length) return

  for (const file of files) {
    pendingUploads.value.push({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      status: 'pending',
    })
  }
  runUploadQueue()
}

// Uploaded one at a time (not in parallel) so each PATCH reads the gallery
// array right after the previous save — two concurrent PATCHes would each
// read a stale array and the second write would silently drop the first
// photo.
async function runUploadQueue() {
  if (queueRunning) return
  queueRunning = true
  try {
    let next = pendingUploads.value.find((item) => item.status === 'pending')
    while (next) {
      await uploadOne(next)
      next = pendingUploads.value.find((item) => item.status === 'pending')
    }
  } finally {
    queueRunning = false
  }
}

async function uploadOne(item: PendingUpload) {
  item.status = 'uploading'
  try {
    const resized = await resizeForUpload(item.file)
    const body = new FormData()
    body.append('file', resized)
    const result = await $fetch<{ url: string }>('/api/uploads', { method: 'POST', body })

    if (activity.value) {
      await $fetch(`/api/activities/${activityId}`, {
        method: 'PATCH',
        body: { gallery: [...activity.value.gallery, result.url] },
      })
      await refresh()
    }

    URL.revokeObjectURL(item.previewUrl)
    pendingUploads.value = pendingUploads.value.filter((p) => p.id !== item.id)
  } catch (err: any) {
    item.status = 'error'
    item.error = err?.data?.statusMessage || err?.statusMessage || 'อัปโหลดไม่สำเร็จ'
  }
}

function dismissFailedUpload(id: string) {
  const item = pendingUploads.value.find((p) => p.id === id)
  if (item) URL.revokeObjectURL(item.previewUrl)
  pendingUploads.value = pendingUploads.value.filter((p) => p.id !== id)
}

// Gallery photos are for browsing, not archival — shrink to a reasonable
// viewing size before upload so storage isn't spent on full-resolution
// camera photos. Skips GIFs (would lose animation) and falls back to the
// original file if the browser can't decode/canvas it.
const GALLERY_MAX_DIMENSION = 1280
const GALLERY_JPEG_QUALITY = 0.8

async function resizeForUpload(file: File): Promise<File> {
  if (file.type === 'image/gif') return file

  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, GALLERY_MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    ctx.drawImage(bitmap, 0, 0, width, height)

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', GALLERY_JPEG_QUALITY))
    if (!blob) return file

    return new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' })
  } catch {
    return file
  }
}

async function removePhoto(url: string) {
  if (!activity.value) return
  await $fetch(`/api/activities/${activityId}`, {
    method: 'PATCH',
    body: { gallery: activity.value.gallery.filter((u) => u !== url) },
  })
  await refresh()
}
</script>
