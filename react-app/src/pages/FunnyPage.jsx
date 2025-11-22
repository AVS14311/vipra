import Funny from '../components/Funny'
import { useLightbox } from '../context/LightboxContext'

function FunnyPage() {
  const { openLightbox } = useLightbox()
  return <Funny onImageClick={openLightbox} />
}

export default FunnyPage

