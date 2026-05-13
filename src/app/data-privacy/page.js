'use client'

import React, { useState } from 'react'

export default function DataPrivacyPage() {
  const [data, setData] = useState({})

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📋 Data & Privacy</h1>
        <p className="text-slate-400 mb-8">Manage your data and privacy preferences</p>

        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white font-bold mb-4">Data Collection</h3>
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">View Collected Data</button>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white font-bold mb-4">Data Export</h3>
            <p className="text-slate-400 text-sm mb-4">Download all your data</p>
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Request Export</button>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white font-bold mb-4 text-red-400">Delete Account</h3>
            <p className="text-slate-400 text-sm mb-4">Permanently delete your account</p>
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition">Delete Account</button>
          </div>
        </div>
      </div>
    </main>
  )
}
