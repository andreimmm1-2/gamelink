'use client'

import React, { useState } from 'react'

export default function DonationPage() {
  const [amount, setAmount] = useState(10)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">❤️ Support GameLink</h1>
        <p className="text-slate-400 mb-8">Help us grow the gaming community</p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-white font-bold mb-4">Donation Amount</label>
            <div className="flex gap-2">
              {[5, 10, 25, 50, 100].map(num => (
                <button key={num} onClick={() => setAmount(num)} className={`px-4 py-2 rounded-lg font-bold transition ${amount === num ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                  ${num}
                </button>
              ))}
            </div>
          </div>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none" />
          <button className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Donate ${amount}</button>
        </div>
      </div>
    </main>
  )
}
