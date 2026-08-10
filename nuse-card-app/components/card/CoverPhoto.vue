<template>
  <div class="relative mt-3.5 box-border h-33 w-full px-3.5">
    <ExpandableImage
      :src="src"
      alt="ปกกิจกรรมชมรม"
      placeholder="ปกกิจกรรมชมรม"
      shape="rounded"
      :radius="10"
      object-position="center 67%"
      eager
      class="h-full w-full"
    />
    <div
      class="pointer-events-none absolute inset-y-0 inset-x-3.5 rounded-lg"
      style="background: linear-gradient(120deg, color-mix(in oklab, var(--color-orange) 30%, transparent) 0%, transparent 55%, color-mix(in oklab, var(--color-navy) 35%, transparent) 100%)"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-x-3.5 bottom-0 h-15 rounded-b-lg"
      style="background: linear-gradient(to top, color-mix(in oklab, var(--color-navy) 65%, transparent) 0%, transparent 100%)"
      aria-hidden="true"
    />
    <span
      class="absolute -top-2.5 left-6.5 h-5.5 w-13.5 rotate-[-8deg] bg-blue-light opacity-85 shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
      aria-hidden="true"
    />
    <span
      class="absolute -top-2.5 right-7.5 h-5.5 w-13.5 rotate-[9deg] bg-orange opacity-85 shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>
