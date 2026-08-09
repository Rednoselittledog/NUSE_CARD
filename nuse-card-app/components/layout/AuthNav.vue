<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button type="button" aria-label="เมนู" class="flex size-9 items-center justify-center text-navy">
        <Menu class="size-6" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem as-child>
        <NuxtLink :to="loggedIn ? '/me' : '/login'" class="flex items-center gap-2">
          <Avatar class="size-6 border border-navy bg-white">
            <AvatarFallback class="text-[10px] font-semibold text-navy">{{ initials }}</AvatarFallback>
          </Avatar>
          <span>{{ loggedIn ? user?.name : 'เข้าสู่ระบบ' }}</span>
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <NuxtLink to="/">หน้าหลัก</NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <NuxtLink to="/activity">กิจกรรม</NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <NuxtLink to="/gallery">คลังภาพ</NuxtLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Menu } from '@lucide/vue'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'

const { loggedIn, user } = useUserSession()
const initials = computed(() => user.value?.name?.trim()?.[0] ?? '?')
</script>
