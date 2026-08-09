import { z } from 'zod'

const optionalText = z
  .string()
  .trim()
  .nullable()
  .optional()
  .transform((value) => value || null)

export const activityInputSchema = z.object({
  title: z.string().trim().min(1, 'กรุณากรอกชื่อกิจกรรม'),
  description: optionalText,
  location: optionalText,
  coverImage: optionalText,
  gallery: z.array(z.string()).optional(),
  startsAt: z
    .string()
    .min(1, 'กรุณาระบุวันเวลาเริ่ม')
    .refine((value) => !Number.isNaN(Date.parse(value)), 'วันเวลาเริ่มไม่ถูกต้อง'),
  endsAt: z
    .string()
    .nullable()
    .optional()
    .transform((value) => value || null)
    .refine((value) => !value || !Number.isNaN(Date.parse(value)), 'วันเวลาสิ้นสุดไม่ถูกต้อง'),
  status: z.enum(['draft', 'published', 'closed']).optional(),
})

export type ActivityInput = z.infer<typeof activityInputSchema>
