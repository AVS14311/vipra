import { Link } from 'react-router-dom'
import Confetti from './Confetti'
import { useState, useEffect } from 'react'
import LoveQuoteGenerator from './LoveQuoteGenerator'
import LoveLetter from './LoveLetter'
import ScratchCard from './ScratchCard'
import BalloonGame from './BalloonGame'
import { handleInteraction } from '../utils/interactions'

function BirthdayDay({ title, date, emoji, message, gradient }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [tapCount, setTapCount] = useState(0)
  const [shake, setShake] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)

  const placeholderImages = [
    'media/New/vvv.jpg',
    'media/New/0aa4ecb0-5a29-4755-9ba5-c32c39108012.jpg',
    'media/New/0f38b017-1e23-4858-8073-88de35b36aab.jpg',
    'media/New/11.jpg',
    'media/New/22.jpg',
    'media/New/2ae2f211-0626-47d0-92f2-6433b699901f.jpg',
    'media/New/377e1eeb-d08f-446f-a0c2-9a9620411ea6.jpg',
    'media/New/7a22c499-ebb0-440a-b254-3129d2fa0bb4.jpg',
    'media/New/bf22499d-790c-45ac-909a-2692e2b84dab.jpg',
    'media/New/e18080d2-5ce3-4923-ab61-bbe90c491621.jpg'
  ]

  const romanticPrizes = [
    "A 3-hour late-night video call marathon! 💻",
    "I'll order your favorite takeout to your door tonight 🍕",
    "A virtual movie date night together 🍿",
    "One unconditional 'Yes' to whatever you want today! 😉",
    "A surprise care package coming your way soon 📦",
    "An extra long, sleepy morning phone call 📱",
    "A custom playlist made specifically for you 🎵",
    "I promise to stay up late just to talk to you ❤️"
  ]
  const [dailyPrize] = useState(() => romanticPrizes[Math.floor(Math.random() * romanticPrizes.length)])

  const handleUnbox = () => {
    if (isUnlocked) return;
    
    // Attempt haptic feedback
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

  // Bokeh Background Orbs
  const bokehSpots = [
    { x: '10%', y: '20%', size: 150, delay: 0 },
    { x: '80%', y: '15%', size: 200, delay: 1 },
    { x: '60%', y: '75%', size: 180, delay: 2 },
    { x: '20%', y: '80%', size: 120, delay: 0.5 },
    { x: '50%', y: '40%', size: 250, delay: 1.5 },
  ]

  return (
    <section className={`min-h-[100dvh] relative overflow-x-hidden overflow-y-auto bg-gradient-to-br ${gradient} p-5 flex flex-col items-center justify-center`} style={{ paddingBottom: '5rem' }}>
      <Confetti trigger={showConfetti} />
      
      {/* Background Animations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {bokehSpots.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-bokehPulse bg-white/20 blur-xl"
            style={{
              left: b.x,
              top: b.y,
              width: b.size,
              height: b.size,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              bottom: '-10%',
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {!isUnlocked ? (
        // Unboxing View
        <div className="relative z-10 text-center animate-fadeInUp flex flex-col items-center justify-center h-full min-h-[60vh]">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-10 drop-shadow-lg">Tap to open your gift!</h2>
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
        // Unlocked View
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-10 md:mt-20">
          
          {/* Main Message Card */}
          <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full animate-fadeUpIn opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="text-6xl md:text-8xl mb-6 animate-bounce">{emoji}</div>
            <h2 className="text-white/80 text-lg md:text-xl font-medium mb-2 tracking-widest uppercase">{date}</h2>
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">{title}</h1>
            <p className="text-white text-xl md:text-2xl font-medium leading-relaxed drop-shadow-md mb-8">
              {message}
            </p>
          </div>

          {/* Interactive Envelope */}
          <div className="w-full mt-12 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <LoveLetter message={`Happy ${title}! Enjoy every moment today.`} />
          </div>

          {/* Scratch Card Coupon */}
          <div className="w-full mt-4 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <ScratchCard prize={dailyPrize} />
          </div>

          {/* Balloon Game Gatekeeper */}
          {!isGameWon ? (
            <div className="w-full mt-12 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <BalloonGame onWin={() => {
                setIsGameWon(true)
                setShowConfetti(true)
                setTimeout(() => setShowConfetti(false), 300)
              }} />
            </div>
          ) : (
            <>
              {/* Polaroid Photo Gallery */}
              <div className="w-full mt-16 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                <h3 className="text-white text-3xl font-bold text-center mb-8 drop-shadow-lg">Memories</h3>
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 perspective-1000">
                  {placeholderImages.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/20 p-2 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform duration-300 hover:scale-110 hover:rotate-0 hover:z-20 cursor-pointer backdrop-blur-md border border-white/30"
                      style={{ 
                        transform: `rotate(${Math.random() * 10 - 5}deg)`,
                        width: '280px',
                        height: '280px'
                      }}
                    >
                      <img 
                        src={`/${img}`} 
                        alt="Memory" 
                        className="w-full h-full object-contain rounded-lg bg-black/40" 
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Love Quote Generator Section */}
              <div className="w-full max-w-2xl mt-24 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                <h3 className="text-white text-3xl font-bold text-center mb-6 drop-shadow-lg">A Little Something Extra...</h3>
                <LoveQuoteGenerator className="w-full" />
              </div>
            </>
          )}

          {/* Back Button */}
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

export default BirthdayDay
