import React from 'react'
import Link from 'next/link'
import DiscoverList from '../../../components/game/DiscoverList'
import PromotionCard from '../../../components/promotions/PromotionCard'

const GAMES = ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs', 'Other']
const GAME_INFO = {
  'Roblox': {
    image: 'https://images.roblox.com/Roblox_logo.svg',
    description: 'The platform for 3D experiences. Imagination is the limit as you create the worlds, play the games, and be anything you can imagine.',
    players: 'Millions',
    founded: '2006',
    genre: 'Platform'
  },
  'Minecraft': {
    image: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/minecraft-key-visual-logo.png',
    description: 'Build, explore, survive, and thrive. From the creators of Minecraft, explore infinite worlds and build everything from the simplest of homes to the grandest of castles.',
    players: 'Millions',
    founded: '2011',
    genre: 'Sandbox'
  },
  'Fortnite': {
    image: 'https://www.fortniteultimate.com/logo.png',
    description: 'Battle Royale. Land, scavenge for weapons and items, and fight to be the last player standing. Drop into a 100-player free-for-all every match.',
    players: 'Millions',
    founded: '2018',
    genre: 'Battle Royale'
  },
  'AmongUs': {
    image: 'https://innersloth.com/logo.png',
    description: 'A social deduction game. An online party game of teamwork and betrayal. 4-15 players gather together to discuss who among them is an impostor.',
    players: 'Millions',
    founded: '2018',
    genre: 'Social Deduction'
  },
  'Other': {
    image: 'https://cdn-icons-png.flaticon.com/512/413/413502.png',
    description: 'Discover other amazing games and find your squad.',
    players: 'Many',
    founded: 'Various',
    genre: 'Various'
  }
}

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

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/discover" className="text-slate-400 hover:text-slate-300 text-sm mb-4 inline-block">
            ← Back to Discovery
          </Link>
          <div className="flex items-start gap-6">
            <img src={gameInfo.image} alt={game} className="h-24 w-24 object-contain" />
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-white mb-3">{game}</h1>
              <p className="text-xl text-slate-300 mb-4">{gameInfo.description}</p>
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="text-sm text-slate-400">Players Online</div>
                  <div className="text-2xl font-bold text-slate-300">{gameInfo.players}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Founded</div>
                  <div className="text-2xl font-bold text-slate-300">{gameInfo.founded}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Genre</div>
                  <div className="text-2xl font-bold text-slate-300">{gameInfo.genre}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">GameLink Players</div>
                  <div className="text-2xl font-bold text-slate-300">{profiles.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Players Section */}
        <section className="mb-12">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 border-opacity-30">
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
        <section className="mt-12 pt-8 border-t border-slate-600 border-opacity-30">
          <h2 className="text-2xl font-bold text-white mb-4">Explore Other Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {GAMES.filter(g => g !== game).map((g) => (
              <Link
                key={g}
                href={`/games/${g}`}
                className="p-4 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 border-opacity-30 transition text-center"
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
