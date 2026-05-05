import { createClient } from '@supabase/supabase-js'
import { verifyAuth } from '../../../../lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function GET(req) {
  try {
    const user = await verifyAuth(req)
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    // Get user's support tickets
    const { data: tickets, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return new Response(JSON.stringify({ tickets: tickets || [] }), { status: 200 })
  } catch (err) {
    console.error('Error fetching tickets:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function POST(req) {
  try {
    const user = await verifyAuth(req)
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const { subject, category, description } = await req.json()

    if (!subject || !category || !description) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    // Create ticket
    const { data: ticket, error } = await supabase
      .from('support_tickets')
      .insert({
        user_id: user.id,
        subject,
        category,
        description,
        status: 'open',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ ticket }), { status: 201 })
  } catch (err) {
    console.error('Error creating ticket:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
