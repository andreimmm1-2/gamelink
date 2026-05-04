import connectToDB from '../../../../lib/db'
import Promotion from '../../../../models/Promotion'
import { requireAdmin } from '../../../../lib/middleware/adminMiddleware'

export async function GET(req) {
  try {
    await connectToDB()
    const now = new Date()
    const active = await Promotion.find({ expiresAt: { $gt: now } }).sort({ createdAt: -1 })
    return new Response(JSON.stringify({ promotions: active }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Get promotions error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function POST(req) {
  try {
    await connectToDB()
    await requireAdmin(req)
    const body = await req.json()
    const { title, game, description, link, expiresAt } = body
    if (!title || !game || !link || !expiresAt) {
      return new Response(JSON.stringify({ error: 'title, game, link and expiresAt are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const promo = await Promotion.create({ title, game, description: description || '', link, expiresAt: new Date(expiresAt) })
    return new Response(JSON.stringify({ promotion: promo }), { status: 201, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    if (err.status === 401 || err.status === 403) return new Response(JSON.stringify({ error: err.message }), { status: err.status, headers: { 'Content-Type': 'application/json' } })
    console.error('Create promotion error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
