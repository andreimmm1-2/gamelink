'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function StreamsPage() {
  const [streams, setStreams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStreams()
  }, [])

  async function loadStreams() {
    try {
      const res = await fetch('/api/streams')
      const data = await res.json()
      setStreams(data.streams || [])
    } catch (err) {
      console.error('Error loading streams:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📡 Live Streams</h1>
        <p className="text-slate-400 mb-8">Watch GameLink community members stream live</p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : streams.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">📡</div>
            <h2 className="text-2xl font-bold text-white mb-2">No streams online</h2>
            <p className="text-slate-400 mb-6">Check back soon for live gaming sessions!</p>
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">
              Start Streaming
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {streams.map(stream => (
              <a key={stream.id} href={stream.url} target="_blank" rel="noopener noreferrer">
                <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-red-500 transition cursor-pointer h-full">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 p-8 text-center">
                    <div className="text-4xl mb-2">🔴</div>
                    <p className="text-white font-bold">LIVE</p>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-1">{stream.title}</h3>
                    <p className="text-sm text-slate-400">{stream.game}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
