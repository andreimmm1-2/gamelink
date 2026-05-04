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
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search username, in-game name or description" className="p-2 rounded bg-gray-900 flex-1 mb-2 md:mb-0" />
        <input value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="Filter by availability" className="p-2 rounded bg-gray-900 w-full md:w-64" />
      </div>
      <div className="grid gap-3">
        {filtered.map((p) => (
          <PlayerCard key={p._id} profile={p} />
        ))}
        {filtered.length === 0 && <div className="text-gray-400">No players found.</div>}
      </div>
    </div>
  )
}
