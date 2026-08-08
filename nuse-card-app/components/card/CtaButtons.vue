<template>
  <div class="flex w-full flex-col items-center">
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
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { JOIN_FORM_URL } from '~/constants/links'
</script>
