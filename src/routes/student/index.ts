import { Router } from 'express'

import {
  ForgotPasswordController,
  LoginController,
  LogoutController,
  RefreshTokenController,
  ResetPasswordController,
  VerifyEmailController,
  DashboardController,
  UpdatePasswordController,
} from '@/controller/student'
import { validate } from '@/middlewares'
import { forgotPasswordSchema } from '@/schemas/admin'
import { authSchema, updatePasswordSchema } from '@/schemas/student'

const router = Router()

router.post('/login', [validate(authSchema)], LoginController)
router.post('/logout', LogoutController)
router.post('/refresh-token', RefreshTokenController)
router.post(
  '/forgot-password',
  [validate(forgotPasswordSchema)],
  ForgotPasswordController,
)
// Update password when the student forgot it
router.get(
  '/update-password/:token',
  [validate(updatePasswordSchema)],
  UpdatePasswordController,
)
router.post('/verify-email', VerifyEmailController)
// Reset password when the student is logged in
router.post('/reset-password', ResetPasswordController)
router.get('/dashboard', DashboardController)

export const StudentRouter = router
