import { useEffect, useState } from 'react'
import { handleInteraction } from '../utils/interactions'

function ValentinesDay() {
  const [hearts, setHearts] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [heroVisible, setHeroVisible] = useState(false)
  const [revealedMessage, setRevealedMessage] = useState(false)
  
  // Heart Pop Game
  const [popGameActive, setPopGameActive] = useState(false)
  const [popScore, setPopScore] = useState(0)
  const [popTime, setPopTime] = useState(25)
  const [popHearts, setPopHearts] = useState([])
  const [popGameOver, setPopGameOver] = useState(false)

  const LOVE_REASONS = [
    "You make me laugh when I want to cry",
    "Your smile lights up my darkest days",
    "You understand me without words",
    "You make ordinary moments extraordinary",
    "Your kindness knows no bounds",
    "You believe in me when I don't believe in myself",
    "You are my safe place",
    "Your love makes me a better person",
    "You're my best friend and my soulmate",
    "You make every day feel like Valentine's Day",
    "You see the best in me always",
    "Your hugs heal everything",
  ]

  useEffect(() => {
    const heartInterval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-45),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
          size: 18 + Math.random() * 22,
          emoji: ['💕', '💗', '💖', '💘', '❤️', '💝'][Math.floor(Math.random() * 6)],
        },
      ])
    }, 400)
    const sparkleInterval = setInterval(() => {
      setSparkles((prev) => [
        ...prev.slice(-35),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 2,
        },
      ])
    }, 300)
    return () => {
      clearInterval(heartInterval)
      clearInterval(sparkleInterval)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Heart Pop Game Functions
  const startPopGame = () => {
    setPopGameActive(true)
    setPopScore(0)
    setPopTime(25)
    setPopGameOver(false)
    setPopHearts([])
    handleInteraction({ sound: 'success', haptic: true })
  }

  const popHeart = (heartId) => {
    setPopHearts(prev => prev.filter(h => h.id !== heartId))
    setPopScore(prev => prev + 20)
    handleInteraction({ sound: 'pop', haptic: true })
  }

  // Heart pop game timer and spawning
  useEffect(() => {
    if (!popGameActive || popGameOver) return

    const timer = setInterval(() => {
      setPopTime(prev => {
        if (prev <= 1) {
          setPopGameActive(false)
          setPopGameOver(true)
          handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const heartSpawner = setInterval(() => {
      const heartEmojis = ['💕', '💗', '💖', '💘', '❤️', '💝']
      setPopHearts(prev => [
        ...prev.filter(h => Date.now() - h.spawnTime < 3000).slice(-8),
        {
          id: Date.now() + Math.random(),
          left: 10 + Math.random() * 80,
          top: 10 + Math.random() * 70,
          emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
          spawnTime: Date.now(),
        }
      ])
    }, 700)

    return () => {
      clearInterval(timer)
      clearInterval(heartSpawner)
    }
  }, [popGameActive, popGameOver])

  const bokehSpots = [
    { x: '10%', y: '12%', size: 150, delay: 0 },
    { x: '85%', y: '20%', size: 180, delay: 0.5 },
    { x: '50%', y: '65%', size: 210, delay: 1.0 },
    { x: '15%', y: '72%', size: 130, delay: 0.3 },
    { x: '90%', y: '55%', size: 160, delay: 0.8 },
    { x: '30%', y: '40%', size: 140, delay: 1.3 },
  ]

  return (
    <section
      id="valentines-day"
      className="scroll-mt-20 min-h-[100dvh] relative overflow-x-hidden overflow-y-auto"
      style={{
        background: 'linear-gradient(165deg, #1a0510 0%, #2d0a1f 20%, #3d0f2f 40%, #2d0a1f 60%, #1a0510 80%, #0f0208 100%)',
        backgroundAttachment: 'fixed',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="gradient-overlay" style={{ background: 'linear-gradient(45deg, rgba(255,105,180,0.2), rgba(220,20,60,0.18), rgba(255,20,147,0.2), rgba(255,182,193,0.18))', backgroundSize: '400% 400%' }} />

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
              background: 'radial-gradient(circle, rgba(255,105,180,0.3) 0%, rgba(220,20,60,0.12) 50%, transparent 70%)',
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
            className="absolute animate-heartFloat"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDelay: `${heart.delay}s`,
              animationDuration: '6s',
            }}
          >
            {heart.emoji}
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

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-5 md:px-6 pt-14 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
        {/* Hero */}
        <div
          className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex justify-center gap-2 sm:gap-4 mb-4 text-[3rem] sm:text-[5rem] md:text-[7rem]">
            <span className="animate-heartbeat inline-block">💕</span>
            <span className="animate-heartbeat inline-block" style={{ animationDelay: '0.2s' }}>💗</span>
            <span className="animate-heartbeat inline-block" style={{ animationDelay: '0.4s' }}>💖</span>
          </div>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 tracking-tight px-2"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #ff69b4 20%, #ff1493 40%, #dc143c 60%, #ff69b4 80%, #fff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'textShine 4s ease-in-out infinite',
            }}
          >
            Happy Valentine's Day
          </h1>
          <p className="text-rose-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mt-4 px-2">
            My Love • My Heart • My Everything
          </p>
          <p className="text-rose-200/90 text-base sm:text-lg md:text-xl mt-3">
            February 14 — The day love is celebrated, but for us, it's every day
          </p>
        </div>

        {/* Main love letter */}
        <div
          className="bg-white/[0.08] backdrop-blur-xl rounded-3xl border-2 border-rose-400/30 p-6 sm:p-8 md:p-12 mb-14 shadow-[0_0_60px_rgba(220,20,60,0.3)] animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <div className="text-center mb-6">
            <span className="text-5xl md:text-6xl">💌</span>
          </div>
          <div className="text-rose-50 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed space-y-4 max-w-3xl mx-auto">
            <p>My Dearest Love,</p>
            <p>
              Words feel too small to capture what you mean to me. But on this Valentine's Day, I want to try.
            </p>
            <p>
              You are the rose that blooms in my heart, the promise I make every morning, the warmth in every hug, 
              the sweetness in every moment, and the reason my soul feels complete.
            </p>
            <p>
              This week—these seven days—they were all for you. But honestly? Every day is for you. 
              Every sunrise, every laugh, every quiet moment. You are woven into everything I am.
            </p>
            <p>
              I love you more than chocolate is sweet, more than teddies are soft, more than promises are sacred. 
              I love you more than words can say, more than kisses can show, more than a lifetime can prove.
            </p>
            <p className="font-bold text-rose-100 text-xl md:text-2xl lg:text-3xl">
              But I'll spend forever trying.
            </p>
            <p className="text-right italic mt-6">
              Forever yours,<br />
              With all my love 💕
            </p>
          </div>
        </div>

        {/* Why I love you section */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-rose-100 text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
            Why I Love You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {LOVE_REASONS.map((reason, idx) => (
              <div
                key={idx}
                className="bg-white/[0.07] backdrop-blur-xl rounded-2xl border border-rose-400/20 p-5 md:p-6 text-center hover:border-rose-400/50 hover:bg-rose-500/10 hover:-translate-y-1 transition-all duration-300 animate-fadeUpIn opacity-0"
                style={{ animationDelay: `${0.7 + idx * 0.05}s`, animationFillMode: 'forwards' }}
              >
                <span className="text-3xl mb-3 block">💕</span>
                <p className="text-rose-100 text-sm md:text-base leading-relaxed">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Secret message reveal */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}
        >
          <div className="text-center">
            <button
              type="button"
              onClick={() => setRevealedMessage(!revealedMessage)}
              className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-rose-500/40 to-pink-500/40 border-2 border-rose-400/50 text-rose-50 font-bold text-lg sm:text-xl md:text-2xl shadow-lg hover:from-rose-500/50 hover:to-pink-500/50 hover:scale-105 active:scale-100 transition-all duration-300"
            >
              {revealedMessage ? '💕 Hide My Secret Message' : '💌 Reveal My Secret Message'}
            </button>
            {revealedMessage && (
              <div className="mt-6 bg-gradient-to-b from-rose-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border-2 border-rose-400/40 p-6 sm:p-8 md:p-10 animate-fadeUpIn">
                <p className="text-rose-50 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
                  You are my today and all of my tomorrows.
                </p>
                <p className="text-rose-100 text-lg sm:text-xl md:text-2xl mt-4">
                  I choose you. I'll always choose you. 💕
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Hearts row */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-14 flex-wrap">
          {['💕', '💗', '💖', '💘', '❤️', '💝', '💕', '💗', '💖', '💘', '❤️', '💝'].map((e, i) => (
            <span
              key={i}
              className="text-3xl sm:text-4xl md:text-5xl animate-heartbeat inline-block"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {e}
            </span>
          ))}
        </div>

        {/* Week recap */}
        <div
          className="bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-md rounded-3xl border border-rose-400/25 p-6 sm:p-8 md:p-10 mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}
        >
          <h3 className="text-rose-100 text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
            Our Valentine's Week Journey
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {[
              { emoji: '🌹', day: 'Rose Day' },
              { emoji: '💍', day: 'Propose Day' },
              { emoji: '🍫', day: 'Chocolate Day' },
              { emoji: '🧸', day: 'Teddy Day' },
              { emoji: '🤝', day: 'Promise Day' },
              { emoji: '🤗', day: 'Hug Day' },
              { emoji: '💋', day: 'Kiss Day' },
              { emoji: '💕', day: "Valentine's" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.06] border border-rose-400/20 hover:bg-rose-500/10 hover:scale-105 transition-all duration-300"
              >
                <span className="text-4xl md:text-5xl mb-2">{item.emoji}</span>
                <span className="text-rose-100 text-xs sm:text-sm font-medium text-center">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Heart Pop Game */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.65s', animationFillMode: 'forwards' }}
        >
          <div className="bg-gradient-to-br from-rose-900/20 to-pink-900/15 backdrop-blur-xl rounded-3xl border-2 border-rose-400/30 p-6 sm:p-8 md:p-10 relative overflow-hidden">
            <h3 className="text-rose-100 text-2xl md:text-3xl font-bold text-center mb-3">
              💕 Pop the Hearts Game
            </h3>
            <p className="text-rose-200/90 text-center text-sm md:text-base mb-6">
              Click the hearts before they disappear! Each heart is worth 20 love points! 💖
            </p>

            {!popGameActive && !popGameOver && (
              <div className="text-center py-8">
                <div className="flex justify-center gap-2 mb-4">
                  {['💕', '💗', '💖', '💘'].map((e, i) => (
                    <span key={i} className="text-6xl animate-heartbeat" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
                  ))}
                </div>
                <p className="text-rose-100 text-lg mb-6">Pop as many hearts as you can!</p>
                <button
                  type="button"
                  onClick={startPopGame}
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-rose-500/40 to-pink-500/40 hover:from-rose-500/50 hover:to-pink-500/50 border-2 border-rose-400/50 text-rose-50 font-bold text-xl md:text-2xl shadow-lg hover:scale-105 active:scale-100 transition-all duration-300"
                >
                  💖 Start Game
                </button>
              </div>
            )}

            {popGameActive && (
              <div>
                {/* Game HUD */}
                <div className="flex justify-between items-center mb-6 bg-white/[0.08] rounded-xl p-4 border border-rose-400/30">
                  <div className="text-center">
                    <p className="text-rose-200/80 text-sm mb-1">Score</p>
                    <p className="text-3xl font-bold text-rose-300">{popScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-rose-200/80 text-sm mb-1">Time</p>
                    <p className="text-3xl font-bold text-rose-300">{popTime}s</p>
                  </div>
                </div>

                {/* Game area */}
                <div className="relative bg-gradient-to-br from-rose-950/40 to-pink-950/30 rounded-2xl border-2 border-rose-400/20 h-80 sm:h-96 overflow-hidden">
                  {popHearts.map(heart => (
                    <button
                      key={heart.id}
                      type="button"
                      onClick={() => popHeart(heart.id)}
                      className="absolute cursor-pointer transition-all hover:scale-125 active:scale-75 animate-heartbeat"
                      style={{
                        left: `${heart.left}%`,
                        top: `${heart.top}%`,
                        filter: 'drop-shadow(0 4px 12px rgba(255,105,180,0.8))',
                      }}
                    >
                      <span className="text-5xl sm:text-6xl">{heart.emoji}</span>
                    </button>
                  ))}
                  {popHearts.length === 0 && !popGameOver && (
                    <div className="absolute inset-0 flex items-center justify-center text-rose-200/50 text-lg">
                      Click the hearts as they appear!
                    </div>
                  )}
                </div>
              </div>
            )}

            {popGameOver && (
              <div className="text-center py-8 animate-fadeUpIn">
                <p className="text-7xl mb-4">🏆</p>
                <p className="text-rose-50 text-3xl md:text-4xl font-bold mb-3">Game Over!</p>
                <p className="text-rose-100 text-2xl md:text-3xl mb-6">
                  Love Points: <span className="text-rose-300 font-bold">{popScore}</span>
                </p>
                <p className="text-rose-200/90 text-base md:text-lg mb-6">
                  {popScore >= 400 ? '🔥 Incredible! You caught every bit of love!' :
                   popScore >= 250 ? '💖 Amazing! Your reflexes match your love!' :
                   popScore >= 150 ? '💕 Great job! Love is in the air!' :
                   '💗 Every heart you popped shows your love!'}
                </p>
                <button
                  type="button"
                  onClick={startPopGame}
                  className="px-8 py-4 rounded-2xl bg-rose-500/40 hover:bg-rose-500/50 border-2 border-rose-400/50 text-rose-50 font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300"
                >
                  🔄 Play Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Final message */}
        <div
          className="bg-gradient-to-b from-rose-500/20 via-pink-500/15 to-transparent rounded-3xl p-8 sm:p-10 md:p-14 border-2 border-rose-400/30 text-center shadow-2xl animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}
        >
          <p className="text-rose-50 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-loose max-w-3xl mx-auto font-medium mb-6">
            Seven days to say I love you.<br />
            But one lifetime won't be enough to show it.<br />
            So here's to forever—<br />
            <span className="text-rose-200 text-2xl sm:text-3xl md:text-4xl font-bold block mt-4">
              starting today, never ending. 💕
            </span>
          </p>
          <p className="text-rose-100 text-2xl sm:text-3xl md:text-4xl font-bold mt-8 mb-6">
            Happy Valentine's Day, My Love
          </p>
          <div className="flex justify-center gap-3 sm:gap-5 text-5xl sm:text-6xl md:text-7xl">
            <span className="animate-heartbeat">💕</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.2s' }}>💗</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.4s' }}>💖</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.6s' }}>💕</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValentinesDay
