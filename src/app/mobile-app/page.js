'use client'

import React, { useState } from 'react'

export default function MobileAppPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📱 Mobile App</h1>
        <p className="text-slate-400 mb-8">Download GameLink on your mobile device</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🍎</div>
            <h3 className="text-2xl font-bold text-white mb-4">iOS App</h3>
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Download on App Store</button>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-white mb-4">Android App</h3>
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Get on Play Store</button>
          </div>
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">App Features</h2>
          <ul className="space-y-2 text-slate-300">
            <li>✓ Browse and filter players</li>
            <li>✓ Real-time messaging</li>
            <li>✓ View match history</li>
            <li>✓ Receive notifications</li>
            <li>✓ Manage your profile</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
