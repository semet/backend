import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'

import { prisma } from '@/utils'

export const ForgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body

  const student = await prisma.student.findUnique({
    where: {
      email,
    },
  })
  if (!student) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Unknown email address',
    })
  }

  const generatedToken = uuidv4()

  try {
    await prisma.forgotPasswordToken.create({
      data: {
        userId: student.id,
        token: generatedToken,
      },
    })
    return res.status(StatusCodes.OK).json({
      message: 'Success',
    })
  } catch {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    })
  }
}
