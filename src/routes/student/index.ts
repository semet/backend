import { Router } from 'express'

import {
  ForgotPasswordController,
  LoginController,
  LogoutController,
  RefreshTokenController,
  ResetPasswordController,
  VerifyEmailController,
  DashboardController,
} from '@/controller/student'

const router = Router()

router.post('/login', LoginController)
router.post('/logout', LogoutController)
router.post('/refresh-token', RefreshTokenController)
router.post('/forgot-password', ForgotPasswordController)
router.post('/verify-email', VerifyEmailController)
router.post('/reset-password', ResetPasswordController)
router.get('/dashboard', DashboardController)

export const StudentRouter = router
