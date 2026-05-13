'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function MarketplaceStorePage() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('cosmetics')

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🛍️ Marketplace</h1>
        <p className="text-slate-400 mb-8">Buy and sell gaming items</p>

        <div className="mb-8 flex gap-2">
          {['cosmetics', 'skins', 'items', 'bundles'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-lg font-bold capitalize transition ${filter === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
          <div className="text-5xl mb-3">🛍️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
          <p className="text-slate-400">Marketplace launching Q3 2026</p>
        </div>
      </div>
    </main>
  )
}
