import React from 'react'
import Link from 'next/link'

export default function DocumentationPage() {
  const docs = [
    { title: 'Getting Started', path: '/documentation/getting-started' },
    { title: 'Creating a Profile', path: '/documentation/creating-profile' },
    { title: 'Finding Players', path: '/documentation/finding-players' },
    { title: 'Tournaments & Competitions', path: '/documentation/tournaments' },
    { title: 'Community Guidelines', path: '/documentation/guidelines' },
    { title: 'API Reference', path: '/documentation/api' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📚 Documentation</h1>
        <p className="text-slate-400 mb-8">Learn how to use GameLink and get the most out of the platform</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {docs.map((doc, idx) => (
            <Link key={idx} href={doc.path}>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-indigo-500 transition cursor-pointer h-full">
                <h3 className="font-bold text-white text-lg mb-2">{doc.title}</h3>
                <p className="text-indigo-400 hover:text-indigo-300">Read →</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Still have questions?</h2>
          <p className="text-slate-400 mb-6">Can't find what you're looking for?</p>
          <Link href="/help" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg inline-block transition">
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  )
}
