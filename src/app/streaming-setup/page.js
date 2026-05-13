'use client'

import React, { useState } from 'react'

export default function StreamingSetupPage() {
  const [setup, setSetup] = useState({})

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📡 Streaming Setup</h1>
        <p className="text-slate-400 mb-8">Configure your streaming setup and go live</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Stream Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-bold mb-2">Stream Title</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none" placeholder="e.g., Competitive Fortnite Gameplay" />
              </div>
              <button className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition">Start Stream</button>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Guide</h2>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>✓ Configure OBS or streaming software</li>
              <li>✓ Set your stream key</li>
              <li>✓ Test your audio and video</li>
              <li>✓ Start broadcasting</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
