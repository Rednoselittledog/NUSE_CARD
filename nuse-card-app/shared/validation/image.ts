import { z } from 'zod'

export const imageCreateSchema = z.object({
  url: z.string().min(1, 'ไม่พบ url รูปภาพ'),
  activityId: z.string().uuid().nullable().optional(),
  featured: z.boolean().optional(),
})

export const imageUpdateSchema = z.object({
  featured: z.boolean().optional(),
  activityId: z.string().uuid().nullable().optional(),
})
