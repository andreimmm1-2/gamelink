import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 })
    }

    // Verify email is @gamelink.admin
    if (!email.includes('@gamelink.admin')) {
      return new Response(JSON.stringify({ error: 'Invalid admin email domain' }), { status: 401 })
    }

    // Check if user exists and is admin
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, email, password, role')
      .eq('email', email)
      .single()

    if (error || !user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
    }

    // Check if user has admin role
    if (!['owner', 'co-owner', 'staff-manager', 'staff'].includes(user.role)) {
      return new Response(JSON.stringify({ error: 'Not authorized' }), { status: 403 })
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    // Set cookie
    const cookie = serialize('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return new Response(
      JSON.stringify({ message: 'Admin login successful', user: { id: user.id, email: user.email, role: user.role } }),
      {
        status: 200,
        headers: { 'Set-Cookie': cookie }
      }
    )
  } catch (err) {
    console.error('Admin login error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
