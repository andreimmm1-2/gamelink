import React from 'react'
import Link from 'next/link'

export default function RoadmapPage() {
  const roadmapItems = [
    {
      phase: 'Current',
      features: [
        'Player profiles and discovery',
        'Tournament creation and management',
        'Friend requests and messaging',
        'Achievement system',
        'Rewards and points'
      ]
    },
    {
      phase: 'Q3 2026',
      features: [
        'Voice/video chat integration',
        'Mobile app launch',
        'Streaming integration (Twitch/YouTube)',
        'Clan management tools',
        'Advanced statistics'
      ]
    },
    {
      phase: 'Q4 2026',
      features: [
        'In-app cosmetics store',
        'Tournament prize pools',
        'Sponsorship opportunities',
        'Professional team tools',
        'Global leaderboards'
      ]
    },
    {
      phase: 'Early 2027',
      features: [
        'Cross-platform integration',
        'Bot integration for matchmaking',
        'Advanced analytics',
        'Community moderation tools',
        'Partner integrations'
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🗺️ Feature Roadmap</h1>
        <p className="text-slate-400 mb-12">See what we're building for GameLink</p>

        <div className="space-y-8">
          {roadmapItems.map((item, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-indigo-400 mb-4">{item.phase}</h2>
              <ul className="space-y-2">
                {item.features.map((feature, fidx) => (
                  <li key={fidx} className="text-slate-300 flex gap-2">
                    <span>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Have Ideas?</h2>
          <p className="text-slate-400 mb-6">We'd love to hear your feature requests!</p>
          <Link href="/contact" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg inline-block transition">
            Send Feedback
          </Link>
        </div>
      </div>
    </main>
  )
}
