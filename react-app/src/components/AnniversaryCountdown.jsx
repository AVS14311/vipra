import { useState, useEffect } from 'react'

function AnniversaryCountdown({ anniversaryDate = '2022-11-23' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      
      // Parse the anniversary date (format: YYYY-MM-DD)
      const [year, month, day] = anniversaryDate.split('-').map(Number)
      
      // Create date for this year's anniversary at midnight
      const thisYearAnniversary = new Date(now.getFullYear(), month - 1, day, 0, 0, 0, 0)
      
      // Create date for next year's anniversary at midnight
      const nextYearAnniversary = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0, 0)
      
      // Determine which anniversary date to use
      let nextAnniversary = thisYearAnniversary
      if (thisYearAnniversary <= now) {
        nextAnniversary = nextYearAnniversary
      }

      const difference = nextAnniversary - now

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
  }, [anniversaryDate])

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border-2 md:border-4 border-white/30 shadow-2xl my-6 md:my-10 mx-2 sm:mx-0">
      <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-4 md:mb-6 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] px-2">
        ⏰ Countdown to Next Anniversary ⏰
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <div className="bg-white/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2">
            {timeLeft.days}
          </div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white">Days</div>
        </div>
        <div className="bg-white/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2">
            {timeLeft.hours}
          </div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white">Hours</div>
        </div>
        <div className="bg-white/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2">
            {timeLeft.minutes}
          </div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white">Minutes</div>
        </div>
        <div className="bg-white/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2">
            {timeLeft.seconds}
          </div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white">Seconds</div>
        </div>
      </div>
    </div>
  )
}

export default AnniversaryCountdown

