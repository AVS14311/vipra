import { useEffect, useState } from 'react'

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    // Generate an array of 20 hearts
    const initialHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      delay: Math.random() * 10, // seconds
      duration: 10 + Math.random() * 15, // seconds
      size: 1 + Math.random() * 2 // rem
    }))
    setHearts(initialHearts)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatHeart {
          0% { transform: translateY(100vh) scale(0.5) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100px) scale(1.5) rotate(360deg); opacity: 0; }
        }
      `}} />
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute text-pink-500/40 drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]"
          style={{
            left: `${h.left}%`,
            bottom: '-10%',
            fontSize: `${h.size}rem`,
            animation: `floatHeart ${h.duration}s linear ${h.delay}s infinite`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}
