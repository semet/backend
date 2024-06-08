import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { JwtPayload, verify } from 'jsonwebtoken'

import { prisma } from '@/utils'

import { publicRoutes } from './data'

const jwtSecret = process.env.JWT_SECRET as string

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]

  const firstPartOfUrl = req.originalUrl.split('/')[1]
  const secondPartOfUrl = req.originalUrl.split('/')[2]

  if (publicRoutes.has(secondPartOfUrl)) {
    return next()
  }

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' })
  }

  const isBlacklisted = await prisma.blacklistedToken.findFirst({
    where: {
      token,
    },
  })

  if (isBlacklisted) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' })
  }

  verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized' })
    }
    //prevent user with different role to access other role's route
    if (
      decoded &&
      typeof decoded !== 'string' &&
      decoded.role.toLowerCase() !== firstPartOfUrl
    ) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' })
    }

    req.user = decoded as JwtPayload
    next()
  })
}
