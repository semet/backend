import express from 'express'
import helmet from 'helmet'
import 'dotenv/config'

import { cors, logger } from '@/middlewares'
import adminRoutes from '@/routes/admin'

const app = express()
app.use(logger)
app.use(helmet())
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/admin', adminRoutes)

export default app
