"use client"
import React from 'react'
import Card from '../ui/Card'

export default function PromotionCard({ promo }) {
  return (
    <Card className="border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{promo.title}</h3>
          <div className="text-sm text-gray-400">{promo.game}</div>
        </div>
        <a href={promo.link} target="_blank" rel="noreferrer" className="text-indigo-400 text-sm">Join</a>
      </div>
      {promo.description && <p className="text-sm text-gray-300 mt-2">{promo.description}</p>}
      <div className="text-xs text-gray-500 mt-2">Expires: {new Date(promo.expiresAt).toLocaleDateString()}</div>
    </Card>
  )
}
