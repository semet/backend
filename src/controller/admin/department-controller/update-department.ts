import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CreateDepartmentRequest } from '@/schemas/admin'
import { prisma } from '@/utils'

export const UpdateDepartment = async (
  req: Request<any, any, CreateDepartmentRequest>,
  res: Response,
) => {
  const { id } = req.params
  const { name } = req.body

  const department = await prisma.department.findFirst({
    where: {
      id,
    },
  })

  if (!department) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Department not found',
    })
  }

  await prisma.department
    .update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
    .then(() => {
      return res.status(StatusCodes.OK).json({
        message: 'Department updated successfully',
      })
    })
    .catch((error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating department',
        error: error.message,
      })
    })
}
