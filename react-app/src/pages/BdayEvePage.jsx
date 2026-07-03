import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Confetti from '../components/Confetti'
import FloatingHearts from '../components/FloatingHearts'
import LoveQuoteGenerator from '../components/LoveQuoteGenerator'
import { handleInteraction } from '../utils/interactions'

function BdayEvePage() {
  const [stars, setStars] = useState([])
  const [clickedCount, setClickedCount] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  
  const totalStars = 5

  useEffect(() => {
    // Generate static stars to click
    const initialStars = Array.from({ length: totalStars }).map((_, i) => ({
      id: i,
      left: 20 + Math.random() * 60, // percentage 20-80
      top: 20 + Math.random() * 50, // percentage 20-70
      isClicked: false
    }))
    setStars(initialStars)
  }, [])

  const handleStarClick = (id) => {
    if (typeof handleInteraction === 'function') {
      handleInteraction({ sound: 'pop', haptic: true, hapticIntensity: 'medium' })
    }

    setStars(prev => prev.map(s => s.id === id ? { ...s, isClicked: true } : s))
    
    setClickedCount(prev => {
      const newCount = prev + 1
      if (newCount === totalStars) {
        setTimeout(() => {
          setIsRevealed(true)
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 500)
        }, 800)
      }
      return newCount
    })
  }

  return (
    <section className="min-h-[100dvh] relative overflow-x-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 p-5 flex flex-col items-center justify-center">
      <Confetti trigger={showConfetti} />
      {isRevealed && <FloatingHearts />}

      {/* Ambient background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="absolute bg-white rounded-full animate-pulse" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`,
            opacity: Math.random() * 0.7 + 0.3
          }}></div>
        ))}
      </div>

      {!isRevealed ? (
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center h-[80vh] justify-center">
          <h2 className="text-indigo-200 text-2xl md:text-4xl font-light mb-4 drop-shadow-lg text-center font-serif italic">
            "Look at the stars, look how they shine for you..."
          </h2>
          <p className="text-white/60 mb-12 animate-pulse">Find and tap the {totalStars} brightest stars.</p>

          <div className="absolute inset-0">
            {stars.map((s, i) => (
              <div
                key={s.id}
                onClick={() => !s.isClicked && handleStarClick(s.id)}
                className={`absolute cursor-pointer transition-all duration-1000 ${
                  s.isClicked ? 'scale-150 opacity-0 rotate-180' : 'scale-100 opacity-100 hover:scale-125'
                }`}
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  filter: s.isClicked ? 'blur(10px)' : 'drop-shadow(0 0 15px rgba(255,255,255,0.8))'
                }}
              >
                <div className="text-4xl md:text-5xl text-yellow-100 animate-pulse" style={{ animationDuration: '0.8s' }}>✨</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-10 md:mt-20">
          <div className="text-center bg-indigo-950/40 backdrop-blur-md border border-indigo-500/30 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.2)] w-full animate-fadeUpIn">
            <h2 className="text-indigo-300 text-lg md:text-xl font-medium mb-2 tracking-widest uppercase">July 7</h2>
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-100">
              Day 6: Counting Stars ✨
            </h1>
            <p className="text-indigo-100 text-xl md:text-2xl font-light leading-relaxed mb-6 font-serif">
              I look up at the same stars as you, wishing on every single one that the distance between us disappears. Get ready for your special day, my love.
            </p>
            <p className="text-indigo-300 font-handwriting text-xl italic mb-6">
              "You are my sun, my moon, and all of my stars."
            </p>
          </div>

          <div className="w-full max-w-2xl mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <LoveQuoteGenerator />
          </div>

          <div className="mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Link to="/home" className="inline-block px-10 py-5 bg-indigo-900/50 hover:bg-indigo-800/80 backdrop-blur-md border border-indigo-400/50 rounded-full text-indigo-100 font-bold text-xl transition-all hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              ← Back to Birthday Week
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default BdayEvePage
