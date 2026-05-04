import React from 'react'
import ProfileHeader from '../../../components/profile/ProfileHeader'

async function fetchUser(username) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/users/${encodeURIComponent(username)}`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data.user
}

export default async function ProfilePage({ params }) {
  const { username } = params
  const user = await fetchUser(username)

  if (!user) {
    return <div className="p-8">User not found</div>
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <ProfileHeader user={user} />
      <section className="mt-6">
        <h2 className="text-lg font-semibold">About</h2>
        <p className="mt-2 text-gray-300">{user.bio || 'This user has not added a bio yet.'}</p>
      </section>
    </main>
  )
}
