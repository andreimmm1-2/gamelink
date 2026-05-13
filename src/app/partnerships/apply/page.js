'use client'

import React, { useState } from 'react'

export default function PartnershipApplicationPage() {
  const [formData, setFormData] = useState({ company: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) alert('Application submitted!')
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🤝 Partnership Application</h1>
        <p className="text-slate-400 mb-8">Apply to partner with GameLink</p>

        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-white font-bold mb-2">Company Name</label>
            <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-white font-bold mb-2">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-white font-bold mb-2">Message</label>
            <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none h-24" required />
          </div>
          <button type="submit" className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Submit Application</button>
        </form>
      </div>
    </main>
  )
}
