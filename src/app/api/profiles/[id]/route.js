import { supabase } from '../../../../lib/supabase'
import { getUserFromRequest } from '../../../../lib/middleware/authMiddleware'

export async function GET(req, { params }) {
  try {
    const { id } = params
    const { data: profile, error } = await supabase
      .from('game_profiles')
      .select(`
        id,
        user_id,
        game,
        in_game_name,
        description,
        availability,
        created_at,
        users:user_id(id, username, profile_picture)
      `)
      .eq('id', id)
      .maybeSingle()

    if (error || !profile) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ profile }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Get profile by id error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function PUT(req, { params }) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    const { id } = params
    const { data: profile } = await supabase
      .from('game_profiles')
      .select('user_id')
      .eq('id', id)
      .maybeSingle()

    if (!profile) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    if (profile.user_id !== user.id) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })

    const body = await req.json()
    const updates = {}
    if (typeof body.game === 'string') updates.game = body.game
    if (typeof body.inGameName === 'string') updates.in_game_name = body.inGameName
    if (typeof body.description === 'string') updates.description = body.description
    if (typeof body.availability === 'string') updates.availability = body.availability

    const { data: updated, error } = await supabase
      .from('game_profiles')
      .update(updates)
      .eq('id', id)
      .select(`
        id,
        user_id,
        game,
        in_game_name,
        description,
        availability,
        created_at,
        users:user_id(id, username, profile_picture)
      `)
      .single()

    if (error || !updated) return new Response(JSON.stringify({ error: 'Update failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ profile: updated }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Update profile error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    const { id } = params
    const { data: profile } = await supabase
      .from('game_profiles')
      .select('user_id')
      .eq('id', id)
      .maybeSingle()

    if (!profile) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    if (profile.user_id !== user.id) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })

    const { error } = await supabase
      .from('game_profiles')
      .delete()
      .eq('id', id)

    if (error) return new Response(JSON.stringify({ error: 'Delete failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Delete profile error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
