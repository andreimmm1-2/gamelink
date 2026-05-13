import React from 'react'
import Link from 'next/link'

const GAMES = [
  { name: 'Roblox', image: 'https://images.roblox.com/Roblox_logo.svg', description: 'The platform for 3D experiences' },
  { name: 'Minecraft', image: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/minecraft-key-visual-logo.png', description: 'Build, explore, and survive' },
  { name: 'Fortnite', image: 'https://www.fortniteultimate.com/logo.png', description: 'Battle royale action game' },
  { name: 'AmongUs', image: 'https://innersloth.com/logo.png', description: 'Social deduction game' },
  { name: 'Other', image: 'https://cdn-icons-png.flaticon.com/512/413/413502.png', description: 'Other games' }
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
        <h2 className="text-2xl font-bold text-white mb-8">🎮 Browse by Game</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {GAMES.map((game, idx) => (
            <Link
              key={game.name}
              href={`/games/${game.name}`}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600 border-opacity-30 hover:border-indigo-500/50 transition hover:shadow-lg hover:shadow-indigo-500/20 transform hover:scale-105 duration-300 cursor-pointer animate-fadeIn" style={{animationDelay: `${idx * 50}ms`}}>
                {/* Game Logo */}
                <img src={game.image} alt={game.name} className="h-20 w-20 object-contain mb-3 group-hover:scale-125 group-hover:drop-shadow-lg transition duration-300" />

                {/* Game Name */}
                <h2 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition">{game.name}</h2>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>

                {/* Stats */}
                <div className="flex items-end justify-between pt-4 border-t border-slate-600 border-opacity-20">
                  <div>
                    <div className="text-2xl font-bold text-indigo-400">{stats[game.name] || 0}</div>
                    <div className="text-xs text-gray-400">
                      {stats[game.name] === 1 ? 'player' : 'players'}
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-indigo-400 text-xl transition transform group-hover:translate-x-1">→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 mt-8">
        <h2 className="text-2xl font-bold text-white mb-8">🌟 Discovery Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🔍', title: 'Advanced Search', desc: 'Find players by game, skill level, and playstyle' },
            { icon: '🏷️', title: 'Tag Filtering', desc: 'Discover players with specific skills and interests' },
            { icon: '⭐', title: 'Ratings', desc: 'See player ratings and community feedback' }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 bg-slate-800/30 border border-slate-700 hover:border-indigo-500/50 rounded-lg transition transform hover:scale-105 duration-300 cursor-pointer animate-fadeIn" style={{animationDelay: `${idx * 100}ms`}}>
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border-t border-indigo-500/30 border-b border-indigo-500/30 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">🚀 Ready to Find Your Squad?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Create your gaming profile and let other players discover you! Help build our growing gaming community.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/dashboard/my-profiles"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-lg shadow-indigo-500/50 duration-200"
            >
              Create Your Profile
            </Link>
            <Link
              href="/teams"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition transform hover:scale-105 border border-slate-600 hover:border-slate-500 duration-200"
            >
              Browse Players
            </Link>
          </div>
        </div>
      </div>

      {/* Still New Banner */}
      <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-t border-amber-500/30">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h2 className="text-2xl font-bold text-white mb-2">We're Still New & Growing!</h2>
          <p className="text-amber-100 max-w-2xl mx-auto">
            GameLink just launched and we're building something amazing. We need YOU to help grow this community! 
            Create your profile and invite your gaming friends to be part of the movement.
          </p>
        </div>
      </div>
    </main>
  )
}
