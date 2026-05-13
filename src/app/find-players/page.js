'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const GAMES = ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs']
const AVAILABLE_TAGS = [
  'Competitive', 'Casual', 'Speedrunner', 'Content Creator', 'New Player', 
  'Expert', 'Team Player', 'Solo Player', 'Streaming', 'Tournament',
  'English Speaker', 'Voice Chat', 'Chill', 'Grinding', 'PvP', 'PvE',
  'Friendly', 'Active', 'Weekend Warrior', 'Night Owl'
]

export default function FindPlayersPage() {
  const [players, setPlayers] = useState([])
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [selectedGame, setSelectedGame] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch all players on mount
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch('/api/profiles')
        const data = await res.json()
        setPlayers(data.profiles || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching players:', err)
        setLoading(false)
      }
    }
    fetchPlayers()
  }, [])

  // Filter players based on game, tags, and search
  useEffect(() => {
    let filtered = players

    // Filter by game
    if (selectedGame) {
      filtered = filtered.filter(p => p.game === selectedGame)
    }

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.in_game_name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.users?.username?.toLowerCase().includes(q)
      )
    }

    // Filter by tags (simple text matching in description)
    if (selectedTags.length > 0) {
      filtered = filtered.filter(p => {
        const text = (p.description || '').toLowerCase()
        return selectedTags.some(tag => text.includes(tag.toLowerCase()))
      })
    }

    setFilteredPlayers(filtered)
  }, [players, selectedGame, selectedTags, searchQuery])

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b border-slate-600 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Find Your Squad</h1>
          <p className="text-slate-300 text-lg">
            Search {players.length} players. Filter by game, skills, and playstyle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Search</label>
                <input
                  type="text"
                  placeholder="Username or in-game name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Game Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Game</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedGame('')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      !selectedGame ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    All Games
                  </button>
                  {GAMES.map(game => (
                    <button
                      key={game}
                      onClick={() => setSelectedGame(game)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedGame === game ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Playstyle & Skills</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TAGS.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        selectedTags.includes(tag)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedGame || selectedTags.length > 0 || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedGame('')
                    setSelectedTags([])
                    setSearchQuery('')
                  }}
                  className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Players Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-slate-400">Loading players...</div>
              </div>
            ) : filteredPlayers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-2xl mb-2">🔍</div>
                <div className="text-slate-400">No players found. Try adjusting your filters.</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPlayers.map(player => (
                  <Link key={player.id} href={`/profile/${player.id}`}>
                    <div className="group h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-5 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition cursor-pointer">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 transition">
                            {player.in_game_name}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {player.users?.username || 'Anonymous'}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-indigo-600/20 text-indigo-300 text-xs font-semibold rounded-full">
                          {player.game}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                        {player.description || 'No description yet'}
                      </p>

                      {/* Availability */}
                      {player.availability && (
                        <p className="text-xs text-slate-500 mb-3">
                          📅 {player.availability}
                        </p>
                      )}

                      {/* CTA */}
                      <div className="pt-3 border-t border-slate-700">
                        <button className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition">
                          View Profile
                        </button>
                      </div>
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
