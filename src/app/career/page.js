'use client'

import React, { useState } from 'react'

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🚀 Esports Career</h1>
        <p className="text-slate-400 mb-8">Build your esports career</p>

        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Career Tools</h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>Build your professional profile</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>Track your statistics</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>Connect with scouts</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>Apply for teams</li>
            </ul>
          </div>

          <button className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Start Your Career</button>
        </div>
      </div>
    </main>
  )
}
