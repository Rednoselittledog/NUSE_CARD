import { put } from '@vercel/blob'

const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export default defineEventHandler(async (event) => {
  await requireStaff(event)

  const files = await readMultipartFormData(event)
  const file = files?.find((f) => f.name === 'file')
  if (!file || !file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'ไม่พบไฟล์รูปภาพ' })
  }
  if (file.type && !ALLOWED_TYPES.has(file.type)) {
    throw createError({ statusCode: 400, statusMessage: 'รองรับเฉพาะไฟล์รูปภาพ (jpg, png, webp, gif)' })
  }
  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 400, statusMessage: 'ไฟล์ต้องมีขนาดไม่เกิน 5MB' })
  }

  const blob = await put(`activities/${crypto.randomUUID()}-${file.filename}`, file.data, {
    access: 'public',
    contentType: file.type,
  })

  return { url: blob.url }
})
