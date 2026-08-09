<template>
  <form class="flex w-full min-w-0 flex-col gap-4" @submit.prevent="onSubmit">
    <div class="flex flex-col gap-1.5">
      <Label for="title">ชื่อกิจกรรม</Label>
      <Input id="title" v-model="title" type="text" />
      <p v-if="fieldErrors.title" class="text-destructive text-xs">{{ fieldErrors.title }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="description">รายละเอียด</Label>
      <Textarea id="description" v-model="description" />
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="location">สถานที่</Label>
      <Input id="location" v-model="location" type="text" />
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="cover">รูปภาพกิจกรรม</Label>
      <img v-if="coverImage" :src="coverImage" alt="" class="h-32 w-full rounded-md border border-navy/15 object-cover">
      <Input id="cover" type="file" accept="image/*" :disabled="uploading" class="min-w-0" @change="onFileChange" />
      <p v-if="uploading" class="text-xs text-navy/50">กำลังอัปโหลด...</p>
      <p v-if="uploadError" class="text-destructive text-xs">{{ uploadError }}</p>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row">
      <div class="flex min-w-0 flex-1 flex-col gap-1.5">
        <Label for="startsAt">เริ่ม</Label>
        <Input id="startsAt" v-model="startsAt" type="datetime-local" class="min-w-0" />
        <p v-if="fieldErrors.startsAt" class="text-destructive text-xs">{{ fieldErrors.startsAt }}</p>
      </div>
      <div class="flex min-w-0 flex-1 flex-col gap-1.5">
        <Label for="endsAt">สิ้นสุด</Label>
        <Input id="endsAt" v-model="endsAt" type="datetime-local" class="min-w-0" />
        <p v-if="fieldErrors.endsAt" class="text-destructive text-xs">{{ fieldErrors.endsAt }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="status">สถานะ</Label>
      <select
        id="status"
        v-model="status"
        class="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none"
      >
        <option value="draft">ฉบับร่าง</option>
        <option value="published">เปิดรับ</option>
        <option value="closed">ปิดแล้ว</option>
      </select>
    </div>

    <p v-if="error" class="text-destructive text-sm">{{ error }}</p>

    <Button type="submit" :disabled="loading || uploading">
      {{ loading ? 'กำลังบันทึก...' : 'บันทึก' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { activityInputSchema } from '~/shared/validation/activity'
import type { Activity } from '~/shared/types/activity'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'

const props = defineProps<{
  initialValue?: Activity | null
  loading?: boolean
  error?: string
}>()

const emit = defineEmits<{
  submit: [payload: {
    title: string
    description: string | null
    location: string | null
    coverImage: string | null
    startsAt: string
    endsAt: string | null
    status?: 'draft' | 'published' | 'closed'
  }]
}>()

function toLocalInput(iso: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const title = ref(props.initialValue?.title ?? '')
const description = ref(props.initialValue?.description ?? '')
const location = ref(props.initialValue?.location ?? '')
const coverImage = ref(props.initialValue?.coverImage ?? '')
const startsAt = ref(toLocalInput(props.initialValue?.startsAt ?? null))
const endsAt = ref(toLocalInput(props.initialValue?.endsAt ?? null))
const status = ref(props.initialValue?.status ?? 'draft')

const uploading = ref(false)
const uploadError = ref('')

async function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  uploadError.value = ''
  uploading.value = true
  try {
    const body = new FormData()
    body.append('file', file)
    const result = await $fetch<{ url: string }>('/api/uploads', { method: 'POST', body })
    coverImage.value = result.url
  } catch (err: any) {
    uploadError.value = err?.data?.statusMessage || err?.statusMessage || 'อัปโหลดรูปไม่สำเร็จ'
  } finally {
    uploading.value = false
  }
}

const fieldErrors = ref<Record<string, string>>({})

function onSubmit() {
  fieldErrors.value = {}

  const payload = {
    title: title.value,
    description: description.value || null,
    location: location.value || null,
    coverImage: coverImage.value || null,
    startsAt: startsAt.value ? new Date(startsAt.value).toISOString() : '',
    endsAt: endsAt.value ? new Date(endsAt.value).toISOString() : null,
    status: status.value,
  }

  const parsed = activityInputSchema.safeParse(payload)
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0])
      if (!(key in fieldErrors.value)) fieldErrors.value[key] = issue.message
    }
    return
  }

  emit('submit', parsed.data)
}
</script>
