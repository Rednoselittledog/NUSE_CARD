<template>
  <Dialog :open="!!activity" @update:open="(v) => !v && $emit('close')">
    <DialogContent v-if="activity" class="max-h-[85vh] overflow-y-auto">
      <img v-if="activity.coverImage" :src="activity.coverImage" alt="" class="mb-2 h-40 w-full rounded-lg object-cover" />
      <DialogHeader>
        <div class="flex items-center gap-2">
          <DialogTitle class="text-navy">{{ activity.title }}</DialogTitle>
          <Badge :variant="activityStatusBadgeVariant(activity.status)">{{ activityStatusLabel(activity.status) }}</Badge>
        </div>
        <DialogDescription>{{ formatActivityDateTime(activity.startsAt) }}</DialogDescription>
      </DialogHeader>

      <p v-if="activity.location" class="text-sm text-navy/70">สถานที่: {{ activity.location }}</p>
      <p class="text-sm leading-relaxed text-navy/70">{{ activity.description || 'ยังไม่มีรายละเอียดเพิ่มเติม' }}</p>

      <Button v-if="isStaff" variant="outline" @click="$emit('edit', activity)">แก้ไขกิจกรรมนี้</Button>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import type { Activity } from '~/shared/types/activity'
import { activityStatusBadgeVariant, activityStatusLabel } from '~/shared/utils/activityStatus'
import { formatActivityDateTime } from '~/shared/utils/formatDate'

defineProps<{
  activity: Activity | null
  isStaff?: boolean
}>()

defineEmits<{
  close: []
  edit: [activity: Activity]
}>()
</script>
