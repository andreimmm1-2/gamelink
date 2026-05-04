import bcrypt from 'bcryptjs'
import { supabase } from '../../../../lib/supabase'
import { signToken, serializeTokenCookie } from '../../../../lib/auth'

export async function POST(req) {
  try {
    const body = await req.json()
    const { username, email, password } = body

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: 'username, email and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .or(`username.eq.${username},email.eq.${email}`)
      .maybeSingle()

    if (existing) {
      return new Response(JSON.stringify({ error: 'Email or username already in use' }), { status: 409, headers: { 'Content-Type': 'application/json' } })
    }

    const hashed = await bcrypt.hash(password, 10)
    const { data: user, error } = await supabase
      .from('users')
      .insert({ username, email, password: hashed })
      .select()
      .single()

    if (error || !user) {
      return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    const token = signToken({ id: user.id, email: user.email, username: user.username })
    const cookie = serializeTokenCookie(token)

    const { password: _, ...userOut } = user
    return new Response(JSON.stringify({ user: userOut }), { status: 201, headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Register error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
