import { supabase } from '../../../../../lib/supabase'
import { requireAdmin } from '../../../../../lib/middleware/adminMiddleware'

export async function DELETE(req, { params }) {
  try {
    await requireAdmin(req)
    const { id } = params
    const { data: promo } = await supabase
      .from('promotions')
      .select('id')
      .eq('id', id)
      .maybeSingle()

    if (!promo) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })

    const { error } = await supabase
      .from('promotions')
      .delete()
      .eq('id', id)

    if (error) return new Response(JSON.stringify({ error: 'Delete failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    if (err.status === 401 || err.status === 403) return new Response(JSON.stringify({ error: err.message }), { status: err.status, headers: { 'Content-Type': 'application/json' } })
    console.error('Delete promotion error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
