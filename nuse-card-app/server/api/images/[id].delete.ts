import { del } from '@vercel/blob'

export default defineEventHandler(async (event) => {
  await requireStaff(event)
  const id = getRouterParam(event, 'id')

  const { rows } = await query<ImageRow>('delete from image where id = $1 returning *', [id])
  const image = rows[0]
  if (image) {
    // Best-effort: the DB row is already gone either way, don't fail the
    // request just because the blob was already missing or unreachable.
    await del(image.url).catch(() => {})
  }

  return { success: true }
})
