import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CreateStudyGroupRequest } from '@/schemas/admin'
import { prisma } from '@/utils'

export const CreateStudyGroup = async (
  req: Request<any, any, CreateStudyGroupRequest>,
  res: Response,
) => {
  const { batchId, name } = req.body

  await prisma.group
    .create({
      data: {
        batchId,
        name,
      },
    })
    .then(() => {
      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Study Group created successfully' })
    })
    .catch((error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error,
        message: 'Failed to create study group',
      })
    })
}
