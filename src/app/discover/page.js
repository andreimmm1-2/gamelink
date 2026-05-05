import React from 'react'
import Link from 'next/link'

const GAMES = [
  { name: 'Roblox', emoji: '🎮', description: 'The platform for 3D experiences' },
  { name: 'Minecraft', emoji: '⛏️', description: 'Build, explore, and survive' },
  { name: 'Fortnite', emoji: '🎯', description: 'Battle royale action game' },
  { name: 'AmongUs', emoji: '👨‍🚀', description: 'Social deduction game' },
  { name: 'Other', emoji: '🕹️', description: 'Other games' }
]

async function getGameStats() {
  const stats = {}
  
  for (const game of GAMES) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/profiles?game=${encodeURIComponent(game.name)}`,
        { cache: 'no-store' }
      )
      const data = await res.json()
      stats[game.name] = (data.profiles || []).length
    } catch (err) {
      stats[game.name] = 0
    }
  }
  
  return stats
}

export default async function DiscoverPage() {
  const stats = await getGameStats()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-600 border-opacity-30">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Discover Players</h1>
          <p className="text-gray-300 text-lg">
            Find your gaming squad. Browse {Object.values(stats).reduce((a, b) => a + b, 0)} players across multiple games.
          </p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {GAMES.map((game) => (
            <Link
              key={game.name}
              href={`/games/${game.name}`}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600 border-opacity-30 hover:border-opacity-100 transition hover:shadow-lg hover:shadow-slate-500/20">
                {/* Game Emoji */}
                <div className="text-5xl mb-3 group-hover:scale-110 transition">{game.emoji}</div>

                {/* Game Name */}
                <h2 className="text-xl font-bold text-white mb-1">{game.name}</h2>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>

                {/* Stats */}
                <div className="flex items-end justify-between pt-4 border-t border-slate-600 border-opacity-20">
                  <div>
                    <div className="text-2xl font-bold text-slate-400">{stats[game.name] || 0}</div>
                    <div className="text-xs text-gray-400">
                      {stats[game.name] === 1 ? 'player' : 'players'}
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-slate-300 text-xl transition">→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-t border-slate-600 border-opacity-30 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Find Your Squad?</h2>
          <p className="text-gray-400 mb-6">
            Create your gaming profile and let other players discover you!
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition"
            >
              Create Your Profile
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
