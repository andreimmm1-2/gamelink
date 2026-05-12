import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
import { supabase } from '../../../../lib/supabase'

export async function POST(req) {
  try {
    const cookieHeader = req.headers.get('cookie')
    const token = cookieHeader
      ?.split(';')
      .find(c => c.trim().startsWith('admin_token='))
      ?.split('=')[1]

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded && decoded.sessionId) {
          const { error } = await supabase.from('admin_sessions').delete().eq('session_id', decoded.sessionId)
          if (error) console.error('Error deleting admin session on logout:', error)
        }
      } catch (err) {
        console.error('Error decoding admin token during logout:', err)
      }
    }

    const cookie = serialize('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })

    return new Response(JSON.stringify({ message: 'Logged out' }), {
      status: 200,
      headers: { 'Set-Cookie': cookie }
    })
  } catch (err) {
    console.error('Logout error:', err)
    const cookie = serialize('admin_token', '', { httpOnly: true, path: '/' })
    return new Response(JSON.stringify({ message: 'Logged out' }), { status: 200, headers: { 'Set-Cookie': cookie } })
  }
}
