import { useState } from 'react'

const ALL_IMAGES = [
  'media/New/vvv.jpg',
  'media/New/0aa4ecb0-5a29-4755-9ba5-c32c39108012.jpg',
  'media/New/0f38b017-1e23-4858-8073-88de35b36aab.jpg',
  'media/New/11.jpg',
  'media/New/22.jpg',
  'media/New/2ae2f211-0626-47d0-92f2-6433b699901f.jpg',
  'media/New/377e1eeb-d08f-446f-a0c2-9a9620411ea6.jpg',
  'media/New/7a22c499-ebb0-440a-b254-3129d2fa0bb4.jpg',
  'media/New/bf22499d-790c-45ac-909a-2692e2b84dab.jpg',
  'media/New/e18080d2-5ce3-4923-ab61-bbe90c491621.jpg'
]

// Utility to pick N random items
function getRandomItems(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function MemoryGallery() {
  const [images] = useState(() => getRandomItems(ALL_IMAGES, 6))

  return (
    <div className="w-full mt-16 flex flex-col items-center">
      <h3 className="text-white text-3xl md:text-4xl font-bold text-center mb-10 drop-shadow-lg font-handwriting">
        Miles apart, but always in my heart...
      </h3>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 perspective-1000 max-w-5xl">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="bg-white/20 p-2 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform duration-500 hover:scale-[1.15] hover:rotate-0 hover:z-20 cursor-pointer backdrop-blur-md border border-white/30"
            style={{ 
              transform: `rotate(${Math.random() * 16 - 8}deg)`,
              width: '280px',
              height: '280px'
            }}
          >
            <img 
              src={`/${img}`} 
              alt="Memory" 
              className="w-full h-full object-contain rounded-lg bg-black/40" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
