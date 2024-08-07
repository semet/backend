import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CreateStudyGroupRequest } from '@/schemas/admin'
import { prisma } from '@/utils'

export const UpdateStudyGroup = async (
  req: Request<any, any, CreateStudyGroupRequest>,
  res: Response,
) => {
  const { id } = req.params
  const { batchId, name } = req.body

  if (!id) return res.status(400).json({ message: 'Id is required' })

  const studyGroup = await prisma.group.findFirst({
    where: {
      id,
    },
  })

  if (!studyGroup) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Study Group not found',
    })
  }

  await prisma.group
    .update({
      where: {
        id,
      },
      data: {
        batchId,
        name,
      },
    })
    .then(() => {
      return res.status(StatusCodes.OK).json({
        message: 'Study Group updated successfully',
      })
    })
    .catch((error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating study group',
        error: error.message,
      })
    })
}
