'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GameProfileForm from '../../components/game/GameProfileForm'
import GameProfileList from '../../components/game/GameProfileList'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const meRes = await fetch('/api/auth/me', { cache: 'no-store' })
        const meData = await meRes.json()
        const currentUser = meData.user || null
        setUser(currentUser)

        if (currentUser?.id) {
          const profilesRes = await fetch(`/api/profiles?userId=${currentUser.id}`, { cache: 'no-store' })
          const profilesData = await profilesRes.json()
          setProfiles(profilesData.profiles || [])
        } else {
          setProfiles([])
        }
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [refreshCount])

  async function handleLogout() {
    document.cookie = 'token=; Max-Age=0; path=/;'
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading your dashboard...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Please sign in to access your dashboard.</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user.username}!</h1>
            <p className="text-gray-300">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-purple-500 border-opacity-30">
            <div className="text-gray-400 text-sm mb-1">Total Profiles</div>
            <div className="text-3xl font-bold text-white">{profiles.length}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-purple-500 border-opacity-30">
            <div className="text-gray-400 text-sm mb-1">Member Since</div>
            <div className="text-lg font-bold text-white">{new Date(user.created_at).toLocaleDateString()}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-purple-500 border-opacity-30">
            <div className="text-gray-400 text-sm mb-1">Account Status</div>
            <div className="text-lg font-bold text-green-400">Active</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6 border border-purple-500 border-opacity-30">
              <h2 className="text-xl font-bold text-white mb-4">Create Profile</h2>
              <GameProfileForm onCreated={() => setRefreshCount((value) => value + 1)} />
            </div>
          </div>

          {/* Profiles Section */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-6 border border-purple-500 border-opacity-30">
              <h2 className="text-xl font-bold text-white mb-4">Your Game Profiles</h2>
              {profiles.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-3">You haven't created any profiles yet.</p>
                  <p className="text-sm text-gray-500">Create your first profile on the left to get started!</p>
                </div>
              ) : (
                <GameProfileList profiles={profiles} onDeleted={() => setRefreshCount((value) => value + 1)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
