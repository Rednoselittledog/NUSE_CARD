import { z } from 'zod'

export const loginSchema = z.object({
  studentId: z.string().trim().min(1, 'กรุณากรอกรหัสนิสิต'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
})

export const registerSchema = z.object({
  studentId: z.string().trim().min(1, 'กรุณากรอกรหัสนิสิต'),
  name: z.string().trim().min(1, 'กรุณากรอกชื่อ-นามสกุล'),
  password: z.string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
