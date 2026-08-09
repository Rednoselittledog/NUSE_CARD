import { z } from 'zod'

const studentId = z
  .string()
  .trim()
  .regex(/^\d{8}$/, 'รหัสนิสิตต้องเป็นตัวเลข 8 หลัก')

export const loginSchema = z.object({
  studentId,
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
})

export const registerSchema = z.object({
  studentId,
  name: z.string().trim().min(1, 'กรุณากรอกชื่อ-นามสกุล'),
  password: z.string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
