'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function TicketsPage() {
  const [tickets, setTickets] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('bug-report')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, category, description })
      })

      if (res.ok) {
        const newTicket = await res.json()
        setTickets([newTicket.ticket, ...tickets])
        setSubject('')
        setCategory('bug-report')
        setDescription('')
        setShowForm(false)
      }
    } catch (err) {
      console.error('Error creating ticket:', err)
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

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Support Tickets</h1>
            <p className="text-slate-400 mt-2">Track and manage your support requests</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
          >
            {showForm ? 'Cancel' : 'New Ticket'}
          </button>
        </div>

        {/* Create Ticket Form */}
        {showForm && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="bug-report">Bug Report</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="account-issue">Account Issue</option>
                  <option value="promotion">Server Promotion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
                  placeholder="Please provide detailed information..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Ticket'}
              </button>
            </form>
          </div>
        )}

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.length === 0 && !showForm ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">No support tickets yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
              >
                Create Your First Ticket
              </button>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{ticket.subject}</h3>
                    <p className="text-slate-400 text-sm mt-1">{ticket.description?.substring(0, 100)}...</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ticket.status === 'open' ? 'bg-yellow-500/20 text-yellow-400' :
                    ticket.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                    'bg-slate-600 text-slate-300'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>{ticket.category}</span>
                  <span>#{ticket.id}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
