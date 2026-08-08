<template>
  <section class="w-full" aria-label="ช่องทางติดตามชมรม">
    <div class="my-7.5 mb-4 flex w-full items-center gap-2.5">
      <span class="dashed-rule h-0.5 flex-1" aria-hidden="true" />
      <span class="font-['Mali'] text-xs font-semibold whitespace-nowrap text-navy">ติดตามเรา</span>
      <span class="dashed-rule h-0.5 flex-1" aria-hidden="true" />
    </div>
    <ul class="m-0 flex list-none justify-center gap-4 p-0">
      <li v-for="link in SOCIAL_LINKS" :key="link.name">
        <a
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="flex size-12 items-center justify-center rounded-full no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          :style="{
            background: link.background,
            transform: `rotate(${link.rotate}deg)`,
            boxShadow: `3px 3px 0 ${link.shadowColor}`,
          }"
          :aria-label="link.name"
        >
          <component :is="icons[link.icon]" />
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { SOCIAL_LINKS } from '~/constants/links'
import IconFacebook from '~/components/icons/IconFacebook.vue'
import IconInstagram from '~/components/icons/IconInstagram.vue'
import IconTiktok from '~/components/icons/IconTiktok.vue'

// Dynamic `<component :is>` needs an actual component reference, not just the
// auto-imported tag name as a string — map the SOCIAL_LINKS icon name here.
const icons: Record<string, unknown> = { IconFacebook, IconInstagram, IconTiktok }
</script>
