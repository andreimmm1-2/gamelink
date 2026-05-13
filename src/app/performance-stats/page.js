'use client'

import React, { useState } from 'react'

export default function PerformanceStatsPage() {
  const [stats, setStats] = useState({})

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📈 Performance Stats</h1>
        <p className="text-slate-400 mb-8">Detailed performance analysis</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-sm text-slate-400 mb-1">K/D Ratio</div>
            <div className="text-3xl font-black text-indigo-400">0.0</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-sm text-slate-400 mb-1">Accuracy</div>
            <div className="text-3xl font-black text-green-400">0%</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-sm text-slate-400 mb-1">Headshots</div>
            <div className="text-3xl font-black text-red-400">0</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-sm text-slate-400 mb-1">Avg FPS</div>
            <div className="text-3xl font-black text-purple-400">0</div>
          </div>
        </div>
      </div>
    </main>
  )
}
