'use client'

import React, { useState } from 'react'

export default function SeasonalRanksPage() {
  const [rank, setRank] = useState({})

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🌟 Seasonal Ranks</h1>
        <p className="text-slate-400 mb-8">Track your seasonal ranking progress</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Season 1', 'Season 2', 'Season 3'].map((season, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">{season}</h3>
              <div className="text-3xl font-black text-indigo-400 mb-2">Unranked</div>
              <p className="text-sm text-slate-400">Play matches to get ranked</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
