import { useState } from 'react'
import { Link } from 'react-router-dom'
import Confetti from '../components/Confetti'
import LoveLetter from '../components/LoveLetter'
import FloatingHearts from '../components/FloatingHearts'
import MemoryGallery from '../components/MemoryGallery'
import LoveQuoteGenerator from '../components/LoveQuoteGenerator'
import GlassCard from '../components/GlassCard'
import { handleInteraction } from '../utils/interactions'

function BdaySurprisePage() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [tapCount, setTapCount] = useState(0)
  const [shake, setShake] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleUnbox = () => {
    if (isUnlocked) return;
    
    if (typeof handleInteraction === 'function') {
      handleInteraction({ sound: 'pop', haptic: true, hapticIntensity: 'medium' })
    }

    setShake(true)
    setTimeout(() => setShake(false), 200)

    if (tapCount >= 2) {
      setIsUnlocked(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 300)
      if (typeof handleInteraction === 'function') {
        handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
      }
    } else {
      setTapCount(prev => prev + 1)
    }
  }

  return (
    <section className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 animate-liquid p-5 flex flex-col items-center justify-center">
      
      {/* Glowing Ambient Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/30 rounded-full blur-[100px] orb-1 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-[100px] orb-2 pointer-events-none"></div>
      
      <Confetti trigger={showConfetti} />
      {isUnlocked && <FloatingHearts />}

      {!isUnlocked ? (
        <div className="relative z-10 text-center flex flex-col items-center justify-center h-full min-h-[60vh]">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-10 drop-shadow-lg">Tap to open your first surprise!</h2>
          <button 
            onClick={handleUnbox}
            className={`text-8xl md:text-[10rem] transition-transform duration-100 hover:scale-110 active:scale-95 drop-shadow-[0_0_40px_rgba(255,255,255,0.6)] ${shake ? 'animate-shake' : ''}`}
            style={{ transform: `scale(${1 + tapCount * 0.1})` }}
          >
            🎁
          </button>
          <div className="mt-8 flex gap-2">
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                className={`h-3 w-12 rounded-full transition-all duration-300 ${tapCount > i ? 'bg-white shadow-[0_0_10px_white]' : 'bg-white/20'}`} 
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-10 md:mt-20">
          {/* Upgraded Premium Card */}
          <GlassCard className="text-center w-full max-w-4xl animate-fadeUpIn">
            <h2 className="text-white/80 text-lg md:text-xl font-medium mb-4 tracking-[0.3em] uppercase font-sans-premium">July 2</h2>
            <h1 className="text-white text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg font-editorial">Day 1: The Surprise</h1>
            <p className="text-white text-xl md:text-2xl font-light leading-relaxed drop-shadow-md mb-8 font-sans-premium">
              Even though there are miles between us, my heart is right there next to yours. This week is all about celebrating the most incredible person in my life.
            </p>
            <p className="text-pink-300 font-handwriting text-3xl italic">
              "Distance is just a test to see how far love can travel."
            </p>
          </GlassCard>

          <div className="w-full flex justify-center mt-12 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <LoveLetter message="I miss you more than words can say. Every second we are apart only makes me love you more." />
          </div>

          <div className="w-full mt-16 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <MemoryGallery />
          </div>

          <div className="w-full max-w-2xl mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <LoveQuoteGenerator />
          </div>

          <div className="mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '1.0s', animationFillMode: 'forwards' }}>
            <Link to="/home" className="inline-block px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white font-bold text-xl transition-all hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              ← Back to Birthday Week
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default BdaySurprisePage
