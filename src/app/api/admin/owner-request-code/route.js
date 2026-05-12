import { supabase } from '../../../../lib/supabase'

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendEmail({ to, subject, text }) {
  try {
    // Attempt to use nodemailer if available and SMTP env configured
    const hasSMTP = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    if (hasSMTP) {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      })

      await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to, subject, text })
      return { success: true }
    }
  } catch (err) {
    console.error('Email send error:', err)
  }

  // Fallback: log to server console (for local dev)
  console.log(`VERIFICATION EMAIL to=${to} subject=${subject} body=${text}`)
  return { success: false, fallback: true }
}

export async function POST(req) {
  try {
    const { email } = await req.json()
    if (!email || email !== 'andrei@gamelink.admin') {
      return new Response(JSON.stringify({ error: 'Invalid owner email' }), { status: 400 })
    }

    const code = generateCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes

    const { error: insertError } = await supabase.from('admin_verification_codes').insert({
      email,
      code,
      created_at: new Date().toISOString(),
      expires_at: expiresAt
    })

    if (insertError) {
      console.error('Insert code error:', insertError)
      return new Response(JSON.stringify({ error: 'Failed to create code' }), { status: 500 })
    }

    const subject = 'Your GameLink owner verification code'
    const text = `Your GameLink verification code is: ${code} (expires in 10 minutes)`
    await sendEmail({ to: email, subject, text })

    return new Response(JSON.stringify({ message: 'Verification code sent' }), { status: 200 })
  } catch (err) {
    console.error('owner-request-code error:', err)
    return new Response(JSON.stringify({ error: 'Failed' }), { status: 500 })
  }
}
