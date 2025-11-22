import { useEffect, useState } from 'react'
import MusicPlayer from './MusicPlayer'
import AnniversaryCountdown from './AnniversaryCountdown'
import DateCalculator from './DateCalculator'
import Confetti from './Confetti'

function Home({ onImageClick }) {
  const [hearts, setHearts] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Floating hearts
    const heartInterval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
        },
      ])
    }, 600)

    // Sparkles
    const sparkleInterval = setInterval(() => {
      setSparkles((prev) => [
        ...prev,
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

  useEffect(() => {
    // Trigger confetti on page load
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
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

  const anniversaryMessages = [
    { type: 'title', text: "HAPPY ANNIVERSARY", emoji: "💕💗💘💖", size: 'xl' },
    { type: 'highlight', text: "MY BEAUTIFUL LOVE", emoji: "💕", size: 'lg' },
    { type: 'message', text: "Every day with you is a celebration of love. Our anniversary is a beautiful reminder of the journey we've shared together.", emoji: "💕", size: 'md' },
    { type: 'highlight', text: "I LOVE YOU MORE THAN WORDS CAN EXPRESS", emoji: "💗", size: 'lg' },
    { type: 'message', text: "You make every moment magical, every day special, and every year unforgettable.", emoji: "💖", size: 'md' },
    { type: 'quote', text: "In your eyes, I found my home. In your heart, I found my love. In your soul, I found my other half.", emoji: "💕", size: 'md' },
    { type: 'highlight', text: "YOU ARE MY EVERYTHING", emoji: "💘", size: 'lg' },
    { type: 'message', text: "Time flies when you're having fun, and with you, every second is pure joy.", emoji: "🥰", size: 'md' },
    { type: 'quote', text: "You are not just my girlfriend, you are my best friend, my confidant, my partner in crime, and my everything.", emoji: "💗", size: 'md' },
    { type: 'highlight', text: "I FALL IN LOVE WITH YOU MORE EVERY DAY", emoji: "💘", size: 'lg' },
    { type: 'message', text: "Our love story is my favorite, and I can't wait to write many more chapters with you.", emoji: "💕", size: 'md' },
    { type: 'quote', text: "You are the reason I smile, the reason I laugh, and the reason my heart beats faster every day.", emoji: "💖", size: 'md' },
    { type: 'highlight', text: "THANK YOU FOR LOVING ME", emoji: "💕", size: 'lg' },
    { type: 'message', text: "Every moment spent with you is a treasure I hold close to my heart. I love you beyond measure.", emoji: "💗", size: 'md' },
    { type: 'quote', text: "You are my sunshine on cloudy days, my strength when I'm weak, and my happiness always.", emoji: "💘", size: 'md' },
    { type: 'highlight', text: "I PROMISE TO LOVE YOU FOREVER", emoji: "💕", size: 'lg' },
    { type: 'message', text: "You are the most beautiful person I know, inside and out. I'm so lucky to have you.", emoji: "💖", size: 'md' },
    { type: 'quote', text: "Our anniversary marks another year of laughter, love, and beautiful memories together.", emoji: "💕", size: 'md' },
    { type: 'highlight', text: "YOU ARE MY DREAM COME TRUE", emoji: "💘", size: 'lg' },
    { type: 'message', text: "I can't imagine my life without you. You complete me in every way possible.", emoji: "💕", size: 'md' },
    { type: 'quote', text: "You are my past, my present, and my future. I love you with all my heart.", emoji: "💗", size: 'md' },
    { type: 'highlight', text: "OUR LOVE GETS BETTER WITH TIME", emoji: "🥂💕", size: 'lg' },
    { type: 'message', text: "You are the melody to my song, the color to my world, and the love of my life.", emoji: "💘", size: 'md' },
    { type: 'quote', text: "I love you not only for what you are, but for what I am when I am with you.", emoji: "💕", size: 'md' },
    { type: 'highlight', text: "EVERY MOMENT WITH YOU IS A GIFT", emoji: "💖", size: 'lg' },
    { type: 'message', text: "You make my heart skip a beat, my soul sing, and my life complete.", emoji: "💕", size: 'md' },
    { type: 'quote', text: "I love you more than all the stars in the sky, more than all the sand on the beach.", emoji: "💘", size: 'md' },
    { type: 'highlight', text: "YOU ARE MY PERSON, MY LOVE, MY EVERYTHING", emoji: "💕", size: 'lg' },
    { type: 'message', text: "You are the best thing that has ever happened to me. I love you beyond words.", emoji: "💖", size: 'md' },
    { type: 'quote', text: "Our love story is just beginning, and I can't wait to see what the future holds.", emoji: "💕", size: 'md' },
    { type: 'title', text: "FOREVER AND ALWAYS", emoji: "💕💗💘💖", size: 'xl' },
  ]

  return (
    <section id="home" className="scroll-mt-20 p-5 max-w-6xl mx-auto w-full relative overflow-hidden">
      {/* Floating Hearts Background */}
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

      {/* Sparkles */}
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
        {/* Special Anniversary Message Section */}
        <div className="text-center my-6 md:my-12 py-4 md:py-8 px-3 md:px-4 bg-gradient-to-r from-pink-500/20 via-red-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl md:rounded-3xl border-2 md:border-4 border-white/30 shadow-2xl animate-fadeInUp">
          <h1 className="text-white text-[1.8rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[4rem] font-bold my-2 md:my-4 break-words drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] leading-tight">
            Happy Anniversary 💋💋💋
          </h1>
          <h2 className="text-white text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-bold my-2 md:my-3 break-words drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] leading-tight">
            My Love 💋 My Heart 💋
          </h2>
          <h2 className="text-white text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-bold my-2 md:my-3 break-words drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] leading-tight">
            My Dear Wife 💋 My Everything 💋
          </h2>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-4 md:my-6 animate-heartbeat">
            💋💋💋💋💋💋💋💋💋💋
          </div>
          
          {/* Surprise Music Button */}
          <MusicPlayer />
        </div>

        {/* Animated Cake */}
        <div className="text-center my-8 relative">
          {/* Sparkles around cake */}
          <div className="absolute top-0 left-1/4 text-3xl animate-sparkle" style={{ animationDelay: '0s' }}>✨</div>
          <div className="absolute top-0 right-1/4 text-3xl animate-sparkle" style={{ animationDelay: '1s' }}>✨</div>
          <div className="absolute bottom-0 left-1/3 text-3xl animate-sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute bottom-0 right-1/3 text-3xl animate-sparkle" style={{ animationDelay: '1.5s' }}>✨</div>
          
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
            <div className="relative">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-cakeBounce inline-block filter drop-shadow-2xl">
                🎂
              </div>
              <div className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl animate-candleFlicker">
                🕯️
              </div>
            </div>
            <div className="relative">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-cakeBounce inline-block filter drop-shadow-2xl" style={{ animationDelay: '0.3s' }}>
                🎂
              </div>
              <div className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl animate-candleFlicker" style={{ animationDelay: '0.2s' }}>
                🕯️
              </div>
            </div>
            <div className="relative">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-cakeBounce inline-block filter drop-shadow-2xl" style={{ animationDelay: '0.6s' }}>
                🎂
              </div>
              <div className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl animate-candleFlicker" style={{ animationDelay: '0.4s' }}>
                🕯️
              </div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-9xl opacity-20 blur-3xl animate-pulseGlow">🎂</div>
          </div>
        </div>

        {/* Confetti */}
        <Confetti trigger={showConfetti} />

        {/* Date Calculator */}
        <DateCalculator startDate="2022-11-23" />

        {/* Anniversary Countdown */}
        <AnniversaryCountdown anniversaryDate="2022-11-23" />

        {/* Anniversary Messages */}
        {anniversaryMessages.map((msg, idx) => {
          const getMessageStyle = () => {
            if (msg.type === 'title') {
              return "text-white text-[1.8rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[4rem] font-bold my-4 md:my-8 text-center py-3 md:py-6 break-words drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-fadeInUp relative px-2"
            }
            if (msg.type === 'highlight') {
              return "text-white text-[1.3rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-bold my-3 md:my-6 text-center py-2 md:py-4 break-words drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fadeInUp px-2"
            }
            if (msg.type === 'quote') {
              return "text-white text-[1rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.8rem] my-3 md:my-5 text-center py-3 md:py-4 px-3 md:px-6 break-words drop-shadow-[2px_2px_8px_rgba(0,0,0,0.6)] animate-fadeInUp italic bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl border-2 border-white/30 mx-2 md:mx-4"
            }
            return "text-white text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem] my-3 md:my-4 text-center py-2 md:py-3 px-2 md:px-4 break-words drop-shadow-[2px_2px_6px_rgba(0,0,0,0.5)] animate-fadeInUp"
          }

          if (msg.type === 'title') {
            return (
              <div
                key={idx}
                className={getMessageStyle()}
                style={{
                  animationDelay: `${idx * 0.08}s`,
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 blur-2xl opacity-50"></div>
                  <div className="relative flex items-center justify-center gap-4 flex-wrap">
                    <span className="text-5xl md:text-7xl animate-heartbeat" style={{ animationDelay: `${idx * 0.1}s` }}>
                      {msg.emoji}
                    </span>
                    <span className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                      {msg.text}
                    </span>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div
              key={idx}
              className={getMessageStyle()}
              style={{
                animationDelay: `${idx * 0.08}s`,
              }}
            >
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className="text-3xl md:text-4xl animate-heartbeat" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {msg.emoji}
                </span>
                <span>{msg.text}</span>
              </div>
            </div>
          )
        })}

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 my-6 md:my-10 px-2 sm:px-0">
          {homeImages.map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-xl md:rounded-2xl border-2 md:border-4 border-white/50 shadow-2xl animate-fadeInUp hover:scale-105 transition-all duration-300 cursor-pointer group bg-white/10 backdrop-blur-sm"
              style={{
                animationDelay: `${(anniversaryMessages.length * 0.1) + (idx * 0.15)}s`,
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

        {/* Final Love Message */}
        <div className="text-center my-12">
          <div className="text-6xl animate-heartbeat inline-block mx-2">💕</div>
          <div className="text-6xl animate-heartbeat inline-block mx-2" style={{ animationDelay: '0.2s' }}>💗</div>
          <div className="text-6xl animate-heartbeat inline-block mx-2" style={{ animationDelay: '0.4s' }}>💘</div>
          <div className="text-6xl animate-heartbeat inline-block mx-2" style={{ animationDelay: '0.6s' }}>💖</div>
          <div className="text-6xl animate-heartbeat inline-block mx-2" style={{ animationDelay: '0.8s' }}>💕</div>
        </div>

        <h1 className="text-white text-[2.5rem] my-8 text-center py-4 break-words drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] animate-pulse">
          FOREVER AND ALWAYS 💕💗💘💖
        </h1>
      </div>
    </section>
  )
}

export default Home

