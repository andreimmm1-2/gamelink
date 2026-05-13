'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotifications()
  }, [])

  async function loadNotifications() {
    try {
      setNotifications([])
    } catch (err) {
      console.error('Error loading notifications:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🔔 Notifications</h1>
        <p className="text-slate-400 mb-8">Stay updated on your gaming activity</p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">📭</div>
            <h2 className="text-2xl font-bold text-white mb-2">All caught up!</h2>
            <p className="text-slate-400 mb-6">You don't have any new notifications</p>
            <Link href="/activity-feed" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg inline-block">
              View Activity Feed
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-start gap-4 hover:border-slate-600 transition">
                <div className="text-2xl mt-1">{notif.icon || '🎮'}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{notif.title}</h3>
                  <p className="text-sm text-slate-400">{notif.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
