import { supabase } from '../../../../../lib/supabase'
import { getUserFromRequest } from '../../../../../lib/middleware/authMiddleware'

export async function GET(req, { params }) {
  try {
    const { username } = params
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, email, bio, profile_picture, created_at')
      .eq('username', username)
      .maybeSingle()

    if (error || !user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ user }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Get user error', err)
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
