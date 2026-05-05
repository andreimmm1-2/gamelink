import React from 'react'
import Link from 'next/link'
import ProfileHeader from '../../../components/profile/ProfileHeader'
import FriendRequestButton from '../../../components/profile/FriendRequestButton'

async function fetchUser(username) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/users/${encodeURIComponent(username)}`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data.user
}

export default async function ProfilePage({ params }) {
  const { username } = params
  const user = await fetchUser(username)

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">User Not Found</h1>
          <p className="text-gray-400 mb-6">We couldn't find the user "{username}"</p>
          <Link href="/discover" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
            Back to Discovery
          </Link>
        </div>
      </main>
    )
  }

  // Group profiles by game
  const profilesByGame = {}
  if (user.profiles) {
    user.profiles.forEach(p => {
      if (!profilesByGame[p.game]) {
        profilesByGame[p.game] = []
      }
      profilesByGame[p.game].push(p)
    })
  }

  const GAME_COLORS = {
    'Roblox': 'from-red-600 to-red-400',
    'Minecraft': 'from-green-600 to-green-400',
    'Fortnite': 'from-blue-600 to-cyan-400',
    'AmongUs': 'from-purple-600 to-pink-400',
    'Other': 'from-gray-600 to-gray-400'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link href="/discover" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
          ← Back to Discovery
        </Link>
      </div>

      {/* Profile Header Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileHeader user={user} />

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-800 rounded-lg p-4 border border-purple-500 border-opacity-30 text-center">
            <div className="text-2xl font-bold text-purple-400">{user.profiles?.length || 0}</div>
            <div className="text-xs text-gray-400 mt-1">Game Profiles</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-purple-500 border-opacity-30 text-center">
            <div className="text-2xl font-bold text-green-400">✓</div>
            <div className="text-xs text-gray-400 mt-1">Verified</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-purple-500 border-opacity-30 text-center">
            <div className="text-2xl font-bold text-blue-400">Active</div>
            <div className="text-xs text-gray-400 mt-1">Status</div>
          </div>
        </div>

        {/* Bio Section */}
        {(user.bio || user.description) && (
          <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-purple-500 border-opacity-30">
            <h2 className="text-lg font-bold text-white mb-3">About</h2>
            <p className="text-gray-300">{user.bio || user.description || 'No bio added yet'}</p>
          </div>
        )}

        {/* Game Profiles Section */}
        {user.profiles && user.profiles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Game Profiles</h2>
            <div className="space-y-4">
              {Object.entries(profilesByGame).map(([game, profiles]) => (
                <div key={game}>
                  <h3 className={`text-lg font-bold bg-gradient-to-r ${GAME_COLORS[game] || GAME_COLORS['Other']} bg-clip-text text-transparent mb-3`}>
                    {game}
                  </h3>
                  <div className="space-y-3">
                    {profiles.map(p => (
                      <div key={p.id || p._id} className="bg-slate-800 rounded-lg p-4 border border-purple-500 border-opacity-20">
                        <h4 className="text-purple-300 font-semibold mb-2">{p.inGameName || p.in_game_name}</h4>
                        {p.description && (
                          <p className="text-gray-300 text-sm mb-2">{p.description}</p>
                        )}
                        {p.availability && (
                          <div className="flex items-center text-xs text-gray-400">
                            <span className="mr-2">⏰</span>
                            <span>{p.availability}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!user.profiles || user.profiles.length === 0) && (
          <div className="mt-8 bg-slate-800 rounded-lg p-8 border border-purple-500 border-opacity-30 text-center">
            <p className="text-gray-400 mb-2">This user hasn't created any game profiles yet.</p>
            <p className="text-gray-500 text-sm">Check back later!</p>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-purple-900/50 to-slate-900/50 border-t border-purple-500 border-opacity-30 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-300 mb-4">Want to connect with {user.username}?</p>
          <FriendRequestButton targetUserId={user.id} />
        </div>
      </div>
    </main>
  )
}
