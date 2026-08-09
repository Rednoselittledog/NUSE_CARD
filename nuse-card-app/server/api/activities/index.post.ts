import { activityInputSchema } from '~/shared/validation/activity'

export default defineEventHandler(async (event) => {
  const staff = await requireStaff(event)
  const parsed = activityInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message ?? 'ข้อมูลไม่ถูกต้อง' })
  }
  const { title, description, location, coverImage, startsAt, endsAt, status } = parsed.data

  const checkinToken = crypto.randomUUID()

  const { rows } = await query<ActivityRow>(
    `insert into activity (title, description, location, cover_image, starts_at, ends_at, status, checkin_token, created_by)
     values ($1, $2, $3, $4, $5, $6, coalesce($7::activity_status, 'draft'), $8, $9)
     returning *`,
    [title, description ?? null, location ?? null, coverImage ?? null, startsAt, endsAt ?? null, status ?? null, checkinToken, staff.id],
  )

  return mapActivity(rows[0], { includeToken: true })
})
