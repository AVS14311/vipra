import { useEffect, useState, useRef } from 'react'
import { handleInteraction } from '../utils/interactions'

const CHOCOLATE_TYPES = [
  { id: 'dark', emoji: '🍫', name: 'Dark Chocolate', message: 'Rich and deep, like my love for you', cocoa: 85 },
  { id: 'milk', emoji: '🍫', name: 'Milk Chocolate', message: 'Sweet and smooth, like every moment with you', cocoa: 45 },
  { id: 'white', emoji: '🤍', name: 'White Chocolate', message: 'Pure and delicate, like the way you care', cocoa: 0 },
  { id: 'heart', emoji: '💝', name: 'Chocolate Heart', message: 'My heart, wrapped just for you', cocoa: 65 },
]

const CHOCOLATE_SURPRISES = [
  { emoji: '💕', message: 'I love you!' },
  { emoji: '🌹', message: 'A rose for you' },
  { emoji: '💍', message: 'Forever yours' },
  { emoji: '✨', message: 'You sparkle' },
  { emoji: '🥰', message: "You're adorable" },
  { emoji: '💖', message: 'My heart beats for you' },
  { emoji: '🌟', message: "You're my star" },
  { emoji: '💝', message: 'A gift of love' },
  { emoji: '🦋', message: 'You give me butterflies' },
  { emoji: '🎀', message: "You're a gift" },
  { emoji: '💗', message: 'Love you endlessly' },
  { emoji: '🌺', message: "You're beautiful" },
  { emoji: '💘', message: 'Cupid chose you' },
  { emoji: '🎁', message: "You're my treasure" },
  { emoji: '💫', message: 'Magical together' },
]

const TRUFFLE_TOPPINGS = [
  { id: 'sprinkles', emoji: '✨', name: 'Sprinkles' },
  { id: 'nuts', emoji: '🥜', name: 'Crushed Nuts' },
  { id: 'coconut', emoji: '🥥', name: 'Coconut Flakes' },
  { id: 'caramel', emoji: '🍯', name: 'Caramel Drizzle' },
  { id: 'gold', emoji: '⭐', name: 'Gold Dust' },
]

const MOOD_FLAVORS = [
  { mood: 'Happy', emoji: '😊', flavor: 'Milk Chocolate with Caramel', message: 'Sweet and joyful!' },
  { mood: 'Romantic', emoji: '💕', flavor: 'Dark Chocolate with Strawberry', message: 'Passionate and loving!' },
  { mood: 'Playful', emoji: '🎉', flavor: 'White Chocolate with Rainbow Sprinkles', message: 'Fun and colorful!' },
  { mood: 'Cozy', emoji: '☕', flavor: 'Hot Chocolate Truffle', message: 'Warm and comforting!' },
]

const SLOT_SYMBOLS = ['🍫', '💝', '🍰', '🍬', '🍭', '🎂', '🧁', '🍪']

const SLOT_PRIZES = {
  '🍫🍫🍫': { title: 'Triple Chocolate!', message: 'Pure indulgence! You deserve all the chocolate! 🍫💕', points: 100 },
  '💝💝💝': { title: 'Triple Hearts!', message: 'My heart, three times over - all yours! 💝✨', points: 150 },
  '🍰🍰🍰': { title: 'Sweet Jackpot!', message: 'A celebration of sweetness, just like you! 🎉', points: 120 },
  '🍫💝🍫': { title: 'Chocolate Love!', message: 'The perfect combination - chocolate and love! 💕', points: 75 },
  '💝🍫💝': { title: 'Love Sandwich!', message: 'Wrapped in love, filled with chocolate! 🥰', points: 75 },
}

function ChocolateDay() {
  const [chocolates, setChocolates] = useState([])
  const [unwrapped, setUnwrapped] = useState(new Set())
  const [heroVisible, setHeroVisible] = useState(false)
  const [selectedChoco, setSelectedChoco] = useState(null)
  
  // Creative features
  const [customTruffle, setCustomTruffle] = useState({ base: 'dark', toppings: [] })
  const [selectedMood, setSelectedMood] = useState(null)
  const [tastingNotes, setTastingNotes] = useState({ sweetness: 0, richness: 0, smoothness: 0 })
  
  // Slot machine game
  const [slotReels, setSlotReels] = useState(['🍫', '💝', '🍰'])
  const [isSpinning, setIsSpinning] = useState(false)
  const [slotResult, setSlotResult] = useState(null)
  const [totalPoints, setTotalPoints] = useState(0)
  const [spinCount, setSpinCount] = useState(0)
  const spinIntervalRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setChocolates((prev) => [
        ...prev.slice(-25),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
          size: 20 + Math.random() * 15,
        },
      ])
    }, 800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const toggleUnwrap = (id) => {
    const newSet = new Set(unwrapped)
    if (newSet.has(id)) {
      newSet.delete(id)
      handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
    } else {
      newSet.add(id)
      handleInteraction({ sound: 'pop', haptic: true, hapticIntensity: 'medium' })
    }
    setUnwrapped(newSet)
  }

  const toggleTruffleTopping = (toppingId) => {
    handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
    setCustomTruffle(prev => ({
      ...prev,
      toppings: prev.toppings.includes(toppingId)
        ? prev.toppings.filter(t => t !== toppingId)
        : [...prev.toppings, toppingId]
    }))
  }

  // Cleanup slot machine interval on unmount
  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current)
      }
    }
  }, [])

  const spinSlots = () => {
    if (isSpinning || spinIntervalRef.current) return
    
    setIsSpinning(true)
    setSlotResult(null)
    setSpinCount(prev => prev + 1)
    handleInteraction({ sound: 'click', haptic: true })
    
    // Animate spinning
    let spinIterations = 0
    spinIntervalRef.current = setInterval(() => {
      setSlotReels([
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
      ])
      spinIterations++
      
      if (spinIterations >= 15) {
        if (spinIntervalRef.current) {
          clearInterval(spinIntervalRef.current)
          spinIntervalRef.current = null
        }
        
        // Final result
        const finalReels = [
          SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
          SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
          SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        ]
        setSlotReels(finalReels)
        
        // Check for prizes
        const combo = finalReels.join('')
        const prize = SLOT_PRIZES[combo]
        
        setTimeout(() => {
          setIsSpinning(false)
          
          if (prize) {
            setSlotResult(prize)
            setTotalPoints(prev => prev + prize.points)
            handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
          } else {
            // Consolation prizes for any two matching
            if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
              setSlotResult({ title: 'Sweet Match!', message: 'Two of a kind - like us! 💕', points: 25 })
              setTotalPoints(prev => prev + 25)
              handleInteraction({ sound: 'heart', haptic: true })
            } else {
              setSlotResult({ title: 'Try Again!', message: 'Every spin is a chance to win your heart! 💖', points: 5 })
              setTotalPoints(prev => prev + 5)
              handleInteraction({ sound: 'pop', haptic: true, hapticIntensity: 'light' })
            }
          }
        }, 300)
      }
    }, 100)
  }

  const bokehSpots = [
    { x: '10%', y: '15%', size: 100, delay: 0 },
    { x: '85%', y: '20%', size: 150, delay: 0.6 },
    { x: '45%', y: '65%', size: 180, delay: 1.2 },
    { x: '15%', y: '70%', size: 110, delay: 0.3 },
    { x: '90%', y: '80%', size: 130, delay: 1.0 },
  ]

  return (
    <section
      id="chocolate-day"
      className="scroll-mt-20 min-h-[100dvh] relative overflow-x-hidden overflow-y-auto"
      style={{
        background: 'linear-gradient(165deg, #1a0a05 0%, #2d1508 25%, #3d1f0e 50%, #2d1508 75%, #1a0a05 100%)',
        backgroundAttachment: 'fixed',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="gradient-overlay" style={{ background: 'linear-gradient(45deg, rgba(139,69,19,0.2), rgba(210,105,30,0.15), rgba(160,82,45,0.2), rgba(139,69,19,0.15))', backgroundSize: '400% 400%' }} />

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
              background: 'radial-gradient(circle, rgba(139,69,19,0.2) 0%, rgba(101,67,33,0.08) 50%, transparent 70%)',
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Falling chocolates */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {chocolates.map((choco) => (
          <div
            key={choco.id}
            className="absolute animate-heartFloat"
            style={{
              left: `${choco.left}%`,
              fontSize: `${choco.size}px`,
              animationDelay: `${choco.delay}s`,
              animationDuration: '6s',
            }}
          >
            🍫
          </div>
        ))}
      </div>

      {/* Chocolate drips decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[10, 25, 40, 55, 70, 85].map((left, i) => (
          <div
            key={i}
            className="absolute chocolate-drip"
            style={{
              left: `${left}%`,
              top: '-20px',
              width: '8px',
              height: '80px',
              background: 'linear-gradient(180deg, rgba(139,69,19,0.6) 0%, rgba(139,69,19,0.3) 50%, transparent 100%)',
              borderRadius: '0 0 50% 50%',
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 md:px-6 pt-14 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
        {/* Hero */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-[5rem] sm:text-[8rem] md:text-[12rem] mb-2 inline-block animate-heartbeat">
            🍫
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #d2691e 30%, #8b4513 50%, #fff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Chocolate Day
          </h1>
          <p className="text-amber-100/90 text-base sm:text-lg md:text-xl mt-2">
            Sweet like you • February 9
          </p>
        </div>

        {/* Intro */}
        <div
          className="bg-white/[0.06] backdrop-blur-xl rounded-3xl border border-amber-400/25 p-6 sm:p-8 md:p-10 mb-12 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <p className="text-amber-50 text-lg md:text-xl text-center leading-relaxed max-w-2xl mx-auto">
            Life with you is sweeter than chocolate. But since I can't wrap you up and give you back to yourself, here's the next best thing. 🍫
          </p>
        </div>

        {/* Choose your chocolate */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-amber-100 text-2xl md:text-3xl font-bold text-center mb-6">
            Pick your chocolate
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {CHOCOLATE_TYPES.map((choco) => (
              <button
                key={choco.id}
                type="button"
                onClick={() => setSelectedChoco(selectedChoco === choco.id ? null : choco.id)}
                className={`flex flex-col items-center justify-center py-6 px-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedChoco === choco.id
                    ? 'border-amber-400 bg-amber-500/25 shadow-[0_0_24px_rgba(139,69,19,0.4)]'
                    : 'border-amber-400/30 bg-white/[0.06] hover:border-amber-400/60'
                }`}
              >
                <span className="text-5xl md:text-6xl mb-2">{choco.emoji}</span>
                <span className="text-amber-100 font-semibold text-sm md:text-base text-center">{choco.name}</span>
              </button>
            ))}
          </div>
          {selectedChoco && (
            <div className="mt-6 p-6 rounded-2xl border-2 border-amber-400/40 bg-amber-500/15 text-center animate-fadeUpIn">
              <p className="text-amber-50 text-xl md:text-2xl font-medium">
                {CHOCOLATE_TYPES.find((c) => c.id === selectedChoco)?.message}
              </p>
            </div>
          )}
        </div>

        {/* Chocolate Truffle Maker */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <div className="bg-gradient-to-br from-amber-800/15 to-amber-600/10 backdrop-blur-xl rounded-3xl border-2 border-amber-400/30 p-6 sm:p-8 md:p-10">
            <h3 className="text-amber-100 text-2xl md:text-3xl font-bold text-center mb-4">
              🎨 Create Your Custom Truffle
            </h3>
            <p className="text-amber-200/90 text-center text-sm md:text-base mb-6">
              Design the perfect chocolate truffle for your love! 💝
            </p>
            
            {/* Base selection */}
            <div className="mb-6">
              <p className="text-amber-100 text-lg font-semibold mb-3 text-center">Choose Base:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CHOCOLATE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setCustomTruffle(prev => ({ ...prev, base: type.id }))
                      handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
                    }}
                    className={`py-4 px-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      customTruffle.base === type.id
                        ? 'border-amber-400 bg-amber-500/30 scale-105'
                        : 'border-amber-400/30 bg-white/5'
                    }`}
                  >
                    <span className="text-3xl md:text-4xl block mb-1">{type.emoji}</span>
                    <span className="text-amber-100 text-xs font-medium">{type.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings */}
            <div className="mb-6">
              <p className="text-amber-100 text-lg font-semibold mb-3 text-center">Add Toppings:</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {TRUFFLE_TOPPINGS.map((topping) => (
                  <button
                    key={topping.id}
                    type="button"
                    onClick={() => toggleTruffleTopping(topping.id)}
                    className={`py-3 px-2 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      customTruffle.toppings.includes(topping.id)
                        ? 'border-amber-400 bg-amber-500/30 scale-105'
                        : 'border-amber-400/30 bg-white/5'
                    }`}
                  >
                    <span className="text-2xl md:text-3xl block mb-1">{topping.emoji}</span>
                    <span className="text-amber-100 text-xs font-medium leading-tight">{topping.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Truffle preview - Realistic 3D look */}
            <div className="bg-gradient-to-b from-amber-900/20 to-amber-800/10 rounded-3xl border-2 border-amber-400/40 p-8 sm:p-10 md:p-12">
              <p className="text-amber-100 text-xl md:text-2xl font-bold mb-6 text-center">Your Custom Truffle</p>
              
              {/* Decorative plate */}
              <div className="relative max-w-sm mx-auto">
                {/* Plate */}
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent via-white/5 to-white/10 rounded-full blur-sm" />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-full p-8 sm:p-10 shadow-2xl border-2 border-white/20">
                  
                  {/* Truffle base with 3D effect */}
                  <div className="relative">
                    {/* Shadow */}
                    <div className="absolute inset-0 bg-black/30 rounded-full blur-xl transform translate-y-4 scale-90" />
                    
                    {/* Main truffle body */}
                    <div className="relative">
                      {/* Background glow */}
                      <div 
                        className="absolute inset-0 rounded-full blur-2xl opacity-50"
                        style={{
                          background: customTruffle.base === 'white' ? 'rgba(255,255,255,0.3)' :
                                     customTruffle.base === 'milk' ? 'rgba(210,105,30,0.4)' :
                                     'rgba(139,69,19,0.5)',
                        }}
                      />
                      
                      {/* Truffle sphere */}
                      <div 
                        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full flex items-center justify-center transform transition-all duration-500 hover:scale-105"
                        style={{
                          background: customTruffle.base === 'white' 
                            ? 'radial-gradient(circle at 30% 30%, #fffaf0 0%, #fff5ee 30%, #f5deb3 60%, #deb887 100%)'
                            : customTruffle.base === 'milk'
                            ? 'radial-gradient(circle at 30% 30%, #d2691e 0%, #a0522d 40%, #8b4513 70%, #654321 100%)'
                            : customTruffle.base === 'heart'
                            ? 'radial-gradient(circle at 30% 30%, #cd5c5c 0%, #a0522d 40%, #8b4513 70%, #654321 100%)'
                            : 'radial-gradient(circle at 30% 30%, #8b7355 0%, #654321 40%, #3d2817 70%, #2d1810 100%)',
                          boxShadow: `
                            inset -10px -10px 30px rgba(0,0,0,0.4),
                            inset 5px 5px 20px rgba(255,255,255,0.1),
                            0 15px 40px rgba(0,0,0,0.5),
                            0 5px 15px rgba(139,69,19,0.3)
                          `,
                          border: '2px solid rgba(101,67,33,0.3)',
                        }}
                      >
                        {/* Highlight shine */}
                        <div 
                          className="absolute top-[20%] left-[25%] w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-40 blur-md"
                          style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                          }}
                        />
                        
                        {/* Toppings scattered on surface */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full h-full">
                            {customTruffle.toppings.map((toppingId, idx) => {
                              const positions = [
                                { top: '15%', left: '30%', rotate: 15 },
                                { top: '25%', left: '60%', rotate: -20 },
                                { top: '50%', left: '20%', rotate: 30 },
                                { top: '60%', left: '65%', rotate: -15 },
                                { top: '40%', left: '45%', rotate: 5 },
                              ]
                              const pos = positions[idx] || { top: '50%', left: '50%', rotate: 0 }
                              return (
                                <div
                                  key={toppingId}
                                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 animate-float"
                                  style={{
                                    top: pos.top,
                                    left: pos.left,
                                    transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                                    animationDelay: `${idx * 0.2}s`,
                                  }}
                                >
                                  <span className="text-3xl sm:text-4xl md:text-5xl">
                                    {TRUFFLE_TOPPINGS.find(t => t.id === toppingId)?.emoji}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Base reflection */}
                      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-white/5 to-transparent rounded-full blur-sm" />
                    </div>
                  </div>
                  
                </div>

                {/* Paper wrapper underneath */}
                <div className="absolute inset-x-8 sm:inset-x-12 -bottom-4 h-6 bg-gradient-to-b from-amber-700/20 to-amber-800/30 rounded-t-full border-t-2 border-amber-400/20" style={{ clipPath: 'polygon(10% 0%, 90% 0%, 85% 100%, 15% 100%)' }} />
              </div>

              {/* Description with recipe */}
              <div className="mt-8 pt-6 border-t-2 border-amber-400/20">
                <div className="bg-amber-500/10 rounded-xl p-4 sm:p-5">
                  <p className="text-amber-50 text-lg sm:text-xl md:text-2xl font-bold text-center mb-2">
                    {CHOCOLATE_TYPES.find(t => t.id === customTruffle.base)?.name || 'Chocolate'} Truffle
                  </p>
                  {customTruffle.toppings.length > 0 && (
                    <div className="mt-3">
                      <p className="text-amber-200/90 text-sm font-semibold text-center mb-2">Topped with:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {customTruffle.toppings.map(toppingId => {
                          const topping = TRUFFLE_TOPPINGS.find(t => t.id === toppingId)
                          return (
                            <span key={toppingId} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-600/20 border border-amber-400/30 text-amber-100 text-xs sm:text-sm">
                              <span className="text-base">{topping?.emoji}</span>
                              {topping?.name}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {customTruffle.toppings.length === 0 && (
                    <p className="text-amber-200/70 text-sm text-center italic mt-2">
                      Classic and pure - no toppings needed!
                    </p>
                  )}
                </div>
                
                {/* Flavor notes */}
                <div className="mt-4 text-center">
                  <p className="text-amber-200/80 text-sm italic">
                    "{CHOCOLATE_TYPES.find(t => t.id === customTruffle.base)?.message}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mood-Based Flavor Quiz */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.54s', animationFillMode: 'forwards' }}
        >
          <div className="bg-white/[0.08] backdrop-blur-xl rounded-3xl border-2 border-amber-400/30 p-6 sm:p-8 md:p-10">
            <h3 className="text-amber-100 text-2xl md:text-3xl font-bold text-center mb-4">
              💭 What's Your Mood?
            </h3>
            <p className="text-amber-200/90 text-center text-sm md:text-base mb-6">
              Choose your mood and discover your perfect chocolate flavor!
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {MOOD_FLAVORS.map((mood) => (
                <button
                  key={mood.mood}
                  type="button"
                  onClick={() => {
                    setSelectedMood(mood.mood)
                    handleInteraction({ sound: 'success', haptic: true })
                  }}
                  className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedMood === mood.mood
                      ? 'border-amber-400 bg-amber-500/25 shadow-[0_0_24px_rgba(210,105,30,0.4)] scale-105'
                      : 'border-amber-400/30 bg-white/[0.06] hover:border-amber-400/60'
                  }`}
                >
                  <span className="text-5xl md:text-6xl">{mood.emoji}</span>
                  <span className="text-amber-100 font-semibold text-base">{mood.mood}</span>
                </button>
              ))}
            </div>

            {selectedMood && (
              <div className="bg-amber-500/15 border-2 border-amber-400/40 rounded-2xl p-6 animate-fadeUpIn">
                <p className="text-amber-50 text-xl md:text-2xl font-bold text-center mb-2">
                  {MOOD_FLAVORS.find(m => m.mood === selectedMood)?.flavor}
                </p>
                <p className="text-amber-100/90 text-base md:text-lg text-center">
                  {MOOD_FLAVORS.find(m => m.mood === selectedMood)?.message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Chocolate Love Slot Machine */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.58s', animationFillMode: 'forwards' }}
        >
          <div className="bg-gradient-to-br from-amber-900/25 to-amber-800/15 backdrop-blur-xl rounded-3xl border-2 border-amber-400/30 p-6 sm:p-8 md:p-10">
            <h3 className="text-amber-100 text-2xl md:text-3xl font-bold text-center mb-3">
              🎰 Chocolate Love Slot Machine
            </h3>
            <p className="text-amber-200/90 text-center text-sm md:text-base mb-8">
              Spin for sweet combinations and romantic messages! 💕
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-4 sm:gap-8 mb-8">
              <div className="text-center">
                <p className="text-amber-200/80 text-sm mb-1">Spins</p>
                <p className="text-3xl md:text-4xl font-bold text-amber-300">{spinCount}</p>
              </div>
              <div className="text-center">
                <p className="text-amber-200/80 text-sm mb-1">Love Points</p>
                <p className="text-3xl md:text-4xl font-bold text-amber-300">{totalPoints}</p>
              </div>
            </div>

            {/* Slot Machine */}
            <div className="max-w-md mx-auto mb-8">
              {/* Slot display */}
              <div className="bg-gradient-to-b from-amber-900/40 to-amber-800/30 rounded-2xl border-4 border-amber-400/50 p-6 sm:p-8 mb-6 shadow-2xl">
                <div className="flex justify-center items-center gap-3 sm:gap-4 mb-4">
                  {slotReels.map((symbol, idx) => (
                    <div
                      key={idx}
                      className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center bg-white/10 rounded-xl border-4 border-amber-400/40 shadow-inner transition-all duration-100 ${
                        isSpinning ? 'animate-spin-slow' : 'animate-heartbeat'
                      }`}
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, rgba(139,69,19,0.2) 100%)',
                        animationDelay: `${idx * 0.1}s`,
                      }}
                    >
                      <span className="text-5xl sm:text-6xl md:text-7xl">{symbol}</span>
                    </div>
                  ))}
                </div>

                {/* Result message */}
                {slotResult && !isSpinning && (
                  <div className="bg-amber-500/20 border-2 border-amber-400/50 rounded-xl p-4 sm:p-5 animate-fadeUpIn">
                    <p className="text-amber-50 text-xl sm:text-2xl font-bold text-center mb-2">
                      {slotResult.title}
                    </p>
                    <p className="text-amber-100/90 text-base sm:text-lg text-center mb-2">
                      {slotResult.message}
                    </p>
                    <p className="text-amber-300 text-lg font-bold text-center">
                      +{slotResult.points} points! 🌟
                    </p>
                  </div>
                )}
              </div>

              {/* Spin button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={spinSlots}
                  disabled={isSpinning}
                  className="px-10 sm:px-14 py-5 sm:py-6 rounded-2xl bg-gradient-to-r from-amber-500/50 to-amber-600/50 hover:from-amber-500/60 hover:to-amber-600/60 border-4 border-amber-300/50 text-white font-bold text-xl sm:text-2xl md:text-3xl shadow-2xl hover:scale-105 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
                >
                  {isSpinning ? '🎰 Spinning...' : '🎰 SPIN!'}
                </button>
                <p className="text-amber-200/70 text-sm mt-3">
                  {isSpinning ? 'Watch the magic happen!' : 'Click to spin and win sweet prizes!'}
                </p>
              </div>
            </div>

            {/* Prize guide */}
            <div className="bg-white/[0.05] rounded-2xl border border-amber-400/20 p-4 sm:p-5">
              <p className="text-amber-100 text-base font-semibold text-center mb-3">🏆 Prize Guide:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                <div className="flex items-center justify-between px-3 py-2 bg-amber-600/10 rounded-lg">
                  <span>🍫🍫🍫</span>
                  <span className="text-amber-200/80">100 pts</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-amber-600/10 rounded-lg">
                  <span>💝💝💝</span>
                  <span className="text-amber-200/80">150 pts</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-amber-600/10 rounded-lg">
                  <span>🍰🍰🍰</span>
                  <span className="text-amber-200/80">120 pts</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-amber-600/10 rounded-lg">
                  <span>Any 2 Match</span>
                  <span className="text-amber-200/80">25 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unwrap chocolates game */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-amber-100 text-2xl md:text-3xl font-bold text-center mb-4">
            Unwrap your surprises
          </h2>
          <p className="text-amber-200/80 text-center mb-6">Click to unwrap each chocolate 🎁</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
            {CHOCOLATE_SURPRISES.map((surprise, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleUnwrap(i)}
                className="relative aspect-square flex flex-col items-center justify-center bg-white/[0.08] hover:bg-white/[0.12] border border-amber-400/30 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
              >
                <span className="text-4xl md:text-5xl mb-1 transition-transform duration-300 group-hover:scale-110">
                  {unwrapped.has(i) ? surprise.emoji : '🎁'}
                </span>
                {unwrapped.has(i) && (
                  <span className="text-amber-100 text-xs font-medium text-center px-1 leading-tight animate-fadeUpIn">
                    {surprise.message}
                  </span>
                )}
              </button>
            ))}
          </div>
          {unwrapped.size === CHOCOLATE_SURPRISES.length && (
            <div className="mt-6 p-6 rounded-2xl border-2 border-amber-400/40 bg-amber-500/20 text-center animate-fadeUpIn">
              <p className="text-amber-50 text-xl md:text-2xl font-bold mb-2">
                All chocolates unwrapped! 🎉
              </p>
              <p className="text-amber-100 text-base md:text-lg">
                Every sweet surprise is for you, my love 💕
              </p>
            </div>
          )}
        </div>

        {/* Chocolate Tasting Notes */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <div className="bg-gradient-to-br from-amber-800/15 to-amber-600/10 backdrop-blur-xl rounded-3xl border-2 border-amber-400/30 p-6 sm:p-8 md:p-10">
            <h3 className="text-amber-100 text-2xl md:text-3xl font-bold text-center mb-4">
              👅 Chocolate Tasting Experience
            </h3>
            <p className="text-amber-200/90 text-center text-sm md:text-base mb-8">
              Rate the chocolate qualities and see your perfect match!
            </p>
            
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Sweetness slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-amber-100 text-base md:text-lg font-semibold">Sweetness</label>
                  <span className="text-amber-300 text-xl font-bold">{tastingNotes.sweetness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tastingNotes.sweetness}
                  onChange={(e) => {
                    setTastingNotes(prev => ({ ...prev, sweetness: parseInt(e.target.value) }))
                    handleInteraction({ haptic: true, hapticIntensity: 'light' })
                  }}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(90deg, 
                      #d2691e 0%, 
                      #d2691e ${tastingNotes.sweetness}%, 
                      rgba(255,255,255,0.1) ${tastingNotes.sweetness}%, 
                      rgba(255,255,255,0.1) 100%
                    )`,
                  }}
                />
                <div className="flex justify-between text-amber-200/70 text-xs mt-1">
                  <span>Bitter</span>
                  <span>Sweet</span>
                </div>
              </div>

              {/* Richness slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-amber-100 text-base md:text-lg font-semibold">Richness</label>
                  <span className="text-amber-300 text-xl font-bold">{tastingNotes.richness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tastingNotes.richness}
                  onChange={(e) => {
                    setTastingNotes(prev => ({ ...prev, richness: parseInt(e.target.value) }))
                    handleInteraction({ haptic: true, hapticIntensity: 'light' })
                  }}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(90deg, 
                      #8b4513 0%, 
                      #8b4513 ${tastingNotes.richness}%, 
                      rgba(255,255,255,0.1) ${tastingNotes.richness}%, 
                      rgba(255,255,255,0.1) 100%
                    )`,
                  }}
                />
                <div className="flex justify-between text-amber-200/70 text-xs mt-1">
                  <span>Light</span>
                  <span>Rich</span>
                </div>
              </div>

              {/* Smoothness slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-amber-100 text-base md:text-lg font-semibold">Smoothness</label>
                  <span className="text-amber-300 text-xl font-bold">{tastingNotes.smoothness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tastingNotes.smoothness}
                  onChange={(e) => {
                    setTastingNotes(prev => ({ ...prev, smoothness: parseInt(e.target.value) }))
                    handleInteraction({ haptic: true, hapticIntensity: 'light' })
                  }}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(90deg, 
                      #cd853f 0%, 
                      #cd853f ${tastingNotes.smoothness}%, 
                      rgba(255,255,255,0.1) ${tastingNotes.smoothness}%, 
                      rgba(255,255,255,0.1) 100%
                    )`,
                  }}
                />
                <div className="flex justify-between text-amber-200/70 text-xs mt-1">
                  <span>Grainy</span>
                  <span>Silky</span>
                </div>
              </div>

              {/* Tasting result */}
              {(tastingNotes.sweetness > 0 || tastingNotes.richness > 0 || tastingNotes.smoothness > 0) && (
                <div className="mt-8 bg-amber-500/15 border-2 border-amber-400/40 rounded-2xl p-6 animate-fadeUpIn">
                  <p className="text-amber-50 text-xl md:text-2xl font-bold text-center mb-3">
                    Your Perfect Match:
                  </p>
                  <p className="text-3xl md:text-4xl text-center mb-2">
                    {tastingNotes.sweetness > 60 && tastingNotes.smoothness > 60 ? '🤍 White Chocolate' :
                     tastingNotes.sweetness > 50 && tastingNotes.richness < 50 ? '🍫 Milk Chocolate' :
                     tastingNotes.richness > 70 ? '🖤 Extra Dark (85%)' :
                     '🍫 Dark Chocolate'}
                  </p>
                  <p className="text-amber-100/90 text-base md:text-lg text-center">
                    {tastingNotes.sweetness > 60 && tastingNotes.smoothness > 60 ? 'Creamy and delicate, just like you!' :
                     tastingNotes.sweetness > 50 && tastingNotes.richness < 50 ? 'Classic and comforting, pure joy!' :
                     tastingNotes.richness > 70 ? 'Bold and intense, passionate love!' :
                     'Balanced and sophisticated, perfectly us!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chocolate messages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {[
            "You're sweeter than any chocolate I've ever tasted.",
            "Dark, milk, white—doesn't matter. You're my favorite flavor.",
            "Chocolates melt. You make my heart melt.",
            "Every piece I give you is a piece of my heart.",
            "Sugar, cocoa, love—the perfect recipe is you and me.",
            "I'd choose you over chocolate. And that's saying a lot.",
          ].map((msg, idx) => (
            <div
              key={idx}
              className="bg-white/[0.07] backdrop-blur-xl rounded-2xl border border-amber-400/20 p-5 md:p-6 text-center hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 animate-fadeUpIn opacity-0"
              style={{ animationDelay: `${0.8 + idx * 0.08}s`, animationFillMode: 'forwards' }}
            >
              <span className="text-3xl mb-2 block">🍫</span>
              <p className="text-amber-100 text-sm md:text-base leading-relaxed italic">
                "{msg}"
              </p>
            </div>
          ))}
        </div>

        {/* Chocolate row */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-14 flex-wrap">
          {['🍫', '🍫', '🍫', '🍫', '🍫', '🍫', '🍫', '🍫', '🍫'].map((e, i) => (
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
            Sweet doesn't begin to cover it.<br />
            You're the chocolate, the wrapper, the box, and the bow.<br />
            <span className="text-amber-200 text-xl md:text-2xl">Happy Chocolate Day, my sweetest love. 🍫💕</span>
          </p>
          <div className="flex justify-center gap-4 mt-8 text-5xl">
            <span className="animate-heartbeat">🍫</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.2s' }}>💕</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.4s' }}>🍫</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChocolateDay
