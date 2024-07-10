import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '@/utils'

export const ViewBatch = async (req: Request, res: Response) => {
  const { id } = req.params

  const batch = await prisma.batch.findUnique({
    where: {
      id,
    },
  })

  if (!batch) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Batch not found',
    })
  }

  return res.status(StatusCodes.OK).json({
    data: batch,
  })
}
