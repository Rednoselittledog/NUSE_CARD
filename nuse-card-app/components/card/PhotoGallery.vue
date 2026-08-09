<template>
  <section class="mt-8.5 w-full">
    <div class="mb-4 flex w-full items-center gap-2.5">
      <span class="dashed-rule h-0.5 flex-1" aria-hidden="true" />
      <span class="font-['Mali'] text-xs font-semibold whitespace-nowrap text-navy">📌 คลังภาพกิจกรรม</span>
      <span class="dashed-rule h-0.5 flex-1" aria-hidden="true" />
    </div>
    <div v-if="photos.length" class="grid grid-cols-1 gap-4">
      <GalleryItem
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.src"
        :alt="photo.alt"
        :rotate="photo.rotate"
        :shadow-color="photo.shadowColor"
      />
    </div>
    <div class="mt-4 flex w-full justify-center">
      <Button as-child variant="outline" size="sm">
        <NuxtLink to="/gallery">ดูคลังภาพทั้งหมด</NuxtLink>
      </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { GalleryImage } from '~/shared/types/image'

// Featured photos are managed from /gallery (star icon there toggles which
// ones show up here) instead of being committed as files in this repo.
const { data: images } = await useFetch<GalleryImage[]>('/api/images', { query: { featured: true } })

// Scattered-polaroid look cycles through this pattern as more photos are added.
const STYLE_PATTERN = [
  { rotate: -3, shadowColor: 'rgba(18,24,74,.2)' },
  { rotate: 2, shadowColor: 'rgba(232,98,12,.25)' },
]

const photos = computed(() =>
  (images.value ?? []).map((image, index) => ({
    id: image.id,
    src: image.url,
    alt: `ภาพกิจกรรม ${index + 1}`,
    ...STYLE_PATTERN[index % STYLE_PATTERN.length],
  }))
)
</script>
