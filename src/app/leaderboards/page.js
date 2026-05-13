'use client'

import React, { useState } from 'react'

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'ShadowKing', game: 'Roblox', rating: 4.9, wins: 145, level: 'Diamond' },
  { rank: 2, name: 'BlockMaster', game: 'Minecraft', rating: 4.8, wins: 132, level: 'Platinum' },
  { rank: 3, name: 'NoScope420', game: 'Fortnite', rating: 4.7, wins: 128, level: 'Platinum' },
  { rank: 4, name: 'ImposterFinder', game: 'AmongUs', rating: 4.6, wins: 115, level: 'Gold' },
  { rank: 5, name: 'GamingGuru', game: 'Multi', rating: 4.5, wins: 98, level: 'Gold' },
  { rank: 6, name: 'PixelNinja', game: 'Minecraft', rating: 4.4, wins: 87, level: 'Silver' },
  { rank: 7, name: 'TacticalPlayer', game: 'Fortnite', rating: 4.3, wins: 76, level: 'Silver' },
  { rank: 8, name: 'CreativeBuilder', game: 'Roblox', rating: 4.2, wins: 64, level: 'Bronze' },
  { rank: 9, name: 'SwiftRunner', game: 'Roblox', rating: 4.1, wins: 52, level: 'Bronze' },
  { rank: 10, name: 'EchoTeam', game: 'AmongUs', rating: 4.0, wins: 45, level: 'Iron' },
]

const GAMES = ['All Games', 'Roblox', 'Minecraft', 'Fortnite', 'AmongUs']

const levelColors = {
  'Diamond': 'from-cyan-400 to-blue-500',
  'Platinum': 'from-purple-400 to-pink-500',
  'Gold': 'from-yellow-400 to-orange-500',
  'Silver': 'from-gray-300 to-gray-400',
  'Bronze': 'from-orange-600 to-red-700',
  'Iron': 'from-gray-600 to-gray-700'
}

export default function LeaderboardsPage() {
  const [selectedGame, setSelectedGame] = useState('All Games')

  const filteredLeaderboard = selectedGame === 'All Games' 
    ? MOCK_LEADERBOARD 
    : MOCK_LEADERBOARD.filter(player => player.game === selectedGame)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-slate-600 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">🏆 Leaderboards</h1>
          <p className="text-slate-300 text-lg">
            Top players ranked by skill, wins, and community rating.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {GAMES.map(game => (
            <button
              key={game}
              onClick={() => setSelectedGame(game)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedGame === game
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {game}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-lg overflow-hidden border border-slate-700">
          <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700 grid grid-cols-12 gap-4 font-bold text-slate-300 text-sm">
            <div className="col-span-1">RANK</div>
            <div className="col-span-3">PLAYER</div>
            <div className="col-span-2">GAME</div>
            <div className="col-span-2">LEVEL</div>
            <div className="col-span-2">RATING</div>
            <div className="col-span-2">WINS</div>
          </div>

          <div className="divide-y divide-slate-700">
            {filteredLeaderboard.map((player, idx) => (
              <div
                key={player.rank}
                className="px-6 py-4 hover:bg-slate-800/30 transition grid grid-cols-12 gap-4 items-center"
              >
                {/* Rank */}
                <div className="col-span-1">
                  <div className="text-2xl font-black text-white">
                    {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : '#' + player.rank}
                  </div>
                </div>

                {/* Player Name */}
                <div className="col-span-3">
                  <a href={`/profile/${player.name}`} className="font-bold text-white hover:text-cyan-400 transition">
                    {player.name}
                  </a>
                </div>

                {/* Game */}
                <div className="col-span-2">
                  <span className="text-slate-300 text-sm">{player.game}</span>
                </div>

                {/* Level Badge */}
                <div className="col-span-2">
                  <span className={`px-2 py-1 bg-gradient-to-r ${levelColors[player.level]} bg-opacity-20 text-white text-xs font-bold rounded-full`}>
                    {player.level}
                  </span>
                </div>

                {/* Rating */}
                <div className="col-span-2">
                  <div className="text-white font-bold">⭐ {player.rating}</div>
                </div>

                {/* Wins */}
                <div className="col-span-2">
                  <div className="text-white font-bold">{player.wins}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="font-bold text-white mb-3">How Rankings Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-cyan-400 font-bold mb-2">⭐ Rating</div>
              <p className="text-slate-400 text-sm">Your skill rating based on wins and player feedback</p>
            </div>
            <div>
              <div className="text-cyan-400 font-bold mb-2">🎮 Wins</div>
              <p className="text-slate-400 text-sm">Total competitive wins across tournaments and events</p>
            </div>
            <div>
              <div className="text-cyan-400 font-bold mb-2">🏅 Level</div>
              <p className="text-slate-400 text-sm">Your rank tier from Iron to Diamond</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
