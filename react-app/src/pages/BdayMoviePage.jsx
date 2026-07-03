import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScratchCard from '../components/ScratchCard'
import FloatingHearts from '../components/FloatingHearts'
import LoveQuoteGenerator from '../components/LoveQuoteGenerator'
import GlassCard from '../components/GlassCard'

function BdayMoviePage() {
  const [isTorn, setIsTorn] = useState(false)

  return (
    <section className="min-h-[100dvh] relative overflow-x-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 animate-liquid p-5 flex flex-col items-center justify-center">
      {isTorn && <FloatingHearts />}
      
      {/* Neon glowing ambient lights & Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-red-600/20 blur-[120px] pointer-events-none orb-1"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-red-900/30 rounded-full blur-[100px] orb-2 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-red-600/30 blur-[100px] pointer-events-none"></div>

      {!isTorn ? (
        <div className="relative z-10 flex flex-col items-center animate-fadeInUp">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-12 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] tracking-widest uppercase font-mono">Admit One</h2>
          
          {/* Movie Ticket */}
          <div 
            onClick={() => setIsTorn(true)}
            className="group cursor-pointer flex max-w-lg w-full bg-yellow-100 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,0,0,0.3)] transition-transform hover:scale-105"
          >
            {/* Left side of ticket */}
            <div className="w-3/4 p-6 border-r-4 border-dashed border-gray-400 flex flex-col justify-center relative bg-gradient-to-br from-yellow-50 to-yellow-200">
              <h3 className="text-red-700 font-black text-2xl mb-2 uppercase tracking-widest">VIP Movie Pass</h3>
              <p className="text-gray-800 font-medium mb-1">Date: July 4th</p>
              <p className="text-gray-800 font-medium">Feature: The Birthday Girl's Choice</p>
              <div className="mt-4 text-4xl">🎬 🍿</div>
              
              {/* Ticket punches on top/bottom edge */}
              <div className="absolute -top-3 left-1/2 w-6 h-6 bg-gray-800 rounded-full"></div>
              <div className="absolute -bottom-3 left-1/2 w-6 h-6 bg-gray-800 rounded-full"></div>
            </div>
            
            {/* Right side (Stub) */}
            <div className="w-1/4 bg-red-600 p-4 flex items-center justify-center relative overflow-hidden">
              <span className="transform -rotate-90 text-white font-bold tracking-widest whitespace-nowrap text-xl group-hover:animate-pulse">TEAR HERE</span>
            </div>
          </div>
          
          <p className="text-white/60 mt-8 italic text-sm">Click the ticket to tear it and enter!</p>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-10 md:mt-20">
          <GlassCard className="text-center w-full animate-fadeUpIn">
            <h2 className="text-red-400 text-lg md:text-xl font-medium mb-4 tracking-[0.3em] uppercase font-sans-premium">July 4</h2>
            <h1 className="text-white text-5xl md:text-7xl font-black mb-8 tracking-wider font-editorial">Day 3: Missing You</h1>
            <p className="text-white/90 text-xl md:text-2xl font-light leading-relaxed mb-8 font-sans-premium">
              I would give anything to share a screen and just hear you breathing next to me. Until I can hold your hand in the theater, I’ll keep you perfectly safe in my heart.
            </p>
            <p className="text-red-300 font-handwriting text-3xl italic mb-10 drop-shadow-md">
              "No matter the plot, my favorite part of the story is always you."
            </p>
            
            {/* The scratch card coupon nested inside the movie page */}
            <div className="my-10 flex justify-center scale-90 md:scale-100">
              <ScratchCard prize="A virtual movie date night together 🍿" />
            </div>
          </GlassCard>

          <div className="w-full max-w-2xl mt-20 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <LoveQuoteGenerator />
          </div>

          <div className="mt-16 animate-fadeUpIn opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Link to="/home" className="inline-block px-10 py-5 bg-red-600/20 hover:bg-red-600/40 backdrop-blur-md border border-red-500/50 rounded-full text-white font-bold text-xl transition-all hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(255,0,0,0.4)]">
              ← Exit Theater
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default BdayMoviePage
