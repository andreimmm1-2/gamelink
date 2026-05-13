'use client'

import React, { useState } from 'react'

export default function BadgesPage() {
  const badges = [
    { name: 'Newcomer', icon: '🎮', unlocked: true },
    { name: 'Friendly', icon: '👋', unlocked: true },
    { name: 'Team Player', icon: '👥', unlocked: false },
    { name: 'Tournament Champion', icon: '🏆', unlocked: false },
    { name: 'Legendary', icon: '⭐', unlocked: false },
    { name: 'Streamer', icon: '📡', unlocked: false }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🏅 Badges</h1>
        <p className="text-slate-400 mb-8">Earn badges by completing achievements</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge, idx) => (
            <div key={idx} className={`rounded-lg p-6 text-center border transition ${badge.unlocked ? 'bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border-yellow-500/30' : 'bg-slate-800 border-slate-700 opacity-50'}`}>
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h3 className="font-bold text-white text-sm">{badge.name}</h3>
              {badge.unlocked && <div className="text-xs text-yellow-300 mt-2">✓ Unlocked</div>}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
