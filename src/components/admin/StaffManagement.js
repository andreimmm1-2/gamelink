'use client'

import React, { useEffect, useState } from 'react'
import { hasPermission } from '../../lib/admin'

export default function StaffManagement({ user }) {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStaff()
  }, [])

  async function loadStaff() {
    if (!hasPermission(user.role, 'manageStaff')) {
      return
    }

    try {
      const res = await fetch('/api/admin/staff')
      const data = await res.json()
      if (res.ok) {
        setStaff(data.staff || [])
      }
    } catch (err) {
      console.error('Error loading staff:', err)
    } finally {
      setLoading(false)
    }
  }

  async function updateStaffRole(staffId, newRole) {
    try {
      const res = await fetch(`/api/admin/staff/${staffId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      })

      if (res.ok) {
        setStaff(staff.map(s =>
          s.id === staffId ? { ...s, role: newRole } : s
        ))
      }
    } catch (err) {
      console.error('Error updating staff:', err)
    }
  }

  async function removeStaff(staffId) {
    if (!confirm('Remove this staff member?')) return

    try {
      const res = await fetch(`/api/admin/staff/${staffId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setStaff(staff.filter(s => s.id !== staffId))
      }
    } catch (err) {
      console.error('Error removing staff:', err)
    }
  }

  if (!hasPermission(user.role, 'manageStaff')) {
    return <div className="text-red-400">You do not have permission to manage staff.</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Staff Management</h2>
        <p className="text-slate-400">Manage team members and their roles</p>
      </div>

      {/* Staff List */}
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : staff.length === 0 ? (
        <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-slate-400">No staff members assigned</p>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700 border-b border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Username</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(member => (
                <tr key={member.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="px-6 py-4 text-white font-medium">@{member.username}</td>
                  <td className="px-6 py-4 text-slate-400">{member.email}</td>
                  <td className="px-6 py-4">
                    {user.role === 'owner' ? (
                      <select
                        value={member.role}
                        onChange={(e) => updateStaffRole(member.id, e.target.value)}
                        className="bg-slate-700 text-white px-3 py-1 rounded text-sm border border-slate-600 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="staff">Staff</option>
                        <option value="staff-manager">Staff Manager</option>
                        <option value="co-owner">Co-owner</option>
                      </select>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600/20 text-purple-400 capitalize">
                        {member.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeStaff(member.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
