'use client'

import React, { useState } from 'react'

export default function WellnessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">💚 Wellness</h1>
        <p className="text-slate-400 mb-8">Gaming wellness and healthy habits</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-4xl mb-3">👁️</div>
            <h3 className="text-xl font-bold text-white mb-2">Eye Health</h3>
            <p className="text-slate-400 text-sm">Take regular breaks to protect your eyes</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-4xl mb-3">🏃</div>
            <h3 className="text-xl font-bold text-white mb-2">Exercise</h3>
            <p className="text-slate-400 text-sm">Stay active between gaming sessions</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-4xl mb-3">😴</div>
            <h3 className="text-xl font-bold text-white mb-2">Sleep</h3>
            <p className="text-slate-400 text-sm">Get enough rest for optimal performance</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-4xl mb-3">💧</div>
            <h3 className="text-xl font-bold text-white mb-2">Hydration</h3>
            <p className="text-slate-400 text-sm">Stay hydrated while gaming</p>
          </div>
        </div>

        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Start Wellness Tracking</button>
      </div>
    </main>
  )
}
