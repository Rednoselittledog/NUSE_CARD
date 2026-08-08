<template>
  <div
    class="group relative h-full w-full overflow-hidden"
    :class="[shape === 'circle' && 'rounded-full', canExpand && 'cursor-pointer']"
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
      class="block h-full w-full transition-opacity duration-300 ease-out"
      :class="[isLoaded ? 'opacity-100' : 'opacity-0', shape === 'circle' ? 'object-contain' : 'object-cover']"
      :style="{ objectPosition }"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      @load="isLoaded = true"
    />
    <div
      v-else
      class="flex h-full w-full items-center justify-center rounded-[inherit] border-[1.5px] border-dashed p-1.5 text-center font-medium text-[10px] text-navy/40"
      style="border-color: rgba(18, 24, 74, 0.25); background-image: repeating-linear-gradient(45deg, rgba(18, 24, 74, 0.03) 0 8px, rgba(18, 24, 74, 0.06) 8px 16px)"
    >
      <span>{{ placeholder }}</span>
    </div>
    <span
      v-if="canExpand"
      class="pointer-events-none absolute right-1 bottom-1 flex h-[18px] w-[18px] items-center justify-center rounded bg-navy/55 text-[11px] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      aria-hidden="true"
    >⤢</span>

    <Dialog v-model:open="isOpen">
      <DialogContent
        class="flex max-w-none items-center justify-center border-none bg-transparent p-0 shadow-none sm:max-w-none"
        :show-close-button="false"
      >
        <DialogTitle class="sr-only">{{ alt || placeholder }}</DialogTitle>
        <img v-if="src" :src="src" :alt="alt" class="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl" />
        <DialogClose
          class="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg text-navy"
          aria-label="ปิดรูปขยาย"
        >✕</DialogClose>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogClose, DialogContent, DialogTitle } from '~/components/ui/dialog'

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
</script>
