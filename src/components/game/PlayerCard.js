"use client"
import React from 'react'
import Link from 'next/link'
import Card from '../ui/Card'

export default function PlayerCard({ profile }) {
  const user = profile.userId || profile.users || profile.user_id || {}
  return (
    <Card>
      <div className="flex items-start">
        <img src={user.profilePicture || user.profile_picture || '/images/avatars/default.png'} alt="avatar" className="w-12 h-12 rounded-full mr-3 object-cover" />
        <div className="flex-1">
          <div className="flex justify-between items-baseline">
            <div>
              <Link href={`/user/${user.username}`} className="font-semibold hover:underline">{user.username}</Link>
              <div className="text-sm text-gray-300">{profile.inGameName || profile.in_game_name}</div>
            </div>
            <div className="text-xs text-gray-400">{profile.game}</div>
          </div>
          <p className="mt-2 text-gray-400 text-sm">{profile.description}</p>
          {profile.availability && <div className="mt-2 text-xs text-gray-500">Availability: {profile.availability}</div>}
        </div>
      </div>
    </Card>
  )
}
