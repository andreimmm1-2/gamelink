import bcrypt from 'bcryptjs'
import { supabase } from '../../../../lib/supabase'
import { signToken, serializeTokenCookie } from '../../../../lib/auth'

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'email and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    if (error || !user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const token = signToken({ id: user.id, email: user.email, username: user.username })
    const cookie = serializeTokenCookie(token)

    const { password: _, ...userOut } = user
    return new Response(JSON.stringify({ user: userOut }), { status: 200, headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Login error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
