'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function PlaytimeTrackerPage() {
  const [playtime, setPlaytime] = useState({})

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">⏱️ Playtime Tracker</h1>
        <p className="text-slate-400 mb-8">Monitor your gaming activity</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-sm text-slate-400 mb-1">Today</div>
            <div className="text-3xl font-black text-indigo-400">0h</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-sm text-slate-400 mb-1">This Week</div>
            <div className="text-3xl font-black text-blue-400">0h</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-sm text-slate-400 mb-1">This Month</div>
            <div className="text-3xl font-black text-green-400">0h</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-sm text-slate-400 mb-1">Total</div>
            <div className="text-3xl font-black text-purple-400">0h</div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Playtime by Game</h2>
          <p className="text-slate-400">Start playing to see stats</p>
        </div>
      </div>
    </main>
  )
}
