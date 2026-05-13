import React from 'react'
import Link from 'next/link'

async function getPlayerProfile(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/profiles/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.profile
  } catch (err) {
    console.error('Error fetching profile:', err)
    return null
  }
}

export default async function PlayerProfilePage({ params }) {
  const { id } = params
  const player = await getPlayerProfile(id)

  if (!player) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Player Not Found</h1>
          <p className="text-slate-400 mb-6">This profile doesn't exist or has been deleted.</p>
          <Link href="/find-players" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg inline-block">
            Back to Search
          </Link>
        </div>
      </main>
    )
  }

  const gameColors = {
    'Roblox': 'from-red-600 to-red-800',
    'Minecraft': 'from-green-600 to-green-800',
    'Fortnite': 'from-purple-600 to-purple-800',
    'AmongUs': 'from-cyan-600 to-cyan-800',
    'Other': 'from-blue-600 to-blue-800'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero */}
      <div className={`bg-gradient-to-r ${gameColors[player.game] || 'from-slate-700 to-slate-800'} border-b border-slate-600 border-opacity-30`}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/find-players" className="text-slate-400 hover:text-slate-300 text-sm mb-4 inline-block">
            ← Back to Search
          </Link>
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 bg-slate-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="text-5xl">🎮</div>
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-5xl font-black text-white mb-2">{player.in_game_name}</h1>
              <p className="text-slate-300 text-lg">@{player.users?.username || 'Unknown'}</p>
              <span className="inline-block mt-3 px-3 py-1 bg-white/10 text-white text-sm font-semibold rounded-full">
                {player.game}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-black text-white mb-4">About</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {player.description || 'No description provided yet.'}
              </p>
            </section>

            {/* Stats */}
            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-black text-white mb-4">Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Game</div>
                  <div className="text-xl font-bold text-white">{player.game}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Availability</div>
                  <div className="text-xl font-bold text-white">{player.availability || 'Flexible'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Member Since</div>
                  <div className="text-xl font-bold text-white">
                    {new Date(player.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Status</div>
                  <div className="text-xl font-bold text-green-400">• Online</div>
                </div>
              </div>
            </section>

            {/* Skills/Tags Section */}
            <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-black text-white mb-4">Playstyle & Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['Competitive', 'Team Player', 'Active', 'Friendly', 'Voice Chat'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-indigo-600/20 text-indigo-300 text-sm font-semibold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-slate-500 text-sm mt-4">
                Tags are extracted from player profiles and descriptions.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/messages" className="block w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition text-center">
                💬 Send Message
              </Link>
              <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition">
                👥 Add Friend
              </button>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-lg p-6">
              <h3 className="font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Rating</div>
                  <div className="text-2xl font-bold text-indigo-400">⭐ 4.8</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Teams Joined</div>
                  <div className="text-2xl font-bold text-white">3</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Games Played</div>
                  <div className="text-2xl font-bold text-white">127</div>
                </div>
              </div>
            </div>

            {/* Report Button */}
            <button className="w-full px-4 py-2 border border-slate-600 text-slate-400 hover:text-red-400 hover:border-red-500 rounded-lg transition text-sm">
              Report Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
