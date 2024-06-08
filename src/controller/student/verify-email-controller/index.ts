import { Request, Response } from 'express'

export const VerifyEmailController = (req: Request, res: Response) => {
  res.send('Student Verify Email')
}
