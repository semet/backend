import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '@/utils'

export const ViewStudyGroup = async (req: Request, res: Response) => {
  const { id } = req.params

  const studyGroup = await prisma.group.findUnique({
    where: {
      id,
    },
  })

  if (!studyGroup) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Study Group not found',
    })
  }

  return res.status(StatusCodes.OK).json({
    data: studyGroup,
  })
}
