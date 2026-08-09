import { imageCreateSchema } from '~/shared/validation/image'

export default defineEventHandler(async (event) => {
  await requireStaff(event)
  const parsed = imageCreateSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message ?? 'ข้อมูลไม่ถูกต้อง' })
  }
  const { url, activityId, featured } = parsed.data

  const { rows } = await query<ImageRow>(
    'insert into image (url, activity_id, featured) values ($1, $2, $3) returning *',
    [url, activityId ?? null, featured ?? false],
  )
  return mapImage(rows[0])
})
