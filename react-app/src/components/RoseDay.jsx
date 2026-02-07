import { useEffect, useState } from 'react'
import { handleInteraction } from '../utils/interactions'
import LoveQuoteGenerator from './LoveQuoteGenerator'

const PETAL_COUNT = 48
const ROSE_COLORS = ['#c41e3a', '#b22222', '#dc143c', '#ff69b4', '#ff1493', '#db7093', '#ffb6c1', '#ffc0cb']

const PICK_ROSE_OPTIONS = [
  { id: 'red', label: 'Red', emoji: '🌹', message: 'I love you.', color: '#dc143c' },
  { id: 'pink', label: 'Pink', emoji: '🌹', message: 'Thank you for everything.', color: '#ff69b4' },
  { id: 'yellow', label: 'Yellow', emoji: '🌹', message: 'You make me happy.', color: '#e6b800' },
  { id: 'white', label: 'White', emoji: '🌹', message: 'You are pure love.', color: '#fff5ee' },
]

function RoseDay() {
  const [petals, setPetals] = useState([])
  const [burst, setBurst] = useState(true)
  const [heroVisible, setHeroVisible] = useState(false)
  const [selectedRose, setSelectedRose] = useState(null)
  const [giveRose, setGiveRose] = useState('idle') // 'idle' | 'animating' | 'done'
  const [bouquet, setBouquet] = useState([])
  
  // Petal Catch Game - Enhanced
  const [gameActive, setGameActive] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [gameTime, setGameTime] = useState(40)
  const [fallingPetals, setFallingPetals] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [combo, setCombo] = useState(0)
  const [missedPetals, setMissedPetals] = useState(0)
  const [caughtCount, setCaughtCount] = useState(0)
  const [lastCatchTime, setLastCatchTime] = useState(0)
  const [showComboText, setShowComboText] = useState(false)
  const [difficulty, setDifficulty] = useState(1)

  useEffect(() => {
    setPetals(
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 60,
        size: 10 + Math.random() * 22,
        color: ROSE_COLORS[i % ROSE_COLORS.length],
        blur: i % 3 === 0 ? 1 : 0,
      }))
    )
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setBurst(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const burstParticles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2 + Math.random()
    const dist = 80 + Math.random() * 120
    return {
      id: i,
      bx: Math.cos(angle) * dist,
      by: Math.sin(angle) * dist,
      delay: Math.random() * 0.2,
      color: ROSE_COLORS[i % ROSE_COLORS.length],
    }
  })

  const roseMessages = [
    "You bring beauty and fragrance to my life—like a rose.",
    "Every petal is a promise. You're chosen, today and always.",
    "Red for love, pink for gratitude—every shade for you.",
    "You're the garden where my heart blooms.",
    "Some things don't need words. This rose is one of them.",
    "Forever wouldn't be enough. But it's a start.",
    "The best part of my day is you. Roses are just the excuse.",
    "Worth every thorn. Worth every petal. Worth everything.",
  ]

  const handleGiveRose = () => {
    if (giveRose !== 'idle') return
    handleInteraction({ sound: 'heart', haptic: true })
    setGiveRose('animating')
    setTimeout(() => setGiveRose('done'), 2000)
  }

  const addToBouquet = (rose) => {
    handleInteraction({ sound: 'pop', haptic: true, hapticIntensity: 'light' })
    setBouquet((prev) => [...prev, { ...rose, uniqueId: Date.now() + Math.random() }])
  }

  const removeFromBouquet = (uniqueId) => {
    handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
    setBouquet((prev) => prev.filter((r) => r.uniqueId !== uniqueId))
  }

  // Petal Catch Game Functions - Enhanced
  const startPetalGame = () => {
    setGameActive(true)
    setGameScore(0)
    setGameTime(40)
    setGameOver(false)
    setFallingPetals([])
    setCombo(0)
    setMissedPetals(0)
    setCaughtCount(0)
    setDifficulty(1)
    setLastCatchTime(0)
    handleInteraction({ sound: 'success', haptic: true })
  }

  const catchPetal = (petal) => {
    const now = Date.now()
    const timeSinceLastCatch = now - lastCatchTime
    
    setFallingPetals(prev => prev.filter(p => p.id !== petal.id))
    setCaughtCount(prev => prev + 1)
    setLastCatchTime(now)
    
    // Combo system - catch within 1 second for combo
    let newCombo = combo
    if (timeSinceLastCatch < 1000 && lastCatchTime > 0) {
      newCombo = combo + 1
      setCombo(newCombo)
      setShowComboText(true)
      setTimeout(() => setShowComboText(false), 800)
    } else {
      setCombo(0)
    }
    
    // Calculate points
    const basePoints = petal.isSpecial ? 50 : 10
    const comboBonus = newCombo > 0 ? newCombo * 5 : 0
    const totalPoints = basePoints + comboBonus
    
    setGameScore(prev => prev + totalPoints)
    
    // Haptic intensity based on special petal or combo
    const intensity = petal.isSpecial ? 'heavy' : newCombo > 2 ? 'medium' : 'light'
    handleInteraction({ sound: petal.isSpecial ? 'success' : 'pop', haptic: true, hapticIntensity: intensity })
  }

  // Game timer and petal spawning - Enhanced
  useEffect(() => {
    if (!gameActive || gameOver) return

    const timer = setInterval(() => {
      setGameTime(prev => {
        if (prev <= 1) {
          setGameActive(false)
          setGameOver(true)
          handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const petalSpawner = setInterval(() => {
      setFallingPetals(prev => {
        // Remove old petals and count misses
        const now = Date.now()
        const filtered = prev.filter(p => {
          const age = now - p.spawnTime
          if (age >= 4000) {
            setMissedPetals(m => m + 1)
            setCombo(0) // Break combo on miss
            return false
          }
          return true
        })
        
        // 10% chance of special golden petal
        const isSpecial = Math.random() < 0.1
        
        return [
          ...filtered,
          {
            id: Date.now() + Math.random(),
            left: 10 + Math.random() * 80,
            spawnTime: Date.now(),
            color: isSpecial ? '#FFD700' : ROSE_COLORS[Math.floor(Math.random() * ROSE_COLORS.length)],
            isSpecial,
            size: isSpecial ? 48 : 32 + Math.random() * 16,
            rotate: Math.random() * 360,
          }
        ]
      })
    }, Math.max(400, 800 - difficulty * 50)) // Gets faster as score increases

    // Increase difficulty every 10 seconds
    const difficultyTimer = setInterval(() => {
      setDifficulty(prev => Math.min(6, prev + 0.5))
    }, 10000)

    return () => {
      clearInterval(timer)
      clearInterval(petalSpawner)
      clearInterval(difficultyTimer)
    }
  }, [gameActive, gameOver, difficulty])

  const giveRosePetals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: 30 + Math.random() * 40,
    delay: i * 0.05,
    py: -120 - Math.random() * 80,
  }))

  const bokehSpots = [
    { x: '20%', y: '15%', size: 120, delay: 0 },
    { x: '80%', y: '25%', size: 180, delay: 1 },
    { x: '50%', y: '70%', size: 200, delay: 2 },
    { x: '10%', y: '60%', size: 100, delay: 0.5 },
    { x: '90%', y: '55%', size: 140, delay: 1.5 },
  ]

  return (
    <section
      id="rose-day"
      className="scroll-mt-20 min-h-[100dvh] relative overflow-x-hidden overflow-y-auto"
      style={{
        background: 'linear-gradient(165deg, #0d0508 0%, #1a0a0e 20%, #2d0f18 40%, #4a1520 55%, #2d0f18 75%, #1a0a0e 90%, #0d0508 100%)',
        backgroundAttachment: 'fixed',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="gradient-overlay" />

      {/* Bokeh orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {bokehSpots.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-bokehPulse bg-rose-500"
            style={{
              left: b.x,
              top: b.y,
              width: b.size,
              height: b.size,
              background: `radial-gradient(circle, rgba(255,105,180,0.25) 0%, rgba(220,20,60,0.08) 50%, transparent 70%)`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Falling petals — two layers for depth */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute animate-petalFall"
            style={{
              left: `${p.left}%`,
              top: '-3rem',
              width: `${p.size}px`,
              height: `${p.size * 1.5}px`,
              background: `radial-gradient(ellipse 55% 100% at 50% 0%, ${p.color}, transparent 72%)`,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              opacity: 0.9,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--drift': p.drift,
              transform: `rotate(${Math.random() * 360}deg)`,
              filter: p.blur ? 'blur(0.5px)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Give a rose — overlay (animating or done) */}
      {(giveRose === 'animating' || giveRose === 'done') && (
        <div
          className="fixed inset-0 z-[20] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => giveRose === 'done' && setGiveRose('idle')}
          role="presentation"
          aria-hidden
        >
          {giveRose === 'animating' && (
            <>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-8xl md:text-9xl animate-giveRoseFly">🌹</span>
              </div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {giveRosePetals.map((p) => (
                  <div
                    key={p.id}
                    className="absolute w-3 h-3 rounded-full bg-rose-400 animate-giveRosePetal"
                    style={{
                      left: `${p.left}%`,
                      bottom: '20%',
                      '--py': `${p.py}px`,
                      animationDelay: `${p.delay}s`,
                      animationDuration: '1.2s',
                    }}
                  />
                ))}
              </div>
            </>
          )}
          {giveRose === 'done' && (
            <div className="animate-forYouReveal text-center px-4">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-rose-100 drop-shadow-lg">
                For you 💕
              </p>
              <p className="text-rose-200/90 text-lg md:text-xl mt-3">Tap anywhere to close</p>
            </div>
          )}
        </div>
      )}

      {/* One-time petal burst on load */}
      {burst && (
        <div className="fixed inset-0 pointer-events-none z-[5] flex items-center justify-center">
          {burstParticles.map((b) => (
            <div
              key={b.id}
              className="absolute w-3 h-3 rounded-full animate-petalBurst"
              style={{
                '--bx': `${b.bx}px`,
                '--by': `${b.by}px`,
                background: b.color,
                animationDelay: `${b.delay}s`,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )}

      {/* Vignette + spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 25%, transparent 30%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 md:px-6 pt-14 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
        {/* Hero — full impact */}
        <div
          className={`text-center mb-12 sm:mb-16 md:mb-24 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="text-[5rem] min-[400px]:text-[7rem] sm:text-[12rem] md:text-[14rem] lg:text-[16rem] xl:text-[18rem] mb-2 animate-roseBreath inline-block leading-none select-none" style={{ lineHeight: 0.9 }}>
            🌹
          </div>
          <h1
            className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #ffd4e5 25%, #ff69b4 50%, #dc143c 75%, #ff1493 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'textShine 5s ease-in-out infinite',
              letterSpacing: '-0.02em',
            }}
          >
            Rose Day
          </h1>
          <p className="text-rose-100 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium max-w-xl mx-auto mt-4 sm:mt-5 px-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            The first bloom of our Valentine's Week — for you
          </p>
          <p className="text-rose-200/90 text-base sm:text-lg mt-2 font-medium">
            My love. February 7
          </p>
        </div>

        {/* What is Rose Day — glass card */}
        <div
          className="bg-white/[0.06] backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-rose-400/25 p-5 sm:p-6 md:p-10 mb-10 sm:mb-14 shadow-[0_8px_32px_rgba(0,0,0,0.3)] animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-rose-100 text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 text-center">
            A day of roses — and a lifetime with you
          </h2>
          <p className="text-rose-200/95 text-center leading-relaxed text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            This week is for you. This rose says what words don't always say enough—
            how much you're admired, how grateful I am, and that you're chosen, every single day.
          </p>
        </div>

        {/* Central "This rose is for you" — wow block */}
        <div
          className="flex flex-col items-center mb-12 sm:mb-16 md:mb-24 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <div className="relative flex items-center justify-center my-4">
            <span className="text-7xl sm:text-8xl md:text-9xl absolute opacity-25 animate-roseFloat" style={{ animationDelay: '0s' }}>🌹</span>
            <span className="text-9xl sm:text-[10rem] md:text-[12rem] lg:text-[14rem] z-10 animate-roseBreath">🌹</span>
            <span className="text-7xl sm:text-8xl md:text-9xl absolute opacity-25 animate-roseFloat" style={{ animationDelay: '0.8s' }}>🌹</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-50 mb-4 text-center drop-shadow-[0_0_20px_rgba(0,0,0,0.3)]">
            This rose is for you
          </h3>
          <p className="text-rose-200/95 text-lg md:text-xl lg:text-2xl text-center max-w-2xl leading-relaxed">
            Not just this one—every rose reminds me of you. The first flower is always yours, today and every day.
          </p>
        </div>

        {/* Pick your rose */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
        >
          <h3 className="text-rose-100 text-2xl md:text-3xl font-bold text-center mb-6">
            Pick a rose
          </h3>
          <p className="text-rose-200/90 text-center text-sm md:text-base mb-6 max-w-md mx-auto">
            Each one has a message for you.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {PICK_ROSE_OPTIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRose(selectedRose === r.id ? null : r.id)}
                className={`flex flex-col items-center justify-center py-6 px-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  selectedRose === r.id
                    ? 'border-rose-400 bg-rose-500/25 shadow-[0_0_24px_rgba(220,20,60,0.3)]'
                    : 'border-rose-400/30 bg-white/[0.06] hover:border-rose-400/60'
                }`}
                style={{
                  boxShadow: selectedRose === r.id ? `0 0 24px ${r.color}40` : undefined,
                }}
              >
                <span
                  className="text-5xl md:text-6xl mb-2 block drop-shadow-lg"
                  style={{
                    filter: r.id === 'red' ? undefined : r.id === 'pink' ? 'hue-rotate(-20deg) saturate(1.2)' : r.id === 'yellow' ? 'hue-rotate(-45deg) saturate(0.9) brightness(1.1)' : 'grayscale(1) brightness(1.5)',
                  }}
                >
                  🌹
                </span>
                <span className="text-rose-100 font-semibold text-sm md:text-base">{r.label}</span>
              </button>
            ))}
          </div>
          {selectedRose && (
            <div
              className="mt-6 p-6 rounded-2xl border-2 border-rose-400/40 bg-rose-500/15 text-center animate-fadeUpIn"
            >
              <p className="text-rose-50 text-xl md:text-2xl font-medium">
                {PICK_ROSE_OPTIONS.find((r) => r.id === selectedRose)?.message}
              </p>
            </div>
          )}
        </div>

        {/* Virtual Bouquet Builder */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.75s', animationFillMode: 'forwards' }}
        >
          <h3 className="text-rose-100 text-2xl md:text-3xl font-bold text-center mb-4">
            Build Your Bouquet
          </h3>
          <p className="text-rose-200/90 text-center text-sm md:text-base mb-6 max-w-md mx-auto">
            Pick roses to create a custom bouquet for your love 💐
          </p>
          
          {/* Rose picker buttons */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-6 flex-wrap">
            {PICK_ROSE_OPTIONS.map((rose) => (
              <button
                key={rose.id}
                type="button"
                onClick={() => addToBouquet(rose)}
                className="px-4 sm:px-6 py-3 rounded-xl bg-white/[0.08] border-2 border-rose-400/30 hover:border-rose-400/60 hover:bg-rose-500/10 transition-all duration-300 hover:scale-110 active:scale-95"
                style={{
                  borderColor: `${rose.color}40`,
                }}
              >
                <span
                  className="text-3xl sm:text-4xl block"
                  style={{
                    filter: rose.id === 'red' ? undefined : rose.id === 'pink' ? 'hue-rotate(-20deg) saturate(1.2)' : rose.id === 'yellow' ? 'hue-rotate(-45deg) saturate(0.9) brightness(1.1)' : 'grayscale(1) brightness(1.5)',
                  }}
                >
                  🌹
                </span>
                <span className="text-rose-100 text-xs sm:text-sm font-medium">{rose.label}</span>
              </button>
            ))}
          </div>

          {/* Bouquet display */}
          {bouquet.length > 0 && (
            <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl border-2 border-rose-400/30 p-6 sm:p-8 animate-fadeUpIn">
              <div className="flex justify-center items-end gap-1 sm:gap-2 mb-4 flex-wrap min-h-[80px]">
                {bouquet.map((rose, idx) => (
                  <button
                    key={rose.uniqueId}
                    type="button"
                    onClick={() => removeFromBouquet(rose.uniqueId)}
                    className="text-4xl sm:text-5xl md:text-6xl transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer"
                    style={{
                      filter: rose.id === 'red' ? 'none' : rose.id === 'pink' ? 'hue-rotate(-20deg) saturate(1.2)' : rose.id === 'yellow' ? 'hue-rotate(-45deg) saturate(0.9) brightness(1.1)' : 'grayscale(1) brightness(1.5)',
                      animationDelay: `${idx * 0.1}s`,
                    }}
                    title="Click to remove"
                  >
                    🌹
                  </button>
                ))}
              </div>
              <div className="text-center">
                <p className="text-rose-100 text-lg md:text-xl font-medium mb-2">
                  Your Bouquet: {bouquet.length} {bouquet.length === 1 ? 'Rose' : 'Roses'} 💐
                </p>
                <p className="text-rose-200/80 text-sm">Click a rose to remove it</p>
              </div>
            </div>
          )}
        </div>

        {/* Give a rose — button */}
        <div
          className="flex flex-col items-center mb-16 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.95s', animationFillMode: 'forwards' }}
        >
          <p className="text-rose-200/90 text-center mb-4">Please click here 👇</p>
          <button
            type="button"
            onClick={handleGiveRose}
            disabled={giveRose === 'animating'}
            className="min-h-[48px] min-w-[44px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-rose-500/30 border-2 border-rose-400/50 text-rose-50 font-bold text-base sm:text-lg md:text-xl shadow-lg hover:bg-rose-500/40 hover:border-rose-400/70 hover:scale-105 active:scale-100 disabled:opacity-70 disabled:pointer-events-none transition-all duration-300"
          >
            This one's for you 🌹
          </button>
        </div>

        {/* Rose row */}
        <div
          className="flex justify-center gap-4 sm:gap-6 mb-16 flex-wrap animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <span
              key={i}
              className="text-4xl md:text-5xl lg:text-6xl animate-roseFloat inline-block drop-shadow-lg"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              🌹
            </span>
          ))}
        </div>

        {/* Why roses — short */}
        <div
          className="bg-white/[0.05] backdrop-blur-md rounded-2xl border border-rose-400/20 p-4 sm:p-6 md:p-8 mb-10 sm:mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.05s', animationFillMode: 'forwards' }}
        >
          <h3 className="text-rose-100 text-xl md:text-2xl font-bold text-center mb-4">
            Why roses?
          </h3>
          <p className="text-rose-200/90 text-center text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Because they're beautiful, a little fragile, and they last. Like us. And because one flower can say "I see you" without a single word.
          </p>
        </div>

        {/* Message cards — glass + hover lift (8 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-12 sm:mb-16">
          {roseMessages.map((msg, idx) => (
            <div
              key={idx}
              className="bg-white/[0.07] backdrop-blur-xl rounded-xl sm:rounded-2xl border border-rose-400/20 p-4 sm:p-5 md:p-6 text-center animate-fadeUpIn opacity-0 hover:border-rose-400/40 hover:shadow-[0_12px_40px_rgba(220,20,60,0.15)] hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${1.15 + idx * 0.06}s`, animationFillMode: 'forwards' }}
            >
              <span className="text-3xl mb-2 block">🌹</span>
              <p className="text-rose-100 text-sm leading-relaxed italic">
                "{msg}"
              </p>
            </div>
          ))}
        </div>

        {/* Every color — Valentine's Week tie-in */}
        <div
          className="text-center py-8 md:py-10 mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.65s', animationFillMode: 'forwards' }}
        >
          <p className="text-rose-200/95 text-base md:text-lg max-w-xl mx-auto">
            Red today. Tomorrow another color. The whole week is for you—every rose, every day.
          </p>
          <div className="flex justify-center gap-2 sm:gap-4 mt-6 flex-wrap">
            {['🌹', '💍', '🍫', '🧸', '🤝', '🤗', '💋', '💕'].map((e, i) => (
              <span key={i} className="text-2xl md:text-3xl animate-roseFloat" style={{ animationDelay: `${i * 0.1}s` }}>{e}</span>
            ))}
          </div>
        </div>

        {/* Second short poem / lines */}
        <div
          className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-rose-400/20 p-6 md:p-8 mb-14 text-center animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.75s', animationFillMode: 'forwards' }}
        >
          <p className="text-rose-100 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            If I could fill this page with roses, I would.<br />
            For now—this one, and the next, and every one after. For you.
          </p>
        </div>

        {/* Poem — dramatic close */}
        <div
          className="bg-gradient-to-b from-rose-500/15 to-transparent rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-rose-400/25 text-center shadow-xl animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.85s', animationFillMode: 'forwards' }}
        >
          <p className="text-rose-50 text-base sm:text-lg md:text-xl lg:text-2xl leading-loose max-w-2xl mx-auto font-medium">
            One rose for the way you smile,<br />
            one for every mile we've walked together,<br />
            one for the mornings I wake next to you,<br />
            <span className="text-rose-200 text-xl md:text-2xl">and one for forever.</span>
          </p>
          <p className="text-rose-200 text-lg sm:text-xl md:text-2xl font-bold mt-6 sm:mt-8">
            Happy Rose Day, my love. 🌹
          </p>
          <div className="flex justify-center gap-4 sm:gap-5 mt-6 sm:mt-8 text-4xl sm:text-5xl">
            <span className="animate-heartbeat inline-block">💕</span>
            <span className="animate-heartbeat inline-block" style={{ animationDelay: '0.3s' }}>🌹</span>
            <span className="animate-heartbeat inline-block" style={{ animationDelay: '0.6s' }}>💕</span>
          </div>
        </div>

        {/* Petal Catch Game - Enhanced */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.95s', animationFillMode: 'forwards' }}
        >
          <div className="bg-gradient-to-br from-rose-900/30 to-rose-800/20 backdrop-blur-xl rounded-3xl border-2 border-rose-400/40 p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-2xl">
            {/* Decorative garden background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-green-900/40 to-transparent" />
            </div>

            <h3 className="text-rose-100 text-2xl md:text-3xl font-bold text-center mb-2 relative z-10">
              🌸 Rose Petal Catcher 🌸
            </h3>
            <p className="text-rose-200/90 text-center text-sm md:text-base mb-6 relative z-10">
              Catch falling petals! Regular petals = 10pts, ⭐ Golden petals = 50pts!<br />
              <span className="text-rose-300 font-semibold">Build combos by catching quickly for bonus points!</span>
            </p>

            {!gameActive && !gameOver && (
              <div className="text-center py-10 relative z-10">
                <div className="flex justify-center gap-3 mb-6">
                  {['🌹', '🌺', '🌸', '🌷'].map((e, i) => (
                    <span key={i} className="text-6xl md:text-7xl animate-roseFloat" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
                  ))}
                </div>
                <p className="text-rose-100 text-lg md:text-xl mb-3">Ready for the petal challenge?</p>
                <p className="text-rose-200/80 text-sm mb-6">40 seconds • Progressive difficulty • Combo system</p>
                <button
                  type="button"
                  onClick={startPetalGame}
                  className="px-12 py-6 rounded-2xl bg-gradient-to-r from-rose-500/50 to-pink-500/50 hover:from-rose-500/60 hover:to-pink-500/60 border-3 border-rose-300/50 text-white font-bold text-xl md:text-2xl shadow-2xl hover:scale-105 active:scale-100 transition-all duration-300"
                >
                  🎮 Start Challenge
                </button>
              </div>
            )}

            {gameActive && (
              <div className="relative z-10">
                {/* Enhanced Game HUD */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="bg-white/[0.1] backdrop-blur-sm rounded-xl p-3 border border-rose-400/30 text-center">
                    <p className="text-rose-200/80 text-xs mb-1">Score</p>
                    <p className="text-2xl md:text-3xl font-bold text-rose-300">{gameScore}</p>
                  </div>
                  <div className="bg-white/[0.1] backdrop-blur-sm rounded-xl p-3 border border-rose-400/30 text-center">
                    <p className="text-rose-200/80 text-xs mb-1">Time</p>
                    <p className="text-2xl md:text-3xl font-bold text-rose-300">{gameTime}s</p>
                  </div>
                  <div className="bg-white/[0.1] backdrop-blur-sm rounded-xl p-3 border border-rose-400/30 text-center">
                    <p className="text-rose-200/80 text-xs mb-1">Combo</p>
                    <p className={`text-2xl md:text-3xl font-bold ${combo > 0 ? 'text-amber-300 animate-pulse' : 'text-rose-300'}`}>
                      {combo > 0 ? `x${combo + 1}` : '-'}
                    </p>
                  </div>
                  <div className="bg-white/[0.1] backdrop-blur-sm rounded-xl p-3 border border-rose-400/30 text-center">
                    <p className="text-rose-200/80 text-xs mb-1">Caught</p>
                    <p className="text-2xl md:text-3xl font-bold text-green-300">{caughtCount}</p>
                  </div>
                </div>

                {/* Combo notification */}
                {showComboText && combo > 1 && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 animate-fadeUpIn pointer-events-none">
                    <p className="text-4xl md:text-5xl font-bold text-amber-300 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">
                      {combo}x COMBO! 🔥
                    </p>
                  </div>
                )}

                {/* Enhanced Game Area */}
                <div className="relative bg-gradient-to-b from-rose-950/40 via-rose-900/30 to-green-950/20 rounded-2xl border-2 border-rose-400/30 h-96 sm:h-[28rem] overflow-hidden shadow-inner">
                  {/* Garden floor */}
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-green-900/30 to-transparent pointer-events-none" />
                  
                  {fallingPetals.map(petal => (
                    <button
                      key={petal.id}
                      type="button"
                      onClick={() => catchPetal(petal)}
                      className="absolute cursor-pointer transition-all hover:scale-125 active:scale-75 z-10"
                      style={{
                        left: `${petal.left}%`,
                        animation: 'petalFall 4s linear forwards',
                        filter: petal.isSpecial 
                          ? 'drop-shadow(0 0 12px rgba(255,215,0,0.9)) drop-shadow(0 4px 8px rgba(220,20,60,0.6))'
                          : 'drop-shadow(0 2px 8px rgba(220,20,60,0.6))',
                        fontSize: `${petal.size}px`,
                        transform: `rotate(${petal.rotate}deg)`,
                      }}
                    >
                      <span style={{ filter: petal.isSpecial ? 'hue-rotate(45deg) saturate(2) brightness(1.5)' : 'none' }}>
                        🌹
                      </span>
                      {petal.isSpecial && (
                        <span className="absolute -top-2 -right-2 text-xl animate-pulse">⭐</span>
                      )}
                    </button>
                  ))}
                  
                  {fallingPetals.length === 0 && !gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-rose-200/50 text-lg mb-2">Petals are coming!</p>
                        <p className="text-rose-300/70 text-sm">Click them quickly to build combos!</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Stats Bar */}
                <div className="mt-4 flex justify-between items-center text-sm">
                  <span className="text-rose-200/70">Missed: <span className="text-red-300 font-semibold">{missedPetals}</span></span>
                  <span className="text-rose-200/70">Difficulty: <span className="text-amber-300 font-semibold">Level {Math.floor(difficulty)}</span></span>
                  {combo > 0 && (
                    <span className="text-amber-300 font-bold animate-pulse">+{combo * 5} bonus!</span>
                  )}
                </div>
              </div>
            )}

            {gameOver && (
              <div className="text-center py-10 animate-fadeUpIn relative z-10">
                <p className="text-8xl mb-6">
                  {gameScore >= 400 ? '🏆' : gameScore >= 250 ? '🌟' : '🌹'}
                </p>
                <p className="text-rose-50 text-4xl md:text-5xl font-bold mb-4">Time's Up!</p>
                
                {/* Detailed Stats */}
                <div className="max-w-md mx-auto mb-6 bg-white/[0.08] rounded-2xl border border-rose-400/30 p-6">
                  <p className="text-rose-100 text-3xl md:text-4xl mb-4">
                    <span className="text-rose-300 font-bold">{gameScore}</span> points
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-rose-200/70 mb-1">Petals Caught</p>
                      <p className="text-2xl font-bold text-green-300">{caughtCount}</p>
                    </div>
                    <div>
                      <p className="text-rose-200/70 mb-1">Petals Missed</p>
                      <p className="text-2xl font-bold text-red-300">{missedPetals}</p>
                    </div>
                  </div>
                </div>

                <p className="text-rose-200/90 text-lg md:text-xl mb-6 max-w-lg mx-auto">
                  {gameScore >= 400 ? '🔥 Legendary! You caught every bit of love with perfect combos!' :
                   gameScore >= 250 ? '💎 Incredible! Your reflexes match the beauty of roses!' :
                   gameScore >= 150 ? '🌟 Wonderful! You caught so many petals of love!' :
                   '🌹 Every petal you caught is a moment we treasure together!'}
                </p>
                
                {caughtCount > 0 && (
                  <p className="text-rose-300/80 text-base mb-6">
                    Accuracy: {Math.round((caughtCount / (caughtCount + missedPetals)) * 100)}% 🎯
                  </p>
                )}

                <button
                  type="button"
                  onClick={startPetalGame}
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-rose-500/40 to-pink-500/40 hover:from-rose-500/50 hover:to-pink-500/50 border-2 border-rose-400/50 text-rose-50 font-bold text-lg md:text-xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  🔄 Play Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Love Quote Generator */}
        <LoveQuoteGenerator className="my-14 animate-fadeUpIn opacity-0" style={{ animationDelay: '2s', animationFillMode: 'forwards' }} />

      </div>
    </section>
  )
}

export default RoseDay
