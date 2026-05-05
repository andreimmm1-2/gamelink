import { supabase } from '../../../../../lib/supabase'
import { getUserFromRequest } from '../../../../../lib/middleware/authMiddleware'

export async function POST(req, { params }) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    const { requestId } = params
    const { action } = await req.json() // 'accept' or 'decline'

    // Get the request
    const { data: request, error: fetchError } = await supabase
      .from('friend_requests')
      .select('*')
      .eq('id', requestId)
      .eq('recipient_id', user.id)
      .single()

    if (fetchError || !request) {
      return new Response(JSON.stringify({ error: 'Request not found' }), { status: 404 })
    }

    if (action === 'accept') {
      // Create friendship in both directions
      await supabase
        .from('friends')
        .insert([
          { user_id: user.id, friend_id: request.sender_id },
          { user_id: request.sender_id, friend_id: user.id }
        ])

      // Mark request as accepted
      await supabase
        .from('friend_requests')
        .update({ status: 'accepted' })
        .eq('id', requestId)

      return new Response(JSON.stringify({ message: 'Friend request accepted' }), { status: 200 })
    } else if (action === 'decline') {
      // Mark request as declined
      await supabase
        .from('friend_requests')
        .update({ status: 'declined' })
        .eq('id', requestId)

      return new Response(JSON.stringify({ message: 'Friend request declined' }), { status: 200 })
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
