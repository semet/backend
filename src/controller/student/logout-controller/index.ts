import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { decodeJWT, prisma } from '@/utils'

export const LogoutController = async (req: Request, res: Response) => {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  const decoded = decodeJWT(token)?.id

  const student = await prisma.student.findUnique({
    where: {
      id: decoded,
    },
  })

  if (!student) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Student not found',
    })
  }

  await prisma.refreshToken.deleteMany({
    where: {
      studentId: student.id,
    },
  })

  await prisma.blacklistedToken.create({
    data: {
      token,
    },
  })

  return res.status(StatusCodes.OK).json({
    message: 'Logout success',
  })
}
