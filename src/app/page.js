'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const GAMES = [
  { name: 'Roblox', image: '/images/roblox.svg' },
  { name: 'Minecraft', image: '/images/minecraft.svg' },
  { name: 'Fortnite', image: '/images/fortnite.svg' },
  { name: 'AmongUs', image: '/images/amongus.svg' },
]


export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ players: 0, profiles: 0 })
  const [gamesCounts, setGamesCounts] = useState({})
  const [hoveredStat, setHoveredStat] = useState(null)

  // Define QUICK_ACTIONS inside the component to ensure it's bundled with the client code
  const QUICK_ACTIONS = [
    { title: 'Find Gamers', desc: 'Discover players', icon: '🔍', href: '/find-players', color: 'from-blue-600 to-blue-800' },
    { title: 'Create Profile', desc: 'Build your profile', icon: '👤', href: '/dashboard/my-profiles', color: 'from-purple-600 to-purple-800' },
    { title: 'Explore Teams', desc: 'Join squads', icon: '👥', href: '/teams', color: 'from-pink-600 to-pink-800' },
    { title: 'Leaderboards', desc: 'See rankings', icon: '🏆', href: '/leaderboards', color: 'from-yellow-600 to-yellow-800' },
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
      <section className="py-24 border-b border-slate-700 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -top-32 -left-32 animate-float"></div>
          <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -bottom-32 -right-32 animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-black mb-6 animate-slideInLeft">
            Find Your Gaming<span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent"> Squad</span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto animate-slideInRight" style={{animationDelay: '0.1s'}}>
            Connect with millions of gamers, find teammates, and discover gaming communities.
          </p>

          {/* Main CTAs */}
          <div className="flex gap-4 justify-center flex-wrap mb-8 animate-fadeIn" style={{animationDelay: '0.2s'}}>
            {user ? (
              <>
                <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-bold transition transform hover:scale-105 hover:shadow-lg shadow-blue-500/50 duration-200">
                  Dashboard
                </Link>
                <Link href="/find-players" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition border border-slate-600 hover:border-slate-500 transform hover:scale-105 duration-200">
                  Find Players
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-bold transition transform hover:scale-105 hover:shadow-lg shadow-blue-500/50 duration-200">
                  Get Started
                </Link>
                <Link href="/login" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition border border-slate-600 hover:border-slate-500 transform hover:scale-105 duration-200">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fadeIn" style={{animationDelay: '0.3s'}}>
            {[
              { value: stats.players, label: 'Active Players', emoji: '👥' },
              { value: stats.profiles, label: 'Profiles', emoji: '👤' },
              { value: 4, label: 'Games', emoji: '🎮' },
              { value: '24/7', label: 'Support', emoji: '🎧' }
            ].map((stat, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredStat(idx)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`p-4 rounded-lg border border-slate-700 transition transform duration-200 cursor-pointer ${
                  hoveredStat === idx ? 'border-indigo-500 bg-slate-800/50 shadow-lg shadow-indigo-500/20 scale-105' : 'bg-slate-800/20 hover:bg-slate-800/40'
                }`}
              >
                <div className={`text-3xl mb-2 transition transform duration-200 ${hoveredStat === idx ? 'scale-125' : ''}`}>
                  {stat.emoji}
                </div>
                <div className="text-3xl font-black text-indigo-400">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-10">🚀 Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_ACTIONS.map((action, idx) => (
              <Link key={action.title} href={action.href}>
                <div className={`group bg-gradient-to-br ${action.color} bg-opacity-20 border border-slate-700 hover:border-indigo-500/50 rounded-xl p-6 transition cursor-pointer transform hover:scale-105 duration-300 animate-fadeIn`} style={{animationDelay: `${idx * 50}ms`}}>
                  <div className="text-4xl mb-3 transition transform group-hover:scale-125 group-hover:rotate-12 duration-200">{action.icon}</div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-300 transition">{action.title}</h3>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300 transition">{action.desc}</p>
                  <div className="mt-3 text-indigo-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition">Explore →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Games */}
      <section className="py-16 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-10">🎮 Trending Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GAMES.map((game, idx) => (
              <Link key={game.name} href={`/games/${game.name}`}>
                <div className="group bg-slate-800/30 border border-slate-700/50 hover:border-indigo-500/50 rounded-xl p-6 transition cursor-pointer transform hover:scale-105 duration-300 animate-fadeIn" style={{animationDelay: `${idx * 50}ms`}}>
                  <div className="flex items-start justify-between mb-4">
                    <img src={game.image} alt={game.name} className="h-16 w-16 object-contain group-hover:scale-125 group-hover:drop-shadow-lg transition duration-300" />
                    <div className="text-right">
                      <div className="font-bold text-indigo-400 text-lg">{gamesCounts[game.name] || 0}</div>
                      <div className="text-xs text-slate-400">players</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition">{game.name}</h3>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300 transition">Browse community</p>
                  <div className="mt-3 text-indigo-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition">Join now →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Still New Banner */}
      <section className="py-12 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-y border-amber-500/30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h2 className="text-2xl font-bold text-white mb-2">We're Still New & Growing!</h2>
          <p className="text-amber-100 max-w-2xl mx-auto mb-6">
            GameLink is brand new and we're just getting started. We need <span className="font-bold">YOU</span> to help build this community! 
            Create your profile, invite your gaming friends, and let's grow together.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard/my-profiles" className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition transform hover:scale-105">
              Join the Community
            </Link>
            <Link href="/find-players" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition transform hover:scale-105 border border-slate-600">
              Find Players
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="animate-slideInLeft">
              <h2 className="text-3xl font-black mb-4">✨ Why Join GameLink?</h2>
              <div className="space-y-4">
                {[
                  { icon: '⚡', title: 'Instant Connections', desc: 'Find teammates in seconds' },
                  { icon: '🎯', title: 'Smart Matching', desc: 'Connect with compatible players' },
                  { icon: '🏆', title: 'Competitive Ranks', desc: 'Track your competitive journey' },
                  { icon: '🌍', title: 'Global Community', desc: 'Play with gamers worldwide' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-slate-800/30 border border-slate-700 hover:border-indigo-500/50 rounded-lg transition transform hover:translate-x-2 duration-200 cursor-pointer">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-white">{item.title}</h3>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Featured Stats */}
            <div className="animate-slideInRight">
              <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-indigo-500/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Community Highlights</h3>
                <div className="space-y-4">
                  {[
                    { number: '50K+', label: 'Total Gamers' },
                    { number: '1.2M', label: 'Matches Made' },
                    { number: '180+', label: 'Countries' },
                    { number: '99%', label: 'User Satisfaction' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition">
                      <span className="text-sm text-slate-400">{item.label}</span>
                      <span className="text-xl font-bold text-indigo-400">{item.number}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Final CTA Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 animate-fadeIn">
          <h2 className="text-4xl font-black mb-4">🚀 Ready to Find Your Squad?</h2>
          <p className="text-lg text-slate-300 mb-8">Join thousands of gamers connecting on GameLink</p>
          <div className="flex gap-4 justify-center flex-wrap">
            {!user && (
              <>
                <Link href="/signup" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg font-bold transition transform hover:scale-105 shadow-lg shadow-indigo-500/50 duration-200">
                  Get Started Free
                </Link>
                <Link href="/teams" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition border border-slate-600 hover:border-slate-500 transform hover:scale-105 duration-200">
                  Browse Players
                </Link>
              </>
            )}
            {user && (
              <Link href="/find-players" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg font-bold transition transform hover:scale-105 shadow-lg shadow-indigo-500/50 duration-200">
                Find Players Now
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
