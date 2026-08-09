<template>
  <div class="flex flex-col gap-3 rounded-lg border border-dashed border-navy/20 p-4">
    <div class="flex items-center justify-between gap-2">
      <h2 class="text-sm font-bold text-navy">เช็คอินด้วย QR</h2>
      <Badge :variant="checkinOpen ? 'default' : 'outline'">
        {{ checkinOpen ? 'เปิดรับเช็คอิน' : 'ปิดรับเช็คอิน' }}
      </Badge>
    </div>

    <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR เช็คอิน" class="h-40 w-40 self-center rounded-md border border-navy/10" />

    <div class="flex items-center gap-2">
      <Input :model-value="checkinUrl" readonly class="text-xs" />
      <Button variant="outline" size="sm" @click="copyLink">ก็อปปี้</Button>
    </div>

    <div class="flex gap-2">
      <Button v-if="qrDataUrl" variant="outline" size="sm" as="a" :href="qrDataUrl" download="checkin-qr.png">
        ดาวน์โหลด QR
      </Button>
      <Button variant="outline" size="sm" :disabled="toggling" @click="toggleCheckin">
        {{ toggling ? 'กำลังบันทึก...' : checkinOpen ? 'ปิดรับเช็คอิน' : 'เปิดรับเช็คอิน' }}
      </Button>
    </div>
    <p v-if="toggleError" class="text-destructive text-xs">{{ toggleError }}</p>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'
import { toast } from 'vue-sonner'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

const props = defineProps<{
  activityId: string
  checkinToken: string
  checkinOpen: boolean
}>()

const emit = defineEmits<{ changed: [] }>()

const checkinUrl = computed(() => {
  if (import.meta.server) return ''
  return `${window.location.origin}/checkin/${props.checkinToken}`
})

const qrDataUrl = ref('')

watchEffect(async () => {
  if (!checkinUrl.value) return
  qrDataUrl.value = await QRCode.toDataURL(checkinUrl.value, { width: 240 })
})

async function copyLink() {
  await navigator.clipboard.writeText(checkinUrl.value)
  toast.success('คัดลอกลิงก์แล้ว')
}

const toggling = ref(false)
const toggleError = ref('')

async function toggleCheckin() {
  toggling.value = true
  toggleError.value = ''
  try {
    await $fetch(`/api/activities/${props.activityId}`, {
      method: 'PATCH',
      body: { checkinOpen: !props.checkinOpen },
    })
    emit('changed')
  } catch (err: any) {
    toggleError.value = err?.data?.statusMessage || err?.statusMessage || 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง'
  } finally {
    toggling.value = false
  }
}
</script>
