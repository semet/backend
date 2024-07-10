import { Router } from 'express'

import {
  CreateBatch,
  CreateDepartment,
  DashboardController,
  DeleteBatch,
  DeleteDepartment,
  LoginController,
  ShowBatches,
  ShowDepartments,
  UpdateBatch,
  UpdateDepartment,
  ViewBatch,
  ViewDepartment,
} from '@/controller/admin'
import { validate } from '@/middlewares'
import {
  createDepartmentSchema,
  authSchema,
  batchSchema,
} from '@/schemas/admin'

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
// Batch
router.get('/batches', ShowBatches)
router.post('/batch', [validate(batchSchema)], CreateBatch)
router.get('/batch/:id', ViewBatch)
router.put('/batch/:id', [validate(batchSchema)], UpdateBatch)
router.delete('/batch/:id', DeleteBatch)

export const AdminRouter = router
