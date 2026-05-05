'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const GAMES = [
  { name: 'Roblox', emoji: '🎮' },
  { name: 'Minecraft', emoji: '⛏️' },
  { name: 'Fortnite', emoji: '🎯' },
  { name: 'AmongUs', emoji: '👨‍🚀' },
]

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ players: 0, profiles: 0 })

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user
        const userRes = await fetch('/api/auth/me', { method: 'GET' })
        const userData = await userRes.json()
        setUser(userData.user || null)

        // Fetch real stats
        const profilesRes = await fetch('/api/profiles', { method: 'GET' })
        const profilesData = await profilesRes.json()
        const allProfiles = profilesData.profiles || []
        
        const uniquePlayers = new Set(allProfiles.map(p => p.user_id)).size
        setStats({ 
          players: uniquePlayers, 
          profiles: allProfiles.length 
        })
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slideInLeft">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Find Your Gaming <span className="gradient-text">Squad</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Connect with millions of gamers, build your profile, discover new teammates, and find featured gaming servers. GameLink is the ultimate platform for gamers looking to connect.
              </p>
              
              <div className="flex gap-4 flex-wrap">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
                    >
                      Go to Dashboard
                    </Link>
                    <Link
                      href="/discover"
                      className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition border border-slate-700"
                    >
                      Discover Players
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/login"
                      className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition border border-slate-700"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold text-slate-400">{stats.players}</div>
                  <p className="text-slate-400 text-sm">Active Players</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-400">{GAMES.length}</div>
                  <p className="text-slate-400 text-sm">Supported Games</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-400">100%</div>
                  <p className="text-slate-400 text-sm">Free to Use</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-2xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {GAMES.map((game, i) => (
                    <div
                      key={game.name}
                      className="bg-slate-700/50 rounded-lg p-4 text-center hover:bg-slate-700 transition animate-fadeIn"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="text-4xl mb-2">{game.emoji}</div>
                      <p className="text-white font-semibold">{game.name}</p>
                      <p className="text-slate-400 text-sm">{game.count} players</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 border-t border-slate-700">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Explore Games</h2>
            <p className="text-slate-400">Connect with players across your favorite games</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GAMES.map((game) => (
              <Link key={game.name} href={`/games/${game.name}`}>
                <div className="group bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl p-6 transition cursor-pointer h-full">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition">{game.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-400">{game.name}</h3>
                  <p className="text-slate-400 text-sm">Discover players</p>
                  <div className="mt-4 text-slate-400 opacity-0 group-hover:opacity-100 transition">→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-slate-700">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group">
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 group-hover:border-slate-600 transition h-full">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-lg font-bold text-white mb-2">Create Your Profile</h3>
                <p className="text-slate-400 text-sm">Set up your gaming profile and showcase your skills across multiple games.</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 group-hover:border-slate-600 transition h-full">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-white mb-2">Discover Players</h3>
                <p className="text-slate-400 text-sm">Search and filter players by game, timezone, and availability to find your perfect match.</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 group-hover:border-slate-600 transition h-full">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-bold text-white mb-2">Connect & Chat</h3>
                <p className="text-slate-400 text-sm">Send friend requests and start chatting with players you want to team up with.</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 group-hover:border-slate-600 transition h-full">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-lg font-bold text-white mb-2">Featured Servers</h3>
                <p className="text-slate-400 text-sm">Discover promoted game servers and exclusive gaming communities and events.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-slate-700">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">{stats.players}</div>
              <p className="text-slate-400">Active Players</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">{stats.profiles}</div>
              <p className="text-slate-400">Profiles Created</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">4</div>
              <p className="text-slate-400">Games Supported</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">24/7</div>
              <p className="text-slate-400">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-slate-700">
        <div className="container">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900 border border-slate-700/30 rounded-2xl p-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Find Your Squad?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of gamers already connecting on GameLink.
            </p>
            {!user && (
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
                >
                  Sign Up Now
                </Link>
                <Link
                  href="/discover"
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition border border-slate-700"
                >
                  Browse Without Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
