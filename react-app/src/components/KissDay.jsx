import { useEffect, useState } from 'react'
import { handleInteraction } from '../utils/interactions'

const MILESTONES = {
  10: { message: "10 Kisses! 💋 You're making my heart flutter!", emoji: "💕", color: "#ff69b4" },
  25: { message: "25 Kisses! 😘 I can't stop smiling!", emoji: "🥰", color: "#ff1493" },
  50: { message: "50 Kisses! 💘 You're showering me with love!", emoji: "💖", color: "#dc143c" },
  100: { message: "100 Kisses! 🎉 A century of kisses for my love!", emoji: "🎊", color: "#c41e3a" },
}

function KissDay() {
  const [kisses, setKisses] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [heroVisible, setHeroVisible] = useState(false)
  const [kissCount, setKissCount] = useState(0)
  const [showKissAnimation, setShowKissAnimation] = useState(false)
  const [showMilestone, setShowMilestone] = useState(null)
  const [achievedMilestones, setAchievedMilestones] = useState(new Set())
  
  // Whack-a-Kiss Game
  const [kissGameActive, setKissGameActive] = useState(false)
  const [kissGameScore, setKissGameScore] = useState(0)
  const [kissGameTime, setKissGameTime] = useState(20)
  const [activeKissSpots, setActiveKissSpots] = useState([])
  const [kissGameOver, setKissGameOver] = useState(false)

  const KISS_TYPES = [
    { id: 'forehead', emoji: '😘', name: 'Forehead Kiss', meaning: 'Protection and care' },
    { id: 'cheek', emoji: '😚', name: 'Cheek Kiss', meaning: 'Adoration and sweetness' },
    { id: 'lips', emoji: '💋', name: 'Lips Kiss', meaning: 'Passion and love' },
    { id: 'hand', emoji: '🤝', name: 'Hand Kiss', meaning: 'Respect and devotion' },
  ]

  useEffect(() => {
    const kissInterval = setInterval(() => {
      setKisses((prev) => [
        ...prev.slice(-35),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
          size: 18 + Math.random() * 18,
          emoji: ['💋', '😘', '😚', '💕'][Math.floor(Math.random() * 4)],
        },
      ])
    }, 500)
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
    return () => {
      clearInterval(kissInterval)
      clearInterval(sparkleInterval)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleBlowKiss = () => {
    const newCount = kissCount + 1
    setKissCount(newCount)
    handleInteraction({ sound: 'kiss', haptic: true })
    
    setShowKissAnimation(true)
    setTimeout(() => setShowKissAnimation(false), 2500)
    
    // Check for milestones
    if (MILESTONES[newCount] && !achievedMilestones.has(newCount)) {
      setTimeout(() => {
        setShowMilestone(MILESTONES[newCount])
        setAchievedMilestones(prev => new Set([...prev, newCount]))
        handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
        setTimeout(() => setShowMilestone(null), 4000)
      }, 2500)
    }
  }

  // Whack-a-Kiss Game Functions
  const startKissGame = () => {
    setKissGameActive(true)
    setKissGameScore(0)
    setKissGameTime(20)
    setKissGameOver(false)
    setActiveKissSpots([])
    handleInteraction({ sound: 'success', haptic: true })
  }

  const catchKiss = (spotId) => {
    setActiveKissSpots(prev => prev.filter(s => s !== spotId))
    setKissGameScore(prev => prev + 15)
    handleInteraction({ sound: 'kiss', haptic: true, hapticIntensity: 'medium' })
  }

  // Kiss game timer and spawning
  useEffect(() => {
    if (!kissGameActive || kissGameOver) return

    const timer = setInterval(() => {
      setKissGameTime(prev => {
        if (prev <= 1) {
          setKissGameActive(false)
          setKissGameOver(true)
          handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const kissSpawner = setInterval(() => {
      const randomSpot = Math.floor(Math.random() * 9)
      setActiveKissSpots(prev => {
        if (prev.length >= 3) return prev
        if (prev.includes(randomSpot)) return prev
        return [...prev, randomSpot]
      })
      
      setTimeout(() => {
        setActiveKissSpots(prev => prev.filter(s => s !== randomSpot))
      }, 1500)
    }, 600)

    return () => {
      clearInterval(timer)
      clearInterval(kissSpawner)
    }
  }, [kissGameActive, kissGameOver])

  const bokehSpots = [
    { x: '14%', y: '18%', size: 135, delay: 0 },
    { x: '86%', y: '22%', size: 165, delay: 0.7 },
    { x: '48%', y: '68%', size: 185, delay: 1.2 },
    { x: '16%', y: '75%', size: 120, delay: 0.3 },
    { x: '88%', y: '58%', size: 145, delay: 0.9 },
  ]

  return (
    <section
      id="kiss-day"
      className="scroll-mt-20 min-h-[100dvh] relative overflow-x-hidden overflow-y-auto"
      style={{
        background: 'linear-gradient(165deg, #1a050f 0%, #2d0a1a 25%, #3d0f25 50%, #2d0a1a 75%, #1a050f 100%)',
        backgroundAttachment: 'fixed',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="gradient-overlay" style={{ background: 'linear-gradient(45deg, rgba(220,20,60,0.18), rgba(255,105,180,0.15), rgba(255,20,147,0.18), rgba(255,105,180,0.15))', backgroundSize: '400% 400%' }} />

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
              background: 'radial-gradient(circle, rgba(220,20,60,0.25) 0%, rgba(255,105,180,0.1) 50%, transparent 70%)',
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating kisses */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {kisses.map((kiss) => (
          <div
            key={kiss.id}
            className="absolute animate-heartFloat"
            style={{
              left: `${kiss.left}%`,
              fontSize: `${kiss.size}px`,
              animationDelay: `${kiss.delay}s`,
              animationDuration: '5s',
            }}
          >
            {kiss.emoji}
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute text-2xl animate-sparkle"
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

      {showKissAnimation && (
        <div className="fixed inset-0 z-[20] flex items-center justify-center pointer-events-none">
          <div className="animate-blowKiss text-8xl md:text-9xl">
            💋
          </div>
        </div>
      )}

      {/* Milestone celebration */}
      {showMilestone && (
        <div className="fixed inset-0 z-[25] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none">
          <div className="animate-fadeUpIn bg-gradient-to-r from-rose-500/90 to-pink-500/90 backdrop-blur-md px-8 sm:px-12 py-6 sm:py-8 rounded-3xl border-4 border-white/30 shadow-2xl max-w-md mx-4">
            <p className="text-6xl sm:text-7xl mb-4 text-center animate-heartbeat">{showMilestone.emoji}</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2">
              Milestone Reached!
            </p>
            <p className="text-lg sm:text-xl text-white/95 text-center">
              {showMilestone.message}
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 md:px-6 pt-14 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
        {/* Hero */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-[5rem] sm:text-[8rem] md:text-[12rem] mb-2 inline-block animate-heartbeat">
            💋
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #ff69b4 30%, #dc143c 50%, #fff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Kiss Day
          </h1>
          <p className="text-rose-100/90 text-base sm:text-lg md:text-xl mt-2">
            All My Love • February 13
          </p>
        </div>

        {/* Intro */}
        <div
          className="bg-white/[0.06] backdrop-blur-xl rounded-3xl border border-rose-400/25 p-6 sm:p-8 md:p-10 mb-12 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <p className="text-rose-50 text-lg md:text-xl text-center leading-relaxed max-w-2xl mx-auto">
            A kiss is a secret told to the mouth instead of the ear. And I have so many secrets—every single one of them is "I love you." 💋💕
          </p>
        </div>

        {/* Kiss counter */}
        <div
          className="flex flex-col items-center mb-12 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl border-2 border-rose-400/30 px-8 py-6 mb-4">
            <p className="text-rose-100 text-lg md:text-xl text-center mb-2">Kisses Blown:</p>
            <p className="text-5xl md:text-6xl font-bold text-rose-300 text-center">{kissCount}</p>
          </div>
          
          {/* Milestone progress */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 max-w-md">
            {Object.entries(MILESTONES).map(([milestone, data]) => {
              const reached = kissCount >= parseInt(milestone)
              const isNext = kissCount < parseInt(milestone) && !Object.keys(MILESTONES).some(m => parseInt(m) > kissCount && parseInt(m) < parseInt(milestone))
              return (
                <div
                  key={milestone}
                  className={`px-3 py-2 rounded-lg border-2 transition-all duration-300 ${
                    reached
                      ? 'bg-rose-500/30 border-rose-400/60 scale-105'
                      : isNext
                      ? 'bg-white/[0.08] border-rose-400/40 animate-pulse'
                      : 'bg-white/[0.05] border-rose-400/20 opacity-60'
                  }`}
                >
                  <p className="text-rose-100 text-xs font-semibold text-center">{milestone} {data.emoji}</p>
                </div>
              )
            })}
          </div>
          
          <button
            type="button"
            onClick={handleBlowKiss}
            className="px-10 py-5 rounded-2xl bg-rose-500/30 border-2 border-rose-400/50 text-rose-50 font-bold text-xl md:text-2xl shadow-lg hover:bg-rose-500/40 hover:scale-105 active:scale-100 transition-all duration-300"
          >
            😘 Blow a Kiss
          </button>
        </div>

        {/* Kiss types */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-rose-100 text-2xl md:text-3xl font-bold text-center mb-6">
            Every kiss has a meaning
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {KISS_TYPES.map((kiss) => (
              <div
                key={kiss.id}
                className="flex items-center gap-4 p-6 md:p-7 rounded-2xl border-2 border-rose-400/30 bg-white/[0.06] hover:border-rose-400/60 hover:bg-rose-500/10 hover:scale-[1.02] transition-all duration-300"
              >
                <span className="text-5xl md:text-6xl flex-shrink-0">{kiss.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-rose-100 font-bold text-lg md:text-xl mb-1">{kiss.name}</h3>
                  <p className="text-rose-200/80 text-sm md:text-base">{kiss.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kiss messages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {[
            "Your lips are my favorite place to get lost.",
            "One kiss from you is worth a thousand words.",
            "Every kiss tells you what my heart can't say.",
            "I could kiss you in the rain and never feel cold.",
            "Your kiss is the punctuation to my every thought of you.",
            "A kiss from you makes everything else fade away.",
          ].map((msg, idx) => (
            <div
              key={idx}
              className="bg-white/[0.07] backdrop-blur-xl rounded-2xl border border-rose-400/20 p-5 md:p-6 text-center hover:border-rose-400/40 hover:-translate-y-1 transition-all duration-300 animate-fadeUpIn opacity-0"
              style={{ animationDelay: `${0.9 + idx * 0.08}s`, animationFillMode: 'forwards' }}
            >
              <span className="text-3xl mb-2 block">💋</span>
              <p className="text-rose-100 text-sm md:text-base leading-relaxed italic">
                "{msg}"
              </p>
            </div>
          ))}
        </div>

        {/* Kiss row */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-14 flex-wrap">
          {['💋', '😘', '💕', '💋', '😚', '💕', '💋', '😘', '💕'].map((e, i) => (
            <span
              key={i}
              className="text-4xl md:text-5xl animate-heartbeat inline-block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {e}
            </span>
          ))}
        </div>

        {/* Whack-a-Kiss Game */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.45s', animationFillMode: 'forwards' }}
        >
          <div className="bg-gradient-to-br from-rose-900/20 to-rose-800/15 backdrop-blur-xl rounded-3xl border-2 border-rose-400/30 p-6 sm:p-8 md:p-10">
            <h3 className="text-rose-100 text-2xl md:text-3xl font-bold text-center mb-3">
              💋 Catch the Kisses Game
            </h3>
            <p className="text-rose-200/90 text-center text-sm md:text-base mb-6">
              Click the kisses before they disappear! Quick reflexes win! 😘
            </p>

            {!kissGameActive && !kissGameOver && (
              <div className="text-center py-8">
                <p className="text-7xl mb-4 animate-heartbeat">💋</p>
                <p className="text-rose-100 text-lg mb-6">Ready to catch some kisses?</p>
                <button
                  type="button"
                  onClick={startKissGame}
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-rose-500/40 to-pink-500/40 hover:from-rose-500/50 hover:to-pink-500/50 border-2 border-rose-400/50 text-rose-50 font-bold text-xl md:text-2xl shadow-lg hover:scale-105 active:scale-100 transition-all duration-300"
                >
                  😘 Start Game
                </button>
              </div>
            )}

            {kissGameActive && (
              <div>
                {/* Game HUD */}
                <div className="flex justify-between items-center mb-6 bg-white/[0.08] rounded-xl p-4 border border-rose-400/30">
                  <div className="text-center">
                    <p className="text-rose-200/80 text-sm mb-1">Kisses Caught</p>
                    <p className="text-3xl font-bold text-rose-300">{kissGameScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-rose-200/80 text-sm mb-1">Time Left</p>
                    <p className="text-3xl font-bold text-rose-300">{kissGameTime}s</p>
                  </div>
                </div>

                {/* Game grid - Whack-a-Mole style */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
                  {Array.from({ length: 9 }, (_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => activeKissSpots.includes(idx) && catchKiss(idx)}
                      className={`aspect-square flex items-center justify-center rounded-2xl border-2 transition-all duration-200 ${
                        activeKissSpots.includes(idx)
                          ? 'bg-rose-500/30 border-rose-400/60 scale-110 shadow-[0_0_20px_rgba(220,20,60,0.5)]'
                          : 'bg-white/[0.05] border-rose-400/20'
                      }`}
                    >
                      {activeKissSpots.includes(idx) && (
                        <span className="text-5xl sm:text-6xl animate-heartbeat">💋</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {kissGameOver && (
              <div className="text-center py-8 animate-fadeUpIn">
                <p className="text-7xl mb-4">💋</p>
                <p className="text-rose-50 text-3xl md:text-4xl font-bold mb-3">Time's Up!</p>
                <p className="text-rose-100 text-2xl md:text-3xl mb-6">
                  Kisses Caught: <span className="text-rose-300 font-bold">{kissGameScore}</span>
                </p>
                <p className="text-rose-200/90 text-base md:text-lg mb-6">
                  {kissGameScore >= 250 ? '🔥 Lightning fast! You caught every kiss!' :
                   kissGameScore >= 150 ? '💕 Amazing reflexes! So many kisses!' :
                   kissGameScore >= 75 ? '😘 Good job! You caught plenty of love!' :
                   '💋 Every kiss caught is precious!'}
                </p>
                <button
                  type="button"
                  onClick={startKissGame}
                  className="px-8 py-4 rounded-2xl bg-rose-500/40 hover:bg-rose-500/50 border-2 border-rose-400/50 text-rose-50 font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300"
                >
                  🔄 Play Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Closing */}
        <div
          className="bg-gradient-to-b from-rose-500/15 to-transparent rounded-3xl p-8 md:p-12 border border-rose-400/25 text-center shadow-xl animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}
        >
          <p className="text-rose-50 text-lg md:text-2xl leading-loose max-w-2xl mx-auto font-medium">
            A thousand kisses wouldn't be enough.<br />
            A million wouldn't come close.<br />
            But I'll keep trying—<br />
            <span className="text-rose-200 text-xl md:text-2xl">one kiss at a time, forever. 💋💕</span>
          </p>
          <p className="text-rose-100 text-xl md:text-2xl font-bold mt-6">
            Happy Kiss Day, my love.
          </p>
          <div className="flex justify-center gap-4 mt-6 text-5xl">
            <span className="animate-heartbeat">💋</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.2s' }}>💕</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.4s' }}>💋</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KissDay
