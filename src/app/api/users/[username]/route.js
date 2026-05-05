import { supabase } from '../../../../lib/supabase'
import { getUserFromRequest } from '../../../../lib/middleware/authMiddleware'

// Helper to check if string is UUID
function isUUID(str) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export async function GET(req, { params }) {
  try {
    const { username } = params
    
    let query = supabase
      .from('users')
      .select('id, username, email, bio, profile_picture, created_at, profiles:game_profiles(id, game, inGameName, in_game_name, description, availability)')
    
    // Check if it's a UUID or username
    if (isUUID(username)) {
      query = query.eq('id', username)
    } else {
      query = query.eq('username', username)
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

    const { username } = params
    
    // Check if trying to update own profile
    const isOwnId = isUUID(username) ? current.id === username : current.username === username
    if (!isOwnId) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const body = await req.json()
    const updates = {}
    if (typeof body.bio === 'string') updates.bio = body.bio
    if (typeof body.profile_picture === 'string') updates.profile_picture = body.profile_picture

    // Update by ID if UUID, otherwise by username
    let updateQuery = supabase.from('users').update(updates)
    if (isUUID(username)) {
      updateQuery = updateQuery.eq('id', username)
    } else {
      updateQuery = updateQuery.eq('username', username)
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

    const { username } = params
    
    // Check if trying to delete own account
    const isOwnId = isUUID(username) ? current.id === username : current.username === username
    if (!isOwnId) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const userId = isUUID(username) ? username : current.id

    // Delete all user data
    await Promise.all([
      supabase.from('game_profiles').delete().eq('user_id', userId),
      supabase.from('friend_requests').delete().or(`sender_id.eq.${userId},recipient_id.eq.${userId}`),
      supabase.from('friends').delete().or(`user_id.eq.${userId},friend_id.eq.${userId}`),
      supabase.from('messages').delete().or(`sender_id.eq.${userId},recipient_id.eq.${userId}`),
      supabase.from('users').delete().eq('id', userId)
    ])

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

    const { username } = params
    if (current.username !== username && current.id !== username) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const body = await req.json()
    const updates = {}
    if (typeof body.bio === 'string') updates.bio = body.bio
    if (typeof body.profile_picture === 'string') updates.profile_picture = body.profile_picture

    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq('username', username)
      .select('id, username, email, bio, profile_picture, created_at')
      .single()

    if (error || !user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })

    return new Response(JSON.stringify({ user }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Update user error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
