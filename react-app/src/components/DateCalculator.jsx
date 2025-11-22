import { useState, useEffect } from 'react'

function DateCalculator({ startDate = '2022-11-23' }) {
  const [stats, setStats] = useState({
    days: 0,
    months: 0,
    years: 0,
    weeks: 0,
  })

  useEffect(() => {
    const calculateStats = () => {
      const start = new Date(startDate)
      const now = new Date()
      const difference = now - start

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const years = Math.floor(days / 365)
      const months = Math.floor((days % 365) / 30)
      const weeks = Math.floor(days / 7)

      setStats({ days, months, years, weeks })
    }

    calculateStats()
    const interval = setInterval(calculateStats, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(interval)
  }, [startDate])

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border-2 md:border-4 border-white/30 shadow-2xl my-6 md:my-10 mx-2 sm:mx-0">
      <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-6 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] px-2">
        📅 Our Journey Together 📅
      </h2>
      <p className="text-white text-center mb-4 md:mb-6 text-sm sm:text-base md:text-lg px-2">
        Since November 23, 2022 - The day we became a couple 💕
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <div className="bg-white/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
            {stats.years}
          </div>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg text-white">Years</div>
        </div>
        <div className="bg-white/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
            {stats.months}
          </div>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg text-white">Months</div>
        </div>
        <div className="bg-white/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
            {stats.weeks}
          </div>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg text-white">Weeks</div>
        </div>
        <div className="bg-white/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
            {stats.days}
          </div>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg text-white">Days</div>
        </div>
      </div>
    </div>
  )
}

export default DateCalculator

