import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import { hasPermission } from '../../../../../lib/admin'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

function verifyAdminToken(req) {
  const cookie = req.headers.get('cookie')
  const token = cookie
    ?.split(';')
    .find(c => c.trim().startsWith('admin_token='))
    ?.split('=')[1]

  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.isAdmin ? decoded : null
  } catch {
    return null
  }
}

export async function DELETE(req, { params }) {
  const admin = verifyAdminToken(req)
  if (!admin || !hasPermission(admin.role, 'deleteUsers')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { userId } = params

    // Delete user
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)

    if (error) throw error

    return new Response(JSON.stringify({ message: 'User deleted' }), { status: 200 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
