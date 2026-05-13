'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/profiles?search=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.profiles || [])
    } catch (err) {
      console.error('Error searching:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🔍 Search</h1>
        <p className="text-slate-400 mb-8">Find players, clans, and tournaments</p>

        <form onSubmit={handleSearch} className="mb-8 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, username, or game..."
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition"
          >
            Search
          </button>
        </form>

        {!searched ? (
          <div className="text-center py-12 text-slate-400">
            <div className="text-5xl mb-3">🔍</div>
            <p>Enter a search query to find players and more</p>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">❌</div>
            <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
            <p className="text-slate-400">Try a different search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(player => (
              <Link key={player.id} href={`/profile/${player.id}`}>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-indigo-500 transition">
                  <h3 className="font-bold text-white text-lg">{player.in_game_name}</h3>
                  <p className="text-sm text-slate-400">@{player.users?.username}</p>
                  <p className="text-sm text-slate-300 mt-2">{player.game}</p>
                  <button className="w-full mt-3 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded transition">
                    View Profile
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
