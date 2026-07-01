import { useState } from 'react'

function LoveLetter({ message = "You mean the world to me!" }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h3 className="text-white text-2xl font-bold mb-6 drop-shadow-lg">A Special Letter For You</h3>
      
      <div 
        className="relative w-72 h-48 cursor-pointer perspective-1000"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* The Envelope Back (Base) */}
        <div className="absolute inset-0 bg-red-400 rounded-b-md shadow-2xl flex items-center justify-center border-t-2 border-red-500">
          {/* Inside dark shading */}
          <div className="absolute inset-0 bg-black/10 rounded-b-md"></div>
          
          {/* The Letter that slides out */}
          <div 
            className={`absolute w-64 bg-white/90 backdrop-blur-sm p-4 rounded-md shadow-lg transition-all duration-700 ease-in-out border border-amber-100 z-10
              ${isOpen ? '-translate-y-32 h-56' : 'translate-y-10 h-32'}
            `}
            style={{ transitionDelay: isOpen ? '0.3s' : '0s' }}
          >
            <p className="font-handwriting text-gray-800 text-lg leading-relaxed text-center mt-2">
              {message}
            </p>
            <div className="absolute bottom-2 right-4 text-2xl">❤️</div>
          </div>
        </div>

        {/* Envelope Flap (Top) */}
        <div 
          className={`absolute top-0 left-0 w-full h-24 origin-top transition-all duration-500
            ${isOpen ? 'z-0' : 'z-30'}
          `}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            backgroundColor: '#ef4444', // red-500
            transformStyle: 'preserve-3d',
            transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)'
          }}
        >
          {/* Heart seal on the flap */}
          <div 
            className={`absolute left-1/2 bottom-2 -translate-x-1/2 text-3xl transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          >
            💝
          </div>
        </div>

        {/* Envelope Front Left & Right (Overlaps the letter) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Left triangle */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-red-500"
            style={{ clipPath: 'polygon(0 0, 0 100%, 50% 100%)' }}
          ></div>
          {/* Right triangle */}
          <div 
            className="absolute top-0 right-0 w-full h-full bg-red-500"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 100%)' }}
          ></div>
          {/* Bottom triangle for seamless look */}
          <div 
            className="absolute bottom-0 left-0 w-full h-full bg-red-600"
            style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 40%)' }}
          ></div>
        </div>
      </div>
      
      <p className="text-white/70 mt-8 text-sm italic animate-pulse">Click the envelope to open</p>
    </div>
  )
}

export default LoveLetter
