<template>
  <figure class="m-0 box-border flex w-full flex-col items-center bg-white p-2 pb-3" :style="itemStyle">
    <ExpandableImage :src="src" :alt="alt" placeholder="ภาพกิจกรรม" shape="rect" class="aspect-square w-full" />
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
    shadowColor: 'color-mix(in oklab, var(--color-navy) 20%, transparent)',
  }
)

const itemStyle = computed(() => ({
  transform: `rotate(${props.rotate}deg)`,
  boxShadow: `3px 4px 0 ${props.shadowColor}`,
}))
</script>
