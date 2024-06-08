/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express'
import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any> | JwtPayload
    }
  }
}
