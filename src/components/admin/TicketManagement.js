'use client'

import React, { useEffect, useState } from 'react'
import { hasPermission } from '../../lib/admin'

export default function TicketManagement({ user }) {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState(null)

  useEffect(() => {
    loadTickets()
  }, [])

  async function loadTickets() {
    if (!hasPermission(user.role, 'viewTickets')) {
      return
    }

    try {
      const res = await fetch('/api/admin/tickets')
      const data = await res.json()
      if (res.ok) {
        setTickets(data.tickets || [])
      }
    } catch (err) {
      console.error('Error loading tickets:', err)
    } finally {
      setLoading(false)
    }
  }

  async function updateTicketStatus(ticketId, newStatus) {
    if (!hasPermission(user.role, 'resolveTickets')) {
      alert('You do not have permission to resolve tickets')
      return
    }

    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (res.ok) {
        setTickets(tickets.map(t =>
          t.id === ticketId ? { ...t, status: newStatus } : t
        ))
        setSelectedTicket(null)
      }
    } catch (err) {
      console.error('Error updating ticket:', err)
    }
  }

  const statusColors = {
    open: 'bg-yellow-500/20 text-yellow-400',
    in_progress: 'bg-blue-500/20 text-blue-400',
    resolved: 'bg-green-500/20 text-green-400',
    pending: 'bg-slate-500/20 text-slate-400'
  }

  if (!hasPermission(user.role, 'viewTickets')) {
    return <div className="text-red-400">You do not have permission to view tickets.</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Support Ticket Management</h2>
        <p className="text-slate-400">Review and resolve user support tickets</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">
            {tickets.filter(t => t.status === 'open').length}
          </p>
          <p className="text-slate-400 text-sm mt-1">Open</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">
            {tickets.filter(t => t.status === 'in_progress').length}
          </p>
          <p className="text-slate-400 text-sm mt-1">In Progress</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-400">
            {tickets.filter(t => t.status === 'resolved').length}
          </p>
          <p className="text-slate-400 text-sm mt-1">Resolved</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-white">{tickets.length}</p>
          <p className="text-slate-400 text-sm mt-1">Total</p>
        </div>
      </div>

      {/* Tickets List */}
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-slate-400">No support tickets</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map(ticket => (
            <div
              key={ticket.id}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition cursor-pointer"
              onClick={() => setSelectedTicket(ticket.id === selectedTicket ? null : ticket.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{ticket.subject}</h3>
                  <p className="text-slate-400 text-sm mt-1">{ticket.description?.substring(0, 100)}...</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[ticket.status] || statusColors.pending}`}>
                  {ticket.status}
                </span>
              </div>

              {selectedTicket === ticket.id && (
                <div className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                  <div className="bg-slate-700/50 rounded p-3">
                    <p className="text-slate-400 text-sm mb-1">Full Description:</p>
                    <p className="text-white">{ticket.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        updateTicketStatus(ticket.id, 'open')
                      }}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm font-medium transition"
                    >
                      Open
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        updateTicketStatus(ticket.id, 'in_progress')
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        updateTicketStatus(ticket.id, 'resolved')
                      }}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
