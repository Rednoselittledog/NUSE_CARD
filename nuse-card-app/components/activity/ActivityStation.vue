<template>
  <button
    type="button"
    class="milestone"
    :class="[`status-${activity.status}`, side]"
    :style="{ top: `${65 + index * 174}px` }"
    @click="$emit('select')"
  >
    <span class="milestone-info">
      <img v-if="activity.coverImage" :src="activity.coverImage" alt="" class="milestone-cover" />
      <span class="milestone-label">{{ index + 1 }}{{ ordinalSuffix }} STATION</span>
      <strong>{{ activity.title }}</strong>
      <small>{{ formatActivityDate(activity.startsAt) }}</small>
      <em :class="`status-text-${activity.status}`">{{ activityStatusLabel(activity.status) }}</em>
    </span>

    <span class="marker" :class="`marker-${color}`">
      <span>{{ String(index + 1).padStart(2, '0') }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Activity } from '~/shared/types/activity'
import { activityStatusLabel } from '~/shared/utils/activityStatus'
import { formatActivityDate } from '~/shared/utils/formatDate'
import { stationMarkerColor } from '~/shared/utils/stationMarker'

const props = defineProps<{
  activity: Activity
  index: number
}>()

defineEmits<{ select: [] }>()

const color = computed(() => stationMarkerColor(props.index))
const side = computed(() => (props.index % 2 === 0 ? 'left' : 'right'))

const ordinalSuffix = computed(() => {
  const n = props.index + 1
  if (n === 1) return 'st'
  if (n === 2) return 'nd'
  if (n === 3) return 'rd'
  return 'th'
})
</script>

<style scoped>
.milestone {
  position: absolute;
  z-index: 8;
  display: flex;
  align-items: center;
  gap: 8px;
  width: auto;
  max-width: 245px;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.milestone.left { left: 5%; }
.milestone.right { right: 4%; flex-direction: row-reverse; }

.marker {
  position: relative;
  z-index: 10;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% 50% 50% 8px;
  transform: rotate(-45deg);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.14);
}

.marker > span {
  transform: rotate(45deg);
  color: white;
  font-size: 14px;
  font-weight: 900;
}

.marker-orange { background: var(--color-orange, #f47a21); }
.marker-navy { background: var(--color-navy, #11184f); }
.marker-blue { background: var(--color-blue, #42aeca); }
.marker-pink { background: var(--color-pink, #df5572); }

.milestone-info {
  display: block;
  min-width: 108px;
  max-width: 145px;
  padding: 6px 8px;
  border-radius: 7px;
  background: rgba(255, 250, 241, 0.93);
  backdrop-filter: blur(4px);
  box-sizing: border-box;
}

.milestone-cover {
  display: block;
  width: 100%;
  height: 54px;
  margin-bottom: 4px;
  border-radius: 5px;
  object-fit: cover;
}

.milestone-label {
  display: block;
  color: #999;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.8px;
}

.milestone-info strong {
  display: block;
  margin: 2px 0;
  color: var(--color-navy, #11184f);
  font-size: 14px;
  font-weight: 900;
  line-height: 1.15;
}

.milestone-info small {
  display: block;
  color: var(--color-orange, #f47a21);
  font-size: 8px;
  font-weight: 900;
}

.milestone-info em {
  display: block;
  margin-top: 2px;
  font-style: normal;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.status-text-published { color: var(--color-orange, #f47a21); }
.status-text-closed { color: var(--color-navy, #11184f); }
.status-text-draft { color: #aaa; }

.milestone.status-draft { opacity: 0.42; filter: grayscale(0.45); }
.milestone.status-closed { opacity: 0.68; }
.milestone.status-published { opacity: 1; }
</style>