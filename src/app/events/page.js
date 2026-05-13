'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    try {
      const res = await fetch('/api/events')
      const data = await res.json()
      setEvents(data.events || [])
    } catch (err) {
      console.error('Error loading events:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🎉 Community Events</h1>
        <p className="text-slate-400 mb-8">Join exciting community events and competitions</p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">No events scheduled</h2>
            <p className="text-slate-400 mb-6">Check back soon for exciting events!</p>
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">
              Notify Me
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-indigo-500 transition h-full">
                  <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{event.date}</p>
                  <p className="text-slate-300 mb-4">{event.description}</p>
                  <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">
                    Join Event
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
