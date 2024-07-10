import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CreateBatchBatchRequest } from '@/schemas/admin'
import { prisma } from '@/utils'

export const UpdateBatch = async (
  req: Request<any, any, CreateBatchBatchRequest>,
  res: Response,
) => {
  const { id } = req.params
  const { departmentId, name, alias } = req.body

  if (!id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Id is required' })

  const batch = await prisma.batch.findFirst({
    where: {
      id,
    },
  })

  if (!batch) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Batch not found',
    })
  }

  await prisma.batch
    .update({
      where: {
        id,
      },
      data: {
        departmentId,
        name,
        alias,
      },
    })
    .then(() => {
      return res.status(StatusCodes.OK).json({
        message: 'Batch updated successfully',
      })
    })
    .catch((error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating batch',
        error: error.message,
      })
    })
}
