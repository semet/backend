import { compareSync } from 'bcrypt'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

import { constants } from '@/configs'
import { prisma } from '@/utils'

const jwtSecret = process.env.JWT_SECRET as string
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET as string
const { JWT_EXPIRATION, JWT_REFRESH_EXPIRATION } = constants
export const LoginController = async (req: Request, res: Response) => {
  const { email, password, remember } = req.body

  const student = await prisma.student.findUnique({
    where: {
      email,
    },
  })

  if (!student) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Invalid credentials',
    })
  }

  const isPasswordMatch = compareSync(password, student.password)
  if (!isPasswordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid credentials',
    })
  }

  const jwtPayload = {
    id: student.id,
    email: student.email,
    role: student.role,
  }

  const token = jwt.sign(jwtPayload, jwtSecret, {
    expiresIn: remember ? '30d' : JWT_EXPIRATION,
  })

  const refreshToken = jwt.sign(jwtPayload, jwtRefreshSecret, {
    expiresIn: JWT_REFRESH_EXPIRATION,
  })

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      studentId: student.id,
    },
  })

  return res.status(StatusCodes.OK).json({
    token,
    refreshToken,
  })
}
