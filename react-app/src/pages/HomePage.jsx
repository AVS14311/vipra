import Home from '../components/Home'
import { useLightbox } from '../context/LightboxContext'

function HomePage() {
  const { openLightbox } = useLightbox()
  return <Home onImageClick={openLightbox} />
}

export default HomePage

