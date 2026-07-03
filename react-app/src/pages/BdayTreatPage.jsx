import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Confetti from '../components/Confetti'
import FloatingHearts from '../components/FloatingHearts'
import LoveQuoteGenerator from '../components/LoveQuoteGenerator'
import GlassCard from '../components/GlassCard'
import { handleInteraction } from '../utils/interactions'

function BdayTreatPage() {
  const [treats, setTreats] = useState([])
  const [caughtCount, setCaughtCount] = useState(0)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  
  const totalTreats = 7
  const treatEmojis = ['🍩', '🧁', '🍪', '🍬', '🍫', '🍭', '🍧']

  useEffect(() => {
    // Generate falling treats
    const initialTreats = Array.from({ length: totalTreats }).map((_, i) => ({
      id: i,
      emoji: treatEmojis[i % treatEmojis.length],
      left: 10 + Math.random() * 80, // percentage
      delay: Math.random() * 3, // seconds
      duration: 3 + Math.random() * 4, // seconds
      isCaught: false
    }))
    setTreats(initialTreats)
  }, [])

  const handleCatch = (id) => {
    if (typeof handleInteraction === 'function') {
      handleInteraction({ sound: 'pop', haptic: true, hapticIntensity: 'medium' })
    }

    setTreats(prev => prev.map(t => t.id === id ? { ...t, isCaught: true } : t))
    
    setCaughtCount(prev => {
      const newCount = prev + 1
      if (newCount === totalTreats) {
        setTimeout(() => {
          setIsUnlocked(true)
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 300)
        }, 500)
      }
      return newCount
    })
  }

  return (
    <section className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-400 to-orange-400 animate-liquid p-5 flex flex-col items-center justify-center">
      
      {/* Glowing Ambient Orbs */}
      <div className="absolute top-0 right-20 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-[120px] orb-1 pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-orange-300/30 rounded-full blur-[100px] orb-2 pointer-events-none"></div>

      <Confetti trigger={showConfetti} />
      {isUnlocked && <FloatingHearts />}

      {/* Global CSS for falling animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fallDown {
          0% { transform: translateY(-100px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
      `}} />

      {!isUnlocked ? (
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center mt-10 h-[80vh]">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-center">Catch all the treats!</h2>
          <div className="text-white/90 text-xl font-medium mb-8 bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/30">
            Caught: {caughtCount} / {totalTreats}
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {treats.map(t => (
              !t.isCaught && (
                <div
                  key={t.id}
                  onClick={() => handleCatch(t.id)}
                  className="absolute cursor-pointer text-6xl md:text-7xl pointer-events-auto transition-transform hover:scale-125 active:scale-90"
                  style={{
                    left: `${t.left}%`,
                    top: '-10%',
                    animationName: 'fallDown',
                    animationDuration: `${t.duration}s`,
                    animationDelay: `${t.delay}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                  }}
                >
                  {t.emoji}
                </div>
              )
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-10 md:mt-20">
          <GlassCard className="text-center w-full animate-fadeUpIn">
            <h2 className="text-white/90 text-lg md:text-xl font-medium mb-4 tracking-[0.3em] uppercase font-sans-premium">July 3</h2>
            <h1 className="text-white text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg font-editorial">Day 2: Sweetest Love</h1>
            <p className="text-white text-xl md:text-2xl font-light leading-relaxed drop-shadow-md mb-8 font-sans-premium">
              You are the sweetest part of my life. Every day without you feels incomplete, but loving you from afar is still the greatest privilege I could ever ask for. I miss you endlessly.
            </p>
            <p className="text-pink-100 font-handwriting text-3xl italic mb-8">
              "You are my favorite thought to wake up to, and my last thought before I fall asleep."
            </p>
            <div className="text-8xl animate-bounce drop-shadow-2xl">🍩</div>
          </GlassCard>

          <div className="w-full max-w-2xl mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <LoveQuoteGenerator />
          </div>

          <div className="mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Link to="/home" className="inline-block px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white font-bold text-xl transition-all hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              ← Back to Birthday Week
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default BdayTreatPage
