import React from 'react'

export default function Card({ children, className = '' }) {
  return <div className={`p-4 bg-gray-800 rounded-lg ${className}`}>{children}</div>
}
