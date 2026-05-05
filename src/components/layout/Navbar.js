'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const GAMES = ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs']

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [gameDropdown, setGameDropdown] = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  async function handleLogout() {
    document.cookie = 'token=; Max-Age=0; path=/;'
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
      <div className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group min-w-fit">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="text-xl font-bold text-white group-hover:text-purple-400 transition">
            GameLink
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/discover" className="text-slate-300 hover:text-purple-400 transition font-medium">
            Discover
          </Link>
          
          {/* Games Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setGameDropdown(true)}
              onMouseLeave={() => setGameDropdown(false)}
              className="text-slate-300 hover:text-purple-400 transition font-medium flex items-center gap-1"
            >
              Games
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            
            {gameDropdown && (
              <div
                onMouseEnter={() => setGameDropdown(true)}
                onMouseLeave={() => setGameDropdown(false)}
                className="absolute top-full left-0 mt-0 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 min-w-48 animate-slideDown"
              >
                {GAMES.map(game => (
                  <Link
                    key={game}
                    href={`/games/${game}`}
                    className="block px-4 py-2 text-slate-300 hover:bg-purple-600 hover:text-white transition"
                  >
                    {game}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/help" className="text-slate-300 hover:text-purple-400 transition font-medium">
            Help & Support
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="hidden md:block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
          >
            Dashboard
          </Link>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenu(!userMenu)}
              className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {userMenu && (
              <div className="absolute right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 min-w-48 animate-slideDown">
                <Link href="/dashboard" className="block px-4 py-2 text-slate-300 hover:bg-purple-600 hover:text-white transition">
                  Dashboard
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-slate-300 hover:bg-purple-600 hover:text-white transition">
                  Settings
                </Link>
                <Link href="/messages" className="block px-4 py-2 text-slate-300 hover:bg-purple-600 hover:text-white transition">
                  Messages
                </Link>
                <hr className="border-slate-700 my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-700 bg-slate-800">
          <div className="container py-4 space-y-4">
            <Link href="/discover" className="block text-slate-300 hover:text-purple-400 transition">
              Discover
            </Link>
            {GAMES.map(game => (
              <Link
                key={game}
                href={`/games/${game}`}
                className="block text-slate-300 hover:text-purple-400 transition pl-4"
              >
                {game}
              </Link>
            ))}
            <Link href="/help" className="block text-slate-300 hover:text-purple-400 transition">
              Help & Support
            </Link>
            <hr className="border-slate-700" />
            <Link href="/dashboard" className="block text-slate-300 hover:text-purple-400 transition">
              Dashboard
            </Link>
            <Link href="/settings" className="block text-slate-300 hover:text-purple-400 transition">
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
