<template>
  <div class="flex flex-col gap-2">
    <div v-if="isStaff && images.length" class="flex items-center justify-between">
      <button type="button" class="text-xs font-semibold text-navy underline" @click="toggleSelectMode">
        {{ selectMode ? 'ยกเลิกเลือก' : 'เลือกรูป' }}
      </button>
      <div v-if="selectMode" class="flex items-center gap-2">
        <button type="button" class="text-xs text-navy/60 underline" @click="selectAll">เลือกทั้งหมด</button>
        <Button size="sm" variant="destructive" :disabled="!selected.size || deleting" @click="onBulkDelete">
          {{ deleting ? 'กำลังลบ...' : `ลบ (${selected.size})` }}
        </Button>
      </div>
    </div>

    <p v-if="!images.length && !pendingUploads.length" class="text-sm text-navy/50">ยังไม่มีรูปภาพ</p>
    <div v-else class="grid grid-cols-3 gap-2">
      <button
        v-for="image in images"
        :key="image.id"
        type="button"
        class="relative aspect-square overflow-hidden rounded-md"
        @click="onCardClick(image)"
      >
        <img :src="image.url" alt="" class="h-full w-full object-cover" :class="{ 'opacity-60': selectMode && selected.has(image.id) }" />
        <span v-if="selectMode && selected.has(image.id)" class="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange text-xs text-white">✓</span>
        <span v-if="!selectMode && image.featured" class="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-orange">★</span>
      </button>

      <div v-for="item in pendingUploads" :key="item.id" class="relative aspect-square overflow-hidden rounded-md">
        <img :src="item.previewUrl" alt="" class="h-full w-full object-cover" :class="{ 'opacity-50': item.status === 'uploading' }" />
        <div v-if="item.status === 'uploading'" class="absolute inset-0 flex items-center justify-center bg-black/20 text-xs text-white">
          กำลังอัป...
        </div>
        <div v-else-if="item.status === 'error'" class="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/70 p-1 text-center text-[10px] text-white">
          <span>{{ item.error }}</span>
          <button type="button" class="underline" @click="dismiss(item.id)">ปิด</button>
        </div>
      </div>
    </div>

    <Input v-if="isStaff" type="file" accept="image/*" multiple @change="onFileChange" />

    <Dialog v-model:open="lightboxOpen">
      <DialogContent class="max-w-md">
        <template v-if="lightboxImage">
          <img :src="lightboxImage.url" alt="" class="max-h-[60vh] w-full rounded-md object-contain" />

          <p v-if="lightboxActivity" class="text-sm text-navy">
            จากกิจกรรม:
            <NuxtLink :to="`/activity/${lightboxActivity.id}`" class="font-semibold text-orange underline" @click="lightboxOpen = false">
              {{ lightboxActivity.title }}
            </NuxtLink>
          </p>
          <p v-else class="text-sm text-navy/50">ไม่ผูกกับกิจกรรมไหน</p>

          <div v-if="isStaff" class="flex flex-col gap-2 border-t border-dashed border-navy/20 pt-3">
            <div class="flex gap-2">
              <Button size="sm" variant="outline" @click="onToggleFeatured(lightboxImage)">
                {{ lightboxImage.featured ? '★ เอาออกจากหน้าแรก' : '☆ ตั้งเป็นรูปเด่นหน้าแรก' }}
              </Button>
              <Button size="sm" variant="destructive" @click="onDeleteOne(lightboxImage)">ลบรูปนี้</Button>
            </div>
            <label class="flex flex-col gap-1 text-xs text-navy/60">
              เปลี่ยนกิจกรรม
              <select
                class="border-input h-9 rounded-md border bg-transparent px-3 text-sm"
                :value="lightboxImage.activityId ?? ''"
                @change="onReassign(lightboxImage, ($event.target as HTMLSelectElement).value || null)"
              >
                <option value="">ไม่ผูกกิจกรรม</option>
                <option v-for="activity in activities" :key="activity.id" :value="activity.id">{{ activity.title }}</option>
              </select>
            </label>
          </div>
        </template>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import type { Activity } from '~/shared/types/activity'
import type { GalleryImage } from '~/shared/types/image'

const props = defineProps<{
  images: GalleryImage[]
  activities: Activity[]
  isStaff: boolean
  uploadActivityId?: string
}>()

const emit = defineEmits<{ changed: [] }>()

const { pendingUploads, enqueue, dismiss } = useImageUploadQueue({
  activityId: props.uploadActivityId,
  onUploaded: () => emit('changed'),
})

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files ?? [])
  input.value = ''
  if (files.length) enqueue(files)
}

// Clicking a card opens the lightbox in normal mode; selection is an
// explicit separate mode (toggled via the "เลือกรูป" button) so browsing
// photos doesn't accidentally select them.
const selectMode = ref(false)
const selected = ref(new Set<string>())

function toggleSelectMode() {
  selectMode.value = !selectMode.value
  selected.value = new Set()
}

function selectAll() {
  selected.value = new Set(props.images.map((image) => image.id))
}

function onCardClick(image: GalleryImage) {
  if (selectMode.value) {
    const next = new Set(selected.value)
    if (next.has(image.id)) next.delete(image.id)
    else next.add(image.id)
    selected.value = next
  } else {
    lightboxImage.value = image
    lightboxOpen.value = true
  }
}

const deleting = ref(false)

async function onBulkDelete() {
  if (!selected.value.size) return
  if (!confirm(`ลบ ${selected.value.size} รูปที่เลือก ใช่ไหม? ลบแล้วกู้คืนไม่ได้`)) return

  deleting.value = true
  try {
    await Promise.all(Array.from(selected.value).map((id) => $fetch(`/api/images/${id}`, { method: 'DELETE' })))
    selected.value = new Set()
    selectMode.value = false
    emit('changed')
  } finally {
    deleting.value = false
  }
}

const lightboxOpen = ref(false)
const lightboxImage = ref<GalleryImage | null>(null)
const lightboxActivity = computed(() => {
  const id = lightboxImage.value?.activityId
  return id ? (props.activities.find((activity) => activity.id === id) ?? null) : null
})

async function onToggleFeatured(image: GalleryImage) {
  await $fetch(`/api/images/${image.id}`, { method: 'PATCH', body: { featured: !image.featured } })
  lightboxOpen.value = false
  emit('changed')
}

async function onDeleteOne(image: GalleryImage) {
  if (!confirm('ลบรูปนี้ใช่ไหม? ลบแล้วกู้คืนไม่ได้')) return
  await $fetch(`/api/images/${image.id}`, { method: 'DELETE' })
  lightboxOpen.value = false
  emit('changed')
}

async function onReassign(image: GalleryImage, activityId: string | null) {
  await $fetch(`/api/images/${image.id}`, { method: 'PATCH', body: { activityId } })
  lightboxOpen.value = false
  emit('changed')
}
</script>
