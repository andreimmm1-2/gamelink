'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ActivityFeedPage() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadActivity()
  }, [])

  async function loadActivity() {
    try {
      setActivities([])
    } catch (err) {
      console.error('Error loading activity:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📊 Activity Feed</h1>
        <p className="text-slate-400 mb-8">Recent activity from your friends and the community</p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">🌚</div>
            <h2 className="text-2xl font-bold text-white mb-2">No activity yet</h2>
            <p className="text-slate-400 mb-6">Start adding friends to see their activity</p>
            <Link href="/friends" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg inline-block">
              Go to Friends
            </Link>
          </div>
        ) : (
          <div className="space-y-3">Activity Stream</div>
        )}
      </div>
    </main>
  )
}
