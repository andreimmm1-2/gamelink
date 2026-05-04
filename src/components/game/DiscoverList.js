"use client"
import React, { useState, useMemo } from 'react'
import PlayerCard from './PlayerCard'

export default function DiscoverList({ initialProfiles = [] }) {
  const [query, setQuery] = useState('')
  const [availability, setAvailability] = useState('')

  const filtered = useMemo(() => {
    return initialProfiles.filter((p) => {
      if (availability && (!p.availability || !p.availability.toLowerCase().includes(availability.toLowerCase()))) return false
      if (query) {
        const q = query.toLowerCase()
        return (
          (p.inGameName && p.inGameName.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.userId && p.userId.username && p.userId.username.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [initialProfiles, query, availability])

  return (
    <div>
      {/* Search & Filter */}
      <div className="mb-6 space-y-3">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Search Players</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by username, in-game name, or description..."
            className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-purple-500 border-opacity-30 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Filter by Availability</label>
          <input
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="e.g., EST, Evenings, Weekends..."
            className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-purple-500 border-opacity-30 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Results */}
      <div>
        {filtered.length > 0 && (
          <p className="text-gray-400 text-sm mb-3">
            Showing <span className="text-purple-400 font-bold">{filtered.length}</span> {filtered.length === 1 ? 'player' : 'players'}
          </p>
        )}
        <div className="space-y-3">
          {filtered.map((p) => (
            <PlayerCard key={p.id || p._id} profile={p} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No players match your search</p>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
