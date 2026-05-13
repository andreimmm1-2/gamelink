'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([])
  const [selectedGame, setSelectedGame] = useState('')

  const GAMES = ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs', 'Multi']

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🏆 Tournaments</h1>
        <p className="text-slate-400 mb-8">Compete in tournaments and earn rewards</p>

        <div className="mb-8 flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedGame('')}
            className={`px-4 py-2 rounded-lg font-bold transition ${!selectedGame ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            All Tournaments
          </button>
          {GAMES.map(game => (
            <button
              key={game}
              onClick={() => setSelectedGame(game)}
              className={`px-4 py-2 rounded-lg font-bold transition ${selectedGame === game ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {game}
            </button>
          ))}
        </div>

        {tournaments.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">🏆</div>
            <h2 className="text-2xl font-bold text-white mb-2">No tournaments yet</h2>
            <p className="text-slate-400 mb-6">Check back soon for exciting competitions!</p>
            <Link href="/tournaments/create" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg inline-block">
              Create Tournament
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">Tournament listings</div>
        )}
      </div>
    </main>
  )
}
