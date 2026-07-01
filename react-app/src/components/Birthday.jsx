import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Confetti from './Confetti'

const BIRTHDAY_DAYS = [
  { day: 1, name: 'Day 1', date: 'July 2', emoji: '🎁', short: 'A little surprise to start', path: '/bday-surprise' },
  { day: 2, name: 'Day 2', date: 'July 3', emoji: '🍩', short: 'Sweets for my sweet', path: '/bday-treat' },
  { day: 3, name: 'Day 3', date: 'July 4', emoji: '🎬', short: 'Your favorite films', path: '/bday-movie' },
  { day: 4, name: 'Day 4', date: 'July 5', emoji: '🍷', short: 'A special evening out', path: '/bday-date' },
  { day: 5, name: 'Day 5', date: 'July 6', emoji: '🧸', short: 'Snuggles and warmth', path: '/bday-cuddle' },
  { day: 6, name: 'Day 6', date: 'July 7', emoji: '✨', short: 'The anticipation builds', path: '/bday-eve' },
  { day: 7, name: 'Day 7', date: 'July 8', emoji: '🎂', short: 'Happy Birthday!', path: '/bday-main' },
]

function Birthday() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [balloons, setBalloons] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)

  // July 8th birthday date setup
  const birthdayDate = '2026-07-08' // We use July 8 for the date, year will be ignored for matching next occurrence

  useEffect(() => {
    // Balloon interval
    const balloonInterval = setInterval(() => {
      setBalloons((prev) => [
        ...prev.slice(-15),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
        },
      ])
    }, 800)
    
    // Sparkle interval
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
      clearInterval(balloonInterval)
      clearInterval(sparkleInterval)
    }
  }, [])

  useEffect(() => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 200) // brief burst of confetti on load
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const [year, month, day] = birthdayDate.split('-').map(Number)
      
      const thisYearBirthday = new Date(now.getFullYear(), month - 1, day, 0, 0, 0, 0)
      const nextYearBirthday = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0, 0)
      
      let nextBirthday = thisYearBirthday
      if (thisYearBirthday <= now) {
        nextBirthday = nextYearBirthday
      }

      const difference = nextBirthday - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [birthdayDate])

  return (
    <section id="birthday" className="scroll-mt-20 p-5 max-w-6xl mx-auto w-full relative overflow-hidden">
      {/* Background animations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="absolute text-4xl animate-float"
            style={{
              left: `${balloon.left}%`,
              animationDelay: `${balloon.delay}s`,
              animationDuration: '6s',
              bottom: '-10%',
            }}
          >
            🎈
          </div>
        ))}
      </div>
      <div className="fixed inset-0 pointer-events-none z-0">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute text-2xl animate-sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Special Birthday Message Section */}
        <div className="text-center my-6 md:my-12 py-8 md:py-12 px-4 md:px-6 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 backdrop-blur-md rounded-2xl md:rounded-3xl border-2 md:border-4 border-white/30 shadow-2xl animate-fadeInUp">
          <h1 className="text-white text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold my-2 md:my-4 break-words drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] leading-tight animate-pulse">
            Happy Birthday! 🎂
          </h1>
          <h2 className="text-white text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-bold my-2 md:my-3 break-words drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] leading-tight">
            To the most special person in my life 💖
          </h2>
          <div className="text-4xl sm:text-5xl md:text-6xl my-6 animate-heartbeat flex justify-center gap-4 flex-wrap">
            <span>🎉</span>
            <span>🎁</span>
            <span>🥳</span>
            <span>👑</span>
            <span>🎈</span>
          </div>
        </div>

        <Confetti trigger={showConfetti} />

        {/* Countdown */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-10 border-2 md:border-4 border-white/30 shadow-2xl my-8 md:my-12 mx-2 sm:mx-0 animate-fadeInUp" style={{animationDelay: "0.2s"}}>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
            ⏳ Countdown to July 8th ⏳
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-gradient-to-b from-white/20 to-white/5 rounded-2xl p-4 md:p-8 text-center border border-white/20 shadow-lg">
              <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 drop-shadow-md">
                {timeLeft.days}
              </div>
              <div className="text-base sm:text-lg md:text-xl text-white/90 font-medium uppercase tracking-wider">Days</div>
            </div>
            <div className="bg-gradient-to-b from-white/20 to-white/5 rounded-2xl p-4 md:p-8 text-center border border-white/20 shadow-lg">
              <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 drop-shadow-md">
                {timeLeft.hours}
              </div>
              <div className="text-base sm:text-lg md:text-xl text-white/90 font-medium uppercase tracking-wider">Hours</div>
            </div>
            <div className="bg-gradient-to-b from-white/20 to-white/5 rounded-2xl p-4 md:p-8 text-center border border-white/20 shadow-lg">
              <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 drop-shadow-md">
                {timeLeft.minutes}
              </div>
              <div className="text-base sm:text-lg md:text-xl text-white/90 font-medium uppercase tracking-wider">Minutes</div>
            </div>
            <div className="bg-gradient-to-b from-white/20 to-white/5 rounded-2xl p-4 md:p-8 text-center border border-white/20 shadow-lg">
              <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 drop-shadow-md">
                {timeLeft.seconds}
              </div>
              <div className="text-base sm:text-lg md:text-xl text-white/90 font-medium uppercase tracking-wider">Seconds</div>
            </div>
          </div>
        </div>

        {/* Birthday Week Grid */}
        <h2 className="text-white text-2xl md:text-3xl font-bold text-center my-10 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] animate-fadeInUp">
          Birthday Week — July 2 to July 8
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 my-6 md:my-10">
          {BIRTHDAY_DAYS.map((item, idx) => {
            const cardClass = "bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl p-5 md:p-6 text-center animate-fadeInUp hover:scale-105 transition-transform duration-300 border-purple-400/50 hover:border-pink-300/70 hover:shadow-pink-500/20"
            return (
              <Link key={item.day} to={item.path} className={cardClass} style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className="text-4xl md:text-5xl mb-3 animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {item.emoji}
                </div>
                <div className="text-white/90 text-sm font-medium mb-1">{item.date}</div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
                  {item.name}
                </h3>
                <p className="text-white/80 text-sm">{item.short}</p>
                <span className="inline-block mt-3 text-pink-200 text-sm font-medium">Open special page →</span>
              </Link>
            )
          })}
        </div>

        {/* Animated Cake Area */}
        <div className="text-center my-12 relative animate-fadeInUp" style={{animationDelay: "0.4s"}}>
          <div className="text-6xl sm:text-7xl md:text-9xl animate-cakeBounce inline-block filter drop-shadow-2xl">
            🎂
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-9xl opacity-20 blur-3xl animate-pulseGlow bg-pink-500 rounded-full w-40 h-40"></div>
          </div>
          <h3 className="text-white text-2xl md:text-3xl font-bold mt-6 drop-shadow-md">Let's eat some cake!</h3>
        </div>
      </div>
    </section>
  )
}

export default Birthday
