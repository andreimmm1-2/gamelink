'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function FriendsPage() {
  const router = useRouter()
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadFriends()
  }, [])

  async function loadFriends() {
    try {
      const userRes = await fetch('/api/auth/me')
      const userData = await userRes.json()
      if (!userData.user) {
        router.push('/login')
        return
      }

      setFriends([])
    } catch (err) {
      console.error('Error loading friends:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">👥 Friends</h1>
        <p className="text-slate-400 mb-8">Manage your gaming friends and squad</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="space-y-2">
                {['All Friends', 'Online', 'Gaming', 'Offline', 'Blocked'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab.toLowerCase())}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      filter === tab.toLowerCase()
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h3 className="font-bold text-white mb-3">Friend Requests</h3>
              <Link href="/friends/requests" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold w-full block text-center">
                View Requests
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : friends.length === 0 ? (
              <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-5xl mb-3">👋</div>
                <h2 className="text-2xl font-bold text-white mb-2">No friends yet</h2>
                <p className="text-slate-400 mb-6">Start adding friends to build your gaming squad!</p>
                <Link href="/find-players" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg inline-block">
                  Find Players to Add
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {friends.map(friend => (
                  <div key={friend.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between hover:border-slate-600 transition">
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{friend.username}</h3>
                      <p className="text-sm text-slate-400">Online</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/messages/${friend.id}`} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-bold">
                        Message
                      </Link>
                      <Link href={`/profile/${friend.id}`} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold">
                        Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
