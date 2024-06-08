import { Request, Response } from 'express'

export const RefreshTokenController = (req: Request, res: Response) => {
  res.send('Student Refresh Token')
}
