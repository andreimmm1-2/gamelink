'use client'

import React, { useState } from 'react'

export default function ActivityLogPage() {
  const [activities, setActivities] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📊 Activity Log</h1>
        <p className="text-slate-400 mb-8">View your account activity</p>

        {activities.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">📊</div>
            <h2 className="text-2xl font-bold text-white mb-2">No activity yet</h2>
            <p className="text-slate-400">Your activity will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">Activity listings</div>
        )}
      </div>
    </main>
  )
}
