'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function BrowseTournamentsPage() {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTournaments()
  }, [])

  async function loadTournaments() {
    try {
      const res = await fetch('/api/tournaments')
      const data = await res.json()
      setTournaments(data.tournaments || [])
    } catch (err) {
      console.error('Error loading tournaments:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🏆 Browse Tournaments</h1>
        <p className="text-slate-400 mb-8">Discover and join gaming tournaments</p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : tournaments.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">🏆</div>
            <h2 className="text-2xl font-bold text-white mb-2">No tournaments yet</h2>
            <p className="text-slate-400">Check back soon for exciting tournaments!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tournaments.map(tournament => (
              <Link key={tournament.id} href={`/tournaments/${tournament.id}`}>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-indigo-500 transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                    <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-bold rounded-full">
                      {tournament.status || 'Upcoming'}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-3">{tournament.game} • {tournament.maxPlayers} Players</p>
                  <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">
                    View Details
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
