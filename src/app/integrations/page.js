'use client'

import React, { useState } from 'react'

export default function IntegrationSettingsPage() {
  const [integrations, setIntegrations] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🔌 Integrations</h1>
        <p className="text-slate-400 mb-8">Connect third-party apps and services</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Discord', 'Twitch', 'YouTube', 'Spotify', 'Steam', 'Xbox'].map((service, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex justify-between items-center">
              <h3 className="text-white font-bold">{service}</h3>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Connect</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
