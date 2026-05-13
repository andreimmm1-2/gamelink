'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProfileEditPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const userRes = await fetch('/api/auth/me')
      const userData = await userRes.json()
      if (!userData.user) {
        router.push('/login')
        return
      }
      setUser(userData.user)

      const profilesRes = await fetch('/api/profiles')
      const profilesData = await profilesRes.json()
      setProfiles(profilesData.profiles || [])
    } catch (err) {
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300 text-sm mb-6 inline-block">← Back</Link>
        <h1 className="text-5xl font-black text-white mb-2">✏️ Edit Profile</h1>
        <p className="text-slate-400 mb-8">Manage your account and game profiles</p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-4">Your Profiles</h2>
            <p className="text-slate-400 mb-4">You have {profiles.length} game profile(s)</p>
            <Link href="/dashboard/my-profiles" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg inline-block transition">
              Manage Profiles
            </Link>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <h2 className="text-2xl font-black text-white mb-4">Account Settings</h2>
            <Link href="/settings/security" className="block px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white mb-2 transition">
              🔒 Security Settings
            </Link>
            <Link href="/settings/notifications" className="block px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition">
              🔔 Notification Settings
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
