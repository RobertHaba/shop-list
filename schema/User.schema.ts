import * as z from 'zod'

export const userRegisterSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
})

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>
