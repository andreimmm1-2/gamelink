'use client'

import React, { useState } from 'react'

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">💼 Sponsors & Partners</h1>
        <p className="text-slate-400 mb-8">Connect with gaming sponsors and partners</p>

        <div className="mb-8">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Become a Sponsor</button>
        </div>

        {sponsors.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">💼</div>
            <h2 className="text-2xl font-bold text-white mb-2">No sponsors yet</h2>
            <p className="text-slate-400">Sponsor opportunities coming soon</p>
          </div>
        ) : (
          <div className="grid gap-4">Sponsor listings</div>
        )}
      </div>
    </main>
  )
}
