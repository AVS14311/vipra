import { useEffect, useState, useRef } from 'react'
import { handleInteraction } from '../utils/interactions'

const HUG_ACHIEVEMENTS = [
  { id: 1, count: 5, badge: '🌟', title: 'Hug Starter', message: '5 hugs of warmth!' },
  { id: 2, count: 10, badge: '💫', title: 'Hug Enthusiast', message: '10 hugs of love!' },
  { id: 3, count: 25, badge: '✨', title: 'Hug Master', message: '25 hugs of pure joy!' },
  { id: 4, count: 50, badge: '🏆', title: 'Hug Champion', message: '50 hugs! You are amazing!' },
]

function HugDay() {
  const [hearts, setHearts] = useState([])
  const [heroVisible, setHeroVisible] = useState(false)
  const [hugCount, setHugCount] = useState(0)
  const [showHugMessage, setShowHugMessage] = useState(false)
  const [selectedHugType, setSelectedHugType] = useState('bear')
  const [isHugging, setIsHugging] = useState(false)
  const [hugDuration, setHugDuration] = useState(0)
  const [squeezeIntensity, setSqueezeIntensity] = useState(0)
  const [warmthLevel, setWarmthLevel] = useState(0)
  const [showAchievement, setShowAchievement] = useState(null)
  const [unlockedBadges, setUnlockedBadges] = useState(new Set())
  const [hugMessage, setHugMessage] = useState('')
  const [showMessageSent, setShowMessageSent] = useState(false)
  const hugTimerRef = useRef(null)
  const squeezeIntervalRef = useRef(null)

  const HUG_TYPES = [
    { id: 'bear', emoji: '🤗', name: 'Bear Hug', description: 'Tight and warm, never letting go', intensity: 'heavy' },
    { id: 'side', emoji: '🫂', name: 'Side Hug', description: 'Casual but close, always together', intensity: 'light' },
    { id: 'back', emoji: '💑', name: 'Back Hug', description: 'Wrapped around you, my favorite place', intensity: 'medium' },
    { id: 'long', emoji: '🥰', name: 'Long Hug', description: 'Time stops when I hold you', intensity: 'medium' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
          size: 20 + Math.random() * 20,
        },
      ])
    }, 600)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleHug = () => {
    const hugType = HUG_TYPES.find(h => h.id === selectedHugType)
    handleInteraction({ sound: 'heart', haptic: true, hapticIntensity: hugType?.intensity || 'medium' })
    
    const newCount = hugCount + 1
    setHugCount(newCount)
    setShowHugMessage(true)
    
    // Increase warmth
    setWarmthLevel(prev => Math.min(100, prev + 2))
    
    // Check for achievements
    const achievement = HUG_ACHIEVEMENTS.find(a => a.count === newCount && !unlockedBadges.has(a.id))
    if (achievement) {
      setShowAchievement(achievement)
      setUnlockedBadges(prev => new Set([...prev, achievement.id]))
      handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
      setTimeout(() => setShowAchievement(null), 4000)
    }
    
    setTimeout(() => setShowHugMessage(false), 2000)
  }

  const startSqueeze = () => {
    setIsHugging(true)
    setHugDuration(0)
    setSqueezeIntensity(0)
    
    hugTimerRef.current = setInterval(() => {
      setHugDuration(prev => prev + 0.1)
    }, 100)
    
    squeezeIntervalRef.current = setInterval(() => {
      setSqueezeIntensity(prev => {
        const newValue = Math.min(100, prev + 5)
        if (newValue % 20 === 0 && newValue > 0) {
          handleInteraction({ haptic: true, hapticIntensity: 'light' })
        }
        return newValue
      })
    }, 100)
  }

  const endSqueeze = () => {
    setIsHugging(false)
    if (hugTimerRef.current) clearInterval(hugTimerRef.current)
    if (squeezeIntervalRef.current) clearInterval(squeezeIntervalRef.current)
    
    // Bonus hug if held long enough
    if (hugDuration >= 3) {
      handleInteraction({ sound: 'success', haptic: true })
      setHugCount(prev => prev + 1)
      setWarmthLevel(prev => Math.min(100, prev + 5))
    }
    
    setTimeout(() => {
      setSqueezeIntensity(0)
      setHugDuration(0)
    }, 500)
  }

  const sendHugMessage = () => {
    if (!hugMessage.trim()) return
    
    handleInteraction({ sound: 'success', haptic: true })
    setShowMessageSent(true)
    setTimeout(() => {
      setShowMessageSent(false)
      setHugMessage('')
    }, 3000)
  }

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (hugTimerRef.current) clearInterval(hugTimerRef.current)
      if (squeezeIntervalRef.current) clearInterval(squeezeIntervalRef.current)
    }
  }, [])

  const bokehSpots = [
    { x: '18%', y: '15%', size: 140, delay: 0 },
    { x: '85%', y: '28%', size: 170, delay: 0.6 },
    { x: '50%', y: '70%', size: 190, delay: 1.3 },
    { x: '12%', y: '78%', size: 115, delay: 0.4 },
    { x: '90%', y: '60%', size: 135, delay: 1.0 },
  ]

  return (
    <section
      id="hug-day"
      className="scroll-mt-20 min-h-[100dvh] relative overflow-x-hidden overflow-y-auto"
      style={{
        background: 'linear-gradient(165deg, #1a0a0f 0%, #2d0f1a 25%, #3d1525 50%, #2d0f1a 75%, #1a0a0f 100%)',
        backgroundAttachment: 'fixed',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="gradient-overlay" style={{ background: 'linear-gradient(45deg, rgba(255,105,180,0.18), rgba(255,20,147,0.15), rgba(255,182,193,0.18), rgba(255,105,180,0.15))', backgroundSize: '400% 400%' }} />

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
              background: 'radial-gradient(circle, rgba(255,105,180,0.22) 0%, rgba(255,20,147,0.09) 50%, transparent 70%)',
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
              animationDuration: '5s',
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Warmth glow overlay */}
      {warmthLevel > 0 && (
        <div 
          className="fixed inset-0 pointer-events-none z-[5] transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255,182,193,${warmthLevel / 400}) 0%, transparent 60%)`,
            opacity: warmthLevel / 100,
          }}
        />
      )}

      {showHugMessage && (
        <div className="fixed inset-0 z-[20] flex items-center justify-center pointer-events-none">
          <div className="animate-fadeUpIn bg-pink-500/80 backdrop-blur-md px-8 py-5 rounded-3xl border-2 border-pink-300">
            <p className="text-3xl md:text-4xl font-bold text-white text-center">
              Hug #{hugCount} received! 🤗💕
            </p>
          </div>
        </div>
      )}

      {/* Achievement popup */}
      {showAchievement && (
        <div className="fixed inset-0 z-[25] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none">
          <div className="animate-fadeUpIn bg-gradient-to-r from-pink-500/90 to-rose-500/90 backdrop-blur-md px-10 sm:px-14 py-8 sm:py-10 rounded-3xl border-4 border-white/40 shadow-2xl max-w-md mx-4">
            <p className="text-7xl sm:text-8xl mb-4 text-center animate-heartbeat">{showAchievement.badge}</p>
            <p className="text-3xl sm:text-4xl font-bold text-white text-center mb-2">
              Achievement Unlocked!
            </p>
            <p className="text-xl sm:text-2xl text-white/95 font-semibold text-center mb-1">
              {showAchievement.title}
            </p>
            <p className="text-base sm:text-lg text-white/90 text-center">
              {showAchievement.message}
            </p>
          </div>
        </div>
      )}

      {/* Message sent confirmation */}
      {showMessageSent && (
        <div className="fixed inset-0 z-[20] flex items-center justify-center pointer-events-none">
          <div className="animate-fadeUpIn bg-pink-500/90 backdrop-blur-md px-10 py-6 rounded-3xl border-2 border-white/50">
            <p className="text-4xl mb-2 text-center">💌</p>
            <p className="text-2xl md:text-3xl font-bold text-white text-center">
              Hug Sent! 🤗💕
            </p>
            <p className="text-white/90 text-center mt-2">Your love has been delivered!</p>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 md:px-6 pt-14 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
        {/* Hero */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-[5rem] sm:text-[8rem] md:text-[12rem] mb-2 inline-block animate-roseBreath">
            🤗
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #ffb6c1 30%, #ff69b4 50%, #fff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hug Day
          </h1>
          <p className="text-pink-100/90 text-base sm:text-lg md:text-xl mt-2">
            Hugs For You • February 12
          </p>
        </div>

        {/* Intro */}
        <div
          className="bg-white/[0.06] backdrop-blur-xl rounded-3xl border border-pink-400/25 p-6 sm:p-8 md:p-10 mb-12 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <p className="text-pink-50 text-lg md:text-xl text-center leading-relaxed max-w-2xl mx-auto">
            A hug is the shortest distance between two hearts. And my arms? They were made to hold you. Today, tomorrow, always. 🤗💕
          </p>
        </div>

        {/* Hug Dashboard */}
        <div
          className="mb-12 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Hug Counter */}
            <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl border-2 border-pink-400/30 p-6 text-center">
              <p className="text-pink-100 text-base md:text-lg mb-2">Virtual Hugs Given</p>
              <p className="text-5xl md:text-6xl font-bold text-pink-300">{hugCount}</p>
              
              {/* Achievement Badges */}
              <div className="flex justify-center gap-2 mt-4 flex-wrap">
                {HUG_ACHIEVEMENTS.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`text-2xl transition-all duration-300 ${
                      unlockedBadges.has(achievement.id)
                        ? 'scale-100 opacity-100 animate-heartbeat'
                        : 'scale-75 opacity-30 grayscale'
                    }`}
                    title={unlockedBadges.has(achievement.id) ? achievement.title : `Unlock at ${achievement.count} hugs`}
                  >
                    {achievement.badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Warmth Meter */}
            <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl border-2 border-pink-400/30 p-6">
              <p className="text-pink-100 text-base md:text-lg text-center mb-4">Hug Warmth Level</p>
              <div className="relative w-full h-8 bg-white/10 rounded-full overflow-hidden mb-2">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-500 ease-out rounded-full"
                  style={{
                    width: `${warmthLevel}%`,
                    background: `linear-gradient(90deg, 
                      ${warmthLevel < 33 ? '#ff69b4' : warmthLevel < 66 ? '#ff1493' : '#dc143c'} 0%, 
                      ${warmthLevel < 33 ? '#ff1493' : warmthLevel < 66 ? '#dc143c' : '#c41e3a'} 100%
                    )`,
                    boxShadow: `0 0 ${warmthLevel / 5}px rgba(255,105,180,0.8)`,
                  }}
                />
              </div>
              <p className="text-pink-200/90 text-sm text-center">
                {warmthLevel < 25 ? '🤍 Getting Warm' : 
                 warmthLevel < 50 ? '💗 Feeling Cozy' : 
                 warmthLevel < 75 ? '💖 So Warm!' : 
                 '🔥 Burning with Love!'}
              </p>
              <p className="text-pink-300 text-2xl font-bold text-center mt-2">{warmthLevel}%</p>
            </div>
          </div>

          {/* Quick Hug Button */}
          <div className="text-center mb-6">
            <button
              type="button"
              onClick={handleHug}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500/40 to-rose-500/40 border-2 border-pink-400/50 text-pink-50 font-bold text-xl md:text-2xl shadow-lg hover:from-pink-500/50 hover:to-rose-500/50 hover:scale-105 active:scale-100 transition-all duration-300"
            >
              🤗 Quick Hug
            </button>
          </div>
        </div>

        {/* Interactive Hug Type Selector */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-pink-100 text-2xl md:text-3xl font-bold text-center mb-4">
            Choose Your Hug Style
          </h2>
          <p className="text-pink-200/90 text-center text-sm md:text-base mb-6">
            Select a hug type and give it your way! ✨
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
            {HUG_TYPES.map((hug) => (
              <button
                key={hug.id}
                type="button"
                onClick={() => {
                  setSelectedHugType(hug.id)
                  handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
                }}
                className={`flex flex-col items-center gap-3 p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedHugType === hug.id
                    ? 'border-pink-400 bg-pink-500/25 shadow-[0_0_24px_rgba(255,105,180,0.4)] scale-105'
                    : 'border-pink-400/30 bg-white/[0.06] hover:border-pink-400/60'
                }`}
              >
                <span className={`text-5xl md:text-6xl transition-transform duration-300 ${selectedHugType === hug.id ? 'animate-heartbeat' : ''}`}>
                  {hug.emoji}
                </span>
                <div className="text-center">
                  <h3 className="text-pink-100 font-bold text-base md:text-lg mb-1">{hug.name}</h3>
                  <p className="text-pink-200/70 text-xs md:text-sm leading-tight">{hug.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Squeeze Meter (Press and Hold) */}
          <div className="bg-white/[0.08] backdrop-blur-xl rounded-3xl border-2 border-pink-400/30 p-6 sm:p-8 md:p-10">
            <h3 className="text-pink-100 text-xl md:text-2xl font-bold text-center mb-4">
              💪 Squeeze Meter
            </h3>
            <p className="text-pink-200/90 text-center text-sm md:text-base mb-6">
              Press and hold to squeeze tighter! Hold for 3+ seconds for a bonus hug! 🤗
            </p>
            
            <div className="max-w-md mx-auto mb-6">
              <div className="relative w-full h-12 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-100 ease-out rounded-full bg-gradient-to-r from-pink-400 to-rose-500"
                  style={{
                    width: `${squeezeIntensity}%`,
                    boxShadow: squeezeIntensity > 50 ? '0 0 20px rgba(255,105,180,0.8)' : 'none',
                  }}
                />
                {squeezeIntensity > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg drop-shadow-lg">{squeezeIntensity}%</span>
                  </div>
                )}
              </div>
              
              {hugDuration > 0 && (
                <p className="text-pink-200 text-center text-sm mb-4">
                  ⏱️ Holding for: <span className="font-bold">{hugDuration.toFixed(1)}s</span>
                  {hugDuration >= 3 && <span className="text-pink-300 ml-2">✨ Bonus unlocked!</span>}
                </p>
              )}
            </div>

            <div className="text-center">
              <button
                type="button"
                onMouseDown={startSqueeze}
                onMouseUp={endSqueeze}
                onMouseLeave={endSqueeze}
                onTouchStart={startSqueeze}
                onTouchEnd={endSqueeze}
                className={`px-8 sm:px-12 md:px-16 py-5 sm:py-6 md:py-8 rounded-2xl sm:rounded-3xl font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-2xl transition-all duration-200 select-none whitespace-nowrap ${
                  isHugging
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 scale-95 text-white border-4 border-white/50'
                    : 'bg-gradient-to-r from-pink-500/40 to-rose-500/40 hover:from-pink-500/50 hover:to-rose-500/50 text-pink-50 border-2 border-pink-400/50 hover:scale-105'
                }`}
              >
                <span className="hidden sm:inline">{isHugging ? '🤗 Squeezing...' : '🤗 Press & Hold to Hug'}</span>
                <span className="sm:hidden">{isHugging ? '🤗 Squeezing...' : '🤗 Hold to Hug'}</span>
              </button>
              <p className="text-pink-200/70 text-xs sm:text-sm mt-3">
                {isHugging ? 'Keep holding for a tighter hug!' : 'Press and hold with your mouse or finger'}
              </p>
            </div>
          </div>
        </div>

        {/* Virtual Hug Sender */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-xl rounded-3xl border-2 border-pink-400/30 p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6">
              <span className="text-5xl md:text-6xl mb-3 block">💌</span>
              <h3 className="text-pink-100 text-2xl md:text-3xl font-bold mb-2">
                Send a Virtual Hug
              </h3>
              <p className="text-pink-200/90 text-sm md:text-base">
                Add a personal message to your hug 💕
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <textarea
                value={hugMessage}
                onChange={(e) => setHugMessage(e.target.value)}
                placeholder="Write your hug message here... e.g., 'Sending you the warmest hug today! You mean everything to me. 🤗💕'"
                className="w-full px-4 sm:px-6 py-4 sm:py-5 rounded-2xl bg-white/10 border-2 border-pink-400/30 focus:border-pink-400/60 focus:outline-none text-pink-50 placeholder-pink-200/50 text-base sm:text-lg resize-none transition-all duration-300"
                rows="4"
                maxLength="500"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-pink-200/70 text-sm">
                  {hugMessage.length}/500 characters
                </span>
                <button
                  type="button"
                  onClick={sendHugMessage}
                  disabled={!hugMessage.trim()}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-pink-500/40 to-rose-500/40 hover:from-pink-500/50 hover:to-rose-500/50 border-2 border-pink-400/50 text-pink-50 font-bold text-base sm:text-lg shadow-lg hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
                >
                  📨 Send Hug
                </button>
              </div>
            </div>

            {/* Quick message suggestions */}
            <div className="mt-6 pt-6 border-t border-pink-400/20">
              <p className="text-pink-200/80 text-sm text-center mb-3">Quick suggestions:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "I'm here for you 🤗",
                  "Sending warm hugs your way! 💕",
                  "You're amazing! *big hug*",
                  "Missing you! Here's a virtual hug 🤗",
                  "Hugs make everything better 💖",
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setHugMessage(suggestion)
                      handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
                    }}
                    className="px-4 py-2.5 sm:py-3 rounded-lg bg-white/5 hover:bg-pink-500/20 border border-pink-400/20 hover:border-pink-400/40 text-pink-100 text-xs sm:text-sm transition-all duration-300 hover:scale-105 min-h-[44px]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hug messages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {[
            "Your hug is my favorite place in the world.",
            "I could stay in your arms forever and still want more.",
            "A hug from you makes everything better.",
            "No matter how bad the day, your hug fixes it all.",
            "My arms were made to hold you—perfectly.",
            "Every hug with you feels like coming home.",
          ].map((msg, idx) => (
            <div
              key={idx}
              className="bg-white/[0.07] backdrop-blur-xl rounded-2xl border border-pink-400/20 p-5 md:p-6 text-center hover:border-pink-400/40 hover:-translate-y-1 transition-all duration-300 animate-fadeUpIn opacity-0"
              style={{ animationDelay: `${0.8 + idx * 0.08}s`, animationFillMode: 'forwards' }}
            >
              <span className="text-3xl mb-2 block">🤗</span>
              <p className="text-pink-100 text-sm md:text-base leading-relaxed italic">
                "{msg}"
              </p>
            </div>
          ))}
        </div>

        {/* Hug row */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-14 flex-wrap">
          {['🤗', '💕', '🫂', '💕', '🤗', '💕', '🫂', '💕', '🤗'].map((e, i) => (
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
          className="bg-gradient-to-b from-pink-500/15 to-transparent rounded-3xl p-8 md:p-12 border border-pink-400/25 text-center shadow-xl animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}
        >
          <p className="text-pink-50 text-lg md:text-2xl leading-loose max-w-2xl mx-auto font-medium">
            Words can say a lot.<br />
            But a hug? A hug says everything.<br />
            <span className="text-pink-200 text-xl md:text-2xl">Happy Hug Day, my forever embrace. 🤗💕</span>
          </p>
          <p className="text-pink-100 text-xl md:text-2xl font-bold mt-6">
            Come here. Let me hold you.
          </p>
          <div className="flex justify-center gap-4 mt-6 text-5xl">
            <span className="animate-heartbeat">🤗</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.2s' }}>💕</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.4s' }}>🤗</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HugDay
