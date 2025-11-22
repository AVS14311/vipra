import AngryBird from '../components/AngryBird'
import { useLightbox } from '../context/LightboxContext'

function AngryBirdPage() {
  const { openLightbox } = useLightbox()
  return <AngryBird onImageClick={openLightbox} />
}

export default AngryBirdPage

