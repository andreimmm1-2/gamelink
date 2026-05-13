'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const GAMES = ['All Games', 'Roblox', 'Minecraft', 'Fortnite', 'AmongUs']

export default function FindTeammatesPage() {
  const [profiles, setProfiles] = useState([])
  const [selectedGame, setSelectedGame] = useState('All Games')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const res = await fetch('/api/profiles')
        const data = await res.json()
        setProfiles(data.profiles || [])
      } catch (err) {
        console.error('Failed to fetch profiles:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfiles()
  }, [])

  let filtered = profiles

  if (selectedGame !== 'All Games') {
    filtered = filtered.filter(p => p.game === selectedGame)
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    filtered = filtered.filter(p =>
      p.in_game_name?.toLowerCase().includes(q) ||
      p.users?.username?.toLowerCase().includes(q)
    )
  }

  const groupedByGame = {}
  filtered.forEach(profile => {
    if (!groupedByGame[profile.game]) {
      groupedByGame[profile.game] = []
    }
    groupedByGame[profile.game].push(profile)
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 border-b border-slate-600 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">👥 Find Teammates</h1>
          <p className="text-slate-300 text-lg">
            Connect with real players and form squads. {filtered.length} teammates available.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />

          {/* Game Filter */}
          <div className="flex flex-wrap gap-2">
            {GAMES.map(game => (
              <button
                key={game}
                onClick={() => setSelectedGame(game)}
                className={`px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 ${
                  selectedGame === game
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>

        {/* Players */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-pink-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Loading teammates...</p>
          </div>
        ) : Object.keys(groupedByGame).length === 0 ? (
          <div className="text-center py-12 bg-slate-800/30 border border-slate-700 rounded-lg">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No teammates found</h3>
            <p className="text-slate-400 mb-6">Adjust your filters or be the first to create a profile!</p>
            <Link href="/dashboard/my-profiles" className="inline-block px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg transition">
              Create Profile
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByGame).map(([game, players], gameIdx) => (
              <div key={game} className="animate-fadeIn" style={{ animationDelay: `${gameIdx * 100}ms` }}>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎮</span> {game} ({players.length} players)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {players.slice(0, 9).map((player, idx) => (
                    <Link key={player.id} href={`/profile/${player.id}`}>
                      <div className="group h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-pink-500 rounded-lg p-5 hover:shadow-lg hover:shadow-pink-500/20 transition cursor-pointer transform hover:scale-105 duration-300 animate-fadeIn" style={{ animationDelay: `${idx * 30}ms` }}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-white text-lg group-hover:text-pink-400 transition">
                              {player.in_game_name}
                            </h3>
                            <p className="text-sm text-slate-400">@{player.users?.username || 'anon'}</p>
                          </div>
                          <span className="text-2xl">👤</span>
                        </div>

                        <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                          {player.description || 'Looking for teammates!'}
                        </p>

                        {player.availability && (
                          <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                            📅 <span>{player.availability}</span>
                          </p>
                        )}

                        <div className="pt-3 border-t border-slate-700">
                          <button className="w-full px-3 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold rounded transition">
                            💬 Team Up
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {players.length > 9 && (
                  <div className="text-center mt-4">
                    <p className="text-slate-400 text-sm">+{players.length - 9} more {game} players</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {filtered.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">🤝 Ready to Team Up?</h3>
            <p className="text-slate-300 mb-6">Click on any player to view their profile and send a team invitation</p>
            <Link href="/dashboard/my-profiles" className="inline-block px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg transition transform hover:scale-105">
              Create Your Profile
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
