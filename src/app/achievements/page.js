'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([])
  const [userAchievements, setUserAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAchievements()
  }, [])

  async function loadAchievements() {
    try {
      const res = await fetch('/api/auth/me')
      const userData = await res.json()
      if (userData.user) {
        // Fetch real achievements from API
        const achRes = await fetch('/api/achievements')
        const achData = await achRes.json()
        setAchievements(achData.achievements || [])
      }
    } catch (err) {
      console.error('Error loading achievements:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🏅 Achievements</h1>
        <p className="text-slate-400 mb-8">Unlock achievements and earn badges</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`rounded-lg p-6 border transition ${
                ach.unlocked
                  ? 'bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border-yellow-500/30'
                  : 'bg-slate-800 border-slate-700 opacity-50'
              }`}
            >
              <div className="text-5xl mb-3">{ach.icon}</div>
              <h3 className="font-bold text-white text-lg mb-1">{ach.name}</h3>
              <p className="text-sm text-slate-400">{ach.description}</p>
              {ach.unlocked && (
                <div className="mt-3 text-xs text-yellow-300 font-semibold">✓ Unlocked</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
