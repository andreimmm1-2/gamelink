import jwt from 'jsonwebtoken'

export async function GET(req) {
  try {
    const cookie = req.headers.get('cookie')
    const token = cookie
      ?.split(';')
      .find(c => c.trim().startsWith('admin_token='))
      ?.split('=')[1]

    if (!token) {
      return new Response(JSON.stringify({ error: 'No token' }), { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded.isAdmin) {
      return new Response(JSON.stringify({ error: 'Not admin' }), { status: 403 })
    }

    return new Response(
      JSON.stringify({
        user: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role
        }
      }),
      { status: 200 }
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 })
  }
}
