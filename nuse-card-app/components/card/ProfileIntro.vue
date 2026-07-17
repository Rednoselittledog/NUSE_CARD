<template>
  <div class="intro">
    <h1 class="intro__title">ชมรมผู้ประกอบการรุ่นเยาว์</h1>
    <p class="intro__subtitle-en">Naresuan University Student Entrepreneur</p>
    <span class="intro__underline" aria-hidden="true"></span>
    <p class="intro__body">
      ยินดีต้อนรับสู่ NUSE รุ่นที่ 1 คุณสามารถร่วมสร้างอนาคตของชมรมไปกับเราได้ที่นี่!
    </p>
  </div>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.intro__title {
  margin: 8px 0 0;
  font: 700 25px/1.3 'Noto Serif Thai', serif;
  color: var(--color-navy);
  letter-spacing: 0.3px;
  width: 90%;
}

.intro__underline {
  display: block;
  width: 70px;
  height: 3px;
  border-radius: 2px;
  background: #e8620c;
  margin: 0 0 14px;
}

.intro__subtitle-en {
  margin: 0 0 16px;
  font: 500 9.5px 'Sarabun', sans-serif;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(18, 24, 74, 0.45);
}

.intro__body {
  margin: 0 0 22px;
  font: 600 14px/1.6 'Mali', cursive;
  color: var(--color-navy);
  max-width: 320px;
}
</style>
