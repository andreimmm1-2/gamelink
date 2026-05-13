'use client'

import React, { useState } from 'react'

export default function SettingsPreferencesPage() {
  const [prefs, setPrefs] = useState({})

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">⚙️ Preferences</h1>
        <p className="text-slate-400 mb-8">Customize your experience</p>

        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold">Dark Mode</h3>
                <p className="text-slate-400 text-sm">Use dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold">Language</h3>
                <p className="text-slate-400 text-sm">Select your language</p>
              </div>
              <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
