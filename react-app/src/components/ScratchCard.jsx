import { useRef, useEffect, useState } from 'react'
import { handleInteraction } from '../utils/interactions'

function ScratchCard({ prize = "Good for 1 Free Backrub!" }) {
  const canvasRef = useRef(null)
  const [isScratched, setIsScratched] = useState(false)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    
    // Fill with silver scratch-off material
    ctx.fillStyle = '#C0C0C0'
    ctx.fillRect(0, 0, width, height)
    
    // Add some noise/pattern to look like a scratch card
    ctx.fillStyle = '#A9A9A9'
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      ctx.fillRect(x, y, 2, 2)
    }
    
    // Write "Scratch Here" text
    ctx.font = 'bold 24px sans-serif'
    ctx.fillStyle = '#4b5563'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Scratch Here!', width / 2, height / 2)

    let isDrawing = false
    let scratchedPixels = 0
    const totalPixels = width * height

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 20, 0, Math.PI * 2)
      ctx.fill()
      
      // Attempt haptic feedback every few pixels
      scratchedPixels++
      if (scratchedPixels % 10 === 0 && !isScratched) {
        if (typeof handleInteraction === 'function') {
          handleInteraction({ haptic: true, hapticIntensity: 'light', sound: null })
        }
      }
      
      checkScratched()
    }

    const checkScratched = () => {
      if (isScratched) return
      
      // Simple approximation: check if enough pixels are cleared
      const imageData = ctx.getImageData(0, 0, width, height)
      let transparentCount = 0
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) transparentCount++
      }
      
      if (transparentCount > totalPixels * 0.4) {
        setIsScratched(true)
        // Clear entire canvas once 40% is scratched
        ctx.clearRect(0, 0, width, height)
        if (typeof handleInteraction === 'function') {
          handleInteraction({ sound: 'success', haptic: true, hapticIntensity: 'heavy' })
        }
      }
    }

    const getMousePos = (evt) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX
      const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      }
    }

    const handleDown = (e) => {
      isDrawing = true
      const { x, y } = getMousePos(e)
      scratch(x, y)
    }

    const handleMove = (e) => {
      if (!isDrawing) return
      // prevent scrolling while scratching on touch devices
      if (e.cancelable) e.preventDefault()
      const { x, y } = getMousePos(e)
      scratch(x, y)
    }

    const handleUp = () => {
      isDrawing = false
    }

    canvas.addEventListener('mousedown', handleDown)
    canvas.addEventListener('mousemove', handleMove)
    canvas.addEventListener('mouseup', handleUp)
    canvas.addEventListener('mouseleave', handleUp)
    
    canvas.addEventListener('touchstart', handleDown, { passive: false })
    canvas.addEventListener('touchmove', handleMove, { passive: false })
    canvas.addEventListener('touchend', handleUp)
    canvas.addEventListener('touchcancel', handleUp)

    return () => {
      canvas.removeEventListener('mousedown', handleDown)
      canvas.removeEventListener('mousemove', handleMove)
      canvas.removeEventListener('mouseup', handleUp)
      canvas.removeEventListener('mouseleave', handleUp)
      canvas.removeEventListener('touchstart', handleDown)
      canvas.removeEventListener('touchmove', handleMove)
      canvas.removeEventListener('touchend', handleUp)
      canvas.removeEventListener('touchcancel', handleUp)
    }
  }, [isScratched])

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h3 className="text-white text-2xl font-bold mb-6 drop-shadow-lg">Daily Special Coupon</h3>
      
      <div className="relative w-[280px] h-40 rounded-xl overflow-hidden shadow-2xl border-4 border-dashed border-pink-300 bg-gradient-to-r from-yellow-100 to-amber-50">
        
        {/* Hidden Prize underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <span className="text-4xl mb-2 animate-bounce">🎉</span>
          <h2 className="text-xl md:text-2xl font-black text-rose-600 text-center uppercase tracking-wider font-handwriting">
            {prize}
          </h2>
        </div>

        {/* Scratchable Canvas */}
        <canvas 
          ref={canvasRef}
          width={280}
          height={160}
          className={`absolute inset-0 cursor-crosshair transition-opacity duration-1000 ${isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />
      </div>
    </div>
  )
}

export default ScratchCard
