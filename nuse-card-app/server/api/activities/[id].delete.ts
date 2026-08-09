import { del } from '@vercel/blob'

export default defineEventHandler(async (event) => {
  await requireStaff(event)
  const id = getRouterParam(event, 'id')

  // Fetch image URLs before deleting — the `image` row is gone via
  // ON DELETE CASCADE once the activity is deleted, so this is the last
  // chance to know what to purge from Blob storage.
  const { rows: images } = await query<{ url: string }>('select url from image where activity_id = $1', [id])

  try {
    await query('delete from activity where id = $1', [id])
  } catch (err: any) {
    if (err?.code === '23503') {
      throw createError({ statusCode: 409, statusMessage: 'ลบไม่ได้ เพราะมีคนเช็คอินกิจกรรมนี้ไปแล้ว' })
    }
    throw err
  }

  await Promise.all(images.map((image) => del(image.url).catch(() => {})))

  return { success: true }
})
