import { Router } from 'express'

import {
  CreateDepartment,
  DashboardController,
  DeleteDepartment,
  LoginController,
  ShowDepartments,
  UpdateDepartment,
  ViewDepartment,
} from '@/controller/admin'
import { validate } from '@/middlewares'
import { createDepartmentSchema, authSchema } from '@/schemas/admin'

const router = Router()

router.post('/login', [validate(authSchema)], LoginController)
router.get('/dashboard', DashboardController)
// Department
router.get('/departments', ShowDepartments)
router.post('/department', [validate(createDepartmentSchema)], CreateDepartment)
router.get('/department/:id', ViewDepartment)
router.put(
  '/department/:id',
  [validate(createDepartmentSchema)],
  UpdateDepartment,
)
router.delete('/department/:id', DeleteDepartment)

export const AdminRouter = router
