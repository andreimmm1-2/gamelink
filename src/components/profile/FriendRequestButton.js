'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function FriendRequestButton({ targetUserId }) {
  const [state, setState] = useState('idle') // idle, loading, sent
  const [error, setError] = useState('')

  async function handleSendRequest() {
    setState('loading')
    setError('')

    try {
      const res = await fetch('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientId: targetUserId })
      })

      if (res.ok) {
        setState('sent')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to send friend request')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  if (state === 'sent') {
    return (
      <div className="px-6 py-2 bg-green-600/20 text-green-400 rounded-lg font-semibold border border-green-600/50">
        ✓ Friend request sent
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleSendRequest}
        disabled={state === 'loading'}
        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
      >
        {state === 'loading' ? 'Sending...' : 'Add Friend'}
      </button>
      <Link
        href={`/messages`}
        className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition border border-slate-600"
      >
        Message
      </Link>
      {error && <p className="text-red-400 text-sm self-center">{error}</p>}
    </div>
  )
}
