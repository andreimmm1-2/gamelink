import React from 'react'
import { hasPermission } from '../../lib/admin'

export default function AdminSidebar({ activeTab, setActiveTab, user }) {
  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '📊'
    },
    {
      id: 'users',
      label: 'Users',
      icon: '👥',
      permission: 'viewUsers'
    },
    {
      id: 'promotions',
      label: 'Promotions',
      icon: '📢',
      permission: 'managePromotions'
    },
    {
      id: 'staff',
      label: 'Staff',
      icon: '👔',
      permission: 'manageStaff'
    },
    {
      id: 'tickets',
      label: 'Support Tickets',
      icon: '🎫',
      permission: 'viewTickets'
    }
  ]

  const visibleItems = menuItems.filter(item => {
    if (!item.permission) return true
    return hasPermission(user.role, item.permission)
  })

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 p-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
        <span className="text-xl font-bold text-white">GameLink</span>
      </div>

      <nav className="space-y-2">
        {visibleItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
              activeTab === item.id
                ? 'bg-purple-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-slate-700">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <p className="text-xs text-slate-400">Admin Role</p>
          <p className="text-sm font-semibold text-white capitalize mt-1">{user.role}</p>
        </div>
      </div>
    </div>
  )
}
