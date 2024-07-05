import { z } from 'zod'

export const createDepartmentSchema = z.object({
  name: z.string(),
})

export type CreateDepartmentRequest = z.infer<typeof createDepartmentSchema>
