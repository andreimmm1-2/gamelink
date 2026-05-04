import connectToDB from '../../../lib/db'
import GameProfile from '../../../models/GameProfile'
import User from '../../../models/User'
import { getUserFromRequest } from '../../../lib/middleware/authMiddleware'

export async function GET(req) {
  try {
    await connectToDB()
    const url = new URL(req.url)
    const game = url.searchParams.get('game')
    const userId = url.searchParams.get('userId')

    let query = {}
    if (game) query.game = game
    if (userId) query.userId = userId

    const profiles = await GameProfile.find(query).sort({ createdAt: -1 }).populate('userId', 'username profilePicture')
    return new Response(JSON.stringify({ profiles }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Get profiles error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function POST(req) {
  try {
    await connectToDB()
    const user = await getUserFromRequest(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    const body = await req.json()
    const { game, inGameName, description, availability } = body
    if (!game || !inGameName) {
      return new Response(JSON.stringify({ error: 'game and inGameName are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const profile = await GameProfile.create({
      userId: user.id,
      game,
      inGameName,
      description: description || '',
      availability: availability || '',
    })

    const populated = await profile.populate('userId', 'username profilePicture')
    return new Response(JSON.stringify({ profile: populated }), { status: 201, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Create profile error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
