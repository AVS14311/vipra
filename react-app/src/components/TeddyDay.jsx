import { useEffect, useState } from 'react'
import { handleInteraction } from '../utils/interactions'

const TEDDY_EMOJIS = ['🧸', '🐻', '🐼', '🐨', '🦊', '🦝', '🐱', '🐶']

function TeddyDay() {
  const [teddies, setTeddies] = useState([])
  const [heroVisible, setHeroVisible] = useState(false)
  const [hugged, setHugged] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  
  // Memory game state
  const [memoryCards, setMemoryCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [isChecking, setIsChecking] = useState(false)

  const TEDDY_SIZES = [
    { id: 'small', emoji: '🧸', size: 'Small', message: 'Fits in your pocket, stays in your heart' },
    { id: 'medium', emoji: '🧸', size: 'Medium', message: 'Perfect for cuddles on the couch' },
    { id: 'large', emoji: '🧸', size: 'Large', message: 'Big enough to hug back' },
    { id: 'giant', emoji: '🧸', size: 'Giant', message: 'Almost as big as my love for you' },
  ]

  // Initialize memory game
  useEffect(() => {
    const pairs = TEDDY_EMOJIS.slice(0, 6)
    const cards = [...pairs, ...pairs]
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
      }))
      .sort(() => Math.random() - 0.5)
    setMemoryCards(cards)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTeddies((prev) => [
        ...prev.slice(-20),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 3,
          rotate: Math.random() * 360,
        },
      ])
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleHug = () => {
    handleInteraction({ sound: 'heart', haptic: true })
    setHugged(true)
    setTimeout(() => setHugged(false), 3000)
  }

  const handleCardClick = (clickedCard) => {
    if (isChecking || flippedCards.length >= 2 || flippedCards.includes(clickedCard.id) || matchedPairs.includes(clickedCard.emoji)) {
      return
    }

    handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
    const newFlipped = [...flippedCards, clickedCard.id]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      const [firstId, secondId] = newFlipped
      const firstCard = memoryCards.find(c => c.id === firstId)
      const secondCard = memoryCards.find(c => c.id === secondId)

      if (firstCard.emoji === secondCard.emoji) {
        // Match found!
        handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
        setMatchedPairs(prev => [...prev, firstCard.emoji])
        setFlippedCards([])
        setIsChecking(false)
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  const resetMemoryGame = () => {
    const pairs = TEDDY_EMOJIS.slice(0, 6)
    const cards = [...pairs, ...pairs]
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
      }))
      .sort(() => Math.random() - 0.5)
    setMemoryCards(cards)
    setFlippedCards([])
    setMatchedPairs([])
  }

  const bokehSpots = [
    { x: '12%', y: '18%', size: 120, delay: 0 },
    { x: '88%', y: '22%', size: 160, delay: 0.7 },
    { x: '50%', y: '68%', size: 190, delay: 1.4 },
    { x: '18%', y: '75%', size: 110, delay: 0.4 },
  ]

  return (
    <section
      id="teddy-day"
      className="scroll-mt-20 min-h-[100dvh] relative overflow-x-hidden overflow-y-auto"
      style={{
        background: 'linear-gradient(165deg, #0f0808 0%, #1a0e0e 25%, #2d1a1a 50%, #1a0e0e 75%, #0f0808 100%)',
        backgroundAttachment: 'fixed',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="gradient-overlay" style={{ background: 'linear-gradient(45deg, rgba(165,42,42,0.15), rgba(139,69,19,0.12), rgba(160,82,45,0.15), rgba(139,69,19,0.12))', backgroundSize: '400% 400%' }} />

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
              background: 'radial-gradient(circle, rgba(165,42,42,0.18) 0%, rgba(139,69,19,0.07) 50%, transparent 70%)',
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating teddies */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {teddies.map((teddy) => (
          <div
            key={teddy.id}
            className="absolute text-3xl md:text-4xl animate-heartFloat"
            style={{
              left: `${teddy.left}%`,
              animationDelay: `${teddy.delay}s`,
              animationDuration: '7s',
              transform: `rotate(${teddy.rotate}deg)`,
            }}
          >
            🧸
          </div>
        ))}
      </div>

      {hugged && (
        <div className="fixed inset-0 z-[20] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeUpIn pointer-events-none">
          <div className="text-center">
            <p className="text-5xl md:text-7xl mb-4 animate-heartbeat">🤗</p>
            <p className="text-3xl md:text-5xl font-bold text-amber-100">
              Hug received! 💕
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 md:px-6 pt-14 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
        {/* Hero */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-[5rem] sm:text-[8rem] md:text-[12rem] mb-2 inline-block animate-roseBreath">
            🧸
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #deb887 30%, #8b4513 50%, #fff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Teddy Day
          </h1>
          <p className="text-amber-100/90 text-base sm:text-lg md:text-xl mt-2">
            Cuddles & You • February 10
          </p>
        </div>

        {/* Intro */}
        <div
          className="bg-white/[0.06] backdrop-blur-xl rounded-3xl border border-amber-400/25 p-6 sm:p-8 md:p-10 mb-12 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <p className="text-amber-50 text-lg md:text-xl text-center leading-relaxed max-w-2xl mx-auto">
            A teddy for comfort, a teddy for warmth. But honestly? You're my favorite thing to hold. This one's just a stand-in for when I can't be there. 🧸💕
          </p>
        </div>

        {/* Pick teddy size */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-amber-100 text-2xl md:text-3xl font-bold text-center mb-6">
            Choose your teddy size
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {TEDDY_SIZES.map((teddy, idx) => (
              <button
                key={teddy.id}
                type="button"
                onClick={() => setSelectedSize(selectedSize === teddy.id ? null : teddy.id)}
                className={`flex flex-col items-center justify-center py-6 px-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedSize === teddy.id
                    ? 'border-amber-400 bg-amber-500/25 shadow-[0_0_24px_rgba(165,42,42,0.4)]'
                    : 'border-amber-400/30 bg-white/[0.06] hover:border-amber-400/60'
                }`}
              >
                <span
                  className="mb-2"
                  style={{
                    fontSize: idx === 0 ? '2rem' : idx === 1 ? '3rem' : idx === 2 ? '4rem' : '5rem',
                  }}
                >
                  {teddy.emoji}
                </span>
                <span className="text-amber-100 font-semibold text-sm md:text-base">{teddy.size}</span>
              </button>
            ))}
          </div>
          {selectedSize && (
            <div className="mt-6 p-6 rounded-2xl border-2 border-amber-400/40 bg-amber-500/15 text-center animate-fadeUpIn">
              <p className="text-amber-50 text-xl md:text-2xl font-medium">
                {TEDDY_SIZES.find((t) => t.id === selectedSize)?.message}
              </p>
            </div>
          )}
        </div>

        {/* Hug button */}
        <div
          className="flex flex-col items-center mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <p className="text-amber-200/90 text-center mb-4">Give your teddy a hug 👇</p>
          <button
            type="button"
            onClick={handleHug}
            className="px-8 py-4 rounded-2xl bg-amber-500/30 border-2 border-amber-400/50 text-amber-50 font-bold text-lg md:text-xl shadow-lg hover:bg-amber-500/40 hover:scale-105 active:scale-100 transition-all duration-300"
          >
            🤗 Hug Me
          </button>
        </div>

        {/* Memory Game */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-amber-100 text-2xl md:text-3xl font-bold text-center mb-4">
            Teddy Memory Game
          </h2>
          <p className="text-amber-200/90 text-center text-sm md:text-base mb-6">
            Match the teddy pairs! Click to flip cards 🎮
          </p>
          
          {/* Memory game grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto mb-6">
            {memoryCards.map((card) => {
              const isFlipped = flippedCards.includes(card.id) || matchedPairs.includes(card.emoji)
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardClick(card)}
                  className={`aspect-square flex items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                    isFlipped
                      ? 'bg-amber-500/25 border-amber-400/50'
                      : 'bg-white/[0.08] border-amber-400/30 hover:bg-white/[0.12] hover:scale-105'
                  } ${matchedPairs.includes(card.emoji) ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
                  disabled={matchedPairs.includes(card.emoji)}
                >
                  <span className="text-4xl sm:text-5xl transition-transform duration-300">
                    {isFlipped ? card.emoji : '🎁'}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Game status */}
          <div className="text-center">
            <p className="text-amber-100 text-lg md:text-xl mb-3">
              Matches Found: {matchedPairs.length} / 6
            </p>
            {matchedPairs.length === 6 && (
              <div className="bg-amber-500/20 backdrop-blur-xl rounded-2xl border-2 border-amber-400/40 p-6 mb-4 animate-fadeUpIn">
                <p className="text-amber-50 text-2xl md:text-3xl font-bold mb-2">
                  🎉 You won! 🎉
                </p>
                <p className="text-amber-100 text-base md:text-lg">
                  All teddy pairs matched perfectly, just like us! 💕
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={resetMemoryGame}
              className="px-6 py-3 rounded-xl bg-amber-500/30 border-2 border-amber-400/50 text-amber-50 font-semibold text-base shadow-lg hover:bg-amber-500/40 hover:scale-105 active:scale-100 transition-all duration-300"
            >
              🔄 New Game
            </button>
          </div>
        </div>

        {/* Teddy messages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {[
            "Soft like a teddy. Strong like your love.",
            "This bear hugs back—but not as good as you do.",
            "Fluffy, warm, forever yours—just like me.",
            "Every teddy reminds me: you're my comfort.",
            "You don't need a teddy. You ARE the cuddle.",
            "This one's stuffed with love. And a little bit of me.",
          ].map((msg, idx) => (
            <div
              key={idx}
              className="bg-white/[0.07] backdrop-blur-xl rounded-2xl border border-amber-400/20 p-5 md:p-6 text-center hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 animate-fadeUpIn opacity-0"
              style={{ animationDelay: `${0.9 + idx * 0.08}s`, animationFillMode: 'forwards' }}
            >
              <span className="text-3xl mb-2 block">🧸</span>
              <p className="text-amber-100 text-sm md:text-base leading-relaxed italic">
                "{msg}"
              </p>
            </div>
          ))}
        </div>

        {/* Teddy row */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-14 flex-wrap">
          {['🧸', '💕', '🧸', '💕', '🧸', '💕', '🧸', '💕', '🧸'].map((e, i) => (
            <span
              key={i}
              className="text-4xl md:text-5xl animate-heartbeat inline-block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {e}
            </span>
          ))}
        </div>

        {/* Closing */}
        <div
          className="bg-gradient-to-b from-amber-500/15 to-transparent rounded-3xl p-8 md:p-12 border border-amber-400/25 text-center shadow-xl animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}
        >
          <p className="text-amber-50 text-lg md:text-2xl leading-loose max-w-2xl mx-auto font-medium">
            This teddy is soft, but you're softer.<br />
            This teddy is warm, but you're warmer.<br />
            This teddy is mine to give—<br />
            <span className="text-amber-200 text-xl md:text-2xl">but you're mine to keep forever. 🧸💕</span>
          </p>
          <p className="text-amber-100 text-xl md:text-2xl font-bold mt-6">
            Happy Teddy Day, my love.
          </p>
          <div className="flex justify-center gap-4 mt-6 text-5xl">
            <span className="animate-heartbeat">🧸</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.2s' }}>💕</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.4s' }}>🧸</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeddyDay
