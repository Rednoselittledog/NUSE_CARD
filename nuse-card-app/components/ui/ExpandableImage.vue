<template>
  <div
    class="expandable-image"
    :class="[`expandable-image--${shape}`, { 'is-clickable': canExpand }]"
    :style="radiusStyle"
    :role="canExpand ? 'button' : undefined"
    :tabindex="canExpand ? 0 : undefined"
    :aria-label="canExpand ? `ขยายรูป: ${alt || placeholder}` : undefined"
    @click="open"
    @keydown.enter="open"
    @keydown.space.prevent="open"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="expandable-image__img"
      :class="{ 'is-loaded': isLoaded }"
      :style="{ objectPosition }"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      @load="isLoaded = true"
    />
    <div v-else class="expandable-image__placeholder">
      <span>{{ placeholder }}</span>
    </div>
    <span v-if="canExpand" class="expandable-image__hint" aria-hidden="true">⤢</span>
  </div>

  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div v-if="isOpen" class="lightbox" @click.self="close">
        <button type="button" class="lightbox__close" aria-label="ปิดรูปขยาย" @click="close">✕</button>
        <img v-if="src" :src="src" :alt="alt" class="lightbox__img" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    placeholder?: string
    shape?: 'rect' | 'rounded' | 'circle'
    radius?: number
    expandable?: boolean
    objectPosition?: string
    eager?: boolean
  }>(),
  {
    src: undefined,
    alt: '',
    placeholder: 'ยังไม่มีรูปภาพ',
    shape: 'rect',
    radius: 10,
    expandable: true,
    objectPosition: 'center',
    eager: false,
  }
)

const isOpen = ref(false)
const isLoaded = ref(false)
const canExpand = computed(() => props.expandable && !!props.src)

watch(
  () => props.src,
  () => {
    isLoaded.value = false
  }
)

const radiusStyle = computed(() =>
  props.shape === 'rounded' ? { borderRadius: `${props.radius}px` } : {}
)

function open() {
  if (!canExpand.value) return
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(isOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<style scoped>
.expandable-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.expandable-image--circle {
  border-radius: 50%;
}

.expandable-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.expandable-image__img.is-loaded {
  opacity: 1;
}

.expandable-image--circle .expandable-image__img {
  object-fit: contain;
}

.expandable-image__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6px;
  border: 1.5px dashed rgba(18, 24, 74, 0.25);
  border-radius: inherit;
  font: 500 10px 'Sarabun', sans-serif;
  color: rgba(18, 24, 74, 0.4);
  background: repeating-linear-gradient(
    45deg,
    rgba(18, 24, 74, 0.03) 0 8px,
    rgba(18, 24, 74, 0.06) 8px 16px
  );
}

.is-clickable {
  cursor: pointer;
}

.expandable-image__hint {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(18, 24, 74, 0.55);
  color: #fff;
  font-size: 11px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
}

.is-clickable:hover .expandable-image__hint,
.is-clickable:focus-visible .expandable-image__hint {
  opacity: 1;
}

.expandable-image:focus-visible {
  outline: 2px solid var(--color-orange, #e8620c);
  outline-offset: 2px;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(18, 24, 74, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.lightbox__img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.lightbox__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-navy, #12184a);
  font-size: 18px;
  cursor: pointer;
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
