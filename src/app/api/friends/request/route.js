import { supabase } from '../../../../lib/supabase'
import { getUserFromRequest } from '../../../../lib/middleware/authMiddleware'

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    const { recipientId } = await req.json()

    if (user.id === recipientId) {
      return new Response(JSON.stringify({ error: 'Cannot friend request yourself' }), { status: 400 })
    }

    // Check if request already exists
    const { data: existing } = await supabase
      .from('friend_requests')
      .select('id')
      .or(`and(sender_id.eq.${user.id},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${user.id})`)
      .single()

    if (existing) {
      return new Response(JSON.stringify({ error: 'Friend request already exists' }), { status: 400 })
    }

    // Create friend request
    const { data, error } = await supabase
      .from('friend_requests')
      .insert({
        sender_id: user.id,
        recipient_id: recipientId,
        status: 'pending'
      })
      .select()
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ request: data }), { status: 201 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function GET(req) {
  try {
    const user = await verifyAuth(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    // Get pending friend requests
    const { data, error } = await supabase
      .from('friend_requests')
      .select('*, sender:users(id, username)')
      .eq('recipient_id', user.id)
      .eq('status', 'pending')

    if (error) throw error

    return new Response(JSON.stringify({ requests: data || [] }), { status: 200 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
