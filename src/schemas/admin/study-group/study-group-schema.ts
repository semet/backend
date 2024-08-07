import { z } from 'zod'

export const studyGroupSchema = z.object({
  batchId: z.string().uuid(),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
})

export type CreateStudyGroupRequest = z.infer<typeof studyGroupSchema>
