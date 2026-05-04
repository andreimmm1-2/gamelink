"use client"
import React, { useState } from 'react'

const GAMES = ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs', 'Other']

export default function GameProfileForm({ onCreated }) {
  const [game, setGame] = useState(GAMES[0])
  const [inGameName, setInGameName] = useState('')
  const [description, setDescription] = useState('')
  const [availability, setAvailability] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game, inGameName, description, availability }),
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to create profile')
      
      setSuccess('Profile created successfully!')
      setInGameName('')
      setDescription('')
      setAvailability('')
      
      setTimeout(() => setSuccess(null), 3000)
      if (onCreated) onCreated(data.profile)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 text-red-400 rounded text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-500 bg-opacity-10 border border-green-500 text-green-400 rounded text-sm">
          {success}
        </div>
      )}
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">Game</label>
        <select
          value={game}
          onChange={(e) => setGame(e.target.value)}
          className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-purple-500 border-opacity-30 focus:outline-none focus:border-purple-500"
        >
          {GAMES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">In-Game Name *</label>
        <input
          type="text"
          required
          value={inGameName}
          onChange={(e) => setInGameName(e.target.value)}
          placeholder="Your username in the game"
          className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-purple-500 border-opacity-30 focus:outline-none focus:border-purple-500"
        />
      </div>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell others about your playstyle..."
          rows="3"
          className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-purple-500 border-opacity-30 focus:outline-none focus:border-purple-500 resize-none"
        />
      </div>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">Availability</label>
        <input
          type="text"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          placeholder="e.g., Evenings 6PM-10PM EST"
          className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-purple-500 border-opacity-30 focus:outline-none focus:border-purple-500"
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating...' : 'Create Profile'}
      </button>
    </form>
  )
}
