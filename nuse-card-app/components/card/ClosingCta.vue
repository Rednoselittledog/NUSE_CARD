<template>
  <section class="closing">
    <p class="closing__eyebrow">🚀 ยังไม่ได้สมัครใช่ไหม?</p>
    <h2 class="closing__headline">มาเป็นส่วนหนึ่งกับพวกเรา!</h2>
    <a :href="JOIN_FORM_URL" target="_blank" rel="noopener" class="closing__button">สมัครเข้าชมรม 🖋</a>
    <p class="closing__body">
      มาสร้างธุรกิจ สร้างเพื่อน สร้างประสบการณ์ไปด้วยกัน
    </p>
  </section>
</template>

<script setup lang="ts">
import { JOIN_FORM_URL } from '~/constants/links'
</script>

<style scoped>
.closing {
  width: 100%;
  margin-top: 40px;
  padding-top: 26px;
  border-top: 2px dashed rgba(18, 24, 74, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.closing__eyebrow {
  margin: 0 0 6px;
  font: 600 12px 'Mali', cursive;
  color: var(--color-orange);
}

.closing__headline {
  margin: 0 0 8px;
  font: 700 21px/1.3 'Noto Serif Thai', serif;
  color: var(--color-navy);
}

.closing__body {
  margin: 0 0 18px;
  font: 400 13px/1.6 'Sarabun', sans-serif;
  color: rgba(18, 24, 74, 0.7);
  max-width: 280px;
  padding: 16px 0 0 0;
}

/* Mirrors CtaButtons' primary button style — kept separate since this section
   doesn't need the secondary board-recruitment link. */
.closing__button {
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

.closing__button:hover,
.closing__button:focus-visible {
  opacity: 0.92;
}
</style>
