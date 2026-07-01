import { useState, useEffect } from 'react'
import { handleInteraction } from '../utils/interactions'

function BalloonGame({ onWin }) {
  const [balloons, setBalloons] = useState([])
  const [poppedCount, setPoppedCount] = useState(0)
  const totalBalloons = 10

  useEffect(() => {
    // Generate 10 balloons with random positions, colors, and animation speeds
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500']
    const initialBalloons = Array.from({ length: totalBalloons }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80, // percentage
      delay: Math.random() * 2, // seconds
      duration: 5 + Math.random() * 5, // seconds
      color: colors[Math.floor(Math.random() * colors.length)],
      isPopped: false
    }))
    setBalloons(initialBalloons)
  }, [])

  const handlePop = (id) => {
    if (typeof handleInteraction === 'function') {
      handleInteraction({ sound: 'pop', haptic: true, hapticIntensity: 'medium' })
    }

    setBalloons(prev => prev.map(b => b.id === id ? { ...b, isPopped: true } : b))
    
    setPoppedCount(prev => {
      const newCount = prev + 1
      if (newCount === totalBalloons) {
        setTimeout(() => {
          if (onWin) onWin()
        }, 500)
      }
      return newCount
    })
  }

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h3 className="text-white text-2xl font-bold mb-4 drop-shadow-lg">
        Pop all {totalBalloons} balloons to continue!
      </h3>
      <div className="text-white/80 font-medium mb-8">
        Popped: {poppedCount} / {totalBalloons}
      </div>

      <div className="relative w-full max-w-lg h-96 bg-white/5 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-sm shadow-inner">
        {balloons.map(b => (
          !b.isPopped && (
            <div
              key={b.id}
              onClick={() => handlePop(b.id)}
              className={`absolute cursor-crosshair transition-transform hover:scale-110 active:scale-90`}
              style={{
                left: `${b.left}%`,
                bottom: '-20%',
                animationName: 'floatUp',
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              {/* Balloon shape */}
              <div className={`w-12 h-16 ${b.color} rounded-t-full rounded-b-xl shadow-lg relative`}>
                <div className="absolute top-1 right-2 w-3 h-4 bg-white/30 rounded-full rotate-45"></div>
              </div>
              {/* Balloon string */}
              <div className="w-0.5 h-12 bg-white/50 mx-auto"></div>
            </div>
          )
        ))}
        
        {/* We need a CSS keyframe for floatUp if it doesn't exist, we can inline it here or assume tailwind config has it. 
            Since we can't be sure, we'll inject a style tag for it. */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes floatUp {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-500px) scale(1.1); }
          }
        `}} />
      </div>
    </div>
  )
}

export default BalloonGame
