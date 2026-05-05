'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (err) {
      console.error('Error sending message:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="container py-12">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
          ← Back
        </Link>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-slate-400 mb-8">Have a question or feedback? We'd love to hear from you.</p>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            {success && (
              <div className="mb-6 bg-green-600/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-700 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400 mb-2">📧 Email</p>
                <p className="text-white">support@gamelink.com</p>
              </div>
              <div>
                <p className="text-slate-400 mb-2">💬 Discord</p>
                <p className="text-white">Join our community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
