import type { H3Event } from 'h3'

export async function requireStaff(event: H3Event) {
  const { user } = await requireUserSession(event)
  if (user.role !== 'staff') {
    throw createError({ statusCode: 403, statusMessage: 'Staff only' })
  }
  return user
}
