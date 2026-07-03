import { useState } from 'react'
import { Link } from 'react-router-dom'
import Confetti from '../components/Confetti'
import LoveQuoteGenerator from '../components/LoveQuoteGenerator'
import FloatingHearts from '../components/FloatingHearts'
import GlassCard from '../components/GlassCard'
import { handleInteraction } from '../utils/interactions'

function BdayMainPage() {
  const [candles, setCandles] = useState([true, true, true, true, true]) // 5 candles lit by default
  const [showConfetti, setShowConfetti] = useState(false)
  const [isCelebration, setIsCelebration] = useState(false)

  const allBlownOut = candles.every(c => !c)

  const blowOutCandle = (index) => {
    if (!candles[index]) return
    if (typeof handleInteraction === 'function') {
      handleInteraction({ sound: 'pop', haptic: true, hapticIntensity: 'medium' })
    }
    
    const newCandles = [...candles]
    newCandles[index] = false
    setCandles(newCandles)

    if (newCandles.every(c => !c)) {
      setTimeout(() => {
        setIsCelebration(true)
        setShowConfetti(true)
        if (typeof handleInteraction === 'function') {
          handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
        }
      }, 500)
    }
  }

  return (
    <section className="min-h-[100dvh] relative overflow-x-hidden bg-gradient-to-br from-fuchsia-600 via-pink-600 to-rose-600 animate-liquid p-5 flex flex-col items-center justify-center" style={{ paddingBottom: '5rem' }}>
      
      {/* Massive Glowing Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-300/30 rounded-full blur-[150px] orb-1 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-300/30 rounded-full blur-[150px] orb-2 pointer-events-none"></div>

      <Confetti trigger={showConfetti} duration={10000} />
      {isCelebration && <FloatingHearts />}

      {/* Global CSS for Flame and Float */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flicker {
          0% { transform: scale(1) rotate(-2deg); opacity: 1; }
          25% { transform: scale(1.1) rotate(2deg); opacity: 0.9; }
          50% { transform: scale(0.9) rotate(-3deg); opacity: 1; }
          75% { transform: scale(1.05) rotate(3deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-flicker {
          animation: flicker 0.1s infinite alternate;
        }
        @keyframes floatSlow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-floatSlow {
          animation: floatSlow 6s ease-in-out infinite;
        }
      `}} />

      {!isCelebration ? (
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center h-[80vh] justify-center animate-fadeInUp">
          <h2 className="text-white text-3xl md:text-5xl font-black mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] text-center tracking-wide">
            Make a Wish!
          </h2>
          <p className="text-white/90 text-xl font-medium mb-16 text-center animate-pulse">
            Tap the candles to blow them out...
          </p>

          {/* The Birthday Cake */}
          <div className="relative flex flex-col items-center mt-10 animate-floatSlow scale-110 md:scale-150">
            {/* Candles Container */}
            <div className="flex gap-4 relative z-20 mb-[-10px]">
              {candles.map((isLit, i) => (
                <div key={i} className="flex flex-col items-center cursor-pointer group" onClick={() => blowOutCandle(i)}>
                  {/* Flame */}
                  <div className={`w-3 h-6 mb-1 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] transition-all duration-300
                    ${isLit ? 'bg-gradient-to-t from-yellow-100 via-yellow-300 to-orange-500 shadow-[0_0_20px_rgba(255,200,0,1)] animate-flicker' : 'bg-transparent shadow-none h-0 opacity-0'}
                  `}></div>
                  {/* Wick */}
                  <div className="w-1 h-2 bg-gray-800"></div>
                  {/* Candle Stick */}
                  <div className="w-4 h-12 rounded-sm bg-gradient-to-r from-blue-200 via-white to-blue-200 shadow-md border border-blue-300">
                    {/* Stripes */}
                    <div className="w-full h-2 bg-red-400 mt-2 transform -rotate-12"></div>
                    <div className="w-full h-2 bg-red-400 mt-2 transform -rotate-12"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cake Top Layer */}
            <div className="w-48 h-16 bg-pink-200 rounded-[50%] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1)] relative z-10 border-4 border-pink-300 flex items-center justify-center">
               <span className="text-pink-400 font-bold tracking-widest text-sm">HAPPY BDAY</span>
            </div>
            {/* Cake Middle Layer */}
            <div className="w-48 h-20 bg-pink-200 mt-[-32px] relative z-0 border-l-4 border-r-4 border-b-4 border-pink-300 rounded-b-3xl shadow-xl overflow-hidden">
               {/* Frosting drips */}
               <div className="absolute top-0 w-full flex justify-between px-2">
                 <div className="w-6 h-8 bg-pink-100 rounded-b-full"></div>
                 <div className="w-8 h-12 bg-pink-100 rounded-b-full"></div>
                 <div className="w-5 h-6 bg-pink-100 rounded-b-full"></div>
                 <div className="w-7 h-10 bg-pink-100 rounded-b-full"></div>
                 <div className="w-6 h-7 bg-pink-100 rounded-b-full"></div>
               </div>
            </div>
            {/* Cake Plate */}
            <div className="w-56 h-6 bg-gray-200 rounded-[50%] mt-[-10px] relative z-[-1] border-b-4 border-gray-400 shadow-2xl"></div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-10 md:mt-20">
          
          {/* Main Celebration Card Upgraded */}
          <GlassCard className="text-center w-full animate-fadeUpIn">
            <h2 className="text-white/90 text-xl md:text-2xl font-medium mb-4 tracking-[0.4em] uppercase font-sans-premium">July 8</h2>
            <h1 className="text-white text-6xl md:text-8xl font-black mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] font-editorial">
              HAPPY BIRTHDAY! 🎂
            </h1>
            <p className="text-white text-2xl md:text-3xl font-light leading-relaxed drop-shadow-md mb-10 font-sans-premium">
              Happy Birthday to my whole world. The miles mean nothing when my soul is tied to yours. I am counting down the days until I can finally celebrate you in person. I love you more than words can say.
            </p>
            <p className="text-pink-100 font-handwriting text-5xl italic drop-shadow-lg">
              "Forever is a long time, but I wouldn't mind spending it by your side."
            </p>
          </GlassCard>

          {/* Love Quote Generator Section */}
          <div className="w-full max-w-2xl mt-32 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <h3 className="text-white text-3xl font-bold text-center mb-6 drop-shadow-lg">Just For You</h3>
            <LoveQuoteGenerator className="w-full" />
          </div>

          <div className="mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            <Link to="/home" className="inline-block px-12 py-6 bg-white hover:bg-pink-100 border border-white rounded-full text-pink-600 font-black text-2xl transition-all hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.6)]">
              ← Return Home
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default BdayMainPage
