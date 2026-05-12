"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HeroCarousel({ game, gameInfo, promotions = [] }) {
  const slides = promotions.length > 0 ? promotions : [{ id: 'cover', title: game, image: gameInfo.image, subtitle: gameInfo.description }]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500)
    return () => clearInterval(t)
  }, [slides.length])

  const slide = slides[index]

  return (
    <div className="carousel-container relative overflow-hidden rounded-lg">
      <img src={slide.image} alt={slide.title} className="carousel-image w-full h-64 md:h-96 object-cover" />
      <div className="carousel-overlay absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="carousel-content absolute left-6 md:left-12 bottom-6 md:bottom-12 text-left">
        <div className="flex items-center gap-3 mb-3">
          <span className="trending-badge">Trending</span>
          {slide.subtitle && <span className="text-slate-300 text-sm hidden md:inline">{slide.subtitle}</span>}
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">{slide.title}</h2>
        <div className="mt-4 flex gap-3">
          <Link href="#" className="glow-btn inline-block">Join</Link>
          <Link href="#" className="btn-secondary inline-block">More</Link>
        </div>
      </div>

      <div className="carousel-dots absolute right-6 top-6 flex gap-2">
        {slides.map((s, i) => (
          <button key={s.id} aria-label={`Go to slide ${i + 1}`} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`} />
        ))}
      </div>
    </div>
  )
}
