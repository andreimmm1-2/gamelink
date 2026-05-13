'use client'

import React, { useState } from 'react'

export default function NotificationCenterPage() {
  const [notifs, setNotifs] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🔔 Notification Center</h1>
        <p className="text-slate-400 mb-8">Manage all your notifications</p>

        <div className="mb-8 flex gap-2">
          {['All', 'Unread', 'Mentions', 'Teams'].map(filter => (
            <button key={filter} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition">
              {filter}
            </button>
          ))}
        </div>

        {notifs.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">🔔</div>
            <h2 className="text-2xl font-bold text-white mb-2">All caught up!</h2>
            <p className="text-slate-400">No new notifications</p>
          </div>
        ) : (
          <div className="space-y-2">Notifications list</div>
        )}
      </div>
    </main>
  )
}
