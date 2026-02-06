import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/rose-day', label: 'Rose Day' },
    { path: '/anniversary', label: 'Anniversary' },
    { path: '/love-timeline', label: 'Timeline' },
    { path: '/angry-bird', label: 'Angry Bird' },
    { path: '/funny', label: 'Funny' },
    { path: '/new-year', label: 'New Year' },
    { path: '/important-dates', label: 'Important Dates' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-[1000] py-2 md:py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-3 md:px-5">
        <Link to="/home" className="text-lg md:text-2xl font-bold text-blue-500 no-underline">
          💕 Vipra 💕
        </Link>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-blue-500 text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex list-none gap-4 lg:gap-8 flex-wrap">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-blue-500 no-underline font-medium text-sm lg:text-base transition-all duration-300 py-2 px-3 lg:px-4 rounded-full hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-500 hover:text-white hover:-translate-y-0.5 ${
                  location.pathname === link.path || (link.path === '/home' && location.pathname === '/') 
                    ? 'bg-gradient-to-r from-blue-300 to-blue-500 text-white' 
                    : ''
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-blue-200">
          <ul className="flex flex-col list-none px-3 py-4 gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-blue-500 no-underline font-medium text-base transition-all duration-300 py-3 px-4 rounded-lg ${
                    location.pathname === link.path || (link.path === '/home' && location.pathname === '/') 
                      ? 'bg-gradient-to-r from-blue-300 to-blue-500 text-white' 
                      : 'hover:bg-blue-50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar

