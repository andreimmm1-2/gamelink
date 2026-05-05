'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function MessagesPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('chats')

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      // Check authentication first
      const userRes = await fetch('/api/auth/me')
      const userData = await userRes.json()
      if (!userData.user) {
        router.push('/login')
        return
      }

      // Load conversations
      const msgRes = await fetch('/api/messages')
      const msgData = await msgRes.json()
      if (msgData.conversations) {
        setConversations(msgData.conversations.sort((a, b) => 
          new Date(b.lastMessage?.created_at || 0) - new Date(a.lastMessage?.created_at || 0)
        ))
      }

      // Load friend requests
      const reqRes = await fetch('/api/friends/request')
      const reqData = await reqRes.json()
      if (reqData.requests) {
        setRequests(reqData.requests)
      }
    } catch (err) {
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleRequest(requestId, action) {
    try {
      const res = await fetch(`/api/friends/request/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })

      if (res.ok) {
        setRequests(requests.filter(r => r.id !== requestId))
        loadData()
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="container py-12">
        <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm mb-6 inline-block">
          ← Back
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">Messages</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('chats')}
            className={`px-4 py-3 font-semibold transition ${
              activeTab === 'chats'
                ? 'text-slate-400 border-b-2 border-slate-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Conversations ({conversations.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-3 font-semibold transition ${
              activeTab === 'requests'
                ? 'text-slate-400 border-b-2 border-slate-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Friend Requests ({requests.length})
          </button>
        </div>

        {/* Chats Tab */}
        {activeTab === 'chats' && (
          <div className="space-y-3">
            {conversations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 mb-4">No conversations yet</p>
                <Link href="/discover" className="text-slate-400 hover:text-slate-300">
                  Find players to chat with
                </Link>
              </div>
            ) : (
              conversations.map((conv) => (
                <Link
                  key={conv.friend.id}
                  href={`/messages/${conv.friend.id}`}
                  className="block"
                >
                  <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg p-4 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold hover:text-purple-400">
                          @{conv.friend.username}
                        </h3>
                        {conv.lastMessage && (
                          <p className="text-slate-400 text-sm mt-1 line-clamp-1">
                            {conv.lastMessage.content}
                          </p>
                        )}
                      </div>
                      {conv.lastMessage && (
                        <span className="text-xs text-slate-500">
                          {new Date(conv.lastMessage.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {/* Friend Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-3">
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">No pending friend requests</p>
              </div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Link href={`/user/${req.sender.username}`}>
                      <h3 className="text-white font-semibold hover:text-purple-400">
                        @{req.sender.username}
                      </h3>
                    </Link>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRequest(req.id, 'accept')}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRequest(req.id, 'decline')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  )
}
