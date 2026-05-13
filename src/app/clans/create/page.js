'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function CreateClanPage() {
  const [formData, setFormData] = useState({
    name: '',
    game: 'Roblox',
    description: '',
    logo: '',
    region: 'Global'
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/clans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        alert('Clan created successfully!')
      }
    } catch (err) {
      console.error('Error creating clan:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/clans" className="text-indigo-400 hover:text-indigo-300 text-sm mb-6 inline-block">← Back</Link>
        <h1 className="text-5xl font-black text-white mb-2">⚔️ Create Clan</h1>
        <p className="text-slate-400 mb-8">Build your gaming clan and recruit members</p>

        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-white font-bold mb-2">Clan Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              placeholder="e.g., Elite Gamers"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-bold mb-2">Game</label>
              <select
                value={formData.game}
                onChange={(e) => setFormData({...formData, game: e.target.value})}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              >
                <option>Roblox</option>
                <option>Minecraft</option>
                <option>Fortnite</option>
                <option>AmongUs</option>
              </select>
            </div>
            <div>
              <label className="block text-white font-bold mb-2">Region</label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({...formData, region: e.target.value})}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              >
                <option>Global</option>
                <option>North America</option>
                <option>Europe</option>
                <option>Asia</option>
                <option>South America</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white font-bold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none h-24"
              placeholder="Tell players about your clan..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Create Clan'}
          </button>
        </form>
      </div>
    </main>
  )
}
