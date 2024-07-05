import { Router } from 'express'

import {
  DashboardController,
  LoginController,
  DepartmentController,
} from '@/controller/admin'
import { validate } from '@/middlewares'
import { DepartmentSchema, authSchema } from '@/schemas/admin'

const router = Router()

router.post('/login', [validate(authSchema)], LoginController)
router.get('/dashboard', DashboardController)
// Department
router.get('/departments', DepartmentController.show)
router.post(
  '/department',
  [validate(DepartmentSchema.create)],
  DepartmentController.create,
)
router.get('/department/:id', DepartmentController.view)
router.put(
  '/department/:id',
  [validate(DepartmentSchema.create)],
  DepartmentController.update,
)
router.delete('/department/:id', DepartmentController.delete)

export const AdminRouter = router
