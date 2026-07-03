import { useState } from 'react'
import { Link } from 'react-router-dom'
import Confetti from '../components/Confetti'
import BalloonGame from '../components/BalloonGame'
import FloatingHearts from '../components/FloatingHearts'
import LoveQuoteGenerator from '../components/LoveQuoteGenerator'

function BdayCuddlePage() {
  const [isGameWon, setIsGameWon] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleWin = () => {
    setIsGameWon(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 300)
  }

  return (
    <section className="min-h-[100dvh] relative overflow-x-hidden bg-gradient-to-br from-amber-300 to-orange-500 p-5 flex flex-col items-center justify-center" style={{ paddingBottom: '5rem' }}>
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
          <div className="text-center bg-white/20 backdrop-blur-md border border-white/30 p-8 md:p-12 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] w-full max-w-4xl animate-fadeUpIn">
            <h2 className="text-white/80 text-lg md:text-xl font-medium mb-2 tracking-widest uppercase">July 6</h2>
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Day 5: My Home</h1>
            <p className="text-white text-xl md:text-2xl font-medium leading-relaxed drop-shadow-md mb-6">
              I miss your warmth, your touch, and just being close to you. Every night I fall asleep wishing you were in my arms. You are my home, no matter the distance.
            </p>
            <p className="text-amber-100 font-handwriting text-xl italic mb-6">
              "The best place in the world is inside your hug."
            </p>
          </div>

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
