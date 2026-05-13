'use client'

import React, { useState } from 'react'

export default function RankedCompetitionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🏅 Ranked Competition</h1>
        <p className="text-slate-400 mb-8">Compete in ranked matches and climb the ranks</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {['Bronze', 'Silver', 'Gold', 'Platinum'].map((rank, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">{'🥉🥈🥇💎'[idx]}</div>
              <h3 className="text-white font-bold">{rank}</h3>
              <p className="text-slate-400 text-sm mt-2">Current Rank</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Current Progress</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Bronze to Silver</span>
              <span>0/100 points</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{width: '0%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
