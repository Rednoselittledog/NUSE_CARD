<template>
  <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
    <span class="absolute -top-7.5 -left-7.5 block h-35 w-35 rotate-[-18deg] rounded-2xl bg-blue-light opacity-55" />
    <span class="absolute bottom-15 -left-10 block h-25 w-25 rounded-full bg-orange opacity-[0.18]" />
    <span class="absolute -right-12.5 -bottom-12.5 block h-45 w-45 rotate-14 rounded-[20px] bg-navy opacity-10" />
    <span
      v-for="dot in confetti"
      :key="dot.id"
      class="animate-decor-float absolute"
      :style="dotStyle(dot)"
    />
  </div>
</template>

<script setup lang="ts">
interface ConfettiDot {
  id: number
  top: string
  left?: string
  right?: string
  size: number
  color: string
  shape: 'circle' | 'square'
  duration: string
  delay: string
  opacity?: number
}

const confetti: ConfettiDot[] = [
  { id: 1, top: '150px', left: '14px', size: 10, color: 'var(--color-orange)', shape: 'square', duration: '6s', delay: '0s' },
  { id: 2, top: '210px', right: '20px', size: 8, color: 'var(--color-navy)', shape: 'circle', duration: '7s', delay: '1s' },
  { id: 3, top: '600px', left: '22px', size: 9, color: 'var(--color-blue-light)', shape: 'square', duration: '8s', delay: '.5s' },
  { id: 4, top: '660px', right: '26px', size: 11, color: 'var(--color-orange)', shape: 'circle', duration: '6.5s', delay: '1.4s', opacity: 0.7 },
]

function dotStyle(dot: ConfettiDot) {
  return {
    top: dot.top,
    left: dot.left,
    right: dot.right,
    width: `${dot.size}px`,
    height: `${dot.size}px`,
    background: dot.color,
    borderRadius: dot.shape === 'circle' ? '50%' : '3px',
    opacity: dot.opacity ?? 1,
    animationDuration: dot.duration,
    animationDelay: dot.delay,
  }
}
</script>
