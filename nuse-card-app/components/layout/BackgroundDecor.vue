<template>
  <div class="decor" aria-hidden="true">
    <span class="decor__blob decor__blob--blue"></span>
    <span class="decor__blob decor__blob--orange"></span>
    <span class="decor__blob decor__blob--navy"></span>
    <span v-for="dot in confetti" :key="dot.id" class="decor__dot" :style="dotStyle(dot)"></span>
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

<style scoped>
.decor {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.decor__blob {
  position: absolute;
  display: block;
}

.decor__blob--blue {
  top: -30px;
  left: -30px;
  width: 140px;
  height: 140px;
  background: var(--color-blue-light);
  border-radius: 16px;
  transform: rotate(-18deg);
  opacity: 0.55;
}

.decor__blob--orange {
  bottom: 60px;
  left: -40px;
  width: 100px;
  height: 100px;
  background: var(--color-orange);
  border-radius: 50%;
  opacity: 0.18;
}

.decor__blob--navy {
  bottom: -50px;
  right: -50px;
  width: 180px;
  height: 180px;
  background: var(--color-navy);
  border-radius: 20px;
  transform: rotate(14deg);
  opacity: 0.1;
}

.decor__dot {
  position: absolute;
  animation-name: dotFloat;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes dotFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(12deg);
  }
}
</style>
