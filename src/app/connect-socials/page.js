'use client'

import React, { useState } from 'react'

export default function SocialMediaPage() {
  const [socials, setSocials] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📱 Connect Social Media</h1>
        <p className="text-slate-400 mb-8">Link your gaming and social profiles</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Twitter', 'Instagram', 'TikTok', 'YouTube', 'Discord', 'Twitch'].map((platform, idx) => (
            <button key={idx} className="bg-slate-800 border border-slate-700 hover:border-indigo-500 rounded-lg p-6 text-center transition">
              <div className="text-3xl mb-3">{['🐦', '📷', '🎵', '📺', '💬', '🎮'][idx]}</div>
              <h3 className="text-white font-bold">{platform}</h3>
              <p className="text-slate-400 text-sm mt-1">Connect</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
