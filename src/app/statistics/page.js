'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function StatisticsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      const userRes = await fetch('/api/auth/me')
      const userData = await userRes.json()
      if (!userData.user) {
        router.push('/login')
        return
      }
      setUser(userData.user)

      // Load real stats from API
      const statsRes = await fetch(`/api/statistics/${userData.user.id}`)
      const statsData = await statsRes.json()
      setStats(statsData.stats || {})
    } catch (err) {
      console.error('Error loading stats:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
    </main>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📊 My Statistics</h1>
        <p className="text-slate-400 mb-8">Track your gaming progress and achievements</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-1">Profiles Created</div>
            <div className="text-4xl font-black text-indigo-400">3</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-1">Friends</div>
            <div className="text-4xl font-black text-green-400">12</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-1">Tournaments</div>
            <div className="text-4xl font-black text-yellow-400">5</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-1">Achievements</div>
            <div className="text-4xl font-black text-pink-400">8</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-black text-white mb-4">Recent Activity</h2>
            <p className="text-slate-400">Your activity will appear here</p>
          </div>
        </div>
      </div>
    </main>
  )
}
