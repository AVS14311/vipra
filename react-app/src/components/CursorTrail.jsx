import { useState, useEffect } from 'react'

export default function CursorTrail() {
  const [trails, setTrails] = useState([])

  useEffect(() => {
    let idCounter = 0
    let lastTime = 0

    const handleMouseMove = (e) => {
      const now = Date.now()
      // Throttle trail creation
      if (now - lastTime < 30) return
      lastTime = now

      const { clientX, clientY } = e
      
      const newTrail = {
        id: idCounter++,
        x: clientX,
        y: clientY,
        createdAt: now
      }

      setTrails((prev) => {
        // Keep max 20 trails
        const updated = [...prev, newTrail]
        if (updated.length > 20) return updated.slice(updated.length - 20)
        return updated
      })

      // Clean up old trails
      setTimeout(() => {
        setTrails((current) => current.filter(t => t.id !== newTrail.id))
      }, 500)
    }

    // Add listener only on desktop/mouse devices
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {trails.map(t => (
        <div
          key={t.id}
          className="absolute w-4 h-4 bg-white/40 rounded-full blur-[2px] shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none animate-ping"
          style={{
            left: t.x - 8,
            top: t.y - 8,
            animationDuration: '0.5s'
          }}
        />
      ))}
    </div>
  )
}
