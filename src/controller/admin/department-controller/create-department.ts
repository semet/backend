import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CreateDepartmentRequest } from '@/schemas/admin'
import { prisma } from '@/utils'

export const CreateDepartment = async (
  req: Request<any, any, CreateDepartmentRequest>,
  res: Response,
) => {
  const { name } = req.body

  await prisma.department
    .create({
      data: {
        name,
      },
    })
    .then(() => {
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Department created successfully' })
    })
    .catch((error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error,
        message: 'Failed to create department',
      })
    })
}
