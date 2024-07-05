import { Request, Response } from 'express'

import { prisma } from '@/utils'

export const ShowDepartments = async (_: Request, res: Response) => {
  const departments = await prisma.department.findMany()

  return res.json(departments)
}
