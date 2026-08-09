export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const token = getRouterParam(event, 'token')

  const { rows } = await query<{ id: string; title: string; checkin_open: boolean }>(
    'select id, title, checkin_open from activity where checkin_token = $1',
    [token],
  )
  const activity = rows[0]
  if (!activity) throw createError({ statusCode: 404, statusMessage: 'ไม่พบลิงก์เช็คอินนี้' })
  if (!activity.checkin_open) throw createError({ statusCode: 400, statusMessage: 'ปิดรับเช็คอินแล้ว' })

  const { rows: inserted } = await query(
    'insert into attendance (activity_id, member_id) values ($1, $2) on conflict (activity_id, member_id) do nothing returning *',
    [activity.id, user.id],
  )

  return {
    activity: { id: activity.id, title: activity.title },
    alreadyCheckedIn: inserted.length === 0,
  }
})
