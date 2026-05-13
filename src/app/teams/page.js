'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const MOCK_TEAMS = [
  {
    id: 1,
    name: 'Roblox Legends',
    game: 'Roblox',
    members: 5,
    leader: 'ShadowKing',
    description: 'Competitive Roblox team looking for skilled players',
    tags: ['Competitive', 'English Speaker', 'Tournament'],
    joinedRecently: true
  },
  {
    id: 2,
    name: 'Minecraft Builders',
    game: 'Minecraft',
    members: 8,
    leader: 'BlockMaster',
    description: 'Creative building and survival team',
    tags: ['Creative', 'Casual', 'Friendly'],
    joinedRecently: false
  },
  {
    id: 3,
    name: 'Fortnite Esports',
    game: 'Fortnite',
    members: 4,
    leader: 'NoScope420',
    description: 'Professional Fortnite competitive team',
    tags: ['Competitive', 'Streaming', 'Tournament'],
    joinedRecently: true
  },
  {
    id: 4,
    name: 'Among Us Detective Squad',
    game: 'AmongUs',
    members: 10,
    leader: 'ImposterFinder',
    description: 'Social deduction and fun playstyle',
    tags: ['Social', 'Casual', 'Friendly', 'Voice Chat'],
    joinedRecently: false
  },
  {
    id: 5,
    name: 'Multi-Game Crew',
    game: 'Multi',
    members: 12,
    leader: 'GamingGuru',
    description: 'Play multiple games together',
    tags: ['Multi-Game', 'Chill', 'Team Player'],
    joinedRecently: true
  },
]

const gameColors = {
  'Roblox': 'from-red-600 to-red-800',
  'Minecraft': 'from-green-600 to-green-800',
  'Fortnite': 'from-purple-600 to-purple-800',
  'AmongUs': 'from-cyan-600 to-cyan-800',
  'Multi': 'from-blue-600 to-blue-800'
}

export default function TeamsPage() {
  const [selectedGame, setSelectedGame] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTeams = MOCK_TEAMS.filter(team => {
    const matchesGame = !selectedGame || team.game === selectedGame
    const matchesSearch = !searchQuery || 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesGame && matchesSearch
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-slate-600 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Teams & Squads</h1>
          <p className="text-slate-300 text-lg">
            Find or create a team. Play together. Compete together.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">All Games</option>
            <option value="Roblox">Roblox</option>
            <option value="Minecraft">Minecraft</option>
            <option value="Fortnite">Fortnite</option>
            <option value="AmongUs">Among Us</option>
            <option value="Multi">Multi-Game</option>
          </select>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map(team => (
            <div
              key={team.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white text-lg group-hover:text-purple-400 transition">
                    {team.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Led by {team.leader}
                  </p>
                </div>
                {team.joinedRecently && (
                  <span className="px-2 py-1 bg-green-600/20 text-green-300 text-xs font-semibold rounded-full">
                    NEW
                  </span>
                )}
              </div>

              {/* Game Badge */}
              <div className="mb-3">
                <span className={`px-2 py-1 bg-gradient-to-r ${gameColors[team.game]} bg-opacity-20 text-white text-xs font-semibold rounded-full`}>
                  {team.game}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                {team.description}
              </p>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {team.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Members & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="text-sm text-slate-400">
                  👥 {team.members} members
                </div>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Team CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Want to Create Your Own Team?</h2>
          <p className="text-slate-300 mb-6">
            Gather your squad, invite friends, and compete together.
          </p>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition">
            Create New Team
          </button>
        </div>
      </div>
    </main>
  )
}
