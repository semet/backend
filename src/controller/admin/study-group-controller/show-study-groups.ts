import { Request, Response } from 'express'

import { prisma } from '@/utils'

export const ShowStudyGroups = async (_: Request, res: Response) => {
  const groups = await prisma.group.findMany()

  return res.json({
    data: groups,
  })
}
