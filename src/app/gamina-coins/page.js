'use client'

import React, { useState } from 'react'

export default function GaminaCoinPage() {
  const [coins, setCoins] = useState(0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">💰 Gamina Coins</h1>
        <p className="text-slate-400 mb-8">Earn and spend virtual currency</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-500/30 rounded-lg p-6 text-center">
            <div className="text-5xl mb-3">💰</div>
            <div className="text-4xl font-black text-yellow-400">{coins}</div>
            <p className="text-slate-400 text-sm mt-2">Available Coins</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-5xl mb-3">📊</div>
            <div className="text-4xl font-black text-indigo-400">0</div>
            <p className="text-slate-400 text-sm mt-2">Total Earned</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-5xl mb-3">🛍️</div>
            <div className="text-4xl font-black text-green-400">0</div>
            <p className="text-slate-400 text-sm mt-2">Total Spent</p>
          </div>
        </div>

        <button className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Shop & Rewards</button>
      </div>
    </main>
  )
}
