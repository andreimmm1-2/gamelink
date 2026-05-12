import { supabase } from '../../../../lib/supabase'
import { getUserFromRequest } from '../../../../lib/middleware/authMiddleware'

export async function GET(req, { params }) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    const { userId } = params

    // Verify they are friends
    const { data: friendship, error: friendshipError } = await supabase
      .from('friends')
      .select('id')
      .eq('user_id', user.id)
      .eq('friend_id', userId)
      .maybeSingle()

    if (friendshipError) throw friendshipError

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
