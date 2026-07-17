<template>
  <div class="cover">
    <ExpandableImage
      :src="src"
      alt="ปกกิจกรรมชมรม"
      placeholder="ปกกิจกรรมชมรม"
      shape="rounded"
      :radius="10"
      object-position="center 67%"
      eager
      class="cover__image"
    />
    <div class="cover__overlay" aria-hidden="true"></div>
    <div class="cover__shadow" aria-hidden="true"></div>
    <span class="cover__tape cover__tape--left" aria-hidden="true"></span>
    <span class="cover__tape cover__tape--right" aria-hidden="true"></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<style scoped>
.cover {
  position: relative;
  width: 100%;
  height: 132px;
  z-index: 1;
  margin-top: 14px;
  padding: 0 14px;
  box-sizing: border-box;
}

.cover__image {
  width: 100%;
  height: 100%;
}

.cover__overlay {
  position: absolute;
  inset: 0 14px;
  background: linear-gradient(120deg, rgba(232, 98, 12, 0.3) 0%, transparent 55%, rgba(18, 24, 74, 0.35) 100%);
  border-radius: 10px;
  pointer-events: none;
}

.cover__shadow {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 0;
  height: 60px;
  background: linear-gradient(to top, rgba(18, 24, 74, 0.65) 0%, rgba(18, 24, 74, 0) 100%);
  border-radius: 0 0 10px 10px;
  pointer-events: none;
}

.cover__tape {
  position: absolute;
  top: -10px;
  width: 54px;
  height: 22px;
  opacity: 0.85;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.cover__tape--left {
  left: 26px;
  background: var(--color-blue-light);
  transform: rotate(-8deg);
}

.cover__tape--right {
  right: 30px;
  background: var(--color-orange);
  transform: rotate(9deg);
}
</style>
