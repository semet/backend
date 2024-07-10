import { Request, Response } from 'express'

import { prisma } from '@/utils'

export const ShowBatches = async (_: Request, res: Response) => {
  const batches = await prisma.batch.findMany()

  return res.json(batches)
}
