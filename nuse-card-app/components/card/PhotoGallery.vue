<template>
  <section class="gallery">
    <div class="gallery__divider">
      <span class="gallery__rule" aria-hidden="true"></span>
      <span class="gallery__label">📌 คลังภาพกิจกรรม</span>
      <span class="gallery__rule" aria-hidden="true"></span>
    </div>
    <div v-if="photos.length" class="gallery__row">
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

<style scoped>
.gallery {
  width: 100%;
  margin-top: 34px;
}

.gallery__divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  width: 100%;
}

.gallery__rule {
  flex: 1;
  height: 2px;
  background: repeating-linear-gradient(90deg, rgba(18, 24, 74, 0.3) 0 6px, transparent 6px 11px);
}

.gallery__label {
  font: 600 12px 'Mali', cursive;
  color: var(--color-navy);
  white-space: nowrap;
}

.gallery__row {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}
</style>
