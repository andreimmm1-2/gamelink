import { supabase } from '../../../../lib/supabase'
import { getUserFromRequest } from '../../../../lib/middleware/authMiddleware'

// Helper to check if string is UUID
function isUUID(str) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export async function GET(req, { params }) {
  try {
    const { userId } = params

    let query = supabase
      .from('users')
      .select('id, username, email, bio, profile_picture, created_at, profiles:game_profiles(id, game, inGameName, in_game_name, description, availability)')

    // Check if it's a UUID or username
    if (isUUID(userId)) {
      query = query.eq('id', userId)
    } else {
      query = query.eq('username', userId)
    }

    const { data: user, error } = await query.maybeSingle()

    if (error || !user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ user }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Get user error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function PATCH(req, { params }) {
  try {
    const current = await getUserFromRequest(req)
    if (!current) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    const { userId } = params

    // Check if trying to update own profile
    const isOwnId = isUUID(userId) ? current.id === userId : current.username === userId
    if (!isOwnId) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const body = await req.json()
    const updates = {}
    if (typeof body.bio === 'string') updates.bio = body.bio
    if (typeof body.profile_picture === 'string') updates.profile_picture = body.profile_picture

    // Update by ID if UUID, otherwise by username
    let updateQuery = supabase.from('users').update(updates)
    if (isUUID(userId)) {
      updateQuery = updateQuery.eq('id', userId)
    } else {
      updateQuery = updateQuery.eq('username', userId)
    }

    const { data: user, error } = await updateQuery
      .select('id, username, email, bio, profile_picture, created_at')
      .single()

    if (error || !user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })

    return new Response(JSON.stringify({ user }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Update user error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function DELETE(req, { params }) {
  try {
    const current = await getUserFromRequest(req)
    if (!current) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    const { userId } = params

    // Check if trying to delete own account
    const isOwnId = isUUID(userId) ? current.id === userId : current.username === userId
    if (!isOwnId) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const targetUserId = isUUID(userId) ? userId : current.id

    // Delete all user data in order (important for foreign keys)
    const deletions = [
      supabase.from('support_tickets').delete().eq('user_id', targetUserId),
      supabase.from('game_profiles').delete().eq('user_id', targetUserId),
      supabase.from('messages').delete().or(`sender_id.eq.${targetUserId},recipient_id.eq.${targetUserId}`),
      supabase.from('friend_requests').delete().or(`sender_id.eq.${targetUserId},recipient_id.eq.${targetUserId}`),
      supabase.from('friends').delete().or(`user_id.eq.${targetUserId},friend_id.eq.${targetUserId}`),
      supabase.from('users').delete().eq('id', targetUserId)
    ]

    // Execute deletions sequentially to avoid constraint issues
    for (const deletion of deletions) {
      const { error } = await deletion
      if (error) {
        console.error('Deletion error:', error)
        // Continue with other deletions even if one fails
      }
    }

    return new Response(JSON.stringify({ message: 'Account deleted successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Delete user error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function PUT(req, { params }) {
  try {
    const current = await getUserFromRequest(req)
    if (!current) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    const { userId } = params
    if (current.username !== userId && current.id !== userId) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const body = await req.json()
    const updates = {}
    if (typeof body.bio === 'string') updates.bio = body.bio
    if (typeof body.profile_picture === 'string') updates.profile_picture = body.profile_picture

    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq(isUUID(userId) ? 'id' : 'username', userId)
      .select('id, username, email, bio, profile_picture, created_at')
      .single()

    if (error || !user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })

    return new Response(JSON.stringify({ user }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Update user error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}