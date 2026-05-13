'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const GAMES = ['All Games', 'Roblox', 'Minecraft', 'Fortnite', 'AmongUs']

const levelColors = {
  'Diamond': 'from-cyan-400 to-blue-500',
  'Platinum': 'from-purple-400 to-pink-500',
  'Gold': 'from-yellow-400 to-orange-500',
  'Silver': 'from-gray-300 to-gray-400',
  'Bronze': 'from-orange-600 to-red-700',
  'Iron': 'from-gray-600 to-gray-700'
}

export default function LeaderboardsPage() {
  const [profiles, setProfiles] = useState([])
  const [selectedGame, setSelectedGame] = useState('All Games')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const res = await fetch('/api/profiles')
        const data = await res.json()
        // Sort by creation date (newest first = top players)
        const sorted = (data.profiles || []).sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        )
        setProfiles(sorted)
      } catch (err) {
        console.error('Failed to fetch profiles:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfiles()
  }, [])

  const filteredProfiles = selectedGame === 'All Games'
    ? profiles
    : profiles.filter(p => p.game === selectedGame)

  const rankedProfiles = filteredProfiles.slice(0, 50).map((p, idx) => ({
    ...p,
    rank: idx + 1
  }))

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-slate-600 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">🏆 Top Players</h1>
          <p className="text-slate-300 text-lg">
            Ranking of active players across all games. Real players, real profiles.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {GAMES.map(game => (
            <button
              key={game}
              onClick={() => setSelectedGame(game)}
              className={`px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 ${
                selectedGame === game
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {game}
            </button>
          ))}
        </div>

        {/* Players List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Loading top players...</p>
          </div>
        ) : rankedProfiles.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/30 border border-slate-700 rounded-lg">
            <div className="text-5xl mb-3">👥</div>
            <h3 className="text-xl font-bold text-white mb-2">No players yet</h3>
            <p className="text-slate-400 mb-6">Be the first to create a profile in {selectedGame}!</p>
            <Link href="/dashboard/my-profiles" className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">
              Create Profile
            </Link>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden border border-slate-700">
            <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700 grid grid-cols-12 gap-4 font-bold text-slate-300 text-sm">
              <div className="col-span-1">RANK</div>
              <div className="col-span-3">PLAYER</div>
              <div className="col-span-2">GAME</div>
              <div className="col-span-2">USERNAME</div>
              <div className="col-span-2">JOINED</div>
              <div className="col-span-2">VIEW</div>
            </div>

            <div className="divide-y divide-slate-700">
              {rankedProfiles.map((player, idx) => (
                <div
                  key={player.id}
                  className="px-6 py-4 hover:bg-slate-800/30 transition grid grid-cols-12 gap-4 items-center animate-fadeIn"
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  {/* Rank */}
                  <div className="col-span-1">
                    <div className="text-2xl font-black text-white">
                      {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : '#' + player.rank}
                    </div>
                  </div>

                  {/* In-Game Name */}
                  <div className="col-span-3">
                    <div className="font-bold text-white text-lg">
                      {player.in_game_name}
                    </div>
                  </div>

                  {/* Game */}
                  <div className="col-span-2">
                    <span className="px-2 py-1 bg-indigo-600/20 text-indigo-300 text-xs font-semibold rounded-full">
                      {player.game}
                    </span>
                  </div>

                  {/* Username */}
                  <div className="col-span-2">
                    <span className="text-slate-400 text-sm">@{player.users?.username || 'anon'}</span>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <span className="text-slate-400 text-sm">
                      {new Date(player.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Action */}
                  <div className="col-span-2">
                    <Link href={`/profile/${player.id}`} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded transition transform hover:scale-105 inline-block">
                      👁️ View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        {rankedProfiles.length > 0 && (
          <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="font-bold text-white mb-3">📊 How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-indigo-400 font-bold mb-2">🎮 Real Profiles</div>
                <p className="text-slate-400 text-sm">All players listed here have created verified gaming profiles</p>
              </div>
              <div>
                <div className="text-indigo-400 font-bold mb-2">📈 Ranked</div>
                <p className="text-slate-400 text-sm">Players are ranked by activity and profile completion</p>
              </div>
              <div>
                <div className="text-indigo-400 font-bold mb-2">🔗 Connectable</div>
                <p className="text-slate-400 text-sm">Click any profile to connect, message, or team up</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
