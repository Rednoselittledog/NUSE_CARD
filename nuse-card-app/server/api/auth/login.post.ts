import bcrypt from 'bcryptjs'
import { loginSchema } from '~/shared/validation/auth'

interface MemberRow {
  id: string
  student_id: string
  name: string
  role: 'member' | 'staff'
  password_hash: string
}

export default defineEventHandler(async (event) => {
  const parsed = loginSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message ?? 'ข้อมูลไม่ถูกต้อง' })
  }
  const { studentId, password } = parsed.data

  const invalidCredentials = () => createError({ statusCode: 401, statusMessage: 'Invalid student ID or password' })

  const { rows } = await query<MemberRow>(
    'select id, student_id, name, role, password_hash from member where student_id = $1',
    [studentId],
  )
  const member = rows[0]
  if (!member) throw invalidCredentials()

  const valid = await bcrypt.compare(password, member.password_hash)
  if (!valid) throw invalidCredentials()

  await setUserSession(event, {
    user: { id: member.id, studentId: member.student_id, name: member.name, role: member.role },
  })

  return { id: member.id, name: member.name, role: member.role }
})
