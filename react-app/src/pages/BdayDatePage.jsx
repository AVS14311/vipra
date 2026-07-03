import { useState } from 'react'
import { Link } from 'react-router-dom'
import FloatingHearts from '../components/FloatingHearts'
import LoveQuoteGenerator from '../components/LoveQuoteGenerator'
import { handleInteraction } from '../utils/interactions'

function BdayDatePage() {
  const [candles, setCandles] = useState([false, false, false])
  
  const allLit = candles.every(c => c)

  const lightCandle = (index) => {
    if (candles[index]) return
    if (typeof handleInteraction === 'function') {
      handleInteraction({ sound: 'pop', haptic: true, hapticIntensity: 'light' })
    }
    const newCandles = [...candles]
    newCandles[index] = true
    setCandles(newCandles)
    
    if (newCandles.every(c => c)) {
      if (typeof handleInteraction === 'function') {
        handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
      }
    }
  }

  return (
    <section className={`min-h-[100dvh] relative overflow-x-hidden transition-colors duration-1000 flex flex-col items-center justify-center p-5
      ${allLit ? 'bg-gradient-to-br from-rose-900 to-red-950' : 'bg-gray-950'}
    `}>
      {allLit && <FloatingHearts />}
      
      {!allLit && (
        <h2 className="absolute top-20 text-white/50 text-2xl font-light text-center animate-pulse">
          It's a bit dark in here... Light the candles.
        </h2>
      )}

      {/* Candles Container */}
      <div className={`relative z-20 flex gap-8 md:gap-16 transition-all duration-1000 ${allLit ? 'scale-75 -translate-y-20 opacity-80' : 'scale-100'}`}>
        {candles.map((isLit, i) => (
          <div key={i} className="flex flex-col items-center cursor-pointer group" onClick={() => lightCandle(i)}>
            {/* The Flame */}
            <div className={`w-6 h-10 mb-1 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] transition-all duration-700
              ${isLit ? 'bg-gradient-to-t from-yellow-100 via-yellow-400 to-orange-500 shadow-[0_0_40px_rgba(255,200,0,1)] animate-flicker' : 'bg-white/5 shadow-none h-4 mt-6'}
            `}></div>
            {/* The Wick */}
            <div className="w-1 h-3 bg-gray-800"></div>
            {/* The Candle Body */}
            <div className={`w-12 h-32 md:h-40 rounded-t-sm rounded-b-md border-b-4 border-r-2 
              ${isLit ? 'bg-rose-100 border-rose-300 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1)]' : 'bg-gray-800 border-gray-900 shadow-none'}
            `}></div>
          </div>
        ))}
      </div>

      {/* Global Flame CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flicker {
          0% { transform: scale(1) rotate(-1deg); opacity: 1; }
          25% { transform: scale(1.05) rotate(1deg); opacity: 0.9; }
          50% { transform: scale(0.95) rotate(-2deg); opacity: 1; }
          75% { transform: scale(1.02) rotate(2deg); opacity: 0.95; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-flicker {
          animation: flicker 0.15s infinite alternate;
        }
      `}} />

      {/* The Message that appears when all lit */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center p-5 pt-32 transition-opacity duration-1000
        ${allLit ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="text-center bg-black/30 backdrop-blur-md border border-rose-500/30 p-8 md:p-12 rounded-3xl shadow-[0_0_60px_rgba(255,50,50,0.2)] w-full max-w-4xl">
          <h2 className="text-rose-300 text-lg md:text-xl font-medium mb-2 tracking-widest uppercase font-handwriting">July 5</h2>
          <h1 className="text-rose-100 text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Day 4: My Only One</h1>
          <p className="text-rose-100/90 text-xl md:text-2xl font-medium leading-relaxed mb-6">
            If I could, I'd take you to the most beautiful place in the world tonight. Until then, I built this little candle-lit sanctuary just for us. I am so deeply in love with you.
          </p>
          <p className="text-rose-200 font-handwriting text-xl italic mb-6">
            "I look at you and see the rest of my life in front of my eyes."
          </p>
          <div className="text-6xl mt-4 animate-pulse">❤️</div>
        </div>

        <div className="w-full max-w-2xl mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <LoveQuoteGenerator />
        </div>

        <div className="mt-16 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <Link to="/home" className="inline-block px-10 py-5 bg-rose-900/40 hover:bg-rose-900/80 backdrop-blur-md border border-rose-500/50 rounded-full text-rose-100 font-bold text-xl transition-all hover:scale-110 active:scale-95 shadow-lg">
            ← Back to Birthday Week
          </Link>
        </div>
      </div>

    </section>
  )
}

export default BdayDatePage
