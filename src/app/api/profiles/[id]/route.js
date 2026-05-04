import connectToDB from '../../../../lib/db'
import GameProfile from '../../../../models/GameProfile'
import { getUserFromRequest } from '../../../../lib/middleware/authMiddleware'

export async function GET(req, { params }) {
  try {
    await connectToDB()
    const { id } = params
    const profile = await GameProfile.findById(id).populate('userId', 'username profilePicture')
    if (!profile) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ profile }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Get profile by id error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB()
    const user = await getUserFromRequest(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    const { id } = params
    const profile = await GameProfile.findById(id)
    if (!profile) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    if (profile.userId.toString() !== user.id) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })

    const body = await req.json()
    const updates = {}
    if (typeof body.game === 'string') updates.game = body.game
    if (typeof body.inGameName === 'string') updates.inGameName = body.inGameName
    if (typeof body.description === 'string') updates.description = body.description
    if (typeof body.availability === 'string') updates.availability = body.availability

    const updated = await GameProfile.findByIdAndUpdate(id, { $set: updates }, { new: true }).populate('userId', 'username profilePicture')
    return new Response(JSON.stringify({ profile: updated }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Update profile error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB()
    const user = await getUserFromRequest(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    const { id } = params
    const profile = await GameProfile.findById(id)
    if (!profile) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    if (profile.userId.toString() !== user.id) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })

    await profile.remove()
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Delete profile error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
