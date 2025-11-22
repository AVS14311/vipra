import React, { createContext, useContext, useState, useEffect } from 'react'
import Lightbox from '../components/Lightbox'

const LightboxContext = createContext()

export const useLightbox = () => {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightbox must be used within LightboxProvider')
  }
  return context
}

export const LightboxProvider = ({ children }) => {
  const [lightboxImage, setLightboxImage] = useState(null)

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    if (!lightboxImage) return
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [lightboxImage])

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      <Lightbox image={lightboxImage} onClose={closeLightbox} />
    </LightboxContext.Provider>
  )
}

