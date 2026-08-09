export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const isStaff = user?.role === 'staff'

  const { rows } = isStaff
    ? await query<ActivityRow>('select * from activity order by starts_at')
    : await query<ActivityRow>("select * from activity where status = 'published' order by starts_at")

  return rows.map(mapActivity)
})
