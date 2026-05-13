'use client'

import React, { useState } from 'react'

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">♿ Accessibility</h1>
        <p className="text-slate-400 mb-8">Settings for accessibility and inclusivity</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-3">Vision</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>✓ High contrast mode</li>
              <li>✓ Larger text</li>
              <li>✓ Screen reader support</li>
            </ul>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-3">Audio</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>✓ Captions</li>
              <li>✓ Audio descriptions</li>
              <li>✓ Visual alerts</li>
            </ul>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-3">Motor</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>✓ Controller options</li>
              <li>✓ Custom bindings</li>
              <li>✓ Voice control</li>
            </ul>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-3">Cognitive</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>✓ Simplified UI</li>
              <li>✓ Focus mode</li>
              <li>✓ Reading guides</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
