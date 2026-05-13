'use client'

import React from 'react'
import Link from 'next/link'

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">👥 Community</h1>
        <p className="text-slate-400 mb-8">Join the GameLink community</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/forum">
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-lg p-6 hover:border-indigo-500 transition cursor-pointer h-full">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-xl font-bold text-white mb-2">Forum</h3>
              <p className="text-slate-400">Discuss games and connect with players</p>
            </div>
          </Link>

          <Link href="/events">
            <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-lg p-6 hover:border-amber-500 transition cursor-pointer h-full">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-white mb-2">Events</h3>
              <p className="text-slate-400">Participate in community events</p>
            </div>
          </Link>

          <Link href="/squad-finder">
            <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 border border-pink-500/30 rounded-lg p-6 hover:border-pink-500 transition cursor-pointer h-full">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Squad Finder</h3>
              <p className="text-slate-400">Find your perfect squad mates</p>
            </div>
          </Link>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Community Guidelines</h2>
          <p className="text-slate-400 mb-6">Keep GameLink a friendly and inclusive place for all gamers</p>
          <Link href="/legal/community-guidelines" className="text-indigo-400 hover:text-indigo-300 font-bold">
            Read Our Guidelines
          </Link>
        </div>
      </div>
    </main>
  )
}
