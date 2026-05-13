import React from 'react'
import Link from 'next/link'
import DiscoverList from '../../../components/game/DiscoverList'
import PromotionCard from '../../../components/promotions/PromotionCard'
import HeroCarousel from '../../../components/game/HeroCarousel'

const GAMES = ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs', 'Other']

const GAME_INFO = {
  'Roblox': {
    image: '/images/roblox.svg',
    description: 'The platform for 3D experiences. Create, play, and be anything you imagine.',
    players: 'Millions',
    founded: '2006',
    genre: 'Platform',
    accentColor: 'from-red-600 to-red-800',
    accentLight: 'red-500',
    accentBg: 'bg-red-500/20',
    variant: 'split'
  },
  'Minecraft': {
    image: '/images/minecraft.svg',
    description: 'Build, explore, and survive in infinite worlds.',
    players: 'Millions',
    founded: '2011',
    genre: 'Sandbox',
    accentColor: 'from-green-600 to-green-800',
    accentLight: 'green-500',
    accentBg: 'bg-green-500/20',
    variant: 'center'
  },
  'Fortnite': {
    image: '/images/fortnite.svg',
    description: 'Battle royale action. Fight to be the last standing.',
    players: 'Millions',
    founded: '2018',
    genre: 'Battle Royale',
    accentColor: 'from-purple-600 to-purple-800',
    accentLight: 'purple-500',
    accentBg: 'bg-purple-500/20',
    variant: 'imageRight'
  },
  'AmongUs': {
    image: '/images/amongus.svg',
    description: 'Social deduction game. Work together to find the impostor.',
    players: 'Millions',
    founded: '2018',
    genre: 'Social Deduction',
    accentColor: 'from-cyan-600 to-cyan-800',
    accentLight: 'cyan-500',
    accentBg: 'bg-cyan-500/20',
    variant: 'compact'
  },
  'Other': {
    image: '/images/game-icon.svg',
    description: 'Explore games beyond our featured titles.',
    players: 'Community',
    founded: 'Growing',
    genre: 'Diverse',
    accentColor: 'from-blue-600 to-blue-800',
    accentLight: 'blue-500',
    accentBg: 'bg-blue-500/20',
    variant: 'default'
  }
}

// Placeholder — replace with real community/activity APIs in the future
const COMMUNITIES = []
const ACTIVITY = []

async function fetchProfilesForGame(game) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/profiles?game=${encodeURIComponent(game)}`, { cache: 'no-store' })
  if (!res.ok) return []
  const data = await res.json()
  return data.profiles || []
}

async function fetchPromotionsForGame(game) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/promotions`, { cache: 'no-store' })
  if (!res.ok) return []
  const data = await res.json()
  return (data.promotions || []).filter((p) => p.game.toLowerCase() === game.toLowerCase())
}

export default async function GamePage({ params }) {
  const { game } = params
  const profiles = await fetchProfilesForGame(game)
  const promotions = await fetchPromotionsForGame(game)
  const gameInfo = GAME_INFO[game] || GAME_INFO['Other']
  const variant = gameInfo.variant || 'default'
  const heroReverse = variant === 'imageRight'
  const heroCenter = variant === 'center'
  const compactHero = variant === 'compact'

  // sectionsOrder controls which sections appear first; compact games prioritize Active Gamers
  const sectionsOrder = compactHero ? ['active', 'communities', 'activity'] : ['communities', 'activity', 'active']

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${gameInfo.accentColor} to-black border-b border-slate-700 py-16`}>
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm mb-4 inline-block">
            ← Back Home
          </Link>
          <div className={`flex ${heroCenter ? 'justify-center text-center items-center' : 'items-start'} gap-8 ${heroReverse ? 'flex-row-reverse' : ''}`}>
            <div className={`h-28 w-28 rounded-xl bg-slate-800/50 flex items-center justify-center flex-shrink-0 ${heroCenter ? '' : ''}`}>
              <img src={gameInfo.image} alt={game} className={`${compactHero ? 'h-16 w-16' : 'h-20 w-20'} object-contain`} />
            </div>
            <div className="flex-1">
              <h1 className={`${compactHero ? 'text-4xl' : 'text-6xl'} font-black mb-3`}>{game}</h1>
              <p className={`${compactHero ? 'text-base' : 'text-xl'} text-slate-300 mb-6 max-w-2xl`}>{gameInfo.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-sm text-slate-400">Players Online</div>
                  <div className="text-2xl font-bold text-slate-200">{gameInfo.players}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Founded</div>
                  <div className="text-2xl font-bold text-slate-200">{gameInfo.founded}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Genre</div>
                  <div className="text-2xl font-bold text-slate-200">{gameInfo.genre}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Community Players</div>
                  <div className="text-2xl font-bold text-slate-200">{profiles.length}</div>
                </div>
              </div>
            </div>
            </div>

            {/* Enhanced visual hero area (carousel/featured artwork) */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
              <HeroCarousel game={game} gameInfo={gameInfo} promotions={promotions} />
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {sectionsOrder.map((s) => {
              if (s === 'communities') {
                return (
                  <section key="communities">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-black">Featured Communities</h2>
                      <Link href="#" className="text-slate-400 hover:text-slate-300 transition">View All →</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {COMMUNITIES.length === 0 ? (
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 text-center">
                          <p className="text-slate-400 mb-3">No featured communities yet for this game.</p>
                          <p className="text-slate-400 text-sm mb-4">Communities appear when users create groups or when promoted by admins.</p>
                          <Link href="/dashboard" className="inline-block py-2 px-4 bg-slate-700/50 hover:bg-slate-600 rounded-lg font-semibold">Create a Community</Link>
                        </div>
                      ) : (
                        COMMUNITIES.map((community, i) => (
                          <div key={i} className={`group rounded-xl border border-slate-700/50 ${gameInfo.accentBg} bg-slate-800/30 p-6 hover:border-slate-600 transition cursor-pointer`}>
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-lg font-bold group-hover:text-slate-300 transition">{community.name}</h3>
                              {community.trending && <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full">Trending</span>}
                            </div>
                            <p className="text-slate-400 text-sm mb-3">Members information available when communities are created</p>
                            <button className="w-full py-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg font-semibold transition">
                              Join Community
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                )
              }

              if (s === 'activity') {
                return (
                  <section key="activity">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-black">Community Activity</h2>
                    </div>
                    <div className="space-y-3">
                      {ACTIVITY.length === 0 ? (
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-8 text-center">
                          <p className="text-slate-400 mb-2">No recent community activity to display.</p>
                          <p className="text-slate-400 text-sm mb-4">Activity will appear here when members post or events are created.</p>
                          <Link href="/dashboard" className="inline-block py-2 px-4 bg-slate-700/50 hover:bg-slate-600 rounded-lg font-semibold">Create a post or event</Link>
                        </div>
                      ) : (
                        ACTIVITY.map((activity) => (
                          <div key={activity.id} className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-5 hover:border-slate-600 transition cursor-pointer">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-2 py-1 bg-slate-700/50 rounded text-xs font-semibold capitalize`}>{activity.type}</span>
                                  <span className="text-slate-400 text-xs">{activity.time}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1">{activity.title}</h3>
                                <p className="text-slate-400 text-sm">by {activity.author}</p>
                              </div>
                              <div className="text-right text-slate-400 text-sm">
                                <div className="font-bold text-slate-300">{activity.likes}</div>
                                <div className="text-xs">reactions</div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                )
              }

              if (s === 'active') {
                return (
                  <section key="active">
                    <h2 className="text-3xl font-black mb-6">Active Gamers</h2>
                    <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
                      {profiles.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-5xl mb-3">🔍</div>
                          <p className="text-slate-400 mb-2">No players found for {game}</p>
                          <Link href="/signup" className="text-blue-400 hover:text-blue-300 text-sm">Be the first to create a profile!</Link>
                        </div>
                      ) : (
                        <DiscoverList initialProfiles={profiles} />
                      )}
                    </div>
                  </section>
                )
              }

              return null
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Servers */}
            {promotions.length > 0 && (
              <section>
                <h3 className="text-2xl font-black mb-4">Featured Servers</h3>
                <div className="space-y-3">
                  {promotions.map((p) => (
                    <PromotionCard key={p.id || p._id} promo={p} />
                  ))}
                </div>
              </section>
            )}

            {/* Quick Stats */}
            <section className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
              <h3 className="text-lg font-bold mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Total Members</div>
                  <div className="text-3xl font-black text-blue-400">{profiles.length}</div>
                </div>
                <div className="h-px bg-slate-700"></div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">Top Games This Week</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{width: '85%'}}></div>
                      </div>
                      <span className="text-xs text-slate-400">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className={`rounded-xl border border-slate-700/50 bg-gradient-to-br ${gameInfo.accentColor} bg-opacity-10 p-6 text-center`}>
              <h3 className="font-black text-lg mb-3">Find Teammates</h3>
              <p className="text-slate-300 text-sm mb-4">Join the community and find players to team up with</p>
              <Link href="/discover" className={`inline-block w-full px-4 py-3 bg-gradient-to-r ${gameInfo.accentColor} rounded-lg font-bold transition hover:shadow-lg`}>
                Browse Players
              </Link>
            </div>
          </div>
        </div>

        {/* Other Games */}
        <section className="mt-16 pt-12 border-t border-slate-700">
          <h2 className="text-3xl font-black mb-6">Explore Other Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {GAMES.filter(g => g !== game).map((g) => (
              <Link key={g} href={`/games/${g}`}>
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-600 p-4 text-center transition">
                  <div className="text-4xl mb-2">{g === 'Minecraft' ? '⛏️' : g === 'Roblox' ? '🎮' : g === 'Fortnite' ? '🎯' : g === 'AmongUs' ? '👨‍🚀' : '🕹️'}</div>
                  <div className="font-bold text-sm">{g}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
