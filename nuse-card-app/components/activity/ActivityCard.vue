<template>
  <div class="activity-card" :class="orientation">
    <div class="activity-card-cover">
      <ExpandableImage v-if="activity.coverImage" :src="activity.coverImage" shape="rounded" :radius="5" :expandable="false" />
      <div v-else class="activity-card-cover-fallback">
        <img :src="fallbackLogo" alt="" />
      </div>
    </div>
    <span class="activity-card-info">
      <span v-if="label" class="activity-card-label">{{ label }}</span>
      <strong>{{ activity.title }}</strong>
      <small>{{ formatActivityDate(activity.startsAt) }}</small>
      <em :class="`status-text-${activity.status}`">{{ activityStatusLabel(activity.status) }}</em>
    </span>
  </div>
</template>

<script setup lang="ts">
import fallbackLogo from '~/assets/images/activity-placeholder.png'
import type { Activity } from '~/shared/types/activity'
import { activityStatusLabel } from '~/shared/utils/activityStatus'
import { formatActivityDate } from '~/shared/utils/formatDate'

withDefaults(
  defineProps<{
    activity: Activity
    label?: string
    orientation?: 'vertical' | 'horizontal'
  }>(),
  {
    orientation: 'vertical',
  }
)
</script>

<style scoped>
.activity-card {
  border-radius: 7px;
  border: 1px solid rgba(18, 24, 74, 0.15);
  background: rgba(255, 250, 241, 0.93);
  backdrop-filter: blur(4px);
  box-sizing: border-box;
}

.activity-card.vertical {
  display: block;
  min-width: 108px;
  max-width: 145px;
  padding: 6px 8px;
}

.activity-card.horizontal {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px;
}

.activity-card-cover {
  display: block;
}

.activity-card-cover-fallback {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.activity-card-cover-fallback img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.activity-card.vertical .activity-card-cover {
  width: 100%;
  aspect-ratio: 1 / 1;
  /* capped: the roadmap stacks these on a fixed 174px pitch (ActivityStation.vue);
     an uncapped square could grow past that on a wide card and overlap the next station */
  max-height: 84px;
  margin-bottom: 4px;
}

.activity-card.horizontal .activity-card-cover {
  width: 80px;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
}

.activity-card-info {
  display: block;
  min-width: 0;
}

.activity-card-label {
  display: block;
  color: var(--color-muted-foreground);
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.8px;
}

.activity-card-info strong {
  display: block;
  margin: 2px 0;
  color: var(--color-navy);
  font-size: 14px;
  font-weight: 900;
  line-height: 1.15;
}

.activity-card-info small {
  display: block;
  color: var(--color-orange);
  font-size: 8px;
  font-weight: 900;
}

.activity-card-info em {
  display: block;
  margin-top: 2px;
  font-style: normal;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.status-text-published { color: var(--color-orange); }
.status-text-closed { color: var(--color-navy); }
.status-text-draft { color: var(--color-muted-foreground); }
</style>
