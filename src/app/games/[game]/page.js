import React from 'react'
import Link from 'next/link'
import DiscoverList from '../../../components/game/DiscoverList'
import PromotionCard from '../../../components/promotions/PromotionCard'

const GAMES = ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs', 'Other']

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

const GAME_EMOJIS = {
  'Roblox': '🎮',
  'Minecraft': '⛏️',
  'Fortnite': '🎯',
  'AmongUs': '👨‍🚀',
  'Other': '🕹️'
}

export default async function GamePage({ params }) {
  const { game } = params
  const profiles = await fetchProfilesForGame(game)
  const promotions = await fetchPromotionsForGame(game)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-slate-900 border-b border-purple-500 border-opacity-30">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link href="/discover" className="text-purple-400 hover:text-purple-300 text-sm mb-4 inline-block">
            ← Back to Discovery
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            {GAME_EMOJIS[game]} {game} Players
          </h1>
          <p className="text-gray-400">
            Found <span className="text-purple-400 font-bold">{profiles.length}</span> {profiles.length === 1 ? 'player' : 'players'} playing {game}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Players Section */}
        <section className="mb-12">
          <div className="bg-slate-800 rounded-lg p-6 border border-purple-500 border-opacity-30">
            {profiles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">🔍</div>
                <p className="text-gray-400 mb-2">No players found for {game}</p>
                <p className="text-gray-500 text-sm">Be the first to create a profile!</p>
              </div>
            ) : (
              <DiscoverList initialProfiles={profiles} />
            )}
          </div>
        </section>

        {/* Featured Servers Section */}
        {promotions.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Featured Servers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promotions.map((p) => (
                <PromotionCard key={p.id || p._id} promo={p} />
              ))}
            </div>
          </section>
        )}

        {/* Other Games */}
        <section className="mt-12 pt-8 border-t border-purple-500 border-opacity-30">
          <h2 className="text-2xl font-bold text-white mb-4">Explore Other Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {GAMES.filter(g => g !== game).map((g) => (
              <Link
                key={g}
                href={`/games/${g}`}
                className="p-4 bg-slate-800 hover:bg-slate-700 rounded-lg border border-purple-500 border-opacity-30 transition text-center"
              >
                <div className="text-3xl mb-2">{GAME_EMOJIS[g]}</div>
                <div className="text-white font-medium text-sm">{g}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
