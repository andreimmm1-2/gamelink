'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function CoachingPage() {
  const [coaches, setCoaches] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🎯 Coaching & Training</h1>
        <p className="text-slate-400 mb-8">Get coached by pro players</p>

        <div className="mb-8">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Become a Coach</button>
        </div>

        {coaches.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">🎯</div>
            <h2 className="text-2xl font-bold text-white mb-2">No coaches available yet</h2>
            <p className="text-slate-400">Sign up to offer coaching services</p>
          </div>
        ) : (
          <div className="grid gap-4">Coach listings</div>
        )}
      </div>
    </main>
  )
}
