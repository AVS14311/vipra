// Haptic feedback for mobile devices
export const hapticFeedback = (intensity = 'medium') => {
  if (navigator.vibrate) {
    const patterns = {
      light: 10,
      medium: 20,
      heavy: 30,
    }
    navigator.vibrate(patterns[intensity] || patterns.medium)
  }
}

// Sound effects player
export const playSound = (soundType) => {
  // Note: Audio files need to be added to public/sounds/ directory
  const sounds = {
    pop: '/sounds/pop.mp3',
    heart: '/sounds/heart.mp3',
    kiss: '/sounds/kiss.mp3',
    click: '/sounds/click.mp3',
    success: '/sounds/success.mp3',
  }

  try {
    const audio = new Audio(sounds[soundType])
    audio.volume = 0.3 // 30% volume
    audio.play().catch(() => {
      // Silently fail if autoplay is blocked
    })
  } catch (error) {
    // Silently fail if audio file doesn't exist
  }
}

// Combined interaction handler
export const handleInteraction = (options = {}) => {
  const { haptic = true, sound = null, hapticIntensity = 'medium' } = options
  
  if (haptic) {
    hapticFeedback(hapticIntensity)
  }
  
  if (sound) {
    playSound(sound)
  }
}
