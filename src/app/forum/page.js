'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ForumPage() {
  const [topics, setTopics] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [loading, setLoading] = useState(true)

  const CATEGORIES = ['general', 'roblox', 'minecraft', 'fortnite', 'amongus', 'events', 'trading']

  useEffect(() => {
    loadTopics()
  }, [])

  async function loadTopics() {
    try {
      const res = await fetch('/api/forum/topics')
      const data = await res.json()
      setTopics(data.topics || [])
    } catch (err) {
      console.error('Error loading forum:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">💬 Forum</h1>
        <p className="text-slate-400 mb-8">Discuss gaming with the community</p>

        <div className="mb-8 flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-bold capitalize transition ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button className="mb-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">
          Create Topic
        </button>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">💬</div>
            <h2 className="text-2xl font-bold text-white mb-2">No topics yet</h2>
            <p className="text-slate-400">Be the first to start a discussion!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {topics.map(topic => (
              <Link key={topic.id} href={`/forum/${topic.id}`}>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-indigo-500 transition flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-lg">{topic.title}</h3>
                    <p className="text-sm text-slate-400">{topic.replies || 0} replies</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">{topic.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
