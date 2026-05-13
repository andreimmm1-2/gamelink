'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function WinrateAnalyticsPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      const res = await fetch('/api/analytics/winrate')
      const data = await res.json()
      setStats(data.stats || {})
    } catch (err) {
      console.error('Error loading analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"><div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div></main>

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📈 Win Rate Analytics</h1>
        <p className="text-slate-400 mb-8">Detailed analysis of your gameplay performance</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-1">Overall Win Rate</div>
            <div className="text-4xl font-black text-green-400">0%</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-1">Matches Played</div>
            <div className="text-4xl font-black text-blue-400">0</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-1">Avg Match Duration</div>
            <div className="text-4xl font-black text-purple-400">0m</div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Performance by Game</h2>
          <p className="text-slate-400">Analytics will appear here</p>
        </div>
      </div>
    </main>
  )
}
