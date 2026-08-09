<template>
  <form class="flex w-full flex-col gap-4" @submit.prevent="onSubmit">
    <div v-if="mode === 'register'" class="flex flex-col gap-1.5">
      <Label for="name">ชื่อ-นามสกุล</Label>
      <Input id="name" v-model="name" type="text" />
      <p v-if="fieldErrors.name" class="text-destructive text-xs">{{ fieldErrors.name }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="studentId">รหัสนิสิต</Label>
      <Input id="studentId" v-model="studentId" type="text" inputmode="numeric" maxlength="8" />
      <p v-if="fieldErrors.studentId" class="text-destructive text-xs">{{ fieldErrors.studentId }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="password">รหัสผ่าน</Label>
      <Input id="password" v-model="password" type="password" />
      <p v-if="fieldErrors.password" class="text-destructive text-xs">{{ fieldErrors.password }}</p>
    </div>

    <p v-if="error" class="text-destructive text-sm">{{ error }}</p>

    <Button type="submit" :disabled="loading">
      {{ loading ? 'กำลังดำเนินการ...' : mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { loginSchema, registerSchema } from '~/shared/validation/auth'

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
const fieldErrors = ref<Record<string, string>>({})

async function onSubmit() {
  error.value = ''
  fieldErrors.value = {}

  const schema = props.mode === 'register' ? registerSchema : loginSchema
  const payload =
    props.mode === 'register'
      ? { studentId: studentId.value, name: name.value, password: password.value }
      : { studentId: studentId.value, password: password.value }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0])
      if (!(key in fieldErrors.value)) fieldErrors.value[key] = issue.message
    }
    return
  }

  loading.value = true
  try {
    const user = await $fetch(`/api/auth/${props.mode}`, { method: 'POST', body: parsed.data })
    await refreshSession()
    emit('success', user)
  } catch (err: any) {
    error.value = err?.data?.statusMessage || err?.statusMessage || 'เกิดข้อผิดพลาด ลองใหม่อีกครั้ง'
  } finally {
    loading.value = false
  }
}
</script>
