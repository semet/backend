import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '@/utils'

export const DeleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Id is required' })

  await prisma.department
    .delete({
      where: {
        id,
      },
    })
    .then(() => {
      return res.status(StatusCodes.OK).json({
        message: 'Department deleted successfully',
      })
    })
    .catch((error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting department',
        error: error.message,
      })
    })
}
