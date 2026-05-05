import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { verifyAuth } from '../../../../lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST(req) {
  try {
    const user = await verifyAuth(req)
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    // Get user's current password hash
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('password')
      .eq('id', user.id)
      .single()

    if (fetchError || !userData) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, userData.password)
    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: 'Current password is incorrect' }), { status: 401 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    const { error: updateError } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', user.id)

    if (updateError) throw updateError

    return new Response(JSON.stringify({ message: 'Password changed successfully' }), { status: 200 })
  } catch (err) {
    console.error('Error changing password:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
