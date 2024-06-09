import { hashSync } from 'bcrypt'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '@/utils'

export const UpdatePasswordController = async (req: Request, res: Response) => {
  const { password } = req.body
  const { token } = req.params

  if (!token) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid token',
    })
  }

  const isTokenValid = await prisma.forgotPasswordToken.findFirst({
    where: {
      token,
    },
  })

  if (!isTokenValid) {
    return res.status(404).json({
      message: 'Invalid token',
    })
  }

  try {
    await prisma.student
      .update({
        where: {
          id: isTokenValid.userId,
        },
        data: {
          password: hashSync(password, 10),
        },
      })
      .then(async () => {
        await prisma.forgotPasswordToken.delete({
          where: {
            id: isTokenValid.id,
          },
        })
      })

    return res.status(StatusCodes.OK).json({
      message: 'Password updated successfully',
    })
  } catch {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    })
  }
}
