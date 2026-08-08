<template>
  <div class="relative z-30 -mt-10 flex h-27 w-27 items-center justify-center">
    <span
      class="animate-avatar-wiggle absolute inset-0 rounded-full border-[2.5px] border-dashed border-navy opacity-50"
      aria-hidden="true"
    />
    <Avatar class="size-24 rounded-full bg-white p-1.5 shadow-[4px_4px_0_rgba(18,24,74,0.9)]">
      <AvatarImage :src="src ?? ''" :alt="alt" class="rounded-full object-contain p-2" />
      <AvatarFallback class="rounded-full text-[10px] font-medium text-navy/40">โลโก้/ภาพชมรม</AvatarFallback>
    </Avatar>
    <span
      class="absolute -right-3.5 -bottom-0.5 rounded-full px-2.5 py-1 font-['Mali'] text-[10.5px] font-bold tracking-wide text-white shadow-[2px_2px_0_rgba(18,24,74,0.9)]"
      :style="{ background: 'var(--color-orange)' }"
    >{{ badgeText }}</span>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

withDefaults(
  defineProps<{
    src?: string
    alt?: string
    badgeText?: string
  }>(),
  {
    alt: 'โลโก้ชมรม NUSE',
    badgeText: 'รุ่นที่ 1',
  }
)
</script>
