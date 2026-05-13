'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function FriendRequestsPage() {
  const router = useRouter()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRequests()
  }, [])

  async function loadRequests() {
    try {
      const userRes = await fetch('/api/auth/me')
      const userData = await userRes.json()
      if (!userData.user) {
        router.push('/login')
        return
      }

      const res = await fetch('/api/friends/request')
      const data = await res.json()
      setRequests(data.requests || [])
    } catch (err) {
      console.error('Error loading requests:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleRequest(requestId, action) {
    try {
      const res = await fetch(`/api/friends/request/${requestId}/${action}`, {
        method: 'POST'
      })
      if (res.ok) {
        setRequests(requests.filter(r => r.id !== requestId))
      }
    } catch (err) {
      console.error('Error handling request:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/friends" className="text-indigo-400 hover:text-indigo-300 text-sm mb-6 inline-block">← Back to Friends</Link>
        <h1 className="text-5xl font-black text-white mb-2">Friend Requests</h1>
        <p className="text-slate-400 mb-8">{requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">📬</div>
            <h2 className="text-2xl font-bold text-white mb-2">No pending requests</h2>
            <p className="text-slate-400">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map(req => (
              <div key={req.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex items-center justify-between hover:border-slate-600 transition">
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{req.fromUser?.username || 'Unknown User'}</h3>
                  <p className="text-sm text-slate-400">Wants to add you as a friend</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleRequest(req.id, 'accept')}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequest(req.id, 'reject')}
                    className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
