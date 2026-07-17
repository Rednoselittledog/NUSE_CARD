<template>
  <div class="cta">
    <a :href="JOIN_FORM_URL" target="_blank" rel="noopener" class="cta__primary">สมัครเข้าชมรม 🖋</a>
    <a :href="JOIN_FORM_URL" target="_blank" rel="noopener" class="cta__secondary">
      เปิดรับสมัครบอร์ดบริหาร · ดูรายละเอียดในกลุ่ม
    </a>
  </div>
</template>

<script setup lang="ts">
import { JOIN_FORM_URL } from '~/constants/links'
</script>

<style scoped>
.cta {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta__primary {
  width: 90%;
  box-sizing: border-box;
  text-align: center;
  padding: 12px;
  border-radius: 14px;
  background: linear-gradient(120deg, var(--color-orange) 0%, #f2954f 60%, var(--color-orange) 100%);
  color: rgba(18, 24, 74, 0.75);
  font: 700 14px 'Sarabun', sans-serif;
  text-decoration: none;
  border: 2.5px solid var(--color-navy);
  box-shadow: 4px 4px 0 var(--color-navy);
}

.cta__primary:hover,
.cta__primary:focus-visible {
  opacity: 0.92;
}

.cta__secondary {
  margin-top: 14px;
  font: 400 14px/1.6 'Sarabun', sans-serif;
  color: rgba(18, 24, 74, 0.75);
  text-decoration: none;
}

.cta__secondary:hover,
.cta__secondary:focus-visible {
  color: var(--color-orange);
}
</style>
