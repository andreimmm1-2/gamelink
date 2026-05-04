import bcrypt from 'bcryptjs'
import connectToDB from '../../../../lib/db'
import User from '../../../../models/User'
import { signToken, serializeTokenCookie } from '../../../../lib/auth'

export async function POST(req) {
  try {
    await connectToDB()
    const body = await req.json()
    const { username, email, password } = body

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: 'username, email and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] })
    if (existing) {
      return new Response(JSON.stringify({ error: 'Email or username already in use' }), { status: 409, headers: { 'Content-Type': 'application/json' } })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashed })

    const token = signToken({ id: user._id.toString(), email: user.email, username: user.username })
    const cookie = serializeTokenCookie(token)

    const bodyOut = { user: user.toJSON() }

    return new Response(JSON.stringify(bodyOut), { status: 201, headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Register error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
