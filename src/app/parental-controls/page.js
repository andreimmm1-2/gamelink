'use client'

import React, { useState } from 'react'

export default function ParentalControlsPage() {
  const [controls, setControls] = useState({})

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">👨‍👩‍👧‍👦 Parental Controls</h1>
        <p className="text-slate-400 mb-8">Manage account access and settings</p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">Content Filter</h3>
              <p className="text-slate-400 text-sm">Restrict mature content</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Enable</button>
          </div>
          <div className="border-t border-slate-700 pt-6 flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">Time Limits</h3>
              <p className="text-slate-400 text-sm">Set daily play limits</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Configure</button>
          </div>
        </div>
      </div>
    </main>
  )
}
