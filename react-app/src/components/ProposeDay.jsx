import { useEffect, useState, useRef } from 'react'
import Confetti from './Confetti'
import { handleInteraction } from '../utils/interactions'

function ProposeDay() {
  const [hearts, setHearts] = useState([])
  const [rings, setRings] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [petals, setPetals] = useState([])
  const [heroVisible, setHeroVisible] = useState(false)
  const [letterVisible, setLetterVisible] = useState(false)
  const [reasonsVisible, setReasonsVisible] = useState(false)
  const [questionVisible, setQuestionVisible] = useState(false)
  const [saidYes, setSaidYes] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [noPos, setNoPos] = useState({ x: 72, y: 50 })
  const questionAreaRef = useRef(null)
  
  // Diamond Dig Treasure Hunt Game
  const [digGameStarted, setDigGameStarted] = useState(false)
  const [digTiles, setDigTiles] = useState([])
  const [digScore, setDigScore] = useState(0)
  const [diamondsFound, setDiamondsFound] = useState(0)
  const [movesLeft, setMovesLeft] = useState(20)
  const [digGameOver, setDigGameOver] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-35),
        { id: Date.now() + Math.random(), left: Math.random() * 100, delay: Math.random() * 2 },
      ])
    }, 550)
    const ringInterval = setInterval(() => {
      setRings((prev) => [
        ...prev.slice(-20),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 14,
          duration: 11 + Math.random() * 4,
        },
      ])
    }, 1200)
    const sparkleInterval = setInterval(() => {
      setSparkles((prev) => [
        ...prev.slice(-25),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 2,
        },
      ])
    }, 400)
    const petalInterval = setInterval(() => {
      setPetals((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 8 + Math.random() * 4,
          rotation: Math.random() * 360,
        },
      ])
    }, 600)
    return () => {
      clearInterval(interval)
      clearInterval(ringInterval)
      clearInterval(sparkleInterval)
      clearInterval(petalInterval)
    }
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setHeroVisible(true), 200)
    const t2 = setTimeout(() => setLetterVisible(true), 1000)
    const t3 = setTimeout(() => setReasonsVisible(true), 1800)
    const t4 = setTimeout(() => setQuestionVisible(true), 2600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  const moveNoAway = () => {
    const area = questionAreaRef.current
    if (!area) return
    const rect = area.getBoundingClientRect()
    const padding = 80
    const maxX = rect.width - 120
    const maxY = rect.height - 48
    const newX = padding + Math.random() * Math.max(0, maxX - padding * 2)
    const newY = padding + Math.random() * Math.max(0, maxY - padding * 2)
    setNoPos({ x: (newX / rect.width) * 100, y: (newY / rect.height) * 100 })
  }

  const handleYes = () => {
    handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
    setSaidYes(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  // Diamond Dig Treasure Hunt Functions
  const TREASURE_ITEMS = [
    { type: 'diamond', emoji: '💎', points: 100, message: 'Diamond! Our love shines bright!' },
    { type: 'ring', emoji: '💍', points: 50, message: 'Engagement Ring! Forever yours!' },
    { type: 'heart', emoji: '💖', points: 30, message: 'My heart belongs to you!' },
    { type: 'rose', emoji: '🌹', points: 20, message: 'A rose for my love!' },
    { type: 'empty', emoji: '💔', points: 0, message: 'Keep digging!' },
  ]

  const startDigGame = () => {
    // Create 25 tiles with random treasures
    const tiles = Array.from({ length: 25 }, (_, idx) => {
      const rand = Math.random()
      let treasure
      if (rand < 0.08) treasure = TREASURE_ITEMS[0] // Diamond 8%
      else if (rand < 0.20) treasure = TREASURE_ITEMS[1] // Ring 12%
      else if (rand < 0.40) treasure = TREASURE_ITEMS[2] // Heart 20%
      else if (rand < 0.65) treasure = TREASURE_ITEMS[3] // Rose 25%
      else treasure = TREASURE_ITEMS[4] // Empty 35%
      
      return {
        id: idx,
        treasure,
        revealed: false,
      }
    })
    
    setDigTiles(tiles)
    setDigGameStarted(true)
    setDigScore(0)
    setDiamondsFound(0)
    setMovesLeft(20)
    setDigGameOver(false)
    handleInteraction({ sound: 'success', haptic: true })
  }

  const digTile = (tileId) => {
    if (movesLeft <= 0) return
    
    const tile = digTiles.find(t => t.id === tileId)
    if (!tile || tile.revealed) return
    
    // Reveal tile
    setDigTiles(prev => prev.map(t => 
      t.id === tileId ? { ...t, revealed: true } : t
    ))
    
    setMovesLeft(prev => prev - 1)
    
    // Add points
    if (tile.treasure.points > 0) {
      setDigScore(prev => prev + tile.treasure.points)
      if (tile.treasure.type === 'diamond') {
        setDiamondsFound(prev => prev + 1)
        handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
      } else {
        handleInteraction({ sound: 'pop', haptic: true, hapticIntensity: 'medium' })
      }
    } else {
      handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
    }
    
    // Check if game over
    if (movesLeft <= 1) {
      setTimeout(() => {
        setDigGameOver(true)
        handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
      }, 500)
    }
  }

  const bokehSpots = [
    { x: '15%', y: '20%', size: 140, delay: 0 },
    { x: '85%', y: '30%', size: 160, delay: 0.8 },
    { x: '50%', y: '75%', size: 180, delay: 1.5 },
    { x: '8%', y: '55%', size: 100, delay: 0.3 },
    { x: '92%', y: '60%', size: 120, delay: 1.2 },
  ]

  const celebrationEmojis = ['💍', '💕', '💗', '💍', '💖', '💕', '💍', '💗', '💕', '💍', '💖', '💗', '💕', '💍', '💖', '💕', '💍', '💗', '💖', '💕']

  const reasons = [
    { emoji: '💖', text: 'Your smile lights up my world', color: 'from-pink-400 to-rose-500' },
    { emoji: '✨', text: 'You make every moment magical', color: 'from-amber-400 to-yellow-500' },
    { emoji: '🌟', text: 'You are my best friend and soulmate', color: 'from-purple-400 to-pink-500' },
    { emoji: '💫', text: 'You are my forever and always', color: 'from-blue-400 to-purple-500' },
    { emoji: '🌹', text: 'You complete me in every way', color: 'from-rose-400 to-red-500' },
    { emoji: '💝', text: 'I want to grow old with you', color: 'from-pink-500 to-rose-600' },
  ]

  return (
    <section
      id="propose-day"
      className="scroll-mt-20 min-h-[100dvh] relative overflow-x-hidden overflow-y-auto"
      style={{
        background: 'linear-gradient(165deg, #0f0612 0%, #1a0a1a 20%, #2d0f2d 45%, #1e1025 70%, #1a0a1a 100%)',
        backgroundAttachment: 'fixed',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <Confetti trigger={showConfetti} />

      {/* Animated gradient overlay */}
      <div className="gradient-overlay" style={{ background: 'linear-gradient(45deg, rgba(255,215,0,0.15), rgba(218,165,32,0.12), rgba(184,134,11,0.15), rgba(218,165,32,0.12))', backgroundSize: '400% 400%' }} />

      {/* Bokeh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {bokehSpots.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-bokehPulse"
            style={{
              left: b.x,
              top: b.y,
              width: b.size,
              height: b.size,
              background: 'radial-gradient(circle, rgba(255,215,0,0.18) 0%, rgba(218,165,32,0.06) 50%, transparent 70%)',
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl md:text-3xl animate-heartFloat"
            style={{ left: `${heart.left}%`, animationDelay: `${heart.delay}s`, animationDuration: '5s' }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Floating rings */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {rings.map((r) => (
          <div
            key={r.id}
            className="absolute text-2xl md:text-3xl animate-ringFloat"
            style={{
              left: `${r.left}%`,
              animationDelay: `${r.delay}s`,
              animationDuration: `${r.duration}s`,
            }}
          >
            💍
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute text-xl animate-sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Floating rose petals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute text-2xl md:text-3xl animate-petalFloat"
            style={{
              left: `${petal.left}%`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              transform: `rotate(${petal.rotation}deg)`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-5 md:px-6 pt-14 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
        {/* Hero: Propose Day */}
        <div
          className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div
            className="text-[5rem] min-[400px]:text-[6rem] sm:text-[8rem] md:text-[10rem] mb-4 inline-block leading-none select-none animate-roseBreath"
            style={{ filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.4)) drop-shadow(0 0 60px rgba(255,215,0,0.2))' }}
          >
            💍
          </div>
          <h1
            className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-3 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #ffd700 35%, #ffec8b 70%, #fff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Propose Day
          </h1>
          <p className="text-purple-300/80 text-base sm:text-lg md:text-xl mt-2">February 8 · The Most Important Question</p>
        </div>

        {/* Love Letter Section */}
        <div
          className={`mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${letterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div
            className="rounded-3xl border-2 border-amber-400/30 p-8 sm:p-10 md:p-14 lg:p-16"
            style={{
              background: 'linear-gradient(145deg, rgba(255,215,0,0.06) 0%, rgba(30,16,37,0.9) 50%, rgba(255,215,0,0.04) 100%)',
              boxShadow: '0 0 50px rgba(255,215,0,0.1), inset 0 0 80px rgba(255,215,0,0.03)',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl sm:text-4xl animate-heartbeat">💌</span>
              <h2 className="text-amber-100 text-xl sm:text-2xl md:text-3xl font-bold text-center">To My Forever</h2>
              <span className="text-3xl sm:text-4xl animate-heartbeat" style={{ animationDelay: '0.5s' }}>💌</span>
            </div>
            <div className="space-y-4 sm:space-y-5 text-purple-200/90 text-base sm:text-lg md:text-xl leading-relaxed font-serif">
              <p className="italic">
                From the moment our paths crossed, I knew my life would never be the same. Every sunrise is brighter, every challenge feels conquerable, and every dream seems within reach—because you're by my side.
              </p>
              <p className="italic">
                You are my laughter in difficult times, my peace in chaos, and my unwavering support when I need it most. With you, I've discovered a love I never thought possible—a love that grows deeper with each passing day.
              </p>
              <p className="italic">
                I want to spend every tomorrow with you, creating memories, overcoming obstacles, and celebrating life's beautiful moments together. You are my today and all of my tomorrows.
              </p>
            </div>
          </div>
        </div>

        {/* Why I Love You - Reasons Section */}
        <div
          className={`mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${reasonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <h2 className="text-amber-100 text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
            Why I Want To Spend Forever With You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 sm:p-8 border-2 border-amber-400/20 transition-all duration-300 hover:border-amber-400/40 hover:scale-105 animate-fadeUpIn opacity-0`}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.05) 0%, rgba(30,16,37,0.8) 100%)',
                  boxShadow: '0 0 30px rgba(255,215,0,0.08)',
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'forwards',
                }}
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 animate-heartbeat" style={{ animationDelay: `${index * 0.2}s` }}>
                  {reason.emoji}
                </div>
                <p className={`text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r ${reason.color} bg-clip-text text-transparent`}>
                  {reason.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Diamond Dig Treasure Hunt Game */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="bg-gradient-to-br from-amber-900/25 to-amber-800/20 backdrop-blur-xl rounded-3xl border-2 border-amber-400/40 p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-2xl">
            <h3 className="text-amber-100 text-2xl md:text-3xl font-bold text-center mb-2">
              💎 Diamond Dig Treasure Hunt 💎
            </h3>
            <p className="text-amber-200/90 text-center text-sm md:text-base mb-6">
              Dig through tiles to find hidden treasures! 💍 Rings, 💎 Diamonds, 💖 Hearts, 🌹 Roses<br />
              <span className="text-amber-300 font-semibold">You have 20 moves to maximize your score!</span>
            </p>

            {!digGameStarted && !digGameOver && (
              <div className="text-center py-10">
                <div className="flex justify-center gap-3 mb-6">
                  {['💎', '💍', '💖', '🌹', '💎'].map((e, i) => (
                    <span key={i} className="text-5xl md:text-6xl animate-heartbeat" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
                  ))}
                </div>
                <p className="text-amber-100 text-lg md:text-xl mb-3">Dig for treasures of love!</p>
                <p className="text-amber-200/80 text-sm mb-6">25 tiles • 20 moves • Find the diamonds!</p>
                <button
                  type="button"
                  onClick={startDigGame}
                  className="px-12 py-6 rounded-2xl bg-gradient-to-r from-amber-500/50 to-amber-600/50 hover:from-amber-500/60 hover:to-amber-600/60 border-3 border-amber-300/50 text-white font-bold text-xl md:text-2xl shadow-2xl hover:scale-105 active:scale-100 transition-all duration-300"
                >
                  ⛏️ Start Digging
                </button>
              </div>
            )}

            {digGameStarted && !digGameOver && (
              <div>
                {/* Game HUD */}
                <div className="grid grid-cols-3 gap-3 mb-6 max-w-md mx-auto">
                  <div className="bg-white/[0.1] backdrop-blur-sm rounded-xl p-3 border border-amber-400/30 text-center">
                    <p className="text-amber-200/80 text-xs mb-1">Score</p>
                    <p className="text-2xl md:text-3xl font-bold text-amber-300">{digScore}</p>
                  </div>
                  <div className="bg-white/[0.1] backdrop-blur-sm rounded-xl p-3 border border-amber-400/30 text-center">
                    <p className="text-amber-200/80 text-xs mb-1">Moves Left</p>
                    <p className="text-2xl md:text-3xl font-bold text-amber-300">{movesLeft}</p>
                  </div>
                  <div className="bg-white/[0.1] backdrop-blur-sm rounded-xl p-3 border border-amber-400/30 text-center">
                    <p className="text-amber-200/80 text-xs mb-1">💎 Found</p>
                    <p className="text-2xl md:text-3xl font-bold text-yellow-300">{diamondsFound}</p>
                  </div>
                </div>

                {/* Dig Grid - 5x5 */}
                <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-lg mx-auto mb-4">
                  {digTiles.map(tile => (
                    <button
                      key={tile.id}
                      type="button"
                      onClick={() => digTile(tile.id)}
                      disabled={tile.revealed || movesLeft <= 0}
                      className={`aspect-square flex items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-3xl sm:text-4xl md:text-5xl ${
                        tile.revealed
                          ? tile.treasure.type === 'diamond'
                            ? 'bg-yellow-500/30 border-yellow-400/60 shadow-[0_0_20px_rgba(255,215,0,0.6)] scale-105'
                            : tile.treasure.type === 'ring'
                            ? 'bg-amber-500/25 border-amber-400/50'
                            : tile.treasure.type === 'heart'
                            ? 'bg-pink-500/20 border-pink-400/40'
                            : tile.treasure.type === 'rose'
                            ? 'bg-rose-500/20 border-rose-400/40'
                            : 'bg-gray-700/20 border-gray-500/30'
                          : 'bg-amber-900/40 border-amber-600/50 hover:bg-amber-800/50 hover:border-amber-500/60 hover:scale-110 active:scale-95 cursor-pointer'
                      } ${!tile.revealed && movesLeft > 0 ? 'animate-pulse' : ''}`}
                      style={{
                        filter: tile.revealed && tile.treasure.type === 'diamond' ? 'drop-shadow(0 0 10px rgba(255,215,0,0.8))' : 'none',
                      }}
                    >
                      {tile.revealed ? tile.treasure.emoji : '📦'}
                    </button>
                  ))}
                </div>

                {/* Prize Guide */}
                <div className="bg-white/[0.05] rounded-xl border border-amber-400/20 p-3 sm:p-4 max-w-lg mx-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs sm:text-sm">
                    <div className="text-center">
                      <span className="block text-2xl mb-1">💎</span>
                      <span className="text-yellow-300 font-bold">100</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl mb-1">💍</span>
                      <span className="text-amber-300 font-bold">50</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl mb-1">💖</span>
                      <span className="text-pink-300 font-bold">30</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl mb-1">🌹</span>
                      <span className="text-rose-300 font-bold">20</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl mb-1">💔</span>
                      <span className="text-gray-400 font-bold">0</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {digGameOver && (
              <div className="text-center py-10 animate-fadeUpIn">
                <p className="text-8xl mb-6">
                  {diamondsFound >= 2 ? '💎' : digScore >= 300 ? '👑' : '💍'}
                </p>
                <p className="text-amber-50 text-4xl md:text-5xl font-bold mb-4">Treasure Hunt Complete!</p>
                
                <div className="max-w-md mx-auto mb-6 bg-white/[0.1] rounded-2xl border border-amber-400/40 p-6">
                  <p className="text-amber-100 text-3xl md:text-4xl mb-4">
                    <span className="text-amber-300 font-bold">{digScore}</span> points
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-amber-200/70 mb-1">💎 Diamonds Found</p>
                      <p className="text-3xl font-bold text-yellow-300">{diamondsFound}</p>
                    </div>
                    <div>
                      <p className="text-amber-200/70 mb-1">Tiles Revealed</p>
                      <p className="text-3xl font-bold text-green-300">{digTiles.filter(t => t.revealed).length}/25</p>
                    </div>
                  </div>
                </div>

                <p className="text-amber-200/90 text-lg md:text-xl mb-6 max-w-lg mx-auto">
                  {diamondsFound >= 2 ? '💎💎 Jackpot! You found multiple diamonds - rare and precious, like our love!' :
                   digScore >= 300 ? '👑 Treasure Master! You discovered so many gems of love!' :
                   digScore >= 150 ? '💍 Well done! Each treasure represents our journey!' :
                   '💕 Every treasure you found is a moment we cherish!'}
                </p>

                <button
                  type="button"
                  onClick={startDigGame}
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500/40 to-amber-600/40 hover:from-amber-500/50 hover:to-amber-600/50 border-2 border-amber-400/50 text-amber-50 font-bold text-lg md:text-xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  ⛏️ Dig Again
                </button>
              </div>
            )}
          </div>
        </div>

        {!saidYes ? (
          /* Question card: Will you marry me? */
          <div
            ref={questionAreaRef}
            className={`relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center rounded-3xl border-2 border-amber-400/50 p-10 sm:p-12 md:p-16 lg:p-20 overflow-hidden transition-all duration-700 ${questionVisible ? 'opacity-100 scale-100 animate-proposalGlow' : 'opacity-0 scale-95'}`}
            style={{
              background: 'linear-gradient(145deg, rgba(255,215,0,0.12) 0%, rgba(30,16,37,0.95) 50%, rgba(255,215,0,0.08) 100%)',
              boxShadow: '0 0 60px rgba(255,215,0,0.2), inset 0 0 100px rgba(255,215,0,0.05), 0 0 120px rgba(255,215,0,0.1)',
            }}
          >
            <div className="mb-8 sm:mb-10">
              <div className="text-[5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] animate-ringPop inline-block" style={{ filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.5))' }}>
                💍
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
              <span className="text-4xl sm:text-5xl md:text-6xl opacity-80 animate-roseFloat" style={{ animationDelay: '0s' }}>💕</span>
              <h2 className="text-amber-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center drop-shadow-lg font-serif">
                Will you marry me?
              </h2>
              <span className="text-4xl sm:text-5xl md:text-6xl opacity-80 animate-roseFloat" style={{ animationDelay: '0.5s' }}>💕</span>
            </div>
            <p className="text-purple-300/80 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 md:mb-16 italic">Make my dreams come true...</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full min-h-[100px]">
              <button
                type="button"
                onClick={handleYes}
                className="px-10 sm:px-14 md:px-16 py-5 sm:py-6 md:py-7 rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-2xl sm:text-3xl md:text-4xl shadow-2xl hover:shadow-amber-500/50 hover:scale-110 active:scale-100 transition-all duration-300 border-3 border-amber-300/70 z-10 hover:border-amber-200/90 animate-heartbeat"
              >
                Yes! 💕
              </button>
            </div>
            <button
              type="button"
              onMouseEnter={moveNoAway}
              onClick={moveNoAway}
              className="absolute rounded-2xl px-6 sm:px-8 py-3 sm:py-4 bg-white/10 border-2 border-purple-400/40 text-purple-200 font-semibold text-lg sm:text-xl hover:bg-white/15 transition-all duration-200 select-none z-20"
              style={{
                left: `${noPos.x}%`,
                top: `${noPos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              No
            </button>
          </div>
        ) : (
          /* Celebration */
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {/* Main Ring */}
            <div className="text-center">
              <div
                className="text-[10rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] leading-none inline-block animate-ringPop"
                style={{ filter: 'drop-shadow(0 0 60px rgba(255,215,0,0.7)) drop-shadow(0 0 120px rgba(255,215,0,0.3))' }}
              >
                💍
              </div>
            </div>

            {/* Main Message */}
            <div className="text-center space-y-4 sm:space-y-6">
              <h2
                className="text-amber-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-2xl font-serif italic animate-fadeUpIn opacity-0"
                style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
              >
                Thank you sweetheart
              </h2>
              <p
                className="text-purple-300/90 text-xl sm:text-2xl md:text-3xl lg:text-4xl animate-fadeUpIn opacity-0 font-serif italic"
                style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
              >
                My favorite answer to my favorite question
              </p>
              <p
                className="text-amber-200/80 text-lg sm:text-xl md:text-2xl lg:text-3xl animate-fadeUpIn opacity-0"
                style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
              >
                Forever starts now ✨
              </p>
            </div>

            {/* Celebration emojis - Row 1 */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {celebrationEmojis.map((e, i) => (
                <span
                  key={i}
                  className="animate-heartbeat inline-block opacity-0 animate-fadeUpIn"
                  style={{ animationDelay: `${1.4 + i * 0.04}s`, animationFillMode: 'forwards' }}
                >
                  {e}
                </span>
              ))}
            </div>

            {/* Celebration emojis - Row 2 */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              {['💍', '💕', '💍', '💗', '💖', '💍', '💕', '💗', '💍', '💖', '💕', '💍'].map((e, i) => (
                <span
                  key={i}
                  className="animate-heartbeat inline-block opacity-0 animate-fadeUpIn"
                  style={{ animationDelay: `${2.2 + i * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  {e}
                </span>
              ))}
            </div>

            {/* Celebration emojis - Row 3 */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {['💍', '💕', '💗', '💖', '💍', '💕', '💗', '💖', '💍', '💕', '💗', '💖', '💍', '💕', '💗'].map((e, i) => (
                <span
                  key={i}
                  className="animate-heartbeat inline-block opacity-0 animate-fadeUpIn"
                  style={{ animationDelay: `${2.8 + i * 0.04}s`, animationFillMode: 'forwards' }}
                >
                  {e}
                </span>
              ))}
            </div>

            {/* Promise Box */}
            <div
              className="rounded-3xl border-2 border-amber-400/40 p-8 sm:p-10 md:p-12 lg:p-16 animate-fadeUpIn opacity-0"
              style={{
                background: 'linear-gradient(145deg, rgba(255,215,0,0.1) 0%, rgba(30,16,37,0.9) 50%, rgba(255,215,0,0.08) 100%)',
                boxShadow: '0 0 60px rgba(255,215,0,0.15), inset 0 0 100px rgba(255,215,0,0.05)',
                animationDelay: '3.5s',
                animationFillMode: 'forwards',
              }}
            >
              <h3 className="text-amber-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8">
                Our Forever Promise
              </h3>
              <div className="space-y-4 sm:space-y-5 text-purple-200/90 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-serif text-center">
                <p className="italic">To love each other unconditionally</p>
                <p className="italic">To support each other's dreams</p>
                <p className="italic">To grow together through every season</p>
                <p className="italic">To cherish every moment</p>
                <p className="text-amber-200 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-6 sm:mt-8">
                  Today, Tomorrow, Forever 💍
                </p>
              </div>
            </div>

            {/* Final emoji celebration */}
            <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap text-6xl sm:text-7xl md:text-8xl lg:text-9xl py-8 sm:py-12">
              {['💕', '💍', '💖', '💍', '💕'].map((e, i) => (
                <span
                  key={i}
                  className="animate-heartbeat inline-block opacity-0 animate-fadeUpIn"
                  style={{ animationDelay: `${4.2 + i * 0.15}s`, animationFillMode: 'forwards' }}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProposeDay
