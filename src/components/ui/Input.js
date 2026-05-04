"use client"
import React from 'react'

export default function Input(props) {
  return <input {...props} className={`p-2 rounded bg-gray-900 border border-gray-700 ${props.className || ''}`} />
}
