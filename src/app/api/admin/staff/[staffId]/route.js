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
    return decoded.isAdmin || decoded.isOwner ? decoded : null
  } catch {
    return null
  }
}

export async function PATCH(req, { params }) {
  const admin = verifyAdminToken(req)
  if (!admin || !hasPermission(admin.role, 'manageStaff')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { staffId } = params
    const { role } = await req.json()

    // Only owner can change roles
    if (admin.role !== 'owner') {
      return new Response(JSON.stringify({ error: 'Only owners can change staff roles' }), { status: 403 })
    }

    const { error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', staffId)

    if (error) throw error

    return new Response(JSON.stringify({ message: 'Staff role updated' }), { status: 200 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  const admin = verifyAdminToken(req)
  if (!admin || !hasPermission(admin.role, 'manageStaff')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { staffId } = params

    // Remove staff role (set back to user)
    const { error } = await supabase
      .from('users')
      .update({ role: 'user' })
      .eq('id', staffId)

    if (error) throw error

    return new Response(JSON.stringify({ message: 'Staff member removed' }), { status: 200 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
