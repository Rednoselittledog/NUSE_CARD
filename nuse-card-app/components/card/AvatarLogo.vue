<template>
  <div class="avatar">
    <div class="avatar__ring" aria-hidden="true"></div>
    <div class="avatar__circle">
      <ExpandableImage
        :src="src"
        :alt="alt"
        placeholder="โลโก้/ภาพชมรม"
        shape="circle"
        :expandable="expandable"
        eager
        class="avatar__image"
      />
    </div>
    <span class="avatar__badge">{{ badgeText }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string
    alt?: string
    badgeText?: string
    expandable?: boolean
  }>(),
  {
    alt: 'โลโก้ชมรม NUSE',
    badgeText: 'รุ่นที่ 1',
    expandable: false,
  }
)
</script>

<style scoped>
.avatar {
  position: relative;
  width: 108px;
  height: 108px;
  margin-top: -40px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2.5px dashed var(--color-navy);
  opacity: 0.5;
  animation: avatarWiggle 9s ease-in-out infinite;
}

.avatar__circle {
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #fff;
  padding: 6px;
  box-shadow: 4px 4px 0 rgba(18, 24, 74, 0.9);
}

.avatar__image {
  width: 100%;
  height: 100%;
  padding: 9px;
  box-sizing: border-box;
  background: #fff;
}

.avatar__badge {
  position: absolute;
  bottom: -3px;
  right: -14px;
  background: var(--color-orange);
  color: #fff;
  font: 700 10.5px 'Mali', cursive;
  padding: 4px 10px;
  border-radius: 999px;
  letter-spacing: 0.3px;
  box-shadow: 2px 2px 0 rgba(18, 24, 74, 0.9);
}

@keyframes avatarWiggle {
  0%,
  100% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(4deg);
  }
}
</style>
