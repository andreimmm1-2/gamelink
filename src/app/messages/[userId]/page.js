'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ChatPage({ params }) {
  const router = useRouter()
  const [friend, setFriend] = useState(null)
  const [messages, setMessages] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  const { userId } = params

  useEffect(() => {
    loadData()
    // Poll for new messages every 2 seconds
    const interval = setInterval(loadData, 2000)
    return () => clearInterval(interval)
  }, [userId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function loadData() {
    try {
      // Get current user
      const userRes = await fetch('/api/auth/me')
      const userData = await userRes.json()
      setCurrentUser(userData.user)

      // Get messages with friend
      const msgRes = await fetch(`/api/messages/${userId}`)
      const msgData = await msgRes.json()
      if (msgData.messages) {
        setMessages(msgData.messages)
      }
      if (msgData.friend) {
        setFriend(msgData.friend)
      }
    } catch (err) {
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim() || sending) return

    setSending(true)
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId: userId,
          content: input
        })
      })

      if (res.ok) {
        const data = await res.json()
        setMessages([...messages, data.message])
        setInput('')
      }
    } catch (err) {
      console.error('Error sending message:', err)
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!friend) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">User not found</p>
          <Link href="/messages" className="text-slate-400 hover:text-slate-300">
            Back to messages
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/messages" className="text-slate-400 hover:text-white transition">
            ← Back
          </Link>
          <Link href={`/user/${friend.username}`}>
            <h2 className="text-xl font-bold text-white hover:text-slate-400">
              @{friend.username}
            </h2>
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No messages yet</p>
            <p className="text-slate-500 text-sm mt-1">Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender_id === currentUser?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender_id === currentUser?.id
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-800 text-slate-100'
                  }`}
                >
                  <p className="break-words">{msg.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="bg-slate-800 border-t border-slate-700 px-6 py-4">
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
          >
            {sending ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </main>
  )
}
