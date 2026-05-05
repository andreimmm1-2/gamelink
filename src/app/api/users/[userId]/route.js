import { createClient } from '@supabase/supabase-js'
import { getUserFromRequest } from '../../../../lib/middleware/authMiddleware'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// PATCH - Update user bio and other profile data
export async function PATCH(req, { params }) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const { userId } = params

    // Users can only update their own profile
    if (user.id !== userId) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
    }

    const { bio } = await req.json()

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({ bio })
      .eq('id', userId)
      .select('id, username, email, bio, profile_picture')
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ user: updatedUser }), { status: 200 })
  } catch (err) {
    console.error('Error updating user:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

// DELETE - Delete user account
export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const { userId } = params

    // Users can only delete their own account
    if (user.id !== userId) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
    }

    // Delete all user data
    await Promise.all([
      supabase.from('game_profiles').delete().eq('user_id', userId),
      supabase.from('friend_requests').delete().or(`sender_id.eq.${userId},recipient_id.eq.${userId}`),
      supabase.from('friends').delete().or(`user_id.eq.${userId},friend_id.eq.${userId}`),
      supabase.from('messages').delete().or(`sender_id.eq.${userId},recipient_id.eq.${userId}`),
      supabase.from('users').delete().eq('id', userId)
    ])

    return new Response(JSON.stringify({ message: 'Account deleted successfully' }), { status: 200 })
  } catch (err) {
    console.error('Error deleting user:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

// GET - Fetch user by ID
export async function GET(req, { params }) {
  try {
    const { userId } = params

    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, email, bio, profile_picture, created_at')
      .eq('id', userId)
      .single()

    if (error || !user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    return new Response(JSON.stringify({ user }), { status: 200 })
  } catch (err) {
    console.error('Error fetching user:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
