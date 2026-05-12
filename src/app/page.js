'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const GAMES = [
  { name: 'Roblox', image: '/images/roblox.svg', players: 1240 },
  { name: 'Minecraft', image: '/images/minecraft.svg', players: 980 },
  { name: 'Fortnite', image: '/images/fortnite.svg', players: 760 },
  { name: 'AmongUs', image: '/images/amongus.svg', players: 420 },
]


export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ players: 0, profiles: 0 })
  const [gamesCounts, setGamesCounts] = useState({})

  // Define QUICK_ACTIONS inside the component to ensure it's bundled with the client code
  const QUICK_ACTIONS = [
    { title: 'Find Gamers', desc: 'Discover players', icon: '🔍', href: '/discover', color: 'from-blue-600 to-blue-800' },
    { title: 'Create Profile', desc: 'Build your profile', icon: '👤', href: '/signup', color: 'from-purple-600 to-purple-800' },
    { title: 'Explore Games', desc: 'Browse by game', icon: '🎮', href: '/discover', color: 'from-pink-600 to-pink-800' },
    { title: 'Messages', desc: 'Chat with teams', icon: '💬', href: '/messages', color: 'from-cyan-600 to-cyan-800' },
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user
        const userRes = await fetch('/api/auth/me', { method: 'GET' })
        const userData = await userRes.json()
        setUser(userData.user || null)

        // Fetch real stats and update game player counts
        const profilesRes = await fetch('/api/profiles', { method: 'GET' })
        const profilesData = await profilesRes.json()
        const allProfiles = profilesData.profiles || []

        const uniquePlayers = new Set(allProfiles.map(p => p.user_id)).size
        setStats({ players: uniquePlayers, profiles: allProfiles.length })

        // compute counts per game name
        const counts = {}
        for (const p of allProfiles) {
          const g = p.game || p.game_name || p.gameName || ''
          if (!g) continue
          counts[g] = (counts[g] || 0) + 1
        }
        setGamesCounts(counts)
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-24 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-6">Find Your Gaming Squad</h1>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Connect with millions of gamers, find teammates, and discover gaming communities.
          </p>

          {/* Main CTAs */}
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            {user ? (
              <>
                <Link href="/dashboard" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition">
                  Dashboard
                </Link>
                <Link href="/discover" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition">
                  Find Players
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition">
                  Get Started
                </Link>
                <Link href="/login" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-black text-blue-400">{stats.players}</div>
              <div className="text-slate-400 text-sm">Active Players</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-400">{stats.profiles}</div>
              <div className="text-slate-400 text-sm">Profiles</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-400">4</div>
              <div className="text-slate-400 text-sm">Games</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-400">24/7</div>
              <div className="text-slate-400 text-sm">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-10">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_ACTIONS.map((action) => (
              <Link key={action.title} href={action.href}>
                <div className={`group bg-gradient-to-br ${action.color} bg-opacity-20 border border-slate-700 hover:border-slate-600 rounded-xl p-6 transition cursor-pointer`}>
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Games */}
      <section className="py-16 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-10">Trending Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GAMES.map((game) => (
              <Link key={game.name} href={`/games/${game.name}`}>
                <div className="group bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 rounded-xl p-6 transition cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <img src={game.image} alt={game.name} className="h-16 w-16 object-contain group-hover:scale-110 transition" />
                    <div className="text-right">
                      <div className="font-bold text-slate-200">{gamesCounts[game.name] || game.players}</div>
                      <div className="text-xs text-slate-400">players</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">{game.name}</h3>
                  <p className="text-slate-400 text-sm">Browse community</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">Ready to Find Your Squad?</h2>
          <p className="text-lg text-slate-300 mb-8">Join thousands of gamers connecting on GameLink</p>
          {!user && (
            <Link href="/signup" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition">
              Get Started Free
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
