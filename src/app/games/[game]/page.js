import React from 'react'
import DiscoverList from '../../../components/game/DiscoverList'
import PromotionCard from '../../../components/promotions/PromotionCard'

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
  // filter promotions for this game
  return (data.promotions || []).filter((p) => p.game.toLowerCase() === game.toLowerCase())
}

export default async function GamePage({ params }) {
  const { game } = params
  const profiles = await fetchProfilesForGame(game)
  const promotions = await fetchPromotionsForGame(game)

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Players for {game}</h1>
      <section>
        <DiscoverList initialProfiles={profiles} />
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Featured Servers</h2>
        <div className="grid gap-3">
          {promotions.length === 0 && <div className="text-gray-400">No featured servers.</div>}
          {promotions.map((p) => (
            <PromotionCard key={p._id} promo={p} />
          ))}
        </div>
      </section>
    </main>
  )
}
