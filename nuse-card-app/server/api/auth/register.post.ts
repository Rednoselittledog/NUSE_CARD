import bcrypt from 'bcryptjs'

interface MemberRow {
  id: string
  student_id: string
  name: string
  role: 'member' | 'staff'
}

export default defineEventHandler(async (event) => {
  const { studentId, name, password } = await readBody(event)

  if (!studentId || !name || !password || String(password).length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'studentId, name, and a password of 8+ chars are required' })
  }

  const existing = await query('select id from member where student_id = $1', [studentId])
  if (existing.rows.length > 0) {
    throw createError({ statusCode: 409, statusMessage: 'Student ID already registered' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const { rows } = await query<MemberRow>(
    `insert into member (student_id, name, password_hash)
     values ($1, $2, $3)
     returning id, student_id, name, role`,
    [studentId, name, passwordHash],
  )
  const member = rows[0]

  await setUserSession(event, {
    user: { id: member.id, studentId: member.student_id, name: member.name, role: member.role },
  })

  return { id: member.id, name: member.name, role: member.role }
})
