<template>
  <form class="flex w-full flex-col gap-4" @submit.prevent="onSubmit">
    <div v-if="mode === 'register'" class="flex flex-col gap-1.5">
      <Label for="name">ชื่อ-นามสกุล</Label>
      <Input id="name" v-model="name" type="text" required />
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="studentId">รหัสนิสิต</Label>
      <Input id="studentId" v-model="studentId" type="text" required />
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="password">รหัสผ่าน</Label>
      <Input id="password" v-model="password" type="password" required minlength="8" />
    </div>

    <p v-if="error" class="text-destructive text-sm">{{ error }}</p>

    <Button type="submit" :disabled="loading">
      {{ loading ? 'กำลังดำเนินการ...' : mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  mode: 'login' | 'register'
}>()

const emit = defineEmits<{
  success: [user: { id: string; name: string; role: string }]
}>()

const { fetch: refreshSession } = useUserSession()

const studentId = ref('')
const name = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    const body =
      props.mode === 'register'
        ? { studentId: studentId.value, name: name.value, password: password.value }
        : { studentId: studentId.value, password: password.value }

    const user = await $fetch(`/api/auth/${props.mode}`, { method: 'POST', body })
    await refreshSession()
    emit('success', user)
  } catch (err: any) {
    error.value = err?.data?.statusMessage || err?.statusMessage || 'เกิดข้อผิดพลาด ลองใหม่อีกครั้ง'
  } finally {
    loading.value = false
  }
}
</script>
