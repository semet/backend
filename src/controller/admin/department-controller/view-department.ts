import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '@/utils'

export const ViewDepartment = async (req: Request, res: Response) => {
  const { id } = req.params

  const department = await prisma.department.findUnique({
    where: {
      id,
    },
  })

  if (!department) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Department not found',
    })
  }

  return res.status(StatusCodes.OK).json({
    data: department,
  })
}
