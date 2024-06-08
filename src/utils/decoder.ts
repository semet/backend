import jwt, { JwtPayload } from 'jsonwebtoken'

export const decodeJWT = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.decode(token) as JwtPayload

    return decoded
  } catch {
    return null
  }
}
