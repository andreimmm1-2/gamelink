'use client'

import React, { useState } from 'react'

export default function ProPlayerProfilesPage() {
  const [players, setPlayers] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">⭐ Pro Player Profiles</h1>
        <p className="text-slate-400 mb-8">Follow professional gamers</p>

        <input type="text" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none mb-8" placeholder="Search pro players..." />

        {players.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">⭐</div>
            <h2 className="text-2xl font-bold text-white mb-2">Pro Profiles</h2>
            <p className="text-slate-400">Loading pro player profiles...</p>
          </div>
        ) : (
          <div className="grid gap-4">Pro player listings</div>
        )}
      </div>
    </main>
  )
}
