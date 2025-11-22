import { useEffect, useState } from 'react'

function Confetti({ trigger = false }) {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    if (trigger) {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500']
      const newConfetti = []
      
      for (let i = 0; i < 100; i++) {
        newConfetti.push({
          id: i,
          left: Math.random() * 100,
          top: -10,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          delay: Math.random() * 2,
        })
      }
      
      setConfetti(newConfetti)
      
      // Clear confetti after animation
      setTimeout(() => {
        setConfetti([])
      }, 5000)
    }
  }, [trigger])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confettiFall"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Confetti

