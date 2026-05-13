'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function MatchHistoryPage() {
  const router = useRouter()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMatches()
  }, [])

  async function loadMatches() {
    try {
      const userRes = await fetch('/api/auth/me')
      const userData = await userRes.json()
      if (!userData.user) {
        router.push('/login')
        return
      }
      const matchRes = await fetch('/api/match-history')
      const matchData = await matchRes.json()
      setMatches(matchData.matches || [])
    } catch (err) {
      console.error('Error loading matches:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"><div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div></main>

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🎮 Match History</h1>
        <p className="text-slate-400 mb-8">Review your recent matches and performance</p>

        {matches.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">📋</div>
            <h2 className="text-2xl font-bold text-white mb-2">No matches yet</h2>
            <p className="text-slate-400">Start playing to see match history!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-indigo-500 transition">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white">{match.game}</h3>
                    <p className="text-sm text-slate-400">{match.date}</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
