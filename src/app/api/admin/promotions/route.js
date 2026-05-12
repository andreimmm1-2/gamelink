import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import { hasPermission } from '../../../../lib/admin'

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
  if (!admin || !hasPermission(admin.role, 'managePromotions')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { data: promotions, error } = await supabase
      .from('promotions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return new Response(JSON.stringify({ promotions: promotions || [] }), { status: 200 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function POST(req) {
  const admin = verifyAdminToken(req)
  if (!admin || !hasPermission(admin.role, 'managePromotions')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { title, description, game, serverName, playerCount, joinUrl } = await req.json()

    const { data: promotion, error } = await supabase
      .from('promotions')
      .insert({
        title,
        description,
        game,
        server_name: serverName,
        player_count: parseInt(playerCount) || 0,
        join_url: joinUrl,
        created_by: admin.id
      })
      .select()
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ promotion }), { status: 201 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
