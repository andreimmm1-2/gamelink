"use client"
import React from 'react'
import Card from '../ui/Card'

export default function GameProfileList({ profiles = [], onDeleted }) {
  async function handleDelete(id) {
    if (!confirm('Delete this profile?')) return
    const res = await fetch(`/api/profiles/${id}`, { method: 'DELETE' })
    if (res.ok) {
      if (onDeleted) onDeleted(id)
    } else {
      const data = await res.json()
      alert(data?.error || 'Could not delete')
    }
  }

  return (
    <div className="grid gap-3">
      {profiles.length === 0 && <div className="text-gray-400">No profiles yet.</div>}
      {profiles.map((p) => (
        <Card key={p._id} className="flex justify-between items-start">
          <div>
            <div className="text-sm text-gray-300">{p.game}</div>
            <div className="font-semibold text-lg">{p.inGameName}</div>
            <div className="text-sm text-gray-400 mt-1">{p.description}</div>
            <div className="text-xs text-gray-500 mt-2">{p.availability}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">by {p.userId?.username}</div>
            <button onClick={() => handleDelete(p._id)} className="mt-2 text-xs text-red-400">Delete</button>
          </div>
        </Card>
      ))}
    </div>
  )
}
