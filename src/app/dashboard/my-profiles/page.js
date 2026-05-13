'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function MyProfilesPage() {
  const router = useRouter()
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    game: '',
    inGameName: '',
    description: '',
    availability: 'Weekends'
  })

  const GAMES = ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs']
  const AVAILABILITY_OPTIONS = ['Weekends', 'Weekdays', 'Evenings', 'Anytime']

  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    try {
      const res = await fetch('/api/profiles')
      const data = await res.json()
      // Filter to current user's profiles
      setProfiles(data.profiles || [])
    } catch (err) {
      console.error('Failed to fetch profiles:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formData.game || !formData.inGameName) {
      alert('Please fill in all required fields')
      return
    }

    try {
      if (editingId) {
        // Update existing profile
        const res = await fetch(`/api/profiles/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (res.ok) {
          alert('Profile updated!')
          fetchProfiles()
        }
      } else {
        // Create new profile
        const res = await fetch('/api/profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (res.ok) {
          alert('Profile created!')
          fetchProfiles()
        }
      }
      setShowModal(false)
      setEditingId(null)
      setFormData({ game: '', inGameName: '', description: '', availability: 'Weekends' })
    } catch (err) {
      console.error('Failed to save profile:', err)
      alert('Error saving profile')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this profile?')) return
    try {
      const res = await fetch(`/api/profiles/${id}`, { method: 'DELETE' })
      if (res.ok) {
        alert('Profile deleted')
        fetchProfiles()
      }
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  function openEditModal(profile) {
    setEditingId(profile.id)
    setFormData({
      game: profile.game || '',
      inGameName: profile.in_game_name || '',
      description: profile.description || '',
      availability: profile.availability || 'Weekends'
    })
    setShowModal(true)
  }

  function openCreateModal() {
    setEditingId(null)
    setFormData({ game: '', inGameName: '', description: '', availability: 'Weekends' })
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border-b border-slate-600 border-opacity-30">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">👤 My Game Profiles</h1>
          <p className="text-slate-300 text-lg">Manage your gaming profiles and presence across communities</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Create New Profile Button */}
        <button
          onClick={openCreateModal}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-lg transition transform hover:scale-105 hover:shadow-lg shadow-indigo-500/20 duration-200 animate-fadeIn"
        >
          + Create New Profile
        </button>

        {/* Profiles Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 mt-4">Loading your profiles...</p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/30 border border-slate-700 rounded-xl">
            <div className="text-5xl mb-4">🎮</div>
            <h3 className="text-xl font-bold text-white mb-2">No profiles yet</h3>
            <p className="text-slate-400 mb-6">Create your first gaming profile to connect with players</p>
            <button
              onClick={openCreateModal}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition"
            >
              Create Profile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile, idx) => (
              <div
                key={profile.id}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-indigo-500/50 rounded-xl p-6 transition duration-300 hover:shadow-lg hover:shadow-indigo-500/20 animate-fadeIn"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Game Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full text-xs font-bold text-white">
                    {profile.game}
                  </div>
                  <div className="text-2xl">🎮</div>
                </div>

                {/* In-Game Name */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition">
                  {profile.in_game_name}
                </h3>

                {/* Description */}
                {profile.description && (
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {profile.description}
                  </p>
                )}

                {/* Availability Badge */}
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xs text-slate-400">Available:</span>
                  <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs font-semibold rounded-full">
                    {profile.availability || 'Flexible'}
                  </span>
                </div>

                {/* Created Date */}
                <p className="text-xs text-slate-500 mb-4">
                  Created {new Date(profile.created_at).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => openEditModal(profile)}
                    className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold rounded transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(profile.id)}
                    className="flex-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-sm font-bold rounded transition"
                  >
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.origin + '/profile/' + profile.id
                      navigator.clipboard.writeText(url)
                      alert('Profile URL copied!')
                    }}
                    className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 text-sm font-bold rounded transition"
                  >
                    📋 Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-xl animate-slideDown">
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingId ? '✏️ Edit Profile' : '➕ Create Profile'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Game Select */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Game</label>
                <select
                  value={formData.game}
                  onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                  required
                >
                  <option value="">Select a game...</option>
                  {GAMES.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* In-Game Name */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">In-Game Name</label>
                <input
                  type="text"
                  value={formData.inGameName}
                  onChange={(e) => setFormData({ ...formData, inGameName: e.target.value })}
                  placeholder="Your gaming nickname"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell others about your playstyle..."
                  rows="3"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Availability</label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                >
                  {AVAILABILITY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
