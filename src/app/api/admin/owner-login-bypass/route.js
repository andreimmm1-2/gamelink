import { supabase } from '../../../../lib/supabase'
import bcrypt from 'bcryptjs'
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'

// Local bypass for owner login. Only enabled when ALLOW_OWNER_BYPASS=true or not in production.
export async function POST(req) {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.ALLOW_OWNER_BYPASS !== 'true') {
      return new Response(JSON.stringify({ error: 'Bypass disabled' }), { status: 403 })
    }

    const { email, password } = await req.json()
    if (!email || !password) return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 })
    if (email !== 'andrei@gamelink.admin') return new Response(JSON.stringify({ error: 'Not owner' }), { status: 401 })

    // Fetch user
    const { data: user, error: userError } = await supabase.from('users').select('*').eq('email', email).single()
    if (userError || !user) return new Response(JSON.stringify({ error: 'Account not found' }), { status: 401 })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 })

    // Try to clear previous sessions but ignore errors if table missing
    try {
      await supabase.from('admin_sessions').delete().eq('email', email)
    } catch (e) {
      // ignore
    }

    const sessionId = `bypass_${Date.now()}_${Math.random().toString(36).slice(2,9)}`
    try {
      await supabase.from('admin_sessions').insert({ email, role: 'owner', session_id: sessionId, created_at: new Date().toISOString(), expires_at: new Date(Date.now()+30*24*60*60*1000).toISOString() })
    } catch (e) {
      // ignore insert errors (table may not exist)
    }

    const token = jwt.sign({ id: user.id, email: user.email, username: user.username, role: 'owner', sessionId, isOwner: true }, process.env.JWT_SECRET, { expiresIn: '30d' })

    const cookieHeader = serialize('admin_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 30*24*60*60 })

    return new Response(JSON.stringify({ message: 'Bypass login successful', user: { id: user.id, email: user.email, username: user.username } }), { status: 200, headers: { 'Set-Cookie': cookieHeader } })
  } catch (err) {
    console.error('Bypass login error:', err)
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 })
  }
}
