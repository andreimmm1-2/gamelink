import { supabase } from '../../../lib/supabase'
import { getUserFromRequest } from '../../../lib/middleware/authMiddleware'

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const game = url.searchParams.get('game')
    const userId = url.searchParams.get('userId')

    let query = supabase
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
      .order('created_at', { ascending: false })

    if (game) query = query.eq('game', game)
    if (userId) query = query.eq('user_id', userId)

    const { data: profiles, error } = await query

    if (error) return new Response(JSON.stringify({ error: 'Failed to fetch profiles' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ profiles }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Get profiles error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    const body = await req.json()
    const { game, inGameName, description, availability } = body
    if (!game || !inGameName) {
      return new Response(JSON.stringify({ error: 'game and inGameName are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const { data: profile, error } = await supabase
      .from('game_profiles')
      .insert({
        user_id: user.id,
        game,
        in_game_name: inGameName,
        description: description || '',
        availability: availability || '',
      })
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

    if (error || !profile) return new Response(JSON.stringify({ error: 'Failed to create profile' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ profile }), { status: 201, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Create profile error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
