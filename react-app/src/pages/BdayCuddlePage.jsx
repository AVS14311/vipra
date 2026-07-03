import { useState } from 'react'
import { Link } from 'react-router-dom'
import Confetti from '../components/Confetti'
import BalloonGame from '../components/BalloonGame'
import FloatingHearts from '../components/FloatingHearts'
import LoveQuoteGenerator from '../components/LoveQuoteGenerator'
import GlassCard from '../components/GlassCard'

function BdayCuddlePage() {
  const [isGameWon, setIsGameWon] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleWin = () => {
    setIsGameWon(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 300)
  }

  return (
    <section className="min-h-[100dvh] relative overflow-x-hidden bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 animate-liquid p-5 flex flex-col items-center justify-center" style={{ paddingBottom: '5rem' }}>
      
      {/* Glowing Ambient Orbs */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-yellow-300/30 rounded-full blur-[120px] orb-1 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-red-400/30 rounded-full blur-[120px] orb-2 pointer-events-none"></div>

      <Confetti trigger={showConfetti} />
      {isGameWon && <FloatingHearts />}

      {!isGameWon ? (
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-10 md:mt-20">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg text-center">Day 5: Cuddle Day</h2>
          <p className="text-white/90 text-xl font-medium mb-12 text-center">
            Pop all the balloons to dive into the cuddles!
          </p>
          <BalloonGame onWin={handleWin} />
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-10 md:mt-20">
          
          {/* Main Message Card */}
          <GlassCard className="text-center w-full max-w-4xl animate-fadeUpIn">
            <h2 className="text-white/90 text-lg md:text-xl font-medium mb-4 tracking-[0.3em] uppercase font-sans-premium">July 6</h2>
            <h1 className="text-white text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg font-editorial">Day 5: My Home</h1>
            <p className="text-white text-xl md:text-2xl font-light leading-relaxed drop-shadow-md mb-8 font-sans-premium">
              I miss your warmth, your touch, and just being close to you. Every night I fall asleep wishing you were in my arms. You are my home, no matter the distance.
            </p>
            <p className="text-amber-100 font-handwriting text-3xl italic mb-4 drop-shadow-md">
              "The best place in the world is inside your hug."
            </p>
          </GlassCard>

          <div className="w-full max-w-2xl mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <LoveQuoteGenerator />
          </div>

          <div className="mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Link to="/home" className="inline-block px-10 py-5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 rounded-full text-white font-bold text-xl transition-all hover:scale-110 active:scale-95 shadow-lg">
              ← Back to Birthday Week
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default BdayCuddlePage
