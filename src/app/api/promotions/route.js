import { supabase } from '../../../../lib/supabase'
import { requireAdmin } from '../../../../lib/middleware/adminMiddleware'

export async function GET(req) {
  try {
    const now = new Date().toISOString()
    const { data: active, error } = await supabase
      .from('promotions')
      .select('*')
      .gt('expires_at', now)
      .order('created_at', { ascending: false })

    if (error) return new Response(JSON.stringify({ error: 'Failed to fetch promotions' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ promotions: active || [] }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Get promotions error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function POST(req) {
  try {
    await requireAdmin(req)
    const body = await req.json()
    const { title, game, description, link, expiresAt } = body
    if (!title || !game || !link || !expiresAt) {
      return new Response(JSON.stringify({ error: 'title, game, link and expiresAt are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const { data: promo, error } = await supabase
      .from('promotions')
      .insert({ title, game, description: description || '', link, expires_at: new Date(expiresAt).toISOString() })
      .select()
      .single()

    if (error || !promo) return new Response(JSON.stringify({ error: 'Failed to create promotion' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ promotion: promo }), { status: 201, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    if (err.status === 401 || err.status === 403) return new Response(JSON.stringify({ error: err.message }), { status: err.status, headers: { 'Content-Type': 'application/json' } })
    console.error('Create promotion error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
