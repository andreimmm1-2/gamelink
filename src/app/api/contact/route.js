export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    // For now, just log to console (in production, use nodemailer or SendGrid)
    console.log('Contact Form Submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    })

    // Store in database (optional)
    // const { error } = await supabase
    //   .from('contact_messages')
    //   .insert({ name, email, subject, message })

    return new Response(
      JSON.stringify({ message: 'Message received successfully' }),
      { status: 200 }
    )
  } catch (err) {
    console.error('Contact form error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
