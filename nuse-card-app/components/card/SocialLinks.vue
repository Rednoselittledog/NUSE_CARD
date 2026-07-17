<template>
  <section class="social" aria-label="ช่องทางติดตามชมรม">
    <div class="social__divider">
      <span class="social__rule" aria-hidden="true"></span>
      <span class="social__label">ติดตามเรา</span>
      <span class="social__rule" aria-hidden="true"></span>
    </div>
    <ul class="social__list">
      <li v-for="link in SOCIAL_LINKS" :key="link.name">
        <a
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="social__button"
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

<style scoped>
.social {
  width: 100%;
}

.social__divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 30px 0 16px;
  width: 100%;
}

.social__rule {
  flex: 1;
  height: 2px;
  background: repeating-linear-gradient(90deg, rgba(18, 24, 74, 0.3) 0 6px, transparent 6px 11px);
}

.social__label {
  font: 600 12px 'Mali', cursive;
  color: var(--color-navy);
  white-space: nowrap;
}

.social__list {
  list-style: none;
  display: flex;
  gap: 16px;
  padding: 0;
  margin: 0;
  justify-content: center;
}

.social__button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.social__button:focus-visible {
  outline: 2px solid var(--color-navy);
  outline-offset: 2px;
}
</style>
