import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

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

export async function GET(req) {
  const admin = verifyAdminToken(req)
  if (!admin) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    // Get stats
    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    const { count: promotionCount } = await supabase
      .from('promotions')
      .select('*', { count: 'exact', head: true })

    const { count: openTickets } = await supabase
      .from('support_tickets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'open')

    const { count: staffCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .in('role', ['staff', 'staff-manager', 'co-owner'])

    return new Response(
      JSON.stringify({
        stats: {
          totalUsers: userCount || 0,
          totalPromotions: promotionCount || 0,
          openTickets: openTickets || 0,
          staffMembers: staffCount || 0
        }
      }),
      { status: 200 }
    )
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
