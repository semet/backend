import { z } from 'zod'

export const batchSchema = z.object({
  departmentId: z.string().uuid(),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  alias: z.string().min(1, {
    message: 'Alias is required',
  }),
})

export type CreateBatchRequest = z.infer<typeof batchSchema>
