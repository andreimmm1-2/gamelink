import { createClient } from '@supabase/supabase-js'
import { verifyAuth } from '../../../lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST(req) {
  try {
    const user = await verifyAuth(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    const { recipientId, content } = await req.json()

    if (!recipientId || !content) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    // Verify they are friends
    const { data: friendship } = await supabase
      .from('friends')
      .select('id')
      .eq('user_id', user.id)
      .eq('friend_id', recipientId)
      .single()

    if (!friendship) {
      return new Response(JSON.stringify({ error: 'Not friends' }), { status: 403 })
    }

    // Create message
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        recipient_id: recipientId,
        content,
        created_at: new Date().toISOString()
      })
      .select('*, sender:users(id, username)')
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ message: data }), { status: 201 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function GET(req) {
  try {
    const user = await verifyAuth(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    // Get list of conversations (friends with recent messages)
    const { data: friends, error: friendError } = await supabase
      .from('friends')
      .select('friend:friend_id(id, username), created_at')
      .eq('user_id', user.id)

    if (friendError) throw friendError

    // Get recent messages for each friend
    const conversations = await Promise.all(
      (friends || []).map(async (f) => {
        const { data: messages } = await supabase
          .from('messages')
          .select('*')
          .or(`and(sender_id.eq.${user.id},recipient_id.eq.${f.friend_id}),and(sender_id.eq.${f.friend_id},recipient_id.eq.${user.id})`)
          .order('created_at', { ascending: false })
          .limit(1)

        return {
          friend: f.friend,
          lastMessage: messages?.[0],
          connectedAt: f.created_at
        }
      })
    )

    return new Response(JSON.stringify({ conversations }), { status: 200 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
