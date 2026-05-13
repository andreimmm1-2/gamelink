import React from 'react'
import Link from 'next/link'

async function getTrendingPlayers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/profiles`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return (data.profiles || []).slice(0, 12)
  } catch (err) {
    console.error('Error fetching trending:', err)
    return []
  }
}

export default async function TrendingPage() {
  const players = await getTrendingPlayers()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🔥 Trending</h1>
        <p className="text-slate-400 mb-8">Most active players and popular games right now</p>

        <div className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Top Players</h2>
          {players.length === 0 ? (
            <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-slate-400">No players available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player, idx) => (
                <Link key={player.id} href={`/profile/${player.id}`}>
                  <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-red-500 transition">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">🔥</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{player.in_game_name}</h3>
                        <p className="text-sm text-slate-400">{player.game}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
