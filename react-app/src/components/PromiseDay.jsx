import { useEffect, useState } from 'react'
import { handleInteraction } from '../utils/interactions'

function PromiseDay() {
  const [sparkles, setSparkles] = useState([])
  const [heroVisible, setHeroVisible] = useState(false)
  const [promises, setPromises] = useState(new Set())
  const [lovePercentage, setLovePercentage] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  // Lock & Key Matching Game
  const [lockKeyGameStarted, setLockKeyGameStarted] = useState(false)
  const [lockKeyPairs, setLockKeyPairs] = useState([])
  const [selectedLock, setSelectedLock] = useState(null)
  const [selectedKey, setSelectedKey] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([])
  const [lockKeyScore, setLockKeyScore] = useState(0)
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [lockKeyGameOver, setLockKeyGameOver] = useState(false)

  const PROMISES = [
    { id: 1, text: "I promise to love you through every season", emoji: "🌸" },
    { id: 2, text: "I promise to hold your hand through every storm", emoji: "⛈️" },
    { id: 3, text: "I promise to make you smile every single day", emoji: "😊" },
    { id: 4, text: "I promise to be your safe place, always", emoji: "🏡" },
    { id: 5, text: "I promise to choose you, over and over again", emoji: "💍" },
    { id: 6, text: "I promise to grow old with you", emoji: "👴👵" },
    { id: 7, text: "I promise to cherish every moment we share", emoji: "⏰" },
    { id: 8, text: "I promise to never let you feel alone", emoji: "🤝" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => [
        ...prev.slice(-35),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 2,
          size: 15 + Math.random() * 15,
        },
      ])
    }, 350)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const togglePromise = (id) => {
    const newSet = new Set(promises)
    if (newSet.has(id)) {
      newSet.delete(id)
      handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
    } else {
      newSet.add(id)
      handleInteraction({ sound: 'success', haptic: true })
    }
    setPromises(newSet)
  }

  const calculateLove = () => {
    setIsCalculating(true)
    handleInteraction({ sound: 'heart', haptic: true })
    
    // Base percentage starts at 85% (because we already love them!)
    let percentage = 85
    
    // Add points for sealed promises (each adds ~1.5%)
    percentage += promises.size * 1.5
    
    // Add random factor (0-3%) for fun
    percentage += Math.random() * 3
    
    // Cap at 100%
    percentage = Math.min(100, percentage)
    
    // Animate the calculation
    setTimeout(() => {
      setLovePercentage(Math.floor(percentage))
      setIsCalculating(false)
      if (percentage >= 99) {
        handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
      }
    }, 2000)
  }

  // Lock & Key Matching Game Functions
  const LOCK_KEY_PAIRS = [
    { id: 1, lock: '🔒', key: '🔑', promise: 'Love', action: 'Care' },
    { id: 2, lock: '🔒', key: '🔑', promise: 'Trust', action: 'Honesty' },
    { id: 3, lock: '🔒', key: '🔑', promise: 'Support', action: 'Listen' },
    { id: 4, lock: '🔒', key: '🔑', promise: 'Joy', action: 'Smile' },
    { id: 5, lock: '🔒', key: '🔑', promise: 'Forever', action: 'Commit' },
    { id: 6, lock: '🔒', key: '🔑', promise: 'Dream', action: 'Believe' },
  ]

  const startLockKeyGame = () => {
    // Shuffle locks and keys separately
    const shuffledLocks = [...LOCK_KEY_PAIRS].sort(() => Math.random() - 0.5)
    const shuffledKeys = [...LOCK_KEY_PAIRS].sort(() => Math.random() - 0.5)
    
    setLockKeyPairs({ locks: shuffledLocks, keys: shuffledKeys })
    setLockKeyGameStarted(true)
    setSelectedLock(null)
    setSelectedKey(null)
    setMatchedPairs([])
    setLockKeyScore(0)
    setWrongAttempts(0)
    setLockKeyGameOver(false)
    handleInteraction({ sound: 'success', haptic: true })
  }

  const selectLock = (lockId) => {
    if (matchedPairs.includes(lockId)) return
    setSelectedLock(lockId)
    handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
    
    // If key already selected, check match
    if (selectedKey !== null) {
      checkMatch(lockId, selectedKey)
    }
  }

  const selectKey = (keyId) => {
    if (matchedPairs.includes(keyId)) return
    setSelectedKey(keyId)
    handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
    
    // If lock already selected, check match
    if (selectedLock !== null) {
      checkMatch(selectedLock, keyId)
    }
  }

  const checkMatch = (lockId, keyId) => {
    setTimeout(() => {
      if (lockId === keyId) {
        // Match!
        setMatchedPairs(prev => [...prev, lockId])
        setLockKeyScore(prev => prev + 100)
        handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
        
        // Check if all matched
        if (matchedPairs.length + 1 === LOCK_KEY_PAIRS.length) {
          setTimeout(() => {
            setLockKeyGameOver(true)
          }, 800)
        }
      } else {
        // No match
        setWrongAttempts(prev => prev + 1)
        handleInteraction({ sound: 'pop', haptic: true })
      }
      
      setSelectedLock(null)
      setSelectedKey(null)
    }, 400)
  }

  const allPromisesSealed = promises.size === PROMISES.length

  const bokehSpots = [
    { x: '15%', y: '12%', size: 130, delay: 0 },
    { x: '82%', y: '25%', size: 170, delay: 0.5 },
    { x: '48%', y: '72%', size: 200, delay: 1.1 },
    { x: '20%', y: '80%', size: 120, delay: 0.3 },
    { x: '88%', y: '65%', size: 140, delay: 0.9 },
  ]

  return (
    <section
      id="promise-day"
      className="scroll-mt-20 min-h-[100dvh] relative overflow-x-hidden overflow-y-auto"
      style={{
        background: 'linear-gradient(165deg, #0a0a1a 0%, #0f0f2d 25%, #1a1a3d 50%, #0f0f2d 75%, #0a0a1a 100%)',
        backgroundAttachment: 'fixed',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="gradient-overlay" style={{ background: 'linear-gradient(45deg, rgba(138,43,226,0.15), rgba(75,0,130,0.12), rgba(147,51,234,0.15), rgba(75,0,130,0.12))', backgroundSize: '400% 400%' }} />

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
              background: 'radial-gradient(circle, rgba(138,43,226,0.2) 0%, rgba(75,0,130,0.08) 50%, transparent 70%)',
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              fontSize: `${sparkle.size}px`,
              animationDelay: `${sparkle.delay}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 md:px-6 pt-14 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
        {/* Hero */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-[5rem] sm:text-[8rem] md:text-[12rem] mb-2 inline-block animate-heartbeat">
            🤝
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #dda0dd 30%, #9370db 50%, #fff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Promise Day
          </h1>
          <p className="text-purple-100/90 text-base sm:text-lg md:text-xl mt-2">
            Promises I Keep • February 11
          </p>
        </div>

        {/* Intro */}
        <div
          className="bg-white/[0.06] backdrop-blur-xl rounded-3xl border border-purple-400/25 p-6 sm:p-8 md:p-10 mb-12 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <p className="text-purple-50 text-lg md:text-xl text-center leading-relaxed max-w-2xl mx-auto">
            Promises aren't just words—they're commitments written in the heart. Here are mine to you, today and every day forward. 💜
          </p>
        </div>

        {/* Promises to seal */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-purple-100 text-2xl md:text-3xl font-bold text-center mb-4">
            Seal each promise
          </h2>
          <p className="text-purple-200/80 text-center mb-6">Click to seal my promise to you 🔒</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {PROMISES.map((promise) => (
              <button
                key={promise.id}
                type="button"
                onClick={() => togglePromise(promise.id)}
                className={`flex items-center gap-4 p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] text-left ${
                  promises.has(promise.id)
                    ? 'border-purple-400 bg-purple-500/25 shadow-[0_0_24px_rgba(138,43,226,0.3)]'
                    : 'border-purple-400/30 bg-white/[0.06] hover:border-purple-400/60'
                }`}
              >
                <span className="text-3xl md:text-4xl flex-shrink-0">{promise.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-purple-50 text-base md:text-lg leading-relaxed break-words">
                    {promise.text}
                  </p>
                </div>
                <span className="text-2xl flex-shrink-0">
                  {promises.has(promise.id) ? '🔒' : '🔓'}
                </span>
              </button>
            ))}
          </div>
          {allPromisesSealed && (
            <div className="mt-6 p-6 rounded-2xl border-2 border-purple-400/40 bg-purple-500/20 text-center animate-fadeUpIn">
              <p className="text-purple-50 text-xl md:text-2xl font-bold mb-2">
                All promises sealed! 💜
              </p>
              <p className="text-purple-100 text-base md:text-lg">
                Forever and always, these are my vows to you.
              </p>
            </div>
          )}
        </div>

        {/* Love Calculator */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
        >
          <div className="bg-white/[0.08] backdrop-blur-xl rounded-3xl border-2 border-purple-400/30 p-6 sm:p-8 md:p-10 text-center">
            <h2 className="text-purple-100 text-2xl md:text-3xl font-bold mb-4">
              💜 Love Calculator 💜
            </h2>
            <p className="text-purple-200/90 text-sm md:text-base mb-6">
              Calculate our love compatibility based on promises sealed!
            </p>
            
            {lovePercentage === null ? (
              <button
                type="button"
                onClick={calculateLove}
                disabled={isCalculating}
                className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-purple-500/30 border-2 border-purple-400/50 text-purple-50 font-bold text-lg sm:text-xl shadow-lg hover:bg-purple-500/40 hover:scale-105 active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isCalculating ? '💫 Calculating...' : '✨ Calculate Our Love'}
              </button>
            ) : (
              <div className="animate-fadeUpIn">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6">
                  <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="rgba(147,51,234,0.2)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="url(#loveGradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                      strokeDashoffset={2 * Math.PI * 52 * (1 - lovePercentage / 100)}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="loveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl sm:text-6xl font-bold text-purple-100">{lovePercentage}%</span>
                    <span className="text-purple-200/90 text-sm mt-1">Love Match</span>
                  </div>
                </div>
                
                <div className="bg-purple-500/15 rounded-2xl border border-purple-400/30 p-6 mb-6">
                  <p className="text-purple-50 text-xl md:text-2xl font-bold mb-2">
                    {lovePercentage >= 99 ? '🔥 Perfect Match! 🔥' :
                     lovePercentage >= 95 ? '💜 Soulmates! 💜' :
                     lovePercentage >= 90 ? '✨ Made For Each Other! ✨' :
                     '💕 Beautiful Together! 💕'}
                  </p>
                  <p className="text-purple-100/90 text-sm md:text-base">
                    {lovePercentage >= 99 ? 'Absolutely perfect! Our love is infinite and unbreakable.' :
                     lovePercentage >= 95 ? 'Nearly perfect! Our hearts beat as one.' :
                     lovePercentage >= 90 ? 'Amazing connection! Our love grows stronger every day.' :
                     'Our love is pure and beautiful. Every promise makes it stronger!'}
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setLovePercentage(null)
                    handleInteraction({ sound: 'click', haptic: true, hapticIntensity: 'light' })
                  }}
                  className="px-6 py-3 rounded-xl bg-purple-500/20 border-2 border-purple-400/40 text-purple-100 font-semibold text-base hover:bg-purple-500/30 transition-all duration-300"
                >
                  🔄 Calculate Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Promise messages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {[
            "A promise made is a promise kept—especially to you.",
            "Words fade. Promises stay. Mine are forever.",
            "I don't promise lightly. But to you, I promise everything.",
            "You have my word. You have my heart. You have me.",
            "Some promises are whispered. Mine are shouted from the soul.",
            "I promise to be yours, in every way that matters.",
          ].map((msg, idx) => (
            <div
              key={idx}
              className="bg-white/[0.07] backdrop-blur-xl rounded-2xl border border-purple-400/20 p-5 md:p-6 text-center hover:border-purple-400/40 hover:-translate-y-1 transition-all duration-300 animate-fadeUpIn opacity-0"
              style={{ animationDelay: `${0.7 + idx * 0.08}s`, animationFillMode: 'forwards' }}
            >
              <span className="text-3xl mb-2 block">🤝</span>
              <p className="text-purple-100 text-sm md:text-base leading-relaxed italic">
                "{msg}"
              </p>
            </div>
          ))}
        </div>

        {/* Promise row */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-14 flex-wrap">
          {['🤝', '✨', '💜', '🤝', '✨', '💜', '🤝', '✨', '💜'].map((e, i) => (
            <span
              key={i}
              className="text-4xl md:text-5xl animate-heartbeat inline-block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {e}
            </span>
          ))}
        </div>

        {/* Lock & Key Matching Game */}
        <div
          className="mb-14 animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.25s', animationFillMode: 'forwards' }}
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/15 backdrop-blur-xl rounded-3xl border-2 border-purple-400/30 p-6 sm:p-8 md:p-10">
            <h3 className="text-purple-100 text-2xl md:text-3xl font-bold text-center mb-2">
              🔐 Lock & Key of Love 🔑
            </h3>
            <p className="text-purple-200/90 text-center text-sm md:text-base mb-6">
              Match each promise (lock 🔒) with its action (key 🔑)!<br />
              <span className="text-purple-300 font-semibold">Select a lock, then its matching key to unlock love!</span>
            </p>

            {!lockKeyGameStarted && !lockKeyGameOver && (
              <div className="text-center py-10">
                <div className="flex justify-center gap-4 mb-6">
                  {['🔒', '🔑', '💜', '🔑', '🔒'].map((e, i) => (
                    <span key={i} className="text-6xl md:text-7xl animate-heartbeat" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
                  ))}
                </div>
                <p className="text-purple-100 text-lg md:text-xl mb-3">Unlock the promises of love!</p>
                <p className="text-purple-200/80 text-sm mb-6">6 pairs to match • Test your connection!</p>
                <button
                  type="button"
                  onClick={startLockKeyGame}
                  className="px-12 py-6 rounded-2xl bg-gradient-to-r from-purple-500/50 to-purple-600/50 hover:from-purple-500/60 hover:to-purple-600/60 border-3 border-purple-300/50 text-white font-bold text-xl md:text-2xl shadow-2xl hover:scale-105 active:scale-100 transition-all duration-300"
                >
                  🔓 Start Matching
                </button>
              </div>
            )}

            {lockKeyGameStarted && !lockKeyGameOver && (
              <div>
                {/* Game HUD */}
                <div className="grid grid-cols-3 gap-3 mb-6 max-w-md mx-auto">
                  <div className="bg-white/[0.1] backdrop-blur-sm rounded-xl p-3 border border-purple-400/30 text-center">
                    <p className="text-purple-200/80 text-xs mb-1">Score</p>
                    <p className="text-2xl md:text-3xl font-bold text-purple-300">{lockKeyScore}</p>
                  </div>
                  <div className="bg-white/[0.1] backdrop-blur-sm rounded-xl p-3 border border-purple-400/30 text-center">
                    <p className="text-purple-200/80 text-xs mb-1">Matched</p>
                    <p className="text-2xl md:text-3xl font-bold text-green-300">{matchedPairs.length}/6</p>
                  </div>
                  <div className="bg-white/[0.1] backdrop-blur-sm rounded-xl p-3 border border-purple-400/30 text-center">
                    <p className="text-purple-200/80 text-xs mb-1">Wrong</p>
                    <p className="text-2xl md:text-3xl font-bold text-red-300">{wrongAttempts}</p>
                  </div>
                </div>

                <div className="max-w-3xl mx-auto">
                  {/* Locks Row */}
                  <div className="mb-4">
                    <p className="text-purple-100 text-base md:text-lg font-semibold text-center mb-3">🔒 Promises (Locks)</p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                      {lockKeyPairs.locks?.map((item) => (
                        <button
                          key={`lock-${item.id}`}
                          type="button"
                          onClick={() => selectLock(item.id)}
                          disabled={matchedPairs.includes(item.id)}
                          className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                            matchedPairs.includes(item.id)
                              ? 'bg-green-500/20 border-green-400/40 opacity-50'
                              : selectedLock === item.id
                              ? 'bg-purple-500/40 border-purple-300 scale-110 shadow-[0_0_20px_rgba(138,43,226,0.5)]'
                              : 'bg-white/[0.05] border-purple-400/30 hover:bg-purple-500/20 hover:scale-105'
                          } disabled:cursor-not-allowed`}
                        >
                          <span className="text-3xl sm:text-4xl block mb-1">{item.lock}</span>
                          <span className="text-purple-100 text-xs font-medium block">{item.promise}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Keys Row */}
                  <div>
                    <p className="text-purple-100 text-base md:text-lg font-semibold text-center mb-3">🔑 Actions (Keys)</p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                      {lockKeyPairs.keys?.map((item) => (
                        <button
                          key={`key-${item.id}`}
                          type="button"
                          onClick={() => selectKey(item.id)}
                          disabled={matchedPairs.includes(item.id)}
                          className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                            matchedPairs.includes(item.id)
                              ? 'bg-green-500/20 border-green-400/40 opacity-50'
                              : selectedKey === item.id
                              ? 'bg-purple-500/40 border-purple-300 scale-110 shadow-[0_0_20px_rgba(138,43,226,0.5)]'
                              : 'bg-white/[0.05] border-purple-400/30 hover:bg-purple-500/20 hover:scale-105'
                          } disabled:cursor-not-allowed`}
                        >
                          <span className="text-3xl sm:text-4xl block mb-1">{item.key}</span>
                          <span className="text-purple-100 text-xs font-medium block">{item.action}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Helper text */}
                  <div className="mt-6 text-center">
                    <p className="text-purple-200/70 text-sm">
                      {selectedLock && !selectedKey ? 'Now select a matching key! 🔑' :
                       selectedKey && !selectedLock ? 'Now select a matching lock! 🔒' :
                       'Select a lock, then its matching key!'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {lockKeyGameOver && (
              <div className="text-center py-10 animate-fadeUpIn">
                <p className="text-8xl mb-6">🏆</p>
                <p className="text-purple-50 text-4xl md:text-5xl font-bold mb-4">All Promises Unlocked!</p>
                
                <div className="max-w-md mx-auto mb-6 bg-white/[0.1] rounded-2xl border border-purple-400/40 p-6">
                  <p className="text-purple-100 text-3xl md:text-4xl mb-4">
                    <span className="text-purple-300 font-bold">{lockKeyScore}</span> points
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-purple-200/70 mb-1">Perfect Matches</p>
                      <p className="text-3xl font-bold text-green-300">6/6</p>
                    </div>
                    <div>
                      <p className="text-purple-200/70 mb-1">Wrong Attempts</p>
                      <p className="text-3xl font-bold text-red-300">{wrongAttempts}</p>
                    </div>
                  </div>
                </div>

                <p className="text-purple-200/90 text-lg md:text-xl mb-6 max-w-lg mx-auto">
                  {wrongAttempts === 0 ? '🎯 Perfect! Every promise unlocked flawlessly - just like our connection!' :
                   wrongAttempts <= 2 ? '💜 Excellent! You know how to keep promises!' :
                   wrongAttempts <= 5 ? '💫 Well done! Every lock found its key!' :
                   '🔐 All promises unlocked - our love opens every door!'}
                </p>

                <button
                  type="button"
                  onClick={startLockKeyGame}
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-500/40 to-purple-600/40 hover:from-purple-500/50 hover:to-purple-600/50 border-2 border-purple-400/50 text-purple-50 font-bold text-lg md:text-xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  🔄 Play Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Closing */}
        <div
          className="bg-gradient-to-b from-purple-500/15 to-transparent rounded-3xl p-8 md:p-12 border border-purple-400/25 text-center shadow-xl animate-fadeUpIn opacity-0"
          style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}
        >
          <p className="text-purple-50 text-lg md:text-2xl leading-loose max-w-2xl mx-auto font-medium">
            A promise is a piece of the future, given today.<br />
            And my future? It's all yours.<br />
            <span className="text-purple-200 text-xl md:text-2xl">Happy Promise Day, my forever. 🤝💜</span>
          </p>
          <p className="text-purple-100 text-xl md:text-2xl font-bold mt-6">
            I promise. Always.
          </p>
          <div className="flex justify-center gap-4 mt-6 text-5xl">
            <span className="animate-heartbeat">🤝</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.2s' }}>💜</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.4s' }}>🤝</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromiseDay
