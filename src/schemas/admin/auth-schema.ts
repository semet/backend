import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})
