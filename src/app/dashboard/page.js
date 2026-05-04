'use client'

import React, { useEffect, useState } from 'react'
import GameProfileForm from '../../components/game/GameProfileForm'
import GameProfileList from '../../components/game/GameProfileList'

export default function DashboardPage() {
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

  if (loading) {
    return <div className="p-8">Loading your dashboard...</div>
  }

  if (!user) {
    return <div className="p-8">Please sign in to access your dashboard.</div>
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Add Game Profile</h2>
          <GameProfileForm onCreated={() => setRefreshCount((value) => value + 1)} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Your Game Profiles</h2>
          <GameProfileList profiles={profiles} onDeleted={() => setRefreshCount((value) => value + 1)} />
        </div>
      </section>
    </main>
  )
}
