<template>
  <figure class="gallery-item" :style="itemStyle">
    <ExpandableImage :src="src" :alt="alt" placeholder="ภาพกิจกรรม" shape="rect" class="gallery-item__photo" />
  </figure>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    rotate?: number
    shadowColor?: string
  }>(),
  {
    alt: 'ภาพกิจกรรมชมรม',
    rotate: 0,
    shadowColor: 'rgba(18,24,74,.2)',
  }
)

const itemStyle = computed(() => ({
  transform: `rotate(${props.rotate}deg)`,
  boxShadow: `3px 4px 0 ${props.shadowColor}`,
}))
</script>

<style scoped>
.gallery-item {
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 8px 8px 12px;
}

.gallery-item__photo {
  width: 100%;
  aspect-ratio: 1 / 1;
}
</style>
