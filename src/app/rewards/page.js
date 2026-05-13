'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RewardsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRewards()
  }, [])

  async function loadRewards() {
    try {
      const userRes = await fetch('/api/auth/me')
      const userData = await userRes.json()
      if (!userData.user) {
        router.push('/login')
        return
      }
      setUser(userData.user)
      
      const pointsRes = await fetch('/api/rewards/points')
      const pointsData = await pointsRes.json()
      setPoints(pointsData.points || 0)
    } catch (err) {
      console.error('Error loading rewards:', err)
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
        <h1 className="text-5xl font-black text-white mb-2">🎁 Rewards</h1>
        <p className="text-slate-400 mb-8">Earn points and unlock exclusive rewards</p>

        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-lg p-8 mb-12 text-center">
          <div className="text-5xl font-black text-indigo-400 mb-2">{points}</div>
          <div className="text-white font-bold">GameLink Points</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="font-bold text-white text-lg mb-2">Game Cosmetics</h3>
            <p className="text-slate-400 text-sm mb-4">Exclusive skins and items for your favorite games</p>
            <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition">
              Browse Cosmetics
            </button>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-4xl mb-3">🏅</div>
            <h3 className="font-bold text-white text-lg mb-2">Exclusive Badges</h3>
            <p className="text-slate-400 text-sm mb-4">Show off your achievements with special badges</p>
            <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition">
              View Badges
            </button>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-bold text-white text-lg mb-2">Premium Features</h3>
            <p className="text-slate-400 text-sm mb-4">Unlock premium membership benefits</p>
            <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">How to Earn Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-bold text-white">Complete Challenges</h3>
                <p className="text-slate-400 text-sm">Earn points by completing daily and weekly challenges</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-bold text-white">Win Tournaments</h3>
                <p className="text-slate-400 text-sm">Earn bonus points by winning tournaments</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-bold text-white">Refer Friends</h3>
                <p className="text-slate-400 text-sm">Get points when your friends join GameLink</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-bold text-white">Activity Streaks</h3>
                <p className="text-slate-400 text-sm">Maintain daily login streaks for bonus points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
