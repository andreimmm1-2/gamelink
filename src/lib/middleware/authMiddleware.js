import cookie from 'cookie'
import { verifyToken } from '../auth'

export async function getUserFromRequest(req) {
  const cookieHeader = req.headers.get('cookie') || ''
  const parsed = cookie.parse(cookieHeader || '')
  const token = parsed.token
  if (!token) return null
  try {
    const payload = verifyToken(token)
    return payload
  } catch (err) {
    return null
  }
}

export async function requireAuth(req) {
  const user = await getUserFromRequest(req)
  if (!user) {
    const err = new Error('Unauthorized')
    err.status = 401
    throw err
  }
  return user
}
