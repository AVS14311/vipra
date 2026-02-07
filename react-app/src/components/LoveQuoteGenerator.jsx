import { useState } from 'react'
import { handleInteraction } from '../utils/interactions'

const LOVE_QUOTES = [
  "You are my today and all of my tomorrows.",
  "In all the world, there is no heart for me like yours.",
  "You are my sun, my moon, and all my stars.",
  "I love you not only for what you are, but for what I am when I am with you.",
  "You are the finest, loveliest, tenderest person I have ever known.",
  "My heart is perfect because you are inside.",
  "Every love story is beautiful, but ours is my favorite.",
  "I fell in love with you because of a million tiny things you never knew you were doing.",
  "You make me want to be a better person.",
  "I choose you. And I'll choose you over and over. Without pause, without a doubt, in a heartbeat.",
  "You are the best thing that's ever been mine.",
  "I love you more than I have ever found a way to say to you.",
  "You are my heart, my life, my one and only thought.",
  "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.",
  "Being with you never felt wrong. It's the one thing I did right.",
  "You're the reason I believe in love.",
  "I love you begins by I, but it ends up by you.",
  "You are my greatest adventure.",
  "I love you for all that you are, all that you have been, and all you're yet to be.",
  "Forever is a long time, but I wouldn't mind spending it by your side.",
]

function LoveQuoteGenerator({ className = '', style = {} }) {
  const [currentQuote, setCurrentQuote] = useState(LOVE_QUOTES[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const generateNewQuote = () => {
    handleInteraction({ sound: 'heart', haptic: true, hapticIntensity: 'light' })
    
    setIsAnimating(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * LOVE_QUOTES.length)
      setCurrentQuote(LOVE_QUOTES[randomIndex])
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className={`text-center ${className}`} style={style}>
      <div
        className={`bg-white/[0.08] backdrop-blur-xl rounded-3xl border-2 border-rose-400/30 p-6 sm:p-8 md:p-10 mb-6 transition-all duration-300 ${
          isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <span className="text-4xl mb-4 block">💭</span>
        <p className="text-rose-50 text-lg sm:text-xl md:text-2xl leading-relaxed italic">
          "{currentQuote}"
        </p>
      </div>
      <button
        type="button"
        onClick={generateNewQuote}
        className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-rose-500/30 border-2 border-rose-400/50 text-rose-50 font-bold text-base sm:text-lg shadow-lg hover:bg-rose-500/40 hover:scale-105 active:scale-100 transition-all duration-300"
      >
        ✨ Generate New Quote
      </button>
    </div>
  )
}

export default LoveQuoteGenerator
