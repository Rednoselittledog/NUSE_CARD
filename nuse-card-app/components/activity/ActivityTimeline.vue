<template>
  <div class="timeline">
    <svg
      class="road-svg"
      viewBox="0 0 360 1050"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path
        class="road-shadow"
        d="M 180 -30 C 90 70, 90 150, 180 250 C 270 350, 270 430, 180 525 C 90 620, 90 700, 180 795 C 270 890, 270 960, 205 1080"
      />
      <path
        class="road"
        d="M 180 -30 C 90 70, 90 150, 180 250 C 270 350, 270 430, 180 525 C 90 620, 90 700, 180 795 C 270 890, 270 960, 205 1080"
      />
      <path
        class="road-center"
        d="M 180 -30 C 90 70, 90 150, 180 250 C 270 350, 270 430, 180 525 C 90 620, 90 700, 180 795 C 270 890, 270 960, 205 1080"
      />
    </svg>
    <ActivityStation
      v-for="(activity, index) in activities"
      :key="activity.id"
      :activity="activity"
      :index="index"
      :time-state="activityTimeState(activities, index, now)"
      @select="$emit('select', activity)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ActivityStation from './ActivityStation.vue'
import type { Activity } from '~/shared/types/activity'
import { activityTimeState } from '~/shared/utils/activityStatus'

const props = defineProps<{ activities: Activity[] }>()
defineEmits<{ select: [activity: Activity] }>()

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => { now.value = Date.now() }, 60_000)
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.timeline {
  position: relative;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  height: 1050px; /* กำหนดความสูงตายตัวตาม SVG Roadmap Mockup */
}

.road-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1050px;
  z-index: 1;
  pointer-events: none;
}

.road-shadow {
  fill: none;
  stroke: rgba(0, 0, 0, 0.13);
  stroke-width: 43;
  stroke-linecap: round;
}

.road {
  fill: none;
  stroke: var(--color-navy, #11184f);
  stroke-width: 36;
  stroke-linecap: round;
}

.road-center {
  fill: none;
  stroke: rgba(255, 255, 255, 0.72);
  stroke-width: 1.5;
  stroke-dasharray: 8 10;
  stroke-linecap: round;
}
</style>