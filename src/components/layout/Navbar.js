"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const has = document.documentElement.classList.contains('dark')
    setDark(has)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    if (next) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  return (
    <nav className="w-full border-b border-gray-800 bg-gradient-to-b from-gray-900 to-gray-900">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-xl font-bold">GameLink</Link>
          <Link href="/games/Roblox" className="text-sm text-gray-400 hover:text-gray-200">Roblox</Link>
          <Link href="/games/Minecraft" className="text-sm text-gray-400 hover:text-gray-200">Minecraft</Link>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white">Dashboard</Link>
          <button onClick={toggle} className="px-3 py-1 bg-gray-800 rounded">
            {dark ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </nav>
  )
}
