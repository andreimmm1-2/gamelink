'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function TradingPage() {
  const [listings, setListings] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">💱 Trading</h1>
        <p className="text-slate-400 mb-8">Trade items with other players</p>

        <button className="mb-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Create Trade Offer</button>

        {listings.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">💱</div>
            <h2 className="text-2xl font-bold text-white mb-2">No active trades</h2>
            <p className="text-slate-400">Create a trade to get started</p>
          </div>
        ) : (
          <div className="grid gap-4">Trade listings</div>
        )}
      </div>
    </main>
  )
}
