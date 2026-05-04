import bcrypt from 'bcryptjs'
import connectToDB from '../../../../lib/db'
import User from '../../../../models/User'
import { signToken, serializeTokenCookie } from '../../../../lib/auth'

export async function POST(req) {
  try {
    await connectToDB()
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'email and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const token = signToken({ id: user._id.toString(), email: user.email, username: user.username })
    const cookie = serializeTokenCookie(token)

    const bodyOut = { user: user.toJSON() }
    return new Response(JSON.stringify(bodyOut), { status: 200, headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Login error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
