"use client"
import React, { useState } from 'react'

const GAME_COLORS = {
  'Roblox': 'from-red-600 to-red-400',
  'Minecraft': 'from-green-600 to-green-400',
  'Fortnite': 'from-blue-600 to-cyan-400',
  'AmongUs': 'from-purple-600 to-pink-400',
  'Other': 'from-gray-600 to-gray-400'
}

export default function GameProfileList({ profiles = [], onDeleted }) {
  const [deleting, setDeleting] = useState(null)

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this profile?')) return
    
    setDeleting(id)
    try {
      const res = await fetch(`/api/profiles/${id}`, { method: 'DELETE' })
      if (res.ok) {
        if (onDeleted) onDeleted(id)
      } else {
        const data = await res.json()
        alert(data?.error || 'Could not delete this profile')
      }
    } finally {
      setDeleting(null)
    }
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-3">🎮</div>
        <p className="text-gray-400 mb-2">No profiles yet</p>
        <p className="text-gray-500 text-sm">Create your first profile to let other players find you!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {profiles.map((p) => (
        <div
          key={p.id || p._id}
          className="bg-slate-700 rounded-lg p-4 border border-slate-600 border-opacity-20 hover:border-opacity-50 transition"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Game Badge */}
              <div className="inline-block mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${GAME_COLORS[p.game] || GAME_COLORS['Other']}`}>
                  {p.game}
                </span>
              </div>
              
              {/* In-Game Name */}
              <h3 className="text-lg font-bold text-white mb-2">{p.inGameName || p.in_game_name}</h3>
              
              {/* Description */}
              {p.description && (
                <p className="text-gray-300 text-sm mb-2">{p.description}</p>
              )}
              
              {/* Availability */}
              {p.availability && (
                <div className="flex items-center text-xs text-gray-400 mt-2">
                  <span className="mr-2">⏰</span>
                  <span>{p.availability}</span>
                </div>
              )}
            </div>
            
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(p.id || p._id)}
              disabled={deleting === (p.id || p._id)}
              className="px-3 py-2 text-xs font-medium rounded bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting === (p.id || p._id) ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
