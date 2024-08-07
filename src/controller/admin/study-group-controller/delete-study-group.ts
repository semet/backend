import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '@/utils'

export const DeleteStudyGroup = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'ID is required' })

  await prisma.group
    .delete({
      where: {
        id,
      },
    })
    .then(() => {
      return res.status(StatusCodes.OK).json({
        message: 'Study Group deleted successfully',
      })
    })
    .catch((error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting study group',
        error: error.message,
      })
    })
}
