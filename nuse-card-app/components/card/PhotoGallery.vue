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
  </section>
</template>

<script setup lang="ts">
// Drop image files into assets/images/gallery/ — every file there shows up
// here automatically (sorted by filename), no code changes needed.
// Supported: .jpg, .jpeg, .png, .webp
const galleryImages = import.meta.glob('../../assets/images/gallery/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

// Scattered-polaroid look cycles through this pattern as more photos are added.
const STYLE_PATTERN = [
  { rotate: -3, shadowColor: 'rgba(18,24,74,.2)' },
  { rotate: 2, shadowColor: 'rgba(232,98,12,.25)' },
]

const photos = computed(() =>
  Object.keys(galleryImages)
    .sort()
    .map((path, index) => ({
      id: path,
      src: galleryImages[path],
      alt: `ภาพกิจกรรม ${index + 1}`,
      ...STYLE_PATTERN[index % STYLE_PATTERN.length],
    }))
)
</script>
