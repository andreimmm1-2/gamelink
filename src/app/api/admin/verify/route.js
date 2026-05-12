import jwt from 'jsonwebtoken'
import { supabase } from '../../../../lib/supabase'

export async function GET(req) {
  try {
    const cookie = req.headers.get('cookie')
    const token = cookie
      ?.split(';')
      .find(c => c.trim().startsWith('admin_token='))
      ?.split('=')[1]

    if (!token) {
      return new Response(JSON.stringify({ error: 'No token' }), { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Owner tokens include a sessionId and must be validated against admin_sessions
    if (decoded.isOwner) {
      const { data: session, error: sessionError } = await supabase
        .from('admin_sessions')
        .select('*')
        .eq('session_id', decoded.sessionId)
        .maybeSingle()

      if (sessionError) {
        console.error('Session lookup error:', sessionError)
        const msg = sessionError.message || JSON.stringify(sessionError)
        // If the admin_sessions table doesn't exist (PGRST205), fall back to permissive owner validation
        if (sessionError.code === 'PGRST205' || (msg && msg.includes("Could not find the table"))) {
          console.warn('admin_sessions table missing — falling back to permissive owner check')
          return new Response(
            JSON.stringify({ user: { id: decoded.id, email: decoded.email, role: decoded.role, isOwner: true, warning: 'admin_sessions missing' } }),
            { status: 200 }
          )
        }

        return new Response(JSON.stringify({ error: 'Session lookup failed', detail: msg }), { status: 500 })
      }

      if (!session) {
        return new Response(JSON.stringify({ error: 'Session not found' }), { status: 401 })
      }

      const now = new Date().toISOString()
      if (session.expires_at && session.expires_at <= now) {
        return new Response(JSON.stringify({ error: 'Session expired' }), { status: 401 })
      }

      return new Response(
        JSON.stringify({ user: { id: decoded.id, email: decoded.email, role: decoded.role, isOwner: true } }),
        { status: 200 }
      )
    }

    if (!decoded.isAdmin) {
      return new Response(JSON.stringify({ error: 'Not admin' }), { status: 403 })
    }

    return new Response(
      JSON.stringify({ user: { id: decoded.id, email: decoded.email, role: decoded.role } }),
      { status: 200 }
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 })
  }
}
