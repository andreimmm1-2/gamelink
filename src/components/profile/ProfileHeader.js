import React from 'react'
import Card from '../ui/Card'

export default function ProfileHeader({ user }) {
  const avatar = user.profilePicture || user.profile_picture || '/images/avatars/default.png'
  return (
    <Card className="flex items-center space-x-4">
      <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover border-2 border-gray-700" />
      <div>
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-sm text-gray-300 mt-1">{user.bio || 'No bio yet'}</p>
      </div>
    </Card>
  )
}
