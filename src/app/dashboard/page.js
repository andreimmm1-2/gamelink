import React from 'react'
import GameProfileForm from '../../../components/game/GameProfileForm'
import GameProfileList from '../../../components/game/GameProfileList'

async function fetchMe() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/auth/me`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data.user
}

async function fetchProfiles(userId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/profiles?userId=${userId}`, { cache: 'no-store' })
  if (!res.ok) return []
  const data = await res.json()
  return data.profiles || []
}

export default async function DashboardPage() {
  const user = await fetchMe()
  if (!user) {
    return <div className="p-8">Please sign in to access your dashboard.</div>
  }

  const profiles = await fetchProfiles(user.id)

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Add Game Profile</h2>
          <GameProfileForm onCreated={() => window.location.reload()} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Your Game Profiles</h2>
          <GameProfileList profiles={profiles} onDeleted={() => window.location.reload()} />
        </div>
      </section>
    </main>
  )
}
