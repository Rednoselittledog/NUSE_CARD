import { activityInputSchema } from '~/shared/validation/activity'

export default defineEventHandler(async (event) => {
  await requireStaff(event)
  const id = getRouterParam(event, 'id')
  const parsed = activityInputSchema.partial().safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message ?? 'ข้อมูลไม่ถูกต้อง' })
  }
  const { title, description, location, coverImage, startsAt, endsAt, status } = parsed.data

  const { rows } = await query<ActivityRow>(
    `update activity set
       title = coalesce($2, title),
       description = coalesce($3, description),
       location = coalesce($4, location),
       cover_image = coalesce($5, cover_image),
       starts_at = coalesce($6, starts_at),
       ends_at = coalesce($7, ends_at),
       status = coalesce($8::activity_status, status)
     where id = $1
     returning *`,
    [id, title ?? null, description ?? null, location ?? null, coverImage ?? null, startsAt ?? null, endsAt ?? null, status ?? null],
  )
  const activity = rows[0]
  if (!activity) throw createError({ statusCode: 404, statusMessage: 'Activity not found' })

  return mapActivity(activity)
})
