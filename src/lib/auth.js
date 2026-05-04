import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

export function serializeTokenCookie(token) {
  const secure = process.env.NODE_ENV === 'production'
  const maxAge = 7 * 24 * 60 * 60 // 7 days in seconds
  return serialize('token', token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge,
  })
}
