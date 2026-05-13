'use client'

import React, { useState } from 'react'

export default function InventoryPage() {
  const [items, setItems] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🎒 Inventory</h1>
        <p className="text-slate-400 mb-8">Manage your items and collectibles</p>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">🎒</div>
            <h2 className="text-2xl font-bold text-white mb-2">Empty Inventory</h2>
            <p className="text-slate-400">Collect items and badges to build your inventory</p>
          </div>
        ) : (
          <div className="grid gap-4">Item listings</div>
        )}
      </div>
    </main>
  )
}
