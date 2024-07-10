import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '@/utils'

export const DeleteBatch = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Id is required' })

  await prisma.batch
    .delete({
      where: {
        id,
      },
    })
    .then(() => {
      return res.status(StatusCodes.OK).json({
        message: 'Batch deleted successfully',
      })
    })
    .catch((error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting batch',
        error: error.message,
      })
    })
}
