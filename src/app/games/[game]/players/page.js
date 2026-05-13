import React from 'react'
import Link from 'next/link'

async function getGameProfiles(game) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/profiles?game=${encodeURIComponent(game)}`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return data.profiles || []
  } catch (err) {
    console.error('Error fetching profiles:', err)
    return []
  }
}

export default async function GamePlayersPage({ params }) {
  const { game } = params
  const players = await getGameProfiles(game)
  const gameEmoji = { 'Roblox': '🎮', 'Minecraft': '⛏️', 'Fortnite': '🎯', 'AmongUs': '👨‍🚀', 'Other': '🕹️' }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/discover" className="text-indigo-400 hover:text-indigo-300 text-sm mb-6 inline-block">← Back to Games</Link>
        <h1 className="text-5xl font-black text-white mb-2">{gameEmoji[game] || '🕹️'} {game} Players</h1>
        <p className="text-slate-400 mb-8">{players.length} players found</p>

        {players.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">No players yet</h2>
            <p className="text-slate-400">Be the first to create a profile for {game}!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map(player => (
              <Link key={player.id} href={`/profile/${player.id}`}>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-indigo-500 transition h-full">
                  <h3 className="font-bold text-white text-lg mb-1">{player.in_game_name}</h3>
                  <p className="text-sm text-slate-400 mb-3">@{player.users?.username}</p>
                  <p className="text-sm text-slate-300 mb-4">{player.description || 'No description'}</p>
                  <button className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded transition">
                    View Profile
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
