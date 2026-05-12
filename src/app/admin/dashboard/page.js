'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminSidebar from '../../../components/admin/AdminSidebar'
import AdminOverview from '../../../components/admin/AdminOverview'
import UserManagement from '../../../components/admin/UserManagement'
import PromotionManagement from '../../../components/admin/PromotionManagement'
import StaffManagement from '../../../components/admin/StaffManagement'
import TicketManagement from '../../../components/admin/TicketManagement'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    verifyAdminAuth()
  }, [])

  async function verifyAdminAuth() {
    try {
      const res = await fetch('/api/admin/verify')
      const data = await res.json()

      if (!res.ok) {
        router.push('/admin/login')
      } else {
        setUser(data.user)
        setLoading(false)
      }
    } catch (err) {
      router.push('/admin/login')
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Logged in as <span className="text-purple-400">{user.email}</span>
              {' '} • Role: <span className="text-purple-400 capitalize">{user.role}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'overview' && <AdminOverview user={user} />}
          {activeTab === 'users' && <UserManagement user={user} />}
          {activeTab === 'promotions' && <PromotionManagement user={user} />}
          {activeTab === 'staff' && <StaffManagement user={user} />}
          {activeTab === 'tickets' && <TicketManagement user={user} />}
        </div>
      </div>
    </div>
  )
}
