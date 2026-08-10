<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-baseline justify-between">
      <h2 class="text-sm font-bold text-navy">แสตมป์กิจกรรม</h2>
      <span class="text-xs font-bold text-orange">สะสมแล้ว {{ stamps.length }} ดวง</span>
    </div>

    <p v-if="!stamps.length" class="text-sm text-navy/60">ยังไม่มีแสตมป์ ไปเช็คอินกิจกรรมแรกกันเลย!</p>

    <div v-else class="grid grid-cols-3 gap-3 sm:grid-cols-4">
      <NuxtLink
        v-for="(stamp, index) in stamps"
        :key="stamp.activityId"
        :to="`/activity/${stamp.activityId}`"
        class="flex flex-col items-center gap-1 text-center"
      >
        <span class="stamp-marker" :class="`marker-${stationMarkerColor(index)}`">
          <img :src="fallbackLogo" alt="" class="stamp-logo" />
        </span>
        <span class="line-clamp-1 max-w-20 text-[11px] font-semibold text-navy">{{ stamp.title }}</span>
        <span class="text-[10px] text-navy/50">{{ formatActivityDate(stamp.checkedInAt) }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import fallbackLogo from '~/assets/images/activity-placeholder.png'
import type { AttendanceStamp } from '~/shared/types/attendance'
import { formatActivityDate } from '~/shared/utils/formatDate'
import { stationMarkerColor } from '~/shared/utils/stationMarker'

defineProps<{ stamps: AttendanceStamp[] }>()
</script>

<style scoped>
.stamp-marker {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  padding: 10px;
  border-radius: 999px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.14);
  overflow: hidden;
}

.stamp-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.marker-orange { background: var(--color-orange); }
.marker-navy { background: var(--color-navy); }
.marker-blue { background: var(--color-blue); }
.marker-pink { background: var(--color-pink); }
</style>
