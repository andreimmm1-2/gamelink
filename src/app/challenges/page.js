'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([])
  const [activeTab, setActiveTab] = useState('daily')

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🎯 Challenges</h1>
        <p className="text-slate-400 mb-8">Complete challenges to earn rewards</p>

        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 rounded-lg font-bold transition ${activeTab === 'daily' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Daily Challenges
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 rounded-lg font-bold transition ${activeTab === 'weekly' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Weekly Challenges
          </button>
          <button
            onClick={() => setActiveTab('seasonal')}
            className={`px-4 py-2 rounded-lg font-bold transition ${activeTab === 'seasonal' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Seasonal
          </button>
        </div>

        {challenges.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">🎯</div>
            <h2 className="text-2xl font-bold text-white mb-2">No challenges available</h2>
            <p className="text-slate-400">Check back soon for new {activeTab} challenges!</p>
          </div>
        ) : (
          <div className="space-y-4">Challenge listings</div>
        )}
      </div>
    </main>
  )
}
