import { supabase } from '../../../../lib/supabase'
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'

// Owner login now supports code-based verification: send a code to the owner email
// using `/api/admin/owner-request-code`, then POST { email, code } here to create session.

export async function POST(req) {
  try {
    const { email, code } = await req.json()

    // Owner only - hardcoded to andrei@gamelink.admin
    if (email !== 'andrei@gamelink.admin') {
      return new Response(JSON.stringify({ error: 'Owner account email not recognized' }), { status: 401 })
    }

    // Require code-based verification for owner login
    if (!code) {
      return new Response(JSON.stringify({ error: 'Verification code required. Request one at /api/admin/owner-request-code' }), { status: 400 })
    }

    // Verify code
    const now = new Date().toISOString()
    const { data: codeRow, error: codeError } = await supabase
      .from('admin_verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gte('expires_at', now)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (codeError) {
      console.error('Code lookup error:', codeError)
      return new Response(JSON.stringify({ error: 'Verification failed' }), { status: 500 })
    }

    if (!codeRow) {
      return new Response(JSON.stringify({ error: 'Invalid or expired code' }), { status: 401 })
    }

    // Get user record
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Account not found' }), { status: 401 })
    }

    // IMPORTANT: Invalidate all previous owner sessions
    const { error: deleteError } = await supabase
      .from('admin_sessions')
      .delete()
      .eq('email', email)

    if (deleteError) {
      console.error('Error clearing previous sessions:', deleteError)
    }

    // Create new session record (include IP and User-Agent when available)
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || req.headers.get('cf-connecting-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || null
    const { error: insertError } = await supabase
      .from('admin_sessions')
      .insert({
        email,
        role: 'owner',
        session_id: sessionId,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        ip,
        user_agent: userAgent
      })

    if (insertError) {
      console.error('Error creating session:', insertError)
    }

    // Create JWT token (for cookie validation)
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: 'owner',
        sessionId: sessionId,
        isOwner: true
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    // Set secure httpOnly cookie
    const cookieHeader = serialize('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })

    return new Response(
      JSON.stringify({
        message: 'Owner login successful',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: 'owner'
        }
      }),
      {
        status: 200,
        headers: { 'Set-Cookie': cookieHeader }
      }
    )
  } catch (err) {
    console.error('Owner login error:', err)
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 })
  }
}
