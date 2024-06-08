import { Router } from 'express'

import { DashboardController, LoginController } from '@/controller/admin'
import { auth, validate } from '@/middlewares'
import { authSchema } from '@/schemas/admin'

const router = Router()

router.post('/login', [validate(authSchema)], LoginController)
router.get('/dashboard', [auth], DashboardController)

export default router
