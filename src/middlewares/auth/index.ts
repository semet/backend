import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { JwtPayload, verify } from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET as string

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]

  if (!token) {
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
    req.user = decoded as JwtPayload
    next()
  })
}
