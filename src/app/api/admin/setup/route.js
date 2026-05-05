import { supabase } from '../../../../lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { email, password, setupKey } = await req.json()

    // Security check - require a setup key from env
    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return new Response(JSON.stringify({ error: 'Invalid setup key' }), { status: 401 })
    }

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Missing email or password' }), { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    let result
    if (existingUser) {
      // Update existing user
      result = await supabase
        .from('users')
        .update({ 
          password: hashedPassword
        })
        .eq('id', existingUser.id)
        .select()
        .single()
    } else {
      // Create new user
      result = await supabase
        .from('users')
        .insert({
          email,
          username: email.split('@')[0],
          password: hashedPassword,
          created_at: new Date().toISOString()
        })
        .select()
        .single()
    }

    if (result.error) throw result.error

    return new Response(JSON.stringify({ 
      message: 'Admin user created/updated successfully',
      user: result.data
    }), { status: 200 })
  } catch (err) {
    console.error('Admin setup error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
