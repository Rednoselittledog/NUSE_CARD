<template>
  <CardShell>
    <div class="flex w-full flex-col gap-8 px-6 py-10">
      <div class="text-center">
        <span class="text-kicker text-orange">✦ GALLERY ✦</span>
        <h1 class="mt-1 font-['Noto_Serif_Thai'] text-2xl font-bold text-navy">คลังภาพกิจกรรม</h1>
      </div>

      <section v-for="group in groups" :key="group.key" class="flex flex-col gap-3">
        <h2 class="text-sm font-bold text-navy">{{ group.title }}</h2>
        <GalleryGrid
          :images="group.images"
          :activities="activities ?? []"
          :is-staff="isStaff"
          :upload-activity-id="group.activityId ?? undefined"
          @changed="refreshAll"
        />
      </section>
    </div>
  </CardShell>
</template>

<script setup lang="ts">
import GalleryGrid from '~/components/gallery/GalleryGrid.vue'
import type { Activity } from '~/shared/types/activity'
import type { GalleryImage } from '~/shared/types/image'

const { user } = useUserSession()
const isStaff = computed(() => user.value?.role === 'staff')

const { data: images, refresh: refreshImages } = await useFetch<GalleryImage[]>('/api/images')
const { data: activities, refresh: refreshActivities } = await useFetch<Activity[]>('/api/activities')

async function refreshAll() {
  await Promise.all([refreshImages(), refreshActivities()])
}

// One section per activity that actually has photos, plus an always-shown
// "other" bucket for unscoped images — or images pointing at an activity
// this viewer can't see (draft/closed activity, non-staff), which keeps
// that activity's title from leaking to a public visitor.
const groups = computed(() => {
  const activityList = activities.value ?? []
  const imageList = images.value ?? []
  const knownIds = new Set(activityList.map((activity) => activity.id))

  const sections = activityList
    .map((activity) => ({
      key: activity.id,
      activityId: activity.id as string | null,
      title: activity.title,
      images: imageList.filter((image) => image.activityId === activity.id),
    }))
    .filter((section) => section.images.length)

  sections.push({
    key: 'other',
    activityId: null,
    title: 'ภาพอื่น ๆ',
    images: imageList.filter((image) => !image.activityId || !knownIds.has(image.activityId)),
  })

  return sections
})
</script>
