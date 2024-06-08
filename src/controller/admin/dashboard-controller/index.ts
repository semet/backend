import { Request, Response } from 'express'

export const DashboardController = (req: Request, res: Response) => {
  res.send('Admin Dashboard')
}
