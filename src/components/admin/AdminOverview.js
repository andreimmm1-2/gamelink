'use client'

import React, { useEffect, useState } from 'react'
import { hasPermission } from '../../lib/admin'

export default function AdminOverview({ user }) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPromotions: 0,
    openTickets: 0,
    staffMembers: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      if (res.ok) {
        setStats(data.stats)
      }
    } catch (err) {
      console.error('Error loading stats:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
        <p className="text-slate-400">Welcome back, <span className="text-purple-400">{user.email}</span></p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hasPermission(user.role, 'viewUsers') && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
            <p className="text-slate-500 text-xs">Active platform members</p>
          </div>
        )}

        {hasPermission(user.role, 'managePromotions') && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm">Promotions</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.totalPromotions}</p>
              </div>
              <div className="text-3xl">📢</div>
            </div>
            <p className="text-slate-500 text-xs">Server promotions listed</p>
          </div>
        )}

        {hasPermission(user.role, 'viewTickets') && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm">Open Tickets</p>
                <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.openTickets}</p>
              </div>
              <div className="text-3xl">🎫</div>
            </div>
            <p className="text-slate-500 text-xs">Awaiting resolution</p>
          </div>
        )}

        {hasPermission(user.role, 'manageStaff') && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm">Staff Members</p>
                <p className="text-3xl font-bold text-purple-400 mt-2">{stats.staffMembers}</p>
              </div>
              <div className="text-3xl">👔</div>
            </div>
            <p className="text-slate-500 text-xs">Active team members</p>
          </div>
        )}
      </div>

      {/* Quick Info */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Platform Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Your Role</p>
            <p className="text-lg font-semibold text-white capitalize mt-1">{user.role}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Email</p>
            <p className="text-lg font-semibold text-purple-400 mt-1 truncate">{user.email}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Permissions</p>
            <p className="text-lg font-semibold text-white mt-1">
              {user.role === 'owner' ? 'All' : user.role === 'co-owner' ? 'Most' : 'Limited'}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Status</p>
            <p className="text-lg font-semibold text-green-400 mt-1">Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}
