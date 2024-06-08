import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const DashboardController = async (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({
    message: 'Welcome to Student dashboard',
  })
}
