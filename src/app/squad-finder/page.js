'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SquadFinderPage() {
  const [players, setPlayers] = useState([])
  const [filters, setFilters] = useState({
    game: '',
    minLevel: 0,
    maxPing: 100,
    language: 'English'
  })
  const [loading, setLoading] = useState(true)

  const GAMES = ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs']
  const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Chinese']

  useEffect(() => {
    loadPlayers()
  }, [])

  async function loadPlayers() {
    try {
      const res = await fetch('/api/profiles')
      const data = await res.json()
      setPlayers(data.profiles || [])
    } catch (err) {
      console.error('Error loading players:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredPlayers = players.filter(p => {
    if (filters.game && p.game !== filters.game) return false
    return true
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🎯 Squad Finder</h1>
        <p className="text-slate-400 mb-8">Find the perfect squad mates for your gaming sessions</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-4 sticky top-4">
              <div>
                <label className="block text-white font-bold mb-2">Game</label>
                <select
                  value={filters.game}
                  onChange={(e) => setFilters({...filters, game: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">All Games</option>
                  {GAMES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-white font-bold mb-2">Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => setFilters({...filters, language: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                >
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : filteredPlayers.length === 0 ? (
              <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-5xl mb-3">🎯</div>
                <h2 className="text-2xl font-bold text-white mb-2">No squad mates found</h2>
                <p className="text-slate-400">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPlayers.map(player => (
                  <Link key={player.id} href={`/profile/${player.id}`}>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-indigo-500 transition h-full">
                      <h3 className="font-bold text-white text-lg">{player.in_game_name}</h3>
                      <p className="text-sm text-slate-400">@{player.users?.username}</p>
                      <p className="text-sm text-slate-300 mt-2">{player.game}</p>
                      <button className="w-full mt-3 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded transition">
                        Invite to Squad
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
