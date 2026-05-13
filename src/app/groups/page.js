'use client'

import React, { useState } from 'react'

export default function GroupsPage() {
  const [groups, setGroups] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">👨‍👨‍👦 Groups</h1>
        <p className="text-slate-400 mb-8">Create and join gaming groups</p>

        <button className="mb-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Create Group</button>

        {groups.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">👨‍👨‍👦</div>
            <h2 className="text-2xl font-bold text-white mb-2">No groups</h2>
            <p className="text-slate-400">Create or join a group</p>
          </div>
        ) : (
          <div className="grid gap-4">Group listings</div>
        )}
      </div>
    </main>
  )
}
