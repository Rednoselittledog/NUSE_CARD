<template>
  <div v-if="!onAuthPage" class="absolute top-4 right-4 z-20 flex items-center gap-3">
    <template v-if="loggedIn">
      <NuxtLink to="/me" aria-label="โปรไฟล์ของฉัน">
        <Avatar class="size-9 border-2 border-navy bg-white shadow-brutal-sm">
          <AvatarFallback class="text-sm font-semibold text-navy">{{ initials }}</AvatarFallback>
        </Avatar>
      </NuxtLink>
    </template>
    <template v-else>
      <NuxtLink to="/login" class="text-xs font-medium text-navy underline underline-offset-2">
        เข้าสู่ระบบ
      </NuxtLink>
      <NuxtLink to="/register" class="text-xs font-medium text-navy underline underline-offset-2">
        สมัครสมาชิก
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback } from '~/components/ui/avatar'

const { loggedIn, user } = useUserSession()
const route = useRoute()

const initials = computed(() => user.value?.name?.trim()?.[0] ?? '?')
const onAuthPage = computed(() => route.path === '/login' || route.path === '/register')
</script>
