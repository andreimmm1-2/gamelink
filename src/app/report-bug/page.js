'use client'

import React, { useState } from 'react'

export default function BugReportPage() {
  const [form, setForm] = useState({ title: '', description: '', severity: 'medium' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) alert('Bug reported!')
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🐛 Report a Bug</h1>
        <p className="text-slate-400 mb-8">Help us improve GameLink</p>

        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-white font-bold mb-2">Bug Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-white font-bold mb-2">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none h-24" required />
          </div>
          <div>
            <label className="block text-white font-bold mb-2">Severity</label>
            <select value={form.severity} onChange={(e) => setForm({...form, severity: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <button type="submit" className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Report Bug</button>
        </form>
      </div>
    </main>
  )
}
