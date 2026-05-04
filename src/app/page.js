'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '../components/ui/Button'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me', { method: 'GET' })
        const data = await res.json()
        setUser(data.user || null)
      } catch (err) {
        console.error('Failed to fetch user:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to <span className="text-purple-400">GameLink</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Connect with gamers, build your profile, and discover featured servers
          </p>

          <div className="flex gap-4 justify-center">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/games/roblox">
                  <Button className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3">
                    Discover Players
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}\n          </div>\n        </div>\n\n        {/* Features Section */}\n        <div className="grid md:grid-cols-3 gap-8 mt-16">\n          <div className="bg-slate-800 rounded-lg p-6 border border-purple-500 border-opacity-30">\n            <div className="text-3xl mb-4">👤</div>\n            <h3 className="text-xl font-bold text-white mb-2">Create Profile</h3>\n            <p className="text-gray-300">Add your game profiles for Roblox, Minecraft, Fortnite and more</p>\n          </div>\n          <div className="bg-slate-800 rounded-lg p-6 border border-purple-500 border-opacity-30">\n            <div className="text-3xl mb-4\">🎮</div>\n            <h3 className="text-xl font-bold text-white mb-2\">Discover Players</h3>\n            <p className="text-gray-300\">Find other gamers playing your favorite games</p>\n          </div>\n          <div className=\"bg-slate-800 rounded-lg p-6 border border-purple-500 border-opacity-30\">\n            <div className=\"text-3xl mb-4\">⭐</div>\n            <h3 className=\"text-xl font-bold text-white mb-2\">Featured Servers</h3>\n            <p className=\"text-gray-300\">Explore promoted game servers and opportunities</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  )\n}\n