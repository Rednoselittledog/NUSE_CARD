<template>
  <section class="mt-10 flex w-full flex-col items-center border-t-2 border-dashed border-navy/20 pt-6.5 text-center">
    <p class="m-0 mb-1.5 text-xs font-semibold text-orange">🚀 ยังไม่ได้สมัครใช่ไหม?</p>
    <h2 class="m-0 mb-2 font-['Noto_Serif_Thai'] text-xl font-bold text-navy">มาเป็นส่วนหนึ่งกับพวกเรา!</h2>
    <Button
      as="a"
      :href="JOIN_FORM_URL"
      target="_blank"
      rel="noopener"
      variant="ghost"
      class="h-auto w-[90%] justify-center rounded-xl border-[2.5px] border-navy bg-[linear-gradient(120deg,var(--color-orange)_0%,var(--color-orange-light)_60%,var(--color-orange)_100%)] px-3 py-3 text-sm font-bold text-navy/75 shadow-[4px_4px_0_var(--color-navy)] hover:bg-none hover:text-navy/75 hover:opacity-90 focus-visible:opacity-90"
    >
      สมัครเข้าชมรม 🖋
    </Button>
    <p class="m-0 mt-4.5 max-w-70 pt-0 text-[13px] leading-relaxed text-navy/70">
      มาสร้างธุรกิจ สร้างเพื่อน สร้างประสบการณ์ไปด้วยกัน
    </p>
  </section>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { JOIN_FORM_URL } from '~/constants/links'
</script>
