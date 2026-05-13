'use client'

import React, { useState } from 'react'

export default function HistoryPage() {
  const [history, setHistory] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">⏰ Browse History</h1>
        <p className="text-slate-400 mb-8">View your recent browsing history</p>

        <button className="mb-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition">Clear History</button>

        {history.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">⏰</div>
            <h2 className="text-2xl font-bold text-white mb-2">Empty History</h2>
            <p className="text-slate-400">Your browsing history appears here</p>
          </div>
        ) : (
          <div className="space-y-3">History listings</div>
        )}
      </div>
    </main>
  )
}
