import { Router } from 'express'

import { DashboardController, LoginController } from '@/controller/admin'
import { validate } from '@/middlewares'
import { authSchema } from '@/schemas/admin'

const router = Router()

router.post('/login', [validate(authSchema)], LoginController)
router.get('/dashboard', DashboardController)

export const AdminRouter = router
