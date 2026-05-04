import { getUserFromRequest } from '../../../../../src/lib/middleware/authMiddleware'

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return new Response(JSON.stringify({ user: null }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ user }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Me route error', err)
    return new Response(JSON.stringify({ user: null }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }
}
