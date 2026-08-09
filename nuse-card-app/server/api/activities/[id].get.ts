export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { rows } = await query<ActivityRow>('select * from activity where id = $1', [id])
  const activity = rows[0]
  if (!activity) throw createError({ statusCode: 404, statusMessage: 'Activity not found' })

  const { user } = await getUserSession(event)
  if (activity.status !== 'published' && user?.role !== 'staff') {
    throw createError({ statusCode: 404, statusMessage: 'Activity not found' })
  }

  return mapActivity(activity)
})
