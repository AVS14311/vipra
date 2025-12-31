import { useEffect, useState, useRef } from 'react'
import MusicPlayer from './MusicPlayer'

function Home({ onImageClick }) {
  const canvasRef = useRef(null)
  const [hearts, setHearts] = useState([]) // For floating hearts
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Floating Hearts Logic for Home
  useEffect(() => {
    const heartInterval = setInterval(() => {
      setHearts((prev) => {
        const newHeart = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
        }
        // Keep list size manageable
        const cleanup = prev.length > 50 ? prev.slice(1) : prev
        return [...cleanup, newHeart]
      })
    }, 800)

    return () => clearInterval(heartInterval)
  }, [])

  // Countdown Logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: Dec 31, 2025 -> Jan 1, 2026
      // Assuming user wants 2026 as the target
      const targetDate = new Date('2026-01-01T00:00:00')
      const now = new Date()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Happy New Year!
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [])

  // Fireworks Logic
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particles = []

    class Particle {
      constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8,
        }
        this.alpha = 1
        this.friction = 0.95
      }

      draw() {
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      update() {
        this.velocity.x *= this.friction
        this.velocity.y *= this.friction
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.01
      }
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)' // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height) // Clear canvas with fading trail

      particles.forEach((particle, index) => {
        if (particle.alpha > 0) {
          particle.update()
          particle.draw()
        } else {
          particles.splice(index, 1)
        }
      })
    }

    const launchFirework = () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height * 0.5 // Top half
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ffffff']
      const color = colors[Math.floor(Math.random() * colors.length)]

      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color))
      }
    }

    animate()
    const fireworkInterval = setInterval(launchFirework, 800) // Launch fireworks periodically

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(fireworkInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const homeImages = [
    'media/New/vvv.jpg',
    'media/New/0aa4ecb0-5a29-4755-9ba5-c32c39108012.jpg',
    'media/New/0f38b017-1e23-4858-8073-88de35b36aab.jpg',
    'media/New/0fd33c4a-4283-43dd-81be-10f7a8251390.jpg',
    'media/New/2e8266b8-60df-42f8-91c8-d60a599c68a5.jpg',
    'media/New/7a22c499-ebb0-440a-b254-3129d2fa0bb4.jpg',
    'media/New/89c0687d-edb7-41a7-b492-2bff487084a5.jpg',
    'media/New/dc9a5059-2714-45bc-8ca7-6fe735528b9c.jpg',
    'media/images/0b5c3414-0b62-44e3-be4f-73790982be0b.jpg',
    'media/images/1900bd60-4c02-485c-84c7-159298f6938f.jpg',
    'media/images/22abc5e8-5e02-4b1e-9140-6b5092b80e75.jpg',
    'media/images/35f65b3c-f268-460c-a23e-a3edce291afd.jpg',
  ]

  return (
    <section id="home" className="scroll-mt-20 p-5 max-w-6xl mx-auto w-full relative overflow-hidden min-h-screen">
      {/* Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'transparent' }} // Let main app background show through or assume it's dark
      />

      {/* Floating Hearts Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl animate-heartFloat"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: '5s',
              opacity: 0.7,
            }}
          >
            💕
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center my-8 md:my-12 animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)] font-serif mb-4">
            Goodbye 2025
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse">
            👋 Welcome 2026 🎉
          </h2>
        </div>

        {/* Featured Love Image (HNY) */}
        <div className="my-6 md:my-10 animate-scaleIn">
          <div className="relative group cursor-pointer" onClick={() => onImageClick('/media/love/hny.jpeg')}>
            <img
              src="/media/love/hny.jpeg"
              alt="Happy New Year My Love"
              className="rounded-3xl border-4 border-pink-400/50 shadow-[0_0_30px_rgba(255,105,180,0.6)] max-w-full md:max-w-2xl w-auto h-auto transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <span className="text-white text-2xl font-serif italic">My Forever Love ❤️</span>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 border-2 border-white/20 shadow-2xl my-8 w-full max-w-4xl animate-slideIn">
          <h3 className="text-white text-2xl md:text-3xl font-bold text-center mb-6 uppercase tracking-widest text-shadow-sm">
            Countdown to Our Best Year Yet
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="bg-black/40 rounded-2xl w-full py-4 md:py-6 border border-white/10 shadow-inner">
                  <span className="text-4xl md:text-6xl font-mono font-bold text-white tabular-nums drop-shadow-md">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-white/80 text-sm md:text-lg mt-2 uppercase tracking-wide font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Romantic Message */}
        <div className="text-center max-w-3xl mx-auto my-8 px-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-3xl md:text-4xl font-serif text-pink-300 mb-4 drop-shadow-md">Entering 2026 Hand in Hand</h3>
          <p className="text-white text-xl md:text-2xl font-light leading-relaxed drop-shadow-md italic">
            "Another year has passed, but my love for you only grows stronger. May 2026 be filled with more laughter, more adventures, and more beautiful moments with you. You are my best resolution."
          </p>
          <div className="text-5xl mt-6 animate-bounce">💏</div>
        </div>

        {/* Music Player */}
        <div className="my-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <MusicPlayer />
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 my-6 md:my-10 px-2 sm:px-0 w-full animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          {homeImages.map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-xl md:rounded-2xl border-2 md:border-4 border-white/50 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group bg-white/10 backdrop-blur-sm"
              style={{
                height: '300px',
                minHeight: '250px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
              }}
              onClick={() => onImageClick(`/${img}`)}
            >
              <img
                src={`/${img}`}
                alt=""
                className="max-w-full max-h-full w-auto h-auto transition-transform duration-300 group-hover:scale-110"
                style={{
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
                onError={(e) => {
                  e.target.parentElement.style.display = 'none'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Home

