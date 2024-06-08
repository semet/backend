import express from 'express'
import helmet from 'helmet'
import 'dotenv/config'

import { auth, cors, logger } from '@/middlewares'
import { AdminRouter, StudentRouter } from '@/routes'

const app = express()
app.use(logger)
app.use(helmet())
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/admin', [auth], AdminRouter)
app.use('/student', [auth], StudentRouter)

export default app
