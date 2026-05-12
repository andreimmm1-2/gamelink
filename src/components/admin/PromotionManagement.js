'use client'

import React, { useEffect, useState } from 'react'
import { hasPermission } from '../../lib/admin'

export default function PromotionManagement({ user }) {
  const [promotions, setPromotions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    game: 'Roblox',
    serverName: '',
    playerCount: '',
    joinUrl: ''
  })

  useEffect(() => {
    loadPromotions()
  }, [])

  async function loadPromotions() {
    if (!hasPermission(user.role, 'managePromotions')) {
      return
    }

    try {
      const res = await fetch('/api/admin/promotions')
      const data = await res.json()
      if (res.ok) {
        setPromotions(data.promotions || [])
      }
    } catch (err) {
      console.error('Error loading promotions:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await fetch('/api/admin/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const data = await res.json()
        setPromotions([data.promotion, ...promotions])
        setFormData({
          title: '',
          description: '',
          game: 'Roblox',
          serverName: '',
          playerCount: '',
          joinUrl: ''
        })
        setShowForm(false)
      }
    } catch (err) {
      console.error('Error creating promotion:', err)
    }
  }

  async function deletePromotion(id) {
    if (!confirm('Delete this promotion?')) return

    try {
      const res = await fetch(`/api/admin/promotions/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setPromotions(promotions.filter(p => p.id !== id))
      }
    } catch (err) {
      console.error('Error deleting promotion:', err)
    }
  }

  if (!hasPermission(user.role, 'managePromotions')) {
    return <div className="text-red-400">You do not have permission to manage promotions.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Promotion Management</h2>
          <p className="text-slate-400">Manage server promotions and listings</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
        >
          {showForm ? 'Cancel' : 'New Promotion'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Server Name"
              value={formData.serverName}
              onChange={(e) => setFormData({ ...formData, serverName: e.target.value })}
              required
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none"
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = '')}
            />
            <select
              value={formData.game}
              onChange={(e) => setFormData({ ...formData, game: e.target.value })}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none"
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = '')}
            >
              <option>Roblox</option>
              <option>Minecraft</option>
              <option>Fortnite</option>
              <option>AmongUs</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none"
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = '')}
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none resize-none"
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = '')}
          />

          <input
            type="text"
            placeholder="Join URL"
            value={formData.joinUrl}
            onChange={(e) => setFormData({ ...formData, joinUrl: e.target.value })}
            required
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none"
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = '')}
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            Create Promotion
          </button>
        </form>
      )}

      {/* Promotions List */}
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : promotions.length === 0 ? (
        <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-slate-400 mb-4">No promotions yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
          >
            Create Your First Promotion
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {promotions.map(promo => (
            <div key={promo.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6 transition" onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{promo.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{promo.description?.substring(0, 100)}...</p>
                </div>
                <button
                  onClick={() => deletePromotion(promo.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>Game: {promo.game}</span>
                <span>Server: {promo.server_name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
