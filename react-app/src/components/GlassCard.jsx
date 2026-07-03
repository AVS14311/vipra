import { useRef, useState, useEffect } from 'react'

export default function GlassCard({ children, className = '' }) {
  const cardRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left // x position within the element
      const y = e.clientY - rect.top  // y position within the element
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = ((y - centerY) / centerY) * -10 // Max rotation 10deg
      const rotateY = ((x - centerX) / centerX) * 10

      setRotation({ x: rotateX, y: rotateY })
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
      setIsHovered(false)
      setRotation({ x: 0, y: 0 })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={cardRef}
      className={`relative rounded-[2rem] transition-all duration-300 ease-out overflow-visible
        bg-white/10 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.2)]
        ${isHovered ? 'scale-[1.02] shadow-[0_30px_60px_rgba(0,0,0,0.3)] z-50' : 'scale-100 z-10'}
        ${className}
      `}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Intense inner highlight for glass effect */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/60 pointer-events-none mix-blend-overlay"></div>
      
      {/* Glare effect */}
      <div 
        className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)',
          opacity: isHovered ? 1 : 0,
          transform: 'translateZ(1px)' // Fix clipping
        }}
      ></div>

      {/* Content wrapper with slight pop out effect */}
      <div 
        className="relative z-10 p-8 md:p-14 w-full h-full"
        style={{ transform: 'translateZ(30px)' }}
      >
        {children}
      </div>
    </div>
  )
}
