import React from 'react'
import Link from 'next/link'

async function getRecommendedPlayers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/profiles`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return (data.profiles || []).slice(0, 12).sort(() => Math.random() - 0.5)
  } catch (err) {
    console.error('Error fetching recommended:', err)
    return []
  }
}

export default async function RecommendedPage() {
  const players = await getRecommendedPlayers()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">⭐ Recommended Players</h1>
        <p className="text-slate-400 mb-8">Players we think you might enjoy gaming with</p>

        {players.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">⭐</div>
            <h2 className="text-2xl font-bold text-white mb-2">No recommendations yet</h2>
            <p className="text-slate-400">Create a profile to get personalized recommendations</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player, idx) => (
              <Link key={player.id} href={`/profile/${player.id}`}>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-yellow-500 transition h-full flex flex-col">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="text-2xl">⭐</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{player.in_game_name}</h3>
                      <p className="text-sm text-slate-400">@{player.users?.username}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 mb-3 flex-1">{player.game}</p>
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
