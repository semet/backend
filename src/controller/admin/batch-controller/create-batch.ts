import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CreateBatchBatchRequest } from '@/schemas/admin'
import { prisma } from '@/utils'

export const CreateBatch = async (
  req: Request<any, any, CreateBatchBatchRequest>,
  res: Response,
) => {
  const { departmentId, name, alias } = req.body

  await prisma.batch
    .create({
      data: {
        departmentId,
        name,
        alias,
      },
    })
    .then(() => {
      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Batch created successfully' })
    })
    .catch((error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error,
        message: 'Failed to create batch',
      })
    })
}
