import connectToDB from '../../../../../src/lib/db'
import User from '../../../../../src/models/User'
import { getUserFromRequest } from '../../../../../src/lib/middleware/authMiddleware'

export async function GET(req, { params }) {
  try {
    await connectToDB()
    const { username } = params
    const user = await User.findOne({ username }).select('-password')
    if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ user }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Get user error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB()
    const current = await getUserFromRequest(req)
    if (!current) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    const { username } = params
    if (current.username !== username && current.id !== username) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const body = await req.json()
    const updates = {}
    if (typeof body.bio === 'string') updates.bio = body.bio
    if (typeof body.profilePicture === 'string') updates.profilePicture = body.profilePicture

    const user = await User.findOneAndUpdate({ username }, { $set: updates }, { new: true }).select('-password')
    if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })

    return new Response(JSON.stringify({ user }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('Update user error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
