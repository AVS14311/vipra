import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const VALENTINE_DAYS = [
  { day: 1, name: 'Rose Day', date: 'Feb 7', emoji: '🌹', short: 'A rose for my love', path: '/rose-day' },
  { day: 2, name: 'Propose Day', date: 'Feb 8', emoji: '💍', short: 'Yes to forever', path: '/propose-day' },
  { day: 3, name: 'Chocolate Day', date: 'Feb 9', emoji: '🍫', short: 'Sweet like you', path: '/chocolate-day' },
  { day: 4, name: 'Teddy Day', date: 'Feb 10', emoji: '🧸', short: 'Cuddles & you', path: '/teddy-day' },
  { day: 5, name: 'Promise Day', date: 'Feb 11', emoji: '🤝', short: 'Promises I keep', path: '/promise-day' },
  { day: 6, name: 'Hug Day', date: 'Feb 12', emoji: '🤗', short: 'Hugs for you', path: '/hug-day' },
  { day: 7, name: 'Kiss Day', date: 'Feb 13', emoji: '💋', short: 'All my love', path: '/kiss-day' },
  { day: 8, name: "Valentine's Day", date: 'Feb 14', emoji: '💕', short: 'Happy Valentine\'s Day', path: '/valentines-day' },
]

function ValentineWeek() {
  const [hearts, setHearts] = useState([])
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const heartInterval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
        },
      ])
    }, 600)
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
      clearInterval(heartInterval)
      clearInterval(sparkleInterval)
    }
  }, [])

  return (
    <section id="home" className="scroll-mt-20 p-5 max-w-6xl mx-auto w-full relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-3xl animate-heartFloat"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: '5s',
            }}
          >
            💕
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
        <div className="text-center my-6 md:my-12 py-6 md:py-10 px-4 md:px-6 bg-gradient-to-r from-rose-500/25 via-red-500/25 to-pink-500/25 backdrop-blur-md rounded-2xl md:rounded-3xl border-2 md:border-4 border-white/30 shadow-2xl animate-fadeInUp">
          <h1 className="text-white text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold my-2 md:my-4 break-words drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] leading-tight">
            Happy Valentine's Week 💕
          </h1>
          <h2 className="text-white text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] font-bold my-2 md:my-3 break-words drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            My Love 💗 My Heart 💗
          </h2>
          <p className="text-white/90 text-base md:text-lg my-3 max-w-xl mx-auto">
            Seven days of love, leading to the most special day. Every day with you is Valentine's Day.
          </p>
          <div className="text-4xl sm:text-5xl my-4 animate-heartbeat">
            🌹 💍 🍫 🧸 🤝 🤗 💋 💕
          </div>
        </div>

        <h2 className="text-white text-xl md:text-2xl font-bold text-center my-8 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
          Valentine's Week — Feb 7 to Feb 14
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 my-6 md:my-10">
          {VALENTINE_DAYS.map((item, idx) => {
            const cardClass = "bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl p-5 md:p-6 text-center animate-fadeInUp hover:scale-105 transition-transform duration-300 " + (item.path ? "border-rose-400/50 hover:border-rose-300/70 hover:shadow-rose-500/20" : "")
            const content = (
              <>
                <div className="text-4xl md:text-5xl mb-3 animate-heartbeat" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {item.emoji}
                </div>
                <div className="text-white/90 text-sm font-medium mb-1">{item.date}</div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
                  {item.name}
                </h3>
                <p className="text-white/80 text-sm">{item.short}</p>
                {item.path && (
                  <span className="inline-block mt-3 text-rose-200 text-sm font-medium">Open special page →</span>
                )}
              </>
            )
            return item.path ? (
              <Link key={item.day} to={item.path} className={cardClass} style={{ animationDelay: `${idx * 0.08}s` }}>
                {content}
              </Link>
            ) : (
              <div key={item.day} className={cardClass} style={{ animationDelay: `${idx * 0.08}s` }}>
                {content}
              </div>
            )
          })}
        </div>

        <div className="text-center my-10 py-6 px-4 bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/20">
          <p className="text-white text-lg md:text-xl italic drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
            "You are the reason my heart celebrates every single day. Happy Valentine's Week, my love."
          </p>
          <div className="text-4xl mt-4 animate-heartbeat">
            💕 💗 💘 💖
          </div>
        </div>

        <div className="text-center my-8">
          <div className="text-5xl animate-heartbeat inline-block mx-2">💕</div>
          <div className="text-5xl animate-heartbeat inline-block mx-2" style={{ animationDelay: '0.2s' }}>💗</div>
          <div className="text-5xl animate-heartbeat inline-block mx-2" style={{ animationDelay: '0.4s' }}>💘</div>
          <div className="text-5xl animate-heartbeat inline-block mx-2" style={{ animationDelay: '0.6s' }}>💖</div>
        </div>
      </div>
    </section>
  )
}

export default ValentineWeek
