<template>
  <section v-if="upcoming.length" class="mt-8.5 w-full">
    <div class="mb-4 flex w-full items-center gap-2.5">
      <span class="dashed-rule h-0.5 flex-1" aria-hidden="true" />
      <span class="font-['Mali'] text-xs font-semibold whitespace-nowrap text-navy">🗓️ กิจกรรมที่กำลังจะมาถึง</span>
      <span class="dashed-rule h-0.5 flex-1" aria-hidden="true" />
    </div>
    <div :class="upcoming.length > 1 ? 'grid grid-cols-2 gap-3' : 'flex'">
      <NuxtLink v-for="activity in upcoming" :key="activity.id" :to="`/activity/${activity.id}`" class="w-full no-underline">
        <ActivityCard :activity="activity" :orientation="upcoming.length > 1 ? 'vertical' : 'horizontal'" />
      </NuxtLink>
    </div>
    <div class="mt-3 flex w-full justify-center">
      <Button as-child variant="outline" size="sm">
        <NuxtLink to="/activity">ดูทั้งหมด</NuxtLink>
      </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { Activity } from '~/shared/types/activity'

const { data: activities } = await useFetch<Activity[]>('/api/activities')

const upcoming = computed(() => {
  const startOfToday = new Date().setHours(0, 0, 0, 0)
  return (activities.value ?? [])
    .filter((activity) => new Date(activity.startsAt).getTime() >= startOfToday)
    .slice(0, 2)
})
</script>
