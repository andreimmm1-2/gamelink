import { createClient } from '@supabase/supabase-js'
import { verifyAuth } from '../../../../lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function GET(req, { params }) {
  try {
    const user = await verifyAuth(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    const { userId } = params

    // Verify they are friends
    const { data: friendship } = await supabase
      .from('friends')
      .select('id')
      .eq('user_id', user.id)
      .eq('friend_id', userId)
      .single()

    if (!friendship) {
      return new Response(JSON.stringify({ error: 'Not friends' }), { status: 403 })
    }

    // Get messages between users
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*, sender:users(id, username)')
      .or(`and(sender_id.eq.${user.id},recipient_id.eq.${userId}),and(sender_id.eq.${userId},recipient_id.eq.${user.id})`)
      .order('created_at', { ascending: true })

    if (error) throw error

    // Get friend info
    const { data: friend } = await supabase
      .from('users')
      .select('id, username, profile_picture')
      .eq('id', userId)
      .single()

    return new Response(JSON.stringify({ messages: messages || [], friend }), { status: 200 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
