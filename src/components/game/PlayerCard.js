"use client"
import React from 'react'
import Link from 'next/link'

const GAME_COLORS = {
  'Roblox': 'text-red-400',
  'Minecraft': 'text-green-400',
  'Fortnite': 'text-cyan-400',
  'AmongUs': 'text-pink-400',
  'Other': 'text-gray-400'
}

export default function PlayerCard({ profile }) {
  const user = profile.userId || profile.users || profile.user_id || {}
  const gameColor = GAME_COLORS[profile.game] || GAME_COLORS['Other']
  
  return (
    <Link href={`/user/${user.username}`}>
      <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 border-opacity-20 hover:border-opacity-50 hover:bg-slate-600 transition cursor-pointer">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user.profilePicture || user.profile_picture || '/images/avatars/default.png'}
              alt={user.username}
              className="w-16 h-16 rounded-lg object-cover bg-slate-600"
              onError={(e) => e.target.src = '/images/avatars/default.png'}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-bold text-lg hover:text-slate-400">@{user.username}</h3>
              <span className={`text-xs font-bold ${gameColor}`}>{profile.game}</span>
            </div>

            <p className="text-slate-400 font-semibold mb-2">{profile.inGameName || profile.in_game_name}</p>

            {profile.description && (
              <p className="text-gray-300 text-sm mb-2 line-clamp-2">{profile.description}</p>
            )}

            {profile.availability && (
              <div className="flex items-center text-xs text-gray-400">
                <span className="mr-1">⏰</span>
                <span>{profile.availability}</span>
              </div>
            )}
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0 text-gray-400 group-hover:text-purple-400 mt-1">
            →
          </div>
        </div>
      </div>
    </Link>
  )
}
