"use client"
import React, { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

const GAMES = ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs', 'Other']

export default function GameProfileForm({ onCreated }) {
  const [game, setGame] = useState(GAMES[0])
  const [inGameName, setInGameName] = useState('')
  const [description, setDescription] = useState('')
  const [availability, setAvailability] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game, inGameName, description, availability }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setInGameName('')
      setDescription('')
      setAvailability('')
      if (onCreated) onCreated(data.profile)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-800 rounded-lg">
      {error && <div className="text-red-400">{error}</div>}
      <div>
        <label className="block text-sm">Game</label>
        <select value={game} onChange={(e) => setGame(e.target.value)} className="mt-1 w-full p-2 rounded bg-gray-900">
          {GAMES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm">In-game name</label>
        <Input required value={inGameName} onChange={(e) => setInGameName(e.target.value)} className="mt-1 w-full" />
      </div>
      <div>
        <label className="block text-sm">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full p-2 rounded bg-gray-900" />
      </div>
      <div>
        <label className="block text-sm">Availability</label>
        <Input value={availability} onChange={(e) => setAvailability(e.target.value)} className="mt-1 w-full" />
      </div>
      <div>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Profile'}</Button>
      </div>
    </form>
  )
}
