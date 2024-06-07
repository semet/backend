import express from 'express'
import helmet from 'helmet'
import 'dotenv/config'

import { corsMiddleware, requestLogger } from '@/middlewares'

const app = express()
app.use(requestLogger)
app.use(helmet())
app.use(corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

export default app
