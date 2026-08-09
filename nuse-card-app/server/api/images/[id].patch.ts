import { imageUpdateSchema } from '~/shared/validation/image'

export default defineEventHandler(async (event) => {
  await requireStaff(event)
  const id = getRouterParam(event, 'id')
  const parsed = imageUpdateSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message ?? 'ข้อมูลไม่ถูกต้อง' })
  }
  // Built dynamically (not coalesce) because activityId is a legitimate
  // field to set to null (unassign from any activity) — coalesce can't
  // tell "not provided" apart from "explicitly cleared".
  const sets: string[] = []
  const params: unknown[] = [id]
  if (parsed.data.featured !== undefined) {
    params.push(parsed.data.featured)
    sets.push(`featured = $${params.length}`)
  }
  if (parsed.data.activityId !== undefined) {
    params.push(parsed.data.activityId)
    sets.push(`activity_id = $${params.length}`)
  }
  if (!sets.length) {
    throw createError({ statusCode: 400, statusMessage: 'ไม่มีข้อมูลให้แก้ไข' })
  }

  const { rows } = await query<ImageRow>(`update image set ${sets.join(', ')} where id = $1 returning *`, params)
  const image = rows[0]
  if (!image) throw createError({ statusCode: 404, statusMessage: 'Image not found' })

  return mapImage(image)
})
