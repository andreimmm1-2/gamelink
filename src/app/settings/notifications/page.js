'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NotificationSettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState({
    friendRequests: true,
    messages: true,
    achievements: true,
    tournamentUpdates: true,
    communityNews: true,
    email: true,
    push: false
  })

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      if (!data.user) {
        router.push('/login')
        return
      }
      setUser(data.user)
    } catch (err) {
      console.error('Error loading user:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const res = await fetch('/api/settings/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      if (res.ok) {
        alert('Settings saved!')
      }
    } catch (err) {
      console.error('Error saving settings:', err)
    }
  }

  if (loading) {
    return <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
    </main>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/settings" className="text-indigo-400 hover:text-indigo-300 text-sm mb-6 inline-block">← Back</Link>
        <h1 className="text-5xl font-black text-white mb-2">🔔 Notification Settings</h1>
        <p className="text-slate-400 mb-8">Choose how you want to be notified</p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <label key={key} className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700 transition">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSettings({...settings, [key]: e.target.checked})}
                className="w-5 h-5"
              />
              <span className="text-white font-bold capitalize flex-1">{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}

          <button
            onClick={handleSave}
            className="w-full mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition"
          >
            Save Settings
          </button>
        </div>
      </div>
    </main>
  )
}
