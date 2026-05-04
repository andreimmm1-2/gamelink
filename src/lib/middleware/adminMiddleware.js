import { getUserFromRequest } from './authMiddleware'

export async function requireAdmin(req) {
  const user = await getUserFromRequest(req)
  if (!user) {
    const err = new Error('Unauthorized')
    err.status = 401
    throw err
  }

  const adminEnv = process.env.ADMIN_USER_IDS || ''
  const admins = adminEnv.split(',').map((s) => s.trim()).filter(Boolean)
  if (!admins.includes(user.id)) {
    const err = new Error('Forbidden')
    err.status = 403
    throw err
  }

  return user
}
