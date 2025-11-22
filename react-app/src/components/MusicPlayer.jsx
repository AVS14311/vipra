import { useState, useRef } from 'react'

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const audioRef = useRef(null)

  const handleSurprise = () => {
    setShowPlayer(true)
    // Play immediately when button is clicked
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.error('Error playing audio:', error)
      })
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  return (
    <div className="mt-6">
      {/* Audio element - always in DOM */}
      <audio
        ref={audioRef}
        src="/media/audio/Itni Si Baat Hain Azhar 128 Kbps.mp3"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {!showPlayer ? (
        <button
          onClick={handleSurprise}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm sm:text-base md:text-xl lg:text-2xl font-bold py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none w-full sm:w-auto"
        >
          🎵 Click Here for Surprise 🎵
        </button>
      ) : (
        <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-white/30">
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
            <button
              onClick={handlePlayPause}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold py-2 sm:py-3 px-4 sm:px-5 md:px-6 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <button
              onClick={handleStop}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm sm:text-base md:text-xl font-bold py-2 sm:py-3 px-4 sm:px-5 md:px-6 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            >
              ⏹️ Stop
            </button>
          </div>
          <p className="text-white text-xs sm:text-sm mt-3 md:mt-4 text-center">🎶 Enjoy the music, my love! 🎶</p>
        </div>
      )}
    </div>
  )
}

export default MusicPlayer

